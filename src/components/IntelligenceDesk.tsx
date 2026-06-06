import { BadgeCheck, Bot, ChevronRight, FileText, Globe2, Loader2, MapPin, MessageCircle, PhoneCall, Send, UserCheck } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { CONTACT } from "../constants";
import { AiRobotMascot } from "./AiRobotMascot";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CAPABILITIES = [
  { icon: MapPin,    text: "South Florida market conditions and pricing by neighborhood" },
  { icon: Globe2,    text: "Bilingual intake in English, Spanish, and Portuguese" },
  { icon: UserCheck, text: "Identifies seller, buyer, investor, or agency profile" },
  { icon: FileText,  text: "Prepares structured context before our licensed team responds personally" },
];

const PROMPTS = [
  "What is the current price per sq ft in Coral Gables?",
  "¿Cómo activo mi propiedad española en Miami MLS?",
  "What does the seller strategy review include?",
  "How long does it take to sell in Weston?",
];

const LANGUAGES = ["English", "Español", "Português"];

interface Message {
  role: "user" | "assistant";
  content: string;
}


function HandoffPanel({ history }: { history: Message[] }) {
  const summary = history
    .slice(-6)
    .map((m) => `${m.role === "user" ? "You" : "AI"}: ${m.content}`)
    .join("\n");
  const waText = encodeURIComponent(
    `Hello Carlos, I was speaking with your AI Desk. Here is a summary of my inquiry:\n\n${summary}\n\nPlease review and contact me.`
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-gold/40 bg-gold/[0.06] p-5 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-3">
        <BadgeCheck size={15} className="text-gold flex-shrink-0" />
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">Inquiry routed to Carlos</span>
      </div>
      <p className="font-sans text-sm leading-relaxed text-white/75 mb-5">
        Your conversation has been organised and sent to Carlos. He reviews every AI Desk conversation personally and responds within one business day. For the fastest reply, continue on WhatsApp now.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={`https://wa.me/${CONTACT.phoneUS.replace(/\D/g, "")}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
        >
          <MessageCircle size={13} />
          Continue on WhatsApp
        </a>
        <a
          href={CONTACT.phoneUSLink}
          className="inline-flex items-center justify-center gap-2 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/65 transition-colors hover:border-white/40 hover:text-white"
        >
          <PhoneCall size={13} />
          Call {CONTACT.phoneUSDisplay}
        </a>
      </div>
      <p className="mt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-white/30">
        Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
      </p>
    </motion.div>
  );
}

function AiPanel() {
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [history, setHistory]       = useState<Message[]>([]);
  const [lastQuery, setLastQuery]   = useState("");
  const [error, setError]           = useState("");
  const [handoffDone, setHandoff]   = useState(false);
  const [turnCount, setTurnCount]   = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function submit(query: string) {
    const q = query.trim();
    if (!q || loading || handoffDone) return;

    setInput("");
    setLoading(true);
    setError("");
    setLastQuery(q);

    const newHistory: Message[] = [...history, { role: "user", content: q }];
    setHistory(newHistory);
    const newTurn = turnCount + 1;
    setTurnCount(newTurn);

    try {
      const res = await fetch("/.netlify/functions/ai-desk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory, turnCount: newTurn }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error ?? "The AI desk is temporarily unavailable.");
        setHistory((h) => h.slice(0, -1));
        return;
      }

      const aiResponse: string = data.response;
      setHistory((h) => [...h, { role: "assistant", content: aiResponse }]);

      if (data.handoffReady) {
        setTimeout(() => setHandoff(true), 1200);
      }
    } catch {
      setError("Network error. Please try again or contact us directly.");
      setHistory((h) => h.slice(0, -1));
    } finally {
      setLoading(false);
      inputRef.current?.focus();
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 100);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit(input);
  }

  const lastAssistantMsg = [...history].reverse().find((m) => m.role === "assistant");

  const HANDOFF_THRESHOLD = 10;
  const progressPct = Math.min(100, (turnCount / HANDOFF_THRESHOLD) * 100);

  return (
    <div className="flex flex-col gap-4">

      {/* Turn progress bar — visible after first message */}
      {turnCount > 0 && !handoffDone && (
        <div className="flex items-center gap-2">
          <div className="h-0.5 flex-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold/60 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/30 whitespace-nowrap">
            {turnCount < HANDOFF_THRESHOLD
              ? `${HANDOFF_THRESHOLD - turnCount} questions to team review`
              : "Routing to Carlos"}
          </span>
        </div>
      )}

      {/* Opening message — shown before first user message */}
      {history.length === 0 && (
        <div className="flex gap-2 justify-start">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/30 mt-0.5">
            <Bot size={12} className="text-gold" />
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-bl-none bg-white/[0.08] px-4 py-2.5 font-sans text-sm leading-relaxed text-white/85">
            Welcome. Tell me what brings you here — a South Florida sale, a purchase, a cross-border inquiry, or an agent referral — and I'll gather the right details so Carlos can respond with strategy, not a questionnaire.
          </div>
        </div>
      )}

      {/* Chat history */}
      {history.length > 0 && (
        <div ref={scrollRef} className="space-y-3 max-h-72 overflow-y-auto pr-1 scroll-smooth">
          {history.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/30 mt-0.5">
                  <Bot size={12} className="text-gold" />
                </div>
              )}
              <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 font-sans text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-br-none bg-gold text-navy font-medium"
                  : "rounded-bl-none bg-white/[0.08] text-white/85"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-2 items-center">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/30">
                <Bot size={12} className="text-gold" />
              </div>
              <div className="flex gap-1 rounded-2xl rounded-bl-none bg-white/[0.08] px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-bounce [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-bounce [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Handoff panel — replaces input after routing */}
      {handoffDone ? (
        <HandoffPanel history={history} />
      ) : (
        <>
          {/* Error state */}
          {error && (
            <p className="font-mono text-[10px] text-red-400/80">{error}</p>
          )}

          {/* Input bar */}
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 focus-within:ring-gold/40 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={history.length === 0 ? "Ask anything about South Florida…" : "Continue the conversation…"}
              maxLength={500}
              className="flex-1 bg-transparent font-sans text-sm text-white/80 placeholder:text-white/25 outline-none"
              aria-label="Ask the AI desk a question"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => submit(input)}
              disabled={loading || !input.trim()}
              aria-label="Send question"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 hover:bg-gold/40 transition-colors disabled:opacity-40"
            >
              {loading
                ? <Loader2 size={12} className="text-gold animate-spin" />
                : <Send size={12} className="text-gold" />
              }
            </button>
          </div>

          <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/20 text-center">
            AI intake · Carlos responds personally within one business day
          </p>

          {/* Suggestion chips — only before first message */}
          {history.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submit(prompt)}
                  disabled={loading}
                  className="rounded-full border border-gold/20 bg-navy-deep px-4 py-2 font-sans text-[11px] text-white/55 transition-colors hover:border-gold/50 hover:text-gold disabled:opacity-40"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export const IntelligenceDesk = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });

  return (
    <section id="intelligence" ref={sectionRef} className="border-t border-gold/20 bg-navy py-14 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:items-start">

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
              <span className="italic text-gold">before our team calls you.</span>
            </h2>

            <p className="mt-6 max-w-lg font-sans text-lg leading-relaxed text-white/65">
              The Miami Desk reads your situation — property, timeline, location, goals — and routes the full picture to our licensed professionals so their first response is already a strategy, not a questionnaire.
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

            <div className="mt-10 flex flex-wrap gap-3">
              {LANGUAGES.map((lang) => (
                <span key={lang} className="border border-white/20 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.25em] text-white/60">
                  {lang}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-all hover:bg-gold-soft"
              >
                Schedule a 30-minute listing strategy call
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="relative"
          >
            {/* Robot mascot — sits bottom-left of the panel */}
            <div className="absolute -bottom-10 -left-8 z-20 hidden lg:block">
              <AiRobotMascot />
            </div>

            <div className="overflow-hidden border border-gold/20 bg-navy-deep shadow-2xl shadow-black/40">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-white/8 bg-navy/60 px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
                    miamidesk.ai · intelligence desk
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-gold/70">Gemini · Live</span>
                  </span>
                  {/* Robot badge — mobile only (desktop robot floats outside) */}
                  <span className="lg:hidden">
                    <AiRobotMascot />
                  </span>
                </div>
              </div>

              <div className="p-5 lg:p-6">
                <AiPanel />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
