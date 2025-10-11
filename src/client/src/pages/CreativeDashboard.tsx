import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Kanban, CheckCircle, Clock, XCircle, Zap } from 'lucide-react';

interface Shot {
  id: number;
  name: string;
  status: 'TODO' | 'IN_PROGRESS' | 'READY_FOR_REVIEW' | 'COMPLETE';
  complexity: 'Low' | 'Medium' | 'High';
}

// Mock Data for the Kanban Board (NLP tagged assets)
// FIX 1: Explicitly typed the array as Shot[] to resolve TS2322 type mismatch errors.
const initialVFXShots: Shot[] = [
  { id: 1, name: 'Shot 4A: Starship Landing', status: 'TODO', complexity: 'High' },
  { id: 2, name: 'Shot 12C: CGI Crowds', status: 'IN_PROGRESS', complexity: 'Medium' },
  { id: 3, name: 'Shot 33B: Green Screen BG Replace', status: 'READY_FOR_REVIEW', complexity: 'Low' },
  { id: 4, name: 'Shot 55D: Final Explosion FX', status: 'COMPLETE', complexity: 'High' },
];

interface User {
  name: string;
  email: string;
  username: string;
  // NOTE: This union type must match the definition used in App.tsx, Login.tsx, and Signup.tsx
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director';
}

interface CreativeDashboardProps {
  user: User;
  onLogout: () => void;
}

// Kanban Column Component
const KanbanColumn: React.FC<{ title: string; shots: Shot[]; icon: React.ReactNode; bgColor: string }> = ({ title, shots, icon, bgColor }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className={`text-xl font-bold text-white p-3 rounded-t-lg flex items-center ${bgColor}`}>
        {icon}
        <span className="ml-2">{title} ({shots.length})</span>
      </h3>
      <div className="flex-1 space-y-4 p-3 overflow-y-auto bg-gray-800/70 rounded-b-lg">
        {shots.map(shot => (
          <motion.div 
            key={shot.id} 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600/50 hover:border-blue-500 transition duration-150 cursor-pointer"
          >
            <p className="font-semibold text-gray-100">{shot.name}</p>
            <p className={`text-xs mt-1 inline-block py-0.5 px-2 rounded-full font-medium ${shot.complexity === 'High' ? 'bg-red-900 text-red-300' : shot.complexity === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'}`}>
              {shot.complexity} Complexity
            </p>
          </motion.div>
        ))}
        {shots.length === 0 && (
          <p className="text-gray-500 text-center py-4 italic">No assets in this stage.</p>
        )}
      </div>
    </div>
  );
};


const CreativeDashboard: React.FC<CreativeDashboardProps> = ({ user, onLogout }) => {
  // FIX 2: Removed unused setter 'setShots' to resolve TS6133
  const [shots] = useState(initialVFXShots);
  
  // Group shots by status
  const shotsByStatus = (status: Shot['status']) => shots.filter(shot => shot.status === status);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center pb-6 border-b border-gray-700"
      >
        <h1 className="text-4xl font-bold text-blue-400 tracking-wider flex items-center">
            <Kanban size={32} className="mr-3" /> VFX Asset Tracker
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Welcome, {user.name} ({user.role})</span>
          <button onClick={onLogout} className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200">
            Logout
          </button>
        </div>
      </motion.header>

      <main className="mt-8">
        <h2 className="text-2xl font-light text-gray-300 mb-6">
            Project: <span className="font-semibold text-blue-300">"Operation Mangalam"</span>
        </h2>
        
        {/* --- Kanban Board Grid --- */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="grid grid-cols-4 gap-4 h-[75vh]"
        >
          <KanbanColumn 
            title="NLP Tagged Shots (To Do)" 
            shots={shotsByStatus('TODO')} 
            icon={<XCircle size={20} />}
            bgColor="bg-gray-700"
          />
          <KanbanColumn 
            title="Work In Progress" 
            shots={shotsByStatus('IN_PROGRESS')} 
            icon={<Clock size={20} />}
            bgColor="bg-yellow-700"
          />
          <KanbanColumn 
            title="Ready for Review (Director)" 
            shots={shotsByStatus('READY_FOR_REVIEW')} 
            icon={<Zap size={20} />}
            bgColor="bg-blue-700"
          />
          <KanbanColumn 
            title="Final Approved" 
            shots={shotsByStatus('COMPLETE')} 
            icon={<CheckCircle size={20} />}
            bgColor="bg-green-700"
          />
        </motion.div>
      </main>
    </div>
  );
};

export default CreativeDashboard;
