from flask import Blueprint, request, jsonify, render_template
from app.utils.auth import token_verification_required
from app.models.db import logsCollection, clientsCollection
from datetime import datetime
from app.utils.helpers import COLLECTIONS

bp = Blueprint('utils', __name__, url_prefix='/api/utils', template_folder='templates')

@bp.route('/logs')
@token_verification_required
def getLogs():
    response = []
    for log in logsCollection.find():
        response.append({
            "username": log['username'],
            "action": log['action'],
            "details": log['details'],
            "timestamp": log['timestamp'],
        })

    if response:
        # Convertir y ordenar por fecha real (más reciente primero)
        sorted_logs = sorted(
            response,
            key=lambda x: datetime.strptime(x["timestamp"], "%a, %d %b %Y %H:%M:%S GMT"),
            reverse=True
        )
        return jsonify({'message': 'Logs information fetched', 'logs': sorted_logs}), 200
    else:
        return jsonify({'error': 'No se encontraron los logs'}), 404

@bp.route('/edls/get_edl', methods=['GET'])
def get_edl():
    listType = request.args.get('list_type')
    username = request.args.get('username')
    api_key = request.args.get('api_key')

    if not all([listType, username, api_key]):
        return render_template('not_found.template.html', message="Missing required parameters"), 400

    collection = COLLECTIONS[listType]
    client = clientsCollection.find_one({'username': username})
    if not client:
        return render_template('not_found.template.html', message="Cliente no encontrado"), 404
    
    if client.get('apiKey') != api_key:
        return render_template('not_found.template.html', message="API key inválida"), 403
    
    # Esta lista contiene la lista de elementos que tienen como estatus bloqueado
    itemBlockedList = []
    for item in client[listType]['info']:
        element = collection.find_one({'element': item})
        if element and element['blocked']:
            itemBlockedList.append(item)
        else: 
            pass

    return render_template(
        'list.template.html',
        items=itemBlockedList)
