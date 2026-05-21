import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "../constants";

// Paste your Apps Script Web App URL here after deploying from script.google.com
const SHEETS_WEBHOOK = "https://script.google.com/macros/s/AKfycbxDVA5nBsPQzjb1a3I9R_61EwI_H0BTLORYrhaSfuH36DwnTQgGfaf6rLn2YTqzmPQ0/exec";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  phone: "",
  propertyAddress: "",
  city: "",
  timeline: "30-90 days",
  message: ""
};

const encodeForm = (data: Record<string, string>) =>
  new URLSearchParams(data).toString();

export function LeadForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);

    // Fire-and-forget to Google Sheets — no-cors so we can't read response
    if (SHEETS_WEBHOOK && !SHEETS_WEBHOOK.startsWith("PASTE")) {
      fetch(SHEETS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "homesprofessional.com",
          pageUrl: window.location.href,
        }),
        mode: "no-cors",
      }).catch(() => {});
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
        body: encodeForm({
          "form-name": "seller-consultation",
          "bot-field": "",
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }
      setStatus("success");
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      const message =
        error instanceof DOMException && error.name === "AbortError"
          ? "The request timed out. Please use WhatsApp or try again."
          : "The form could not be submitted. Please use WhatsApp or try again.";
      setErrorMessage(message);
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  if (status === "success") {
    return (
      <div className="relative overflow-hidden border border-bone bg-gradient-to-b from-white to-ivory p-8 shadow-2xl lg:p-12">
        <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
        <div className="relative z-10 py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
            <CheckCircle2 size={34} />
          </div>
          <div className="font-mono mb-3 text-[10px] uppercase tracking-[0.35em] text-gold">Seller Request Received</div>
          <h3 className="font-serif text-3xl text-navy">Carlos will review your property details personally.</h3>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-navy/60">
            Your request has been routed through HomesProfessional.com. For urgent timing, use WhatsApp at {CONTACT.phoneUS}.
          </p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-8 bg-navy px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold">
            Send Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-bone bg-white p-8 shadow-2xl lg:p-12">
      <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 -rotate-45 bg-ivory" />
      <div className="relative z-10">
        <div className="mb-8">
          <div className="font-mono mb-2 text-[10px] uppercase tracking-[0.35em] text-gold">Confidential Seller Desk</div>
          <h3 className="font-serif text-3xl text-navy">Request a South Florida Seller Strategy Review</h3>
          <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-navy/45">
            Share the essentials early: email, phone, property address, city, timing, and the context Carlos should review before responding.
          </p>
        </div>

        <form name="seller-consultation" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="form-name" value="seller-consultation" />
          <input type="hidden" name="bot-field" />

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="input-label">Full Name</label>
              <input required name="name" type="text" placeholder="Name" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="input-label">Email Address</label>
              <input required name="email" type="email" placeholder="Email" className="form-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="input-label">Phone / WhatsApp</label>
              <input required name="phone" type="tel" placeholder="+1..." className="form-input" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="input-label">Timeline</label>
              <div className="relative">
                <select name="timeline" className="form-input w-full cursor-pointer appearance-none pr-9" value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}>
                  <option>Immediately</option>
                  <option>30-90 days</option>
                  <option>3-6 months</option>
                  <option>6+ months</option>
                  <option>Exploring options</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold/60">▾</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="input-label">Property Address</label>
              <input required name="propertyAddress" type="text" placeholder="Street address" className="form-input" value={formData.propertyAddress} onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="input-label">City</label>
              <input required name="city" type="text" placeholder="Weston, Coral Gables, Brickell" className="form-input" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="input-label">Message</label>
            <textarea name="message" rows={4} placeholder="What should Carlos know before reviewing your property?" className="form-input" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
          </div>

          {status === "error" && <p className="font-sans text-sm text-red-700">{errorMessage}</p>}

          <button type="submit" disabled={status === "submitting"} className="group flex w-full items-center justify-center gap-3 bg-navy py-5 font-sans text-xs font-bold uppercase tracking-[0.28em] text-white shadow-lg shadow-gold/10 transition-all hover:bg-gold disabled:opacity-60">
            {status === "submitting" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />}
            {status === "submitting" ? "Sending…" : "Request Seller Strategy Review"}
          </button>
          <p className="font-mono text-center text-[8px] uppercase tracking-[0.2em] text-navy/25">
            Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
        </form>
      </div>
    </div>
  );
}
