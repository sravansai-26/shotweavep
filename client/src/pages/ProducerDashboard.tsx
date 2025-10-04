// client/src/pages/ProducerDashboard.tsx
import React, { useState } from 'react';

interface User { name: string; email: string; username: string; role: 'Producer/CEO' | 'Line Producer'; }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const getColor = (status: string) => {
    if (status === 'RED') return 'red';
    if (status === 'YELLOW') return 'yellow';
    return 'green';
  };

  const runRiskMeter = async () => {
    setMessage('Running Scikit-learn Risk Prediction...');
    try {
      const response = await fetch('/api/ceo/risk_meter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      
      if (data.success) {
        setRiskAnalysis(data.risk_analysis);
        setMessage('Risk analysis complete!');
      } else {
        setMessage('Risk analysis failed: ' + data.message);
      }
    } catch (error) {
      setMessage('Network error during risk analysis.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', color: 'white', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '15px' }}>
        <h2>Producer/CEO Dashboard - Shotweave</h2>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, **{user.name}** ({user.role})</span>
          <button onClick={onLogout} style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>
      
      <p style={{ margin: '20px 0', color: '#f39c12' }}>{message}</p>

      {/* --- AI Risk Meter Section --- */}
      <div style={{ border: '1px solid #333', padding: '20px', backgroundColor: '#2a2a2a' }}>
        <h3>AI Risk Meter: Project Health Forecaster</h3>
        <p style={{ marginBottom: '20px', color: '#ccc' }}>Input current live data to forecast project risk level.</p>

        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Input Form */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label>Days Behind Schedule:</label>
            <input type="number" name="days_behind" value={formData.days_behind} onChange={handleChange} min="0" style={inputStyle} />
            
            <label>Current Cost Variance (%):</label>
            <input type="number" name="cost_variance_pct" value={formData.cost_variance_pct} onChange={handleChange} min="0" step="0.1" style={inputStyle} />
            
            <label>Script Complexity Score (Auto-Generated):</label>
            <input type="number" name="complexity_score" value={formData.complexity_score} onChange={handleChange} min="1" max="100" style={inputStyle} />
            
            <button onClick={runRiskMeter} style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
              RUN RISK METER
            </button>
          </div>

          {/* Output Display */}
          {riskAnalysis && (
            <div style={{ flex: 1, padding: '20px', borderLeft: '3px solid #555', backgroundColor: '#1e1e1e' }}>
              <h4>AI Risk Assessment:</h4>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: 'bold', 
                  color: getColor(riskAnalysis.status), 
                  border: `4px solid ${getColor(riskAnalysis.status)}`,
                  borderRadius: '50%',
                  width: '100px',
                  height: '100px',
                  lineHeight: '92px',
                  margin: '0 auto'
                }}>
                  {riskAnalysis.risk_score}
                </div>
                <h3 style={{ color: getColor(riskAnalysis.status) }}>**STATUS: {riskAnalysis.status}**</h3>
              </div>
              
              <div style={{ padding: '10px', backgroundColor: '#2a2a2a', borderRadius: '5px' }}>
                <p style={{ fontWeight: 'bold', color: '#ccc' }}>CEO Suggestion:</p>
                <p style={{ color: getColor(riskAnalysis.status) }}>{riskAnalysis.suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const inputStyle = { padding: '8px', backgroundColor: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' };

export default ProducerDashboard;