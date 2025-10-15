import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// ✅ Tailwind import must be first
import './index.css';

// Optional: your app-level CSS overrides after Tailwind
import './App.css';

import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found. Make sure your index.html has <div id='root'></div>");
}
