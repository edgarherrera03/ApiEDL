import secrets
import bcrypt
from ..models.db import clientsCollection

def hashPassword(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verifyPassword(password, hashed):
    return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))

def generate_unique_client_token():
    while True:
        token = secrets.token_urlsafe(16)
        if not clientsCollection.find_one({"clientToken": token}):
            return token

def generate_unique_api_key():
    while True:
        apiKey = secrets.token_urlsafe(24)
        if not clientsCollection.find_one({"apiKey": apiKey}):
            return apiKey

