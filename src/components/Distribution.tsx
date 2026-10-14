import { motion } from "motion/react";
import { useState } from "react";
import { DistributionMetrics } from "./DistributionMetrics";
import { ArrowRight, Camera, Globe2, MessagesSquare, Radar, CheckCircle2, Share2 } from "lucide-react";
import { LazyVideo } from "./LazyVideo";
import { Tilt3D } from "./Tilt3D";

// Homepage-only merge of ReachAdvantage + ListingSystem — the structural
// argument made once, at full strength: what happens to the listing in the
// MLS ecosystem, then how the listing system executes on that placement.
// ReachAdvantage and ListingSystem remain unchanged for SellSouthFloridaPage,
// which still uses them as separate sections.

const ECOSYSTEM_CHANNELS = [
  {
    id: "regional",
    step: "01",
    title: "Regional MLS Ecosystem",
    scope: "South Florida Local Core",
    metrics: "93,000 Licensed Professionals",
    detail:
      "Direct entry on the Miami MLS positions your property in the daily operating workflow of 93,000 member agents across Miami-Dade, Broward, Palm Beach, and Martin counties.",
    connectorHighlight: "Daily working MLS search & direct reverse prospecting",
  },
  {
    id: "national",
    step: "02",
    title: "National MLS Exchange",
    scope: "United States Reciprocity",
    metrics: "260+ U.S. MLSs via RPR",
    detail:
      "Syndicated across 260+ U.S. MLS systems through Realtors Property Resource (RPR) and 11 direct North American MLS data exchanges for relocation buyer discovery.",
    connectorHighlight: "Direct interstate data exchange with top feeder markets",
  },
  {
    id: "global",
    step: "03",
    title: "Global Syndication & Bilateral Desk",
    scope: "International Capital Flow",
    metrics: "200+ Portals · 19 Languages",
    detail:
      "Automated worldwide syndication across 200+ international portals in 19 languages, supported by 437+ bilateral agreements across 75+ countries and Carlos's Madrid-Miami bridge.",
    connectorHighlight: "Multilingual listing ingestion & cross-border broker referrals",
  },
  {
    id: "brokerage",
    step: "04",
    title: "Brokerage Footprint & In-House Title",
    scope: "Florida Statewide Coordination",
    metrics: "3,500+ Agents · 19 Florida office locations",
    detail:
      "A coordinated network spanning 19 Florida office locations from Weston and Aventura to Boca Raton and Orlando, backed by in-house title oversight for transaction security.",
    connectorHighlight: "Internal agent network and private showing coordination",
  },
];

const PILLARS = [
  {
    icon: Camera,
    step: "01",
    title: "Media that earns the click",
    body:
      "Pro photography, cinematic video, and staging direction approved before launch. Media engineered to win buyer attention on the first frame.",
  },
  {
    icon: Globe2,
    step: "02",
    title: "Distribution beyond the MLS",
    body:
      "MLS positioning within the MIAMI REALTORS® + RWorld ecosystem, supported by targeted buyer-agent outreach and eligible syndication channels.",
  },
  {
    icon: Radar,
    step: "03",
    title: "Buyer-agent activation",
    body:
      "Targeted outreach to agents representing active buyers in your submarket and price band—local, relocation, and international.",
  },
  {
    icon: MessagesSquare,
    step: "04",
    title: "Weekly reporting, real strategy",
    body:
      "Weekly showing feedback and MLS analytics delivered by WhatsApp or email, with price adjustments guided by live market evidence.",
  },
];

