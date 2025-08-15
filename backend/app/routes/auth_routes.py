from flask import Blueprint, request, jsonify, make_response
from datetime import datetime, timedelta, timezone
import jwt

from app.models.db import usersCollection, usersInfoCollection
from app.utils.helpers import hashPassword, verifyPassword
from app.utils.auth import token_verification_required
from app.utils.helpers import USER_ACTIONS, log_user_action
from flask import current_app as app

bp = Blueprint('auth', __name__, url_prefix='/api')

'''
    En este documento se detallan todas las funciones utilizada para el manejo de la sesion de un cliente
    y su autenticacion.
'''

# Funcion que verifica si el token de autenticacion del cliente sigue valido
@bp.route("/token-verification")
@token_verification_required
def token_verification():
    return jsonify({"message": "Token is valid"}), 200

# Funcion que maneja el login de un cliente (crea un token de autenticacion con una expiracion de 30 min)
@bp.route("/login", methods=["POST"])
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
            secure=True,
            samesite="Lax",
            max_age=1800, # 1800 segundo -> 30 min 
        )
        return response
    else:
        return jsonify({"error" : "Usuario o contraseña inválidos"}), 401

# Funcion que elimina el token de autenticacion de las cookies y saca de la sesion al usuario
@bp.route('/logout',  methods=["POST"])
@token_verification_required
def logout():
    response = make_response(jsonify({"message": "Logged out"}))
    response.set_cookie("access_token", "", expires=0)
    return response

@bp.route("/modify-password", methods=['POST'])
@token_verification_required
def changePassword():
    data = request.get_json()
    username = data["username"]
    newPassword = data["password"]

    if not username or not newPassword:
        return jsonify({"error": "Missing fields"}), 400

    user = usersCollection.find_one({"username": username})
    if not user:
        return jsonify({"error": "El usuario no existe"}), 409
    else:
        hashedPassword = hashPassword(newPassword)
        usersCollection.update_one(
            {"username": username},
            {"$set": {"password": hashedPassword}}
        )
        action = USER_ACTIONS['change_password']
        details = f'Cambio de contraseña del usuario {username}'
        log_user_action(username, action, details)
        return jsonify({"message": "Contraseña modificada correctamente"}), 200