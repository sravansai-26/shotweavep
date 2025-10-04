// client/src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProducerDashboard from './pages/ProducerDashboard';
import LineProducerDashboard from './pages/LineProducerDashboard';
import Profile from './pages/Profile';

interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer';
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // Simple logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('shotweaveUser');
  };

  // Load user from localStorage on mount (simple persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem('shotweaveUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('shotweaveUser', JSON.stringify(userData));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/logout" element={<Navigate to="/" />} />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            user ? 
              (user.role === 'Producer/CEO' ? <ProducerDashboard user={user} onLogout={logout} /> : <LineProducerDashboard user={user} onLogout={logout} />)
              : <Navigate to="/login" />
          } 
        />
        <Route path="/profile" element={user ? <Profile user={user} onLogout={logout} /> : <Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
};

export default App;