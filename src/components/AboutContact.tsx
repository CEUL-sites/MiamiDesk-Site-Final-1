import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "../constants";
import { LeadForm } from "./LeadForm";

const STATS = [
  { value: "25", label: "Years Licensed" },
  { value: "93,000", label: "Member Agents in Association" },
  { value: "20", label: "URG Offices Statewide" },
  { value: "$69B", label: "2025 Association Volume" }
];

export function AboutContact() {
  return (
    <section id="contact" className="bg-ivory py-24">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="grid gap-10 md:grid-cols-[280px_1fr] md:items-start">
            <div className="carlos-headshot-card">
              <img src={CONTACT.headshot} alt="Carlos Uzcategui, Florida Licensed Realtor" className="carlos-headshot" loading="lazy" />
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
            <p>From his Weston, Florida office, he serves South Florida sellers and buyers through United Realty Group, Florida's leading transactional brokerage. From Madrid, he works directly with Spanish developers, agencies, and HNW property owners who need a licensed U.S. principal to activate their assets in the American market.</p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px border border-bone bg-bone lg:max-w-3xl">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-white-soft p-6">
                <div className="font-serif text-4xl text-gold">{stat.value}</div>
                <div className="font-mono mt-2 text-[9px] uppercase tracking-[0.2em] text-navy/50">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-bone pt-8 space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">{CONTACT.licenseDisplay}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">Associate in {CONTACT.brokerage} · Headquarters: Plantation, FL</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/40">Member: Miami and South Florida REALTORS® · Est. 2026 merger</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <a href={CONTACT.whatsappUS} className="flex items-start gap-3 border border-bone bg-white p-5 transition-colors hover:border-gold">
              <Phone className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/40">Direct</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.phoneUS}</div></div>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 border border-bone bg-white p-5 transition-colors hover:border-gold">
              <Mail className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/40">Email</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.email}</div></div>
            </a>
            <div className="flex items-start gap-3 border border-bone bg-white p-5">
              <MapPin className="text-gold" size={20} />
              <div><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/40">Office</div><div className="mt-1 font-sans text-sm text-navy">Weston, Florida</div></div>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm />
          <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/30">
            <BadgeCheck size={14} className="text-gold" />
            Netlify form routing enabled for seller inquiries
          </div>
        </div>
      </div>
    </section>
  );
}
