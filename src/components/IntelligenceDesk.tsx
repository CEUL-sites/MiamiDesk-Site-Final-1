import { Bot, ChevronRight, FileText, Globe2, MapPin, Send, UserCheck } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CAPABILITIES = [
  { icon: MapPin,      text: "South Florida market conditions and pricing by neighborhood" },
  { icon: Globe2,      text: "Bilingual intake in English, Spanish, and Portuguese" },
  { icon: UserCheck,   text: "Identifies seller, buyer, investor, or agency profile" },
  { icon: FileText,    text: "Prepares structured context before Carlos responds personally" },
];

const CONVERSATION = [
  {
    role: "desk",
    text: "Good afternoon. I'm the Miami Desk — Carlos Uzcategui's AI intake advisor. Are you thinking about selling a South Florida property, or would you like to discuss the market?",
    time: "2:14 PM",
    delay: 400,
  },
  {
    role: "user",
    text: "I own a home in Coral Gables. Thinking about listing in the next 6 months.",
    time: "2:15 PM",
    delay: 2200,
  },
  {
    role: "desk",
    text: "Coral Gables is one of South Florida's strongest submarkets — days on market has been tight. To prepare Carlos's strategy review: approximate square footage, and do you have a price range in mind?",
    time: "2:15 PM",
    delay: 4000,
  },
  {
    role: "user",
    text: "Around 3,200 sq ft. No price idea yet — that's why I need Carlos.",
    time: "2:16 PM",
    delay: 6200,
  },
  {
    role: "desk",
    text: "Understood. I'm routing your details to Carlos now. He'll follow up with a no-obligation strategy review tailored to your Coral Gables property.",
    time: "2:16 PM",
    delay: 8000,
  },
];

const PROMPTS = [
  "What is the current price per sq ft in Coral Gables?",
  "¿Cómo activo mi propiedad española en Miami MLS?",
  "What does the seller strategy review include?",
  "How long does it take to sell in Weston?",
];

const LANGUAGES = ["English", "Español", "Português"];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/30">
        <Bot size={14} className="text-gold" />
      </div>
      <div className="flex gap-1 rounded-2xl rounded-bl-none bg-white/8 px-4 py-3">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold/70" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold/70" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-gold/70" />
      </div>
    </div>
  );
}

function ChatWindow({ started }: { started: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;

    function scheduleNext(index: number) {
      if (index >= CONVERSATION.length) {
        if (!cancelled) setDone(true);
        return;
      }
      const msg = CONVERSATION[index];
      // show typing indicator before desk messages
      const typingDelay = msg.role === "desk" && index > 0 ? 700 : 0;

      const t1 = window.setTimeout(() => {
        if (cancelled) return;
        if (msg.role === "desk") setShowTyping(true);
      }, msg.delay - typingDelay);

      const t2 = window.setTimeout(() => {
        if (cancelled) return;
        setShowTyping(false);
        setVisibleCount(index + 1);
        scheduleNext(index + 1);
      }, msg.delay);

      return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
    }

    scheduleNext(0);
    return () => { cancelled = true; };
  }, [started]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount, showTyping]);

  return (
    <div className="flex flex-col h-[420px]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-4 p-5 lg:p-6 scrollbar-hide">
        {CONVERSATION.slice(0, visibleCount).map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "desk" && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/30">
                <Bot size={14} className="text-gold" />
              </div>
            )}
            <div className={`max-w-[78%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              {msg.role === "desk" && (
                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-gold/60 ml-1">Miami Desk · AI</span>
              )}
              <div className={`rounded-2xl px-4 py-3 font-sans text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-br-none bg-gold text-navy font-medium"
                  : "rounded-bl-none bg-white/8 text-white/85"
              }`}>
                {msg.text}
              </div>
              <span className="font-mono text-[7px] text-white/25 mx-1">{msg.time}</span>
            </div>
          </motion.div>
        ))}

        {showTyping && <TypingIndicator />}

        {done && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 border border-gold bg-gold/10 px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold hover:text-navy"
            >
              Start your real inquiry
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Fake input bar */}
      <div className="border-t border-white/8 px-4 py-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
          <span className="flex-1 font-sans text-sm text-white/25 select-none">
            Ask anything about South Florida…
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20">
            <Send size={12} className="text-gold" />
          </div>
        </div>
        <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.2em] text-white/20 text-center">
          Inquiry preview · submit the form below to reach Carlos directly
        </p>
      </div>
    </div>
  );
}

export const IntelligenceDesk = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section id="intelligence" ref={sectionRef} className="border-t border-gold/20 bg-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">

          {/* ── LEFT: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="inline-flex items-center gap-2 border border-gold/25 bg-gold/8 px-3 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
                AI Intelligence Desk · Powered by Gemini
              </span>
            </div>

            <h2 className="mt-7 font-serif text-4xl leading-tight text-white lg:text-5xl">
              Your inquiry, qualified<br />
              <span className="italic text-gold">before Carlos calls you.</span>
            </h2>

            <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/65">
              The Miami Desk reads your situation — property, timeline, location, goals — and routes the full picture to Carlos so his first response is already a strategy, not a questionnaire.
            </p>

            <div className="mt-10 space-y-5">
              {CAPABILITIES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-gold/20 bg-gold/8">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-white/70 pt-2">{text}</p>
                </div>
              ))}
            </div>

            {/* Language badges */}
            <div className="mt-10 flex flex-wrap gap-3">
              {LANGUAGES.map((lang) => (
                <span key={lang} className="border border-white/20 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
                  {lang}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-all hover:bg-gold-soft">
                Request Strategy Review
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: Chat UI ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            {/* Chat window */}
            <div className="overflow-hidden border border-gold/20 bg-navy-deep shadow-2xl shadow-black/40">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-white/8 bg-navy/60 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                    miamidesk.ai · intelligence preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/70">Gemini</span>
                </div>
              </div>

              <ChatWindow started={inView} />
            </div>

            {/* Prompt chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => (
                <a
                  key={prompt}
                  href="#contact"
                  className="rounded-full border border-gold/20 bg-navy-deep px-4 py-2 font-sans text-[11px] text-white/55 transition-colors hover:border-gold/50 hover:text-gold"
                >
                  {prompt}
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
