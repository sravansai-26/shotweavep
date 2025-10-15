import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, Variants, Transition } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director';
}

interface LoginProps {
  onLogin: (user: User) => void;
}

const springTransition: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 10,
};

const cardVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: springTransition },
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    if (!API_BASE_URL) {
      setMessage('Configuration Error: API URL not set in environment.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Login successful. Redirecting...');
        onLogin(data.user);
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setMessage('Login Failed: ' + data.message);
      }
    } catch (error) {
      setMessage('Network error. Failed to connect to server.');
    }
  };

  const inputStyle =
    'p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200';

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-6">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          w-full max-w-md bg-gray-800/80
          p-8 rounded-xl shadow-2xl
          border border-red-700/50
          backdrop-blur-sm
          relative
        "
      >
        <Link
          to="/"
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-700/50 hover:bg-red-600/70 text-white transition duration-200"
        >
          <ArrowLeft size={20} />
        </Link>

        <h2 className="text-3xl font-bold text-white mb-6 text-center border-b border-gray-700 pb-3">
          System Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={inputStyle}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputStyle}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="
              py-3 mt-4 text-lg font-semibold uppercase tracking-wider
              bg-red-600 hover:bg-red-700 text-white
              rounded-lg shadow-lg shadow-red-500/30
              transition duration-300
            "
          >
            Login
          </motion.button>
        </form>

        <p
          className="mt-4 text-center font-medium"
          style={{ color: message.includes('Failed') || message.includes('error') ? '#e74c3c' : '#2ecc71' }}
        >
          {message}
        </p>

        <p className="mt-6 text-center text-sm text-gray-400">
          Need an account?
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold ml-1 transition duration-200">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;