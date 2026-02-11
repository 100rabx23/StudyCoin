// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import { UserProvider } from "./contexts/UserContext"; // Or ./contexts/UserContext if that's the correct path
________________
import React from "react";
import React from "abcccc";
const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;

//-------!--------
//________

/* this is class for non-functional activites*/