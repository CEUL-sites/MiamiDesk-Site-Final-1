import { CheckCircle2, Crosshair, FileCheck2, Globe2, Radio, Scale, ShieldCheck } from "lucide-react";
import { AuroraBackground } from "./AuroraBackground";

const EXECUTION_STAGES = [
  {
    step: "01",
    label: "Position",
    icon: Crosshair,
    title: "Pricing Strategy & Net Math",
    copy: "We analyze recent closed sales, competing active inventory, and net-proceeds scenarios before going live. Every price recommendation is grounded in verifiable comps.",
    outcome: "Defensible asking price & proceeds clarity",
  },
  {
    step: "02",
    label: "Present",
    icon: FileCheck2,
    title: "Asset Preparation & Disclosure",
    copy: "Architectural photography, cinematic tour, HOA estoppel packages, and disclosure documentation prepared in advance so cooperating buyer agents have immediate answers.",
    outcome: "Frictionless showing & buyer confidence",
  },
  {
    step: "03",
    label: "Distribute",
    icon: Globe2,
    title: "Miami MLS & Syndication Reach",
    copy: "Eligible listings enter the Miami and South Florida REALTORS® MLS ecosystem with syndication across 260+ U.S. MLSs via RPR and 200+ international portals in 19 languages.",
    outcome: "Maximum cooperating agent & cross-border visibility",
  },
  {
    step: "04",
    label: "Negotiate",
    icon: Scale,
    title: "Contract Terms & Escrow Defense",
    copy: "With 25 years of local contract acumen, we protect your deposit timelines, negotiate complex inspection responses, and secure transition terms like post-occupancy leasebacks.",
    outcome: "Deal certainty & escrow protection",
  },
] as const;

const VERIFIED_INFRASTRUCTURE = [
  {
    value: "93,000",
    label: "Association Members",
    sublabel: "Miami & South Florida REALTORS®",
    desc: "Scale that supports active broker-to-broker cooperation across South Florida.",
  },
  {
    value: "200+",
    label: "Global Consumer Portals",
    sublabel: "19 Languages",
    desc: "Syndicated international discovery for eligible residential properties.",
  },
  {
    value: "260+",
    label: "U.S. MLSs via RPR",
    sublabel: "Professional Data Exchange",
    desc: "Direct property visibility across major domestic relocation corridors.",
  },
  {
    value: "19",
    label: "Florida Office Locations",
    sublabel: "United Realty Group Network",
    desc: "Regional brokerage support with 3,500+ Florida licensed professionals.",
  },
] as const;

