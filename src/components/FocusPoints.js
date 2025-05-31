import React, { useState, useEffect, useRef } from "react";

function FocusPoints() {
  const [points, setPoints] = useState(0);
  const focusTimeRef = useRef(0); // Total focus seconds
  const [displayedFocusTime, setDisplayedFocusTime] = useState(0); // Just for UI

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from server:", data);

      if (data.focused) {
        focusTimeRef.current += 1;
        setDisplayedFocusTime(focusTimeRef.current); // update UI

        if (focusTimeRef.current % 60 === 0) {
          setPoints((prev) => prev + 1);
        }
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h3>🕒 Focus Time: {displayedFocusTime} seconds</h3>
      <h3>🎯 Focus Points: {points}</h3>
    </div>
  );
}

export default FocusPoints;
