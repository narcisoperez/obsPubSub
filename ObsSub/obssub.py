from flask import Flask, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

observers = []

@app.route('/notify', methods=['POST'])
def notify():
    message = request.json.get('message', 'Nueva actualización disponible')
    for observer in observers:
        socketio.emit('notification', {'data': message}, room=observer)
    return jsonify({"message": "Notificación enviada a todos los suscriptores"}), 200

@socketio.on('subscribe')
def handle_subscribe():
    observer = request.sid
    if observer not in observers:
        observers.append(observer)
    emit('response', {'data': 'Suscripción exitosa'}, room=observer)

@socketio.on('disconnect')
def handle_disconnect():
    observer = request.sid
    if observer in observers:
        observers.remove(observer)

if __name__ == '__main__':
    socketio.run(app, debug=True)
