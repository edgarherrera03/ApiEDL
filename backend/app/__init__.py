from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import os

from app.models.init_db import init_db
from app.routes import auth_routes, user_routes, client_routes, utils_routes, items_routes

def create_app():
    load_dotenv()
    app = Flask(__name__, static_folder='../build', static_url_path='') 
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    CORS(app, supports_credentials=True, origins=["http://localhost:3000", "http://172.31.11.52:3000"])

    init_db()

    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(client_routes.bp)
    app.register_blueprint(utils_routes.bp)
    app.register_blueprint(items_routes.bp)

    # Ruta para servir React (build)
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    return app