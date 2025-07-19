from flask import Blueprint, request, jsonify
from app.models.db import clientsCollection
from app.utils.auth import token_verification_required
from app.utils.helpers import generate_unique_api_key, generate_unique_client_token
from datetime import timezone, timedelta, datetime

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
    name = data['name']
    username = data['username']
    expirationDate = data['expirationDate']
    print(name)
    if not username or not name or not expirationDate:
        return jsonify({"error": "Missing fields"}), 400
    
    creationDate = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    updateDate = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    

    if clientsCollection.find_one({"username": username}):
        return jsonify({"error": "Client already exists"}), 409
    
    clientId = clientsCollection.count_documents({}) + 1
    clientToken = generate_unique_client_token()
    apiKey = generate_unique_api_key()
    clientsCollection.insert_one({
        "id": clientId,
        "name": name,
        "username": username,
        "creationDate": creationDate,
        "updateDate": updateDate,
        "expirationDate": expirationDate,
        "clientToken": clientToken,
        "IpList": [],
        "WhiteList": [],
        "WebsiteList": [],
        "apiKey": apiKey,
    })

    if clientsCollection.find_one({"username": username}):
        return jsonify({"message": f"Client '{username}' successfully added."}), 200
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
            "apiKey": client.get('apiKey', None),
        }}), 200
    else:
        return jsonify({"error": "Client not found"}), 404

@bp.route('/by-token/actions/add-ip/<clientToken>', methods=['POST'])
@token_verification_required
def addIpToClient(clientToken):
    data = request.get_json()
    ipAddress = data['ipAddress']
    if not ipAddress:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    if ipAddress in client['IpList']:
        return jsonify({"error": "IP address already exists"}), 409

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$push": {"IpList": ipAddress}}
    )
    
    return jsonify({"message": "IP address added successfully"}), 200

@bp.route('/by-token/actions/delete-ip/<clientToken>', methods=['POST'])
@token_verification_required
def deleteIpFromClient(clientToken):
    data = request.get_json()
    ipAddress = data['ipAddress']
    if not ipAddress:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404
    if ipAddress not in client['IpList']:
        return jsonify({"error": "IP address does not exist"}), 409

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$pull": {"IpList": ipAddress}}
    )
    
    return jsonify({"message": "IP address deleted successfully"}), 200

@bp.route('/by-token/actions/add-ip-white-list/<clientToken>', methods=['POST'])
@token_verification_required
def addIpToWhiteList(clientToken):
    data = request.get_json()
    ipAddress = data['ipAddress']
    if not ipAddress:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    if ipAddress in client['WhiteList']:
        return jsonify({"error": "IP address already exists in whitelist"}), 409

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$push": {"WhiteList": ipAddress}}
    )
    
    return jsonify({"message": "IP address added to whitelist successfully"}), 200

@bp.route('/by-token/actions/delete-ip-white-list/<clientToken>', methods=['POST'])
@token_verification_required
def deleteIpFromWhiteList(clientToken):
    data = request.get_json()
    ipAddress = data['ipAddress']
    if not ipAddress:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404
    if ipAddress not in client['WhiteList']:
        return jsonify({"error": "IP address does not exist in whitelist"}), 409

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$pull": {"WhiteList": ipAddress}}
    )
    
    return jsonify({"message": "IP address deleted from whitelist successfully"}), 200

@bp.route('/by-token/actions/add-website/<clientToken>', methods=['POST'])
@token_verification_required
def addWebsiteToClient(clientToken):
    data = request.get_json()
    website = data['website']
    if not website:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    if website in client['WebsiteList']:
        return jsonify({"error": "Website already exists"}), 409

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$push": {"WebsiteList": website}}
    )
    
    return jsonify({"message": "Website added successfully"}), 200

@bp.route('/by-token/actions/delete-website/<clientToken>', methods=['POST'])
@token_verification_required
def deleteWebsiteFromClient(clientToken):
    data = request.get_json()
    website = data['website']
    if not website:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404
    if website not in client['WebsiteList']:
        return jsonify({"error": "Website does not exist"}), 409

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$pull": {"WebsiteList": website}}
    )
    
    return jsonify({"message": "Website deleted successfully"}), 200

@bp.route('/by-token/actions/modify-expiration-date/<clientToken>', methods=['POST'])
@token_verification_required
def modifyExpirationDate(clientToken):
    data = request.get_json()
    newExpirationDate = data['expirationDate']
    if not newExpirationDate:
        return jsonify({"error": "Missing fields"}), 400

    client = clientsCollection.find_one({"clientToken": clientToken})
    if not client:
        return jsonify({"error": "Client not found"}), 404

    clientsCollection.update_one(
        {"clientToken": clientToken},
        {"$set": {"expirationDate": newExpirationDate}}
    )
    
    return jsonify({"message": "Expiration date updated successfully"}), 200