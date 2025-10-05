import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProducerDashboard from './pages/ProducerDashboard';
import LineProducerDashboard from './pages/LineProducerDashboard';
import Profile from './pages/Profile';
// --- IMPORT NEW DASHBOARDS ---
import ExecutorDashboard from './pages/ExecutorDashboard';
import CreativeDashboard from './pages/CreativeDashboard';
// -----------------------------

// CRITICAL UPDATE: User interface now includes all four roles
interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director';
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
      // Ensure the loaded user object matches the updated interface
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('shotweaveUser', JSON.stringify(userData));
  };

  // --- DYNAMIC ROLE-BASED ROUTING LOGIC ---
  const getDashboardComponent = (user: User) => {
    switch (user.role) {
      case 'Producer/CEO':
        return <ProducerDashboard user={user} onLogout={logout} />;
      case 'Line Producer':
        return <LineProducerDashboard user={user} onLogout={logout} />;
      case '1st AD/Unit Manager':
        return <ExecutorDashboard user={user} onLogout={logout} />;
      case 'VFX Supervisor/Director':
        return <CreativeDashboard user={user} onLogout={logout} />;
      default:
        // Fallback for an unrecognized role (shouldn't happen with our signup logic)
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/logout" element={<Navigate to="/" />} />

        {/* Protected Dashboard Route - Renders the appropriate component based on role */}
        <Route 
          path="/dashboard" 
          element={
            user ? 
              getDashboardComponent(user) // Uses the new dynamic function
              : <Navigate to="/login" />
          } 
        />
        
        {/* Profile Route */}
        <Route path="/profile" element={user ? <Profile user={user} onLogout={logout} /> : <Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
};

export default App;
