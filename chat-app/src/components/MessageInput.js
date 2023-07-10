import { mdiSendVariant } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';

export default function MessageInput({ onSendMessage }) {
  const initialState = {
    text: ''
  };

  const [state, setState] = useState(initialState);

  function handleMessageInput(e) {
    setState({ text: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (state.text === '') {
      return;
    } else {
      onSendMessage(state.text);
      setState({ text: '' });
    }
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <div className="message_input">
        <input
          className=""
          onChange={(e) => handleMessageInput(e)}
          value={state.text}
          type="text"
          placeholder="Insert message"
          autoFocus={true}
        />
        <button className="">
          <Icon path={mdiSendVariant} title="Send message" size={0.5} color="black" />
        </button>
      </div>
    </form>
  );
}
