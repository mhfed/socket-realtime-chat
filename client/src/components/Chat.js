import React, { useState, useEffect } from 'react'
import queryString from 'query-string';
import io from 'socket.io-client';

// components
import InfoBar from './InfoBar';
import Input from './Input';
import MessageList from './MessageList';

let socket = null;
const connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

function Chat() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const END_POINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);
    socket = io(END_POINT, connectionOptions)

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
        window.location.href = '/'
      }
    });

    return () => {
      socket.emit('disconnected');
      socket.off();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [END_POINT]);
  
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
    // socket.on("roomData", (users) => {
    //   // setUsers(users);
    // });
  }, [messages]);

  function sendMessage(event) {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  console.log(name, room)
  
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <MessageList messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default Chat
