import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Cart(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')||'[]'));
  const token = localStorage.getItem('token');
  const API = import.meta.env.VITE_API_URL;
  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  function changeQty(i, delta){
    const copy = [...cart]; copy[i].qty = Math.max(1, copy[i].qty + delta); setCart(copy);
  }
  async function checkout(){
    if (!token) return alert('Please login to checkout');
    const items = cart.map(c=>({ product: c.product, qty: c.qty }));
    try {
      const r = await axios.post(API + '/create-checkout-session', { items }, { headers: { Authorization: 'Bearer '+token }});
      window.location.href = r.data.url;
    } catch (err){ alert(err.response?.data?.error || err.message); }
  }
  return (
    <div>
      <h2 className="text-xl mb-2">Cart</h2>
      {cart.length===0 && <div>No items</div>}
      {cart.map((c,i)=>(
        <div key={c.product} className="border p-2 my-2 flex justify-between items-center">
          <div>
            <div className="font-semibold">{c.title}</div>
            <div>₹{c.price} x {c.qty}</div>
          </div>
          <div>
            <button className="btn mr-2" onClick={()=>changeQty(i,-1)}>-</button>
            <button className="btn mr-2" onClick={()=>changeQty(i,1)}>+</button>
          </div>
        </div>
      ))}
      {cart.length>0 && <div className="mt-4"><button className="btn" onClick={checkout}>Checkout (Stripe)</button></div>}
    </div>
  );
}
