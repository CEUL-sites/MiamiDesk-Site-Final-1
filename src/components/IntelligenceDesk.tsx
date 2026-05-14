import { Bot, CheckCircle2, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const FEATURES = [
  "Current market conditions by South Florida neighborhood",
  "Comparative pricing: Miami vs Madrid vs Bogotá vs São Paulo",
  "International agency activation inquiry and intake",
  "Seller listing intake, start your strategy review now"
];

const PREVIEW_CONVERSATION = [
  { role: "desk", text: "Good afternoon. I'm the Miami Desk, Carlos Uzcategui's AI advisor. Are you looking to sell a South Florida property, or do you represent an agency in Spain or LATAM?" },
  { role: "user", text: "I own a home in Coral Gables and I'm thinking about listing this year." },
  { role: "desk", text: "Coral Gables is one of South Florida's most resilient luxury submarkets. Before I route your inquiry to Carlos, a few quick details: approximate square footage, and are you thinking of listing before or after summer?" }
];

const PROMPTS = [
  "What is the current price per sq ft in Coral Gables?",
  "¿Cómo activo mi propiedad española en Miami MLS?",
  "What does the seller strategy review include?"
];

export const IntelligenceDesk = () => {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    if (visibleMessages >= PREVIEW_CONVERSATION.length) return;
    const timer = window.setTimeout(() => setVisibleMessages((count) => count + 1), 800);
    return () => window.clearTimeout(timer);
  }, [visibleMessages]);

  return (
    <section id="intelligence" className="bg-navy py-24 text-white">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">AI Intelligence Desk · Powered by Gemini</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-white lg:text-6xl">Ask the desk anything about South Florida.</h2>
          <p className="mt-7 max-w-xl font-sans text-lg leading-relaxed text-white/65">
            The Miami Desk qualifies your inquiry, identifies your profile — seller, buyer, investor, or agency — and prepares the full context for Carlos's personal review. Available in English, Spanish, and Portuguese.
          </p>

          <div className="mt-9 space-y-4">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 text-gold" size={18} />
                <p className="font-sans text-sm leading-relaxed text-white/70">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="border border-gold/20 bg-navy-deep shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_18px_rgba(176,141,87,0.8)]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Intelligence Desk · Preview</span>
              </div>
              <Bot className="text-white/30" size={18} />
            </div>

            <div className="min-h-[430px] space-y-5 p-5 lg:p-7">
              {PREVIEW_CONVERSATION.slice(0, visibleMessages).map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] px-5 py-4 font-sans text-sm leading-relaxed ${message.role === "user" ? "bg-gold text-navy" : "bg-white text-slate"}`}>
                    {message.role === "desk" && <div className="font-mono mb-2 text-[8px] uppercase tracking-[0.2em] text-gold">Carlos AI Desk</div>}
                    {message.text}
                  </div>
                </div>
              ))}

              {visibleMessages < PREVIEW_CONVERSATION.length && (
                <div className="flex gap-1 px-5 py-4">
                  <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
                  <span className="typing-dot h-2 w-2 rounded-full bg-gold" />
                </div>
              )}

              {visibleMessages >= PREVIEW_CONVERSATION.length && (
                <a href="#contact" className="group inline-flex items-center gap-2 border border-gold px-5 py-3 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-navy">
                  Start your real inquiry
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
            {PROMPTS.map((prompt) => (
              <a key={prompt} href="#contact" className="whitespace-nowrap border border-gold/30 bg-navy-deep px-4 py-3 font-sans text-xs font-medium text-white/70 transition-colors hover:bg-gold/10 hover:text-gold">
                {prompt}
              </a>
            ))}
          </div>
          <p className="font-mono mt-4 text-[9px] uppercase tracking-[0.2em] text-white/30">Live AI desk in development · leave your details to be notified</p>
        </div>
      </div>
    </section>
  );
};
