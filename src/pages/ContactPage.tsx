import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AboutContact } from "../components/AboutContact";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us | South Florida Real Estate | United Realty Group</title>
        <meta name="description" content="Contact Carlos Uzcategui, REALTOR® FL SL705771, United Realty Group. Free seller strategy reviews, buyer consultations, agent referrals, and Spain desk inquiries. Call +1 954-865-6622." />
        <meta name="keywords" content="contact Carlos Uzcategui, South Florida realtor contact, United Realty Group contact, Miami real estate consultation" />
        <link rel="canonical" href="https://homesprofessional.com/contact" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Carlos Uzcategui — United Realty Group",
          "url": "https://homesprofessional.com/contact",
          "mainEntity": {
            "@type": "ContactPoint",
            "contactType": "sales",
            "telephone": CONTACT.phoneUS,
            "email": CONTACT.email,
            "availableLanguage": ["English", "Spanish"],
            "areaServed": "South Florida",
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          }
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="bg-navy-deep py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential · Direct Line</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Contact Our Team
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Free strategy reviews for sellers and buyers. Agent referral inquiries. Spain desk consultations. Licensed professionals. No commitment required.
          </p>
        </section>
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Send us a message</h2>
            </div>
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
          </div>
        </section>
        <AboutContact />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
