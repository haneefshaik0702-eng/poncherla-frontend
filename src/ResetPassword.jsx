import React, { useState } from 'react';
import axios from 'axios';
export default function ResetPassword(){
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const API = import.meta.env.VITE_API_URL;
  async function submit(e){ e.preventDefault(); await axios.post(API + '/auth/reset-password', { email, token, password }); alert('Password reset complete'); }
  return (
    <form onSubmit={submit}>
      <h2>Reset password</h2>
      <input className="w-full mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input className="w-full mb-2" value={token} onChange={e=>setToken(e.target.value)} placeholder="Token from email" />
      <input className="w-full mb-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="New password" />
      <button className="btn">Reset</button>
    </form>
  );
}
