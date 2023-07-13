import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useState } from 'react';

export default function WelcomeScreen({ onUsernameSubmit }) {
  const [username, setUsername] = useState('');

  return (
    <form className="username_form" onSubmit={(e) => onUsernameSubmit(e, username)}>
      <div className="welcome_title">Welcome to Chat room!</div>
      <div className="username_input">
        <input
          id="usernameInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">
          <Icon path={mdiCheck} title="Enter username" size={0.5} color="green" />
        </button>
      </div>
    </form>
  );
}
