import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
const ExecutorDashboard = ({ user, onLogout }) => {
    const [report, setReport] = useState({
        scenes_shot: 0,
        daily_spend: 0,
        delay_minutes: 0,
        notes: '',
    });
    const [message, setMessage] = useState('');
    const handleDPRSubmit = (e) => {
        e.preventDefault();
        setMessage('Submitting DPR and Expense Log...');
        // --- Mock API Call ---
        setTimeout(() => {
            // In a real implementation, this POSTs to /api/dpr/submit
            const status = report.scenes_shot > 0 ? 'SUCCESS' : 'WARNING';
            setMessage(`[${status}] DPR for Day 5 submitted! Scenes: ${report.scenes_shot}. Data is now feeding the AI Risk Meter.`);
            setReport({ scenes_shot: 0, daily_spend: 0, delay_minutes: 0, notes: '' });
        }, 1500);
    };
    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };
    const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500";
    return (_jsxs("div", { className: "min-h-screen bg-gray-900 text-white p-8", children: [_jsxs(motion.header, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "flex justify-between items-center pb-6 border-b border-gray-700", children: [_jsx("h1", { className: "text-4xl font-bold text-yellow-500 tracking-wider", children: "Daily Operations Hub" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { className: "text-gray-400", children: ["Welcome, ", user.name, " (", user.role, ")"] }), _jsx("button", { onClick: onLogout, className: "py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200", children: "Logout" })] })] }), _jsxs("main", { className: "mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsxs(motion.div, { variants: cardVariants, initial: "hidden", animate: "visible", transition: { delay: 0.1 }, className: "lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-yellow-600/30", children: [_jsx("h2", { className: "text-2xl font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2", children: "Log Daily Progress & Expenses" }), _jsxs("form", { onSubmit: handleDPRSubmit, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-gray-400 mb-1", children: "Scenes Shot Today (Actual)" }), _jsx("input", { type: "number", value: report.scenes_shot, onChange: e => setReport({ ...report, scenes_shot: parseInt(e.target.value) || 0 }), className: inputStyle, placeholder: "e.g., 6", required: true })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-gray-400 mb-1", children: "Total Daily Spend (\u20B9)" }), _jsx("input", { type: "number", value: report.daily_spend, onChange: e => setReport({ ...report, daily_spend: parseFloat(e.target.value) || 0 }), className: inputStyle, placeholder: "e.g., 150000.00", required: true })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-gray-400 mb-1", children: "Schedule Delay (Minutes)" }), _jsx("input", { type: "number", value: report.delay_minutes, onChange: e => setReport({ ...report, delay_minutes: parseInt(e.target.value) || 0 }), className: inputStyle, placeholder: "e.g., 90 (Delay)" })] }), _jsxs("div", { className: "flex flex-col", children: [_jsx("label", { className: "text-gray-400 mb-1", children: "Daily Notes/Causality Tag" }), _jsx("input", { type: "text", value: report.notes, onChange: e => setReport({ ...report, notes: e.target.value }), className: inputStyle, placeholder: "e.g., 'Star late' or 'Weather hold'" })] }), _jsx("button", { type: "submit", className: "md:col-span-2 py-3 bg-yellow-600 hover:bg-yellow-700 font-bold uppercase rounded-md transition duration-200 shadow-md mt-4", children: "Submit DPR (Feeds AI Risk Meter)" })] }), _jsx("p", { className: "mt-4 text-center text-sm", style: { color: message.includes('SUCCESS') ? '#2ecc71' : message.includes('WARNING') ? '#f39c12' : 'gray' }, children: message })] }), _jsxs(motion.div, { variants: cardVariants, initial: "hidden", animate: "visible", transition: { delay: 0.3 }, className: "bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700", children: [_jsx("h2", { className: "text-2xl font-semibold mb-6 text-blue-400 border-b border-gray-700 pb-2", children: "Project Status Overview" }), _jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-gray-400", children: "Current Shoot Day:" }), _jsx("p", { className: "text-3xl font-bold text-white", children: "Day 5 of 30" }), _jsx("hr", { className: "border-gray-700" }), _jsx("p", { className: "text-sm text-gray-400", children: "Total Scenes Remaining:" }), _jsx("p", { className: "text-3xl font-bold text-red-500", children: "84 Scenes" }), _jsx("hr", { className: "border-gray-700" }), _jsx("p", { className: "text-sm text-gray-400", children: "Next Scheduled Scene:" }), _jsx("p", { className: "text-xl font-mono text-green-400", children: "Scene 24A: Hospital - Day" })] })] })] })] }));
};
export default ExecutorDashboard;
