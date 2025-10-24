import React, { useState } from 'react';
import axios from 'axios';
export default function Signup({ onDone }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const API = import.meta.env.VITE_API_URL;
  async function submit(e){
    e.preventDefault();
    try {
      await axios.post(API + '/auth/register', { name, email, password, role });
      alert('Registered — please check your email to verify, then login');
      if (onDone) onDone();
    } catch (err){ alert(err.response?.data?.error || err.message); }
  }
  return (
    <form onSubmit={submit} className="max-w-md">
      <h2 className="text-xl mb-2">Signup</h2>
      <input className="w-full mb-2" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="w-full mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="w-full mb-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
      <select className="w-full mb-2" value={role} onChange={e=>setRole(e.target.value)}>
        <option value="buyer">Buyer</option>
        <option value="vendor">Vendor</option>
      </select>
      <button className="btn" type="submit">Signup</button>
    </form>
  );
}
