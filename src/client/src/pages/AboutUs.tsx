// src/client/src/pages/AboutUs.tsx

import React from 'react';
import { motion, type Variants } from 'framer-motion';
// Import useNavigate for back navigation
import { useNavigate } from 'react-router-dom'; 
// Updated icons
import { Briefcase, Zap, Users, Aperture, ScrollText, GitBranch, ArrowLeft } from 'lucide-react';

// Styling and Animation Constants (Must be kept consistent with LandingPage.tsx)
const PRIMARY_BLUE = "#1A73E8"; // Consistent Brand Color
const SECONDARY_DARK = "#1E293B"; // Slate-900 for dark accents

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1.0, 
      ease: [0.4, 0.0, 0.2, 1],
      staggerChildren: 0.15, // Stagger effect for children elements
    } 
  },
};

const itemStagger: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Card: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <motion.div 
    variants={itemStagger} 
    className="p-6 bg-white border border-gray-100 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 rounded-lg"
  >
    <div className="flex items-center space-x-3 mb-3">
      <div className="p-2 rounded-full bg-blue-50" style={{ color: PRIMARY_BLUE }}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </motion.div>
);


const AboutUs: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation hook
  
  // Function to handle the back action
  const goBackToLanding = () => {
    navigate('/'); // Navigate to the root (Landing Page)
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeInUp}
      className="min-h-screen bg-gray-50 font-google-body"
    >
      {/* ---------------------------------- BACK NAVIGATION SYMBOL (Modern/Animated) ---------------------------------- */}
      <motion.div variants={itemStagger} className="py-6 px-6 md:px-12 max-w-6xl mx-auto">
        <button
          onClick={goBackToLanding}
          // Button styling: larger icon, dark color, transition for animation, and subtle scale-on-hover
          className="p-3 text-gray-700 rounded-full hover:bg-gray-200 focus:outline-none transition duration-300 hover:text-gray-900 transform hover:scale-110"
          aria-label="Go back to landing page"
        >
          {/* ArrowLeft icon - slightly larger */}
          <ArrowLeft className="w-6 h-6" />
        </button>
      </motion.div>

      {/* ---------------------------------- ACT I: CINEMATIC HEADER ---------------------------------- */}
      <div className="py-24 px-6 md:px-12 bg-slate-900 text-white shadow-2xl">
        <motion.div variants={itemStagger} className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Briefcase className="w-8 h-8 text-blue-400" />
            <p className="text-sm uppercase tracking-widest font-semibold text-blue-300">
              The Production OS
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold font-google-header mb-6 leading-tight">
            We Build the Unseen Backbone of Great Cinema.
          </h1>
          <p className="text-xl md:text-2xl font-light text-blue-200 border-l-4 pl-4 border-blue-400">
            SHOTWEAVE is where predictive intelligence meets the chaos of the call sheet. Our platform turns logistical uncertainty into a creative advantage.
          </p>
        </motion.div>
      </div>

      {/* ---------------------------------- ACT II: OUR MISSION & PROBLEM ---------------------------------- */}
      <div className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.h2 
          variants={itemStagger}
          className="text-4xl font-bold mb-10 text-center" 
          style={{ color: SECONDARY_DARK }}
        >
          The Unseen Friction in Filmmaking
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card 
            icon={<ScrollText className="w-5 h-5" />} 
            title="The Origin Story"
          >
            Founded by a coalition of veteran filmmakers and top-tier data scientists, we recognized that immense creative energy was constantly hampered by logistical uncertainty and budget crises. The narrative suffered.
          </Card>
          <Card 
            icon={<Zap className="w-5 h-5" />} 
            title="Our Directive"
          >
            Our goal is simple: to make the production backbone invisible, reliable, and intelligent. We empower your team to focus purely on the narrative, not the spreadsheets.
          </Card>
          <Card 
            icon={<Users className="w-5 h-5" />} 
            title="Global Collaboration"
          >
            We are a globally distributed team, operating 24/7. Our specialists include former Line Producers, VFX Supervisors, and specialized AI/ML engineers—we speak the language of the set.
          </Card>
        </div>
      </div>

      {/* ---------------------------------- ACT III: CORE PHILOSOPHY (Thematic Block) ---------------------------------- */}
      <div className="bg-white border-t border-b py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemStagger} className="text-center mb-12">
            <Aperture className="w-12 h-12 mx-auto mb-4" style={{ color: PRIMARY_BLUE }} />
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              The SHOTWEAVE Philosophy: Precision Under Pressure
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We replace guesswork with **predictive certainty**. Every feature is rigorously tested in a real-world production environment to ensure calm under the most demanding pressures of a major shoot.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <motion.div variants={itemStagger} className="p-8 border-l-4 border-blue-500 bg-blue-50/50 rounded-lg">
              <h3 className="text-2xl font-bold mb-3 text-blue-800">For the Producer/CEO</h3>
              <p className="text-lg text-gray-700">
                **Risk mitigation becomes automatic.** We provide real-time budget forecasting and resource allocation models that flag potential overruns weeks in advance, ensuring fiduciary responsibility aligns with creative ambition.
              </p>
            </motion.div>
            <motion.div variants={itemStagger} className="p-8 border-l-4 border-blue-500 bg-blue-50/50 rounded-lg">
              <h3 className="text-2xl font-bold mb-3 text-blue-800">For the Line Producer/1st AD</h3>
              <p className="text-lg text-gray-700">
                **The call sheet is a living, breathing blueprint.** Optimize logistics, manage cross-departmental dependencies, and handle last-minute pivots with an OS built for dynamic change, not static planning.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------------------------------- ACT IV: CALL TO ACTION / NEXT STEPS ---------------------------------- */}
      <div className="py-16 px-6 md:px-12 max-w-6xl mx-auto text-center">
        <motion.div variants={itemStagger}>
          <GitBranch className="w-10 h-10 mx-auto mb-4 text-gray-700" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Join the Movement Shaping the Future of Production.
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our technology is already being deployed on high-stakes feature films and episodic series worldwide. Experience the calm of true operational clarity.
          </p>
        </motion.div>
      </div>
      
    </motion.div>
  );
};

export default AboutUs;