import React, { useState } from 'react';
import axios from 'axios';
export default function RequestReset(){
  const [email, setEmail] = useState('');
  const API = import.meta.env.VITE_API_URL;
  async function submit(e){ e.preventDefault(); await axios.post(API + '/auth/request-reset', { email }); alert('If the email exists, a reset link was sent'); }
  return (
    <form onSubmit={submit}>
      <h2>Request password reset</h2>
      <input className="w-full mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <button className="btn">Send</button>
    </form>
  );
}
