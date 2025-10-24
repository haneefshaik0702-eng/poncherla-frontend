import React, { useEffect } from 'react';
export default function VerifyEmail(){
  useEffect(()=>{ alert('If you clicked the email verify link, the backend will mark your email verified.'); },[]);
  return <div>Follow the link in the email you received to verify your address. Then return to the app.</div>;
}
