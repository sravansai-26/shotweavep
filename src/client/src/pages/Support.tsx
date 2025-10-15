// src/client/src/pages/Support.tsx

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Headset, Mail, Phone, Clock } from 'lucide-react';

// Styling and Animation Constants
const PRIMARY_BLUE = "#1A73E8";
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] } },
};

const Support: React.FC = () => {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeInUp}
      className="min-h-screen bg-white font-google-body py-16 px-6 md:px-12 max-w-4xl mx-auto shadow-xl"
    >
      <div className="flex items-center space-x-4 mb-10 border-b pb-4">
        <Headset className="w-10 h-10" style={{ color: PRIMARY_BLUE }} />
        <h1 className="text-4xl md:text-5xl font-extrabold font-google-header text-gray-900">
          Support Center
        </h1>
      </div>

      <p className="text-xl font-light text-gray-700 mb-12">
        Get the critical support you need, instantly. Our team is focused on maximizing your production uptime.
      </p>

      <div className="space-y-8">
        <div className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2" style={{ color: PRIMARY_BLUE }}>
            <Mail className="w-5 h-5" /> Technical Queries
          </h2>
          <p className="text-gray-600">
            For system outages, bug reports, or integration issues, contact our dedicated engineering team.
          </p>
          <a href="mailto:support@shotweave.com" className="text-lg font-medium mt-2 block" style={{ color: PRIMARY_BLUE }}>support@shotweave.com</a>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2" style={{ color: PRIMARY_BLUE }}>
            <Phone className="w-5 h-5" /> Emergency Hotline
          </h2>
          <p className="text-gray-600">
            For critical, real-time production emergencies (e.g., location server failure). Requires a Pro-Tier subscription.
          </p>
          <p className="text-lg font-medium mt-2 block">+1 (800) 123-4567</p>
        </div>

        <div className="p-6 border border-gray-200 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-3 flex items-center gap-2" style={{ color: PRIMARY_BLUE }}>
            <Clock className="w-5 h-5" /> Operating Hours
          </h2>
          <p className="text-gray-600">
            Our premium support is available 24 hours a day, 7 days a week, across all major production time zones.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Support;