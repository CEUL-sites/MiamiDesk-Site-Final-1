import { useState, useRef, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Check,
  Crosshair,
  Film,
  Globe2,
  Layers,
  Map,
  Plane,
  Radio,
  Sparkles,
} from "lucide-react";
import { fig } from "../data/figures";
import { CountUp } from "./CountUp";

const PILLARS = [
  {
    step: "01",
    label: "Position",
    icon: Crosshair,
    title: "Price & Story Before Launch",
    tagline: "Data-grounded pricing and architectural media prepared before day one.",
    copy: "We review closed comparable sales, active competition, and net proceeds scenarios, then prepare architectural photography, cinematic film, and property narrative before going live.",
    highlights: [
      "Closed-sale & active competition read",
      "Estimated net proceeds modeling",
      "Architectural photo, film & 3D staging",
    ],
    outcome: "Defensible pricing & strong first impression",
    visualType: "media" as const,
  },
  {
    step: "02",
    label: "Distribute",
    icon: Globe2,
    title: "MLS & International Channels",
    tagline: "Structured syndication across South Florida, U.S. relocation corridors, and global portals.",
    copy: "Eligible listings enter the South Florida MLS ecosystem and syndicate across national RPR exchanges and international consumer portals in 19 languages.",
    highlights: [
      "93,000-member association ecosystem",
      "260+ U.S. MLSs connected via RPR",
      "200+ global portals in 19 languages",
    ],
    outcome: "Local, relocation & cross-border discovery",
    visualType: "network" as const,
  },
  {
    step: "03",
    label: "Activate",
    icon: Radio,
    title: "Buyer-Agent Relations & Reverse Prospecting",
    tagline: "Direct outreach to cooperating agents representing matched, qualified buyers.",
    copy: "More than 90% of buyers are brought by cooperating agents. With 25 years of South Florida contract negotiation and peer relationships, we leverage MLS reverse prospecting and professional coordination to engage agents with matched, qualified buyers.",
    highlights: [
      ">90% of MLS sales involve cooperating agents",
      "Targeted MLS reverse prospecting",
      "Inspection, appraisal & escrow defense",
    ],
    outcome: "Expert contract negotiation & deal protection",
    visualType: "activation" as const,
  },
] as const;

const MEDIA_MODES = [
  {
    id: "film",
    label: "Cinema Walkthrough",
    icon: Film,
    clip: "/videos/luxury_home_walkthrough.mp4",
    poster: "/images/posters/luxury_home_walkthrough-20261012.jpg",
    caption: "Paced to how a qualified buyer experiences the residence.",
  },
  {
    id: "aerial",
    label: "Drone & Lot Context",
    icon: Plane,
    clip: "/videos/luxury_waterfront_drone.mp4",
    poster: "/images/posters/luxury_waterfront_drone-20261012.jpg",
    caption: "Waterfrontage, lot orientation, and neighborhood corridor in one view.",
  },
  {
    id: "tour",
    label: "3D Spatial Twin",
    icon: Layers,
    clip: "/videos/matterport_tour_2.mp4",
    poster: "/images/posters/matterport_tour_2-20261012.jpg",
    caption: "Remote walk-through verification for out-of-state and international buyers.",
  },
  {
    id: "global",
    label: "Global Syndication",
    icon: Map,
    clip: "/videos/waterfront_house_global_reach.mp4",
    poster: "/images/posters/waterfront_house_global_reach-20261012.jpg",
    caption: "Multilingual presentation across eligible international portals.",
  },
] as const;

const INFRA_METRICS = [
  {
    id: "members",
    value: fig("members"),
    label: "Association Members",
    sub: "Miami & South Florida REALTORS®",
    detail: "Cooperating buyer-agent ecosystem across Miami-Dade, Broward, and Palm Beach.",
  },
  {
    id: "usMls",
    value: fig("usMls"),
    label: "U.S. MLSs via RPR",
    sub: "National Relocation Feed",
    detail: "Professional property discovery across primary Northeast, Midwest, and West Coast wealth corridors.",
  },
  {
    id: "global",
    value: fig("globalWebsites"),
    label: "Global Portals (19 Lang)",
    sub: `${fig("internationalAgreements")} International Agreements`,
    detail: "Multilingual syndication for eligible listings across Spain, Latin America, and Europe.",
  },
  {
    id: "urg",
    value: fig("urgAgents"),
    label: `${fig("urgOfficeNetwork")} FL Office Locations`,
    sub: "United Realty Group Network",
    detail: "Statewide Florida brokerage footprint supporting local agent-to-agent coordination.",
  },
] as const;

