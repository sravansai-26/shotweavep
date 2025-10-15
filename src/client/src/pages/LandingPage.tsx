import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants, type Transition } from "framer-motion";
import {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Copyright,
  Aperture,
  Briefcase,
  ArrowRight,
  Eye, // Retained for now, though not used in the main body
} from "lucide-react";

/**
 * SHOTWEAVE Landing Page - Final Polished UI with Access Gating
 */

// --- CONFIGURATION ---
const PRIMARY_BLUE = "#1A73E8";
const ACCENT_AMBER = "#FFBB00";

/* ----------------------------- Animation setup ---------------------------- */

const primaryTransition: Transition = { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] };

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: primaryTransition },
};

const whileHoverScale = { scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 25 } };

const MotionLink = motion(Link);

/* ------------------------------- Utilities -------------------------------- */
const ExternalLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...props }) => (
  <a {...props}>{children}</a>
);

// --- POLISHED LOGO COMPONENT ---
const PolishedLogo: React.FC = () => (
    <div className="flex items-center gap-2">
        <motion.div 
            className="w-8 h-8 flex items-center justify-center rounded-md"
            style={{ 
                color: PRIMARY_BLUE,
                boxShadow: `0 0 10px ${PRIMARY_BLUE}70`,
                textShadow: `0 0 5px ${PRIMARY_BLUE}50`,
            }}
            whileHover={{ scale: 1.1, rotate: 15 }}
        >
            <Aperture className="w-8 h-8" />
        </motion.div>
        
        <span 
            className="text-4xl font-extrabold tracking-tight font-google-header no-underline" 
            style={{ 
                color: PRIMARY_BLUE,
                textShadow: `0 1px 1px rgba(0, 0, 0, 0.1)` 
            }}
        >
            SHOTWEAVE
        </span>
    </div>
);

// --- ATTRACTIVE FOOTER LINK COMPONENT (Framed/Glass Effect) ---
const FramedFooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <motion.div
        className="block rounded-lg transition-all duration-300"
        whileHover={{ 
            x: 4, 
            boxShadow: `0 4px 15px ${PRIMARY_BLUE}10`,
            backgroundColor: 'rgba(230, 230, 250, 0.5)',
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
        <Link 
            to={to} 
            className="block text-gray-700 hover:text-gray-900 transition-colors p-2 -mx-2"
        >
            {children}
        </Link>
    </motion.div>
);

// --- ACCESS GATE MODAL COMPONENT ---
const AccessGateModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl border border-gray-100"
            >
                <h3 className="text-2xl font-bold font-google-header mb-4 text-gray-900">Access Restricted</h3>
                <p className="text-gray-600 mb-6 font-google-body">
                    To explore this module, please sign up or sign in. Access permissions are assigned based on your project role (e.g., Producer, DP, Line Producer).
                </p>
                <div className="flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <MotionLink to="/login" className="px-4 py-2 text-sm font-medium rounded-full text-white" style={{ backgroundColor: PRIMARY_BLUE }}>
                        Sign In
                    </MotionLink>
                    <MotionLink to="/signup" className="px-4 py-2 text-sm font-medium rounded-full text-white" style={{ backgroundColor: ACCENT_AMBER }}>
                        Sign Up
                    </MotionLink>
                </div>
            </motion.div>
        </motion.div>
    );
};


