from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
# Nombre de la base de datos
db = client["ApiEDLDatabase"]

# Nombre de las colecciones
usersCollection = db["users"]
usersInfoCollection = db["usersInfo"]
clientsCollection = db["clients"]
logsCollection = db["usersLogs"]
ipCollection = db['ipAdress']
domainCollection = db['hash']
hashCollection = db['domain']


