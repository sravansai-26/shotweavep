import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin, Users, Zap, DollarSign, Film, Calendar } from 'lucide-react';
const QuoteRequestModal = ({ vendor, onClose, onSend, breakdown }) => {
    const [formData, setFormData] = useState({
        days: breakdown?.estimated_shoot_days || 7,
        scale: 'Regional (Mollywood)',
        requirements: breakdown?.visual_elements?.join(', ') || 'Standard 4K Camera Package',
    });
    const [sending, setSending] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate sending the email/API request
        setTimeout(() => {
            onSend({ ...formData, vendorName: vendor.name });
            setSending(false);
            onClose();
        }, 1500);
    };
    const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full transition duration-200";
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4", children: _jsxs(motion.div, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-blue-700/50", children: [_jsxs("h3", { className: "text-2xl font-bold text-blue-400 mb-2 flex items-center", children: [_jsx(Mail, { size: 24, className: "mr-2" }), " Request Quote: ", vendor.name] }), _jsxs("p", { className: "text-gray-400 mb-6 border-b border-gray-700 pb-3", children: ["Submit project details to receive an estimate from this ", vendor.type, " unit."] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { htmlFor: "days-input", className: "text-gray-300 font-medium flex items-center mb-1", children: [_jsx(Clock, { size: 16, className: "mr-2 text-yellow-500" }), " Estimated No. of Days:"] }), _jsx("input", { id: "days-input" // Added ID for accessibility
                                    , type: "number", min: "1", value: formData.days, onChange: e => setFormData({ ...formData, days: parseInt(e.target.value) || 1 }), className: inputStyle, required: true })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "scale-select", className: "text-gray-300 font-medium flex items-center mb-1", children: [_jsx(MapPin, { size: 16, className: "mr-2 text-yellow-500" }), " Scale of Cinema:"] }), _jsxs("select", { id: "scale-select" // Added ID for accessibility
                                    , value: formData.scale, onChange: e => setFormData({ ...formData, scale: e.target.value }), className: inputStyle, required: true, children: [_jsx("option", { value: "Regional (Mollywood)", children: "Regional (Mollywood)" }), _jsx("option", { value: "National (Bollywood)", children: "National (Bollywood)" }), _jsx("option", { value: "Independent/Short", children: "Independent/Short Film" })] })] }), _jsxs("div", { children: [_jsxs("label", { htmlFor: "requirements-input", className: "text-gray-300 font-medium flex items-center mb-1", children: [_jsx(Users, { size: 16, className: "mr-2 text-yellow-500" }), " Specific Requirements:"] }), _jsx("textarea", { id: "requirements-input" // Added ID for accessibility
                                    , value: formData.requirements, onChange: e => setFormData({ ...formData, requirements: e.target.value }), className: `${inputStyle} h-20`, placeholder: "e.g., Seeking Arri Mini LF, two gimbals, and 3 gaffers.", required: true })] }), _jsxs("div", { className: "flex justify-between pt-4 space-x-4", children: [_jsx("button", { type: "button", onClick: onClose, className: "py-3 px-6 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition duration-200 flex-1", children: "Cancel" }), _jsx("button", { type: "submit", disabled: sending, className: "py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold flex-1 transition duration-200 disabled:opacity-50 flex items-center justify-center", children: sending ? (_jsxs(_Fragment, { children: [_jsx(Zap, { size: 20, className: "mr-2 animate-pulse" }), "Sending Request..."] })) : ("Submit Quote Request") })] })] })] }) }));
};
// --- END NEW COMPONENT ---
const LineProducerDashboard = ({ user, onLogout }) => {
    const [scriptFile, setScriptFile] = useState(null);
    const [breakdown, setBreakdown] = useState(null);
    const [vendors, setVendors] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
    const [selectedVendor, setSelectedVendor] = useState(null); // State for vendor clicked
    // 1. Script Breakdown Logic
    const handleScriptUpload = async () => {
        if (!scriptFile)
            return setMessage('Please upload a script file to analyze.');
        setMessage('Uploading and analyzing script using advanced NLP...');
        try {
            const formData = new FormData();
            formData.append('script_file', scriptFile);
            const response = await fetch('/api/lp/breakdown', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setBreakdown(data.breakdown);
                setMessage('Script analysis complete! Dynamic breakdown and schedule generated.');
            }
            else {
                setMessage('Analysis failed: ' + data.message);
            }
        }
        catch (error) {
            setMessage('Network error during script analysis.');
        }
    };
    // 2. LVR Data Retrieval
    const loadLVRData = async () => {
        setMessage('Loading Localized Vendor Ratings...');
        try {
            const response = await fetch('/api/lp/lvr');
            const data = await response.json();
            if (data.success) {
                setVendors(data.vendors.sort((a, b) => b.lvr_score - a.lvr_score)); // Sort by score
                setMessage('LVR Data loaded successfully! Highest LVR scores prioritized.');
            }
            else {
                setMessage('Failed to load LVR data.');
            }
        }
        catch (error) {
            setMessage('Network error during LVR data retrieval.');
        }
    };
    // 3. Modal Control
    const handleRequestQuote = (vendor) => {
        setSelectedVendor(vendor);
        setIsModalOpen(true);
    };
    const handleQuoteSent = (quoteData) => {
        setMessage(`SUCCESS: Quote request sent to ${quoteData.vendorName} for a ${quoteData.scale} project of ${quoteData.days} days.`);
        setSelectedVendor(null);
    };
    // --- Start of JSX for Dashboard UI ---
    const inputStyle = "p-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 w-full transition duration-200";
    return (_jsxs("div", { className: "min-h-screen bg-gray-900 text-white p-8", children: [isModalOpen && selectedVendor && (_jsx(QuoteRequestModal, { vendor: selectedVendor, onClose: () => setIsModalOpen(false), onSend: handleQuoteSent, breakdown: breakdown })), _jsxs(motion.header, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "flex justify-between items-center pb-6 border-b border-gray-700", children: [_jsx("h1", { className: "text-4xl font-bold text-yellow-500 tracking-wider", children: "Line Producer Console" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("span", { className: "text-gray-400", children: ["Welcome, ", user.name, " (", user.role, ")"] }), _jsx("button", { onClick: onLogout, className: "py-2 px-4 bg-red-600 hover:bg-red-700 rounded transition duration-200", children: "Logout" })] })] }), _jsx("p", { className: "mt-4 p-3 bg-gray-800 rounded text-center", style: { color: message.includes('SUCCESS') ? '#2ecc71' : message.includes('failed') ? '#e74c3c' : '#f39c12' }, children: message }), _jsxs("main", { className: "mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs(motion.div, { initial: { x: -20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: 0.1 }, className: "bg-gray-800 p-6 rounded-xl shadow-lg border border-yellow-600/30", children: [_jsxs("h2", { className: "text-2xl font-semibold mb-6 text-yellow-400 border-b border-gray-700 pb-2 flex items-center", children: [_jsx(Zap, { size: 20, className: "mr-2" }), " NLP Script Analysis & Breakdown"] }), _jsxs("div", { className: "mb-4", children: [_jsxs("label", { htmlFor: "script-file", className: "text-gray-300 font-medium flex items-center mb-1", children: [_jsx(Film, { size: 16, className: "mr-2 text-yellow-500" }), " Upload Script (PDF/DOC/DOCX):"] }), _jsx("input", { id: "script-file" // Added ID for accessibility
                                        , type: "file", accept: ".pdf,.doc,.docx", onChange: (e) => setScriptFile(e.target.files ? e.target.files[0] : null), className: inputStyle })] }), _jsx("button", { onClick: handleScriptUpload, className: "py-2 px-4 bg-yellow-600 hover:bg-yellow-700 font-bold rounded-md transition duration-200", children: "Analyze Script & Generate Schedule" }), breakdown && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "mt-6 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center", children: [_jsx(Calendar, { size: 20, className: "mr-3 text-green-400" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Estimated Shoot Days" }), _jsx("p", { className: "font-bold text-lg", children: breakdown.estimated_shoot_days })] })] }), _jsxs("div", { className: "p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center", children: [_jsx(Film, { size: 20, className: "mr-3 text-red-400" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Total Scenes" }), _jsx("p", { className: "font-bold text-lg", children: breakdown.scene_count })] })] }), _jsxs("div", { className: "p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center", children: [_jsx(MapPin, { size: 20, className: "mr-3 text-blue-400" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Locations Identified" }), _jsx("p", { className: "font-bold text-lg", children: breakdown.location_count })] })] }), _jsxs("div", { className: "p-4 bg-gray-700/50 rounded-lg border-l-4 border-yellow-500 flex items-center", children: [_jsx(Users, { size: 20, className: "mr-3 text-purple-400" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-400", children: "Unique Characters" }), _jsx("p", { className: "font-bold text-lg", children: breakdown.character_count })] })] })] }), _jsxs("div", { children: [_jsxs("h4", { className: "font-bold text-lg mb-4 flex items-center", children: [_jsx(Clock, { size: 20, className: "mr-2 text-yellow-400" }), " Dynamic Scene Breakdown & Scheduling"] }), _jsx("div", { className: "space-y-3 overflow-y-auto max-h-96", children: breakdown.scenes.map((scene, index) => (_jsxs("details", { className: "bg-gray-700 rounded-lg", children: [_jsxs("summary", { className: "p-4 font-semibold cursor-pointer flex items-center justify-between", children: [_jsxs("span", { children: ["Scene ", scene.scene_number, ": ", scene.description, " (Day ", scene.scheduled_day, ")"] }), _jsx(Zap, { size: 16, className: "text-yellow-500" })] }), _jsxs("div", { className: "p-4 border-t border-gray-600 space-y-2", children: [_jsxs("p", { className: "flex items-center", children: [_jsx(MapPin, { size: 16, className: "mr-2 text-red-400" }), " Location: ", scene.location] }), _jsxs("p", { className: "flex items-center", children: [_jsx(Clock, { size: 16, className: "mr-2 text-green-400" }), " Estimated Time: ", scene.estimated_time] }), _jsxs("p", { className: "flex items-center", children: [_jsx(Users, { size: 16, className: "mr-2 text-blue-400" }), " Cast Required: ", scene.cast.join(', ') || 'None'] }), _jsxs("p", { className: "flex items-center", children: [_jsx(Users, { size: 16, className: "mr-2 text-purple-400" }), " Crew Required: ", scene.crew.join(', ') || 'Standard Crew'] }), _jsxs("p", { className: "flex items-center", children: [_jsx(Film, { size: 16, className: "mr-2 text-yellow-400" }), " Visual Elements: ", scene.visual_elements.join(', ') || 'None'] })] })] }, index))) })] })] }))] }), _jsxs(motion.div, { initial: { x: 20, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { delay: 0.2 }, className: "bg-gray-800 p-6 rounded-xl shadow-lg border border-blue-600/30", children: [_jsxs("h2", { className: "text-2xl font-semibold mb-6 text-blue-400 border-b border-gray-700 pb-2 flex items-center", children: [_jsx(DollarSign, { size: 20, className: "mr-2" }), " Localized Vendor Rating (LVR)"] }), _jsx("button", { onClick: loadLVRData, className: "py-2 px-4 bg-blue-600 hover:bg-blue-700 font-bold rounded-md transition duration-200 mb-4", children: "Load Rated Vendor List" }), vendors.length > 0 && (_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-700/70", children: [_jsx("th", { className: "p-3 text-left", children: "Vendor" }), _jsx("th", { className: "p-3 text-left", children: "LVR Score" }), _jsx("th", { className: "p-3 text-left", children: "Reliability" }), _jsx("th", { className: "p-3 text-center", children: "Action" })] }) }), _jsx("tbody", { children: vendors.map((v, index) => (_jsxs(motion.tr, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.3 + index * 0.05 }, className: "border-b border-gray-700 hover:bg-gray-700/50 transition duration-150", children: [_jsx("td", { className: "p-3 font-semibold", children: v.name }), _jsxs("td", { className: "p-3 font-bold", style: { color: v.lvr_score > 90 ? '#2ecc71' : '#f1c40f' }, children: [v.lvr_score, "%"] }), _jsx("td", { className: "p-3", children: v.reliability }), _jsx("td", { className: "p-3 text-center", children: _jsxs("button", { onClick: () => handleRequestQuote(v), className: "text-blue-400 hover:text-blue-300 transition flex items-center justify-center mx-auto", children: [_jsx(Mail, { size: 16, className: "mr-1" }), " Request Quote"] }) })] }, index))) })] }) }))] })] })] }));
};
export default LineProducerDashboard;
