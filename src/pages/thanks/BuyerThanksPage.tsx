import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../../constants";

export default function BuyerThanksPage() {
  return (
    <>
      <Helmet>
        <title>Buyer Brief Requested | HomesProfessional.com</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay">
        <Navbar />
        <section className="flex min-h-[75vh] items-center justify-center bg-navy-deep py-24">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center bg-gold/15">
              <BadgeCheck size={34} className="text-gold" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confirmed</p>
            <h1 className="mt-4 font-serif text-4xl text-white">Miami buyer brief requested.</h1>
            <p className="mx-auto mt-6 max-w-lg font-sans text-base leading-relaxed text-white/60">
              Carlos will prepare a Miami buyer brief tailored to your neighborhoods, budget, and timeline. You will receive a confirmation by email within minutes.
            </p>
            <p className="mx-auto mt-4 max-w-lg font-sans text-sm text-white/40">
              For Spanish-speaking clients — Carlos is bilingual. WhatsApp directly in English or Spanish.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
              >
                WhatsApp Carlos
              </a>
              <a
                href="/listings"
                className="border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                Browse Active Listings
              </a>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                {CONTACT.licenseDisplay} · United Realty Group · Equal Housing Opportunity
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
