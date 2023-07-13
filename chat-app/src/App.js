import React, { useEffect, useState } from 'react';
import './App.css';
import MessagesDisplay from './components/MessageDisplay';
import MessageInput from './components/MessageInput';
import WelcomeScreen from './components/WelcomeScreen';

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
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

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

  const handleUsernameSubmit = (event, username) => {
    event.preventDefault();
    if (username !== '') {
      setChat({ ...chat, member: { username: username, color: getRandomColor() } });
      setShowWelcomeScreen(false);
    } else {
      //
    }
  };

  return (
    <div className="main_container">
      {showWelcomeScreen ? (
        <WelcomeScreen onUsernameSubmit={handleUsernameSubmit} />
      ) : (
        <div className="chat_room">
          <div className="chat_room_title">You are chatting as {chat.member.username}!</div>
          <div className="app_wrapper">
            <MessagesDisplay messages={chat.messages} thisMember={chat.member} />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
