from flask import Blueprint, request, jsonify
from app.utils.helpers import USER_ACTIONS, log_user_action, COLLECTIONS
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
def addItem():
    data = request.get_json()
    username = data['username']
    clientUsername = data['clientUsername']
    listType = data['listType']
    itemToAdd = data['itemToAdd']

    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    itemToAdd["lastUpdate"] = date
    itemToAdd['blocked'] = itemToAdd['blocked'] == 'true'
    collection = COLLECTIONS[listType]


    if not itemToAdd or not username or not listType:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"username": clientUsername})
    if not client:
        return jsonify({"error": "Cliente no encontrado"}), 404

    for item in client[listType]['info']:
        if itemToAdd['element'] == item :
            return jsonify({"error": "El elemento ya existe"}), 409

    clientsCollection.update_one(
        {"username": clientUsername},
        {
            "$push": {
                f"{listType}.info": itemToAdd['element'],
            },
            "$set": {
                f"{listType}.lastUpdate": date
            }
        }
    )

    # Verificamos si ya existe en la lista general para no tener elementos duplicados
    element = collection.find_one({'element': itemToAdd['element']})
    if not element:
        itemToAdd['clients'] = [clientUsername] 
        collection.insert_one(itemToAdd)
    else:
        collection.update_one(
            {'element': itemToAdd},
            {
                '$push': {
                    'clients': clientUsername,
                }
            }
        )

    action = USER_ACTIONS['add_item_to_list']
    details = f'Se añadió {itemToAdd} a la lista {listType} del cliente {client['username']}'
    log_user_action(username, action, details)
    return jsonify({"message": "Elemento añadido correctamente"}), 200

@bp.route('/actions/client/delete-item-list', methods=['POST'])
@token_verification_required
def deleteItem():
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
