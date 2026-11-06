import { useState } from "react";
import { ArrowRight, Check, Compass, Globe2, Handshake, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { trackFunnelEvent } from "../lib/analytics";

const OBJECTIVES = [
  {
    id: "sell",
    badge: "Primary Advisory Focus",
    eyebrow: "Seller Representation",
    tabLabel: "Sell in South Florida",
    title: "Sell in South Florida",
    icon: Home,
    image: "/images/sellers-waterfront-20260904.webp",
    imageAlt: "South Florida waterfront property",
    headline: "Private pricing read, net-proceeds math, and cooperating agent strategy.",
    copy: "Request a private review of your property's price position, competing inventory, estimated net proceeds, and cooperating buyer-agent strategy across Broward, Miami-Dade, and Palm Beach.",
    pills: [
      "Broward · Miami-Dade · Palm Beach",
      "Estimated Net Proceeds Modeling",
      "93,000-Member Ecosystem Access",
    ],
    primaryCta: {
      label: "Request Private Strategy Review",
      href: "#list-here",
      isAnchor: true,
    },
    quickLinks: [
      { label: "Our Approach →", to: "/sell" },
      { label: "Home Valuation →", to: "/home-value" },
      { label: "Market Data →", to: "/market-data" },
    ],
  },
  {
    id: "buy",
    badge: "Relocation & Acquisition",
    eyebrow: "Buyer Advisory",
    tabLabel: "Buy or Relocate",
    title: "Buy or Relocate",
    icon: Compass,
    image: "/images/carlos-media-team-editorial-20261012.jpg",
    imageAlt: "Carlos Uzcategui with clients",
    headline: "Curated MLS search, insurability review, and disciplined offer negotiation.",
    copy: "Curated MLS search, neighborhood and school analysis, and disciplined contract negotiation for local and relocating buyers.",
    pills: [
      "School & Neighborhood Corridors",
      "HOA & Milestone Inspection Review",
      "Bilingual English / Español",
    ],
    primaryCta: {
      label: "Explore Buyer Representation",
      href: "/buy",
      isAnchor: false,
    },
    quickLinks: [
      { label: "Search Live MLS →", to: "/listings" },
      { label: "New Construction →", to: "/new-construction" },
      { label: "South Florida Markets →", to: "/markets" },
    ],
  },
  {
    id: "global",
    badge: "Bilateral Spain & LATAM Bridge",
    eyebrow: "Global Desk",
    tabLabel: "International Property",
    title: "International Property",
    icon: Globe2,
    image: "/images/madrid-gran-via-editorial.webp",
    imageAlt: "Madrid Gran Via architecture",
    headline: "Position eligible Spanish and international prime inventory on the Miami MLS.",
    copy: "For international owners and agencies: position eligible Spanish and European prime inventory on the Miami MLS for South Florida cooperating agents and cross-border buyers.",
    pills: [
      "You Retain Your Local Mandate",
      "Florida Licensed Principal SL705771",
      "Madrid · Marbella · Latin America",
    ],
    primaryCta: {
      label: "Explore Miami Global Desk",
      href: "/global-desk",
      isAnchor: false,
    },
    quickLinks: [
      { label: "Spain MLS Listing →", to: "/spain-mls-listing" },
      { label: "Vender en Madrid →", to: "/vender-madrid" },
      { label: "Vender en Marbella →", to: "/vender-marbella" },
    ],
  },
  {
    id: "agents",
    badge: "Broker-to-Broker",
    eyebrow: "Cooperating Agents",
    tabLabel: "Refer a Client",
    title: "Licensed Agent Referrals",
    icon: Handshake,
    image: "/images/carlos-waterfront-editorial-20261012.jpg",
    imageAlt: "Carlos Uzcategui at the Miami waterfront",
    headline: "Written referral protection and bilateral co-listing for domestic and global agents.",
    copy: "Refer a South Florida buyer or seller with documented referral terms agreed in writing before any client introduction.",
    pills: [
      "Written Fee Protection",
      "Direct Principal Execution",
      "3,500+ URG Agent Network",
    ],
    primaryCta: {
      label: "Open Agent Partner Desk",
      href: "/agents",
      isAnchor: false,
    },
    quickLinks: [
      { label: "Register a Referral →", to: "/agents#south-florida-referral" },
      { label: "Co-List International Property →", to: "/agents#submit-listing" },
    ],
  },
] as const;

const TIMELINES = [
  {
    id: "ready",
    label: "Ready in 30–60 Days",
    note: "Direct priority: immediate comps, net sheet, and private strategy call with Carlos.",
  },
  {
    id: "comparing",
    label: "Comparing Options (3–6 Mo)",
    note: "Evidence first: benchmark active competition, HOA/tax math, and preparation scope.",
  },
  {
    id: "exploring",
    label: "Early Planning",
    note: "Zero commitment: get a baseline valuation and timing read before making any move.",
  },
] as const;

export function HomepageObjectives() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(0);

  const selectObjective = (index: number) => {
    setActiveTab(index);
    if (typeof navigator === "undefined" || !navigator.webdriver) {
      trackFunnelEvent("objective_lens_select", { objective: OBJECTIVES[index].id });
    }
  };

  return (
    <section
      id="property-objectives"
      aria-labelledby="property-objectives-heading"
      className="border-t border-hairline bg-ivory py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-ink font-semibold">
              Choose Your Property Objective
            </p>
            <h2
              id="property-objectives-heading"
              className="mt-3 font-serif text-3xl text-navy-deep sm:text-4xl md:text-5xl tracking-tight"
            >
              Focused Advisory for Your Next Decision.
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-navy/75">
            Select your objective and timeline below for the direct route that fits your situation.
          </p>
        </div>

        {/* Step 1: Interactive Objective Selector Tabs */}
        <div
          role="tablist"
          aria-label="Property objectives"
          className="mt-8 grid grid-cols-2 gap-2.5 lg:grid-cols-4"
        >
          {OBJECTIVES.map((obj, idx) => {
            const Icon = obj.icon;
            const selected = activeTab === idx;
            return (
              <button
                key={obj.id}
                type="button"
                role="tab"
                id={`obj-tab-${obj.id}`}
                aria-selected={selected}
                aria-controls={`obj-panel-${obj.id}`}
                onClick={() => selectObjective(idx)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  selected
                    ? "border-gold bg-navy-deep text-white shadow-lg"
                    : "border-bone bg-white text-navy-deep hover:border-gold/60"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                    selected
                      ? "border-gold/40 bg-gold/15 text-gold"
                      : "border-hairline bg-ivory text-gold-ink"
                  }`}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p
                    className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
                      selected ? "text-gold" : "text-navy/60"
                    }`}
                  >
                    0{idx + 1} · {obj.eyebrow}
                  </p>
                  <p className="mt-0.5 truncate font-serif text-base font-normal">
                    {obj.tabLabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step 2: Interactive Showcase Stage (All panels in DOM for SEO/prerender) */}
        <div className="mt-6">
          {OBJECTIVES.map((obj, idx) => {
            const selected = activeTab === idx;
            const Icon = obj.icon;
            return (
              <article
                key={obj.id}
                role="tabpanel"
                id={`obj-panel-${obj.id}`}
                aria-labelledby={`obj-tab-${obj.id}`}
                hidden={!selected}
                inert={!selected ? true : undefined}
                className="overflow-hidden rounded-xl border border-gold/40 bg-navy-deep text-white shadow-xl"
              >
                <div className="grid lg:grid-cols-12">
                  {/* Visual Column (5 cols) */}
                  <div className="relative min-h-[240px] overflow-hidden bg-black/40 lg:col-span-5">
                    <img
                      src={obj.image}
                      alt={obj.imageAlt}
                      className="h-full w-full object-cover"
                      width="1200"
                      height="675"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy-deep/90" />
                    <span className="absolute left-4 top-4 rounded bg-gold px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-navy-deep font-bold">
                      {obj.badge}
                    </span>
                  </div>

                  {/* Interactive Content Column (7 cols) */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
                    <div>
                      <div className="flex items-center gap-2 text-gold">
                        <Icon size={17} aria-hidden="true" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold">
                          {obj.eyebrow}
                        </span>
                      </div>

                      <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl font-normal leading-snug">
                        {obj.title}
                      </h3>

                      <p className="mt-2 font-sans text-sm leading-relaxed text-white/85 sm:text-base">
                        {obj.headline}
                      </p>

                      {/* 3 Visual Feature Pills */}
                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        {obj.pills.map((pill) => (
                          <div
                            key={pill}
                            className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2"
                          >
                            <Check size={13} className="shrink-0 text-gold" aria-hidden="true" />
                            <span className="font-mono text-[10px] tracking-[0.06em] text-white/90">
                              {pill}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Timeline Selector */}
                      <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                            Select Your Stage:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {TIMELINES.map((tl, tIdx) => (
                              <button
                                key={tl.id}
                                type="button"
                                onClick={() => setActiveTimeline(tIdx)}
                                className={`rounded px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors ${
                                  activeTimeline === tIdx
                                    ? "bg-gold text-navy-deep font-bold"
                                    : "bg-white/[0.06] text-white/75 hover:text-white"
                                }`}
                              >
                                {tl.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 font-sans text-xs text-white/80">
                          {TIMELINES[activeTimeline].note}
                        </p>
                      </div>

                      <p className="sr-only">{obj.copy}</p>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-6 flex flex-col justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
                      {obj.primaryCta.isAnchor ? (
                        <a
                          href={obj.primaryCta.href}
                          className="inline-flex items-center justify-center gap-2 rounded bg-gold px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
                        >
                          {obj.primaryCta.label} <ArrowRight size={14} aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          to={obj.primaryCta.href}
                          className="inline-flex items-center justify-center gap-2 rounded bg-gold px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-gold-soft"
                        >
                          {obj.primaryCta.label} <ArrowRight size={14} aria-hidden="true" />
                        </Link>
                      )}

                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/70">
                        {obj.quickLinks.map((link) => (
                          <Link
                            key={link.to}
                            to={link.to}
                            className="hover:text-gold transition-colors"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
