import React, { useState } from 'react';
import axios from 'axios';
export default function Login({ onDone }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API = import.meta.env.VITE_API_URL;
  async function submit(e){
    e.preventDefault();
    try {
      const r = await axios.post(API + '/auth/login', { email, password });
      localStorage.setItem('token', r.data.token);
      localStorage.setItem('user', JSON.stringify(r.data.user));
      alert('Logged in');
      if (onDone) onDone();
    } catch (err){ alert(err.response?.data?.error || err.message); }
  }
  return (
    <form onSubmit={submit} className="max-w-md">
      <h2 className="text-xl mb-2">Login</h2>
      <input className="w-full mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="w-full mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <div className="flex gap-2 mb-2">
        <button className="btn" type="submit">Login</button>
        <button type="button" className="btn" onClick={()=>window.alert('Open request reset in the app (use Request Reset)')}>Forgot?</button>
      </div>
    </form>
  );
}
