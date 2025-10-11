import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProducerDashboard from './pages/ProducerDashboard';
import LineProducerDashboard from './pages/LineProducerDashboard';
import Profile from './pages/Profile';
// --- IMPORT ALL DASHBOARDS ---
import ExecutorDashboard from './pages/ExecutorDashboard'; // Assuming this component exists
import CreativeDashboard from './pages/CreativeDashboard'; // Assuming this component exists
// -----------------------------

// CRITICAL: This MUST match the interface in ALL dashboard components (ProducerDashboard.tsx, etc.)
interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director';
}

const App: React.FC = () => {
  // We should start with null and handle persistence via useEffect
  const [user, setUser] = useState<User | null>(null);

  // Simple logout function
  const logout = () => {
    setUser(null);
    // Note: We are using localStorage for simple persistence here, 
    // but for production multi-user apps, Firestore or a proper backend session is mandatory.
    localStorage.removeItem('shotweaveUser');
  };

  // Load user from localStorage on mount (simple persistence)
  useEffect(() => {
    const savedUser = localStorage.getItem('shotweaveUser');
    if (savedUser) {
      try {
        // Ensure the loaded user object matches the updated interface
        setUser(JSON.parse(savedUser) as User);
      } catch (e) {
        console.error("Failed to parse user data from storage", e);
        // Clear corrupted storage data if parsing fails
        localStorage.removeItem('shotweaveUser');
      }
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('shotweaveUser', JSON.stringify(userData));
  };

  // --- DYNAMIC ROLE-BASED ROUTING LOGIC ---
  // This function dynamically selects the correct dashboard component based on the user's role.
  const getDashboardComponent = (currentUser: User) => {
    switch (currentUser.role) {
      case 'Producer/CEO':
        return <ProducerDashboard user={currentUser} onLogout={logout} />;
      case 'Line Producer':
        return <LineProducerDashboard user={currentUser} onLogout={logout} />;
      case '1st AD/Unit Manager':
        return <ExecutorDashboard user={currentUser} onLogout={logout} />;
      case 'VFX Supervisor/Director':
        return <CreativeDashboard user={currentUser} onLogout={logout} />;
      default:
        // Fallback for an unrecognized role 
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
              getDashboardComponent(user) // Uses the dynamic function
              : <Navigate to="/login" />
          } 
        />
        
        {/* Profile Route */}
        <Route 
          path="/profile" 
          element={
            user ? 
              <Profile user={user} onLogout={logout} /> 
              : <Navigate to="/login" />
          } 
        />
        
        {/* Add a catch-all route for better user experience */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
