import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "../constants";
import { pushEvent } from "../lib/analytics";

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

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
        body: encodeForm({
          "form-name": "seller-consultation",
          "bot-field": "",
          ...formData,
          sourcePage: "seller-consultation"
        })
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }
      pushEvent("form_submit_seller", { form: "seller-consultation", page: "spain-desk" });
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
          <h3 className="font-serif text-3xl text-navy">Our licensed team will review your property details personally.</h3>
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
            Share the essentials early: email, phone, property address, city, timing, and the context our team should review before responding.
          </p>
        </div>

        <form name="seller-consultation" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="form-name" value="seller-consultation" />
          <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
            <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="input-label">Full Name</span>
              <input required name="name" type="text" placeholder="Name" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="input-label">Email Address</span>
              <input required name="email" type="email" placeholder="Email" className="form-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="input-label">Phone / WhatsApp</span>
              <input required name="phone" type="tel" placeholder="+1..." className="form-input" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="input-label">Timeline</span>
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
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2">
              <span className="input-label">Property Address</span>
              <input required name="propertyAddress" type="text" placeholder="Street address" className="form-input" value={formData.propertyAddress} onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })} />
            </label>
            <label className="flex flex-col gap-2">
              <span className="input-label">City</span>
              <input required name="city" type="text" placeholder="Weston, Coral Gables, Brickell" className="form-input" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
            </label>
          </div>

          <label className="flex flex-col gap-2">
            <span className="input-label">Message</span>
            <textarea name="message" rows={4} placeholder="What should our team know before reviewing your property?" className="form-input" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
          </label>

          {status === "error" && (
            <p className="font-sans text-sm text-red-600 font-medium mt-2">
              {errorMessage}
            </p>
          )}

          <p className="font-mono text-center text-[9px] uppercase tracking-[0.2em] text-navy/40 mt-2">
            Prefer WhatsApp?{" "}
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline hover:text-gold-deep"
            >
              Message Carlos directly
            </a>
          </p>

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
