// src/components/Timer.js
import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

  return <h3>⏱️ Study Time: {formatTime(seconds)}</h3>;
}

export default Timer;
