import './i18n';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import EsHomePage from './pages/es/EsHomePage';
import SellersPage from './pages/SellersPage';
import BuyersPage from './pages/BuyersPage';
import AgentsPage from './pages/AgentsPage';
import SpainDeskPage from './pages/SpainDeskPage';
import ContactPage from './pages/ContactPage';
import ListingsPage from './pages/ListingsPage';
import AboutPage from './pages/AboutPage';
import CityMarketPage from './pages/market/CityMarketPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SellerThanksPage from './pages/thanks/SellerThanksPage';
import BuyerThanksPage from './pages/thanks/BuyerThanksPage';
import AgentThanksPage from './pages/thanks/AgentThanksPage';
import { SchemaOrg } from './components/SEO/SchemaOrg';
import { CookieBanner } from './components/CookieBanner';
import JournalListPage from './pages/JournalListPage';
import JournalPostPage from './pages/JournalPostPage';
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
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/thanks/seller" element={<SellerThanksPage />} />
              <Route path="/thanks/buyer" element={<BuyerThanksPage />} />
              <Route path="/thanks/agent" element={<AgentThanksPage />} />
              <Route path="/journal" element={<JournalListPage />} />
              <Route path="/journal/:slug" element={<JournalPostPage />} />
              <Route path="/es" element={<EsHomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <CookieBanner />
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
