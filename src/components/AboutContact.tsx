import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "../constants";
import { LeadForm } from "./LeadForm";

export function AboutContact() {
  return (
    <section id="contact" className="bg-ivory py-10 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-7 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <div className="grid gap-4 md:grid-cols-[280px_1fr] md:items-start md:gap-10">
            <div className="carlos-headshot-card">
              <img src={CONTACT.headshot} alt="Carlos Uzcategui, Florida Licensed Realtor® with United Realty Group, serving South Florida and Madrid since 2001" className="carlos-headshot" loading="lazy" width="280" height="280" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Meet the Principal</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-navy md:mt-4 md:text-4xl lg:text-6xl">Carlos Uzcategui</h2>
              <p className="font-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-navy/70">Florida Licensed Realtor® · Since 2001</p>

              <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
                {["CLHMS", "Certified Seller Rep", "Licensed Since 2001"].map((badge) => (
                  <span key={badge} className="border border-gold/45 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gold-ink">{badge}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 max-w-4xl space-y-3 font-sans text-base leading-relaxed text-navy/68 md:mt-12 md:space-y-6 md:text-lg">
            <p>Twenty-five years of active South Florida real estate transactions, residential, luxury, and commercial. The relationships Carlos has inside the Miami professional community were built through closed deals, not directory listings.</p>
            <p>From his Weston, Florida office, he serves South Florida sellers and buyers through United Realty Group, a full-service brokerage founded in 2002 with an in-house title company. He also works directly with international developers, agencies, and HNW property owners who need a licensed U.S. principal to bring their assets to market through the Miami MLS.</p>
          </div>

          {/* URG Headquarters — video */}
          <div className="mt-5 overflow-hidden border border-bone md:mt-12">
            {/* Responsive 16:9 YouTube embed — plays inline, no navigation away */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/jlOLDjImd2g?si=bcS_Ogl9eNhOakQv&rel=0&modestbranding=1"
                title="United Realty Group — full-service brokerage founded in 2002"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
            </div>
            <div className="bg-navy-deep px-5 py-3 md:py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">United Realty Group · Est. 2002</p>
              <p className="font-mono mt-0.5 text-[8px] uppercase tracking-[0.15em] text-white/60">Full-service brokerage · 3,500+ agents · 20 Florida offices</p>
              <p className="font-mono mt-0.5 text-[8px] uppercase tracking-[0.12em] text-white/55">HQ: 1200 S Pine Island Rd, Suite 600 · Plantation, FL 33324</p>
            </div>
          </div>

          <div className="mt-3 border-t border-bone pt-3 space-y-1.5 md:mt-6 md:pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">{CONTACT.licenseDisplay}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Associate in {CONTACT.brokerage} · Headquarters: Plantation, FL</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Member: Miami and South Florida REALTORS®</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:mt-12 md:gap-5">
            <a href={CONTACT.whatsappUS} className="flex items-start gap-3 border border-bone bg-white p-4 transition-colors hover:border-gold sm:p-5">
              <Phone className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/70">Direct</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.phoneUS}</div></div>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 border border-bone bg-white p-4 transition-colors hover:border-gold sm:p-5">
              <Mail className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/70">Email</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.email}</div></div>
            </a>
            <div className="col-span-2 flex items-start gap-3 border border-bone bg-white p-4 sm:col-span-1 sm:p-5">
              <MapPin className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/70">Office</div><div className="mt-1 font-sans text-sm text-navy">Weston, Florida</div></div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm />
          <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/70">
            <BadgeCheck size={14} className="text-gold" />
            Confidential · Licensed Professionals · Equal Housing Opportunity
          </div>
        </div>
      </div>
    </section>
  );
}
