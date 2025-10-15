import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Zap } from 'lucide-react';

// FIX: To avoid the 'empty-import-meta' warning in environments targeting es2015/es5, 
// we assume the environment variable will be correctly replaced during the build process, 
// or use a safe fallback access pattern if available.
// NOTE: We keep the variable here but acknowledge the warning is an environment setup issue.
const API_BASE_URL = typeof import.meta.env.VITE_API_URL !== 'undefined' 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:5000'; // Default fallback for local testing

interface User { 
  name: string; 
  email: string; 
  username: string; 
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director'; 
}

interface ProducerDashboardProps {
  user: User;
  onLogout: () => void;
}

const ProducerDashboard: React.FC<ProducerDashboardProps> = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    days_behind: 1,
    cost_variance_pct: 5.0,
    complexity_score: 75,
  });
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null);
  const [message, setMessage] = useState('');

  // Function to run the risk meter, used both on mount and on button click
  const runRiskMeter = async (method: 'GET' | 'POST') => {
    // Check environment URL (using the variable defined above)
    if (!API_BASE_URL) {
      setMessage('Configuration Error: API URL not set in environment.');
      return;
    }

    setMessage('Running Scikit-learn Risk Prediction...');
    setRiskAnalysis(null); // Clear previous analysis

    try {
      // FIX: Use API_BASE_URL to point to the Render backend
      const url = `${API_BASE_URL}/api/ceo/risk_meter`;
      
      // Determine body based on method
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: method === 'POST' ? JSON.stringify(formData) : undefined,
      };
      
      const response = await fetch(url, requestOptions);
      
      // Handle non-OK status codes (like 500, 401)
      if (!response.ok) {
        // If it's a 404/405, provide a specific error message
        if (response.status === 404 || response.status === 405) {
            setMessage(`API Error: Endpoint not found on server (${response.status}).`);
        } else {
            // Attempt to read error message from body if available
            try {
                const errorData = await response.json();
                setMessage(`API Error: ${errorData.message || 'Server returned error.'}`);
            } catch {
                 setMessage(`API Error: Server responded with status ${response.status}.`);
            }
        }
        return;
      }

      const data = await response.json();
      
      if (data.success) {
        setRiskAnalysis(data.risk_analysis);
        setMessage('Risk analysis complete!');
      } else {
        setMessage('Risk analysis failed: ' + data.message);
      }
    } catch (error) {
      setMessage('Network error during risk analysis. Check console for CORS issues.');
    }
  };
  
  // RUN the GET request on initial load to populate the dashboard with mock data
  useEffect(() => {
    runRiskMeter('GET');
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  // Helper function for dynamic color based on risk status
  const getColor = (status: string) => {
    if (status === 'RED') return 'text-red-500 border-red-500';
    if (status === 'YELLOW') return 'text-yellow-400 border-yellow-400';
    return 'text-green-500 border-green-500';
  };
  
  const getBgColor = (status: string) => {
    if (status === 'RED') return 'bg-red-900/30 border-red-500';
    if (status === 'YELLOW') return 'bg-yellow-900/30 border-yellow-500';
    return 'bg-green-900/30 border-green-500';
  };

  // Custom Tailwind classes for input styling
  const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full transition duration-200";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-google-body">
      
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center pb-6 border-b border-gray-700"
      >
        <h1 className="text-4xl font-bold text-blue-400 tracking-wider flex items-center">
          <DollarSign size={32} className="mr-3 text-red-500" /> Producer/CEO Console
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Welcome, {user.name} ({user.role})</span>
          <button onClick={onLogout} className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200 font-semibold">
            Logout
          </button>
        </div>
      </motion.header>
      
      <p className="mt-4 p-3 bg-gray-800 rounded text-center" style={{ color: message.includes('complete') ? '#2ecc71' : message.includes('failed') || message.includes('Error') ? '#e74c3c' : '#f39c12' }}>
        {message}
      </p>

      {/* --- AI Risk Meter Section --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-8 p-6 rounded-xl shadow-2xl border border-blue-700/50 bg-gray-800/80"
      >
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 border-b border-gray-700 pb-3 flex items-center">
          <TrendingUp size={24} className="mr-3" /> AI Risk Meter: Project Health Forecaster
          </h2>
        
        <p className="mb-6 text-gray-400">Input current live performance metrics to execute the proprietary risk assessment algorithm.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Input Form */}
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
                <label htmlFor="days_behind" className="text-gray-300 font-medium mb-1">Days Behind Schedule (Actual - Target):</label>
                <input 
                    id="days_behind" 
                    type="number" 
                    name="days_behind" 
                    value={formData.days_behind} 
                    onChange={handleChange} 
                    min="0" 
                    className={inputStyle} 
                />
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="cost_variance_pct" className="text-gray-300 font-medium mb-1">Current Cost Variance (%) (Budget Overrun):</label>
                <input 
                    id="cost_variance_pct" 
                    type="number" 
                    name="cost_variance_pct" 
                    value={formData.cost_variance_pct} 
                    onChange={handleChange} 
                    min="0" 
                    step="0.1" 
                    className={inputStyle} 
                />
            </div>
            
            <div className="flex flex-col">
                <label htmlFor="complexity_score" className="text-gray-300 font-medium mb-1">Script Complexity Score (Auto-Generated):</label>
                <input 
                    id="complexity_score" 
                    type="number" 
                    name="complexity_score" 
                    value={formData.complexity_score} 
                    onChange={handleChange} 
                    min="1" 
                    max="100" 
                    className={inputStyle} 
                />
            </div>
            
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => runRiskMeter('POST')} 
                className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-200 mt-2 shadow-md shadow-blue-500/30"
            >
              <Zap size={20} className="inline mr-2" /> RUN RISK METER
            </motion.button>
          </div>

          {/* Output Display */}
          {riskAnalysis && (
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-xl shadow-inner border-4 ${getBgColor(riskAnalysis.status)}`}
            >
              <h4 className="text-xl font-semibold mb-4 text-gray-200">AI Risk Assessment:</h4>
              <div className="text-center my-6">
                <div 
                    className={`
                        text-7xl font-extrabold 
                        ${getColor(riskAnalysis.status)} 
                        border-4 ${getColor(riskAnalysis.status)} 
                        rounded-full 
                        w-32 h-32 
                        flex items-center justify-center 
                        mx-auto shadow-2xl
                    `}
                >
                  {riskAnalysis.risk_score}
                </div>
                <h3 className={`text-2xl font-bold mt-4 ${getColor(riskAnalysis.status)}`}>
                    STATUS: {riskAnalysis.status}
                </h3>
              </div>
              
              <div className="p-4 bg-gray-700 rounded-lg border-l-4 border-yellow-500">
                <p className="font-bold text-yellow-300 mb-1">CEO Suggestion:</p>
                <p className={`text-sm ${getColor(riskAnalysis.status)}`}>{riskAnalysis.suggestion}</p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProducerDashboard;
