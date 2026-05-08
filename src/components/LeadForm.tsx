import React, { useState } from "react";
import { Send, Phone } from "lucide-react";
import { CONTACT } from "../constants";

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Selling in South Florida",
    timeline: "30–90 days",
    market: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Inquiry: ${formData.interest} - ${formData.name}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone/WhatsApp: ${formData.phone}
Interest: ${formData.interest}
Timeline: ${formData.timeline}
Market/City: ${formData.market}

Message:
${formData.message}
    `.trim();

    const mailtoUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="bg-white p-8 lg:p-12 border border-bone shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-ivory -rotate-45 translate-x-16 -translate-y-16" />
      
      <div className="relative z-10">
        <div className="mb-8">
          <div className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-2 uppercase">CarlosRE Strategy Desk</div>
          <h3 className="text-2xl font-serif text-navy">Start With a Private Property Strategy Review</h3>
          <p className="text-navy/50 text-sm mt-3 font-light">
            Share a few details and Carlos will review the best next step for your property, 
            purchase, referral, or Spain-related opportunity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="Name" 
                className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Email Address</label>
              <input 
                required
                type="email" 
                placeholder="Email" 
                className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Phone / WhatsApp</label>
              <input 
                required
                type="tel" 
                placeholder="+1..." 
                className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">City or Market</label>
              <input 
                type="text" 
                placeholder="e.g. Weston, Miami" 
                className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30"
                value={formData.market}
                onChange={(e) => setFormData({...formData, market: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">I am interested in</label>
              <select 
                className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy appearance-none cursor-pointer"
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
              >
                <option>Selling in South Florida</option>
                <option>Buying in South Florida</option>
                <option>Investing</option>
                <option>Relocating</option>
                <option>Spain property / developer / agency</option>
                <option>Referral partnership</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Timeline</label>
              <select 
                className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy appearance-none cursor-pointer"
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              >
                <option>Immediately</option>
                <option>30–90 days</option>
                <option>3–6 months</option>
                <option>6+ months</option>
                <option>Exploring options</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Message</label>
            <textarea 
              rows={4}
              placeholder="How can Carlos help with your strategy?" 
              className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-navy text-white font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all flex items-center justify-center gap-3 group shadow-lg shadow-navy/10"
          >
            <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            Request Private Review
          </button>
        </form>
      </div>
    </div>
  );
}
