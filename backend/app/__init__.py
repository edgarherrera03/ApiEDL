from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from app.models.init_db import init_db
from app.routes import auth_routes, user_routes, client_routes, utils_routes

def create_app():
    load_dotenv()
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    CORS(app, supports_credentials=True, origins=["http://127.0.0.1:3000"])

    init_db()

    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(client_routes.bp)
    app.register_blueprint(utils_routes.bp)

    return app