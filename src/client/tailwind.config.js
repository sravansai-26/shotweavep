/** @type {import('tailwindcss').Config} */
module.exports = {
  // CRITICAL FIX: Add the content array
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all your React component files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}