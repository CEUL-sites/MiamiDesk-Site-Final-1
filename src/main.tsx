import './i18n';
import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SchemaOrg } from './components/SEO/SchemaOrg';
import { HtmlLang } from './components/SEO/HtmlLang';
import { CookieBanner } from './components/CookieBanner';
import { Analytics } from './components/Analytics';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import './index.css';

// Eager — homepage is the entry point, must be in the initial bundle
import HomePage from './pages/HomePage';

// Lazy — all other pages split into separate chunks loaded on demand
const SellSouthFloridaPage           = lazy(() => import('./pages/SellSouthFloridaPage'));
const SellWestonPage                 = lazy(() => import('./pages/SellWestonPage'));
const SellCoralGablesPage            = lazy(() => import('./pages/SellCoralGablesPage'));
const SellAventuraPage               = lazy(() => import('./pages/SellAventuraPage'));
const SellDoralPage                  = lazy(() => import('./pages/SellDoralPage'));
const SellBrickellPage               = lazy(() => import('./pages/SellBrickellPage'));
const SellCoralSpringsPage           = lazy(() => import('./pages/SellCoralSpringsPage'));
const SellPembrokePinesPage          = lazy(() => import('./pages/SellPembrokePinesPage'));
const SellFortLauderdalePage         = lazy(() => import('./pages/SellFortLauderdalePage'));
const SellPlantationPage             = lazy(() => import('./pages/SellPlantationPage'));
const SellSunrisePage                = lazy(() => import('./pages/SellSunrisePage'));
const SellMiamiPage                  = lazy(() => import('./pages/SellMiamiPage'));
const SellKendallPage                = lazy(() => import('./pages/SellKendallPage'));
const SellDowntownMiamiPage          = lazy(() => import('./pages/SellDowntownMiamiPage'));
const SellNorthMiamiPage             = lazy(() => import('./pages/SellNorthMiamiPage'));
const SellPompanoBeachPage           = lazy(() => import('./pages/SellPompanoBeachPage'));
const SellHallandaleBeachPage        = lazy(() => import('./pages/SellHallandaleBeachPage'));
const HomeValuePage                  = lazy(() => import('./pages/HomeValuePage'));
const GlobalDeskPage                 = lazy(() => import('./pages/GlobalDeskPage'));
const SpainMlsListingPage            = lazy(() => import('./pages/SpainMlsListingPage'));
const BuyersPage         = lazy(() => import('./pages/BuyersPage'));
const AgentsPage         = lazy(() => import('./pages/AgentsPage'));
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
const EsVenderDoralPage       = lazy(() => import('./pages/es/EsVenderDoralPage'));
const EsVenderBrickellPage    = lazy(() => import('./pages/es/EsVenderBrickellPage'));
const EsVenderCoralGablesPage = lazy(() => import('./pages/es/EsVenderCoralGablesPage'));
const ReviewsPage              = lazy(() => import('./pages/ReviewsPage'));
const LeaveReviewPage          = lazy(() => import('./pages/LeaveReviewPage'));
const LaComisionSecretaPage    = lazy(() => import('./pages/LaComisionSecretaPage'));
const MarketDataPage           = lazy(() => import('./pages/MarketDataPage'));
const NotFoundPage             = lazy(() => import('./pages/NotFoundPage'));

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
            <HtmlLang />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/"                              element={<HomePage />} />
                {/* Primary navigation routes */}
                <Route path="/sell-south-florida"            element={<SellSouthFloridaPage />} />
                <Route path="/sell-weston"                   element={<SellWestonPage />} />
                <Route path="/sell-coral-gables"             element={<SellCoralGablesPage />} />
                <Route path="/sell-aventura"                 element={<SellAventuraPage />} />
                <Route path="/sell-doral"                    element={<SellDoralPage />} />
                <Route path="/sell-brickell"                 element={<SellBrickellPage />} />
                <Route path="/sell-coral-springs"            element={<SellCoralSpringsPage />} />
                <Route path="/sell-pembroke-pines"           element={<SellPembrokePinesPage />} />
                <Route path="/sell-fort-lauderdale"          element={<SellFortLauderdalePage />} />
                <Route path="/sell-plantation"               element={<SellPlantationPage />} />
                <Route path="/sell-sunrise"                  element={<SellSunrisePage />} />
                <Route path="/sell-miami"                    element={<SellMiamiPage />} />
                <Route path="/sell-kendall"                  element={<SellKendallPage />} />
                <Route path="/sell-downtown-miami"           element={<SellDowntownMiamiPage />} />
                <Route path="/sell-north-miami"              element={<SellNorthMiamiPage />} />
                <Route path="/sell-pompano-beach"            element={<SellPompanoBeachPage />} />
                <Route path="/sell-hallandale-beach"         element={<SellHallandaleBeachPage />} />
                <Route path="/global-desk"                   element={<GlobalDeskPage />} />
                <Route path="/madrid-miami"                  element={<Navigate to="/global-desk" replace />} />
                <Route path="/spain-mls-listing"             element={<SpainMlsListingPage />} />
                <Route path="/miami-mls-international-desk"  element={<Navigate to="/global-desk" replace />} />
                <Route path="/developers-agencies"           element={<Navigate to="/global-desk" replace />} />
                {/* Legacy routes — redirect to new canonical URLs */}
                <Route path="/sell"               element={<Navigate to="/sell-south-florida" replace />} />
                <Route path="/madrid"             element={<Navigate to="/markets" replace />} />
                {/* Active routes */}
                <Route path="/spain-desk"         element={<Navigate to="/global-desk" replace />} />
                <Route path="/home-value"         element={<HomeValuePage />} />
                <Route path="/agents"             element={<AgentsPage />} />
                {/* Secondary routes preserved */}
                <Route path="/buy"                element={<BuyersPage />} />
                <Route path="/new-construction"   element={<NewConstructionPage />} />
                <Route path="/contact"            element={<ContactPage />} />
                <Route path="/listings"           element={<ListingsPage />} />
                <Route path="/about"              element={<AboutPage />} />
                <Route path="/reviews"                   element={<ReviewsPage />} />
                <Route path="/leave-a-review"            element={<LeaveReviewPage />} />
                <Route path="/la-comision-secreta"       element={<LaComisionSecretaPage />} />
                <Route path="/markets"            element={<MarketsPage />} />
                <Route path="/market-data"       element={<MarketDataPage />} />
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
                <Route path="/es/vender-doral"        element={<EsVenderDoralPage />} />
                <Route path="/es/vender-brickell"     element={<EsVenderBrickellPage />} />
                <Route path="/es/vender-coral-gables" element={<EsVenderCoralGablesPage />} />
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

  // Always client-render, even over react-snap's prerendered markup.
  // react-snap snapshots a live browser DOM (no SSR/Suspense markers, no
  // pre-animation framer-motion styles after fix-prerender-motion.mjs, no
  // reflected `muted` attributes), so hydrateRoot can never match it — it
  // threw React #418 on every route and fell back to a full client re-render
  // anyway. createRoot gives the same result without the wasted hydration
  // pass or the console errors; the prerendered HTML still serves crawlers,
  // social scrapers, and the pre-JS first paint.
  createRoot(rootElement).render(app);
}
