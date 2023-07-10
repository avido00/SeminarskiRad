import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import MessagesDisplay from './components/MessageDisplay';
import MessageInput from './components/MessageInput';

const ChatApp = () => {
  const initialChatState = {
    member: { username: '' },
    messages: []
  };
  const [chat, setChat] = useState(initialChatState);
  const [drone, setDrone] = useState(null);
  // const [username, setUsername] = useState("")

  useEffect(() => {
    if (chat.member.username !== '') {
      const drone = new window.Scaledrone('Xe9WKUlac0M5Jho5', {
        data: chat.member
      });
      setDrone(drone);
    }
  }, [chat.member]);

  // useEffect(() => {
  //   if (chat.messages.length) {
  //     const scrollElement = document.getElementsByClassName('msg-list')[0];
  //     scrollElement.scrollTop = scrollElement.scrollHeight;
  //   }
  // }, [chat.messages.length]);

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
    setChat({ ...chat, member: { username: username } });
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
