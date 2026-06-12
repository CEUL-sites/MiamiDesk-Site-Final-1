import { Helmet } from "react-helmet-async";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { BadgeCheck, Download } from "lucide-react";
import { CONTACT, LEAD_MAGNETS } from "../../constants";

export default function SellerThanksPage() {
  return (
    <>
      <Helmet>
        <title>Seller Strategy Review Requested | HomesProfessional.com</title>
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
            <h1 className="mt-4 font-serif text-4xl text-white">Strategy review requested.</h1>
            <p className="mx-auto mt-6 max-w-lg font-sans text-base leading-relaxed text-white/60">
              Carlos reviews every seller submission personally before responding. You will receive a confirmation by email, and Carlos will follow up directly from his Weston, Florida office.
            </p>
            <div className="mx-auto mt-8 max-w-md border border-gold/25 bg-gold/5 p-6 text-left">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">While You Wait</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/70">
                {LEAD_MAGNETS.sellerNetSheet.description}
              </p>
              <a
                href={LEAD_MAGNETS.sellerNetSheet.url}
                download
                className="mt-4 inline-flex items-center gap-2 border border-gold/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
              >
                <Download size={13} />
                Download Net Sheet — PDF
              </a>
            </div>
            <p className="mx-auto mt-8 max-w-lg font-sans text-sm text-white/40">
              For immediate questions or to speak with Carlos directly:
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy transition-opacity hover:opacity-90"
              >
                WhatsApp {CONTACT.phoneUS}
              </a>
              <a
                href="/sell-south-florida"
                className="border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
              >
                Return to Seller Desk
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
