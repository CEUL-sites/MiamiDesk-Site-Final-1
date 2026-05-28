import { motion, type Variants } from "motion/react";
import { ArrowRight, Bot, Globe, Tag, Key, Users } from "lucide-react";
import { useRef, useState } from "react";
import { CONTACT } from "../constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const PILLS = [
  { icon: Tag,   label: "Sell",          href: "/sell"       },
  { icon: Key,   label: "Buy",           href: "/buy"        },
  { icon: Globe, label: "Spain Desk",    href: "/spain-desk" },
  { icon: Users, label: "Agent Referral",href: "/agents"     },
];

const REACH_STATS = [
  { value: "93,000+", label: "Member Agents"        },
  { value: "$69B",    label: "2025 Volume"           },
  { value: "200+",    label: "Global Portals"        },
  { value: "19",      label: "Languages"             },
  { value: "260+",    label: "U.S. MLSs"             },
  { value: "437+",    label: "Referral Agreements"   },
];

/* ─── Mini AI bar ──────────────────────────────────────────────── */
function HeroAIBar() {
  const [query, setQuery]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [answer, setAnswer]     = useState("");
  const [error, setError]       = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function ask(q: string) {
    const text = q.trim();
    if (!text || loading) return;
    setLoading(true);
    setAnswer("");
    setError("");
    try {
      const res  = await fetch("/.netlify/functions/ai-desk", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ messages: [{ role: "user", content: text }] }),
      });
      const data = await res.json();
      if (!res.ok || data.error) { setError(data.error ?? "Unable to respond."); return; }
      setAnswer(data.response ?? "");
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* "AI LIVE" badge */}
      <div className="flex justify-end mb-1.5 pr-1">
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          AI Live
        </span>
      </div>

      {/* Input pill */}
      <div className="relative flex items-center gap-3 rounded-full bg-[#0A1525]/90 border border-white/12 backdrop-blur-xl px-3 py-2.5 shadow-2xl shadow-black/50 focus-within:border-gold/40 transition-colors">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold/15">
          <Bot size={16} className="text-gold" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(query)}
          placeholder="Ask The Miami Desk AI about selling, buying, or international property…"
          maxLength={400}
          disabled={loading}
          className="flex-1 bg-transparent font-sans text-sm text-white/80 placeholder:text-white/30 outline-none min-w-0"
          aria-label="Ask the AI desk"
        />
        <button
          type="button"
          onClick={() => ask(query)}
          disabled={loading || !query.trim()}
          aria-label="Send"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gold hover:bg-gold-soft transition-colors disabled:opacity-40"
        >
          {loading
            ? <span className="h-3.5 w-3.5 rounded-full border-2 border-navy/40 border-t-navy animate-spin block" />
            : <ArrowRight size={15} className="text-navy" />
          }
        </button>
      </div>

      {/* Response card */}
      {(answer || error) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-xl bg-[#0A1525]/95 border border-gold/20 backdrop-blur-xl px-5 py-4 text-left shadow-xl shadow-black/40"
        >
          {error
            ? <p className="font-mono text-[11px] text-red-400/80">{error}</p>
            : <>
                <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-gold mb-2">Miami Desk · AI</p>
                <p className="font-sans text-sm leading-relaxed text-white/80">{answer}</p>
                <a
                  href={`https://wa.me/${CONTACT.phoneUS.replace(/\D/g,"")}?text=${encodeURIComponent("Hello Carlos, I have a question: " + query)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 hover:text-gold transition-colors"
                >
                  Continue on WhatsApp →
                </a>
              </>
          }
        </motion.div>
      )}
    </div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="hero-root relative min-h-screen overflow-hidden bg-[#060D18] text-white flex flex-col">

      <style>{`
        /* Cinematic dusk background — luxury property left, city right */
        .hero-bg-warm {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 90% 70% at 15% 60%,  rgba(176,120,40,0.22)  0%, transparent 55%),
            radial-gradient(ellipse 60% 80% at 80% 80%,  rgba(20,55,120,0.30)   0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(10,25,60,0.8)     0%, transparent 65%),
            linear-gradient(175deg, #0A1830 0%, #070E18 45%, #050A14 100%);
        }
        /* Warm ambient orbs */
        @keyframes ho1 {
          0%,100% { transform:translate(0,0)  scale(1);    }
          40%      { transform:translate(30px,-40px) scale(1.1); }
          70%      { transform:translate(-20px,25px) scale(0.93); }
        }
        @keyframes ho2 {
          0%,100% { transform:translate(0,0)  scale(1);    }
          50%      { transform:translate(-35px,20px) scale(1.08); }
        }
        .hero-orb-a {
          position:absolute; border-radius:50%; pointer-events:none;
          width:680px; height:680px; top:-120px; left:-160px;
          background:radial-gradient(ellipse, rgba(176,120,40,0.14) 0%, transparent 60%);
          animation: ho1 20s ease-in-out infinite;
        }
        .hero-orb-b {
          position:absolute; border-radius:50%; pointer-events:none;
          width:520px; height:520px; bottom:-80px; right:-60px;
          background:radial-gradient(ellipse, rgba(30,70,150,0.18) 0%, rgba(176,141,87,0.07) 50%, transparent 70%);
          animation: ho2 25s ease-in-out infinite;
        }
        /* Noise texture for photo-like grain */
        .hero-grain {
          position:absolute; inset:0; pointer-events:none; opacity:0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 180px;
        }
        /* Fine gold grid */
        .hero-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image:
            linear-gradient(rgba(176,141,87,0.03) 1px, transparent 1px),
            linear-gradient(90deg,rgba(176,141,87,0.03) 1px, transparent 1px);
          background-size:64px 64px;
          mask-image:radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
        }
        /* Bottom vignette */
        .hero-vignette {
          position:absolute; bottom:0; left:0; right:0; height:280px; pointer-events:none;
          background:linear-gradient(to top, rgba(6,13,24,0.95) 0%, transparent 100%);
        }
        /* CTA */
        .hero-cta-main {
          background:linear-gradient(90deg, #B08D57 0%, #C9A96E 50%, #B08D57 100%);
          background-size: 200% auto;
          transition: background-position 0.5s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }
        .hero-cta-main:hover {
          background-position: right center;
          box-shadow: 0 8px 32px rgba(176,141,87,0.4);
          transform: translateY(-1px);
        }
        .hero-cta-main:active { transform: translateY(0) scale(0.98); }
        /* Pill buttons */
        .hero-pill {
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(12px);
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .hero-pill:hover {
          border-color: rgba(176,141,87,0.6);
          background: rgba(176,141,87,0.1);
          color: #D4AE78;
        }
        /* Stats bar */
        .hero-stats-bar {
          background: rgba(10,21,37,0.8);
          border-top: 1px solid rgba(176,141,87,0.12);
          border-bottom: 1px solid rgba(176,141,87,0.12);
          backdrop-filter: blur(16px);
        }
        @keyframes hero-rule {
          from { transform:scaleX(0); opacity:0; }
          to   { transform:scaleX(1); opacity:1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-orb-a, .hero-orb-b { animation: none; }
          .hero-cta-main:hover { transform: none; }
        }
      `}</style>

      {/* Background layers */}
      <div className="hero-bg-warm"  aria-hidden="true" />
      <div className="hero-orb-a"    aria-hidden="true" />
      <div className="hero-orb-b"    aria-hidden="true" />
      <div className="hero-grain"    aria-hidden="true" />
      <div className="hero-grid"     aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Content ─────────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-5 pt-32 pb-8 sm:px-10"
      >
        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-serif leading-[1.04] text-white"
          style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)", fontWeight: 400 }}
        >
          Real estate is local.
          <br />
          <em className="not-italic italic text-gold">Peak value is global.</em>
        </motion.h1>

        {/* Gold rule */}
        <motion.div
          variants={item}
          className="mt-5 h-px w-14 bg-gold/50 origin-center mx-auto"
          style={{ animation: "hero-rule 0.8s ease forwards 0.8s", transform: "scaleX(0)", opacity: 0 }}
        />

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="mt-6 max-w-md font-sans text-base leading-relaxed text-white/55"
        >
          AI-guided property intake and senior real estate representation
          for sellers, buyers, and cross-border owners.
        </motion.p>

        {/* AI Search Bar */}
        <motion.div variants={item} className="mt-8 w-full max-w-xl">
          <HeroAIBar />
        </motion.div>

        {/* Navigation pills */}
        <motion.div
          variants={item}
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
        >
          {PILLS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="hero-pill inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-sm text-white/70"
            >
              <Icon size={14} className="text-gold/70" />
              {label}
            </a>
          ))}
        </motion.div>

      </motion.div>

      {/* ── Reach Advantage stats bar ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative z-10 hero-stats-bar w-full"
      >
        <div className="mx-auto max-w-5xl px-5 py-3 flex items-center gap-4 overflow-x-auto">
          <span className="flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.28em] text-gold border border-gold/30 px-2 py-1 whitespace-nowrap">
            Reach Advantage
          </span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <div className="h-3 w-px bg-white/15" />
          </div>
          {REACH_STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-1 flex-shrink-0">
              {i > 0 && <span className="text-white/15 text-xs mr-1">·</span>}
              <span className="font-mono text-[11px] font-semibold text-white/85 whitespace-nowrap">{s.value}</span>
              <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/35 ml-1 whitespace-nowrap">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Bottom CTA strip ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE }}
        className="relative z-10 w-full px-5 pb-8 pt-5 flex flex-col items-center gap-4"
      >
        <p className="font-sans text-sm italic text-white/38 tracking-wide">
          Discreet. Strategic. Personalized.
        </p>
        <a
          href="/contact"
          className="hero-cta-main inline-flex w-full max-w-sm items-center justify-center gap-3 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-navy-deep"
        >
          Start Private Property Brief
          <ArrowRight size={15} />
        </a>
        <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-white/22 text-center">
          United Realty Group · FL SL705771 · Equal Housing Opportunity
        </p>
      </motion.div>

    </section>
  );
}
