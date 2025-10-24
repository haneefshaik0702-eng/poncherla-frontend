import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function VendorDashboard(){
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  useEffect(()=>{ fetchProducts(); },[]);
  async function fetchProducts(){
    const r = await axios.get(API + '/products');
    const my = r.data.filter(p=>p.vendor && JSON.parse(localStorage.getItem('user')||'{}').id === p.vendor._id);
    setProducts(my);
  }
  function onFiles(e){ setImages(Array.from(e.target.files)); }
  async function addProduct(e){
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('description', desc);
      form.append('price', price);
      images.forEach(f=>form.append('images', f));
      const r = await axios.post(API + '/products', form, { headers: { Authorization: 'Bearer '+token, 'Content-Type': 'multipart/form-data' }});
      alert('Created');
      setTitle(''); setDesc(''); setPrice(''); setImages([]);
      fetchProducts();
    } catch (err){ alert(err.response?.data?.error || err.message); }
  }
  return (
    <div>
      <h2 className="text-xl mb-2">Vendor Dashboard</h2>
      <form onSubmit={addProduct} className="mb-4">
        <input className="w-full mb-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input className="w-full mb-2" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <input className="w-full mb-2" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input type="file" multiple onChange={onFiles} className="mb-2" />
        <button className="btn" type="submit">Add Product</button>
      </form>
      <div>
        <h3>Your products</h3>
        {products.map(p=>(
          <div key={p._id} className="border p-2 my-2">
            <div className="font-semibold">{p.title}</div>
            <div>₹{p.price}</div>
            <div className="text-sm">Status images: {p.images?.length || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
