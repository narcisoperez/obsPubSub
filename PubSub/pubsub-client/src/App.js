// src/App.js
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:5000";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.emit('subscribe');

    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <h1>Mensajes</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.data}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