/* ---------------------------- Feature Component --------------------------- */
const FeatureCard: React.FC<{
  title: string;
  description: string;
  imgUrl: string; // Kept for type consistency
  accent?: string;
  icon?: React.ReactNode;
  onExplore: () => void; // Function to open modal
}> = ({ title, description, accent = PRIMARY_BLUE, icon, onExplore }) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { ...primaryTransition, duration: 0.5 } },
  };

  return (
    <motion.article
      variants={cardVariants}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 flex flex-col min-h-[250px] transition-shadow duration-300"
      whileHover={{ scale: 1.01, boxShadow: `0 12px 30px -8px ${accent}30` }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      role="group"
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accent}15`, color: accent }}
        >
          {icon ?? <Briefcase className="w-5 h-5" />}
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-gray-800 font-google-header">
          {title}
        </h3>
      </div>

      <p className="text-gray-600 text-base leading-relaxed flex-grow mb-4 font-google-body">{description}</p>

      <div className="pt-2">
        <motion.button
            onClick={onExplore}
            className="text-sm font-medium flex items-center gap-1 transition-colors hover:underline"
            style={{ color: accent }}
            aria-label={`Explore ${title} module`}
        >
          Explore Module <ArrowRight className="w-4 h-4 ml-1" />
        </motion.button>
      </div>
    </motion.article>
  );
};

/* ------------------------------- Landing Page ----------------------------- */
const LandingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dummyImg = "https://example.com/dummy.jpg";

  return (
    <div className="min-h-screen w-full bg-[#F7F7F7] text-gray-900 flex flex-col items-center relative" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23a9a9a9\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")', backgroundAttachment: 'fixed' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
        
        .font-google-header { font-family: 'Poppins', sans-serif; }
        .font-google-body { font-family: 'Roboto', sans-serif; }
      `}</style>

      {/* Access Gate Modal */}
      <AccessGateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* --- NAVIGATION BAR --- */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
        className="sticky top-0 z-40 w-full bg-white shadow-lg border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-3 flex justify-start items-center">
          <Link to="/" className="flex items-center">
            <PolishedLogo />
          </Link>
        </div>
      </motion.nav>

      {/* --- CENTRAL CTA / MISSION OVERVIEW --- */}
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        className="relative z-20 w-full max-w-7xl px-6 md:px-12 pt-16 md:pt-24 pb-20 text-center"
      >
        <motion.p variants={fadeInUp} className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: PRIMARY_BLUE }}>
            INTELLIGENT PRODUCTION SUITE
        </motion.p>
        
        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 font-google-header max-w-4xl mx-auto">
            Orchestrate The Vision with <span style={{ color: PRIMARY_BLUE }}>Predictive Clarity.</span>
        </motion.h1>

        <motion.p variants={fadeInUp} transition={{ delay: 0.3, ...primaryTransition }} className="text-gray-600 max-w-3xl mx-auto text-xl mt-6 mb-10 font-google-body">
          We blend predictive AI with intuitive controls, transforming complex film logistics into calm, creative precision.
        </motion.p>

        <motion.div variants={fadeInUp} transition={{ delay: 0.5, ...primaryTransition }} className="flex justify-center gap-4 pt-4 font-google-body">
          <MotionLink
            whileHover={whileHoverScale}
            to="/signup"
            className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-200 text-white shadow-xl text-lg"
            style={{ backgroundColor: PRIMARY_BLUE }}
            aria-label="Start Free Trial"
          >
            Start for Free
          </MotionLink>

          <MotionLink
            whileHover={whileHoverScale}
            to="/login"
            className="inline-flex items-center px-8 py-3 rounded-full font-medium transition-all duration-200 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 text-lg"
            aria-label="Sign In to Console"
          >
            Sign In
          </MotionLink>
        </motion.div>
      </motion.div>

      {/* --- FEATURES SECTION: Neat Card Grid --- */}
      <section id="features" className="relative z-20 w-full max-w-7xl px-6 md:px-12 py-20 bg-white border-t border-b border-gray-100 font-google-body shadow-2xl">
        <header className="mb-16 max-w-3xl mx-auto text-center">
          <motion.p variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: PRIMARY_BLUE }}>
            CORE MODULES
          </motion.p>
          <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl font-extrabold text-gray-900 font-google-header">
            Seamlessly Integrated Production Core
          </motion.h2>
        </header>

        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="AI Risk Meter"
            description="Proactive predictive signals for budget & schedule — surfacing anomalies before they become crises."
            imgUrl={dummyImg}
            accent={PRIMARY_BLUE}
            icon={<Briefcase className="w-5 h-5" />}
            onExplore={() => setIsModalOpen(true)}
          />
          <FeatureCard
            title="NLP Breakdown"
            description="Script-driven breakdowns for cast, props, and optimized shooting windows using advanced NLP pipelines."
            imgUrl={dummyImg}
            accent={ACCENT_AMBER}
            icon={<Aperture className="w-5 h-5" />}
            onExplore={() => setIsModalOpen(true)}
          />
          <FeatureCard
            title="Global Procurement"
            description="Compare and procure resources across geographies with transparent vendor scoring & scheduling."
            imgUrl={dummyImg}
            accent={PRIMARY_BLUE}
            icon={<Briefcase className="w-5 h-5" />}
            onExplore={() => setIsModalOpen(true)}
          />
        </motion.div>
      </section>

      {/* --- FOOTER: Clean and Structured --- */}
      <footer className="w-full bg-[#F7F7F7] font-google-body shadow-inner pt-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-gray-200">
          {/* Adjusted grid to 4 columns since the Vision CTA is gone */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8"> 
            
            {/* Branding/Mission (Col 1) */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <Link to="/" className="flex items-center">
                <PolishedLogo />
              </Link>
              <p className="text-gray-500 text-sm max-w-xs pt-2">
                The ultimate professional OS for calm, precise, and profitable creative production worldwide.
              </p>
            </div>

            {/* Links Columns (Col 2, 3, 4 - Legal, Company, Contact) */}
            <div>
              <h4 className="text-sm font-medium mb-4 text-gray-800">Company</h4>
              <nav className="space-y-1 text-sm">
                <FramedFooterLink to="/about">About Us</FramedFooterLink>
                <FramedFooterLink to="/blog">Blog & News</FramedFooterLink>
              </nav>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-4 text-gray-800">Legal</h4>
              <nav className="space-y-1 text-sm">
                <FramedFooterLink to="/privacy">Privacy Policy</FramedFooterLink>
                <FramedFooterLink to="/terms">Terms of Service</FramedFooterLink>
              </nav>
            </div>
            
            {/* Contact & Socials */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium mb-4 text-gray-800">Contact</h4>
              <ExternalLink href="mailto:lyfspot@zohomail.in" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors">
                <Mail className="w-4 h-4" /> lyfspot@zohomail.in
              </ExternalLink>
              
              <div className="flex gap-4 pt-2">
                <ExternalLink href="https://twitter.com/lyfspot02" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition">
                  <Twitter className="w-5 h-5" />
                </ExternalLink>
                <ExternalLink href="https://instagram.com/lyfspot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition">
                  <Instagram className="w-5 h-5" />
                </ExternalLink>
                <ExternalLink href="https://www.linkedin.com/in/sravan-sai-vuppula-753b711ba" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition">
                  <Linkedin className="w-5 h-5" />
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Privacy and Copyright */}
        <div className="border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4">
                {/* Copyright info */}
              <div className="flex items-center gap-1">
                <Copyright className="w-3 h-3" /> <span>2025 SHOTWEAVE. All rights reserved.</span>
              </div>
                {/* Custom Footer Text */}
                <span className="text-center md:text-left mt-1 md:mt-0">
                    Designed and Developed for the love of cinema by Team <span className="font-bold">LYFSpot</span>.
                </span>
            </div>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link to="/support" className="hover:text-gray-700">Support</Link>
              <Link to="/support" className="hover:text-gray-700">System Status: <span className="text-green-600">Online</span></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;