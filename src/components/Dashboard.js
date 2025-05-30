import React, { useEffect, useState, useRef } from "react";
import { useUser } from "../contexts/UserContext";

const Dashboard = () => {
  const userContext = useUser();
  const [studyTime, setStudyTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [wsConnected, setWsConnected] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef(null);
  const wsRef = useRef(null);

  const { user, points, loading, updatePoints, addSession, updateSession } = userContext || {};

  // Connect to webcam and WebSocket on start
  const startCameraAndWebSocket = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraError(false);

      const ws = new WebSocket("ws://localhost:8000");
      ws.onopen = () => {
        setWsConnected(true);
        console.log("✅ WebSocket connected");
      };
      ws.onerror = (err) => {
        console.error("❌ WebSocket error", err);
        setWsConnected(false);
      };
      ws.onclose = () => {
        console.warn("⚠️ WebSocket closed");
        setWsConnected(false);
      };
      wsRef.current = ws;

    } catch (err) {
      console.error("🚫 Could not access camera", err);
      setCameraError(true);
    }
  };

  const stopCameraAndWebSocket = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    if (wsRef.current) {
      wsRef.current.close();
    }
    setWsConnected(false);
  };

  // Timer effect
  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setStudyTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Send frame every 3 seconds if running
  useEffect(() => {
    if (!timerRunning || cameraError || !wsConnected) return;

    const sendFrame = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const video = videoRef.current;
      if (!video) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob && wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(blob);
          console.log("📸 Frame sent to server");
        }
      }, "image/jpeg");
    };

    const interval = setInterval(sendFrame, 3000);
    return () => clearInterval(interval);
  }, [timerRunning, wsConnected, cameraError]);

  // Award points every 60 seconds if camera is working
  useEffect(() => {
    if (studyTime > 0 && studyTime % 60 === 0 && !cameraError && wsConnected) {
      updatePoints?.(points + 1);
    }
  }, [studyTime]);

  const handleStart = async () => {
    await startCameraAndWebSocket();
    setTimerRunning(true);
    if (addSession) {
      const id = await addSession({
        startTime: Date.now(),
        duration: 0,
      });
      setSessionId(id);
    }
  };

  const handleStop = () => {
    stopCameraAndWebSocket();
    setTimerRunning(false);
    if (updateSession && sessionId) {
      updateSession({
        id: sessionId,
        startTime: Date.now(),
        duration: studyTime,
      });
    }
  };

  if (loading) return <div>Loading context...</div>;
  if (!user) return <div>Not logged in</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Welcome, {user.displayName || "User"}!</h1>
      {cameraError && (
        <p style={{ color: "red" }}>🚫 Camera not accessible! Please allow camera access.</p>
      )}
      <video ref={videoRef} style={{ width: "320px", height: "240px", margin: "10px auto", display: cameraError ? "none" : "block" }} />
      <p>📈 Study Time: <strong>{studyTime}</strong> seconds</p>
      <p>🎯 Points: <strong>{points}</strong></p>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleStart} disabled={timerRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!timerRunning}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

// Note: Ensure you have the necessary imports and context setup in your project.
// This code assumes you have a UserContext that provides user, points, loading, updatePoints, addSession, and updateSession methods.