export function HomepageListingApproach() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeMedia, setActiveMedia] = useState(0);
  const [activeMetric, setActiveMetric] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (event: KeyboardEvent) => {
    let next = activeStage;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (activeStage + 1) % PILLARS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (activeStage + PILLARS.length - 1) % PILLARS.length;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = PILLARS.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    setActiveStage(next);
    tabRefs.current[next]?.focus();
  };

  const currentMedia = MEDIA_MODES[activeMedia];

  return (
    <section
      id="listing-approach"
      aria-labelledby="listing-approach-heading"
      className="border-t border-hairline bg-ivory py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Compact Executive Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-ink font-semibold">
              Why Our Listing Approach
            </p>
            <h2
              id="listing-approach-heading"
              className="mt-3 font-serif text-3xl text-navy-deep sm:text-4xl md:text-5xl tracking-tight"
            >
              Position. Distribute. Activate.
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-navy/75">
            Select any stage below to inspect how Carlos Uzcategui structures pricing, media, and buyer-agent activation through United Realty Group.
          </p>
        </div>

        {/* Interactive 3-Stage Command Deck */}
        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8 items-stretch">
          {/* Left Column: Interactive Stage Selector Rail (5 cols) */}
          <div
            role="tablist"
            aria-label="Listing strategy stages"
            onKeyDown={handleKeyDown}
            className="flex flex-col justify-between gap-3 lg:col-span-5"
          >
            {PILLARS.map(({ step, label, icon: Icon, title, tagline, outcome }, index) => {
              const isSelected = activeStage === index;
              return (
                <button
                  key={step}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`approach-tab-${index}`}
                  aria-selected={isSelected}
                  aria-controls={`approach-panel-${index}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveStage(index)}
                  className={`group relative flex w-full flex-col justify-between rounded-xl border p-5 text-left transition-all duration-300 sm:p-6 ${
                    isSelected
                      ? "border-gold bg-navy-deep text-white shadow-xl"
                      : "border-bone bg-white text-navy-deep hover:border-gold/60 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-serif text-2xl font-light ${
                          isSelected ? "text-gold" : "text-gold-ink"
                        }`}
                      >
                        {step}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.22em] font-semibold ${
                          isSelected ? "text-gold" : "text-navy/60"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? "border-gold/40 bg-gold/15 text-gold"
                          : "border-hairline bg-ivory text-gold-ink group-hover:border-gold/40"
                      }`}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </div>
                  </div>

                  <h3
                    className={`mt-2.5 font-serif text-xl font-normal leading-snug ${
                      isSelected ? "text-white" : "text-navy-deep"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`mt-1.5 font-sans text-xs leading-relaxed ${
                      isSelected ? "text-white/80" : "text-navy/70"
                    }`}
                  >
                    {tagline}
                  </p>

                  <div
                    className={`mt-3 flex items-center justify-between border-t pt-2.5 font-mono text-[9px] uppercase tracking-[0.14em] ${
                      isSelected
                        ? "border-white/15 text-gold"
                        : "border-hairline text-navy/60"
                    }`}
                  >
                    <span>Outcome: {outcome}</span>
                    <ArrowRight
                      size={12}
                      className={`transition-transform ${
                        isSelected ? "translate-x-0.5 text-gold" : "opacity-40 group-hover:opacity-100"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Stage Visual & Action Panel (7 cols) */}
          <div className="lg:col-span-7 flex">
            {PILLARS.map((pillar, index) => {
              const isSelected = activeStage === index;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  role="tabpanel"
                  id={`approach-panel-${index}`}
                  aria-labelledby={`approach-tab-${index}`}
                  hidden={!isSelected}
                  inert={!isSelected ? true : undefined}
                  className="flex w-full flex-col justify-between rounded-xl border border-gold/35 bg-navy-deep p-6 text-white shadow-xl sm:p-8"
                >
                  <div>
                    {/* Stage Top Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-navy-deep font-mono text-[11px] font-bold">
                          {pillar.step}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                          Stage {pillar.step} · {pillar.label}
                        </span>
                      </div>
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-gold">
                        {pillar.outcome}
                      </span>
                    </div>

                    {/* Interactive Stage Content */}
                    {pillar.visualType === "media" && (
                      <div className="mt-5">
                        <div className="flex flex-wrap gap-2" role="group" aria-label="Preview media formats">
                          {MEDIA_MODES.map((mode, mIdx) => {
                            const ModeIcon = mode.icon;
                            const active = activeMedia === mIdx;
                            return (
                              <button
                                key={mode.id}
                                type="button"
                                onClick={() => setActiveMedia(mIdx)}
                                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                                  active
                                    ? "border-gold bg-gold text-navy-deep font-bold"
                                    : "border-white/15 bg-white/[0.04] text-white/80 hover:border-gold/50 hover:text-white"
                                }`}
                              >
                                <ModeIcon size={13} aria-hidden="true" />
                                {mode.label}
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-4 overflow-hidden rounded-lg border border-white/15 bg-black/50">
                          <div className="relative aspect-video w-full overflow-hidden">
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
                          <div className="flex items-center justify-between gap-3 bg-[#071321] px-4 py-2.5">
                            <p className="font-sans text-xs text-white/85">{currentMedia.caption}</p>
                            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
                              Click Play to Preview
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {pillar.visualType === "network" && (
                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2">
                        {INFRA_METRICS.map((m) => (
                          <div
                            key={m.id}
                            className="rounded-lg border border-white/12 bg-white/[0.04] p-4 transition-colors hover:border-gold/40"
                          >
                            <p className="font-serif text-2xl text-gold sm:text-3xl">
                              <CountUp value={m.value} />
                            </p>
                            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white font-semibold">
                              {m.label}
                            </p>
                            <p className="mt-1 font-sans text-[11px] leading-snug text-white/70">
                              {m.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {pillar.visualType === "activation" && (
                      <div className="mt-5 rounded-lg border border-gold/25 bg-white/[0.03] p-5">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                            Cooperating Buyer-Agent Reality
                          </span>
                          <span className="font-serif text-2xl text-gold">&gt;90%</span>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded border border-white/10 bg-navy/50 p-3">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">Step A</p>
                            <p className="mt-1 font-serif text-sm text-white">Reverse Prospecting</p>
                            <p className="mt-1 font-sans text-[11px] text-white/70">
                              Identify agents with active buyer searches matching your home.
                            </p>
                          </div>
                          <div className="rounded border border-white/10 bg-navy/50 p-3">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">Step B</p>
                            <p className="mt-1 font-serif text-sm text-white">Pre-Packaged Comps</p>
                            <p className="mt-1 font-sans text-[11px] text-white/70">
                              HOA disclosures, survey, and upgrades ready before showing.
                            </p>
                          </div>
                          <div className="rounded border border-white/10 bg-navy/50 p-3">
                            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">Step C</p>
                            <p className="mt-1 font-serif text-sm text-white">Contract Defense</p>
                            <p className="mt-1 font-sans text-[11px] text-white/70">
                              Protect net proceeds through inspection, appraisal, and closing.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3 Crisp Bullet Pills + Prerender Copy */}
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
                      {pillar.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
                        >
                          <Check size={14} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                          <span className="font-sans text-xs leading-snug text-white/90">{item}</span>
                        </div>
                      ))}
                    </div>

                    <p className="sr-only">{pillar.copy}</p>
                  </div>

                  {/* Stage Footer Action */}
                  <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-2 text-xs text-white/75">
                      <Icon size={15} className="text-gold shrink-0" aria-hidden="true" />
                      <span>Led by Carlos Uzcategui and team · FL SL705771</span>
                    </div>
                    <a
                      href="#list-here"
                      className="inline-flex items-center justify-center gap-2 rounded bg-gold px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
                    >
                      Request Strategy Review <ArrowRight size={13} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Verified Infrastructure Strip (Click-to-Inspect Metrics + Clean Disclosure) */}
        <div className="mt-8 rounded-xl border border-gold/30 bg-navy-deep p-5 text-white sm:p-7">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-2.5">
              <Sparkles size={15} className="text-gold shrink-0" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                Professional Distribution Infrastructure · Tap Any Metric to Inspect
              </p>
            </div>
            <details className="group text-xs text-white/65">
              <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 hover:text-gold">
                Eligibility &amp; Platform Terms ↓
              </summary>
              <p className="mt-2 max-w-2xl font-sans text-[11px] leading-relaxed text-white/60">
                Miami and South Florida REALTORS® ecosystem and United Realty Group Florida office network available to eligible listings. Infrastructure figures reflect published MIAMI REALTORS® and United Realty Group records. Distribution is subject to property eligibility, MLS rules, brokerage approval, and platform participation.
              </p>
            </details>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {INFRA_METRICS.map((m, idx) => {
              const selected = activeMetric === idx;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMetric(idx)}
                  aria-pressed={selected}
                  className={`rounded-lg border p-3.5 text-left transition-all ${
                    selected
                      ? "border-gold bg-white/[0.08] shadow-md"
                      : "border-white/10 bg-white/[0.02] hover:border-gold/40"
                  }`}
                >
                  <p className="font-serif text-2xl text-gold sm:text-3xl font-normal">
                    <CountUp value={m.value} />
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/85">
                    {m.label}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-col justify-between gap-2 rounded-lg bg-white/[0.04] px-4 py-2.5 sm:flex-row sm:items-center">
            <p className="font-sans text-xs text-white/85">
              <strong className="text-gold">{INFRA_METRICS[activeMetric].sub}:</strong>{" "}
              {INFRA_METRICS[activeMetric].detail}
            </p>
            <a
              href="#list-here"
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:underline"
            >
              Request Strategy Review <ArrowRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
