// client/src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // <-- Import Framer Motion

// Define the expected user structure (matching the server response)
interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer';
}

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Verifying credentials...');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Critical step: Pass the returned user data to the parent App component
        onLogin(data.user); 
        setMessage("Login successful. Redirecting to dashboard...");
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage("Login Failed: " + data.message);
      }
    } catch (error) {
      setMessage('Network error. Check if the Flask server is running on port 5000.');
    }
  };

  // Framer Motion variants for card entry
  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 10 
      } 
    },
  };

  // Styles for inputs and select, consistent with Signup but focused on blue for Login
  const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200";

  return (
    // Outer Container: Dark Cinematic Background
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          w-full max-w-md bg-gray-800/80   // Semi-transparent card background
          p-8 rounded-xl shadow-2xl       // Deep shadow for security look
          border border-blue-700/50        // Subtle blue outline for access theme
          backdrop-blur-sm                 // Glass effect
        "
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center border-b border-gray-700 pb-3">
          Access Shotweave Console
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <input type="text" name="username" placeholder="Username" onChange={handleChange} className={inputStyle} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className={inputStyle} required />
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="
              py-3 mt-4 text-lg font-semibold uppercase tracking-wider
              bg-blue-600 hover:bg-blue-700 text-white 
              rounded-lg shadow-lg shadow-blue-500/30 
              transition duration-300
            "
          >
            Login
          </motion.button>
        </form>

        <p className="mt-4 text-center font-medium" style={{ color: message.includes('Failed') || message.includes('error') ? '#e74c3c' : '#2ecc71' }}>
            {message}
        </p>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account? 
          <Link to="/signup" className="text-red-400 hover:text-red-300 font-semibold ml-1 transition duration-200">
            Signup here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;