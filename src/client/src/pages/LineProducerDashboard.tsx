// client/src/pages/LineProducerDashboard.tsx
import React, { useState } from 'react';

// Define the expected types for simplicity
interface User { name: string; email: string; username: string; role: 'Producer/CEO' | 'Line Producer'; }
interface Vendor { name: string; type: string; lvr_score: number; reliability: string; price_competitiveness: string; contact: string; }

interface LineProducerDashboardProps {
  user: User;
  onLogout: () => void;
}

const LineProducerDashboard: React.FC<LineProducerDashboardProps> = ({ user, onLogout }) => {
  const [scriptText, setScriptText] = useState('');
  const [breakdown, setBreakdown] = useState<any>(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [message, setMessage] = useState('');

  // 1. Script Breakdown Logic
  const handleScriptUpload = async () => {
    if (!scriptText) return setMessage('Please paste a script to analyze.');
    setMessage('Analyzing script using SpaCy NLP...');

    try {
      const response = await fetch('/api/lp/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ script_text: scriptText }),
      });
      const data = await response.json();
      
      if (data.success) {
        setBreakdown(data.breakdown);
        setMessage('Script analysis complete!');
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
        setMessage('LVR Data loaded successfully!');
      } else {
        setMessage('Failed to load LVR data.');
      }
    } catch (error) {
      setMessage('Network error during LVR data retrieval.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#2c3e50', color: 'white', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #34495e', paddingBottom: '15px' }}>
        <h2>Line Producer Dashboard - Shotweave</h2>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, **{user.name}** ({user.role})</span>
          <button onClick={onLogout} style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>
      
      <p style={{ margin: '20px 0', color: '#f39c12' }}>{message}</p>

      {/* --- Script Breakdown Section --- */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1, border: '1px solid #34495e', padding: '20px', backgroundColor: '#34495e' }}>
          <h3>1. NLP Script Breakdown</h3>
          <textarea 
            placeholder="Paste your script text here for automated analysis..."
            value={scriptText}
            onChange={(e) => setScriptText(e.target.value)}
            rows={10} 
            style={{ width: '100%', marginBottom: '10px', padding: '10px', backgroundColor: '#2c3e50', color: 'white', border: '1px solid #4a627a' }}
          />
          <button onClick={handleScriptUpload} style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Analyze Script
          </button>
          
          {breakdown && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#2c3e50', borderLeft: '3px solid #3498db' }}>
              <h4>Analysis Results (Initial Schedule)</h4>
              <p>Estimated Shoot Days: **{breakdown.estimated_shoot_days}**</p>
              <p>Location Count: **{breakdown.location_count}**</p>
              <p>Character Count: **{breakdown.character_count}**</p>
              <p>Key Locations: *{breakdown.locations.slice(0, 3).join(', ')}* (and {breakdown.locations.length - 3} more)</p>
            </div>
          )}
        </div>

        {/* --- LVR Section --- */}
        <div style={{ flex: 1, border: '1px solid #34495e', padding: '20px', backgroundColor: '#34495e' }}>
          <h3>2. Localized Vendor Rating (LVR)</h3>
          <button onClick={loadLVRData} style={{ padding: '10px 20px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '15px' }}>
            Load Vendor List
          </button>
          
          {vendors.length > 0 && (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#2c3e50' }}>
                  <th style={tableHeaderStyle}>Vendor</th>
                  <th style={tableHeaderStyle}>Type</th>
                  <th style={tableHeaderStyle}>LVR Score</th>
                  <th style={tableHeaderStyle}>Reliability</th>
                  <th style={tableHeaderStyle}>Contact</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((v, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #4a627a' }}>
                    <td style={tableCellStyle}>**{v.name}**</td>
                    <td style={tableCellStyle}>{v.type}</td>
                    <td style={{ ...tableCellStyle, fontWeight: 'bold', color: v.lvr_score > 90 ? '#2ecc71' : '#f1c40f' }}>{v.lvr_score}%</td>
                    <td style={tableCellStyle}>{v.reliability}</td>
                    <td style={tableCellStyle}><a href={`mailto:${v.contact}`} style={{ color: '#3498db' }}>Email</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <p style={{ marginTop: '20px', color: '#95a5a6', textAlign: 'center' }}>*LVR Score is calculated based on Price, Reliability, and Past Performance Data.*</p>
    </div>
  );
};

// Simple inline styles for table
const tableHeaderStyle = { padding: '10px', textAlign: 'left', borderBottom: '2px solid #3498db' };
const tableCellStyle = { padding: '10px', textAlign: 'left' };

export default LineProducerDashboard;