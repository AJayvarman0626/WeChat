import React, { useContext } from "react";
import { Context } from '../context';
import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
  const { username, secret, setUsername, setSecret } = useContext(Context);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (username.length === 0 || secret.length === 0) return;

    axios.put(
      'https://api.chatengine.io/users/',
      { username, secret },
      { headers: { "Private-key": "9701e12a-71c8-4c42-96b9-5b005bc72810" } }
    )
      .then(r => router.push('/chats'))
      .catch(error => console.log('error', error)); 
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-title">WeChat</div>

          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button" disabled={!username || !secret}>
            Login / Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
