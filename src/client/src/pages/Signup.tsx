import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// CORRECTION: Imported 'Transition' type to resolve compilation errors
import { motion, type Variants, type Transition } from 'framer-motion'; 
import { ArrowLeft } from 'lucide-react'; // Icon for back button

// FIX: Explicitly define the transition object that was causing the TypeScript error
const springTransition: Transition = {
    type: "spring", 
    stiffness: 80, 
    damping: 10 
};

// Framer Motion variants for card entry
const cardVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: springTransition, // Use the explicitly typed Transition object
  },
};

const Signup: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Success feedback
        setMessage(data.message + " Redirecting to login...");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        // Conflict/Failure feedback
        setMessage("Signup Failed: " + data.message);
      }
    } catch (error) {
      // Network error feedback
      setMessage('Network error. Check server status.');
    }
  };

  const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200";
  const selectStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 transition duration-200";

  return (
    // Outer Container: Dark Cinematic Background
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          w-full max-w-md bg-gray-800/80   // Semi-transparent card background
          p-8 rounded-xl shadow-2xl      // Deep shadow for security look
          border border-red-700/50       // Subtle red outline for high-alert/security theme
          backdrop-blur-sm               // Glass effect
          relative                       // Needed for absolute positioning of the back button
        "
      >
        {/* Back Button for Easy Navigation */}
        <Link 
            to="/" 
            className="absolute top-4 left-4 p-2 rounded-full 
                        bg-gray-700/50 hover:bg-red-600/70 text-white 
                        transition duration-200"
        >
            <ArrowLeft size={20} />
        </Link>

        <h2 className="text-3xl font-bold text-white mb-6 text-center border-b border-gray-700 pb-3">
          Initiate Project Access
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <input type="text" name="name" placeholder="Full Name (Production ID)" onChange={handleChange} className={inputStyle} required />
          <input type="email" name="email" placeholder="Secure Email Address" onChange={handleChange} className={inputStyle} required />
          <input type="text" name="username" placeholder="Desired System Username" onChange={handleChange} className={inputStyle} required />
          <input type="password" name="password" placeholder="Secure Password" onChange={handleChange} className={inputStyle} required />
          
          <div className="flex flex-col">
            {/* ACCESSIBILITY FIX: Added htmlFor to associate the label with the select element */}
            <label htmlFor="role-select" className="text-sm font-medium text-gray-400 mb-1">Select Primary Role:</label>
            {/* ACCESSIBILITY FIX: Added id to make the select element targetable by the label */}
            <select id="role-select" name="role" value={formData.role} onChange={handleChange} className={selectStyle} required>
              <option value="Producer/CEO" className="bg-gray-700">Producer/CEO (Financial Oversight)</option>
              <option value="Line Producer" className="bg-gray-700">Line Producer (Operational Management)</option>
              {/* --- NEW ROLES ADDED HERE --- */}
              <option value="1st AD/Unit Manager" className="bg-gray-700">1st AD/Unit Manager (Daily Operations/Executor)</option>
              <option value="VFX Supervisor/Director" className="bg-gray-700">VFX Supervisor/Director (Creative Assets/Kanban)</option>
              {/* --------------------------- */}
            </select>
          </div>

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
            Register Account
          </motion.button>
        </form>

        <p className="mt-4 text-center font-medium" style={{ color: message.includes('Failed') || message.includes('error') ? '#e74c3c' : '#2ecc71' }}>
            {message}
        </p>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have access? 
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold ml-1 transition duration-200">
            Login to Console
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
