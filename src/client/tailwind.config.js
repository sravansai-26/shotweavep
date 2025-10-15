export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // The 'safelist' section has been removed as requested.
  // This is safe because all your utility classes are used explicitly in your React components.
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
  // Removed 'corePlugins' section. This re-enables Tailwind's 'preflight' 
  // reset, which should fix the underlying white background inconsistencies 
  // and resolve unexpected UI issues.
};
