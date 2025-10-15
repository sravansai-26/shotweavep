import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // <-- important for production builds (relative paths)
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'https://shotweave-ai.onrender.com', // your deployed backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
