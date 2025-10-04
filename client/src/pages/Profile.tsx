// client/src/pages/Profile.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer';
}

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      
      <header className="py-8 w-full max-w-2xl flex justify-between items-center border-b border-gray-700 mb-8 z-10">
        <h1 className="text-3xl font-bold text-yellow-400">User Profile (Shotweave)</h1>
        <div className="flex gap-4">
          <Link to="/dashboard" className="text-blue-400 hover:text-blue-300 transition">
            Go to Dashboard
          </Link>
          <button 
            onClick={onLogout} 
            className="py-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Logout
          </button>
        </div>
      </header>

      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="
          w-full max-w-2xl bg-gray-800/80 p-8 rounded-xl shadow-2xl 
          border border-yellow-600/50 backdrop-blur-sm
        "
      >
        <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
          {user.name} - <span className="text-sm italic text-yellow-400">{user.role}</span>
        </h3>
        
        <div className="space-y-4 text-lg">
          <p>
            <span className="font-medium text-gray-400 w-32 inline-block">Username:</span> 
            <span className="font-mono text-white ml-2">{user.username}</span>
          </p>
          <p>
            <span className="font-medium text-gray-400 w-32 inline-block">Email:</span> 
            <span className="text-gray-300 ml-2">{user.email}</span>
          </p>
          <p>
            <span className="font-medium text-gray-400 w-32 inline-block">Access Level:</span> 
            <span className="text-green-400 ml-2">{user.role}</span>
          </p>
        </div>
        
      </motion.div>
    </div>
  );
};

export default Profile;