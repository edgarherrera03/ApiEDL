import secrets
from .db import clientsCollection, usersCollection, usersInfoCollection
from ..utils.helpers import hashPassword

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
        "IpList": {
            'info': [
                {"ipAdress": "192.168.10.1", "classification": "Sospechoso", "ipRating": 60, 'blocked': False, 'lastUpdate': "2025-07-17"},
                {"ipAdress": "10.0.1.5", "classification": "Malicioso", "ipRating": 90, 'blocked': True, 'lastUpdate': "2025-07-15"},
                {"ipAdress": "172.16.10.12", "classification": "Seguro", "ipRating": 30, 'blocked': False, 'lastUpdate': "2025-07-10"},
            ],
            'lastUpdate': "2025-07-17",
            'listLimit': 10000
        },
        "WhiteList": ["192.168.10.1"],
        "WebsiteList": {
            'info': [
                {"domain": "https://portal.clienta.net", "classification": "Seguro", "ipRating": 10, 'blocked': False, 'lastUpdate': "2025-07-12"},
                {"domain": "https://login.clienta.net", "classification": "Sospechoso", "ipRating": 55, 'blocked': False, 'lastUpdate': "2025-07-08"}
            ],
            'lastUpdate': "2025-07-12",
            'listLimit': 10000
        },
        "HashList": {
            'info': [
                {"hash": "a1b2c3d4e5f6g7h8i9j0", "programName": "Trojan.Generic", "classification": "Malicioso", "hashRating": 95, "blocked": True, "lastUpdate": "2025-07-15"},
                {"hash": "f0e1d2c3b4a596877665", "programName": "Updater.exe", "classification": "Seguro", "hashRating": 10, "blocked": False, "lastUpdate": "2025-07-12"}
            ],
            'lastUpdate': "2025-07-15",
            'listLimit': 10000
        },
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
        "IpList": {
            'info': [
                {"ipAdress": "192.168.20.2", "classification": "Seguro", "ipRating": 15, 'blocked': False, 'lastUpdate': "2025-07-01"},
                {"ipAdress": "10.1.0.8", "classification": "Sospechoso", "ipRating": 50, 'blocked': False, 'lastUpdate': "2025-06-30"},
                {"ipAdress": "172.16.2.15", "classification": "Malicioso", "ipRating": 95, 'blocked': True, 'lastUpdate': "2025-07-16"},
            ],
            'lastUpdate': "2025-07-16",
            'listLimit': 10000
        },
        "WhiteList": ["10.1.0.8"],
        "WebsiteList": {
            'info': [
                {"domain": "https://clientb.services.com", "classification": "Sospechoso", "ipRating": 40, 'blocked': False, 'lastUpdate': "2025-07-10"},
                {"domain": "https://dashboard.clientb.com", "classification": "Malicioso", "ipRating": 85, 'blocked': True, 'lastUpdate': "2025-07-14"}
            ],
            'lastUpdate': "2025-07-14",
            'listLimit': 10000
        },
        "HashList": {
            'info': [
                {"hash": "123abc456def789ghi0", "programName": "Downloader.exe", "classification": "Sospechoso", "hashRating": 55, "blocked": False, "lastUpdate": "2025-07-13"},
                {"hash": "00011122233344455566", "programName": "CleanerTool.exe", "classification": "Seguro", "hashRating": 12, "blocked": False, "lastUpdate": "2025-07-10"}
            ],
            'lastUpdate': "2025-07-13",
            'listLimit': 10000
        },
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
        "IpList": {
            'info': [
                {"ipAdress": "192.168.3.3", "classification": "Malicioso", "ipRating": 80, 'blocked': True, 'lastUpdate': "2025-07-18"},
                {"ipAdress": "10.1.0.1", "classification": "Seguro", "ipRating": 20, 'blocked': False, 'lastUpdate': "2025-07-10"},
                {"ipAdress": "172.17.0.5", "classification": "Sospechoso", "ipRating": 50, 'blocked': False, 'lastUpdate': "2025-07-09"},
            ],
            'lastUpdate': "2025-07-18",
            'listLimit': 10000
        },
        "WhiteList": ["172.17.0.5", "10.1.0.1"],
        "WebsiteList": {
            'info': [
                {"domain": "https://clientc.net", "classification": "Seguro", "ipRating": 5, 'blocked': False, 'lastUpdate': "2025-07-05"}
            ],
            'lastUpdate': "2025-07-05",
            'listLimit': 10000
        },
        "HashList": {
            'info': [
                {"hash": "deadbeefcafebabe1234", "programName": "Spyware.exe", "classification": "Malicioso", "hashRating": 88, "blocked": True, "lastUpdate": "2025-07-18"}
            ],
            'lastUpdate': "2025-07-18",
            'listLimit': 10000
        },
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
        "IpList": {
            'info': [
                {"ipAdress": "192.168.4.4", "classification": "Sospechoso", "ipRating": 65, 'blocked': False, 'lastUpdate': "2025-07-02"},
                {"ipAdress": "10.2.0.6", "classification": "Malicioso", "ipRating": 85, 'blocked': True, 'lastUpdate': "2025-07-13"},
            ],
            'lastUpdate': '2023-04-01',
            'listLimit': 10000
        },
        "WhiteList": [],
        "WebsiteList": {
            'info': [
                {"domain": "https://clientd.org", "classification": "Seguro", "ipRating": 25, 'blocked': False, 'lastUpdate': "2025-07-01"},
                {"domain": "https://support.clientd.org", "classification": "Sospechoso", "ipRating": 70, 'blocked': False, 'lastUpdate': "2025-07-15"}
            ],
            'lastUpdate': "2025-07-15",
            'listLimit': 10000
        },
        "HashList": {
            'info': [
                {"hash": "beefcafe1234567890", "programName": "Installer.pkg", "classification": "Sospechoso", "hashRating": 60, "blocked": False, "lastUpdate": "2025-07-15"}
            ],
            'lastUpdate': "2025-07-15",
            'listLimit': 10000
        },
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
        "IpList": {
            'info': [
                {"ipAdress": "192.168.5.5", "classification": "Seguro", "ipRating": 10, 'blocked': False, 'lastUpdate': "2025-07-07"},
                {"ipAdress": "10.3.0.7", "classification": "Sospechoso", "ipRating": 45, 'blocked': False, 'lastUpdate': "2025-07-11"},
            ],
            'lastUpdate': "2025-07-11",
            'listLimit': 10000
        },
        "WhiteList": ["192.168.5.5"],
        "WebsiteList": {
            'info': [
                {"domain": "https://cliente.io", "classification": "Seguro", "ipRating": 20, 'blocked': False, 'lastUpdate': "2025-07-08"}
            ],
            'lastUpdate': "2025-07-08",
            'listLimit': 10000
        },
        "HashList": {
            'info': [
                {"hash": "hashsafeabcd123456", "programName": "DriverHelper", "classification": "Seguro", "hashRating": 15, "blocked": False, "lastUpdate": "2025-07-08"}
            ],
            'lastUpdate': "2025-07-08",
            'listLimit': 10000
        },
        "apiKey": secrets.token_urlsafe(24),
    },
]
def init_db():
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
        if clientsCollection.find_one({"id": client["id"]}):
            print(f"Client with ID '{client['id']}' already exists. Skipping.")
            continue

        clientsCollection.insert_one(client)
        print(f"Client with ID '{client['id']}' registered.")