export function Distribution() {
  const [activeChannel, setActiveChannel] = useState(0);

  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">

      {/* Cinematic reach backdrop */}
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.11]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/80 to-navy-deep" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[150px]" />

      {/* 3D Perspective ambient grid floor overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[650px] opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(176,141,87,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(176,141,87,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 20%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 20%, #000 60%, transparent 100%)",
        }}
      />

      {/* ── Header — the ecosystem-placement argument ──────────── */}
      <div className="relative border-b border-gold/15 px-6 py-10 text-center md:py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold"
        >
          Distribution · United Realty Group · Florida office network
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-4 max-w-5xl font-serif leading-[1.08] text-white md:mt-6"
          style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}
        >
          Your listing enters the professional MLS ecosystem<br />
          <em className="italic text-gold">used across South Florida.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/80 md:mt-6"
        >
          When a property lists under Carlos Uzcategui&apos;s mandate, it connects directly into the structural distribution framework of the world&apos;s largest local Realtor association. We position eligible listings for direct agent discovery across South Florida, syndicated nationally via RPR, and amplified through bilateral international agreements.
        </motion.p>

        {/* Association credential pill */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex flex-col items-center gap-3 md:mt-8"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-gold/30 bg-white/[0.04] px-5 py-2 backdrop-blur-md">
            <img
              src="/images/miami-realtors-logo.png"
              alt="MIAMI Association of REALTORS®"
              width="140"
              height="48"
              loading="lazy"
              className="h-7 w-auto opacity-90"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="hidden sm:inline-block h-3 w-px bg-gold/30" />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
              Powered by membership in the Miami and South Florida REALTORS®
            </p>
          </div>
        </motion.div>

        {/* ── 3D Visual Distribution Nexus & Skill Connectors ──── */}
        <div className="mx-auto mt-10 max-w-5xl md:mt-14">
          {/* Central Origin Node */}
          <div className="relative mx-auto flex w-fit items-center gap-3 rounded-full border border-gold/50 bg-gradient-to-r from-navy-deep via-[#0d2244] to-navy-deep px-6 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(212,175,55,0.4)] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Listing Origin · Central Distribution Nexus
            </span>
            <span className="rounded bg-gold/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-soft">
              Active Network
            </span>
          </div>

          {/* 3D Connector Rails / SVG Conduits */}
          <div aria-hidden="true" className="hidden lg:block relative h-12 w-full mt-2">
            <svg className="w-full h-full stroke-gold/45" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 48">
              <path d="M 500 0 C 500 24, 166 24, 166 48" strokeWidth="1.5" className="opacity-70" />
              <path d="M 500 0 L 500 48" strokeWidth="1.5" className="opacity-90" />
              <path d="M 500 0 C 500 24, 833 24, 833 48" strokeWidth="1.5" className="opacity-70" />
              <circle cx="500" cy="0" r="3.5" fill="#B08D57" />
              <circle cx="166" cy="48" r="3.5" fill="#B08D57" />
              <circle cx="500" cy="48" r="3.5" fill="#B08D57" />
              <circle cx="833" cy="48" r="3.5" fill="#B08D57" />
            </svg>
          </div>
        </div>

        {/* ── 3D Distribution Metrics Grid ──────────────────── */}
        <div className="relative mx-auto max-w-6xl mt-4 px-2 sm:px-6">
          <DistributionMetrics dark />
        </div>
      </div>

      {/* ── Interactive 4-Channel Distribution Explorer ──────── */}
      <div className="relative mx-auto max-w-6xl border-b border-gold/15 px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">Distribution Channels</p>
            <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">
              Four synchronized paths to qualified buyers.
            </h3>
          </div>
          <p className="font-sans text-xs text-white/60 max-w-md">
            Property attributes explain the asset; multi-channel distribution creates the competitive market tension that drives final contract price.
          </p>
        </div>

        {/* Channel Navigation Pills */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ECOSYSTEM_CHANNELS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(idx)}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 ${
                activeChannel === idx
                  ? "border-gold bg-gold/15 shadow-[0_8px_20px_rgba(176,141,87,0.25)]"
                  : "border-white/10 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.06]"
              }`}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold">
                CHANNEL {ch.step}
              </span>
              <span className="mt-1 font-serif text-sm font-semibold text-white">
                {ch.title}
              </span>
              <span className="mt-1 font-mono text-[10px] text-white/60">
                {ch.metrics}
              </span>
            </button>
          ))}
        </div>

        {/* Active Channel 3D Detail Slab */}
        <Tilt3D className="mt-6" maxTilt={3}>
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-r from-navy-deep via-[#0d2244]/80 to-navy-deep p-6 md:p-8 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gold/15 pb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  CHANNEL {ECOSYSTEM_CHANNELS[activeChannel].step} · {ECOSYSTEM_CHANNELS[activeChannel].scope}
                </span>
                <h4 className="mt-1 font-serif text-xl text-white md:text-2xl">
                  {ECOSYSTEM_CHANNELS[activeChannel].title}
                </h4>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] text-gold-soft">
                <CheckCircle2 size={14} className="text-gold" />
                <span>{ECOSYSTEM_CHANNELS[activeChannel].metrics}</span>
              </div>
            </div>

            <p className="mt-5 font-sans text-sm leading-relaxed text-white/80 max-w-3xl">
              {ECOSYSTEM_CHANNELS[activeChannel].detail}
            </p>

            <div className="mt-5 flex items-center gap-2.5 font-mono text-[11px] text-white/70">
              <Share2 size={13} className="text-gold shrink-0" />
              <span>Connector Architecture: <strong className="text-white font-medium">{ECOSYSTEM_CHANNELS[activeChannel].connectorHighlight}</strong></span>
            </div>
          </div>
        </Tilt3D>
      </div>

      <details className="relative mx-auto max-w-6xl border-b border-gold/15 px-6 py-5 text-white/70">
        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
          Distribution eligibility
        </summary>
        <p className="mt-3 max-w-4xl font-sans text-xs leading-relaxed">
          Distribution is subject to property type and eligibility, MLS rules, brokerage approval, platform participation and syndication partner availability.
        </p>
      </details>

      {/* ── How the listing system executes ─────────────────────── */}
      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">The Listing System</p>
        <h3 className="mt-3 max-w-2xl font-serif text-2xl leading-tight text-white md:mt-4 md:text-4xl">
          What actually happens when your home lists with Carlos.
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {PILLARS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="h-full">
              <Tilt3D className="h-full" maxTilt={4}>
                <div className="group relative flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:shadow-[0_12px_35px_rgba(0,0,0,0.55)] md:p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-[2.2rem] leading-none text-gold md:text-[2.8rem]">{step}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                        <Icon size={20} />
                      </div>
                    </div>
                    <div className="mt-4 h-px w-10 bg-gold/40 transition-all duration-300 group-hover:w-16 md:mt-5" />
                    <h4 className="mt-4 font-serif text-lg leading-snug text-white md:mt-5">{title}</h4>
                  </div>
                  <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-white/70 md:mt-4">{body}</p>
                </div>
              </Tilt3D>
            </div>
          ))}
        </div>

        <aside className="mt-8 rounded-xl border border-gold/30 bg-white/[0.05] p-6 md:mt-10 md:flex md:items-start md:gap-10 md:p-8" aria-label="Sample seller update">
          <div className="md:max-w-xs">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Your seller update</p>
            <h4 className="mt-2 font-serif text-2xl text-white">Evidence to guide the next decision.</h4>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/75">A sample of the categories we review together; the actual report reflects your property and available data.</p>
          </div>
          <ul className="mt-5 grid flex-1 gap-3 font-sans text-sm text-white/85 sm:grid-cols-2 md:mt-0">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>Showing activity and buyer feedback</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>Relevant agent conversations</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>New competing listings and price changes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>Recommended action and next review</span>
            </li>
          </ul>
        </aside>

        <p className="mt-6 font-sans text-xs leading-relaxed text-white/75">Sources: MIAMI REALTORS® + RWorld May 2026 membership and April 2026 merger announcements; United Realty Group. Association scale and cooperation agreements do not guarantee listing attention or referrals.</p>

        {/* Single CTA naming a specific outcome */}
        <div className="mt-10 flex justify-center md:mt-14">
          <a
            href="#list-here"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-9 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-all hover:bg-white hover:text-navy-deep shadow-[0_8px_25px_rgba(176,141,87,0.35)] md:py-4.5"
          >
            Request Your Private Seller Strategy Review
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

    </section>
  );
}
