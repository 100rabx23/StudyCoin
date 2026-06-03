import React, { useEffect, useState, useRef } from "react";
import { parseUnits, BrowserProvider, Contract } from "ethers";
import WalletConnect from "./WalletConnect";
import { useUser } from "../contexts/UserContext";
import { TOKEN_ADDRESS, TOKEN_ABI } from "../components/token";

const Dashboard = () => {
  const userContext = useUser();
  const { user, points, loading, updatePoints, addSession, updateSession } = userContext || {};

  const [studyTime, setStudyTime] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);

  const [cameraError, setCameraError] = useState(false);
  const [wsError, setWsError] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);

  const videoRef = useRef(null);
  const wsRef = useRef(null);

  // 🟢 Camera + WebSocket
  const startCameraAndWebSocket = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraError(false);
    } catch (err) {
      console.error("🚫 Camera error:", err);
      setCameraError(true);
      return;
    }

    try {
      const ws = new WebSocket("ws://localhost:8000");
      ws.onopen = () => {
        console.log("✅ WebSocket connected");
        setWsConnected(true);
        setWsError(false);
      };
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.focused) {
            setFocusTime((prev) => prev + 1);
          }
        } catch (err) {
          console.warn("⚠️ Invalid message from server", err);
        }
      };
      ws.onerror = (err) => {
        console.error("❌ WebSocket error:", err);
        setWsConnected(false);
        setWsError(true);
      };
      ws.onclose = () => {
        console.warn("⚠️ WebSocket closed");
        setWsConnected(false);
      };
      wsRef.current = ws;
    } catch (err) {
      console.error("❌ Failed to connect to WebSocket", err);
      setWsError(true);
    }
  };

  const stopCameraAndWebSocket = () => {
    videoRef.current?.srcObject?.getTracks().forEach(track => track.stop());
    wsRef.current?.close();
    setWsConnected(false);
  };

  // ⏱️ Study time timer
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => setStudyTime((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  // 📤 Send webcam frames to backend
  useEffect(() => {
    if (!timerRunning || cameraError || !wsConnected) return;

    const sendFrame = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const video = videoRef.current;
      if (!video || !video.videoWidth || !video.videoHeight) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob && wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(blob);
        }
      }, "image/jpeg");
    };

    const interval = setInterval(sendFrame, 3000);
    return () => clearInterval(interval);
  }, [timerRunning, wsConnected, cameraError]);

  // 🏅 Add 1 point every 60s focused
  useEffect(() => {
    if (focusTime > 0 && focusTime % 60 === 0) {
      updatePoints?.(points + 1);
    }
  }, [focusTime]);

  // ▶️ Start Session
  const handleStart = async () => {
    await startCameraAndWebSocket();
    setTimerRunning(true);
    const id = await addSession?.({ startTime: Date.now(), duration: 0 });
    setSessionId(id);
  };

  // ⏹️ Stop Session
  const handleStop = () => {
    stopCameraAndWebSocket();
    setTimerRunning(false);
    updateSession?.({ id: sessionId, startTime: Date.now(), duration: studyTime });
  };

  // 💰 Claim FCS Tokens
  const claimTokens = async () => {
    if (!walletAddress) return alert("🔌 Connect wallet first");
    if (points <= 0) return alert("⛔ No points to claim.");

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
      const tx = await contract.transfer(walletAddress, parseUnits(points.toString(), 18));
      await tx.wait();
      alert(`✅ Claimed ${points} FCS tokens!`);
      updatePoints?.(0); // reset
    } catch (err) {
      console.error("❌ Token claim failed:", err);
      alert("❌ Claim failed. Check console.");
    }
  };

  if (loading) return <div>Loading context...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Welcome, {user.displayName || "User"}!</h1>

      <WalletConnect onWalletConnected={(address) => setWalletAddress(address)} />

      {/* ERRORS */}
      {cameraError && <p style={{ color: "red" }}>🚫 Please allow camera access.</p>}
      {wsError && <p style={{ color: "red" }}>❌ WebSocket connection failed.</p>}
      {!wsConnected && !wsError && <p>🔌 Connecting to focus server...</p>}

      {/* CAMERA */}
      <video
        ref={videoRef}
        style={{
          width: "320px",
          height: "240px",
          display: cameraError ? "none" : "block",
          margin: "10px auto",
          border: "2px solid #444",
        }}
      />

      {/* METRICS */}
      <p>⏱️ Study Time: <strong>{studyTime}</strong> sec</p>
      <p>🎯 Focus Time: <strong>{focusTime}</strong> sec</p>
      <p>🏅 Points: <strong>{points}</strong></p>

      {/* CONTROLS */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleStart} disabled={timerRunning}>▶️ Start</button>
        <button onClick={handleStop} disabled={!timerRunning}>⏹️ Stop</button>
        <br /><br />
        <button onClick={claimTokens} disabled={!walletAddress || points === 0}>
          💰 Claim {points} FCS
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

//123
