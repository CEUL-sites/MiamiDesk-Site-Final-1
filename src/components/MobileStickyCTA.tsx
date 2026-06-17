import { MessageSquare, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT } from "../constants";
import { trackContact } from "../lib/analytics";

export function MobileStickyCTA() {
  const [hidden, setHidden] = useState(false);
  // Default to the main seller funnel; if the current page has its own
  // in-page form (#contact), target that instead so we never navigate the
  // user away mid-page.
  const [sellHref, setSellHref] = useState("/sell-south-florida#contact");

  // Hide when the seller form is visible — user is already in the funnel
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    setSellHref("#contact");
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 left-0 right-0 z-50 flex justify-center lg:hidden">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/25 bg-navy-deep/92 px-2.5 py-2 shadow-2xl shadow-black/60 backdrop-blur-md">
        <a
          href={CONTACT.phoneUSLink}
          aria-label="Call Carlos"
          onClick={() => trackContact("phone", "mobile_sticky")}
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 transition-all duration-100 active:scale-95"
        >
          <Phone size={13} className="text-gold" />
          Call
        </a>
        <a
          href={CONTACT.whatsappUS}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("whatsapp", "mobile_sticky")}
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 transition-all duration-100 active:scale-95"
        >
          <MessageSquare size={13} className="text-gold" />
          WhatsApp
        </a>
        <a
          href={sellHref}
          className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gold px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-navy transition-all duration-100 hover:bg-gold-soft active:scale-95"
        >
          Get My Home Value
        </a>
      </div>
    </div>
  );
}
