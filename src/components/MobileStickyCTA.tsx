import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CONTACT, isSpainMarketRoute, isSpanishLangRoute } from "../constants";
import { trackContact } from "../lib/analytics";
import { getConsent } from "../lib/consent";
import { shouldRenderMobileSticky } from "./mobileStickyModel";

export function MobileStickyCTA() {
  const { pathname } = useLocation();
  const spainLine = isSpainMarketRoute(pathname);
  const spanishLabels = isSpanishLangRoute(pathname);

  const [hidden, setHidden] = useState(false);
  const [consentPending, setConsentPending] = useState(true);
  const [guardVisible, setGuardVisible] = useState(false);
  // Default to the main seller funnel; if the current page has its own
  // in-page form (#list-here, #contact, or #listing-request), target that instead so we
  // never navigate the user away mid-page.
  const [sellHref, setSellHref] = useState(
    spanishLabels ? "/es/vender#contact" : "/sell-south-florida#contact"
  );

  // Hide when the seller form is visible — user is already in the funnel
  useEffect(() => {
    const el =
      document.getElementById("list-here") ??
      document.getElementById("contact") ??
      document.getElementById("listing-request");
    if (!el) return;
    setSellHref(`#${el.id}`);
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Elements marked data-sticky-cta-guard (e.g. the review spotlight card)
  // must never sit under the pill. The observer root is shrunk to the bottom
  // band of the viewport where the pill lives, so the pill yields only while
  // a guarded element actually crosses that band.
  useEffect(() => {
    const guards = document.querySelectorAll("[data-sticky-cta-guard]");
    if (guards.length === 0) return;
    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setGuardVisible(intersecting.size > 0);
      },
      { rootMargin: "-85% 0px 0px 0px", threshold: 0 }
    );
    guards.forEach((guard) => observer.observe(guard));
    return () => observer.disconnect();
  }, [pathname]);

  // The cookie dialog temporarily owns the mobile bottom action area. Hiding
  // this bar until a choice is made prevents two competing fixed controls.
  useEffect(() => {
    const syncConsent = () => setConsentPending(getConsent() === null);
    syncConsent();
    window.addEventListener("hp-consent-change", syncConsent);
    return () => window.removeEventListener("hp-consent-change", syncConsent);
  }, []);

  if (!shouldRenderMobileSticky({ formVisible: hidden, consentPending, guardVisible })) return null;

  const whatsappHref = spainLine ? CONTACT.whatsappSpain : CONTACT.whatsappUS;
  const sellLabel = spanishLabels
    ? "Vender mi casa"
    : spainLine
      ? "List My Property"
      : "Sell My Home";

  return (
    <div className="pointer-events-none fixed bottom-5 left-0 right-0 z-50 flex justify-center lg:hidden">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/25 bg-navy-deep/92 px-2.5 py-2 shadow-2xl shadow-black/60 backdrop-blur-md">
        <a
          href={whatsappHref}
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
          {sellLabel}
        </a>
      </div>
    </div>
  );
}
