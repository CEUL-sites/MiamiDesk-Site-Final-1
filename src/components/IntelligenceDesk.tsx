import { AnimatePresence, motion } from "motion/react";
import {
  Building2, Clock, Globe, Home, Lock, Search,
  ShieldCheck, Sparkles, TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CHIPS = [
  {
    icon: Home,
    label: "Coral Gables pricing",
    query: "What is the current price per sq ft in Coral Gables?",
  },
  {
    icon: Globe,
    label: "Activar en Miami MLS",
    query: "¿Cómo activo mi propiedad española en el MLS de Miami?",
  },
  {
    icon: TrendingUp,
    label: "Seller strategy review",
    query: "What does the seller strategy review with Carlos include?",
  },
  {
    icon: Building2,
    label: "Buyer: Weston under $2M",
    query: "I'm looking to buy in Weston, South Florida, under $2 million.",
  },
];

const TRUST = [
  { icon: ShieldCheck, label: "English & Spanish" },
  { icon: Clock,       label: "Carlos reviews every inquiry" },
  { icon: Lock,        label: "Routed direct to WhatsApp" },
];

// Architectural SVG grid — gold lines at 3% opacity
const GRID_BG = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 0H0V60' fill='none' stroke='%23B08D57' stroke-width='0.5'/%3E%3C/svg%3E")`;

export function IntelligenceDesk() {
  const [query, setQuery]     = useState("");
  const [focused, setFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const inputRef    = useRef<HTMLInputElement>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function submit(text: string) {
    if (!text.trim()) return;
    const url = `https://wa.me/19548656622?text=${encodeURIComponent("AI Desk: " + text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setIsTyping(false), 900);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit(query);
  }

  function handleChip(chipQuery: string) {
    setQuery(chipQuery);
    inputRef.current?.focus();
    // Small delay so the bar visually updates before the tab opens
    setTimeout(() => submit(chipQuery), 80);
  }

  useEffect(() => () => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
  }, []);

  return (
    <section
      id="intelligence"
      className="relative overflow-hidden py-20 px-5 text-white"
      style={{ backgroundColor: "#06111F" }}
    >
      {/* ── Breathing gold radial pulse ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ animation: "id-pulse 8s ease-in-out infinite" }}
      />

      {/* ── Architectural grid ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: GRID_BG, opacity: 0.03 }}
      />

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-[680px]">

        {/* ── Bot avatar ── */}
        <div className="mb-10 flex justify-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            {/* Outer ping ring */}
            <span
              className="absolute h-24 w-24 rounded-full border border-gold/20"
              style={{ animation: "id-ping 2.5s cubic-bezier(0,0,0.2,1) infinite" }}
            />
            {/* Middle static ring */}
            <span className="absolute h-[72px] w-[72px] rounded-full border border-gold/30" />
            {/* Inner circle */}
            <div
              className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border border-gold/50"
              style={{ backgroundColor: "#102B57" }}
            >
              <Sparkles size={20} className="text-gold" />
              {/* Online dot */}
              <span
                className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 0 2px #06111F, 0 0 8px rgba(52,211,153,0.8)" }}
              />
            </div>
          </div>
        </div>

        {/* ── Header ── */}
        <div className="mb-10 text-center">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.35em] text-gold">
            AI Intelligence Desk · Powered by Gemini
          </p>
          <h2
            className="font-serif leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", marginBottom: "1.25rem" }}
          >
            Ask anything about South Florida real estate.
          </h2>
          <p
            className="mx-auto font-sans font-light text-white/55"
            style={{ fontSize: "1rem", lineHeight: 1.8, maxWidth: 480 }}
          >
            Seller strategy, neighborhood pricing, Madrid activation, buyer advisory — answered in English or Spanish. Carlos reviews every inquiry personally.
          </p>
        </div>

        {/* ── Search bar ── */}
        <motion.div
          animate={{ scale: focused ? 1.01 : 1 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: `1px solid ${focused ? "rgba(176,141,87,0.6)" : "rgba(255,255,255,0.15)"}`,
              boxShadow: focused ? "0 0 0 4px rgba(176,141,87,0.08)" : "none",
            }}
          >
            <Search
              size={18}
              className="flex-shrink-0 transition-colors duration-200"
              style={{ color: focused ? "#B08D57" : "rgba(255,255,255,0.3)" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={handleKey}
              placeholder="Ask about Coral Gables pricing, Madrid MLS activation, seller strategy..."
              className="flex-1 bg-transparent text-white outline-none placeholder:text-white/30"
              style={{ fontFamily: "inherit", fontSize: 15, fontWeight: 300 }}
            />
            <AnimatePresence>
              {query.length > 0 && (
                <motion.button
                  key="ask"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => submit(query)}
                  className="flex-shrink-0 rounded-xl px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest text-white"
                  style={{ backgroundColor: "#B08D57" }}
                >
                  Ask →
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Typing dots */}
        <AnimatePresence>
          {isTyping && query.length > 0 && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="mt-3 flex items-center gap-3"
            >
              <div className="flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
                    style={{ animation: `id-bounce 0.8s ease-in-out ${d}ms infinite` }}
                  />
                ))}
              </div>
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
                Carlos AI Desk
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Suggestion chips ── */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {CHIPS.map(({ icon: Icon, label, query: cq }) => (
            <button
              key={label}
              onClick={() => handleChip(cq)}
              className="group flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-200 hover:border-gold/30 hover:bg-gold/10"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.05)",
              }}
            >
              <Icon
                size={13}
                className="flex-shrink-0 text-gold/60 transition-colors duration-200 group-hover:text-gold"
              />
              <span className="font-sans text-[11px] text-white/55 transition-colors duration-200 group-hover:text-white/85">
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* ── Trust row ── */}
        <div className="mt-12 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
            {TRUST.map(({ icon: Icon, label }, i) => (
              <div key={label} className="flex items-center">
                {i > 0 && (
                  <span className="mx-6 hidden h-4 w-px bg-white/10 sm:block" />
                )}
                <div className="flex items-center gap-2">
                  <Icon size={14} className="flex-shrink-0 text-gold/40" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes id-pulse {
          0%, 100% { background: radial-gradient(ellipse at 50% 50%, rgba(176,141,87,0.04) 0%, transparent 70%); }
          50%       { background: radial-gradient(ellipse at 50% 50%, rgba(176,141,87,0.09) 0%, transparent 70%); }
        }
        @keyframes id-ping {
          75%, 100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes id-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}
