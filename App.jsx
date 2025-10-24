import React, { useState } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VendorDashboard from './pages/VendorDashboard';
import Cart from './pages/Cart';
import AdminPanel from './pages/AdminPanel';
import VerifyEmail from './pages/VerifyEmail';
import RequestReset from './pages/RequestReset';
import ResetPassword from './pages/ResetPassword';

export default function App(){
  const [view, setView] = useState('home');
  return (
    <div>
      <header className="flex gap-4 items-center mb-6">
        <h1 className="text-xl font-bold">Multivendor</h1>
        <nav className="ml-auto flex gap-2">
          <button className="btn" onClick={()=>setView('home')}>Home</button>
          <button className="btn" onClick={()=>setView('vendor')}>Vendor</button>
          <button className="btn" onClick={()=>setView('signup')}>Signup</button>
          <button className="btn" onClick={()=>setView('login')}>Login</button>
          <button className="btn" onClick={()=>setView('cart')}>Cart</button>
          <button className="btn" onClick={()=>setView('admin')}>Admin</button>
        </nav>
      </header>
      <main>
        {view==='home' && <Home />}
        {view==='signup' && <Signup onDone={()=>setView('login')}/>}
        {view==='login' && <Login onDone={()=>setView('home')}/>}
        {view==='vendor' && <VendorDashboard/>}
        {view==='cart' && <Cart />}
        {view==='admin' && <AdminPanel/>}
        {view==='verify' && <VerifyEmail/>}
        {view==='request-reset' && <RequestReset/>}
        {view==='reset' && <ResetPassword/>}
      </main>
    </div>
  );
}
