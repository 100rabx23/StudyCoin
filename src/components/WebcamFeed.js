// src/components/WebcamFeed.js
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const WebcamFeed = () => {
  const [status, setStatus] = useState("Waiting...");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
      setStatus(event.data); // "present" or "absent"
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <Webcam audio={false} width={350} height={300} />
      <p>Status: {status}</p>
    </div>
  );
};

export default WebcamFeed;
