// src/client/src/pages/TermsOfService.tsx

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// Icons for clarity and visual interest
import { ScrollText, FileText, Globe, ArrowLeft, Users, ShieldCheck } from 'lucide-react';

// Styling and Animation Constants (Consistent with PrivacyPolicy.tsx)
const PRIMARY_BLUE = "#1A77F2"; // Google-esque blue
const ACCENT_GRAY = "#F1F3F4"; // Light grey background for contrast

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
const TermsSection: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
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


const TermsOfService: React.FC = () => {
  const navigate = useNavigate();
  
  const goBackToLanding = () => {
    navigate('/');
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeInUp}
      // Apply Google-inspired font and background
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

        {/* ---------------------------------- CONTAINER FOR TOS CONTENT ---------------------------------- */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          
          {/* HEADER (High Contrast and Clarity) */}
          <div className="p-8 md:p-10 bg-white border-b border-gray-100">
            <motion.div variants={itemStagger}>
              <div className="flex items-center space-x-4 mb-4 text-gray-800">
                <ScrollText className="w-10 h-10" style={{ color: PRIMARY_BLUE }} />
                <h1 className="text-4xl md:text-5xl font-extrabold font-google-header">
                  Terms of Service
                </h1>
              </div>
              <p className="text-lg text-gray-600">
                <span className="font-bold">The Ground Rules.</span> This document outlines the legal terms governing your use of the SHOTWEAVE platform.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Effective Date: January 1, 2025
              </p>
            </motion.div>
          </div>

          {/* TERMS SECTIONS (Contained Cards) */}
          <div className="p-8 md:p-10 space-y-8">
            
            {/* Section 1: License & Usage */}
            <TermsSection 
              icon={<FileText className="w-5 h-5" />} 
              title="1. Scope of License and Permitted Use"
            >
              <p>
                SHOTWEAVE grants you a <span className="font-bold">limited, non-exclusive, non-transferable license</span> to access and use the OS.
              </p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
                <li><span className="font-bold">Purpose:</span> Use is strictly for internal professional production management related to your declared project(s).</li>
                <li><span className="font-bold">Condition:</span> This license is contingent upon timely and full payment of all applicable subscription fees.</li>
              </ul>
            </TermsSection>

            {/* Section 2: User Responsibilities */}
            <TermsSection 
              icon={<Users className="w-5 h-5" />} 
              title="2. User Obligations and Prohibited Conduct"
            >
              <p>
                You are responsible for the actions of all individuals accessing the platform under your account.
              </p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
                <li><span className="font-bold">Compliance:</span> You must ensure that your use complies with all applicable local, state, and international laws.</li>
                <li><span className="font-bold">Prohibited Use:</span> You may not reverse engineer, decompile, or otherwise attempt to discover the source code of the SHOTWEAVE platform.</li>
              </ul>
            </TermsSection>

            {/* Section 3: Intellectual Property */}
            <TermsSection 
              icon={<ShieldCheck className="w-5 h-5" />} 
              title="3. Intellectual Property Rights"
            >
              <p>
                <span className="font-bold">Your IP:</span> You retain all ownership rights to the creative content and data you upload.
              </p>
              <p>
                <span className="font-bold">Our IP:</span> SHOTWEAVE retains all ownership rights to the platform, software, predictive algorithms, and any derivatives thereof. Your license grants use, not ownership.
              </p>
            </TermsSection>

            {/* Section 4: Governing Law */}
            <TermsSection 
              icon={<Globe className="w-5 h-5" />} 
              title="4. Governing Law and Dispute Resolution"
            >
              <p>
                These Terms shall be governed and construed in accordance with the laws of <span className="font-bold">Delaware, USA</span>, without regard to its conflict of law provisions.
              </p>
              <ul className="list-disc list-outside space-y-2 ml-6 text-gray-600">
                <li><span className="font-bold">Jurisdiction:</span> Any dispute arising under these terms shall be settled in the competent courts of New York County.</li>
              </ul>
            </TermsSection>

          </div>
          
          {/* FOOTER NOTE */}
          <div className="p-8 md:p-10 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <motion.p variants={itemStagger} className="text-sm text-gray-500 italic text-center">
              By using SHOTWEAVE, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </motion.p>
          </div>

        </div>
        
      </div>
    </motion.div>
  );
};

export default TermsOfService;