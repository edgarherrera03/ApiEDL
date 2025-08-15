import secrets
from .db import clientsCollection, usersCollection, usersInfoCollection, ipCollection, domainCollection, hashCollection
from ..utils.helpers import hashPassword

"""
    Este documento contiene la inicialización del programa. 
    Los datos incluidos son completamente ficticios y generados por ChatGPT. 
    El código tiene como objetivo probar funcionalidades de la aplicación utilizando 
    una base de datos con datos de prueba.
"""

users = [
    {"username": "admin", "password": "pass123"},
    {"username": "grossi", "password": "abc456"},
    {"username": "kvillalta", "password": "admin123"},
    {"username": "acostaj", "password": "guest123"},
    {"username": "wilfredo", "password": "guest123"},
    {"username": "daquino", "password": "guest123"},
    {"username": "edgar", "password": "guest123"},
]

usersInfo = [
    {"username": "admin", "role": "admin"},
    {"username": "grossi", "role": "admin"},
    {"username": "kvillalta", "role": "admin"},
    {"username": "acostaj", "role": "admin"},
    {"username": "wilfredo", "role": "admin"},
    {"username": "daquino", "role": "admin"},
    {"username": "edgar", "role": "admin"},
]

ipAdresses = [
    {"element": "192.168.10.1", "type": "ip", "classification": "Sospechoso", "rating": 60, "blocked": False, "lastUpdate": "Mon, 17 Jul 2025 00:00:00 GMT", "creationDate": "Tue, 15 Jul 2025 00:00:00 GMT", "clients": ["Client_A"], "country": "Argentina", "addedBy": "edgar"},
    {"element": "10.0.1.5", "type": "ip", "classification": "Malicioso", "rating": 90, "blocked": True, "lastUpdate": "Sat, 15 Jul 2025 00:00:00 GMT", "creationDate": "Fri, 14 Jun 2024 00:00:00 GMT", "clients": ["Client_A"], "country": "Argentina", "addedBy": "sofia"},
    {"element": "172.16.10.12", "type": "ip", "classification": "Seguro", "rating": 30, "blocked": False, "lastUpdate": "Thu, 10 Jul 2025 00:00:00 GMT", "creationDate": "Thu, 10 Jul 2023 00:00:00 GMT", "clients": ["Client_A"], "country": "Argentina", "addedBy": "admin"},
    {"element": "192.168.20.2", "type": "ip", "classification": "Seguro", "rating": 15, "blocked": False, "lastUpdate": "Tue, 01 Jul 2025 00:00:00 GMT", "creationDate": "Tue, 01 Jul 2025 00:00:00 GMT", "clients": ["Client_B"], "country": "Brasil", "addedBy": "guest"},
    {"element": "10.1.0.8", "type": "ip", "classification": "Sospechoso", "rating": 50, "blocked": False, "lastUpdate": "Mon, 30 Jun 2025 00:00:00 GMT", "creationDate": "Sun, 29 Jun 2024 00:00:00 GMT", "clients": ["Client_B"], "country": "Brasil", "addedBy": "edgar"},
    {"element": "172.16.2.15", "type": "ip", "classification": "Malicioso", "rating": 95, "blocked": True, "lastUpdate": "Wed, 16 Jul 2025 00:00:00 GMT", "creationDate": "Wed, 16 Jul 2025 00:00:00 GMT", "clients": ["Client_B"], "country": "Brasil", "addedBy": "sofia"},
    {"element": "192.168.3.3", "type": "ip", "classification": "Malicioso", "rating": 80, "blocked": True, "lastUpdate": "Fri, 18 Jul 2025 00:00:00 GMT", "creationDate": "Thu, 17 Jul 2023 00:00:00 GMT", "clients": ["Client_C"], "country": "Chile", "addedBy": "admin"},
    {"element": "10.1.0.1", "type": "ip", "classification": "Seguro", "rating": 20, "blocked": False, "lastUpdate": "Thu, 10 Jul 2025 00:00:00 GMT", "creationDate": "Wed, 09 Jul 2024 00:00:00 GMT", "clients": ["Client_C"], "country": "Chile", "addedBy": "guest"},
    {"element": "172.17.0.5", "type": "ip", "classification": "Sospechoso", "rating": 50, "blocked": False, "lastUpdate": "Wed, 09 Jul 2025 00:00:00 GMT", "creationDate": "Tue, 08 Jul 2023 00:00:00 GMT", "clients": ["Client_C"], "country": "Chile", "addedBy": "edgar"},
    {"element": "192.168.4.4", "type": "ip", "classification": "Sospechoso", "rating": 65, "blocked": False, "lastUpdate": "Wed, 02 Jul 2025 00:00:00 GMT", "creationDate": "Mon, 01 Jul 2025 00:00:00 GMT", "clients": ["Client_D"], "country": "Uruguay", "addedBy": "sofia"},
    {"element": "10.2.0.6", "type": "ip", "classification": "Malicioso", "rating": 85, "blocked": True, "lastUpdate": "Sun, 13 Jul 2025 00:00:00 GMT", "creationDate": "Sat, 12 Jul 2024 00:00:00 GMT", "clients": ["Client_D"], "country": "Uruguay", "addedBy": "admin"},
    {"element": "192.168.5.5", "type": "ip", "classification": "Seguro", "rating": 10, "blocked": False, "lastUpdate": "Mon, 07 Jul 2025 00:00:00 GMT", "creationDate": "Sun, 06 Jul 2023 00:00:00 GMT", "clients": ["Client_E"], "country": "México", "addedBy": "guest"},
    {"element": "10.3.0.7", "type": "ip", "classification": "Sospechoso", "rating": 45, "blocked": False, "lastUpdate": "Fri, 11 Jul 2025 00:00:00 GMT", "creationDate": "Thu, 10 Jul 2025 00:00:00 GMT", "clients": ["Client_E"], "country": "México", "addedBy": "edgar"}
]

