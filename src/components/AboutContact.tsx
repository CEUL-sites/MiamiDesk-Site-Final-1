import { useState } from "react";
import { ArrowUpRight, BadgeCheck, Building2, Mail, MapPin, Phone, Scale, ShieldCheck } from "lucide-react";
import { CONTACT, PUBLIC_COMPLIANCE } from "../constants";
import {
  URG_FLORIDA_OFFICE_NAMES,
  URG_FLORIDA_OFFICE_COUNT,
} from "../data/urgOffices";
import { LeadForm } from "./LeadForm";

const PRINCIPAL_LENSES = [
  {
    id: "experience",
    label: "01 · 25-Year Track Record",
    icon: Scale,
    stat: "Since 2001",
    headline: "Built Through Closed Transactions, Not Directory Listings",
    body: "Twenty-five years of active South Florida real estate transactions across residential, luxury, and commercial sectors. Relationships inside the Miami professional community built through closed transactions, not directory listings.",
  },
  {
    id: "platform",
    label: "02 · Weston & URG Network",
    icon: Building2,
    stat: `3,500+ Agents · ${URG_FLORIDA_OFFICE_COUNT} FL Locations`,
    headline: "Statewide Brokerage Scale From the Weston Advisory Desk",
    body: `From the United Realty Group office in Weston, Carlos serves South Florida sellers and buyers through a brokerage network of 3,500+ agents and ${URG_FLORIDA_OFFICE_COUNT} Florida office locations, delivering institutional market reach across South Florida corridors.`,
  },
  {
    id: "governance",
    label: "03 · Direct Principal Accountability",
    icon: ShieldCheck,
    stat: "FL SL705771",
    headline: "Every Mandate Led Personally by Carlos as Principal of Record",
    body: "Every assignment is managed directly by Carlos as principal of record—from pricing strategy and MLS positioning to contract negotiation. Selected international opportunities are coordinated through documented bilateral agreements, subject to brokerage and compliance requirements.",
  },
] as const;

