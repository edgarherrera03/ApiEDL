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

    CORS(app, supports_credentials=True)

    app.register_blueprint(auth_routes.bp)
    app.register_blueprint(user_routes.bp)
    app.register_blueprint(client_routes.bp)
    app.register_blueprint(utils_routes.bp)
    app.register_blueprint(items_routes.bp)

    # Permite que la app redirija a la pagina correspondiente al hacer reload -> ligado al uso de react-router
    @app.route('/home', defaults={'path': 'home'})
    @app.route('/dashboard', defaults={'path': 'dashboard'})
    @app.route('/clientes', defaults={'path': 'clientes'})
    @app.route('/clientes/<path:path>')
    @app.route('/registros', defaults={'path': 'registros'})
    @app.route('/users', defaults={'path': 'users'})
    @app.route('/logs', defaults={'path': 'logs'})
    @app.route('/user', defaults={'path': 'user'})
    @app.route('/', defaults={'path': ''})
    def serve_react(path):
        return send_from_directory(app.static_folder, 'index.html')
    
    # Usar unicamente para pruebas a la aplicacion
    # init_db()
    return app
