import jwt
from flask import request, jsonify, current_app
from functools import wraps

# Decorador que verifica las cookies para saber si el usuario esta loggeado o no (por default el token vence a los 30min)
def token_verification_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get("access_token")
        if not token:
            return jsonify({"error": "Token missing"}), 403
        try:
            jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated