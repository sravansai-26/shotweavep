import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// --- IMPORT ALL COMPONENTS (FIX: Removed .tsx extensions) ---
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProducerDashboard from './pages/ProducerDashboard';
import LineProducerDashboard from './pages/LineProducerDashboard';
import Profile from './pages/Profile';
import ExecutorDashboard from './pages/ExecutorDashboard';
import CreativeDashboard from './pages/CreativeDashboard';

// --- IMPORT STATIC PAGES (FIX: Removed .tsx extensions) ---
import AboutUs from './pages/AboutUs'; 
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
// -----------------------------

// CRITICAL: User Interface Definition
interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director';
}

// Interface for props required by the Login component
interface LoginProps {
  onLogin: (user: User) => void;
}

const TypedLogin = Login as React.FC<LoginProps>; 


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shotweaveUser');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('shotweaveUser', JSON.stringify(userData));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('shotweaveUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser) as User);
      } catch (e) {
        console.error("Failed to parse user data from storage", e);
        localStorage.removeItem('shotweaveUser');
      }
    }
  }, []);

  // --- DYNAMIC ROLE-BASED ROUTING LOGIC ---
  const getDashboardComponent = (currentUser: User) => {
    const dashboardProps = { user: currentUser, onLogout: logout };

    switch (currentUser.role) {
      case 'Producer/CEO':
        return <ProducerDashboard {...dashboardProps} />;
      case 'Line Producer':
        return <LineProducerDashboard {...dashboardProps} />;
      case '1st AD/Unit Manager':
        return <ExecutorDashboard {...dashboardProps} />;
      case 'VFX Supervisor/Director':
        return <CreativeDashboard {...dashboardProps} />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    // ADDED: Root container to explicitly set the background and min height.
    // This forces the app to control the viewport background, preventing the 
    // browser's default white from showing through.
    <div className="min-h-screen bg-gray-900 font-google-body">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/login" element={<TypedLogin onLogin={handleLogin} />} />
          <Route path="/logout" element={<Navigate to="/" />} />

          {/* Static Footer Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

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
          
          {/* Catch-all route: Redirects unauthorized users to the homepage or authorized users to their dashboard */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;