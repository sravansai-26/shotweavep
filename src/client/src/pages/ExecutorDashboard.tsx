import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface User {
  name: string;
  email: string;
  username: string;
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director';
}

interface ExecutorDashboardProps {
  user: User;
  onLogout: () => void;
}

const ExecutorDashboard: React.FC<ExecutorDashboardProps> = ({ user, onLogout }) => {
  const [report, setReport] = useState({
    scenes_shot: 0,
    daily_spend: 0,
    delay_minutes: 0,
    notes: '',
  });
  const [message, setMessage] = useState('');

  const handleDPRSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Submitting DPR and Expense Log...');
    
    // --- Mock API Call ---
    setTimeout(() => {
      // In a real implementation, this POSTs to /api/dpr/submit
      const status = report.scenes_shot > 0 ? 'SUCCESS' : 'WARNING';
      setMessage(`[${status}] DPR for Day 5 submitted! Scenes: ${report.scenes_shot}. Data is now feeding the AI Risk Meter.`);
      setReport({ scenes_shot: 0, daily_spend: 0, delay_minutes: 0, notes: '' });
    }, 1500);
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center pb-6 border-b border-gray-700"
      >
        <h1 className="text-4xl font-bold text-yellow-500 tracking-wider">
          Daily Operations Hub
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Welcome, {user.name} ({user.role})</span>
          <button onClick={onLogout} className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200">
            Logout
          </button>
        </div>
      </motion.header>

      <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 1. Daily Progress Report (DPR) Form --- */}
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-yellow-600/30"
        >
          <h2 className="text-2xl font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2">
            Log Daily Progress & Expenses
          </h2>
          <form onSubmit={handleDPRSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Scenes Shot Today (Actual)</label>
              <input type="number" value={report.scenes_shot} onChange={e => setReport({...report, scenes_shot: parseInt(e.target.value) || 0})} 
                     className={inputStyle} placeholder="e.g., 6" required />
            </div>
            
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Total Daily Spend (₹)</label>
              <input type="number" value={report.daily_spend} onChange={e => setReport({...report, daily_spend: parseFloat(e.target.value) || 0})} 
                     className={inputStyle} placeholder="e.g., 150000.00" required />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Schedule Delay (Minutes)</label>
              <input type="number" value={report.delay_minutes} onChange={e => setReport({...report, delay_minutes: parseInt(e.target.value) || 0})} 
                     className={inputStyle} placeholder="e.g., 90 (Delay)" />
            </div>
            
            <div className="flex flex-col">
              <label className="text-gray-400 mb-1">Daily Notes/Causality Tag</label>
              <input type="text" value={report.notes} onChange={e => setReport({...report, notes: e.target.value})} 
                     className={inputStyle} placeholder="e.g., 'Star late' or 'Weather hold'" />
            </div>

            <button type="submit" className="md:col-span-2 py-3 bg-yellow-600 hover:bg-yellow-700 font-bold uppercase rounded-md transition duration-200 shadow-md mt-4">
              Submit DPR (Feeds AI Risk Meter)
            </button>
          </form>
          <p className="mt-4 text-center text-sm" style={{ color: message.includes('SUCCESS') ? '#2ecc71' : message.includes('WARNING') ? '#f39c12' : 'gray' }}>
            {message}
          </p>
        </motion.div>

        {/* --- 2. Live Schedule Status --- */}
        <motion.div 
          variants={cardVariants} 
          initial="hidden" 
          animate="visible" 
          transition={{ delay: 0.3 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-400 border-b border-gray-700 pb-2">
            Project Status Overview
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-400">Current Shoot Day:</p>
            <p className="text-3xl font-bold text-white">Day 5 of 30</p>
            
            <hr className="border-gray-700" />
            
            <p className="text-sm text-gray-400">Total Scenes Remaining:</p>
            <p className="text-3xl font-bold text-red-500">84 Scenes</p>
            
            <hr className="border-gray-700" />
            
            <p className="text-sm text-gray-400">Next Scheduled Scene:</p>
            <p className="text-xl font-mono text-green-400">Scene 24A: Hospital - Day</p>
          </div>
        </motion.div>
        
      </main>
    </div>
  );
};

export default ExecutorDashboard;