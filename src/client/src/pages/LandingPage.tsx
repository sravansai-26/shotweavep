// client/src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
// IMPORT CORRECTION: Added 'type Transition' to the import
import { motion, type Variants, type Transition } from 'framer-motion'; 

// --- Animation Variants ---

const containerVariants: Variants = { // Explicitly typing container as well for best practice
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: {
      staggerChildren: 0.2, // Stagger children for sequential entry
    }
  },
};

// Explicitly define the Spring Transition object that caused the error
const springTransition: Transition = {
    type: "spring", // TypeScript is now happy because it knows this is a Framer Motion Transition type
    stiffness: 120,
    // Add a default damping value if needed to satisfy stricter types (optional, but can help)
    damping: 10,
};

// Use the explicitly typed transition object in the variants
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: springTransition, // Referenced the strongly typed object
  },
};

// Simple Cinematic Card component
const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  // Use motion.div for animation
  <motion.div 
    variants={itemVariants} 
    className="
      bg-gray-800/50
      border border-yellow-600/30
      shadow-xl shadow-black/50
      p-6 rounded-lg
      hover:bg-gray-700/60
      transition-all duration-300
      transform hover:scale-[1.02] 
      cursor-default
    "
  >
    <h3 className="text-xl font-bold text-yellow-400 mb-2 border-b border-yellow-600/50 pb-1">
      {title}
    </h3>
    <p className="text-gray-300 text-sm">
      {description}
    </p>
  </motion.div>
);


const LandingPage: React.FC = () => {
  return (
    // Main Container
    <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 bg-repeat opacity-5"
        style={{ backgroundImage: 'radial-gradient(#374151 1px, transparent 1px)' }} 
      ></div>

      {/* Use motion.header to apply animation to the entire section */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-12 z-10 w-full text-center"
      >
        <h1 
          className="text-6xl font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-yellow-400 to-red-600 
                     tracking-widest drop-shadow-lg"
        >
          SHOTWEAVE
        </h1>
        <p className="text-gray-400 text-xl italic mt-2">
          Where production and vision intertwine.
        </p>
      </motion.header>

      {/* Main Content Area - Use motion.main with container variants */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-11/12 max-w-5xl z-10"
      >
        
        {/* Login/Signup Buttons (Animated Item Group) */}
        <motion.div variants={itemVariants} className="flex justify-center gap-8 my-10">
          <Link 
            to="/login" 
            className="py-3 px-8 text-lg font-semibold uppercase tracking-wider
              bg-blue-600 hover:bg-blue-700 text-white 
              rounded-full shadow-2xl shadow-blue-500/30 
              transition duration-300 transform hover:scale-105
              hover:shadow-blue-500/70"
          >
            Access Console
          </Link>
          <Link 
            to="/signup" 
            className="py-3 px-8 text-lg font-semibold uppercase tracking-wider
              bg-red-600 hover:bg-red-700 text-white 
              rounded-full shadow-2xl shadow-red-500/30 
              transition duration-300 transform hover:scale-105
              hover:shadow-red-500/70"
          >
            Initiate Project
          </Link>
        </motion.div>

        {/* Feature Cards Section (Animated Item Group with Stagger) */}
        <section className="mt-16 mb-20">
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl font-light text-center text-gray-200 mb-10 border-b border-gray-700 pb-3"
          >
            Intelligent Production Management Core
          </motion.h2>
          
          <motion.div 
            variants={containerVariants} // Re-use the container logic for the grid items
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <FeatureCard 
              title="AI Risk Meter (CEO)"
              description="Proactive, Scikit-learn powered predictive model that quantifies financial risk, flagging budget overruns before they occur."
            />
            <FeatureCard 
              title="NLP Breakdown (LP)"
              description="Automated script ingestion using SpaCy to instantly generate character lists, locations, and optimized shooting schedules."
            />
            <FeatureCard 
              title="Localized Vendor Rating (LVR)"
              description="Data-driven procurement system. Compare local vendors based on transparent reliability scores and price competitiveness."
            />
          </motion.div>
        </section>

      </motion.main>

      {/* Footer - Animated Item */}
      <motion.footer 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-auto w-full py-4 text-center text-xs text-gray-500 
                   border-t border-gray-700/50 bg-black/30 z-10"
      >
        <p>Developed by Team <b>The Final Cut</b> | <b>Cinehack</b> Project</p>
        <p className="mt-1 text-gray-600 italic">Data Integrity Status: NOMINAL</p>
      </motion.footer>
    </div>
  );
};

export default LandingPage;