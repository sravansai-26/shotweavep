// src/client/src/pages/PrivacyPolicy.tsx

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// Icons for clarity and visual interest
import { Shield, Lock, Activity, ArrowLeft, EyeOff, Scale } from 'lucide-react';

// Styling and Animation Constants
const PRIMARY_BLUE = "#1A77F2"; // Google-esque blue
const ACCENT_GRAY = "#F1F3F4"; // Light grey for container backgrounds

// Snappier transition values, typical of Material Design (faster entry)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, // Faster duration
      ease: [0.33, 1, 0.68, 1], // Standard Material exit curve
      staggerChildren: 0.08, 
    } 
  },
};

const itemStagger: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Component for a clean, contained policy section card
const PolicySection: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <motion.div 
    variants={itemStagger}
    className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <h2 className="text-xl font-bold mb-3 text-gray-800 flex items-start gap-3">
      <div className="p-2 rounded-full flex-shrink-0" style={{ backgroundColor: ACCENT_GRAY, color: PRIMARY_BLUE }}>
        {icon}
      </div>
      <span className="mt-0.5">{title}</span>
    </h2>
    <div className="text-gray-700 space-y-4 text-base pl-2">
      {children}
    </div>
  </motion.div>
);


const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  
  const goBackToLanding = () => {
    navigate('/');
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeInUp}
      // Use font-google-body for the entire page to ensure a uniform look
      className="min-h-screen font-google-body" style={{ backgroundColor: ACCENT_GRAY }} 
    >
      <div className="max-w-4xl mx-auto pt-10 pb-20">
        
        {/* ---------------------------------- BACK NAVIGATION ---------------------------------- */}
        <motion.div variants={itemStagger} className="px-6 md:px-0 mb-6">
          <button
            onClick={goBackToLanding}
            className="p-3 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none transition duration-200 transform hover:scale-105"
            aria-label="Go back to landing page"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </motion.div>

        {/* ---------------------------------- CONTAINER FOR POLICY CONTENT ---------------------------------- */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* HEADER (High Contrast and Clarity) */}
          <div className="p-8 md:p-10 bg-white border-b border-gray-100">
            <motion.div variants={itemStagger}>
              <div className="flex items-center space-x-4 mb-4 text-gray-800">
                <Shield className="w-10 h-10" style={{ color: PRIMARY_BLUE }} />
                <h1 className="text-4xl md:text-5xl font-extrabold font-google-header">
                  SHOTWEAVE Privacy Protocol
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                <span className="font-bold">Clarity, Control, and Trust.</span> Our policy is designed to be clear, transparent, and focused on protecting the integrity of your creative and proprietary data.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last Updated: October 2025
              </p>
            </motion.div>
          </div>

          {/* POLICY SECTIONS (Contained Cards) */}
          <div className="p-8 md:p-10 space-y-8">
            
            {/* Section 1: Data Integrity and Security */}
            <PolicySection 
              icon={<Lock className="w-5 h-5" />} 
              title="1. Data Integrity & Encryption"
            >
              <p>
                All project data (scripts, budgets, schedules) is treated as <span className="font-bold">highly confidential IP</span>. We deploy a defense-in-depth approach using secure, modern standards.
              </p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
                <li><span className="font-bold">In Transit:</span> All connections are secured using <span className="font-bold">TLS 1.3</span> cryptographic protocols.</li>
                <li><span className="font-bold">At Rest:</span> Files are encrypted using <span className="font-bold">AES-256</span>, ensuring your assets are protected at all times.</li>
              </ul>
            </PolicySection>

            {/* Section 2: Usage and Predictive AI */}
            <PolicySection 
              icon={<Activity className="w-5 h-5" />} 
              title="2. Predictive AI & Metadata Usage"
            >
              <p>
                Our core innovation, predictive intelligence, is trained only on <span className="font-bold">anonymized metadata</span>, ensuring your narrative content is never exposed or analyzed for model training.
              </p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
                <li><span className="font-bold">Exclusions:</span> We <span className="font-bold">never</span> access, share, or analyze your creative files (scripts, media) for AI training.</li>
                <li><span className="font-bold">Inclusions:</span> We only use generalized data like scene complexity ratings, crew size, and scheduling patterns, which is <span className="font-bold">de-identified</span> from your project.</li>
              </ul>
            </PolicySection>

            {/* Section 3: User Ownership and Control */}
            <PolicySection 
              icon={<EyeOff className="w-5 h-5" />} 
              title="3. Absolute User Ownership & Deletion"
            >
              <p>
                You retain <span className="font-bold">100% ownership</span> of all Intellectual Property uploaded. We are custodians of your data, not owners.
              </p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
                <li><span className="font-bold">Retention:</span> Your files are only retained while your account is active, serving the contracted service.</li>
                <li><span className="font-bold">Deletion:</span> Upon account closure, all project files and associated creative data are <span className="font-bold">permanently purged</span> from our primary and backup servers within 30 days.</li>
              </ul>
            </PolicySection>

            {/* Section 4: Compliance & Legal */}
            <PolicySection 
              icon={<Scale className="w-5 h-5" />} 
              title="4. Legal and Regulatory Compliance"
            >
              <p>
                SHOTWEAVE operates in compliance with major global data regulations to ensure your peace of mind, regardless of your production location.
              </p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
                <li>We adhere to best practices inspired by frameworks like <span className="font-bold">GDPR and CCPA</span>.</li>
                <li>Data processing activities are routinely audited to maintain the highest standard of compliance.</li>
              </ul>
            </PolicySection>

          </div>
          
          {/* FOOTER NOTE */}
          <div className="p-8 md:p-10 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <motion.p variants={itemStagger} className="text-sm text-gray-500 italic text-center">
              This protocol is a living document. SHOTWEAVE reserves the right to update this policy, with notice provided to all users on material changes.
            </motion.p>
          </div>

        </div>
        
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;