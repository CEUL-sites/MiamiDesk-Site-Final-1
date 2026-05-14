import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { CONTACT } from "../constants";

const encodeForm = (data: Record<string, string>) =>
  new URLSearchParams(data).toString();

export function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    city: "",
    timeline: "30-90 days",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "seller-consultation",
          ...formData
        })
      });
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyAddress: "",
        city: "",
        timeline: "30-90 days",
        message: ""
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white p-8 lg:p-12 border border-bone shadow-2xl relative overflow-hidden">
        <div className="relative z-10 text-center py-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
            <CheckCircle2 size={34} />
          </div>
          <div className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-3">Seller Request Received</div>
          <h3 className="text-3xl font-serif text-navy mb-4">Carlos will review your property details personally.</h3>
          <p className="text-navy/60 text-sm leading-relaxed max-w-md mx-auto">
            Your request has been routed through HomesProfessional.com. For urgent timing, use WhatsApp at {CONTACT.phoneUS}.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 px-8 py-4 bg-navy text-white font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all"
          >
            Send Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 lg:p-12 border border-bone shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-ivory -rotate-45 translate-x-16 -translate-y-16" />
      
      <div className="relative z-10">
        <div className="mb-8">
          <div className="text-[10px] font-bold text-gold uppercase tracking-[0.4em] mb-2">Confidential Seller Desk</div>
          <h3 className="text-2xl font-serif text-navy">Request a South Florida Seller Strategy Review</h3>
          <p className="text-navy/50 text-sm mt-3 font-light">
            Share the essentials early: email, phone, property address, city, timing, and the context Carlos should review before responding.
          </p>
          <p className="text-[10px] text-navy/40 uppercase tracking-widest mt-4 leading-relaxed">
            {CONTACT.licenseDisplay} · {CONTACT.brokerage}
          </p>
        </div>

        <form name="seller-consultation" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="form-name" value="seller-consultation" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Full Name</label>
              <input required name="name" type="text" placeholder="Name" className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Email Address</label>
              <input required name="email" type="email" placeholder="Email" className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Phone / WhatsApp</label>
              <input required name="phone" type="tel" placeholder="+1..." className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Timeline</label>
              <select name="timeline" className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy appearance-none cursor-pointer" value={formData.timeline} onChange={(e) => setFormData({...formData, timeline: e.target.value})}>
                <option>Immediately</option>
                <option>30-90 days</option>
                <option>3-6 months</option>
                <option>6+ months</option>
                <option>Exploring options</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Property Address</label>
              <input required name="propertyAddress" type="text" placeholder="Street address" className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30" value={formData.propertyAddress} onChange={(e) => setFormData({...formData, propertyAddress: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">City</label>
              <input required name="city" type="text" placeholder="Weston, Coral Gables, Brickell" className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-navy/40">Message</label>
            <textarea name="message" rows={4} placeholder="What should Carlos know before reviewing your property?" className="p-4 bg-ivory border-none focus:ring-1 focus:ring-gold outline-none text-navy placeholder:text-navy/30" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-700">The form could not be submitted. Please use WhatsApp or try again.</p>
          )}

          <button type="submit" disabled={status === "submitting"} className="w-full py-5 bg-navy text-white font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all flex items-center justify-center gap-3 group shadow-lg shadow-navy/10 disabled:opacity-60">
            <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            {status === "submitting" ? "Sending Review Request" : "Request Seller Strategy Review"}
          </button>
        </form>
      </div>
    </div>
  );
}