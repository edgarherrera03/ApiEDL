import secrets
from .db import clientsCollection, usersCollection, usersInfoCollection, ipCollection, domainCollection, hashCollection
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

ipAdresses = [
    {"element": "192.168.10.1", "classification": "Sospechoso", "ipRating": 60, "blocked": False, "lastUpdate": "2025-07-17", "clients": ["Client_A"]},
    {"element": "10.0.1.5", "classification": "Malicioso", "ipRating": 90, "blocked": True, "lastUpdate": "2025-07-15", "clients": ["Client_A"]},
    {"element": "172.16.10.12", "classification": "Seguro", "ipRating": 30, "blocked": False, "lastUpdate": "2025-07-10", "clients": ["Client_A"]},
    {"element": "192.168.20.2", "classification": "Seguro", "ipRating": 15, "blocked": False, "lastUpdate": "2025-07-01", "clients": ["Client_B"]},
    {"element": "10.1.0.8", "classification": "Sospechoso", "ipRating": 50, "blocked": False, "lastUpdate": "2025-06-30", "clients": ["Client_B"]},
    {"element": "172.16.2.15", "classification": "Malicioso", "ipRating": 95, "blocked": True, "lastUpdate": "2025-07-16", "clients": ["Client_B"]},
    {"element": "192.168.3.3", "classification": "Malicioso", "ipRating": 80, "blocked": True, "lastUpdate": "2025-07-18", "clients": ["Client_C"]},
    {"element": "10.1.0.1", "classification": "Seguro", "ipRating": 20, "blocked": False, "lastUpdate": "2025-07-10", "clients": ["Client_C"]},
    {"element": "172.17.0.5", "classification": "Sospechoso", "ipRating": 50, "blocked": False, "lastUpdate": "2025-07-09", "clients": ["Client_C"]},
    {"element": "192.168.4.4", "classification": "Sospechoso", "ipRating": 65, "blocked": False, "lastUpdate": "2025-07-02", "clients": ["Client_D"]},
    {"element": "10.2.0.6", "classification": "Malicioso", "ipRating": 85, "blocked": True, "lastUpdate": "2025-07-13", "clients": ["Client_D"]},
    {"element": "192.168.5.5", "classification": "Seguro", "ipRating": 10, "blocked": False, "lastUpdate": "2025-07-07", "clients": ["Client_E"]},
    {"element": "10.3.0.7", "classification": "Sospechoso", "ipRating": 45, "blocked": False, "lastUpdate": "2025-07-11", "clients": ["Client_E"]}
]

websites = [
    {"element": "https://login.clienta.net", "classification": "Sospechoso", "ipRating": 55, "blocked": False, "lastUpdate": "2025-07-08", "clients": ["Client_A"]},
    {"element": "https://portal.clienta.net", "classification": "Seguro", "ipRating": 10, "blocked": False, "lastUpdate": "2025-07-12", "clients": ["Client_A"]},
    {"element": "https://clientb.services.com", "classification": "Sospechoso", "ipRating": 40, "blocked": False, "lastUpdate": "2025-07-10", "clients": ["Client_B"]},
    {"element": "https://dashboard.clientb.com", "classification": "Malicioso", "ipRating": 85, "blocked": True, "lastUpdate": "2025-07-14", "clients": ["Client_B"]},
    {"element": "https://clientc.net", "classification": "Seguro", "ipRating": 5, "blocked": False, "lastUpdate": "2025-07-05", "clients": ["Client_C"]},
    {"element": "https://clientd.org", "classification": "Seguro", "ipRating": 25, "blocked": False, "lastUpdate": "2025-07-01", "clients": ["Client_D"]},
    {"element": "https://support.clientd.org", "classification": "Sospechoso", "ipRating": 70, "blocked": False, "lastUpdate": "2025-07-15", "clients": ["Client_D"]},
    {"element": "https://cliente.io", "classification": "Seguro", "ipRating": 20, "blocked": False, "lastUpdate": "2025-07-08", "clients": ["Client_E"]}
]

