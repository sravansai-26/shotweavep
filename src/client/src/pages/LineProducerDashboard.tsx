import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin, Users, Zap, DollarSign, Film, Calendar } from 'lucide-react';

// Define the expected types for simplicity
interface User { 
  name: string; 
  email: string; 
  username: string; 
  role: 'Producer/CEO' | 'Line Producer' | '1st AD/Unit Manager' | 'VFX Supervisor/Director'; 
}
interface Vendor { 
  name: string; 
  type: string; 
  lvr_score: number; 
  reliability: string; 
  price_competitiveness: string; 
  contact: string; 
}

interface LineProducerDashboardProps {
  user: User;
  onLogout: () => void;
}

// --- NEW COMPONENT: Quote Request Modal ---
interface ModalProps {
    vendor: Vendor;
    onClose: () => void;
    onSend: (data: any) => void;
    breakdown?: any; // Optional breakdown data to prefill form
}

const QuoteRequestModal: React.FC<ModalProps> = ({ vendor, onClose, onSend, breakdown }) => {
    const [formData, setFormData] = useState({
        days: breakdown?.estimated_shoot_days || 7,
        scale: 'Regional (Mollywood)',
        requirements: breakdown?.visual_elements?.join(', ') || 'Standard 4K Camera Package',
    });
    const [sending, setSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        
        // Simulate sending the email/API request
        setTimeout(() => {
            onSend({ ...formData, vendorName: vendor.name });
            setSending(false);
            onClose();
        }, 1500);
    };

    const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full transition duration-200";

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        >
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-blue-700/50"
            >
                <h3 className="text-2xl font-bold text-blue-400 mb-2 flex items-center">
                    <Mail size={24} className="mr-2" /> Request Quote: {vendor.name}
                </h3>
                <p className="text-gray-400 mb-6 border-b border-gray-700 pb-3">
                    Submit project details to receive an estimate from this {vendor.type} unit.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    <div>
                        <label className="text-gray-300 font-medium flex items-center mb-1">
                            <Clock size={16} className="mr-2 text-yellow-500" /> Estimated No. of Days:
                        </label>
                        <input 
                            type="number" 
                            min="1" 
                            value={formData.days} 
                            onChange={e => setFormData({...formData, days: parseInt(e.target.value) || 1})} 
                            className={inputStyle} 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="text-gray-300 font-medium flex items-center mb-1">
                            <MapPin size={16} className="mr-2 text-yellow-500" /> Scale of Cinema:
                        </label>
                        <select 
                            value={formData.scale} 
                            onChange={e => setFormData({...formData, scale: e.target.value})} 
                            className={inputStyle} 
                            required
                        >
                            <option value="Regional (Mollywood)">Regional (Mollywood)</option>
                            <option value="National (Bollywood)">National (Bollywood)</option>
                            <option value="Independent/Short">Independent/Short Film</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-gray-300 font-medium flex items-center mb-1">
                            <Users size={16} className="mr-2 text-yellow-500" /> Specific Requirements:
                        </label>
                        <textarea 
                            value={formData.requirements} 
                            onChange={e => setFormData({...formData, requirements: e.target.value})} 
                            className={`${inputStyle} h-20`} 
                            placeholder="e.g., Seeking Arri Mini LF, two gimbals, and 3 gaffers."
                            required 
                        />
                    </div>

                    <div className="flex justify-between pt-4 space-x-4">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="py-3 px-6 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition duration-200 flex-1"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={sending}
                            className="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold flex-1 transition duration-200 disabled:opacity-50 flex items-center justify-center"
                        >
                            {sending ? (
                                <>
                                    <Zap size={20} className="mr-2 animate-pulse" />
                                    Sending Request...
                                </>
                            ) : (
                                "Submit Quote Request"
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
// --- END NEW COMPONENT ---


const LineProducerDashboard: React.FC<LineProducerDashboardProps> = ({ user, onLogout }) => {
  const [scriptFile, setScriptFile] = useState<File | null>(null);
  const [breakdown, setBreakdown] = useState<any>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null); // State for vendor clicked

  // 1. Script Breakdown Logic
  const handleScriptUpload = async () => {
    if (!scriptFile) return setMessage('Please upload a script file to analyze.');
    setMessage('Uploading and analyzing script using advanced NLP...');

    try {
      const formData = new FormData();
      formData.append('script_file', scriptFile);

      const response = await fetch('/api/lp/breakdown', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setBreakdown(data.breakdown);
        setMessage('Script analysis complete! Dynamic breakdown and schedule generated.');
      } else {
        setMessage('Analysis failed: ' + data.message);
      }
    } catch (error) {
      setMessage('Network error during script analysis.');
    }
  };

  // 2. LVR Data Retrieval
  const loadLVRData = async () => {
    setMessage('Loading Localized Vendor Ratings...');
    try {
      const response = await fetch('/api/lp/lvr');
      const data = await response.json();
      
      if (data.success) {
        setVendors(data.vendors.sort((a: Vendor, b: Vendor) => b.lvr_score - a.lvr_score)); // Sort by score
        setMessage('LVR Data loaded successfully! Highest LVR scores prioritized.');
      } else {
        setMessage('Failed to load LVR data.');
      }
    } catch (error) {
      setMessage('Network error during LVR data retrieval.');
    }
  };

  // 3. Modal Control
  const handleRequestQuote = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsModalOpen(true);
  };

  const handleQuoteSent = (quoteData: any) => {
    setMessage(`SUCCESS: Quote request sent to ${quoteData.vendorName} for a ${quoteData.scale} project of ${quoteData.days} days.`);
    setSelectedVendor(null);
  };

  // --- Start of JSX for Dashboard UI ---
  
  const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 w-full transition duration-200";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Conditionally render Modal */}
      {isModalOpen && selectedVendor && (
          <QuoteRequestModal 
              vendor={selectedVendor} 
              onClose={() => setIsModalOpen(false)} 
              onSend={handleQuoteSent}
              breakdown={breakdown}
          />
      )}

      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center pb-6 border-b border-gray-700"
      >
        <h1 className="text-4xl font-bold text-yellow-500 tracking-wider">
          Line Producer Console
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">Welcome, {user.name} ({user.role})</span>
          <button onClick={onLogout} className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200">
            Logout
          </button>
        </div>
      </motion.header>

      <p className="mt-4 p-3 bg-gray-800 rounded text-center" style={{ color: message.includes('SUCCESS') ? '#2ecc71' : message.includes('failed') ? '#e74c3c' : '#f39c12' }}>{message}</p>

      <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* --- 1. NLP Script Breakdown Section --- */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg border border-yellow-600/30"
        >
          <h2 className="text-2xl font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2 flex items-center">
            <Zap size={20} className="mr-2" /> NLP Script Analysis & Breakdown
          </h2>
          
          <div className="mb-4">
            <label className="text-gray-300 font-medium flex items-center mb-1">
              <Film size={16} className="mr-2 text-yellow-500" /> Upload Script (PDF/DOC/DOCX):
            </label>
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              onChange={(e) => setScriptFile(e.target.files ? e.target.files[0] : null)} 
              className={inputStyle} 
            />
          </div>
          <button onClick={handleScriptUpload} className="py-2 px-4 bg-yellow-600 hover:bg-yellow-700 font-bold rounded-md transition duration-200">
            Analyze Script & Generate Schedule
          </button>
          
          {breakdown && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 space-y-6"
            >
              {/* Summary Cards for Quick Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center">
                  <Calendar size={20} className="mr-3 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Estimated Shoot Days</p>
                    <p className="font-bold text-lg">{breakdown.estimated_shoot_days}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center">
                  <Film size={20} className="mr-3 text-red-400" />
                  <div>
                    <p className="text-sm text-gray-400">Total Scenes</p>
                    <p className="font-bold text-lg">{breakdown.scene_count}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center">
                  <MapPin size={20} className="mr-3 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Locations Identified</p>
                    <p className="font-bold text-lg">{breakdown.location_count}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center">
                  <Users size={20} className="mr-3 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Unique Characters</p>
                    <p className="font-bold text-lg">{breakdown.character_count}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Scene Breakdown with Visual Elements and Requirements */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center"><Clock size={20} className="mr-2 text-yellow-400" /> Dynamic Scene Breakdown & Scheduling</h4>
                <div className="space-y-3 overflow-y-auto max-h-96">
                  {breakdown.scenes.map((scene: any, index: number) => (
                    <details key={index} className="bg-gray-700 rounded-lg">
                      <summary className="p-4 font-semibold cursor-pointer flex items-center justify-between">
                        <span>Scene {scene.scene_number}: {scene.description} (Day {scene.scheduled_day})</span>
                        <Zap size={16} className="text-yellow-500" />
                      </summary>
                      <div className="p-4 border-t border-gray-600 space-y-2">
                        <p className="flex items-center"><MapPin size={16} className="mr-2 text-red-400" /> Location: {scene.location}</p>
                        <p className="flex items-center"><Clock size={16} className="mr-2 text-green-400" /> Estimated Time: {scene.estimated_time}</p>
                        <p className="flex items-center"><Users size={16} className="mr-2 text-blue-400" /> Cast Required: {scene.cast.join(', ') || 'None'}</p>
                        <p className="flex items-center"><Users size={16} className="mr-2 text-purple-400" /> Crew Required: {scene.crew.join(', ') || 'Standard Crew'}</p>
                        <p className="flex items-center"><Film size={16} className="mr-2 text-yellow-400" /> Visual Elements: {scene.visual_elements.join(', ') || 'None'}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* --- 2. LVR Section --- */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-600/30"
        >
          <h2 className="text-2xl font-semibold mb-6 text-blue-400 border-b border-gray-700 pb-2 flex items-center">
            <DollarSign size={20} className="mr-2" /> Localized Vendor Rating (LVR)
          </h2>
          <button onClick={loadLVRData} className="py-2 px-4 bg-blue-600 hover:bg-blue-700 font-bold rounded-md transition duration-200 mb-4">
            Load Rated Vendor List
          </button>
          
          {vendors.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-700/70">
                    <th className="p-3 text-left">Vendor</th>
                    <th className="p-3 text-left">LVR Score</th>
                    <th className="p-3 text-left">Reliability</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.map((v, index) => (
                    <motion.tr 
                      key={index} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition duration-150"
                    >
                      <td className="p-3 font-semibold">{v.name}</td>
                      <td className="p-3 font-bold" style={{ color: v.lvr_score > 90 ? '#2ecc71' : '#f1c40f' }}>{v.lvr_score}%</td>
                      <td className="p-3">{v.reliability}</td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => handleRequestQuote(v)} 
                          className="text-blue-400 hover:text-blue-300 transition flex items-center justify-center mx-auto"
                        >
                          <Mail size={16} className="mr-1" /> Request Quote
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
        
      </main>
    </div>
  );
};

export default LineProducerDashboard;