import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT, isSpainMarketRoute } from "../constants";
import { trackContact, trackMicroConversion } from "../lib/analytics";

// Section 15 — floating WhatsApp CTA, language/route-aware.
// Desktop right-rail. Mobile WhatsApp is already provided by MobileStickyCTA,
// so this is hidden below lg to avoid a duplicate mobile control.

export function WhatsAppFloat() {
  const { pathname } = useLocation();
  const [heroVisible, setHeroVisible] = useState(true);
  const spanish = isSpainMarketRoute(pathname);
  const href = spanish ? CONTACT.whatsappSpain : CONTACT.whatsappUS;
  const label = spanish ? "WhatsApp España" : "WhatsApp Carlos";

  // Every page opens with a hero that carries its own WhatsApp/contact path,
  // and the float overlapped hero panels at 1024–1440px. Show it only once
  // the visitor has scrolled most of the first screen.
  useEffect(() => {
    const update = () => setHeroVisible(window.scrollY < window.innerHeight * 0.6);
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => {
        trackContact("whatsapp", "float");
        trackMicroConversion("hp_cta_click", {
          type: spanish ? "whatsapp_es" : "whatsapp_us",
          location: "desktop_float",
        });
      }}
      className={`whatsapp-float group fixed bottom-8 right-6 z-40 hidden items-center gap-2.5 rounded-full border border-gold/30 bg-navy-deep/95 px-5 py-3.5 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-200 hover:border-gold hover:bg-navy-deep lg:inline-flex ${
        heroVisible ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <MessageSquare size={16} className="text-gold" />
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-white/85 group-hover:text-white">
        {label}
      </span>
    </a>
  );
}
