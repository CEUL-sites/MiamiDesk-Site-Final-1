import { BadgeCheck, Bot, ChevronRight, FileText, Globe2, Loader2, MapPin, MessageCircle, PhoneCall, Send, UserCheck } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CONTACT } from "../constants";
import { AiRobotMascot } from "./AiRobotMascot";
import { ChatRegistrationPanel } from "./housebot/ChatRegistrationPanel";
import { CHAT_COPY, type ChatLang } from "./housebot/miamiDeskChatCopy";
import { turnstileConfigured, useTurnstile } from "../lib/turnstile";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CAPABILITIES = [
  { icon: MapPin,    text: "South Florida market conditions and pricing by neighborhood" },
  { icon: Globe2,    text: "Bilingual intake in English, Spanish, and Portuguese" },
  { icon: UserCheck, text: "Identifies seller, buyer, investor, or agency profile" },
  { icon: FileText,  text: "Prepares structured context before our licensed team responds" },
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
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Inquiry routed to Carlos</span>
      </div>
      <p className="font-sans text-sm leading-relaxed text-white/75 mb-5">
        Your conversation has been organised and sent to our team. We review every AI Desk conversation and respond directly. For the fastest reply, continue on WhatsApp now.
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
          className="inline-flex items-center justify-center gap-2 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
        >
          <PhoneCall size={13} />
          Call {CONTACT.phoneUSDisplay}
        </a>
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
        Carlos Uzcategui, REALTOR® · Florida License SL705771 · United Realty Group · Equal Housing Opportunity
      </p>
    </motion.div>
  );
}

const SESSION_KEY = "ai-desk-session";

function readStoredSession(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}

function storeSession(token: string | null) {
  try {
    if (token) sessionStorage.setItem(SESSION_KEY, token);
  } catch {
    /* storage blocked: the conversation still works for this page view */
  }
}

