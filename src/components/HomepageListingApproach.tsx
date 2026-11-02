import { ArrowRight, Crosshair, Globe2, Radio } from "lucide-react";
import { fig } from "../data/figures";

const PILLARS = [
  {
    step: "01",
    label: "Position",
    icon: Crosshair,
    title: "Price & Story Before Launch",
    copy: "We review closed comparable sales, active competition, and net proceeds scenarios, then prepare architectural photography, cinematic film, and property narrative before going live.",
    outcome: "Defensible pricing & strong first impression",
  },
  {
    step: "02",
    label: "Distribute",
    icon: Globe2,
    title: "MLS & International Channels",
    copy: "Eligible listings enter the South Florida MLS ecosystem and syndicate across national RPR exchanges and international consumer portals in 19 languages.",
    outcome: "Local, relocation & cross-border discovery",
  },
  {
    step: "03",
    label: "Activate",
    icon: Radio,
    title: "Direct Buyer-Agent Outreach",
    copy: "We proactively contact agents representing qualified buyers in your submarket and price band, followed by structured weekly updates on showings, feedback, and competing inventory.",
    outcome: "Clear market evidence for every decision",
  },
] as const;

export function HomepageListingApproach() {
  return (
    <section
      id="listing-approach"
      aria-labelledby="listing-approach-heading"
      className="border-t border-hairline bg-ivory py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
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
          <p className="max-w-md font-sans text-sm leading-relaxed text-navy/75 md:text-base">
            Every listing campaign is led personally by Carlos Uzcategui through United Realty Group—aligning
            pricing, presentation, and targeted buyer-agent outreach around your property.
          </p>
        </div>

        {/* 3 Core Visual Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {PILLARS.map(({ step, label, icon: Icon, title, copy, outcome }) => (
            <article
              key={step}
              className="flex flex-col justify-between rounded-lg border border-bone bg-white p-7 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-light text-gold-ink">{step}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-gold-ink border border-hairline">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60 font-semibold">
                  {label}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-navy-deep font-normal leading-snug">
                  {title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-navy/75">
                  {copy}
                </p>
              </div>
              <div className="mt-6 border-t border-hairline pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-navy/60 font-medium">
                  Homeowner Outcome
                </p>
                <p className="mt-1 font-sans text-xs font-semibold text-navy-deep">
                  {outcome}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Compact Verified Infrastructure Proof Strip */}
        <div className="mt-10 rounded-lg border border-gold/30 bg-navy-deep p-6 text-white md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                Professional Distribution Infrastructure
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-white/80">
                Miami and South Florida REALTORS® ecosystem and United Realty Group Florida office network available to eligible listings.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 border-t border-white/10 pt-6 lg:border-t-0 lg:pt-0">
              <div className="border-l border-gold/40 pl-3.5">
                <p className="font-serif text-2xl text-gold sm:text-3xl font-normal">{fig("members")}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">Association Members</p>
              </div>
              <div className="border-l border-gold/40 pl-3.5">
                <p className="font-serif text-2xl text-gold sm:text-3xl font-normal">{fig("usMls")}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">U.S. MLSs via RPR</p>
              </div>
              <div className="border-l border-gold/40 pl-3.5">
                <p className="font-serif text-2xl text-gold sm:text-3xl font-normal">{fig("globalWebsites")}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">Global Portals (19 Lang)</p>
              </div>
              <div className="border-l border-gold/40 pl-3.5">
                <p className="font-serif text-2xl text-gold sm:text-3xl font-normal">{fig("urgAgents")}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/70">{fig("urgOfficeNetwork")} FL Office Locations</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col justify-between gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center">
            <p className="font-sans text-[11px] leading-relaxed text-white/60">
              Infrastructure figures reflect published MIAMI REALTORS® and United Realty Group records. Distribution is subject to property eligibility, MLS rules, brokerage approval, and platform participation.
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
