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
        <meta name="description" content="Carlos Uzcategui, FL SL705771, is a South Florida REALTOR® with United Realty Group — the #1 transaction volume real estate company in Florida. Serving Miami-Dade, Broward, and Palm Beach." />
        <link rel="canonical" href="https://homesprofessional.com/about" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Carlos Uzcategui",
          "jobTitle": "REALTOR®, CLHMS",
          "worksFor": { "@type": "Organization", "name": "United Realty Group" },
          "hasCredential": [
            { "@type": "EducationalOccupationalCredential", "credentialCategory": "license", "name": "Florida Real Estate License SL705771" },
            { "@type": "EducationalOccupationalCredential", "credentialCategory": "certification", "name": "Certified Luxury Home Marketing Specialist (CLHMS)" }
          ],
          "areaServed": "South Florida",
          "url": "https://homesprofessional.com/about",
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
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
