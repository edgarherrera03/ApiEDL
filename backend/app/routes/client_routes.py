from flask import Blueprint, request, jsonify
from app.models.db import clientsCollection
from app.utils.auth import token_verification_required
from app.utils.helpers import generate_unique_api_key, generate_unique_client_token, USER_ACTIONS, log_user_action
from datetime import timezone, datetime
from zoneinfo import ZoneInfo

bp = Blueprint('clients', __name__, url_prefix='/api/clients')

@bp.route("/", strict_slashes=False)
@token_verification_required
def getClients():
    clients = []
    for client in clientsCollection.find():
        user = clientsCollection.find_one({"id": client['id']})
        if user:
            clients.append({
                "id": user.get('id', None),
                "name": user.get('name', None),
                "username": user['username'],
                "creationDate": user.get('creationDate', None),
                "updateDate": user.get('updateDate', None),
                "expirationDate": user.get('expirationDate', None),
                "clientToken": user.get('clientToken', None),
            })
    if clients:
        return jsonify({"message": "Clients fetched successfully", "clients": clients}), 200
    else:
        return jsonify({"error": "No clients found"}), 404

@bp.route('/actions/add', methods=['POST'])
@token_verification_required  
def addClient():
    data = request.get_json()
    username = data['username']
    name = data['name']
    usernameToAdd = data['usernameToAdd']
    expirationDate = data['expirationDate']
    if not usernameToAdd or not name or not expirationDate or not username:
        return jsonify({"error": "Missing fields"}), 400
    
    creationDate = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    updateDate = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    

    if clientsCollection.find_one({"username": usernameToAdd}):
        return jsonify({"error": "Client already exists"}), 409
    
    clientId = clientsCollection.count_documents({}) + 1
    clientToken = generate_unique_client_token()
    apiKey = generate_unique_api_key()
    clientsCollection.insert_one({
        "id": clientId,
        "name": name,
        "username": usernameToAdd,
        "creationDate": creationDate,
        "updateDate": updateDate,
        "expirationDate": expirationDate,
        "clientToken": clientToken,
        "IpList": {'info':[], 'lastUpdate': creationDate, 'listLimit': 10000},
        "WhiteList": {'info':[], 'lastUpdate': creationDate, 'listLimit': 10000},
        "HashList": {'info':[], 'lastUpdate': creationDate, 'listLimit': 10000},
        "WebsiteList": [],
        "apiKey": apiKey,
    })

    if clientsCollection.find_one({"username": usernameToAdd}):
        action = USER_ACTIONS['add_client']
        details = f'Se añadió el cliente {usernameToAdd}'
        log_user_action(username, action, details)
        return jsonify({"message": f"Client '{usernameToAdd}' successfully added."}), 200
    else:
        return jsonify({"error": "Add failed"}), 500
    
@bp.route('/by-token/<clientToken>')
@token_verification_required
def getClientByToken(clientToken):
    client = clientsCollection.find_one({"clientToken": clientToken})
    if client:
        return jsonify({"message": "Client found", 'client': {
            "id": client.get('id', None),
            "name": client.get('name', None),
            "username": client['username'],
            "creationDate": client.get('creationDate', None),
            "updateDate": client.get('updateDate', None),
            "expirationDate": client.get('expirationDate', None),
            "IpList": client.get('IpList', []),
            "WhiteList": client.get('WhiteList', []),
            "WebsiteList": client.get('WebsiteList', []),
            "HashList" : client.get('HashList', []),
            "apiKey": client.get('apiKey', None),
        }}), 200
    else:
        return jsonify({"error": "Client not found"}), 404

@bp.route('/by-token/actions/add-item-list/<clientToken>', methods=['POST'])
@token_verification_required
def addItem(clientToken):
    data = request.get_json()
    username = data['username']
    listType = data['listType']
    itemToAdd = data['itemToAdd']
    itemToAdd["lastUpdate"] = datetime.today().strftime('%Y-%m-%d')
    
    if not itemToAdd or not username or not listType:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    if itemToAdd in client[listType]['info']:
        return jsonify({"error": "Item already exists"}), 409

    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    clientsCollection.update_one(
        {"clientToken": clientToken},
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
    return jsonify({"message": "Item added successfully"}), 200

@bp.route('/by-token/actions/delete-item-list/<clientToken>', methods=['POST'])
@token_verification_required
def deleteItem(clientToken):
    data = request.get_json()
    username = data['username']
    listType = data['listType']
    itemToDelete = data['itemToDelete']
    
    if not itemToDelete or not username or not listType:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    if not itemToDelete in client[listType]['info']:
        return jsonify({"error": "Item don't exists"}), 409

    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    clientsCollection.update_one(
        {"clientToken": clientToken},
        {
            "$pull": {
                f"{listType}.info": itemToDelete,
            },
            "$set": {
                f"{listType}.lastUpdate": date
            }
        }
    )

    action = USER_ACTIONS['delete_item_from_list']
    details = f'Se eliminó {itemToDelete} de la lista {listType} del cliente {client['username']}'
    log_user_action(username, action, details)
    return jsonify({"message": "Item deleted successfully"}), 200

@bp.route('/by-token/actions/modify-expiration-date/<clientToken>', methods=['POST'])
@token_verification_required
def modifyExpirationDate(clientToken):
    data = request.get_json()
    username = data['username']
    newExpirationDate = data['expirationDate']
    if not newExpirationDate or not username:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$set": {"expirationDate": newExpirationDate}}
    )
    action = USER_ACTIONS['modify_expirationDate']
    details = f'Se modificó la fecha de expiración del cliente {client['username']} a {newExpirationDate}'
    log_user_action(username, action, details)
    return jsonify({"message": "Expiration date updated successfully"}), 200

@bp.route('/by-token/actions/modify-list-limit/<clientToken>', methods=['POST'])
@token_verification_required
def modifyListLimit(clientToken):
    data = request.get_json()
    username = data['username']
    listType = data['listType']
    newListLimit = int(data['newListLimit'])
    if not newListLimit or not username:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    if len(client[listType]['info']) > newListLimit:
        return jsonify({'error' : 'El limite de la lista no puede ser superior al numero de contenido guardado.'}), 400
    
    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$set": {f"{listType}.listLimit": newListLimit}}
    )
    action = USER_ACTIONS['modify_list_limit']
    details = f'Se modificó el limite de la lista {listType} del cliente {client['username']} a {newListLimit}'
    log_user_action(username, action, details)
    return jsonify({"message": "List limit updated successfully"}), 200

@bp.route('/by-token/actions/regenerate-api-key/<clientToken>', methods=['POST'])
@token_verification_required
def regenerateApiKey(clientToken):
    data = request.get_json()
    username = data['username']

    newApiKey = generate_unique_api_key()
    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404
    
    clientsCollection.update_one(
        {"clientToken": clientToken},
        {'$set': {'apiKey': newApiKey}}
    )
    action = USER_ACTIONS['regenerate_api_key']
    details = f'La Api_Key del cliente {client['username']} fue regenerada'
    log_user_action(username, action, details)

    return jsonify({"message": "Api Key regenerated successfully"}), 200
    