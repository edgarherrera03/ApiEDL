from flask import Blueprint, request, jsonify
from app.models.db import clientsCollection
from app.utils.auth import token_verification_required
from app.utils.helpers import generate_unique_api_key, generate_unique_client_token, USER_ACTIONS, log_user_action, COLLECTIONS
from datetime import datetime
from zoneinfo import ZoneInfo
from pymongo import UpdateOne

bp = Blueprint('clients', __name__, url_prefix='/api/clients')

'''
    En este documento se detallan todas las funciones utilizadas para el manejo y modificacion de los clientes. 
'''


# Funcion que permite la obtencion de la lista de clientes registrados en la base de datos
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
        return jsonify({"error": "No se encontraron ningun cliente"}), 404

# Funcion que permite añadir un cliente a la lista inicializando cada uno de los campos
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
    
    creationDate = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    updateDate = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    try:
        newExpirationDateFormatted = datetime.strptime(expirationDate, "%Y-%m-%d") \
            .replace(tzinfo=ZoneInfo("America/El_Salvador")) \
            .strftime('%Y-%m-%d %H:%M:%S GMT')
    except ValueError:
        return jsonify({"error": "Invalid date format, must be YYYY-MM-DD"}), 400

    if clientsCollection.find_one({"username": usernameToAdd}):
        return jsonify({"error": "El cliente que se intento añadir ya existe"}), 409
    
    clientId = clientsCollection.count_documents({}) + 1
    clientToken = generate_unique_client_token()
    apiKey = generate_unique_api_key()
    clientsCollection.insert_one({
        "id": clientId,
        "name": name,
        "username": usernameToAdd,
        "creationDate": creationDate,
        "updateDate": updateDate,
        "expirationDate": newExpirationDateFormatted,
        "clientToken": clientToken,
        "IpList": {'info':[], 'lastUpdate': creationDate, 'listLimit': 10000}, 
        "WebsiteList": {'info':[], 'lastUpdate': creationDate, 'listLimit': 10000},
        "HashList": {'info':[], 'lastUpdate': creationDate, 'listLimit': 10000},
        "apiKey": apiKey,
    })

    if clientsCollection.find_one({"username": usernameToAdd}):
        action = USER_ACTIONS['add_client']
        details = f'Se añadió el cliente {usernameToAdd}'
        log_user_action(username, action, details)
        return jsonify({"message": f"Client '{usernameToAdd}' successfully added."}), 200
    else:
        return jsonify({"error": "Add failed"}), 500

# Funcion que permite eliminar un cliente de la lista y todos los datos relacionados con el 
@bp.route('/actions/delete', methods=['POST'])
@token_verification_required
def deleteClient():
    data = request.get_json()
    username = data['username']
    usernameToDelete = data['usernameToDelete']

    if not usernameToDelete or not username:
        return jsonify({"error": "Missing fields"}), 400
    
    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')

    client = clientsCollection.find_one({'username': usernameToDelete})
    if client:
        # Primero borramos todos los elementos (IP, dominios, hash) atribuidos al cliente
        for list_name, collection in COLLECTIONS.items():
            elements = client[list_name]['info']
            
            # Usamos operaciones en lote para reducir las llamadas a la DB
            ops = []
            for element in elements:
                # 1. Quitar el usuario de la lista de clientes y registrar la fecha
                ops.append(UpdateOne(
                    {'element': element},
                    {
                        '$pull': {'clients': usernameToDelete},
                        '$set': {'lastIUpdate': date}  
                    }
                ))
                # 2. Borrar si la lista queda vacía
                ops.append(UpdateOne(
                    {'element': element, 'clients': {'$size': 0}},
                    {'$unset': {'element': ""}}  # Marcamos para borrado luego
                ))
            
            if ops:
                collection.bulk_write(ops, ordered=True)
            
            # Elimina los documentos marcados como vacíos
            collection.delete_many({'clients': {'$size': 0}})

        # Luego de borrar los elementos de las otras bases de datos, borramos al cliente 
        clientsCollection.delete_one({'username': usernameToDelete})
        
        action = USER_ACTIONS['delete_client']
        details = f'Se eliminó {usernameToDelete} de la lista de clientes'
        log_user_action(username, action, details)
        return jsonify({'message': 'El cliente se elimino de manera correcta'}), 200
    else:
        return jsonify({'error': 'El cliente que se quiso eliminar no existe o ya ha sido eliminado'}), 404

# Funcion que permite obtener un cliente especifico gracias al token unico que le ha sido asignado
@bp.route('/by-token/<clientToken>')
@token_verification_required
def getClientByToken(clientToken):
    client = clientsCollection.find_one({"clientToken": clientToken})
    if client:
        return jsonify({"message": "Client encontrado", 'client': {
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
        return jsonify({"error": "Cliente no encontrado"}), 404

# Funcion que permite modificar la fecha de expiracion del contrato de un cliente
@bp.route('/by-token/actions/modify-expiration-date/<clientToken>', methods=['POST'])
@token_verification_required
def modifyExpirationDate(clientToken):
    data = request.get_json()
    username = data['username']
    newExpirationDate = data['expirationDate']
    if not newExpirationDate or not username:
        return jsonify({"error": "Missing fields"}), 400

    try:
        newExpirationDateFormatted = datetime.strptime(newExpirationDate, "%Y-%m-%d") \
            .replace(tzinfo=ZoneInfo("America/El_Salvador")) \
            .strftime('%Y-%m-%d %H:%M:%S GMT')
    except ValueError:
        return jsonify({"error": "Invalid date format, must be YYYY-MM-DD"}), 400
    
    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client no encontrado"}), 404

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {
            '$set': {
                "expirationDate": newExpirationDateFormatted,
                'updateDate': date,
            }
        }
    )
    action = USER_ACTIONS['modify_expirationDate']
    details = f'Se modificó la fecha de expiración del cliente {client['username']} a {newExpirationDate}'
    log_user_action(username, action, details)
    return jsonify({"message": "Expiration date updated successfully"}), 200

# Funcion que permite modificar el limite de la lista de Ip, dominios o hash que son asignados a un cliente en especifico
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

# Funcion que permite regenerar la clave ApiKey de un cliente 
@bp.route('/by-token/actions/regenerate-api-key/<clientToken>', methods=['POST'])
@token_verification_required
def regenerateApiKey(clientToken):
    data = request.get_json()
    username = data['username']

    newApiKey = generate_unique_api_key()
    client = clientsCollection.find_one({"clientToken": clientToken})
    date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
    if not client:
        return jsonify({"error": "Cliente no encontrado"}), 404
    
    clientsCollection.update_one(
        {"clientToken": clientToken},
        {
            '$set': {
                'apiKey': newApiKey,
                'updateDate': date,
            }
         }
    )
    action = USER_ACTIONS['regenerate_api_key']
    details = f'La Api_Key del cliente {client['username']} fue regenerada'
    log_user_action(username, action, details)

    return jsonify({"message": "Se regeneró la Api Key correctamente."}), 200
    