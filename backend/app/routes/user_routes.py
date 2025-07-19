from flask import Blueprint, request, jsonify
from app.models.db import usersCollection, usersInfoCollection
from app.utils.auth import token_verification_required
from app.utils.helpers import hashPassword, verifyPassword

bp = Blueprint('users', __name__, url_prefix='/api/users')

@bp.route("/", strict_slashes=False)
@token_verification_required
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
    
@bp.route("/actions/delete", methods=['POST'])
@token_verification_required
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

@bp.route('/actions/add', methods=['POST'])
@token_verification_required
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

@bp.route('/actions/modify', methods=['POST'])
@token_verification_required
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