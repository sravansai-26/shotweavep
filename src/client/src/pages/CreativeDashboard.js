import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Kanban, CheckCircle, Clock, XCircle, Zap } from 'lucide-react';
// Mock Data for the Kanban Board (NLP tagged assets)
// FIX 1: Explicitly typed the array as Shot[] to resolve TS2322 type mismatch errors.
const initialVFXShots = [
    { id: 1, name: 'Shot 4A: Starship Landing', status: 'TODO', complexity: 'High' },
    { id: 2, name: 'Shot 12C: CGI Crowds', status: 'IN_PROGRESS', complexity: 'Medium' },
    { id: 3, name: 'Shot 33B: Green Screen BG Replace', status: 'READY_FOR_REVIEW', complexity: 'Low' },
    { id: 4, name: 'Shot 55D: Final Explosion FX', status: 'COMPLETE', complexity: 'High' },
];
// Kanban Column Component
const KanbanColumn = ({ title, shots, icon, bgColor }) => {
    return (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("h3", { className: `text-xl font-bold text-white p-3 rounded-t-lg flex items-center ${bgColor}`, children: [icon, _jsxs("span", { className: "ml-2", children: [title, " (", shots.length, ")"] })] }), _jsxs("div", { className: "flex-1 space-y-4 p-3 overflow-y-auto bg-gray-800/70 rounded-b-lg", children: [shots.map(shot => (_jsxs(motion.div, { initial: { scale: 0.95 }, animate: { scale: 1 }, className: "bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600/50 hover:border-blue-500 transition duration-150 cursor-pointer", children: [_jsx("p", { className: "font-semibold text-gray-100", children: shot.name }), _jsxs("p", { className: `text-xs mt-1 inline-block py-0.5 px-2 rounded-full font-medium ${shot.complexity === 'High' ? 'bg-red-900 text-red-300' : shot.complexity === 'Medium' ? 'bg-yellow-900 text-yellow-300' : 'bg-green-900 text-green-300'}`, children: [shot.complexity, " Complexity"] })] }, shot.id))), shots.length === 0 && (_jsx("p", { className: "text-gray-500 text-center py-4 italic", children: "No assets in this stage." }))] })] }));
};
const CreativeDashboard = ({ user, onLogout }) => {
    // FIX 2: Removed unused setter 'setShots' to resolve TS6133
    const [shots] = useState(initialVFXShots);
    // Group shots by status
    const shotsByStatus = (status) => shots.filter(shot => shot.status === status);
    return (_jsxs("div", { className: "min-h-screen bg-gray-900 text-white p-8", children: [_jsxs(motion.header, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "flex justify-between items-center pb-6 border-b border-gray-700", children: [_jsxs("h1", { className: "text-4xl font-bold text-blue-400 tracking-wider flex items-center", children: [_jsx(Kanban, { size: 32, className: "mr-3" }), " VFX Asset Tracker"] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { className: "text-gray-400", children: ["Welcome, ", user.name, " (", user.role, ")"] }), _jsx("button", { onClick: onLogout, className: "py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200", children: "Logout" })] })] }), _jsxs("main", { className: "mt-8", children: [_jsxs("h2", { className: "text-2xl font-light text-gray-300 mb-6", children: ["Project: ", _jsx("span", { className: "font-semibold text-blue-300", children: "\"Operation Mangalam\"" })] }), _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2, duration: 0.5 }, className: "grid grid-cols-4 gap-4 h-[75vh]", children: [_jsx(KanbanColumn, { title: "NLP Tagged Shots (To Do)", shots: shotsByStatus('TODO'), icon: _jsx(XCircle, { size: 20 }), bgColor: "bg-gray-700" }), _jsx(KanbanColumn, { title: "Work In Progress", shots: shotsByStatus('IN_PROGRESS'), icon: _jsx(Clock, { size: 20 }), bgColor: "bg-yellow-700" }), _jsx(KanbanColumn, { title: "Ready for Review (Director)", shots: shotsByStatus('READY_FOR_REVIEW'), icon: _jsx(Zap, { size: 20 }), bgColor: "bg-blue-700" }), _jsx(KanbanColumn, { title: "Final Approved", shots: shotsByStatus('COMPLETE'), icon: _jsx(CheckCircle, { size: 20 }), bgColor: "bg-green-700" })] })] })] }));
};
export default CreativeDashboard;
