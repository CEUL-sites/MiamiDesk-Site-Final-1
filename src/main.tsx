import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import SellersPage from './pages/SellersPage';
import BuyersPage from './pages/BuyersPage';
import AgentsPage from './pages/AgentsPage';
import SpainDeskPage from './pages/SpainDeskPage';
import ContactPage from './pages/ContactPage';
import './index.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sell" element={<SellersPage />} />
            <Route path="/buy" element={<BuyersPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/spain-desk" element={<SpainDeskPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>,
  );
}
