import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent browser from auto-restoring a previous scroll position
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Strip any hash from the URL on load — prevents Google deep-links like
// homesprofessional.com/#intelligence from scrolling past the Hero
if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
}

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
