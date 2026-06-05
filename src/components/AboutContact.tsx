import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "../constants";
import { LeadForm } from "./LeadForm";

const STATS = [
  { value: "25", label: "Years Licensed" },
  { value: "93,000", label: "Member Agents in Association" },
  { value: "3,500+", label: "URG Agents Statewide" },
  { value: "20", label: "URG Florida Offices" }
];

export function AboutContact() {
  return (
    <section id="contact" className="bg-ivory py-14 md:py-24">
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

          <div className="mt-12 max-w-4xl space-y-6 font-sans text-lg leading-relaxed text-navy/68">
            <p>Twenty-five years of active South Florida real estate transactions, residential, luxury, and commercial. The relationships Carlos has inside the Miami professional community were built through closed deals, not directory listings.</p>
            <p>From his Weston, Florida office, he serves South Florida sellers and buyers through United Realty Group — established in 2002 and today one of the largest independently owned brokerages in Florida, with 3,500+ agents across 20 offices in Miami-Dade, Broward, Palm Beach, and Orange Counties. He also works directly with international developers, agencies, and HNW property owners who need a licensed U.S. principal to activate their assets in the American market through the Miami MLS.</p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px border border-bone bg-bone lg:max-w-3xl">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white-soft p-6">
                <div className="font-serif text-4xl text-gold">{stat.value}</div>
                <div className="font-mono mt-2 text-[9px] uppercase tracking-[0.2em] text-navy/50">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* URG Headquarters — video */}
          <div className="mt-12 overflow-hidden border border-bone">
            {/* Responsive 16:9 YouTube embed — plays inline, no navigation away */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/jlOLDjImd2g?si=bcS_Ogl9eNhOakQv&rel=0&modestbranding=1"
                title="United Realty Group — Florida's leading independently owned brokerage"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
            </div>
            <div className="bg-navy-deep px-5 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">United Realty Group · Est. 2002</p>
              <p className="font-mono mt-0.5 text-[8px] uppercase tracking-[0.15em] text-white/60">One of Florida's largest independently owned brokerages · 3,500+ agents · 20 offices</p>
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
