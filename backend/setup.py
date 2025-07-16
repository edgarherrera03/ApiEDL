from pymongo import MongoClient
from utils import hashPassword
import secrets

client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["ApiEDLDatabase"]
usersCollection = db["users"]
usersInfoCollection = db["usersInfo"]
clientsColection = db["clients"]

users = [
    {"username": "edgar", "password": "pass123"},
    {"username": "sofia", "password": "abc456"},
    {"username": "admin", "password": "admin123"},
    {"username": "guest", "password": "guest123"},
]

usersInfo = [
    {"username": "edgar", "role": "admin"},
    {"username": "sofia", "role": "admin"},
    {"username": "admin", "role": "admin"},
    {"username": "guest", "role": "reader"},
]

clients = [
    {
        'id': 1,
        "name": "Client A",
        "username": "Client_A",
        "creationDate": "2023-01-01",
        "updateDate": "2023-01-10",
        "expirationDate": "2026-01-01",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": ["192.168.1.1", "10.0.0.5", "172.16.0.12"],
        "WhiteList": ["192.168.1.1"],
        "WebsiteList": ["https://clienta.com", "https://dashboard.clienta.com"],
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 2,
        "name": "Client B",
        "username": "Client_B",
        "creationDate": "2023-02-01",
        "updateDate": "2023-02-10",
        "expirationDate": "2026-02-01",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": ["192.168.2.2", "10.0.0.8", "172.16.1.15"],
        "WhiteList": ["10.0.0.8"],
        "WebsiteList": ["https://clientb.com", "https://api.clientb.com"],
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 3,
        "name": "Client C",
        "username": "Client_C",
        "creationDate": "2023-03-01",
        "updateDate": "2023-03-10",
        "expirationDate": "2026-03-01",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": ["192.168.3.3", "10.1.0.1", "172.17.0.5"],
        "WhiteList": ["172.17.0.5", "10.1.0.1"],
        "WebsiteList": ["https://clientc.net"],
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 4,
        "name": "Client D",
        "username": "Client_D",
        "creationDate": "2023-04-01",
        "updateDate": "2023-04-10",
        "expirationDate": "2026-04-01",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": ["192.168.4.4", "10.2.0.6"],
        "WhiteList": [],
        "WebsiteList": ["https://clientd.org", "https://support.clientd.org"],
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 5,
        "name": "Client E",
        "username": "Client_E",
        "creationDate": "2023-05-01",
        "updateDate": "2023-05-10",
        "expirationDate": "2026-05-01",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": ["192.168.5.5"],
        "WhiteList": ["192.168.5.5"],
        "WebsiteList": ["https://cliente.io"],
        "apiKey": secrets.token_urlsafe(24),
    },
]
for user in users:
    if usersCollection.find_one({"username": user["username"]}):
        print(f"User '{user['username']}' already exists. Skipping.")
        continue

    hashedPassword = hashPassword(user["password"])
    usersCollection.insert_one({
        "username": user["username"],
        "password": hashedPassword,
    })
    print(f"User '{user['username']}' registered.")

for user in usersInfo:
    if usersInfoCollection.find_one({"username": user["username"]}):
        print(f"User '{user['username']}' already exists. Skipping.")
        continue

    usersInfoCollection.insert_one({
        "username": user["username"],
        "role": user['role'],
    })
    print(f"User '{user['username']}' registered.")

for client in clients:
    if clientsColection.find_one({"id": client["id"]}):
        print(f"Client with ID '{client['id']}' already exists. Skipping.")
        continue

    clientsColection.insert_one(client)
    print(f"Client with ID '{client['id']}' registered.")