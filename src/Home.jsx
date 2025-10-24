import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ axios.get(import.meta.env.VITE_API_URL + '/products').then(r=>setProducts(r.data)).catch(()=>{}); },[]);
  function addToCart(p){
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    const found = cart.find(c=>c.product===p._id);
    if(found) found.qty++;
    else cart.push({ product: p._id, title: p.title, price: p.price, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  }
  return (
    <div>
      <h2 className="text-2xl mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p=>(
          <div key={p._id} className="border p-4 rounded">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm">{p.description}</p>
            {p.images && p.images[0] && <img src={p.images[0]} alt="" className="w-full h-40 object-cover mb-2" />}
            <div className="mt-2 font-bold">₹{p.price}</div>
            <div className="text-xs mt-1">Vendor: {p.vendor?.name || '—'}</div>
            <div className="mt-2">
              <button className="btn" onClick={()=>addToCart(p)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