export function SellerSellingSystem() {
  return (
    <div className="border-t border-hairline bg-white">
      {/* ── Section 2: The 4-Stage Selling System ──────────────────────────── */}
      <section id="selling-system-details" className="py-16 md:py-24" aria-labelledby="selling-system-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-ink font-semibold">
              The 4-Stage Listing Architecture
            </p>
            <h2 id="selling-system-heading" className="mt-3 font-serif text-3xl text-navy-deep sm:text-4xl md:text-5xl tracking-tight">
              Position. Present. Distribute. Negotiate.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-navy/75 md:text-lg">
              Every home enters the same market. What determines your net outcome is disciplined pre-market preparation, professional MLS distribution, and peer negotiation.
            </p>
          </div>

          {/* 4 Execution Cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {EXECUTION_STAGES.map(({ step, label, icon: Icon, title, copy, outcome }) => (
              <article
                key={step}
                className="flex flex-col justify-between rounded-lg border border-bone bg-ivory/50 p-7 shadow-sm transition-all duration-300 hover:border-gold hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-light text-gold-ink">{step}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold-ink border border-hairline">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60 font-semibold">
                    {label}
                  </p>
                  <h3 className="mt-2 font-serif text-xl text-navy-deep font-normal leading-snug">
                    {title}
                  </h3>
                  <p className="mt-3 font-sans text-xs sm:text-sm leading-relaxed text-navy/75">
                    {copy}
                  </p>
                </div>
                <div className="mt-6 border-t border-hairline pt-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-navy/60 font-medium">
                    Seller Outcome
                  </p>
                  <p className="mt-1 font-sans text-xs font-semibold text-navy-deep">
                    {outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Compact Verified Infrastructure Proof Strip */}
          <div className="mt-12 rounded-lg border border-gold/30 bg-navy-deep p-6 text-white md:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                  Verified Distribution Infrastructure
                </p>
                <h3 className="mt-1 font-serif text-xl sm:text-2xl text-white">
                  Institutional Exposure Through United Realty Group
                </h3>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                Miami and South Florida REALTORS® Ecosystem
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {VERIFIED_INFRASTRUCTURE.map((item) => (
                <div key={item.label} className="border-l-2 border-gold/40 pl-4 py-1">
                  <div className="font-serif text-3xl font-light text-gold md:text-4xl">
                    {item.value}
                  </div>
                  <div className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-white">
                    {item.label}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gold/70">
                    {item.sublabel}
                  </div>
                  <p className="mt-2 font-sans text-[11px] leading-relaxed text-white/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
              </span>
              <a
                href="#contact"
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold underline underline-offset-2 hover:text-gold-soft transition-colors"
              >
                Request a Strategy Review for Your Property →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: The Cooperating Market Reality (>90% of Deals) ───────── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24 text-white" aria-labelledby="cooperating-market-heading">
        <AuroraBackground variant="subtle" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <Radio size={16} className="text-gold" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
                The Cooperating Market Reality
              </p>
            </div>
            <h2 id="cooperating-market-heading" className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              More than 90% of buyers come through cooperating agents.<br />
              <span className="text-gold">Peer relationships and negotiation decide the outcome.</span>
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-white/75 md:text-lg">
              When a property is listed publicly in the MLS, the winning buyer offer almost always comes from another licensed agent representing the buyer. With 25 years of negotiating contracts in South Florida, Carlos leverages MLS reverse prospecting, prompt broker communication, and pre-packaged disclosures so cooperating agents can easily present, recommend, and defend your home to qualified buyers.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Card 1: What Cooperating Buyer Agents Need */}
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-7 md:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/30">
                  <CheckCircle2 size={18} />
                </div>
                <h3 className="font-serif text-xl text-white">What Cooperating Buyer Agents Need</h3>
              </div>
              <ul className="mt-6 space-y-3.5 font-sans text-sm text-white/75">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Accurate MLS positioning:</strong> Precise property specifications, clear broker remarks, and uncompromised data integrity.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Frictionless showing access:</strong> Fast response to agent showing requests and transparent instructions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Pre-packaged documentation:</strong> HOA disclosures, improvement logs, and seller survey ready for immediate buyer review.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Professional peer coordination:</strong> 25 years of mutual respect and established reputation with South Florida agents.</span>
                </li>
              </ul>
            </div>

            {/* Card 2: How It Protects the Seller's Outcome */}
            <div className="rounded-lg border border-gold/30 bg-white/[0.04] p-7 md:p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 border-b border-gold/30 pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy-deep">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="font-serif text-xl text-white">How It Protects Your Net Outcome</h3>
              </div>
              <ul className="mt-6 space-y-3.5 font-sans text-sm text-white/75">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Qualified offer validation:</strong> Rigorous review of buyer proof of funds, lender pre-approval, and earnest money deposits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Contract term structuring:</strong> Tailored negotiation of post-occupancy agreements and closing timelines to protect your relocation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Inspection &amp; appraisal defense:</strong> Factual comparable sales evidence prepared to counter aggressive renegotiation attempts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold flex-shrink-0" />
                  <span><strong>Strict timeline enforcement:</strong> Active escrow tracking and contingency monitoring to eliminate closing surprises.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
