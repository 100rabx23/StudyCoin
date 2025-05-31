// src/components/WalletConnect.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

function WalletConnect({ onWalletConnected }) {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("🦊 Please install MetaMask to use this feature.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      setWalletAddress(address);
      onWalletConnected?.(address);
    } catch (err) {
      console.error("❌ Wallet connection failed:", err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          onWalletConnected?.(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    }
  }, []);

  return (
    <div>
      {walletAddress ? (
        <p>✅ Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</p>
      ) : (
        <button onClick={connectWallet}>🔗 Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnect;
