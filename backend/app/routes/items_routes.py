from flask import Blueprint, request, jsonify
from app.utils.helpers import USER_ACTIONS, log_user_action, COLLECTIONS
from app.utils.alienVault_handler import classify_indicator
from app.utils.auth import token_verification_required
from zoneinfo import ZoneInfo
from datetime import datetime
from app.models.db import clientsCollection

bp = Blueprint('items', __name__, url_prefix='/api/items')

@bp.route("/", strict_slashes=False, methods=['POST'])
@token_verification_required
def getItems():
    data = request.get_json()
    listType = data['listType']
    collection = COLLECTIONS.get(listType)
    items = []
    for item in collection.find():
        del item['_id']
        items.append(item)
    if items:
        return jsonify({"message": "Items fetched succesfully", "items": items}), 200
    else:
        return jsonify({"error": "No se encontró ningun elemento solicitado"}), 404


@bp.route('/actions/client/add-item-list', methods=['POST'])
@token_verification_required
def addItemToClient():
    data = request.get_json()
    username = data['username']
    clientUsername = data['clientUsername']
    listType = data['listType']
    itemToAdd = data['itemToAdd']

    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    collection = COLLECTIONS[listType]


    if not itemToAdd or not username or not listType:
        return jsonify({"error": "Missing fields"})

    client = clientsCollection.find_one({"username": clientUsername})
    if not client:
        return jsonify({"error": "Cliente no encontrado"}), 404

    for item in client[listType]['info']:
        if itemToAdd == item :
            return jsonify({"error": "El elemento ya existe"}), 409
    
    # Verificamos si el elemento que se añadira al cliente ya esta registrado, si no lo esta, la funcion mandara un error
    element = collection.find_one({'element': itemToAdd})
    if not element:
        return jsonify({'error': 'El elemento que se desea añadir no ha sido registrado aún. Por favor, hágalo desde la página de registros.'}), 400
    else:
        collection.update_one(
            {'element': itemToAdd},
            {
                '$push': {
                    'clients': clientUsername,
                },
                '$set': {
                    'lastUpdate': date,
                }
            }
        )

    # Luego de añadirlo a la lista general lo hacemos ahora a la lista del cliente
    clientsCollection.update_one(
        {"username": clientUsername},
        {
            "$push": {
                f"{listType}.info": itemToAdd,
            },
            "$set": {
                f"{listType}.lastUpdate": date
            }
        }
    )

    action = USER_ACTIONS['add_item_to_list']
    details = f'Se añadió {itemToAdd} a la lista {listType} del cliente {client['username']}'
    log_user_action(username, action, details)
    return jsonify({"message": "Elemento añadido correctamente"}), 200

@bp.route('/actions/client/register-item', methods=['POST'])
@token_verification_required
def registerItem():
    data = request.get_json()
    username = data['username']
    itemToAdd = data['itemToAdd']
    
    if not itemToAdd or not username:
        return jsonify({"error": "Missing fields"}), 400

    listType = itemToAdd['type']

    type_mapping = {
        'IpList': 'ip',
        'WebsiteList': 'domain',
        'HashList': 'hash'
    }
    itemToAdd['type'] = type_mapping.get(itemToAdd['type'])

    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    itemToAdd["lastUpdate"] = date
    itemToAdd['blocked'] = itemToAdd['blocked'] == 'true'
    collection = COLLECTIONS[listType]
    itemToAdd['addedBy'] = username

    # Verificamos si ya existe en la lista general para no tener elementos duplicados
    element = collection.find_one({'element': itemToAdd['element']})
    if not element: 
        collection.insert_one(itemToAdd)
    else:
        return jsonify({"error": "El elemento ya existe"}), 409

    # Y ahora añadimos el elemento cada cliente
    for client in itemToAdd['clients']:
        clientsCollection.update_one(
            {'username': client},
            {
                '$push': {
                    f'{listType}.info': itemToAdd['element'],
                }
            }
        )
    
    action = USER_ACTIONS['add_item_to_list']
    details = f'Se añadió {itemToAdd} a la lista {listType}'
    log_user_action(username, action, details)
    return jsonify({"message": "Elemento añadido correctamente"}), 200

