import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './Pages/Register';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import AgentDashboard from './Pages/AgentDashboard';
import ManualAssign from './Pages/ManualAssign';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AgentDashboard />} />
        <Route path="/manual-assign" element={<ManualAssign />} />
      </Routes>
    </Router>
  );
}

export default App;
