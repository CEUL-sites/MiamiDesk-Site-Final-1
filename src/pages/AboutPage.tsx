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
      <main id="main-content" tabIndex={-1} className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
