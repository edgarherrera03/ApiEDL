from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from pymongo import MongoClient
import os, jwt, secrets
from datetime import timezone, timedelta, datetime
from dotenv import load_dotenv
from utils import hashPassword, verifyPassword
from functools import wraps

load_dotenv()
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:3000"]) 

client = MongoClient("mongodb://localhost:27017/")
db = client["ApiEDLDatabase"]
usersCollection = db["users"]
usersInfoCollection = db['usersInfo']
clientsColection = db["clients"]

def generate_unique_client_token():
    while True:
        token = secrets.token_urlsafe(16)
        if not clientsColection.find_one({"clientToken": token}):
            return token
def generate_unique_api_key():
    while True:
        apiKey = secrets.token_urlsafe(24)
        if not clientsColection.find_one({"apiKey": apiKey}):
            return apiKey

def tokenVerification(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.cookies.get("access_token")
        if not token:
            return jsonify({"error": "Token missing"}), 403

        try:
            jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route("/api/token-verification")
@tokenVerification
def token_verification():
    return jsonify({"message": "Token is valid"}), 200

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data['usuario']
    password = data['password']
    user = usersCollection.find_one({"username": username}) 
    userInfo = usersInfoCollection.find_one({'username': username})
    if user and userInfo and verifyPassword(password, user["password"]):
        expiration = datetime.now(timezone.utc) + timedelta(minutes=30)
        role = userInfo['role']
        token = jwt.encode({
            "username": username,
            'role': role,
            "exp": expiration,
        }, app.config['SECRET_KEY'], algorithm="HS256")
        del userInfo['_id']
        response = jsonify({"message": "Login successful", 'user': userInfo})
        response.set_cookie(
            "access_token",
            token,
            httponly=True,
            secure=False,
            samesite="Lax",
            max_age=1800,
        )
        return response
    else:
        return jsonify({"error" : "Invalid credentials"}), 401

@app.route('/api/logout',  methods=["POST"])
@tokenVerification
def logout():
    response = make_response(jsonify({"message": "Logged out"}))
    response.set_cookie("access_token", "", expires=0)
    return response

@app.route("/api/users")
@tokenVerification
def getUsersInfo():
    response = []
    for user in usersInfoCollection.find():
        response.append({
            "username": user['username'],
            "role": user['role'], 
        })
    if response:
        return jsonify({'message': 'User information fetched', 'users': response}), 200
    else:
        return jsonify({'error': 'No users found'}), 404

@app.route("/api/users", methods=['POST'])
@tokenVerification
def changePassword():
    data = request.get_json()
    username = data["username"]
    newPassword = data["password"]

    if not username or not newPassword:
        return jsonify({"error": "Missing fields"}), 400

    user = usersCollection.find_one({"username": username})
    if not user:
        return jsonify({"error": "User do not exists"}), 409
    else:
        hashedPassword = hashPassword(newPassword)
        usersCollection.update_one(
            {"username": username},
            {"$set": {"password": hashedPassword}}
        )
        return jsonify({"message": "Password updated successfully"}), 200

@app.route("/api/clients")
@tokenVerification
def getClients():
    clients = []
    for client in clientsColection.find():
        user = clientsColection.find_one({"id": client['id']})
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

@app.route("/api/actions/delete", methods=['POST'])
@tokenVerification
def deleteUser():
    data = request.get_json()
    username = data['username']

    if not username:
        return jsonify({"error": "Missing fields"}), 400

    user = usersCollection.find_one({"username": username})
    userInfo = usersInfoCollection.find_one({"username": username})
    if not user or not userInfo:
        return jsonify({"error": "User does not exist"}), 409

    resultUser = usersCollection.delete_one({"username": username})
    resultsUserInfo = usersInfoCollection.delete_one({"username": username})
    if resultUser.deleted_count == 1 and resultsUserInfo.deleted_count == 1:
        return jsonify({"message": f"User '{username}' successfully deleted."}), 200
    else:
        return jsonify({"error": "Deletion failed"}), 500
    
@app.route('/api/actions/add-user', methods=['POST'])
@tokenVerification
def addUser():
    data = request.get_json()
    username = data['username']
    password = data['password']
    role = data['role']

    if not username or not password or not role:
        return jsonify({"error": "Missing fields"}), 400

    if usersCollection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 409
    
    hashedPassword = hashPassword(password)
    usersCollection.insert_one({"username": username, "password": hashedPassword})
    usersInfoCollection.insert_one({'username': username, 'role': role })

    if usersCollection.find_one({"username": username}) and usersInfoCollection.find_one({"username": username}):
        return jsonify({"message": f"User '{username}' successfully added."}), 200
    else:
        return jsonify({"error": "Add failed"}), 500

@app.route('/api/actions/modify', methods=['POST'])
@tokenVerification
def modifyUser():
    data = request.get_json()
    username = data['username']
    password = data['password']
    usernameToModify = data['usernameToModify']
    role = data['role']

    if not username or not password or not role or not usernameToModify:
        return jsonify({"error": "Missing fields"}), 400
    
    user = usersCollection.find_one({'username': username})
    if not verifyPassword(password, user['password']):
        return jsonify({'error': 'Incorrect Password'})

    try:
        usersInfoCollection.update_one({'username': usernameToModify},
                                   {"$set": {"role": role}})
        return jsonify({'message': 'User accesses updated succesfully'})
    except:
        return jsonify({'error': 'Error updating the user accesses'})

@app.route('/api/actions/add-client', methods=['POST'])
@tokenVerification  
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
    

    if clientsColection.find_one({"username": username}):
        return jsonify({"error": "Client already exists"}), 409
    
    clientId = clientsColection.count_documents({}) + 1
    clientToken = generate_unique_client_token(16)
    apiKey = generate_unique_api_key()
    clientsColection.insert_one({
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

    if clientsColection.find_one({"username": username}):
        return jsonify({"message": f"Client '{username}' successfully added."}), 200
    else:
        return jsonify({"error": "Add failed"}), 500

@app.route('/api/client/by-token/<clientToken>')
@tokenVerification
def getClientByToken(clientToken):
    client = clientsColection.find_one({"clientToken": clientToken})
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

if __name__ == "__main__":
    app.run(debug=True)
