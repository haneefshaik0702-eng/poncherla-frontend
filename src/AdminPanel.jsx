import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function AdminPanel(){
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(()=>{ fetch(); },[]);
  async function fetch(){
    try {
      const u = await axios.get(API + '/admin/users', { headers: { Authorization: 'Bearer '+token }});
      const o = await axios.get(API + '/admin/orders', { headers: { Authorization: 'Bearer '+token }});
      setUsers(u.data); setOrders(o.data);
    } catch (err){ console.error(err); alert('Admin access required'); }
  }
  return (
    <div>
      <h2 className="text-xl mb-2">Admin Panel</h2>
      <div className="mb-4">
        <h3>Users</h3>
        {users.map(us=> <div key={us._id} className="border p-2 my-1">{us.name} — {us.email} — {us.role}</div>)}
      </div>
      <div>
        <h3>Orders</h3>
        {orders.map(o=>(
          <div key={o._id} className="border p-2 my-1">
            <div><b>Order</b> {o._id} — {o.status}</div>
            <div>Buyer: {o.buyer?.name} ({o.buyer?.email})</div>
            <div>Items: {o.items?.map(i=>i.product?.title || i.product).join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
