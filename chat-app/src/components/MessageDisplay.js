import React from 'react';

export default function MessagesDisplay({ messages, thisMember }) {
  function renderMessage(message) {
    const { member, data, id } = message;
    const thisMemberMsg = member.id === thisMember.id;

    return thisMemberMsg ? (
      <div className="message">
        <div className="message_right" key={id} data-id={member.id}>
          <div className="member_name">{member.clientData.username}</div>
          <div className="member_message">{data}</div>
        </div>
      </div>
    ) : (
      <div className="message">
        <div className="message_left" key={id} data-id={member.id}>
          <div className="member_name">{member.clientData.username}</div>
          <div className="member_message">{data}</div>
        </div>
      </div>
    );
  }

  return <div id="messagesList">{messages.map((m) => renderMessage(m))}</div>;
}