websites = [
    {"element": "https://login.clienta.net", "classification": "Sospechoso", "rating": 55, "blocked": False, "lastUpdate": "Tue, 08 Jul 2025 00:00:00 GMT", "creationDate": "Mon, 07 Jul 2025 00:00:00 GMT", "clients": ["Client_A"], "country": "Argentina", "addedBy": "edgar", "type": "domain"},
    {"element": "https://portal.clienta.net", "classification": "Seguro", "rating": 10, "blocked": False, "lastUpdate": "Sat, 12 Jul 2025 00:00:00 GMT", "creationDate": "Fri, 11 Jul 2024 00:00:00 GMT", "clients": ["Client_A"], "country": "Argentina", "addedBy": "sofia", "type": "domain"},
    {"element": "https://clientb.services.com", "classification": "Sospechoso", "rating": 40, "blocked": False, "lastUpdate": "Thu, 10 Jul 2025 00:00:00 GMT", "creationDate": "Wed, 09 Jul 2023 00:00:00 GMT", "clients": ["Client_B"], "country": "Brasil", "addedBy": "admin", "type": "domain"},
    {"element": "https://dashboard.clientb.com", "classification": "Malicioso", "rating": 85, "blocked": True, "lastUpdate": "Mon, 14 Jul 2025 00:00:00 GMT", "creationDate": "Sun, 13 Jul 2025 00:00:00 GMT", "clients": ["Client_B"], "country": "Brasil", "addedBy": "guest", "type": "domain"},
    {"element": "https://clientc.net", "classification": "Seguro", "rating": 5, "blocked": False, "lastUpdate": "Wed, 05 Jul 2025 00:00:00 GMT", "creationDate": "Tue, 04 Jul 2025 00:00:00 GMT", "clients": ["Client_C"], "country": "Chile", "addedBy": "edgar", "type": "domain"},
    {"element": "https://clientd.org", "classification": "Seguro", "rating": 25, "blocked": False, "lastUpdate": "Tue, 01 Jul 2025 00:00:00 GMT", "creationDate": "Mon, 30 Jun 2024 00:00:00 GMT", "clients": ["Client_D"], "country": "Uruguay", "addedBy": "sofia", "type": "domain"},
    {"element": "https://support.clientd.org", "classification": "Sospechoso", "rating": 70, "blocked": False, "lastUpdate": "Tue, 15 Jul 2025 00:00:00 GMT", "creationDate": "Mon, 14 Jul 2023 00:00:00 GMT", "clients": ["Client_D"], "country": "Uruguay", "addedBy": "admin", "type": "domain"},
    {"element": "https://cliente.io", "classification": "Seguro", "rating": 20, "blocked": False, "lastUpdate": "Tue, 08 Jul 2025 00:00:00 GMT", "creationDate": "Mon, 07 Jul 2025 00:00:00 GMT", "clients": ["Client_E"], "country": "México", "addedBy": "guest", "type": "domain"}
]

