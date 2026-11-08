import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { ListingsBrowser } from "../components/listings/ListingsBrowser";
import { HomepageListingApproach } from "../components/HomepageListingApproach";
import { Proof } from "../components/Proof";
import { HomepageObjectives } from "../components/HomepageObjectives";
import { HomepageConsultation } from "../components/HomepageConsultation";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../components/DesktopStickyCTA";
import type { HeroAddressTransfer } from "../components/HeroSellerForm";

export default function HomePage() {
  const [addressTransfer, setAddressTransfer] = useState<HeroAddressTransfer | null>(null);

  function handleHeroAddressSubmit(address: string) {
    const trimmed = address.trim();
    if (!trimmed) return;
    setAddressTransfer((prev) => ({
      address: trimmed,
      seq: (prev?.seq ?? 0) + 1,
    }));
  }

  return (
    <>
      <Helmet>
        <title>South Florida Listing Agent | Carlos Uzcategui</title>
        <meta name="description" content="Sell your South Florida home with Carlos Uzcategui at United Realty Group. Strategic MLS positioning, buyer-agent negotiation, and contract protection. Request a private seller strategy review." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Florida Listing Agent | Carlos Uzcategui" />
        <meta name="twitter:description" content="Sell your South Florida home with Carlos Uzcategui at United Realty Group. Strategic MLS positioning, buyer-agent negotiation, and contract protection. Request a private seller strategy review." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="canonical" href="https://homesprofessional.com/" />
        <meta property="og:title" content="South Florida Listing Agent | Carlos Uzcategui" />
        <meta property="og:description" content="Sell your South Florida home with Carlos Uzcategui at United Realty Group. Strategic MLS positioning, buyer-agent negotiation, and contract protection. Request a private seller strategy review." />
        <meta property="og:url" content="https://homesprofessional.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es" />
      </Helmet>
      <main id="main-content" className="min-h-screen overflow-x-hidden bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />
        {/* Section A: Hero */}
        <Hero onAddressSubmit={handleHeroAddressSubmit} />
        {/* Primary Live Bridge IDX Search Desk */}
        <ListingsBrowser compact />
        {/* Section B: Why Our Listing Approach */}
        <HomepageListingApproach />
        {/* Section C: Proven Client Confidence */}
        <Proof />
        {/* Section D: Choose Your Property Objective */}
        <HomepageObjectives />
        {/* Section E: Meet Carlos / Private Consultation */}
        <HomepageConsultation
          initialAddress={addressTransfer?.address ?? ""}
          addressTransfer={addressTransfer}
        />
        {/* Global Footer (Preserved untouched in Phase 1) */}
        <Footer />
        <MobileStickyCTA />
        <DesktopStickyCTA ctaHref="#list-here" />
      </main>
    </>
  );
}
