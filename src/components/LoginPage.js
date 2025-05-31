import React from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

function LoginPage() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);

      // Wait for auth state to stabilize
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          window.location.href = "/dashboard"; // safe redirect after login
          unsubscribe();
        }
      });
    } catch (error) {
      console.error("Login error:", error);
      alert("Login Failed! Please try again.");
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <h1>📚 TimeCoin</h1>
      <p>Earn tokens by staying focused while studying!</p>
      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4285F4',
          color: '#fff',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Login with Google
      </button>
    </div>
  );
}

export default LoginPage;
