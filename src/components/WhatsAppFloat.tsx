import { MessageSquare } from "lucide-react";
import { useLocation } from "react-router-dom";
import { CONTACT } from "../constants";
import { trackContact } from "../lib/analytics";

// Section 15 — floating WhatsApp CTA, language/route-aware.
// Desktop right-rail. Mobile WhatsApp is already provided by MobileStickyCTA,
// so this is hidden below lg to avoid a duplicate mobile control.
const SPANISH_ROUTES = (path: string) =>
  path.startsWith("/es") || path === "/madrid" || path === "/spain-desk";

export function WhatsAppFloat() {
  const { pathname } = useLocation();
  const spanish = SPANISH_ROUTES(pathname);
  const href = spanish ? CONTACT.whatsappSpain : CONTACT.whatsappUS;
  const label = spanish ? "WhatsApp España" : "WhatsApp Carlos";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => trackContact("whatsapp", "float")}
      className="whatsapp-float group fixed bottom-8 right-6 z-40 hidden items-center gap-2.5 rounded-full border border-gold/30 bg-navy-deep/95 px-5 py-3.5 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-200 hover:border-gold hover:bg-navy-deep lg:inline-flex"
    >
      <MessageSquare size={16} className="text-gold" />
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 group-hover:text-white">
        {label}
      </span>
    </a>
  );
}
