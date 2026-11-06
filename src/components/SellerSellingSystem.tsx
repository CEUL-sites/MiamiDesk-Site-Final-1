import { useState, useRef, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Crosshair,
  FileCheck2,
  Film,
  Globe2,
  Layers,
  Map,
  Plane,
  Radio,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { AuroraBackground } from "./AuroraBackground";
import { CountUp } from "./CountUp";

const EXECUTION_STAGES = [
  {
    step: "01",
    label: "Position",
    icon: Crosshair,
    title: "Pricing Strategy & Net Math",
    tagline: "Verifiable comparable sales, active competition, and net-proceeds clarity before launch.",
    copy: "We analyze recent closed sales, competing active inventory, and net-proceeds scenarios before going live. Every price recommendation is grounded in verifiable comps.",
    bullets: [
      "Closed comps & price-per-sq-ft read",
      "Active competing inventory audit",
      "Itemized seller net-proceeds scenarios",
    ],
    outcome: "Defensible asking price & proceeds clarity",
    visual: "position" as const,
  },
  {
    step: "02",
    label: "Present",
    icon: FileCheck2,
    title: "Asset Preparation & Disclosure",
    tagline: "Architectural media and pre-packaged HOA/property disclosures ready on day one.",
    copy: "Architectural photography, cinematic tour, HOA estoppel packages, and disclosure documentation prepared in advance so cooperating buyer agents have immediate answers.",
    bullets: [
      "Architectural photo, drone & walkthrough film",
      "3D spatial twin & floor plan verification",
      "Pre-packaged HOA, roof & disclosure packet",
    ],
    outcome: "Frictionless showing & buyer confidence",
    visual: "present" as const,
  },
  {
    step: "03",
    label: "Distribute",
    icon: Globe2,
    title: "Miami MLS & Syndication Reach",
    tagline: "Structured activation across South Florida, U.S. relocation feeds, and global portals.",
    copy: "Eligible listings enter the Miami and South Florida REALTORS® MLS ecosystem with syndication across 260+ U.S. MLSs via RPR and 200+ international portals in 19 languages.",
    bullets: [
      "93,000-member association ecosystem",
      "260+ U.S. MLSs syndicated via RPR",
      "200+ global portals in 19 languages",
    ],
    outcome: "Maximum cooperating agent & cross-border visibility",
    visual: "distribute" as const,
  },
  {
    step: "04",
    label: "Negotiate",
    icon: Scale,
    title: "Contract Terms & Escrow Defense",
    tagline: "25 years of South Florida contract negotiation protecting your timing and net proceeds.",
    copy: "With 25 years of local contract acumen, we protect your deposit timelines, negotiate complex inspection responses, and secure transition terms like post-occupancy leasebacks.",
    bullets: [
      "Proof-of-funds & lender vetting",
      "Inspection & appraisal comp defense",
      "Post-occupancy & closing timeline protection",
    ],
    outcome: "Deal certainty & escrow protection",
    visual: "negotiate" as const,
  },
] as const;

const MEDIA_PREVIEWS = [
  {
    id: "film",
    label: "Cinema Walkthrough",
    icon: Film,
    clip: "/videos/luxury_home_walkthrough.mp4",
    poster: "/images/posters/luxury_home_walkthrough-20261012.jpg",
    caption: "Editorial walkthrough paced to how a qualified buyer tours the home.",
  },
  {
    id: "aerial",
    label: "Aerial & Lot Context",
    icon: Plane,
    clip: "/videos/luxury_waterfront_drone.mp4",
    poster: "/images/posters/luxury_waterfront_drone-20261012.jpg",
    caption: "Lot orientation, waterfrontage, and neighborhood corridor context.",
  },
  {
    id: "tour",
    label: "3D Spatial Tour",
    icon: Layers,
    clip: "/videos/matterport_tour_2.mp4",
    poster: "/images/posters/matterport_tour_2-20261012.jpg",
    caption: "Interactive 3D verification for relocating and international buyers.",
  },
  {
    id: "global",
    label: "Global Presentation",
    icon: Map,
    clip: "/videos/waterfront_house_global_reach.mp4",
    poster: "/images/posters/waterfront_house_global_reach-20261012.jpg",
    caption: "Multilingual syndication presentation across eligible global portals.",
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

const COOPERATING_LEVERS = [
  {
    id: "positioning",
    step: "01",
    label: "MLS Data & Positioning",
    agentNeedTitle: "Accurate MLS positioning",
    agentNeedCopy: "Precise property specifications, clear broker remarks, and uncompromised data integrity.",
    sellerOutcomeTitle: "Qualified offer validation",
    sellerOutcomeCopy: "Rigorous review of buyer proof of funds, lender pre-approval, and earnest money deposits.",
  },
  {
    id: "showings",
    step: "02",
    label: "Showing & Timeline Control",
    agentNeedTitle: "Frictionless showing access",
    agentNeedCopy: "Fast response to agent showing requests and transparent instructions.",
    sellerOutcomeTitle: "Contract term structuring",
    sellerOutcomeCopy: "Tailored negotiation of post-occupancy agreements and closing timelines to protect your relocation.",
  },
  {
    id: "disclosures",
    step: "03",
    label: "Disclosures & Appraisal Defense",
    agentNeedTitle: "Pre-packaged documentation",
    agentNeedCopy: "HOA disclosures, improvement logs, and seller survey ready for immediate buyer review.",
    sellerOutcomeTitle: "Inspection & appraisal defense",
    sellerOutcomeCopy: "Factual comparable sales evidence prepared to counter aggressive renegotiation attempts.",
  },
  {
    id: "coordination",
    step: "04",
    label: "Peer Relations & Escrow",
    agentNeedTitle: "Professional peer coordination",
    agentNeedCopy: "25 years of mutual respect and established reputation with South Florida agents.",
    sellerOutcomeTitle: "Strict timeline enforcement",
    sellerOutcomeCopy: "Active escrow tracking and contingency monitoring to eliminate closing surprises.",
  },
] as const;

export function SellerSellingSystem() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeMedia, setActiveMedia] = useState(0);
  const [activeLever, setActiveLever] = useState(0);
  const stageRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleStageKey = (event: KeyboardEvent) => {
    let next = activeStage;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (activeStage + 1) % EXECUTION_STAGES.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (activeStage + EXECUTION_STAGES.length - 1) % EXECUTION_STAGES.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = EXECUTION_STAGES.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActiveStage(next);
    stageRefs.current[next]?.focus();
  };

  const currentMedia = MEDIA_PREVIEWS[activeMedia];
  const currentLever = COOPERATING_LEVERS[activeLever];

  return (
    <div className="border-t border-hairline bg-white">
      {/* ── Section 2: Interactive 4-Stage Selling System ───────────────────── */}
      <section id="selling-system-details" className="py-16 md:py-24" aria-labelledby="selling-system-heading">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-ink font-semibold">
                The 4-Stage Listing Architecture
              </p>
              <h2 id="selling-system-heading" className="mt-3 font-serif text-3xl text-navy-deep sm:text-4xl md:text-5xl tracking-tight">
                Position. Present. Distribute. Negotiate.
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm leading-relaxed text-navy/75">
              Select any stage below to inspect how pre-market preparation, MLS distribution, and contract defense protect your net outcome.
            </p>
          </div>

          {/* Interactive 4-Stage Selector Bar */}
          <div
            role="tablist"
            aria-label="4-stage selling system"
            onKeyDown={handleStageKey}
            className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            {EXECUTION_STAGES.map(({ step, label, icon: Icon, title, outcome }, index) => {
              const selected = activeStage === index;
              return (
                <button
                  key={step}
                  ref={(el) => {
                    stageRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`sell-stage-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`sell-stage-panel-${index}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveStage(index)}
                  className={`group flex flex-col justify-between rounded-xl border p-5 text-left transition-all duration-300 ${
                    selected
                      ? "border-gold bg-navy-deep text-white shadow-xl"
                      : "border-bone bg-ivory/60 text-navy-deep hover:border-gold/60 hover:bg-white"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`font-serif text-2xl font-light ${selected ? "text-gold" : "text-gold-ink"}`}>
                        {step}
                      </span>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                          selected
                            ? "border-gold/40 bg-gold/15 text-gold"
                            : "border-hairline bg-white text-gold-ink"
                        }`}
                      >
                        <Icon size={16} aria-hidden="true" />
                      </span>
                    </div>
                    <p className={`mt-3 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold ${selected ? "text-gold" : "text-navy/60"}`}>
                      {label}
                    </p>
                    <h3 className={`mt-1.5 font-serif text-lg font-normal leading-snug ${selected ? "text-white" : "text-navy-deep"}`}>
                      {title}
                    </h3>
                  </div>
                  <div className={`mt-4 border-t pt-2.5 font-mono text-[9px] uppercase tracking-[0.12em] ${selected ? "border-white/15 text-gold" : "border-hairline text-navy/60"}`}>
                    {outcome}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Stage Detail Panel */}
          <div className="mt-6">
            {EXECUTION_STAGES.map((stage, index) => {
              const selected = activeStage === index;
              const Icon = stage.icon;
              return (
                <div
                  key={stage.step}
                  role="tabpanel"
                  id={`sell-stage-panel-${index}`}
                  aria-labelledby={`sell-stage-tab-${index}`}
                  hidden={!selected}
                  inert={!selected ? true : undefined}
                  className="rounded-xl border border-gold/35 bg-navy-deep p-6 text-white shadow-xl sm:p-8"
                >
                  <div className="grid gap-8 lg:grid-cols-12 items-center">
                    {/* Left Summary & 3 Check Pills (5 cols) */}
                    <div className="lg:col-span-5">
                      <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                        <Icon size={13} aria-hidden="true" />
                        Stage {stage.step} · {stage.label}
                      </div>
                      <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">
                        {stage.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-white/80">
                        {stage.tagline}
                      </p>

                      <div className="mt-5 space-y-2.5">
                        {stage.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5"
                          >
                            <Check size={14} className="shrink-0 text-gold" aria-hidden="true" />
                            <span className="font-sans text-xs text-white/90">{bullet}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                            Seller Outcome
                          </p>
                          <p className="mt-0.5 font-sans text-xs font-semibold text-gold">
                            {stage.outcome}
                          </p>
                        </div>
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-1.5 rounded bg-gold px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-navy-deep hover:bg-gold-soft"
                        >
                          Start Review <ArrowRight size={12} aria-hidden="true" />
                        </a>
                      </div>

                      <p className="sr-only">{stage.copy}</p>
                    </div>

                    {/* Right Interactive Visual Stage (7 cols) */}
                    <div className="lg:col-span-7">
                      {stage.visual === "position" && (
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-lg border border-white/12 bg-white/[0.04] p-4">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">01 · Comps</p>
                            <p className="mt-2 font-serif text-lg text-white">Closed Evidence</p>
                            <p className="mt-1 font-sans text-xs text-white/70">
                              Line-by-line adjustments for lot, view, condition, and recent community closings.
                            </p>
                          </div>
                          <div className="rounded-lg border border-white/12 bg-white/[0.04] p-4">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">02 · Inventory</p>
                            <p className="mt-2 font-serif text-lg text-white">Active Competition</p>
                            <p className="mt-1 font-sans text-xs text-white/70">
                              Position against current active listings so buyers see clear relative value.
                            </p>
                          </div>
                          <div className="rounded-lg border border-gold/30 bg-gold/10 p-4">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">03 · Net Sheet</p>
                            <p className="mt-2 font-serif text-lg text-white">Proceeds Math</p>
                            <p className="mt-1 font-sans text-xs text-white/80">
                              Documentary stamps, title, HOA prorations, and net equity calculated upfront.
                            </p>
                            <a
                              href="#net-calculator"
                              className="mt-3 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold underline"
                            >
                              Open Calculator ↓
                            </a>
                          </div>
                        </div>
                      )}

                      {stage.visual === "present" && (
                        <div>
                          <div className="flex flex-wrap gap-2" role="group" aria-label="Media preview selector">
                            {MEDIA_PREVIEWS.map((m, mIdx) => {
                              const MIcon = m.icon;
                              const isCurrent = activeMedia === mIdx;
                              return (
                                <button
                                  key={m.id}
                                  type="button"
                                  onClick={() => setActiveMedia(mIdx)}
                                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                                    isCurrent
                                      ? "border-gold bg-gold text-navy-deep font-bold"
                                      : "border-white/15 bg-white/[0.04] text-white/80 hover:border-gold/50"
                                  }`}
                                >
                                  <MIcon size={13} aria-hidden="true" />
                                  {m.label}
                                </button>
                              );
                            })}
                          </div>
                          <div className="mt-3 overflow-hidden rounded-lg border border-white/15 bg-black/50">
                            <div className="relative aspect-video w-full">
                              <video
                                key={currentMedia.clip}
                                src={currentMedia.clip}
                                poster={currentMedia.poster}
                                controls
                                preload="none"
                                playsInline
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex items-center justify-between bg-[#071321] px-4 py-2 text-xs text-white/80">
                              <span>{currentMedia.caption}</span>
                              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
                                Preview
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {stage.visual === "distribute" && (
                        <div className="grid grid-cols-2 gap-3">
                          {VERIFIED_INFRASTRUCTURE.map((item) => (
                            <div
                              key={item.label}
                              className="rounded-lg border border-white/12 bg-white/[0.04] p-4"
                            >
                              <div className="font-serif text-2xl text-gold sm:text-3xl">
                                <CountUp value={item.value} />
                              </div>
                              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white font-semibold">
                                {item.label}
                              </div>
                              <p className="mt-1 font-sans text-[11px] leading-snug text-white/70">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {stage.visual === "negotiate" && (
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div className="rounded-lg border border-white/12 bg-white/[0.04] p-4">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">Gate 01</p>
                            <p className="mt-2 font-serif text-lg text-white">Buyer Vetting</p>
                            <p className="mt-1 font-sans text-xs text-white/70">
                              Verify proof of funds, DU lender approval, and deposit strength before signing.
                            </p>
                          </div>
                          <div className="rounded-lg border border-white/12 bg-white/[0.04] p-4">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">Gate 02</p>
                            <p className="mt-2 font-serif text-lg text-white">Appraisal Defense</p>
                            <p className="mt-1 font-sans text-xs text-white/70">
                              Meet appraisers and inspectors with documented upgrades and verified comps.
                            </p>
                          </div>
                          <div className="rounded-lg border border-gold/30 bg-gold/10 p-4">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">Gate 03</p>
                            <p className="mt-2 font-serif text-lg text-white">Post-Occupancy</p>
                            <p className="mt-1 font-sans text-xs text-white/80">
                              Structure written leaseback or transition windows around your next closing.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compact Verified Infrastructure Proof Strip */}
          <div className="mt-8 rounded-xl border border-gold/30 bg-navy-deep p-6 text-white md:p-7">
            <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 md:flex-row md:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">
                  Verified Distribution Infrastructure
                </p>
                <h3 className="mt-1 font-serif text-xl text-white">
                  Institutional Exposure Through United Realty Group
                </h3>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                Miami and South Florida REALTORS® Ecosystem
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 md:gap-6">
              {VERIFIED_INFRASTRUCTURE.map((item) => (
                <div key={item.label} className="border-l-2 border-gold/40 pl-4 py-0.5">
                  <div className="font-serif text-2xl font-light text-gold md:text-3xl">
                    <CountUp value={item.value} />
                  </div>
                  <div className="mt-0.5 font-sans text-xs font-semibold uppercase tracking-wider text-white">
                    {item.label}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-gold/70">
                    {item.sublabel}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
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

      {/* ── Section 3: Interactive Cooperating Market Comparator (>90% of Deals) ── */}
      <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24 text-white" aria-labelledby="cooperating-market-heading">
        <AuroraBackground variant="subtle" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2">
                <Radio size={16} className="text-gold" />
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
                  The Cooperating Market Reality
                </p>
              </div>
              <h2 id="cooperating-market-heading" className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
                More than 90% of buyers come through cooperating agents.<br />
                <span className="text-gold">Peer relationships and negotiation decide the outcome.</span>
              </h2>
            </div>
            <p className="max-w-sm font-sans text-sm leading-relaxed text-white/75">
              Tap each deal lever below to see how equipping the buyer’s agent directly protects your net proceeds.
            </p>
          </div>

          {/* Interactive 4-Lever Selector */}
          <div
            role="tablist"
            aria-label="Cooperating market levers"
            className="mt-8 grid grid-cols-2 gap-2.5 lg:grid-cols-4"
          >
            {COOPERATING_LEVERS.map((lever, idx) => {
              const selected = activeLever === idx;
              return (
                <button
                  key={lever.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveLever(idx)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    selected
                      ? "border-gold bg-gold text-navy-deep shadow-lg"
                      : "border-white/12 bg-white/[0.04] text-white hover:border-gold/50"
                  }`}
                >
                  <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.16em] ${selected ? "text-navy-deep" : "text-gold"}`}>
                    Lever {lever.step}
                  </p>
                  <p className={`mt-1 font-serif text-base leading-snug ${selected ? "text-navy-deep font-semibold" : "text-white"}`}>
                    {lever.label}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Side-by-Side Interactive Comparison Stage */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Left Card: What Cooperating Buyer Agents Need */}
            <div className="rounded-xl border border-white/12 bg-white/[0.04] p-6 md:p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/30">
                    <CheckCircle2 size={18} />
                  </div>
                  <h3 className="font-serif text-xl text-white">What Cooperating Buyer Agents Need</h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  Lever {currentLever.step}
                </span>
              </div>
              <div className="mt-5">
                <p className="font-serif text-2xl text-gold">{currentLever.agentNeedTitle}</p>
                <p className="mt-2 font-sans text-base leading-relaxed text-white/85">
                  {currentLever.agentNeedCopy}
                </p>
              </div>
            </div>

            {/* Right Card: How It Protects Your Net Outcome */}
            <div className="rounded-xl border border-gold/35 bg-white/[0.06] p-6 md:p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-gold/30 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-navy-deep">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="font-serif text-xl text-white">How It Protects Your Net Outcome</h3>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                  Seller Protection
                </span>
              </div>
              <div className="mt-5">
                <p className="font-serif text-2xl text-white">{currentLever.sellerOutcomeTitle}</p>
                <p className="mt-2 font-sans text-base leading-relaxed text-white/85">
                  {currentLever.sellerOutcomeCopy}
                </p>
              </div>
            </div>
          </div>

          {/* Preserve full list in sr-only for SEO/prerender completeness */}
          <ul className="sr-only">
            {COOPERATING_LEVERS.map((l) => (
              <li key={l.id}>
                {l.agentNeedTitle}: {l.agentNeedCopy} — {l.sellerOutcomeTitle}: {l.sellerOutcomeCopy}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
