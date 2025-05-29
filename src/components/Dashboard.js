import React, { useEffect, useState } from "react";
import { useUser } from '../contexts/UserContext';
import Timer from "./Timer";
import WebcamFeed from "./WebcamFeed";
import FocusPoints from "./FocusPoints";
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const SessionHistory = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

function Dashboard() {
  const { user, points, sessions, updatePoints, addSession, updateSession } = useUser();
  const [status, setStatus] = useState("connecting...");
  const [isFocused, setIsFocused] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    socket.onopen = () => {
      console.log("WebSocket connected.");
      // Start new session when connection is established
      addSession({}).then(id => setCurrentSessionId(id));
    };

    socket.onmessage = (event) => {
      const message = event.data;
      setIsFocused(message === "present");
      setStatus(message);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.warn("WebSocket closed.");
      if (currentSessionId) {
        updateSession(currentSessionId, {
          endTime: new Date().toISOString(),
          focusPercentage: calculateFocusPercentage()
        });
      }
    };

    return () => socket.close();
  }, [currentSessionId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isFocused) {
        const newPoints = points + 1;
        updatePoints(newPoints);
        if (currentSessionId) {
          updateSession(currentSessionId, {
            pointsEarned: newPoints
          });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isFocused, points, currentSessionId]);

  const calculateFocusPercentage = () => {
    if (!sessions.length) return 0;
    const totalSessions = sessions.length;
    const focusedSessions = sessions.filter(s => s.focusPercentage > 80).length;
    return (focusedSessions / totalSessions) * 100;
  };

  if (!user) return <div>Please log in to access the dashboard.</div>;

  return (
    <DashboardContainer>
      <Header>
        <h1>📚 Study Dashboard</h1>
        <UserInfo>
          <Avatar src={user.photoURL} alt={user.displayName} />
          <div>
            <h3>{user.displayName}</h3>
            <p>{user.email}</p>
          </div>
        </UserInfo>
      </Header>

      <StatsGrid>
        <StatCard>
          <h3>Current Points</h3>
          <h2>{points}</h2>
        </StatCard>
        <StatCard>
          <h3>Focus Status</h3>
          <h2 style={{ color: isFocused ? 'green' : 'red' }}>
            {isFocused ? 'Focused' : 'Not Focused'}
          </h2>
        </StatCard>
        <StatCard>
          <h3>Focus Percentage</h3>
          <h2>{calculateFocusPercentage().toFixed(1)}%</h2>
        </StatCard>
      </StatsGrid>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <Timer />
          <WebcamFeed />
        </div>
        <FocusPoints />
      </div>

      <SessionHistory>
        <h2>Study History</h2>
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {sessions.map(session => (
            <div key={session.id} style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
              <p>Date: {new Date(session.startTime).toLocaleDateString()}</p>
              <p>Duration: {session.endTime ? 
                Math.round((new Date(session.endTime) - new Date(session.startTime)) / 1000 / 60) : 
                'In Progress'} minutes</p>
              <p>Points Earned: {session.pointsEarned}</p>
              <p>Focus: {session.focusPercentage?.toFixed(1)}%</p>
            </div>
          ))}
        </div>
      </SessionHistory>
    </DashboardContainer>
  );
}

export default Dashboard;


/*
// src/components/Dashboard.js
import React from "react";
import Timer from "./Timer";
import WebcamFeed from "./WebcamFeed";
import FocusPoints from "./FocusPoints";

function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h2>📚 Study Dashboard</h2>
      <Timer />
      <WebcamFeed />
      <FocusPoints />
    </div>
  );
}

export default Dashboard;

*/