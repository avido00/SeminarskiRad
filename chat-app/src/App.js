import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import MessagesDisplay from './components/MessageDisplay';
import MessageInput from './components/MessageInput';

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

const ChatApp = () => {
  const initialChatState = {
    member: { username: '', color: '' },
    messages: []
  };
  const [chat, setChat] = useState(initialChatState);
  const [drone, setDrone] = useState(null);

  useEffect(() => {
    if (chat.member.username !== '') {
      const drone = new window.Scaledrone('Xe9WKUlac0M5Jho5', {
        data: chat.member
      });
      setDrone(drone);
    }
  }, [chat.member]);

  if (drone) {
    drone.on('open', (error) => {
      if (error) {
        return console.error(error);
      }
      chat.member.id = drone.clientId;
      setChat({ ...chat }, chat.member);

      const room = drone.subscribe('observable-room');

      room.on('message', (message) => {
        const { data, member, timestamp, id } = message;
        chat.messages.push({ member, data, timestamp, id });
        setChat({ ...chat }, chat.messages);
      });
    });
  }

  const handleSendMessage = (message) => {
    drone.publish({
      room: 'observable-room',
      message
    });
  };

  function handleUsernameInput() {
    const username = document.getElementById('usernameInput').value;
    setChat({ ...chat, member: { username: username, color: getRandomColor() } });
  }

  return (
    <div className="main_container">
      {chat.member.username}
      <div className="username_input">
        <input id="usernameInput" type="text" placeholder="Enter your username..." />
        <button onClick={() => handleUsernameInput()}>
          <Icon path={mdiCheck} title="Send message" size={0.5} color="green" />
        </button>
      </div>

      <div className="app_wrapper">
        <MessagesDisplay messages={chat.messages} thisMember={chat.member} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatApp;
