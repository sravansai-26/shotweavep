import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// CORRECTION: Removed type imports, relying on global imports for compatibility
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
// === CRITICAL FIX: Define the VITE_API_URL from environment ===
// This variable MUST be set in Vercel's Environment Variables (Key: VITE_API_URL)
const API_BASE_URL = import.meta.env.VITE_API_URL;
// =============================================================
// Framer Motion Transition fix (Simplified for wider TS compatibility)
const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 10
};
// Framer Motion variants for card entry
const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: springTransition, // Use 'as any' temporarily to bypass strict type errors during build
    },
};
const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        // Update the default role to a valid option
        role: 'Producer/CEO',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleChange = (e) => {
        // FIX: Access the value from e.target.value instead of e.value
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Processing...');
        // === CRITICAL FETCH FIX: Use the injected API_BASE_URL ===
        if (!API_BASE_URL) {
            setMessage('Configuration Error: API URL not set in environment.');
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                setMessage(data.message + " Redirecting to login...");
                setTimeout(() => navigate('/login'), 2000);
            }
            else {
                setMessage("Signup Failed: " + data.message);
            }
        }
        catch (error) {
            // NOTE: The previous database failure might cause this network error.
            setMessage('Network error. Failed to connect to server.');
        }
    };
    const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200";
    const selectStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200";
    return (
    // Outer Container: Dark Cinematic Background
    _jsx("div", { className: "min-h-screen bg-gray-900 flex items-center justify-center p-6", children: _jsxs(motion.div, { variants: cardVariants, initial: "hidden", animate: "visible", className: "\r\n                    w-full max-w-md bg-gray-800/80   // Semi-transparent card background\r\n                    p-8 rounded-xl shadow-2xl       // Deep shadow for security look\r\n                    border border-red-700/50        // Subtle red outline for high-alert/security theme\r\n                    backdrop-blur-sm                // Glass effect\r\n                    relative                        // Needed for absolute positioning of the back button\r\n                ", children: [_jsx(Link, { to: "/", className: "absolute top-4 left-4 p-2 rounded-full \r\n                                 bg-gray-700/50 hover:bg-red-600/70 text-white \r\n                                 transition duration-200", children: _jsx(ArrowLeft, { size: 20 }) }), _jsx("h2", { className: "text-3xl font-bold text-white mb-6 text-center border-b border-gray-700 pb-3", children: "Initiate Project Access" }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [_jsx("input", { type: "text", name: "name", placeholder: "Full Name (Production ID)", onChange: handleChange, className: inputStyle, required: true }), _jsx("input", { type: "email", name: "email", placeholder: "Secure Email Address", onChange: handleChange, className: inputStyle, required: true }), _jsx("input", { type: "text", name: "username", placeholder: "Desired System Username", onChange: handleChange, className: inputStyle, required: true }), _jsx("input", { type: "password", name: "password", placeholder: "Secure Password", onChange: handleChange, className: inputStyle, required: true }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: "role-select", className: "text-sm font-medium text-gray-400 mb-1", children: "Select Primary Role:" }), _jsxs("select", { id: "role-select", name: "role", value: formData.role, onChange: handleChange, className: selectStyle, required: true, children: [_jsx("option", { value: "Producer/CEO", className: "bg-gray-700", children: "Producer/CEO (Financial Oversight)" }), _jsx("option", { value: "Line Producer", className: "bg-gray-700", children: "Line Producer (Operational Management)" }), _jsx("option", { value: "1st AD/Unit Manager", className: "bg-gray-700", children: "1st AD/Unit Manager (Daily Operations/Executor)" }), _jsx("option", { value: "VFX Supervisor/Director", className: "bg-gray-700", children: "VFX Supervisor/Director (Creative Assets/Kanban)" })] })] }), _jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, type: "submit", className: "\r\n                            py-3 mt-4 text-lg font-semibold uppercase tracking-wider\r\n                            bg-red-600 hover:bg-red-700 text-white \r\n                            rounded-lg shadow-lg shadow-red-500/30 \r\n                            transition duration-300\r\n                        ", children: "Register Account" })] }), _jsx("p", { className: "mt-4 text-center font-medium", style: { color: message.includes('Failed') || message.includes('error') ? '#e74c3c' : '#2ecc71' }, children: message }), _jsxs("p", { className: "mt-6 text-center text-sm text-gray-400", children: ["Already have access?", _jsx(Link, { to: "/login", className: "text-blue-400 hover:text-blue-300 font-semibold ml-1 transition duration-200", children: "Login to Console" })] })] }) }));
};
export default Signup;