@bp.route('/actions/client/delete-item-list', methods=['POST'])
@token_verification_required
def deleteItemFromClient():
    data = request.get_json()
    username = data['username']
    clientUsername = data['clientUsername']
    listType = data['listType']
    itemToDelete = data['itemToDelete']
    
    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    collection = COLLECTIONS[listType]

    if not itemToDelete or not username or not listType:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"username": clientUsername})
    if not client:
        return jsonify({"error": "Client no encontrado"}), 404

    result = clientsCollection.update_one(
        {"username": clientUsername},
        {
            "$pull": {
                f"{listType}.info": itemToDelete
            }
        }
    )
    if result.modified_count == 0:
        return jsonify({"error": "Elemento no encontrado o ya fue eliminado."}), 404
    
    # Ponemos al dia la ultima modificacion si no hubo error
    clientsCollection.update_one(
        {"username": clientUsername},
        {
            "$set": {
                f"{listType}.lastUpdate": date
            }
        }
    )
    # Eliminamos de la colleccion general al cliente y si ya no queda ningun cliente eliminamos todo el elemento de la coleccion general
    collection.update_one(
        {'element': itemToDelete},
        {
            "$pull": {
                "clients": clientUsername
            }
        }
    )
    # Verificar si la lista quedó vacía
    document = collection.find_one({'element': itemToDelete})
    if document and not document.get('clients'):
        collection.delete_one({'element': itemToDelete})

    action = USER_ACTIONS['delete_item_from_list']
    details = f'Se eliminó {itemToDelete} de la lista {listType} del cliente {clientUsername}'
    log_user_action(username, action, details)
    return jsonify({"message": "Elemento eliminado de manera correcta"}), 200

@bp.route('/actions/client/delete-item', methods=['POST'])
@token_verification_required
def deleteItem():
    data = request.get_json()
    username = data['username']
    itemToDelete = data['itemToDelete']
    listType = data['listType']

    if not itemToDelete or not username or not listType:
        return jsonify({"error": "Missing fields"}), 400
    
    type_mapping = {
        'ip': 'IpList',
        'domain': 'WebsiteList',
        'hash': 'HashList'
    }
    listType = type_mapping.get(listType)
    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    collection = COLLECTIONS[listType]
    elementToDelete = collection.find_one({'element': itemToDelete})
    if not elementToDelete:
        return jsonify({'error': 'El elemento que se quiso eliminar no existe o ya fue eliminado'}), 404
    
    for client in elementToDelete['clients']:
        clientsCollection.update_one(
            {'username': client},
            {
                '$pull': {
                    f'{listType}.info': itemToDelete,
                },
                '$set': {
                    'lastUpdate': date
                }
            }
        )
    result = collection.delete_one({'element': itemToDelete})
    if result.deleted_count > 0:
        action = USER_ACTIONS['delete_item_from_list']
        details = f'Se eliminó {itemToDelete} de la lista {listType}'
        log_user_action(username, action, details)
        return jsonify({'message': 'Item eliminado de manera correcta'}), 200
    else:
        return jsonify({'error': 'Hubo un error al eliminar el item'}), 500


@bp.route('/actions/client/add-comment', methods=['POST'])
@token_verification_required
def addCommentToItem():
    data = request.get_json()
    username = data['username']
    listType = data['listType']
    comment = data['comment']
    item = data ['item']

    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    collection = COLLECTIONS[listType]

    if not comment or not username or not listType or not item:
        return jsonify({"error": "Missing fields"}), 400
    
    #Contruimos el formato del comentario
    commentToBeInserted = { 'username': username, 'comment': comment, 'date': date}
    collection.update_one(
        {'element': item},
        {
            "$push": {
                'comments': commentToBeInserted,
            }
        }
    )
    action = USER_ACTIONS['comment_item']
    details = f'Se agregó un nuevo comentario para el objeto siguiente: {item}'
    log_user_action(username, action, details)
    return jsonify({"message": "Comentario agregado de manera correcta"}), 200

@bp.route('/actions/investigate-item', methods=['POST'])
@token_verification_required
def investigateItem():
    data = request.get_json()
    item = data['item']
    itemType = data['itemType']
    if not item or not itemType: 
        return jsonify({"error": "Missing fields"}), 400
    
    indicatorDetails = classify_indicator(item, itemType)
    if not indicatorDetails:
        return jsonify({"error": "Hubo un problema con Alien Vault"}), 502
    
    return jsonify({"message": 'Info recuparada de manera correcta', 'indicatorDetails': indicatorDetails}), 200
    
