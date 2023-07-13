import React, { useEffect, useRef } from 'react';

export default function MessagesDisplay({ messages, thisMember }) {
  const messagesList = useRef();

  useEffect(() => {
    if (messages.length) {
      messagesList.current.scrollTop = messagesList.current.scrollHeight;
    }
  }, [messages.length]);

  function renderMessage(message) {
    const { member, data } = message;
    const thisMemberMsg = member.id === thisMember.id;

    const memberStyle = {
      color: member.clientData.color
    };

    return (
      <div className="message">
        {thisMemberMsg ? (
          <div className="message_right" data-id={member.id}>
            <div className="member_name" style={memberStyle}>
              {member.clientData.username}
            </div>
            <div className="member_message">{data}</div>
          </div>
        ) : (
          <div className="message_left" data-id={member.id}>
            <div className="member_name" style={memberStyle}>
              {member.clientData.username}
            </div>
            <div className="member_message">{data}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="messagesList" ref={messagesList}>
      {messages.map((m) => renderMessage(m))}
    </div>
  );
}
