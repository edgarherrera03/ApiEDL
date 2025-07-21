from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["ApiEDLDatabase"]

usersCollection = db["users"]
usersInfoCollection = db["usersInfo"]
clientsCollection = db["clients"]
logsCollection = db["usersLogs"]

