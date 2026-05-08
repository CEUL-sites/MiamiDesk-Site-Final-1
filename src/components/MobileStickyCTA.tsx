import { Phone, Calendar } from "lucide-react";
import { CONTACT } from "../constants";

export function MobileStickyCTA() {
  return (
    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50 pointer-events-none">
        <div className="flex gap-3 h-16 w-full pointer-events-auto">
            <a 
                href={CONTACT.whatsappUS}
                className="flex-1 h-full bg-navy text-white rounded-full flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform border border-white/10"
            >
                <Phone size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">WhatsApp</span>
            </a>
            <a 
                href="#contact"
                className="flex-1 h-full bg-gold text-white rounded-full flex items-center justify-center gap-2 shadow-2xl active:scale-95 transition-transform"
            >
                <Calendar size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Seller Call</span>
            </a>
        </div>
    </div>
  );
}
