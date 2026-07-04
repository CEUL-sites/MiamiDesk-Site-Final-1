import { ArrowRight, MessageSquare, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT } from "../constants";
import { trackContact, trackFunnelEvent } from "../lib/analytics";

// Desktop counterpart to MobileStickyCTA — a slim bottom bar that appears
// after the visitor scrolls past the hero and keeps one valuation CTA in
// reach. Hides while the in-page seller form (#contact) is visible and
// stays dismissed for the session once closed.

const DISMISS_KEY = "hp_desktop_cta_dismissed";

export function DesktopStickyCTA() {
  const [scrolled, setScrolled] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }

    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const el = document.getElementById("contact");
    let observer: IntersectionObserver | null = null;
    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => setFormVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );
      observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = !dismissed && scrolled && !formVisible;

  // Flag the bar's presence on <body> so the standalone WhatsApp float
  // (rendered in a separate tree) can yield — the bar has its own WhatsApp
  // action, and the two otherwise stack at the same bottom edge.
  useEffect(() => {
    document.body.toggleAttribute("data-desktop-cta", visible);
    return () => document.body.removeAttribute("data-desktop-cta");
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    setDismissed(true);
    try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch { /* private mode */ }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden lg:block">
      <div className="border-t border-gold/25 bg-navy-deep/95 shadow-2xl shadow-black/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <p className="font-sans text-sm text-white/80">
            <span className="font-serif text-base text-white">What's your South Florida home worth?</span>
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              Free MLS-based analysis · No listing commitment
            </span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", "desktop_sticky")}
              className="inline-flex items-center gap-2 border border-white/15 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <MessageSquare size={12} className="text-gold" />
              WhatsApp Carlos
            </a>
            <a
              href="/home-value"
              onClick={() => trackFunnelEvent("sticky_cta_home_value")}
              className="group inline-flex items-center gap-2 bg-gold px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Get My Home Value
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="p-1.5 text-white/35 transition-colors hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
