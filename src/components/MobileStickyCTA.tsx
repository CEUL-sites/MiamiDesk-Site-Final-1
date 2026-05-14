import { Calendar, Phone } from "lucide-react";
import { CONTACT } from "../constants";

export function MobileStickyCTA() {
  return (
    <div className="pointer-events-none fixed bottom-5 left-4 right-4 z-50 border-t border-gold/50 bg-white/10 p-2 backdrop-blur-md lg:hidden">
      <div className="pointer-events-auto flex h-14 w-full gap-2">
        <a href={CONTACT.whatsappUS} className="flex h-full flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-navy text-white shadow-2xl transition-transform active:scale-95">
          <Phone size={18} />
          <span className="font-sans text-xs font-bold uppercase tracking-widest">WhatsApp</span>
        </a>
        <a href="#contact" className="flex h-full flex-1 items-center justify-center gap-2 rounded-2xl bg-gold text-navy shadow-2xl transition-transform active:scale-95">
          <Calendar size={18} />
          <span className="font-sans text-xs font-bold uppercase tracking-widest">Seller Call</span>
        </a>
      </div>
    </div>
  );
}
