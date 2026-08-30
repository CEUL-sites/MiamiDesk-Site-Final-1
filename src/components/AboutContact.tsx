import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { CONTACT } from "../constants";
import { LeadForm } from "./LeadForm";

export function AboutContact({
  showForm = true,
  compact = false,
}: {
  showForm?: boolean;
  compact?: boolean;
} = {}) {
  return (
    <section id="contact" className={`bg-ivory ${compact ? "py-10 md:py-16" : "py-10 md:py-24"}`}>
      <div className={`mx-auto grid gap-7 px-6 ${showForm ? "max-w-7xl lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : "max-w-5xl"}`}>
        <div>
          <div className="grid gap-4 md:grid-cols-[280px_1fr] md:items-start md:gap-10">
            <div className="carlos-headshot-card">
              <img src={CONTACT.headshot} alt="Carlos Uzcategui, REALTOR®, Florida License SL705771, with United Realty Group, serving South Florida and Madrid since 2001" className="carlos-headshot" loading="lazy" width="280" height="280" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Meet the Principal</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-navy md:mt-4 md:text-4xl lg:text-6xl">Carlos Uzcategui</h2>
              <p className="font-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-navy/70">REALTOR® · Florida License SL705771 · Since 2001</p>

              <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
                {["CLHMS", "Certified Seller Rep", "Licensed Since 2001"].map((badge) => (
                  <span key={badge} className="border border-gold/45 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">{badge}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 max-w-4xl space-y-3 font-sans text-base leading-relaxed text-navy/68 md:mt-12 md:space-y-6 md:text-lg">
            <p>Twenty-five years of active South Florida real estate transactions, residential, luxury, and commercial. The relationships Carlos has inside the Miami professional community were built through closed deals, not directory listings.</p>
            <p>From his Weston, Florida office, Carlos serves South Florida sellers and buyers through United Realty Group, with 3,500+ agents and 20 Florida offices. He also coordinates selected international property opportunities through documented professional and brokerage relationships, subject to brokerage, platform, property-eligibility, and compliance requirements.</p>
          </div>

          {/* Carlos-led advice with visible brokerage infrastructure behind it. */}
          <div id="brokerage-proof" className="mt-6 scroll-mt-24 overflow-hidden border border-bone bg-navy-deep md:mt-12 md:grid md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-64 overflow-hidden md:min-h-[390px]">
              <img
                src="/images/urg-weston-office.webp"
                alt="United Realty Group Weston office reception and client meeting area"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                width="1920"
                height="2560"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-5 pb-5 pt-16">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white">Weston office · South Florida</p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-12">
              <img
                src="/images/urg-logo-original.webp"
                alt="United Realty Group"
                className="h-auto w-64 max-w-full object-contain object-left brightness-0 invert md:w-72"
                loading="lazy"
                width="2176"
                height="723"
              />
              <h3 className="mt-7 font-serif text-3xl leading-tight text-white md:text-4xl">Your strategy is personal. The infrastructure behind it is institutional.</h3>
              <p className="mt-5 font-sans text-sm leading-relaxed text-white/70 md:text-base">
                Carlos leads the pricing, positioning, negotiation, and communication personally. United Realty Group provides the Florida brokerage platform behind the assignment: 3,500+ agents across 20 offices.
              </p>
              <div className="mt-7 grid grid-cols-2 border-y border-white/15 py-5">
                <div>
                  <p className="font-serif text-3xl text-gold">3,500+</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">URG agents</p>
                </div>
                <div className="border-l border-white/15 pl-6">
                  <p className="font-serif text-3xl text-gold">20</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">Florida offices</p>
                </div>
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">Carlos Uzcategui · United Realty Group · FL SL705771</p>
            </div>
          </div>

          {/* URG Headquarters — video */}
          <div className="mt-5 overflow-hidden border border-bone md:mt-12">
            {/* Responsive 16:9 YouTube embed — plays inline, no navigation away */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/jlOLDjImd2g?si=bcS_Ogl9eNhOakQv&rel=0&modestbranding=1"
                title="United Realty Group — 3,500+ agents and 20 Florida offices"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
              />
            </div>
            <div className="bg-navy-deep px-5 py-3 md:py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">United Realty Group · 3,500+ agents</p>
              <p className="font-mono mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">20 Florida offices · Carlos Uzcategui, REALTOR® · Florida License SL705771</p>
              <p className="font-mono mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/70">HQ: 1200 S Pine Island Rd, Suite 600 · Plantation, FL 33324</p>
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
              <div><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Direct</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.phoneUS}</div></div>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 border border-bone bg-white p-4 transition-colors hover:border-gold sm:p-5">
              <Mail className="text-gold" size={20} />
              <div><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Email</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.email}</div></div>
            </a>
            <div className="col-span-2 flex items-start gap-3 border border-bone bg-white p-4 sm:col-span-1 sm:p-5">
              <MapPin className="text-gold" size={20} />
              <div><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Office</div><div className="mt-1 font-sans text-sm text-navy">Weston, Florida</div></div>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