hashList = [
    {"element": "a1b2c3d4e5f6g7h8i9j0", "programName": "Trojan.Generic", "classification": "Malicioso", "hashRating": 95, "blocked": True, "lastUpdate": "2025-07-15", "clients": ["Client_A"]},
    {"element": "f0e1d2c3b4a596877665", "programName": "Updater.exe", "classification": "Seguro", "hashRating": 10, "blocked": False, "lastUpdate": "2025-07-12", "clients": ["Client_A"]},
    {"element": "123abc456def789ghi0", "programName": "Downloader.exe", "classification": "Sospechoso", "hashRating": 55, "blocked": False, "lastUpdate": "2025-07-13", "clients": ["Client_B"]},
    {"element": "00011122233344455566", "programName": "CleanerTool.exe", "classification": "Seguro", "hashRating": 12, "blocked": False, "lastUpdate": "2025-07-10", "clients": ["Client_B"]},
    {"element": "deadbeefcafebabe1234", "programName": "Spyware.exe", "classification": "Malicioso", "hashRating": 88, "blocked": True, "lastUpdate": "2025-07-18", "clients": ["Client_C"]},
    {"element": "beefcafe1234567890", "programName": "Installer.pkg", "classification": "Sospechoso", "hashRating": 60, "blocked": False, "lastUpdate": "2025-07-15", "clients": ["Client_D"]},
    {"element": "hashsafeabcd123456", "programName": "DriverHelper", "classification": "Seguro", "hashRating": 15, "blocked": False, "lastUpdate": "2025-07-08", "clients": ["Client_E"]}
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
            'info': ["192.168.10.1", "10.0.1.5", "172.16.10.12"],
            'lastUpdate': "2025-07-17",
            'listLimit': 10000
        },
        "WhiteList": ["192.168.10.1"],
        "WebsiteList": {
            'info': ["https://login.clienta.net", "https://portal.clienta.net"],
            'lastUpdate': "2025-07-12",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["a1b2c3d4e5f6g7h8i9j0", "f0e1d2c3b4a596877665"],
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
            'info': ["192.168.20.2", "10.1.0.8", "172.16.2.15"],
            'lastUpdate': "2025-07-16",
            'listLimit': 10000
        },
        "WhiteList": ["10.1.0.8"],
        "WebsiteList": {
            'info': ["https://clientb.services.com", "https://dashboard.clientb.com"],
            'lastUpdate': "2025-07-14",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["123abc456def789ghi0", "00011122233344455566"],
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
            'info': ["192.168.3.3", "10.1.0.1", "172.17.0.5"],
            'lastUpdate': "2025-07-18",
            'listLimit': 10000
        },
        "WhiteList": ["172.17.0.5", "10.1.0.1"],
        "WebsiteList": {
            'info': ["https://clientc.net"],
            'lastUpdate': "2025-07-05",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["deadbeefcafebabe1234"],
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
            'info': ["192.168.4.4", "10.2.0.6"],
            'lastUpdate': '2023-04-01',
            'listLimit': 10000
        },
        "WhiteList": [],
        "WebsiteList": {
            'info': ["https://clientd.org", "https://support.clientd.org"],
            'lastUpdate': "2025-07-15",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["beefcafe1234567890"],
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
            'info': ["192.168.5.5", "10.3.0.7"],
            'lastUpdate': "2025-07-11",
            'listLimit': 10000
        },
        "WhiteList": ["192.168.5.5"],
        "WebsiteList": {
            'info': ["https://cliente.io"],
            'lastUpdate': "2025-07-08",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["hashsafeabcd123456"],
            'lastUpdate': "2025-07-08",
            'listLimit': 10000
        },
        "apiKey": secrets.token_urlsafe(24),
    }
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
    
    for ipAdress in ipAdresses:
        if ipCollection.find_one({'element': ipAdress['element']}):
            print(f"Ip Adress '{ipAdress['element']}' already exists. Skipping.")
            continue
        ipCollection.insert_one(ipAdress)
        print(f"Ip Adress '{ipAdress['element']}' registered.")
    
    for website in websites:
        if domainCollection.find_one({'element': website['element']}):
            print(f"Domain '{website['element']}' already exists. Skipping.")
            continue
        domainCollection.insert_one(website)
        print(f"Domain '{website['element']}' registered.")
    
    for hash in hashList:
        if hashCollection.find_one({'element': hash['element']}):
            print(f"Hash '{hash['element']}' already exists. Skipping.")
            continue
        hashCollection.insert_one(hash)
        print(f"Hash '{hash['element']}' registered.")