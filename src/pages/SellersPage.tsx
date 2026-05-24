import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SellerSection } from "../components/SellerSection";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { ExposureSyndication } from "../components/ExposureSyndication";
import { PartnersMarquee } from "../components/PartnersMarquee";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

const sellerFaqs = [
  {
    question: "How do I sell my home fast in South Florida?",
    answer:
      "The fastest path to sale combines correct pricing with full Miami MLS activation, buyer-agent exposure, and coordinated portal syndication. The seller strategy review covers pricing, timing, buyer profile, and launch sequencing before listing.",
  },
  {
    question: "How long does it take to sell a home in Miami?",
    answer:
      "Timing depends on price band, condition, neighborhood, and inventory. Correctly positioned homes can move quickly, while luxury and specialized inventory usually needs a longer, more deliberate campaign.",
  },
  {
    question: "What is included in the free seller strategy review?",
    answer:
      "The review covers pricing analysis, market timing, presentation priorities, buyer profile, and a recommended launch path. It is free and does not require a listing commitment.",
  },
  {
    question: "Which South Florida neighborhoods do you serve?",
    answer:
      "Carlos serves Miami-Dade, Broward, and Palm Beach, including Coral Gables, Brickell, Miami Beach, Aventura, Weston, Doral, Fort Lauderdale, Boca Raton, and nearby communities.",
  },
];

export default function SellersPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your South Florida Home | 93,000 Realtors + 200 Global Portals | United Realty Group</title>
        <meta name="description" content="Your listing reaches 93,000 Realtors and 200+ global portals in 19 languages the day it goes live. Coral Gables, Brickell, Miami Beach, Weston, Aventura. Free strategy review — no commitment." />
        <meta name="keywords" content="sell home South Florida, sell house Miami, Miami MLS listing, Coral Gables realtor, Brickell condo for sale, Miami Beach seller agent, Weston home for sale, South Florida listing agent, United Realty Group" />
        <link rel="canonical" href="https://homesprofessional.com/sell" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell Your South Florida Home", "item": "https://homesprofessional.com/sell" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Sell Your South Florida Home",
          "description": "A proven 5-step process to position, prepare, launch, activate, and close your South Florida property with maximum MLS exposure.",
          "totalTime": "P30D",
          "tool": [
            { "@type": "HowToTool", "name": "Miami and South Florida REALTORS® MLS" },
            { "@type": "HowToTool", "name": "200+ Global Portals in 19 Languages" },
            { "@type": "HowToTool", "name": "United Realty Group Agent Network" }
          ],
          "step": [
            { "@type": "HowToStep", "position": 1, "name": "Position", "text": "Pricing analysis, timing strategy, buyer profile identification, and property narrative development." },
            { "@type": "HowToStep", "position": 2, "name": "Prepare", "text": "Presentation guidance, professional photography coordination, MLS data accuracy, and launch sequencing." },
            { "@type": "HowToStep", "position": 3, "name": "Launch", "text": "Live MLS activation through United Realty Group with simultaneous syndication to 200+ global portals in 19 languages the day your property goes live." },
            { "@type": "HowToStep", "position": 4, "name": "Activate", "text": "Targeted outreach to buyer agents, international referral channels, and LATAM and Spain pipeline activation." },
            { "@type": "HowToStep", "position": 5, "name": "Negotiate", "text": "Offer review, terms strategy, inspection response, and closing coordination." }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": sellerFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
          })),
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="bg-navy-deep py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Seller Strategy</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Sell Your South Florida Home.<br />
            <em className="not-italic italic text-gold">Maximum Global Exposure.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Your listing activates inside the Miami and South Florida REALTORS® MLS — 93,000 member agents, 200+ global portals, 19 languages — the day it goes live.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Request a Private Seller Strategy Review
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            United Realty Group · CLHMS · Certified Seller Rep · FL SL705771
          </p>
        </section>
        <ReachAdvantage />
        <SellerSection />
        <ExposureSyndication />
        <PartnersMarquee />
        <section className="bg-white px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Seller questions</p>
            <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">What sellers ask before listing.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {sellerFaqs.map((faq) => (
                <article key={faq.question} className="border border-bone bg-white-soft p-7">
                  <h3 className="font-serif text-xl text-navy">{faq.question}</h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-navy/65">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <SellerIntakeForm />
          </div>
        </section>
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
