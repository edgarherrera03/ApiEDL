from flask import Blueprint, request, jsonify, render_template
from app.utils.auth import token_verification_required
from app.models.db import logsCollection, clientsCollection
from datetime import datetime
from app.utils.helpers import COLLECTIONS, USER_ACTIONS, log_user_action
from zoneinfo import ZoneInfo
import os

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

@bp.route('/logs/clean', methods=['POST'])
@token_verification_required
def cleanLogs():
    data = request.get_json()
    username = data.get('username')
    cleanDateStr = data.get('cleanDate')

    if not username or not cleanDateStr:
        return jsonify({"error": "Faltan campos username o cleanDate"}), 400

    try:
        # Convertimos cleanDateStr (YYYY-MM-DD) a datetime a medianoche para comparar correctamente
        cleanDate = datetime.strptime(cleanDateStr, "%Y-%m-%d")
    except ValueError:
        return jsonify({"error": "Formato de fecha inválido. Debe ser: 'YYYY-MM-DD'"}), 400

    # Buscar logs a eliminar (con fecha anterior a cleanDate)
    logs_to_delete_ids = []
    for log in logsCollection.find():
        try:
            log_date = datetime.strptime(log['timestamp'], "%a, %d %b %Y %H:%M:%S GMT")
            if log_date < cleanDate:
                logs_to_delete_ids.append(log['_id'])
        except Exception:
            # Ignorar logs con timestamp en formato inválido
            pass

    if logs_to_delete_ids:
        result = logsCollection.delete_many({"_id": {"$in": logs_to_delete_ids}})
        deleted_count = result.deleted_count
    else:
        deleted_count = 0

    action = USER_ACTIONS['clean_logs']
    details = f'Se eliminaron los logs con una fecha más antigua a {cleanDateStr}'
    log_user_action(username, action, details)

    return jsonify({"message": f"Se eliminaron {deleted_count} logs anteriores a {cleanDateStr}"}), 200

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

@bp.route('/soar/new_record', methods=['POST'])
def addNewItems():
    # Obtener user_soar y soar_key desde query params
    username = request.args.get('user_soar')
    soar_key = request.args.get('soar_key')

    data = request.get_json()
    items = data.get('items')

    if not items or not username or not soar_key:
        return jsonify({"error": "Missing fields"}), 400
    
    SOAR_KEY = os.getenv("SOAR_KEY")

    if soar_key != SOAR_KEY:
        return jsonify({'error': 'Clave de soar no valida.'}), 400

    type_mapping = {
        'ip': 'IpList',
        'domain': 'WebsiteList',
        'hash': 'HashList'
    }

    for itemToAdd in items:
        listType = type_mapping.get(itemToAdd.get('type'))
        if not listType:
            continue  # O puedes registrar/loggear error según necesites

        date = datetime.now(ZoneInfo("America/El_Salvador")).strftime('%Y-%m-%d %H:%M:%S GMT')
        itemToAdd["creationDate"] = date
        itemToAdd["lastUpdate"] = date
        itemToAdd['blocked'] = str(itemToAdd.get('blocked', '')).lower() == 'true'
        collection = COLLECTIONS[listType]
        itemToAdd['addedBy'] = username

        # Filtrar clientes disponibles según su límite
        allowed_clients = []
        for client_username in itemToAdd.get('clients', []):
            client_doc = clientsCollection.find_one({'username': client_username})
            if client_doc:
                current_count = len(client_doc[listType]['info'])
                limit = client_doc[listType]['listLimit']
                if current_count < limit:
                    allowed_clients.append(client_username)

        if not allowed_clients:
            continue  # O manejar error o mensaje si deseas

        # Verificar si el elemento ya existe en la lista general
        element = collection.find_one({'element': itemToAdd['element']})
        if element:
            # El elemento ya existe, actualizar la lista de clientes que no lo tengan
            for client_username in allowed_clients:
                client_doc = clientsCollection.find_one({'username': client_username})
                print(client_doc[listType]['info'])
                if client_doc and itemToAdd['element'] not in client_doc[listType]['info']:
                    clientsCollection.update_one(
                        {'username': client_username},
                        {
                            '$push': {
                                f'{listType}.info': itemToAdd['element'],
                            }
                        }
                    )
            # Actualizar la lista de clientes del elemento en la colección general (sin duplicados)
            collection.update_one(
                {'element': itemToAdd['element']},
                {
                    '$addToSet': {
                        'clients': {'$each': allowed_clients}
                    },
                    '$set': {
                        'lastUpdate': date
                    }
                }
            )
        else:
            # Insertar nuevo elemento solo si no existe
            itemToAdd['clients'] = allowed_clients
            collection.insert_one(itemToAdd)
            for client_username in allowed_clients:
                clientsCollection.update_one(
                    {'username': client_username},
                    {
                        '$push': {
                            f'{listType}.info': itemToAdd['element'],
                        }
                    }
                )

    action = USER_ACTIONS['add_item_to_list']
    details = f'Se añadieron {len(items)} elementos a las listas correspondientes'
    log_user_action(username, action, details)

    return jsonify({'message': 'Items procesados correctamente'}), 200