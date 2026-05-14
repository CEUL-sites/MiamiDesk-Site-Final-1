import { Bot, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { CONTACT } from "../constants";

const CAPABILITIES = [
  "Qualify South Florida seller inquiries before a consultation",
  "Separate seller, buyer, investor, agency, and referral inquiries",
  "Capture language preference and preferred contact channel",
  "Prepare structured intake notes for Carlos before personal follow-up"
];

export const IntelligenceDesk = () => {
  return (
    <section id="intelligence" className="py-24 bg-ivory border-y border-bone relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 mb-8">
              <Bot size={14} className="text-gold" />
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em]">
                AI Intelligence Desk
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl text-navy mb-8 font-serif leading-tight">
              Every inquiry routed to Carlos <br />
              <span className="text-gold italic font-light">with the right context already in hand.</span>
            </h2>

            <p className="text-lg text-navy/70 leading-relaxed mb-8 max-w-xl">
              The Miami Desk is being built with AI-assisted intake to qualify seller, buyer, investor, and agency inquiries — so that when Carlos responds, he already understands your situation, timeline, and goals.
            </p>

            <div className="space-y-4 mb-10">
              {CAPABILITIES.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-gold mt-1 flex-shrink-0" />
                  <p className="text-sm text-navy/65 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="px-8 py-5 bg-navy text-white font-bold uppercase tracking-widest hover:bg-gold transition-all text-center">
                Request a Seller Strategy Review
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="px-8 py-5 border border-gold text-navy font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all text-center inline-flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-navy p-8 lg:p-12 shadow-2xl border-b-4 border-gold">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-2">Preview Mode</div>
                <h3 className="text-2xl font-serif text-white">Intake Routing Framework</h3>
              </div>
              <ShieldCheck className="text-gold" size={30} />
            </div>

            <div className="space-y-4">
              {[
                "South Florida seller",
                "South Florida buyer or investor",
                "Spain / Madrid agency or developer",
                "International referral partner"
              ].map((label) => (
                <div key={label} className="p-4 bg-white/5 border border-white/10 text-white/75 text-sm uppercase tracking-widest">
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white/45 text-xs leading-relaxed">
                All inquiries are reviewed personally by Carlos before any response is sent. AI intake prepares context — Carlos closes the conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
