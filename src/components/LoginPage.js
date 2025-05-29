import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      alert("Login Failed!");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>📚 TimeCoin</h1>
      <p>Earn tokens by staying focused while studying!</p>
      <button onClick={login} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage;
