import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { CONTACT } from "../constants";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Carlos Uzcategui | United Realty Group | South Florida REALTOR®</title>
        <meta name="description" content="Carlos Uzcategui, FL SL705771 — South Florida REALTOR® with United Realty Group. 25 years across Miami-Dade, Broward, and Palm Beach. CLHMS certified." />
        <link rel="canonical" href="https://homesprofessional.com/about" />
        <meta property="og:title" content="About Carlos Uzcategui | United Realty Group | South Florida REALTOR®" />
        <meta property="og:description" content="Florida Licensed Realtor® SL705771. 25 years in South Florida real estate. CLHMS certified. United Realty Group — Miami-Dade, Broward, and Palm Beach." />
        <meta property="og:url" content="https://homesprofessional.com/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Carlos Uzcategui | South Florida REALTOR® | United Realty Group" />
        <meta name="twitter:description" content="Florida Licensed Realtor® SL705771. 25 years in South Florida real estate. CLHMS certified. Bilingual English/Spanish." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://homesprofessional.com/#agent",
          "name": "Carlos Uzcategui",
          "jobTitle": "REALTOR®, CLHMS",
          "description": "South Florida REALTOR® and Certified Luxury Home Marketing Specialist (CLHMS) with 25 years of market experience. Florida License SL705771. United Realty Group.",
          "image": "https://homesprofessional.com/images/carlos-headshot.png",
          "url": "https://homesprofessional.com/about",
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "knowsLanguage": ["en", "es"],
          "worksFor": {
            "@type": "Organization",
            "@id": "https://homesprofessional.com/#organization",
            "name": "United Realty Group"
          },
          "hasCredential": [
            { "@type": "EducationalOccupationalCredential", "credentialCategory": "license", "name": "Florida Real Estate License SL705771", "recognizedBy": { "@type": "Organization", "name": "Florida DBPR" } },
            { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certified Luxury Home Marketing Specialist (CLHMS)" }
          ],
          "areaServed": ["Miami-Dade County", "Broward County", "Palm Beach County"],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "15951 SW 41 St #700",
            "addressLocality": "Weston",
            "addressRegion": "FL",
            "postalCode": "33331",
            "addressCountry": "US"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "15",
            "bestRating": "5",
            "worstRating": "1"
          },
          "sameAs": [CONTACT.linkedin]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="bg-navy-deep px-6 pt-32 pb-14 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                <li><a href="/" className="hover:text-gold transition-colors">Home</a></li>
                <li aria-hidden="true">·</li>
                <li className="text-gold">About</li>
              </ol>
            </nav>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Principal</p>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-white md:text-5xl">
              Carlos Uzcategui
            </h1>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              Florida Licensed Realtor® SL705771 · United Realty Group · Licensed Since 2001
            </p>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/55">
              25 years of South Florida transactions. Direct seller representation through the Miami
              and South Florida REALTORS® MLS. International buyer introductions via formal referral
              partnerships in Spain and Latin America.
            </p>
          </div>
        </section>

        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
