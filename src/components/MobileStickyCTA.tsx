import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { CONTACT } from "../constants";

export function MobileStickyCTA() {
  const [hidden, setHidden] = useState(false);

  // Hide when the seller form is visible — user is already in the funnel
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
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
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/25 bg-navy-deep/92 px-3 py-2 shadow-2xl shadow-black/60 backdrop-blur-md">
        <a
          href={CONTACT.whatsappUS}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 transition-colors active:scale-95"
        >
          <MessageSquare size={13} className="text-gold" />
          WhatsApp
        </a>
        <a
          href="#contact"
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-gold-soft active:scale-95"
        >
          Strategy Review
        </a>
      </div>
    </div>
  );
}
