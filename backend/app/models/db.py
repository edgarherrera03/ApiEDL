from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
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


