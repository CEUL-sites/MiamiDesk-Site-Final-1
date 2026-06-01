import { useState, useEffect, useRef } from "react";
import { CONTACT } from "../constants";

const GOLD = "#B08D57";
const GOLD_SOFT = "#D4AE78";
const GOLD_DEEP = "#8C6D3F";
const NAVY_DEEP = "#06111F";

const STEPS = [
  {
    id: 1,
    city: "Caracas · Bogotá · Buenos Aires",
    flag: "🌎",
    label: "LATAM CAPITAL",
    headline: "Wealth accumulates.",
    sub: "High-net-worth families across Latin America build significant real estate capital. Their next move is not local.",
    stat: null,
    side: "left" as const,
    color: GOLD,
  },
  {
    id: 2,
    city: "Miami, Florida",
    flag: "🌴",
    label: "CAPITAL MIGRATES",
    headline: "The capital moves to Miami.",
    sub: "South Florida becomes the preferred destination. The buyer is now in the market — represented by a local agent, searching the Miami MLS.",
    stat: "93,000 agents active in this network",
    side: "right" as const,
    color: GOLD_SOFT,
  },
  {
    id: 3,
    city: "Miami MLS · World's Largest Local REALTOR® Association",
    flag: "🏛️",
    label: "THE SEARCH BEGINS",
    headline: "Their agent searches the MLS.",
    sub: "A buyer's agent in the world's largest local Realtor association begins identifying properties — in Florida and internationally — across the MIAMI REALTORS® global partner network.",
    stat: "500+ global websites · 19 languages",
    side: "left" as const,
    color: GOLD,
  },
  {
    id: 4,
    city: "Madrid · Marbella · Barcelona",
    flag: "🏛️",
    label: "YOUR PROPERTY APPEARS",
    headline: "A Spanish property enters the search.",
    sub: "Listed by Carlos Uzcategui as the licensed U.S. principal of record, a prime Spanish property is now visible on the Miami MLS — searchable by every agent in the network.",
    stat: "Your listing. American institutional exposure.",
    side: "right" as const,
    color: GOLD_DEEP,
  },
  {
    id: 5,
    city: "Spain · Local Network",
    flag: "🔑",
    label: "COORDINATION",
    headline: "Showings. Local expertise. Both sides.",
    sub: "Local Spanish agencies within Carlos's affiliated network handle buyer qualification, showings, and local negotiation. The seller has both markets working in parallel.",
    stat: "300+ partner associations · 70+ countries",
    side: "left" as const,
    color: GOLD,
  },
  {
    id: 6,
    city: "Transaction Complete",
    flag: "✦",
    label: "THE RESULT",
    headline: "The buyer no one else could reach.",
    sub: "A Spanish property owner found their LatAm buyer through the only pipeline that connects both markets at institutional level. No workaround. A licensed U.S. principal of record.",
    stat: "$69 Billion — 2025 combined transaction volume",
    side: "right" as const,
    color: GOLD_SOFT,
  },
];

function GoldLine({ progress }: { progress: number }) {
  return (
    <div className="smj-line-container">
      <div className="smj-line-bg" />
      <div className="smj-line-fill" style={{ height: `${Math.min(progress * 100, 100)}%` }} />
    </div>
  );
}

function StepNode({
  step,
  visible,
  index,
}: {
  step: (typeof STEPS)[number];
  visible: boolean;
  index: number;
}) {
  const isRight = step.side === "right";
  return (
    <div
      className={`smj-step ${isRight ? "smj-step-right" : "smj-step-left"} ${visible ? "smj-step-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.05}s` }}
    >
      {!isRight && <div className="smj-spacer" />}
      <div className="smj-connector">
        <div
          className="smj-node"
          style={{ borderColor: step.color, boxShadow: `0 0 20px ${step.color}44` }}
        >
          <span style={{ fontSize: 16 }}>{step.flag}</span>
        </div>
        <div
          className="smj-hline"
          style={{
            background: `linear-gradient(${isRight ? "to right" : "to left"}, ${step.color}00, ${step.color})`,
          }}
        />
      </div>
      <div className={`smj-card ${isRight ? "smj-card-right" : "smj-card-left"}`}>
        <div className="smj-label" style={{ color: step.color }}>
          {step.label}
        </div>
        <div className="smj-city">{step.city}</div>
        <div className="smj-headline">{step.headline}</div>
        <div className="smj-sub">{step.sub}</div>
        {step.stat && (
          <div
            className="smj-stat"
            style={{ borderColor: step.color + "66", color: step.color }}
          >
            {step.stat}
          </div>
        )}
      </div>
      {isRight && <div className="smj-spacer" />}
    </div>
  );
}

