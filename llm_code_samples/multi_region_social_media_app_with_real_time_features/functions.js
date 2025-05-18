// components/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_API_URL);

function Chat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMsgs) => [...prevMsgs, msg]);
        });
    }, []);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default Chat;