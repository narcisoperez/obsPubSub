# app.py
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/publish', methods=['POST'])
def publish_message():
    message = request.json.get('message', 'Nueva actualización disponible')
    socketio.emit('message', {'data': message})
    return jsonify({"status": "Message sent"}), 200

@socketio.on('subscribe')
def handle_subscribe():
    emit('response', {'data': 'Subscribed successfully'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