export function SpainMiamiJourney() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeaderVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = parseInt((entry.target as HTMLElement).dataset.idx ?? "0");
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => [...new Set([...prev, idx])]);
            setLineProgress((prev) => Math.max(prev, (idx + 1) / STEPS.length));
          }
        });
      },
      { threshold: 0.3 }
    );
    stepRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFooterVisible(true); },
      { threshold: 0.2 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  const FOOTER_STATS = [
    { n: "93,000", l: "Member Agents" },
    { n: "300+",   l: "Partner Associations" },
    { n: "2M+",    l: "Professionals" },
    { n: "70+",    l: "Countries" },
  ];

  return (
    <section className="smj-root overflow-hidden">
      <style>{`
        .smj-root {
          background: ${NAVY_DEEP};
          position: relative;
          color: rgba(255,255,255,0.85);
        }
        .smj-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 40% at 20% 20%, #0D1A2E 0%, transparent 60%),
            radial-gradient(ellipse 50% 50% at 80% 80%, #1A0D00 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 50% 50%, #070B14 0%, transparent 80%);
          pointer-events: none;
        }
        .smj-wrap {
          position: relative;
          z-index: 2;
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
        }
        /* header */
        .smj-header {
          text-align: center;
          padding: 48px 20px 36px;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
        }
        .smj-header.smj-visible { opacity: 1; transform: translateY(0); }
        .smj-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: center;
          margin-bottom: 8px;
        }
        .smj-divider-line {
          width: 60px; height: 1px;
          background: linear-gradient(to right, transparent, ${GOLD});
        }
        .smj-divider-line-rev {
          width: 60px; height: 1px;
          background: linear-gradient(to left, transparent, ${GOLD});
        }
        .smj-divider-diamond {
          width: 6px; height: 6px;
          background: ${GOLD};
          transform: rotate(45deg);
        }
        /* timeline */
        .smj-timeline {
          position: relative;
          padding: 16px 0 40px;
        }
        .smj-line-container {
          position: absolute;
          left: 50%; top: 0; bottom: 0;
          transform: translateX(-50%);
          width: 2px;
          z-index: 1;
        }
        .smj-line-bg { position: absolute; inset: 0; background: #1A1E2A; }
        .smj-line-fill {
          position: absolute;
          top: 0; left: 0; right: 0;
          background: linear-gradient(to bottom, ${GOLD}, ${GOLD_DEEP});
          transition: height 0.8s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 0 12px ${GOLD}55;
        }
        /* steps */
        .smj-step {
          display: flex;
          align-items: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .smj-step-left  { transform: translateX(-30px); }
        .smj-step-right { transform: translateX(30px); }
        .smj-step-visible { opacity: 1; transform: translateX(0); }
        .smj-spacer { flex: 1; }
        .smj-connector {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          position: relative;
          z-index: 3;
        }
        .smj-node {
          width: 48px; height: 48px;
          border-radius: 50%;
          border: 1.5px solid;
          background: #0D1018;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: box-shadow 0.5s ease;
          position: relative;
          z-index: 4;
        }
        .smj-hline { width: 40px; height: 1px; flex-shrink: 0; }
        /* card */
        .smj-card {
          flex: 1;
          max-width: 340px;
          padding: 24px 28px;
          background: rgba(13,16,24,0.7);
          border: 1px solid #1E2434;
          backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
        }
        .smj-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(176,141,87,0.04) 0%, transparent 60%);
          pointer-events: none;
        }
        .smj-card-left  { border-right: 1px solid ${GOLD}33; }
        .smj-card-right { border-left:  1px solid ${GOLD}33; }
        .smj-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          margin-bottom: 6px;
          font-family: var(--font-mono);
        }
        .smj-city {
          font-family: var(--font-serif);
          font-size: 13px;
          font-style: italic;
          color: #6A6050;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }
        .smj-headline {
          font-family: var(--font-serif);
          font-size: clamp(17px, 2.5vw, 21px);
          font-weight: 600;
          color: rgba(255,255,255,0.92);
          line-height: 1.2;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }
        .smj-sub {
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 300;
          color: rgba(255,255,255,0.38);
          line-height: 1.65;
          letter-spacing: 0.02em;
        }
        .smj-stat {
          margin-top: 14px;
          padding: 10px 14px;
          border: 1px solid;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(176,141,87,0.04);
        }
        /* footer */
        .smj-footer {
          text-align: center;
          padding: 40px 20px 60px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .smj-footer.smj-visible { opacity: 1; transform: translateY(0); }
        .smj-footer-stats {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .smj-stat-n {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 400;
          color: ${GOLD};
          line-height: 1;
          margin-bottom: 4px;
        }
        .smj-stat-l {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.3em;
          color: #4A4030;
          text-transform: uppercase;
        }
        .smj-vdivider {
          width: 1px; height: 40px;
          background: linear-gradient(to bottom, transparent, #2A2418, transparent);
          margin: 0 auto 40px;
        }
        @media (max-width: 640px) {
          .smj-step  { margin-bottom: 48px; }
          .smj-card  { padding: 18px 20px; max-width: 240px; }
          .smj-hline { width: 16px; }
          .smj-node  { width: 36px; height: 36px; }
          .smj-footer-stats { gap: 20px; }
          .smj-stat-n { font-size: 24px; }
          .smj-header { padding: 36px 0 24px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .smj-header, .smj-footer, .smj-step { transition: none; }
          .smj-line-fill { transition: none; }
        }
      `}</style>

      <div className="smj-wrap">
        {/* Header */}
        <div className={`smj-header${headerVisible ? " smj-visible" : ""}`}>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold mb-5">
            The Miami Desk · Carlos Uzcategui · CLHMS
          </p>
          <h2
            className="font-serif text-white leading-[1.05] mb-4"
            style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", fontWeight: 400 }}
          >
            The buyer for your<br />
            Spanish property is<br />
            <em className="not-italic italic text-gold">already in Miami.</em>
          </h2>
          <p className="font-sans text-white/40 text-base leading-relaxed max-w-md mx-auto mb-8">
            How LatAm capital moves from Caracas to Coral Gables — and why your listing needs to be visible in that pipeline.
          </p>
          <div className="smj-divider">
            <div className="smj-divider-line" />
            <div className="smj-divider-diamond" />
            <div className="smj-divider-line-rev" />
          </div>
        </div>

        {/* Timeline */}
        <div className="smj-timeline">
          <GoldLine progress={lineProgress} />
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              ref={(el) => { stepRefs.current[idx] = el; }}
              data-idx={idx}
            >
              <StepNode step={step} visible={visibleSteps.includes(idx)} index={idx} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`smj-footer${footerVisible ? " smj-visible" : ""}`}
          ref={footerRef}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold mb-8">
            The Infrastructure Behind Every Transaction
          </p>
          <div className="smj-footer-stats">
            {FOOTER_STATS.map((s) => (
              <div key={s.l}>
                <div className="smj-stat-n">{s.n}</div>
                <div className="smj-stat-l">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="smj-vdivider" />
          <h3
            className="font-serif text-white leading-[1.15] mb-3"
            style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 400 }}
          >
            Your property.<br />
            <em className="not-italic italic text-gold">The entire American market.</em>
          </h3>
          <p className="font-sans text-white/30 text-sm tracking-widest mb-10">
            Real estate is local. Peak value is global.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <a
              href={CONTACT.whatsappSpain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              WhatsApp · Activate Your Listing
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center border border-gold/40 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-colors hover:border-gold hover:bg-gold/5"
            >
              {CONTACT.email}
            </a>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-white/20 leading-loose">
            {CONTACT.licenseDisplay} · {CONTACT.brokerage}<br />
            Miami and South Florida REALTORS® Member · Equal Housing Opportunity
          </p>
        </div>
      </div>
    </section>
  );
}
