import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "../constants";
import { LeadForm } from "./LeadForm";

export function AboutContact() {
  return (
    <section id="contact" className="bg-ivory py-12 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
            <div className="carlos-headshot-card">
              <img src={CONTACT.headshot} alt="Carlos Uzcategui, Florida Licensed Realtor® with United Realty Group, serving South Florida and Madrid since 2001" className="carlos-headshot" loading="lazy" width="280" height="280" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Meet the Principal</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-navy lg:text-6xl">Carlos Uzcategui</h2>
              <p className="font-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-navy/45">Florida Licensed Realtor® · Since 2001</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["CLHMS", "Certified Seller Rep", "Licensed Since 2001"].map((badge) => (
                  <span key={badge} className="border border-gold/45 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gold">{badge}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-2xl space-y-5 font-sans text-base leading-relaxed text-navy/68">
            <p>Twenty-five years of active South Florida transactions — residential, luxury, and commercial. Carlos's relationships across the Miami professional community were built through closed deals, not directory listings.</p>
            <p>From his Weston office, he represents South Florida sellers and buyers through United Realty Group — a full-service brokerage founded in 2002 with an in-house title company. He also brings international developers, agencies, and HNW owners to market through the Miami MLS as their licensed U.S. principal of record.</p>
          </div>

          {/* URG Headquarters — video */}
          <div className="mt-12 overflow-hidden border border-bone">
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
            <div className="bg-navy-deep px-5 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">United Realty Group · Est. 2002</p>
              <p className="font-mono mt-0.5 text-[8px] uppercase tracking-[0.15em] text-white/60">Full-service brokerage · 3,500+ agents · 20 Florida offices</p>
              <p className="font-mono mt-0.5 text-[8px] uppercase tracking-[0.12em] text-white/40">HQ: 1200 S Pine Island Rd, Suite 600 · Plantation, FL 33324</p>
            </div>
          </div>

          <div className="mt-6 border-t border-bone pt-6 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60">{CONTACT.licenseDisplay}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60">Associate in {CONTACT.brokerage} · Headquarters: Plantation, FL</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60">Member: Miami and South Florida REALTORS®</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <a href={CONTACT.whatsappUS} className="flex items-start gap-3 border border-bone bg-white p-5 transition-colors hover:border-gold">
              <Phone className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/60">Direct</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.phoneUS}</div></div>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 border border-bone bg-white p-5 transition-colors hover:border-gold">
              <Mail className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/60">Email</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.email}</div></div>
            </a>
            <div className="flex items-start gap-3 border border-bone bg-white p-5">
              <MapPin className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/60">Office</div><div className="mt-1 font-sans text-sm text-navy">Weston, Florida</div></div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm />
          <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/30">
            <BadgeCheck size={14} className="text-gold" />
            Confidential · Licensed Professionals · Equal Housing Opportunity
          </div>
        </div>
      </div>
    </section>
  );
}
