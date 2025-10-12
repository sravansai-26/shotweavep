import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// FIX: Added 'type Variants' and 'type Transition' to correctly type the animation object
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// FIX: Define the transition object explicitly to resolve TypeScript error
const springTransition = {
    type: "spring",
    stiffness: 80,
    damping: 10, // Added damping for smoother spring animation
};
const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    // Reference the explicitly typed transition object
    visible: { y: 0, opacity: 1, transition: springTransition },
};
const Profile = ({ user, onLogout }) => {
    // Helper function to map role to a color for visual appeal
    const getRoleColor = (role) => {
        switch (role) {
            case 'Producer/CEO':
                return 'text-red-400';
            case 'Line Producer':
                return 'text-yellow-400';
            case '1st AD/Unit Manager':
                return 'text-green-400';
            case 'VFX Supervisor/Director':
                return 'text-blue-400';
            default:
                return 'text-gray-400';
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gray-900 text-white flex flex-col items-center p-6", children: [_jsxs("header", { className: "py-8 w-full max-w-2xl flex justify-between items-center border-b border-gray-700 mb-8 z-10", children: [_jsx("h1", { className: "text-3xl font-bold text-yellow-400", children: "Access Credentials (Shotweave)" }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Link, { to: "/dashboard", className: "py-1 px-3 bg-gray-700/50 hover:bg-gray-700 rounded transition text-blue-400", children: "Go to Dashboard" }), _jsx("button", { onClick: onLogout, className: "py-1 px-3 bg-red-600 hover:bg-red-700 text-white rounded transition", children: "Logout" })] })] }), _jsxs(motion.div, { variants: cardVariants, initial: "hidden", animate: "visible", className: "\r\n          w-full max-w-2xl bg-gray-800/80 p-8 rounded-xl shadow-2xl \r\n          border border-yellow-600/50 backdrop-blur-sm\r\n        ", children: [_jsxs("h3", { className: "text-2xl font-semibold mb-6 border-b border-gray-700 pb-2", children: [user.name, " - ", _jsx("span", { className: `text-sm italic ${getRoleColor(user.role)}`, children: user.role })] }), _jsxs("div", { className: "space-y-4 text-lg", children: [_jsxs("p", { children: [_jsx("span", { className: "font-medium text-gray-400 w-48 inline-block", children: "System Username:" }), _jsx("span", { className: "font-mono text-white ml-2", children: user.username })] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium text-gray-400 w-48 inline-block", children: "Contact Email:" }), _jsx("span", { className: "text-gray-300 ml-2", children: user.email })] }), _jsxs("p", { children: [_jsx("span", { className: "font-medium text-gray-400 w-48 inline-block", children: "Primary Role / Access Level:" }), _jsx("span", { className: `font-semibold ml-2 ${getRoleColor(user.role)}`, children: user.role })] }), _jsx("p", { className: "pt-2 text-sm text-gray-500", children: "*Your password is encrypted and cannot be viewed here." })] })] })] }));
};
export default Profile;
