// src/App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://192.168.1.16:5000";

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.emit('subscribe');

    socket.on('notification', (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Notificaciones</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.data}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