export function AboutContact({
  showForm = true,
  compact = false,
  title = "Carlos Uzcategui",
  eyebrow = "Meet the Principal",
}: {
  showForm?: boolean;
  compact?: boolean;
  title?: string;
  eyebrow?: string;
} = {}) {
  const [activeLensIndex, setActiveLensIndex] = useState(0);
  const [brokerageMediaMode, setBrokerageMediaMode] = useState<"video" | "hq" | "weston">("video");

  return (
    <section id="contact" className={`bg-ivory ${compact ? "py-12 md:py-16" : "py-10 md:py-24"}`}>
      <div className={`mx-auto grid gap-7 px-6 ${showForm ? "max-w-7xl lg:grid-cols-[1.1fr_0.9fr] lg:gap-16" : "max-w-5xl"}`}>
        <div>
          <div className={compact ? "" : "grid gap-4 md:grid-cols-[280px_1fr] md:items-start md:gap-10"}>
            {!compact && (
              <div className="carlos-headshot-card">
                <img src={CONTACT.headshot} alt="Carlos Uzcategui, REALTOR®, Florida License SL705771, with United Realty Group, serving South Florida and Madrid since 2001" className="carlos-headshot" loading="lazy" width="280" height="280" />
              </div>
            )}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{eyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-navy md:mt-4 md:text-4xl lg:text-5xl">{title}</h2>
              <p className="font-mono mt-3 text-[10px] uppercase tracking-[0.22em] text-navy/70">REALTOR® · Florida License SL705771 · Since 2001</p>

              <div className="mt-5 flex flex-wrap gap-3 md:mt-6">
                {["CLHMS", "Certified Seller Rep", "Licensed Since 2001"].map((badge) => (
                  <span key={badge} className="border border-gold/45 bg-white/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">{badge}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive 3-Lens Principal Credentials Deck (replaces 3 stacked text paragraphs while keeping all copy in DOM) */}
          <div className="mt-6 max-w-4xl md:mt-8">
            <div
              role="tablist"
              aria-label="Principal Credentials and Governance"
              className="grid gap-2 sm:grid-cols-3"
            >
              {PRINCIPAL_LENSES.map((lens, idx) => {
                const Icon = lens.icon;
                const isSelected = activeLensIndex === idx;
                return (
                  <button
                    key={lens.id}
                    type="button"
                    role="tab"
                    id={`about-lens-tab-${lens.id}`}
                    aria-selected={isSelected}
                    aria-controls={`about-lens-panel-${lens.id}`}
                    onClick={() => setActiveLensIndex(idx)}
                    className={`flex items-center justify-between gap-2 border px-4 py-3 text-left transition-all ${
                      isSelected
                        ? "border-navy-deep bg-navy-deep text-white"
                        : "border-bone bg-white text-navy hover:border-gold/60"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                        isSelected ? "text-gold" : "text-navy"
                      }`}
                    >
                      {lens.label}
                    </span>
                    <Icon size={14} className={isSelected ? "text-gold" : "text-gold-ink"} />
                  </button>
                );
              })}
            </div>

            {PRINCIPAL_LENSES.map((lens, idx) => {
              const isSelected = activeLensIndex === idx;
              return (
                <div
                  key={lens.id}
                  id={`about-lens-panel-${lens.id}`}
                  role="tabpanel"
                  aria-labelledby={`about-lens-tab-${lens.id}`}
                  hidden={!isSelected}
                  className="border border-t-0 border-bone bg-white p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-serif text-xl text-navy">{lens.headline}</h3>
                    <span className="border border-gold/40 bg-ivory px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-ink">
                      {lens.stat}
                    </span>
                  </div>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-navy/75 md:text-base">
                    {lens.body}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Carlos-led advice with visible brokerage infrastructure behind it. */}
          <div id="brokerage-proof" data-sticky-cta-guard className="mt-6 scroll-mt-24 overflow-hidden border border-bone bg-navy-deep md:mt-10 md:grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative flex flex-col justify-between bg-[#050C18] min-h-[340px] md:min-h-[460px]">
              {/* Interactive Media Switcher Pill Bar */}
              <div className="relative z-10 flex flex-wrap gap-1.5 border-b border-white/10 bg-navy-deep/90 p-3 backdrop-blur-sm">
                {[
                  { id: "video" as const, label: "HQ Film · Plantation" },
                  { id: "hq" as const, label: "HQ Aerial · 1200 Bldg" },
                  { id: "weston" as const, label: "Weston Office" },
                ].map((tab) => {
                  const selected = brokerageMediaMode === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setBrokerageMediaMode(tab.id)}
                      className={`px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] transition-all ${
                        selected
                          ? "bg-gold text-navy-deep font-bold"
                          : "border border-white/15 bg-white/[0.04] text-white/80 hover:border-gold/50 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="relative flex-1 min-h-[260px] overflow-hidden">
                <video
                  hidden={brokerageMediaMode !== "video"}
                  src="/videos/urg_corporate_hq.mp4"
                  poster="/images/urg-corporate-hq-aerial.jpg"
                  controls
                  playsInline
                  muted
                  autoPlay
                  loop
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <img
                  hidden={brokerageMediaMode !== "hq"}
                  src="/images/urg-corporate-hq-aerial.jpg"
                  alt="United Realty Group Corporate Headquarters waterfront campus at 1200 S. Pine Island Road, Plantation, Florida"
                  className="absolute inset-0 h-full w-full object-cover"
                  width="1280"
                  height="720"
                  loading="lazy"
                />
                <img
                  hidden={brokerageMediaMode !== "weston"}
                  src="/images/urg-weston-office.webp"
                  alt="United Realty Group Weston office reception and client meeting area"
                  className="absolute inset-0 h-full w-full object-cover"
                  width="1920"
                  height="2560"
                />
              </div>

              <div className="relative z-10 border-t border-white/10 bg-navy-deep/95 px-5 py-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {brokerageMediaMode === "weston"
                    ? "Weston office · 15951 SW 41st St, Suite 700"
                    : "Plantation Corporate HQ · 1200 S. Pine Island Rd, Suite 600"}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center px-6 py-8 md:px-10 md:py-10">
              <img
                src="/images/urg-logo-original.webp"
                alt="United Realty Group"
                className="h-auto w-48 max-w-full object-contain object-left brightness-0 invert md:w-64"
                loading="lazy"
                width="2176"
                height="723"
              />
              <h3 className="mt-5 font-serif text-2xl leading-tight text-white md:text-4xl">Your strategy is personal. The infrastructure behind it is institutional.</h3>
              <p className="mt-5 font-sans text-sm leading-relaxed text-white/70 md:text-base">
                Carlos leads the pricing, positioning, negotiation, and communication personally. United Realty Group provides the Florida brokerage platform behind the assignment: 3,500+ agents and {URG_FLORIDA_OFFICE_COUNT} Florida office locations.
              </p>
              <div className="mt-6 grid grid-cols-2 border-y border-white/15 py-4">
                <div>
                  <p className="font-serif text-3xl text-gold">3,500+</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">URG agents</p>
                </div>
                <div className="border-l border-white/15 pl-6">
                  <p className="font-serif text-3xl text-gold">{URG_FLORIDA_OFFICE_COUNT}</p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/60">Florida office locations</p>
                </div>
              </div>

              {/* Affiliated Transaction & Settlement Service Providers */}
              <div className="mt-5 border-b border-white/15 pb-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                  Affiliated Transaction &amp; Closing Partners
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  <a
                    href="https://sftafl.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-2.5 border border-white/15 bg-white/[0.04] p-2.5 transition-colors hover:border-gold"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex h-8 shrink-0 items-center rounded bg-white px-2 py-1">
                        <img
                          src="/images/urg-partners/sfta-logo.png"
                          alt="South Florida Title Associates"
                          className="h-5 w-auto object-contain"
                          loading="lazy"
                        />
                      </span>
                      <div className="min-w-0">
                        <span className="block truncate font-serif text-xs text-white group-hover:text-gold">
                          South Florida Title
                        </span>
                        <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-white/60">
                          Title &amp; Escrow · sftafl.com
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="shrink-0 text-gold" />
                  </a>

                  <a
                    href="https://certifiedhomeloans.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-2.5 border border-white/15 bg-white/[0.04] p-2.5 transition-colors hover:border-gold"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex h-8 shrink-0 items-center rounded bg-white px-2 py-1">
                        <img
                          src="/images/urg-partners/certified-home-loans-logo.png"
                          alt="Certified Home Loans"
                          className="h-4 w-auto object-contain"
                          loading="lazy"
                        />
                      </span>
                      <div className="min-w-0">
                        <span className="block truncate font-serif text-xs text-white group-hover:text-gold">
                          Certified Home Loans
                        </span>
                        <span className="block font-mono text-[8px] uppercase tracking-[0.12em] text-white/60">
                          Mortgage · CHL
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={13} className="shrink-0 text-gold" />
                  </a>
                </div>
              </div>

              <details className="group mt-4 pt-1">
                <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-[0.16em] text-gold transition-colors hover:text-white">
                  View the Florida office network
                </summary>
                <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 font-sans text-xs leading-relaxed text-white/70 sm:grid-cols-3">
                  {URG_FLORIDA_OFFICE_NAMES.map((name) => (
                    <li key={name} className="border-l border-gold/35 pl-2.5">{name}</li>
                  ))}
                </ul>
                <p className="mt-4 font-sans text-xs leading-relaxed text-white/70">The official directory includes Pembroke Pines, marked opening soon.</p>
                <a
                  href="https://www.urgfl.com/office-locations/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block font-mono text-[9px] uppercase tracking-[0.14em] text-white/55 transition-colors hover:text-gold"
                >
                  United Realty Group office directory
                </a>
              </details>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                Carlos Uzcategui · United Realty Group · FL SL705771 · HQ: 1200 S Pine Island Rd, Suite 600, Plantation, FL 33324
              </p>
            </div>
          </div>

          {/* URG Headquarters — full profile mode only */}
          {!compact && (
            <div data-sticky-cta-guard className="mt-5 overflow-hidden border border-bone md:mt-12">
              <div className="grid sm:grid-cols-2 bg-navy-deep">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img src="/images/urg-corporate-hq-aerial.jpg" alt="United Realty Group Corporate Headquarters waterfront campus in Plantation, Florida" width="1280" height="720" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="relative aspect-video w-full overflow-hidden border-t border-white/10 sm:border-l sm:border-t-0">
                  <img src="/images/urg-hq.jpg" alt="United Realty Group headquarters entrance in Plantation, Florida" width="1920" height="1080" loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="bg-navy-deep px-5 py-3 md:py-4 border-t border-white/10">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">United Realty Group · 3,500+ agents</p>
                <p className="font-mono mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">19 Florida office locations · Carlos Uzcategui, REALTOR® · Florida License SL705771</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-4">
                  <a href="https://www.urgfl.com/office-locations/" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold hover:text-white">
                    View official branch locations ↗
                  </a>
                  <a href="https://sftafl.com/" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold hover:text-white">
                    South Florida Title Associates ↗
                  </a>
                  <a href="https://certifiedhomeloans.com/" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold hover:text-white">
                    Certified Home Loans ↗
                  </a>
                </div>
                <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.12em] text-white/70">HQ: 1200 S Pine Island Rd, Suite 600 · Plantation, FL 33324</p>
              </div>
            </div>
          )}

          <div className="mt-4 border-t border-bone pt-4 space-y-1.5 md:mt-6 md:pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">{CONTACT.licenseDisplay}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Associate in {CONTACT.brokerage} · Headquarters: Plantation, FL</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Member: Miami and South Florida REALTORS®</p>
          </div>

          {!compact && (
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-12 md:gap-5">
              <a href={CONTACT.whatsappUS} className="flex items-start gap-3 border border-bone bg-white p-4 transition-colors hover:border-gold sm:p-5">
                <Phone className="shrink-0 text-gold" size={20} />
                <div className="min-w-0"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Direct</div><div className="mt-1 font-sans text-sm text-navy">{CONTACT.phoneUS}</div></div>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 border border-bone bg-white p-4 transition-colors hover:border-gold sm:p-5">
                <Mail className="shrink-0 text-gold" size={20} />
                <div className="min-w-0"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Email</div><div className="mt-1 break-all font-sans text-sm text-navy">{CONTACT.email}</div></div>
              </a>
              <div className="flex items-start gap-3 border border-bone bg-white p-4 sm:p-5">
                <MapPin className="shrink-0 text-gold" size={20} />
                <div className="min-w-0"><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">Office</div><div className="mt-1 font-sans text-sm text-navy">Weston, Florida</div></div>
              </div>
            </div>
          )}
        </div>

        {showForm && (
          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">
              <BadgeCheck size={14} className="text-gold" />
              {PUBLIC_COMPLIANCE}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
