import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from './contexts/UserContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

function PrivateRoute({ children }) {
  const { user, loading } = useUser();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/" />;
}

function App() {
  return (
    <UserProvider>
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </AppContainer>
    </UserProvider>
  );
}

export default App;

