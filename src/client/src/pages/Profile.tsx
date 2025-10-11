import React from 'react';
// FIX: Added 'type Variants' and 'type Transition' to correctly type the animation object
import { motion, type Variants, type Transition } from 'framer-motion';
import { Link } from 'react-router-dom';

// CRITICAL UPDATE: User interface now includes all four defined roles
interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director';
}

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

// FIX: Define the transition object explicitly to resolve TypeScript error
const springTransition: Transition = {
    type: "spring",
    stiffness: 80,
    damping: 10, // Added damping for smoother spring animation
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  // Reference the explicitly typed transition object
  visible: { y: 0, opacity: 1, transition: springTransition },
};

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  
  // Helper function to map role to a color for visual appeal
  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'Producer/CEO':
        return 'text-red-400';
      case 'Line Producer':
        return 'text-yellow-400';
      case '1st AD/Unit Manager':
        return 'text-green-400';
      case 'VFX Supervisor/Director':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      
      <header className="py-8 w-full max-w-2xl flex justify-between items-center border-b border-gray-700 mb-8 z-10">
        <h1 className="text-3xl font-bold text-yellow-400">Access Credentials (Shotweave)</h1>
        <div className="flex gap-4">
          <Link 
            to="/dashboard" 
            className="py-1 px-3 bg-gray-700/50 hover:bg-gray-700 rounded transition text-blue-400"
          >
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
          {user.name} - <span className={`text-sm italic ${getRoleColor(user.role)}`}>{user.role}</span>
        </h3>
        
        <div className="space-y-4 text-lg">
          <p>
            <span className="font-medium text-gray-400 w-48 inline-block">System Username:</span> 
            <span className="font-mono text-white ml-2">{user.username}</span>
          </p>
          <p>
            <span className="font-medium text-gray-400 w-48 inline-block">Contact Email:</span> 
            <span className="text-gray-300 ml-2">{user.email}</span>
          </p>
          <p>
            <span className="font-medium text-gray-400 w-48 inline-block">Primary Role / Access Level:</span> 
            <span className={`font-semibold ml-2 ${getRoleColor(user.role)}`}>{user.role}</span>
          </p>
          <p className="pt-2 text-sm text-gray-500">
              *Your password is encrypted and cannot be viewed here.
          </p>
        </div>
        
      </motion.div>
    </div>
  );
};

export default Profile;
