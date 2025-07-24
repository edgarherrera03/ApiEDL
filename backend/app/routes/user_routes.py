from flask import Blueprint, request, jsonify
from app.models.db import usersCollection, usersInfoCollection
from app.utils.auth import token_verification_required
from app.utils.helpers import hashPassword, verifyPassword, USER_ACTIONS, log_user_action

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
        return jsonify({'error': 'No logs found'}), 404
    
@bp.route("/actions/delete", methods=['POST'])
@token_verification_required
def deleteUser():
    data = request.get_json()
    usernameToDelete = data['usernameToDelete']
    username = data['username']

    if not usernameToDelete or not username:
        return jsonify({"error": "Missing fields"}), 400

    user = usersCollection.find_one({"username": usernameToDelete})
    userInfo = usersInfoCollection.find_one({"username": usernameToDelete})
    if not user or not userInfo:
        return jsonify({"error": "User does not exist"}), 409

    resultUser = usersCollection.delete_one({"username": usernameToDelete})
    resultsUserInfo = usersInfoCollection.delete_one({"username": usernameToDelete})
    if resultUser.deleted_count == 1 and resultsUserInfo.deleted_count == 1:
        action = USER_ACTIONS['delete_user']
        details = f'Se eliminó al usuario {usernameToDelete}'
        log_user_action(username, action, details)
        return jsonify({"message": f"User '{usernameToDelete}' successfully deleted."}), 200
    else:
        return jsonify({"error": "Deletion failed"}), 500

@bp.route('/actions/add', methods=['POST'])
@token_verification_required
def addUser():
    data = request.get_json()
    username = data['username']
    usernameToAdd = data['usernameToAdd']
    password = data['password']
    role = data['role']

    if not usernameToAdd or not password or not role or not username:
        return jsonify({"error": "Missing fields"}), 400

    if usersCollection.find_one({"username": usernameToAdd}):
        return jsonify({"error": "User already exists"}), 409
    
    hashedPassword = hashPassword(password)
    usersCollection.insert_one({"username": usernameToAdd, "password": hashedPassword})
    usersInfoCollection.insert_one({'username': usernameToAdd, 'role': role })

    if usersCollection.find_one({"username": usernameToAdd}) and usersInfoCollection.find_one({"username": usernameToAdd}):
        action = USER_ACTIONS['add_user']
        details = f'Se añadió el usuario {usernameToAdd} con el rol {role}'
        log_user_action(username, action, details)
        return jsonify({"message": f"User '{usernameToAdd}' successfully added."}), 200
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
        action = USER_ACTIONS['modify_user']
        details = f'Rol de {usernameToModify} actualizado a {role}'
        log_user_action(username, action, details)
        return jsonify({'message': 'User accesses updated succesfully'})
    except:
        return jsonify({'error': 'Error updating the user accesses'})
