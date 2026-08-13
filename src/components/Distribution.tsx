import { motion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { LazyVideo } from "./LazyVideo";
import { ReachFlow3D } from "./ReachFlow3D";
import { CountUp } from "./CountUp";

const DISTRIBUTION_STATS = [
  {
    value: "93,000",
    label: "Association members",
    source: "Miami and South Florida REALTORS®",
    description: "Professional visibility inside the shared MLS ecosystem used by member agents.",
  },
  {
    value: "200+",
    label: "Websites and apps",
    source: "Association listing-reach program",
    description: "Eligible listings can be syndicated across consumer discovery channels in 19 languages.",
  },
  {
    value: "260+",
    label: "U.S. MLSs via RPR",
    source: "Realtors Property Resource®",
    description: "Qualified property data can travel through approved professional distribution infrastructure.",
  },
  {
    value: "437+",
    label: "International agreements",
    source: "MIAMI Global Council",
    description: "Association relationships support international professional cooperation and market access.",
  },
] as const;

export function Distribution() {
  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.1]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy-deep/78 to-navy-deep/94" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-24">
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Verified distribution infrastructure
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl">
            A strong listing strategy is supported by professional reach.
          </h2>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/70">
            Carlos combines South Florida MLS positioning, buyer-agent activation and eligible online syndication through United Realty Group and his Miami and South Florida REALTORS® membership.
          </p>
          <a
            href="#list-here"
            className="mt-7 inline-flex min-h-12 items-center gap-2.5 bg-gold px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Request My Property Strategy
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </div>

        {/* The route first, as a picture. The figure carries what a list of four
            figures cannot — that these are stages of one path, not four separate
            boasts — and it reads in about a second, which is roughly the
            attention four stat rows got before the eye moved on. The sourced
            detail then sits underneath for anyone who wants to check it. */}
        <div className="mt-11 md:mt-14">
          <p className="text-center font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
            How a listing travels
          </p>
          <ReachFlow3D className="mt-7" />
          {/* States the approved framing next to the figure: a listing enters an
              ecosystem member agents work from. The stages are places a listing
              reaches, never a notification sent to 93,000 people. */}
          <p className="mx-auto mt-6 max-w-2xl text-center font-sans text-[11px] leading-relaxed text-white/55">
            A listing enters the MLS ecosystem that member agents work from daily. Each stage is a channel the property can reach, subject to the eligibility terms below.
          </p>
        </div>

        {/* Each card carries its own top rule rather than the grid carrying
            dividers: `divide-x` on a wrapping grid rules the wrong edges once
            the four columns fold to two. */}
        <div className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {DISTRIBUTION_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="dist-row border-t border-white/15 pt-6"
            >
              <p className="font-serif text-3xl text-gold md:text-4xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                {stat.label}
              </p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/76">{stat.description}</p>
              <p className="mt-2.5 font-mono text-[9px] uppercase tracking-[0.13em] text-gold/70">
                Source: {stat.source}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Eligibility terms belong on the page, but not as a paragraph competing
            with the argument above it. Kept in the DOM inside a disclosure so it
            is one tap away and still crawlable. */}
        <details className="dist-terms group mt-10 max-w-5xl">
          <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60">
            <ChevronDown
              size={13}
              aria-hidden="true"
              className="transition-transform duration-300 group-open:rotate-180"
            />
            Distribution eligibility and limits
          </summary>
          <p className="mt-3 font-sans text-[11px] leading-relaxed text-white/55">
            Distribution is subject to property type and eligibility, MLS rules, brokerage approval, platform participation and syndication partner availability. Not all properties appear on all websites or apps, and participating sites may change.
          </p>
        </details>
      </div>

      <style>{`
        .dist-terms summary::-webkit-details-marker { display: none; }
        .dist-row { transition: background-color 0.4s ease; }
        @media (hover: hover) and (pointer: fine) {
          .dist-row:hover { background-color: rgba(255,255,255,0.025); }
        }
      `}</style>
    </section>
  );
}
