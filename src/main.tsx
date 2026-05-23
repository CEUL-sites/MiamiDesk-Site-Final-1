import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import SellersPage from './pages/SellersPage';
import BuyersPage from './pages/BuyersPage';
import AgentsPage from './pages/AgentsPage';
import SpainDeskPage from './pages/SpainDeskPage';
import ContactPage from './pages/ContactPage';
import ListingsPage from './pages/ListingsPage';
import AboutPage from './pages/AboutPage';
import CityMarketPage from './pages/market/CityMarketPage';
import NotFoundPage from './pages/NotFoundPage';
import { SchemaOrg } from './components/SEO/SchemaOrg';
import './index.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const rootElement = document.getElementById('root');

if (rootElement) {
  const app = (
    <StrictMode>
      <HelmetProvider>
        <>
          <SchemaOrg />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sell" element={<SellersPage />} />
              <Route path="/buy" element={<BuyersPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/spain-desk" element={<SpainDeskPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/market/:city" element={<CityMarketPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </>
      </HelmetProvider>
    </StrictMode>
  );

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app);
  } else {
    createRoot(rootElement).render(app);
  }
}
