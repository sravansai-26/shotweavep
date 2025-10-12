import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
// IMPORT CORRECTION: Added 'type Transition' to the import
import { motion } from 'framer-motion';
// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Stagger children for sequential entry
        }
    },
};
// Explicitly define the Spring Transition object that caused the error
const springTransition = {
    type: "spring", // TypeScript is now happy because it knows this is a Framer Motion Transition type
    stiffness: 120,
    // Add a default damping value if needed to satisfy stricter types (optional, but can help)
    damping: 10,
};
// Use the explicitly typed transition object in the variants
const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: springTransition, // Referenced the strongly typed object
    },
};
// Simple Cinematic Card component
const FeatureCard = ({ title, description }) => (
// Use motion.div for animation
_jsxs(motion.div, { variants: itemVariants, className: "\r\n            bg-gray-800/50\r\n            border border-yellow-600/30\r\n            shadow-xl shadow-black/50\r\n            p-6 rounded-lg\r\n            hover:bg-gray-700/60\r\n            transition-all duration-300\r\n            transform hover:scale-[1.02] \r\n            cursor-default\r\n        ", children: [_jsx("h3", { className: "text-xl font-bold text-yellow-400 mb-2 border-b border-yellow-600/50 pb-1", children: title }), _jsx("p", { className: "text-gray-300 text-sm", children: description })] }));
const LandingPage = () => {
    return (
    // Main Container
    _jsxs("div", { className: "bg-gray-900 min-h-screen text-white flex flex-col items-center", children: [_jsx("div", { className: "absolute inset-0 bg-repeat opacity-5", style: { backgroundImage: 'radial-gradient(#374151 1px, transparent 1px)' } }), _jsxs(motion.header, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8 }, className: "py-12 z-10 w-full text-center", children: [_jsx("h1", { className: "text-6xl font-extrabold text-transparent bg-clip-text \r\n                                 bg-gradient-to-r from-yellow-400 to-red-600 \r\n                                 tracking-widest drop-shadow-lg", children: "SHOTWEAVE" }), _jsx("p", { className: "text-gray-400 text-xl italic mt-2", children: "Where production and vision intertwine." })] }), _jsxs(motion.main, { variants: containerVariants, initial: "hidden", animate: "visible", className: "w-11/12 max-w-5xl z-10", children: [_jsxs(motion.div, { variants: itemVariants, className: "flex justify-center gap-8 my-10", children: [_jsx(Link, { to: "/login", className: "py-3 px-8 text-lg font-semibold uppercase tracking-wider\r\n                            bg-blue-600 hover:bg-blue-700 text-white \r\n                            rounded-full shadow-2xl shadow-blue-500/30 \r\n                            transition duration-300 transform hover:scale-105\r\n                            hover:shadow-blue-500/70", children: "Access Console" }), _jsx(Link, { to: "/signup", className: "py-3 px-8 text-lg font-semibold uppercase tracking-wider\r\n                            bg-red-600 hover:bg-red-700 text-white \r\n                            rounded-full shadow-2xl shadow-red-500/30 \r\n                            transition duration-300 transform hover:scale-105\r\n                            hover:shadow-red-500/70", children: "Initiate Project" })] }), _jsxs("section", { className: "mt-16 mb-20", children: [_jsx(motion.h2, { variants: itemVariants, className: "text-3xl font-light text-center text-gray-200 mb-10 border-b border-gray-700 pb-3", children: "Intelligent Production Management Core" }), _jsxs(motion.div, { variants: containerVariants, initial: "hidden", animate: "visible", className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsx(FeatureCard, { title: "AI Risk Meter (CEO)", description: "Proactive, Scikit-learn powered predictive model that quantifies financial risk, flagging budget overruns before they occur." }), _jsx(FeatureCard, { title: "NLP Breakdown (LP)", description: "Automated script ingestion using SpaCy to instantly generate character lists, locations, and optimized shooting schedules." }), _jsx(FeatureCard, { title: "Localized Vendor Rating (LVR)", description: "Data-driven procurement system. Compare local vendors based on transparent reliability scores and price competitiveness." })] })] })] }), _jsxs(motion.footer, { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { duration: 0.8, delay: 0.8 }, className: "mt-auto w-full py-4 text-center text-xs text-gray-500 \r\n                            border-t border-gray-700/50 bg-black/30 z-10", children: [_jsxs("p", { children: ["Developed by Team ", _jsx("b", { children: "The Final Cut" }), " | ", _jsx("b", { children: "Cinehack" }), " Project"] }), _jsx("p", { className: "mt-1 text-gray-600 italic", children: "Data Integrity Status: NOMINAL" })] })] }));
};
export default LandingPage;
