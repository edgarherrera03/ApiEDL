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

    # Verificar que el elemento existe en la lista general
    element = collection.find_one({'element': itemToAdd})
    if not element:
        return jsonify({'error': 'El elemento que se desea añadir no ha sido registrado aún. Por favor, hágalo desde la página de registros.'}), 400

    # Verificar que el elemento no esté ya en la lista del cliente
    if itemToAdd in client[listType]['info']:
        return jsonify({"error": "El elemento ya existe en la lista del cliente"}), 409

    # Verificar límite de la lista
    current_size = len(client[listType]['info'])
    limit = client[listType]['listLimit']
    if limit is not None and current_size >= limit:
        return jsonify({"error": "El cliente ha alcanzado el límite de elementos para esta lista"}), 405

    # Añadir el cliente a la lista del elemento en la colección general
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

    # Añadir el elemento a la lista del cliente
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

    # Registrar acción del usuario
    action = USER_ACTIONS['add_item_to_list']
    details = f'Se añadió {itemToAdd} a la lista {listType} del cliente {client["username"]}'
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

    type_mapping = {
        'ip': 'IpList',
        'domain': 'WebsiteList',
        'hash': 'HashList'
    }
    listType = type_mapping.get(itemToAdd['type'])

    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    itemToAdd["creationDate"] = date
    itemToAdd["lastUpdate"] = date
    itemToAdd['blocked'] = itemToAdd['blocked'] == 'true'
    collection = COLLECTIONS[listType]
    itemToAdd['addedBy'] = username

    # Filtramos clientes que no han llegado a su límite
    allowed_clients = []
    for client_username in itemToAdd['clients']:
        client_doc = clientsCollection.find_one({'username': client_username})
        if client_doc:
            current_count = len(client_doc[listType]['info'])
            limit = client_doc[listType]['listLimit']
            if current_count < limit:
                allowed_clients.append(client_username)

    if not allowed_clients:
        return jsonify({"error": "Ningún cliente disponible para añadir este elemento"}), 409

    # Actualizamos la lista de clientes en el item
    itemToAdd['clients'] = allowed_clients

    # Verificamos si ya existe en la lista general
    element = collection.find_one({'element': itemToAdd['element']})
    if not element: 
        collection.insert_one(itemToAdd)
    else:
        return jsonify({"error": "El elemento ya existe"}), 409

    # Añadimos el elemento solo a los clientes permitidos
    for client_username in allowed_clients:
        clientsCollection.update_one(
            {'username': client_username},
            {
                '$push': {
                    f'{listType}.info': itemToAdd['element'],
                }
            }
        )
    
    action = USER_ACTIONS['add_item_to_list']
    details = f'Se añadió {itemToAdd} a la lista {listType} para clientes: {allowed_clients}'
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
    type = data['listType']
    comment = data['comment']
    item = data ['item']

    if not comment or not username or not type or not item:
        return jsonify({"error": "Missing fields"}), 400
    
    type_mapping = {
        'ip': 'IpList',
        'domain': 'WebsiteList',
        'hash': 'HashList'
    }
    listType = type_mapping.get(type)
    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    collection = COLLECTIONS[listType]

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
    
@bp.route('/actions/modify-item', methods=['POST'])
@token_verification_required
def modifyItem():
    data = request.get_json()
    username = data['username']
    itemToModify = data['itemToModify']
    print(itemToModify)
    if not itemToModify or not username:
        return jsonify({"error": "Missing fields"}), 400

    type_mapping = {
        'ip': 'IpList',
        'domain': 'WebsiteList',
        'hash': 'HashList'
    }
    listType = type_mapping.get(itemToModify['type'])
    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    itemToModify['blocked'] = itemToModify['blocked'] == 'true'
    itemToModify["lastUpdate"] = date
    collection = COLLECTIONS[listType]

    element = collection.find_one({'element': itemToModify['element']})
    if not element:
        return jsonify({'error': 'El elemento que se quiere modificar no se ha encontrado'}), 404
    
    collection.update_one(
        {'element': itemToModify['element']},
        {
            '$set': {
                'classification': itemToModify['classification'],
                'rating': itemToModify['rating'],
                'blocked': itemToModify['blocked'],
                'lastUpdate': date,
            }
        }
    )
    action = USER_ACTIONS['modify_item_from_list']
    details = f'Se modificó {itemToModify['element']}'
    log_user_action(username, action, details)
    return jsonify({"message": "Elemento modificado correctamente"}), 200