/** Shown when the per-visitor or site-wide daily question ceiling is reached. */
function LimitPanel({ lang }: { lang: ChatLang }) {
  const t = CHAT_COPY[lang];
  return (
    <div role="status" className="border border-gold/35 bg-gold/[0.06] p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{t.dailyTitle}</p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-white/80">{t.dailyBody}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <a
          href={`https://wa.me/${CONTACT.phoneUS.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep hover:opacity-90"
        >
          <MessageCircle size={13} aria-hidden="true" /> WhatsApp
        </a>
        <a
          href="/contact"
          className="inline-flex items-center justify-center gap-2 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 hover:border-white/40 hover:text-white"
        >
          {t.contactForm}
        </a>
      </div>
    </div>
  );
}

type DeskGate = "register" | "handoff" | "ip_daily" | "global_daily";

export function AiPanel({ lang = "en" }: { lang?: ChatLang }) {
  const t = CHAT_COPY[lang];
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [history, setHistory]       = useState<Message[]>([]);
  const [error, setError]           = useState("");
  const [handoffDone, setHandoff]   = useState(false);
  const [gate, setGate]             = useState<DeskGate | null>(null);
  const [notice, setNotice]         = useState("");
  const [sessionToken, setSessionToken] = useState<string | null>(() => readStoredSession());
  const [turnsLeft, setTurnsLeft]   = useState<number | null>(null);
  const [registered, setRegistered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // Invisible Turnstile check, only while no server session exists yet.
  const turnstile = useTurnstile(turnstileConfigured() && !sessionToken);

  function adoptToken(token: unknown) {
    if (typeof token === "string" && token) {
      setSessionToken(token);
      storeSession(token);
    }
  }

  async function submit(query: string) {
    const q = query.trim();
    if (!q || loading || handoffDone || gate) return;
    if (q.length > 600) {
      setError(t.tooLong);
      return;
    }

    setInput("");
    setLoading(true);
    setError("");
    setNotice("");

    const newHistory: Message[] = [...history, { role: "user", content: q }];
    setHistory(newHistory);

    try {
      const res = await fetch("/.netlify/functions/ai-desk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory,
          sessionToken,
          turnstileToken: sessionToken ? undefined : turnstile.token ?? undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      adoptToken(data.sessionToken);
      if (typeof data.turnsLeft === "number") setTurnsLeft(data.turnsLeft);
      if (typeof data.registered === "boolean") setRegistered(data.registered);

      if (data.gate) {
        // Not answered: keep the question so it can be sent after registering.
        setHistory((h) => h.slice(0, -1));
        setInput(q);
        if (data.gate === "handoff") setHandoff(true);
        else setGate(data.gate as DeskGate);
        return;
      }

      if (!res.ok || data.error) {
        if (data.verification) turnstile.reset();
        setError(data.verification ? t.verifyError : data.error ?? t.networkError);
        setHistory((h) => h.slice(0, -1));
        setInput(q);
        return;
      }

      const aiResponse: string = data.response;
      setHistory((h) => [...h, { role: "assistant", content: aiResponse }]);

      if (data.handoffReady) {
        setTimeout(() => setHandoff(true), 1200);
      }
    } catch {
      setError(t.networkError);
      setHistory((h) => h.slice(0, -1));
      setInput(q);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 100);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") submit(input);
  }

  const summary = history
    .filter((m) => m.role === "user")
    .slice(-5)
    .map((m) => `Q: ${m.content}`)
    .join("\n");

  // Bring the registration form into view (it can start below the fold on phones).
  useEffect(() => {
    if (gate !== "register") return;
    const t = window.setTimeout(() => {
      document.getElementById("ai-desk-reg-title")?.closest("form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [gate]);

  const progressLabel =
    turnsLeft === null ? null : registered ? t.regLeft(turnsLeft) : t.freeLeft(turnsLeft);

  return (
    <div className="flex flex-col gap-4">
      <div ref={turnstile.ref} />

      {/* Questions remaining — the server's count, not the browser's */}
      {progressLabel && !handoffDone && !gate && (
        <p className="text-right font-mono text-[10px] uppercase tracking-[0.18em] text-white/70" aria-live="polite">
          {progressLabel}
        </p>
      )}

      {/* Opening message — shown before first user message */}
      {history.length === 0 && (
        <div className="flex gap-2 justify-start">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/30 mt-0.5">
            <Bot size={12} className="text-gold" />
          </div>
          <div className="max-w-[90%] rounded-2xl rounded-bl-none bg-white/[0.08] px-4 py-2.5 font-sans text-sm leading-relaxed text-white/85">
            {t.opening}
          </div>
        </div>
      )}

      {/* Chat history */}
      {history.length > 0 && (
        <div ref={scrollRef} className="space-y-3 max-h-72 overflow-y-auto pr-1 scroll-smooth" aria-live="polite">
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

      {notice && <p role="status" className="font-sans text-xs text-gold">{notice}</p>}

      {handoffDone ? (
        <HandoffPanel history={history} />
      ) : gate === "register" ? (
        <ChatRegistrationPanel
          lang={lang}
          sessionToken={sessionToken}
          summary={summary}
          onUnlocked={(left) => {
            setGate(null);
            setRegistered(true);
            setTurnsLeft(left);
            setNotice(t.unlocked);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          onHandoff={() => {
            setGate(null);
            setHandoff(true);
          }}
        />
      ) : gate === "ip_daily" || gate === "global_daily" ? (
        <LimitPanel lang={lang} />
      ) : (
        <>
          {/* Error state */}
          {error && (
            <p role="alert" className="font-mono text-[10px] text-red-300">{error}</p>
          )}

          {/* Input bar */}
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 focus-within:ring-gold/40 transition-all">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={history.length === 0 ? t.placeholderFirst : t.placeholderNext}
              maxLength={600}
              className="flex-1 bg-transparent font-sans text-base sm:text-sm text-white/80 placeholder:text-white/70 outline-none"
              aria-label={t.inputLabel}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => submit(input)}
              disabled={loading || !input.trim()}
              aria-label={t.send}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 hover:bg-gold/40 transition-colors disabled:opacity-40"
            >
              {loading
                ? <Loader2 size={12} className="text-gold animate-spin" />
                : <Send size={12} className="text-gold" />
              }
            </button>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 text-center">
            {t.footer}
          </p>

          {/* Suggestion chips — only before first message (English page copy) */}
          {history.length === 0 && lang === "en" && (
            <div className="flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submit(prompt)}
                  disabled={loading}
                  className="rounded-full border border-gold/20 bg-navy-deep px-4 py-2 font-sans text-[11px] text-white/70 transition-colors hover:border-gold/50 hover:text-gold disabled:opacity-40"
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
    <section id="intelligence" ref={sectionRef} className="border-t border-gold/20 bg-navy py-10 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-7 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">

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
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                AI Intelligence Desk · Powered by Gemini
              </span>
            </div>

            <h2 className="mt-5 font-serif text-3xl leading-tight text-white lg:mt-7 lg:text-5xl">
              Your inquiry, qualified<br />
              <span className="italic text-gold">before our team calls you.</span>
            </h2>

            <p className="mt-3 max-w-lg font-sans text-base leading-relaxed text-white/65 md:mt-6 md:text-lg">
              The Miami Desk reads your situation — property, timeline, location, goals — and routes the full picture to our licensed professionals so their first response is already a strategy, not a questionnaire.
            </p>

            <div className="mt-5 space-y-3 md:mt-10 md:space-y-5">
              {CAPABILITIES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-gold/20 bg-gold/8">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-white/70 pt-2">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3 md:mt-10">
              {LANGUAGES.map((lang) => (
                <span key={lang} className="border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                  {lang}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-10">
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
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                    miamidesk.ai · intelligence desk
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">Gemini · Live</span>
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
