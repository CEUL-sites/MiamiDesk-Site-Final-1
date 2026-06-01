import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { MLSTicker } from "../components/MLSTicker";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { IntelligenceDesk } from "../components/IntelligenceDesk";
import { BuyersRelocation } from "../components/BuyersRelocation";
import { InternationalBridge } from "../components/InternationalBridge";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { AboutContact } from "../components/AboutContact";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Florida Listings. Miami MLS Exposure. International Property Distribution. | HomesProfessional.com</title>
        <meta name="description" content="HomesProfessional.com — the institutional listing hub for South Florida sellers and international property owners. Strategic listing advisory, Miami MLS exposure, and cross-border distribution. Led by Carlos Uzcategui, Florida Licensed Realtor® SL705771, United Realty Group." />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="Florida Listings. Miami MLS Exposure. International Property Distribution. | HomesProfessional.com" />
        <meta property="og:description" content="Strategic listing advisory for South Florida sellers and qualified international property owners. 25 years licensed · United Realty Group · Miami & South Florida REALTORS® · Global property exposure in 19 languages." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <Hero />
        {/* Home value entry strip */}
        <div className="bg-gold/10 border-t border-b border-gold/20 py-4">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-navy/70 text-center sm:text-left">
              Thinking about selling? Get a free, professional South Florida home valuation — no commitment required.
            </p>
            <a
              href="/home-value"
              className="flex-shrink-0 border border-gold px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-navy whitespace-nowrap"
            >
              What's My Home Worth?
            </a>
          </div>
        </div>
        <MLSTicker />
        <ReachAdvantage />
        <IntelligenceDesk />
        <BuyersRelocation />
        <InternationalBridge />
        <GlobalPartnerNetwork />
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
