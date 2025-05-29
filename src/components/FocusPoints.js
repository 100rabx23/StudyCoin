// src/components/FocusPoints.js
import React, { useState, useEffect } from "react";

function FocusPoints() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((p) => p + 1);
    }, 5000); // Add 1 point every 5 seconds (mock)

    return () => clearInterval(interval);
  }, []);

  return <h3>🎯 Focus Points: {points}</h3>;
}

export default FocusPoints;
