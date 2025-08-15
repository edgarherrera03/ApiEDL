import secrets
import bcrypt
from ..models.db import clientsCollection, ipCollection, hashCollection, domainCollection
from ..models.db import logsCollection
from datetime import datetime
from zoneinfo import ZoneInfo

# Funcion que permite encryptar password con salt
def hashPassword(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# Funcion que permite verificar password
def verifyPassword(password, hashed):
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))

# Generacion de token unico para cada cliente
def generate_unique_client_token():
    while True:
        token = secrets.token_urlsafe(16)
        if not clientsCollection.find_one({"clientToken": token}):
            return token

# Generacion de api key unica para cada cliente
def generate_unique_api_key():
    while True:
        apiKey = secrets.token_urlsafe(24)
        if not clientsCollection.find_one({"apiKey": apiKey}):
            return apiKey

# Lista de acciones que se registraran en los logs de usuarios
USER_ACTIONS = {
    'add_item_to_list': 'Añadió un elemento a una lista',
    'delete_item_from_list': 'Eliminó un elemento de una lista',
    'modify_item_from_list': 'Modificó un elemento',
    'comment_item': 'Agregó un nuevo comentario',
    'add_user': 'Añadió un usuario',
    'delete_user': 'Eliminó un usuario',
    'modify_user': 'Modificó un usuario',
    'add_client': 'Añadió un cliente',
    'delete_client': 'Eliminó un cliente',
    'modify_client': 'Modificó un cliente',
    'modify_expirationDate': 'Modificó la fecha de expiración', 
    'change_password': 'Cambio de contraseña',
    'modify_list_limit': 'Modificó el limite de una lista',
    'regenerate_api_key': 'Regeneró una Api_Key',
    'clean_logs': 'Eliminó logs',
}

# Permite acceder a las diferentes colecciones mas facilmente
COLLECTIONS = {
    'IpList': ipCollection,
    'WebsiteList': domainCollection,
    'HashList': hashCollection
}

# Funcion que permite registrar una accion en los logs de usuarios
def log_user_action(username, action, details):
    log_entry = {
        "username": username,
        "action": action,
        "details": details,
        "timestamp": datetime.now(ZoneInfo("America/El_Salvador")).strftime('%a, %d %b %Y %H:%M:%S GMT')
    }
    logsCollection.insert_one(log_entry)