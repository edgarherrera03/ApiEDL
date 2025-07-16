import bcrypt

def hashPassword(password: str) -> str:
    salt = bcrypt.gensalt()
    hashedPassword = bcrypt.hashpw(password.encode(), salt)
    return hashedPassword.decode()

def verifyPassword(password: str, hashedPassword) -> bool:
    return bcrypt.checkpw(password.encode(), hashedPassword.encode())
