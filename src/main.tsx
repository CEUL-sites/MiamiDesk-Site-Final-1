import './i18n';
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SchemaOrg } from './components/SEO/SchemaOrg';
import { CookieBanner } from './components/CookieBanner';
import { Analytics } from './components/Analytics';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import './index.css';

// Eager — homepage is the entry point, must be in the initial bundle
import HomePage from './pages/HomePage';

// Lazy — all other pages split into separate chunks loaded on demand
const SellSouthFloridaPage           = lazy(() => import('./pages/SellSouthFloridaPage'));
const HomeValuePage                  = lazy(() => import('./pages/HomeValuePage'));
const MiamiMLSInternationalDeskPage  = lazy(() => import('./pages/MiamiMLSInternationalDeskPage'));
const DevelopersAgenciesPage         = lazy(() => import('./pages/DevelopersAgenciesPage'));
const SellersPage        = lazy(() => import('./pages/SellersPage'));
const BuyersPage         = lazy(() => import('./pages/BuyersPage'));
const AgentsPage         = lazy(() => import('./pages/AgentsPage'));
const SpainDeskPage      = lazy(() => import('./pages/SpainDeskPage'));
const MadridPage         = lazy(() => import('./pages/MadridPage'));
const NewConstructionPage = lazy(() => import('./pages/NewConstructionPage'));
const ContactPage        = lazy(() => import('./pages/ContactPage'));
const ListingsPage       = lazy(() => import('./pages/ListingsPage'));
const AboutPage          = lazy(() => import('./pages/AboutPage'));
const MarketsPage        = lazy(() => import('./pages/MarketsPage'));
const PrivacyPage        = lazy(() => import('./pages/PrivacyPage'));
const TermsPage          = lazy(() => import('./pages/TermsPage'));
const SellerThanksPage   = lazy(() => import('./pages/thanks/SellerThanksPage'));
const BuyerThanksPage    = lazy(() => import('./pages/thanks/BuyerThanksPage'));
const AgentThanksPage    = lazy(() => import('./pages/thanks/AgentThanksPage'));
const JournalListPage    = lazy(() => import('./pages/JournalListPage'));
const JournalPostPage    = lazy(() => import('./pages/JournalPostPage'));
const EsHomePage         = lazy(() => import('./pages/es/EsHomePage'));
const EsVenderPage       = lazy(() => import('./pages/es/EsVenderPage'));
const EsComprarPage      = lazy(() => import('./pages/es/EsComprarPage'));
const EsAgentesPage      = lazy(() => import('./pages/es/EsAgentesPage'));
const EsGraciasAgentePage = lazy(() => import('./pages/es/EsGraciasAgentePage'));
const EsSpainDeskPage    = lazy(() => import('./pages/es/EsSpainDeskPage'));
const ReviewsPage        = lazy(() => import('./pages/ReviewsPage'));
const NotFoundPage       = lazy(() => import('./pages/NotFoundPage'));

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
            <Suspense fallback={null}>
              <Routes>
                <Route path="/"                              element={<HomePage />} />
                {/* Primary navigation routes */}
                <Route path="/sell-south-florida"            element={<SellSouthFloridaPage />} />
                <Route path="/miami-mls-international-desk"  element={<MiamiMLSInternationalDeskPage />} />
                <Route path="/developers-agencies"           element={<DevelopersAgenciesPage />} />
                {/* Legacy routes — redirect to new canonical URLs */}
                <Route path="/sell"               element={<Navigate to="/sell-south-florida" replace />} />
                <Route path="/madrid"             element={<Navigate to="/markets" replace />} />
                {/* Active routes */}
                <Route path="/spain-desk"         element={<SpainDeskPage />} />
                <Route path="/home-value"         element={<HomeValuePage />} />
                <Route path="/agents"             element={<AgentsPage />} />
                {/* Secondary routes preserved */}
                <Route path="/buy"                element={<BuyersPage />} />
                <Route path="/new-construction"   element={<NewConstructionPage />} />
                <Route path="/madrid-page"        element={<MadridPage />} />
                <Route path="/contact"            element={<ContactPage />} />
                <Route path="/listings"           element={<ListingsPage />} />
                <Route path="/about"              element={<AboutPage />} />
                <Route path="/reviews"           element={<ReviewsPage />} />
                <Route path="/markets"            element={<MarketsPage />} />
                <Route path="/market"             element={<Navigate to="/markets" replace />} />
                <Route path="/market/:city"       element={<Navigate to="/markets" replace />} />
                <Route path="/privacy"            element={<PrivacyPage />} />
                <Route path="/terms"              element={<TermsPage />} />
                <Route path="/thanks/seller"      element={<SellerThanksPage />} />
                <Route path="/thanks/buyer"       element={<BuyerThanksPage />} />
                <Route path="/thanks/agent"       element={<AgentThanksPage />} />
                <Route path="/journal"            element={<JournalListPage />} />
                <Route path="/journal/:slug"      element={<JournalPostPage />} />
                <Route path="/es"                 element={<EsHomePage />} />
                <Route path="/es/vender"          element={<EsVenderPage />} />
                <Route path="/es/comprar"         element={<EsComprarPage />} />
                <Route path="/es/agentes"         element={<EsAgentesPage />} />
                <Route path="/es/gracias/agente"  element={<EsGraciasAgentePage />} />
                <Route path="/es/spain-desk"      element={<EsSpainDeskPage />} />
                <Route path="/es/madrid"          element={<Navigate to="/markets" replace />} />
<Route path="*"                   element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Analytics />
            <WhatsAppFloat />
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