hashList = [
    {
        'element': 'a1b2c3d4e5f6g7h8i9j0',
        'programName': 'Trojan.Generic',
        'classification': 'Malicioso',
        'rating': 95,
        'blocked': True,
        'lastUpdate': 'Tue, 15 Jul 2025 00:00:00 GMT',
        'creationDate': 'Mon, 14 Jul 2024 00:00:00 GMT',
        'clients': ['Client_A'],
        'country': 'Argentina',
        'addedBy': 'edgar',
        'type': 'hash'
    },
    {
        'element': 'f0e1d2c3b4a596877665',
        'programName': 'Updater.exe',
        'classification': 'Seguro',
        'rating': 10,
        'blocked': False,
        'lastUpdate': 'Fri, 12 Jul 2024 00:00:00 GMT',
        'creationDate': 'Thu, 11 Jul 2023 00:00:00 GMT',
        'clients': ['Client_A'],
        'country': 'Argentina',
        'addedBy': 'sofia',
        'type': 'hash'
    },
    {
        'element': '123abc456def789ghi0',
        'programName': 'Downloader.exe',
        'classification': 'Sospechoso',
        'rating': 55,
        'blocked': False,
        'lastUpdate': 'Sat, 13 Jul 2024 00:00:00 GMT',
        'creationDate': 'Fri, 12 Jul 2024 00:00:00 GMT',
        'clients': ['Client_B'],
        'country': 'Brasil',
        'addedBy': 'admin',
        'type': 'hash'
    },
    {
        'element': '00011122233344455566',
        'programName': 'CleanerTool.exe',
        'classification': 'Seguro',
        'rating': 12,
        'blocked': False,
        'lastUpdate': 'Wed, 10 Jul 2024 00:00:00 GMT',
        'creationDate': 'Tue, 09 Jul 2024 00:00:00 GMT',
        'clients': ['Client_B'],
        'country': 'Brasil',
        'addedBy': 'guest',
        'type': 'hash'
    },
    {
        'element': 'deadbeefcafebabe1234',
        'programName': 'Spyware.exe',
        'classification': 'Malicioso',
        'rating': 88,
        'blocked': True,
        'lastUpdate': 'Sat, 18 Jul 2025 00:00:00 GMT',
        'creationDate': 'Fri, 17 Jul 2023 00:00:00 GMT',
        'clients': ['Client_C'],
        'country': 'Chile',
        'addedBy': 'edgar',
        'type': 'hash'
    },
    {
        'element': 'beefcafe1234567890',
        'programName': 'Installer.pkg',
        'classification': 'Sospechoso',
        'rating': 60,
        'blocked': False,
        'lastUpdate': 'Tue, 15 Jul 2025 00:00:00 GMT',
        'creationDate': 'Mon, 14 Jul 2025 00:00:00 GMT',
        'clients': ['Client_D'],
        'country': 'Uruguay',
        'addedBy': 'sofia',
        'type': 'hash'
    },
    {
        'element': 'hashsafeabcd123456',
        'programName': 'DriverHelper',
        'classification': 'Seguro',
        'rating': 15,
        'blocked': False,
        'lastUpdate': 'Tue, 08 Jul 2025 00:00:00 GMT',
        'creationDate': 'Mon, 07 Jul 2024 00:00:00 GMT',
        'clients': ['Client_E'],
        'country': 'México',
        'addedBy': 'admin',
        'type': 'hash'
    }
]

