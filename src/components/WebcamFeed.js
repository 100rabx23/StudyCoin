// src/components/WebcamFeed.js
import React from "react";
import Webcam from "react-webcam";

const WebcamFeed = () => {
  return (
    <div style={{ position: "absolute", top: 10, right: 10 }}>
      <Webcam audio={false} width={350} height={300} />
    </div>
  );
};

export default WebcamFeed;
