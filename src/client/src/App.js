import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
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
// FIX: 2. Cast the imported Login component to explicitly accept these props.
const TypedLogin = Login;
// ----------------------------------------------------------------------
const App = () => {
    // We should start with null and handle persistence via useEffect
    const [user, setUser] = useState(null);
    // Simple logout function
    const logout = () => {
        setUser(null);
        // NOTE: We are using localStorage for simple persistence here, 
        // but for production multi-user apps, Firestore or a proper backend session is mandatory.
        localStorage.removeItem('shotweaveUser');
    };
    // Load user from localStorage on mount (simple persistence)
    useEffect(() => {
        const savedUser = localStorage.getItem('shotweaveUser');
        if (savedUser) {
            try {
                // Ensure the loaded user object matches the updated interface
                setUser(JSON.parse(savedUser));
            }
            catch (e) {
                console.error("Failed to parse user data from storage", e);
                // Clear corrupted storage data if parsing fails
                localStorage.removeItem('shotweaveUser');
            }
        }
    }, []);
    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('shotweaveUser', JSON.stringify(userData));
    };
    // --- DYNAMIC ROLE-BASED ROUTING LOGIC ---
    // This function dynamically selects the correct dashboard component based on the user's role.
    const getDashboardComponent = (currentUser) => {
        switch (currentUser.role) {
            case 'Producer/CEO':
                return _jsx(ProducerDashboard, { user: currentUser, onLogout: logout });
            case 'Line Producer':
                return _jsx(LineProducerDashboard, { user: currentUser, onLogout: logout });
            case '1st AD/Unit Manager':
                return _jsx(ExecutorDashboard, { user: currentUser, onLogout: logout });
            case 'VFX Supervisor/Director':
                return _jsx(CreativeDashboard, { user: currentUser, onLogout: logout });
            default:
                // Fallback for an unrecognized role 
                return _jsx(Navigate, { to: "/login" });
        }
    };
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/login", element: _jsx(TypedLogin, { onLogin: handleLogin }) }), _jsx(Route, { path: "/logout", element: _jsx(Navigate, { to: "/" }) }), _jsx(Route, { path: "/dashboard", element: user ?
                        getDashboardComponent(user) // Uses the dynamic function
                        : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "/profile", element: user ?
                        _jsx(Profile, { user: user, onLogout: logout })
                        : _jsx(Navigate, { to: "/login" }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: user ? "/dashboard" : "/" }) })] }) }));
};
export default App;