clients = [
    {
        'id': 1,
        "name": "Client A",
        "username": "Client_A",
        "creationDate": "Sun, 01 Jan 2023 00:00:00 GMT",
        "updateDate": "Tue, 10 Jan 2023 00:00:00 GMT",
        "expirationDate": "Wed, 01 Jan 2026 00:00:00 GMT",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": {
            'info': ["192.168.10.1", "10.0.1.5", "172.16.10.12"],
            'lastUpdate': "Thu, 17 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "WhiteList": ["192.168.10.1"],
        "WebsiteList": {
            'info': ["https://login.clienta.net", "https://portal.clienta.net"],
            'lastUpdate': "Mon, 12 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["a1b2c3d4e5f6g7h8i9j0", "f0e1d2c3b4a596877665"],
            'lastUpdate': "Tue, 15 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 2,
        "name": "Client B",
        "username": "Client_B",
        "creationDate": "Wed, 01 Feb 2023 00:00:00 GMT",
        "updateDate": "Fri, 10 Feb 2023 00:00:00 GMT",
        "expirationDate": "Thu, 01 Feb 2026 00:00:00 GMT",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": {
            'info': ["192.168.20.2", "10.1.0.8", "172.16.2.15"],
            'lastUpdate': "Wed, 16 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "WhiteList": ["10.1.0.8"],
        "WebsiteList": {
            'info': ["https://clientb.services.com", "https://dashboard.clientb.com"],
            'lastUpdate': "Mon, 14 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["123abc456def789ghi0", "00011122233344455566"],
            'lastUpdate': "Sun, 13 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 3,
        "name": "Client C",
        "username": "Client_C",
        "creationDate": "Wed, 01 Mar 2023 00:00:00 GMT",
        "updateDate": "Fri, 10 Mar 2023 00:00:00 GMT",
        "expirationDate": "Mon, 01 Mar 2026 00:00:00 GMT",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": {
            'info': ["192.168.3.3", "10.1.0.1", "172.17.0.5"],
            'lastUpdate': "Fri, 18 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "WhiteList": ["172.17.0.5", "10.1.0.1"],
        "WebsiteList": {
            'info': ["https://clientc.net"],
            'lastUpdate': "Sat, 05 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["deadbeefcafebabe1234"],
            'lastUpdate': "Fri, 18 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 4,
        "name": "Client D",
        "username": "Client_D",
        "creationDate": "Sat, 01 Apr 2023 00:00:00 GMT",
        "updateDate": "Mon, 10 Apr 2023 00:00:00 GMT",
        "expirationDate": "Tue, 01 Apr 2026 00:00:00 GMT",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": {
            'info': ["192.168.4.4", "10.2.0.6"],
            'lastUpdate': 'Sat, 01 Apr 2023 00:00:00 GMT',
            'listLimit': 10000
        },
        "WhiteList": [],
        "WebsiteList": {
            'info': ["https://clientd.org", "https://support.clientd.org"],
            'lastUpdate': "Tue, 15 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["beefcafe1234567890"],
            'lastUpdate': "Tue, 15 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "apiKey": secrets.token_urlsafe(24),
    },
    {
        'id': 5,
        "name": "Client E",
        "username": "Client_E",
        "creationDate": "Mon, 01 May 2023 00:00:00 GMT",
        "updateDate": "Wed, 10 May 2023 00:00:00 GMT",
        "expirationDate": "Wed, 01 May 2026 00:00:00 GMT",
        "clientToken": secrets.token_urlsafe(16),
        "IpList": {
            'info': ["192.168.5.5", "10.3.0.7"],
            'lastUpdate': "Fri, 11 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "WhiteList": ["192.168.5.5"],
        "WebsiteList": {
            'info': ["https://cliente.io"],
            'lastUpdate': "Tue, 08 Jul 2025 00:00:00 GMT",
            'listLimit': 10000
        },
        "HashList": {
            'info': ["hashsafeabcd123456"],
            'lastUpdate': "Tue, 08 Jul 2025 00:00:00 GMT",
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
