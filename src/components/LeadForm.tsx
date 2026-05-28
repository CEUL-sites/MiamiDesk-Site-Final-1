import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "../constants";
import { pushEvent } from "../lib/analytics";

type Intent =
  | "Sell South Florida"
  | "Activate Spain or LATAM property"
  | "Buyer relocation"
  | "Agency partnership"
  | "";

interface FormData {
  name: string;
  email: string;
  phone: string;
  intent: Intent;
  propertyAddress: string;
  city: string;
  timeline: string;
  message: string;
  leadSource: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  intent: "",
  propertyAddress: "",
  city: "",
  timeline: "30-90 days",
  message: "",
  leadSource: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s\+\-\(\)]{7,20}$/;

function validate(data: FormData): Record<string, string> {
  const e: Record<string, string> = {};
  if (!data.name.trim()) e.name = "Full name is required.";
  if (!data.email.trim()) e.email = "Email address is required.";
  else if (!EMAIL_RE.test(data.email)) e.email = "Enter a valid email address.";
  if (!data.phone.trim()) e.phone = "Phone or WhatsApp number is required.";
  else if (!PHONE_RE.test(data.phone)) e.phone = "Enter a valid phone number.";
  if (!data.intent) e.intent = "Please select how we can help.";
  return e;
}

const encodeForm = (data: Record<string, string>) =>
  new URLSearchParams(data).toString();

const INTENT_CTAS: Record<string, string> = {
  "Sell South Florida": "Request Seller Strategy Review",
  "Activate Spain or LATAM property": "Activate Your Listing in the Miami MLS",
  "Buyer relocation": "Request a Buyer Relocation Brief",
  "Agency partnership": "Open a Partner Agency Conversation",
  "": "Start a Private Conversation",
};

interface LeadFormProps {
  leadSource?: string;
}

export function LeadForm({ leadSource = "contact-section" }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({ ...INITIAL, leadSource });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const firstErrorRef = useRef<HTMLDivElement>(null);

  // Read UTM params from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormData((prev) => ({
      ...prev,
      utmSource: params.get("utm_source") ?? "",
      utmMedium: params.get("utm_medium") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      leadSource: leadSource,
    }));
  }, [leadSource]);

  const errors = validate(formData);
  const hasErrors = Object.keys(errors).length > 0;

  const mark = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const fieldError = (field: string) =>
    touched[field] ? errors[field] : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Touch all required fields to surface errors
    setTouched({ name: true, email: true, phone: true, intent: true });
    if (hasErrors) {
      firstErrorRef.current?.focus();
      return;
    }

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
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          intent: formData.intent,
          propertyAddress: formData.propertyAddress,
          city: formData.city,
          timeline: formData.timeline,
          message: formData.message,
          leadSource: formData.leadSource,
          utmSource: formData.utmSource,
          utmMedium: formData.utmMedium,
          utmCampaign: formData.utmCampaign,
          sourcePage: window.location.pathname,
        }),
      });

      if (!response.ok) throw new Error(`Status ${response.status}`);

      pushEvent("form_submit_seller", {
        form: "seller-consultation",
        intent: formData.intent,
        leadSource: formData.leadSource,
        utm_source: formData.utmSource,
        utm_medium: formData.utmMedium,
        utm_campaign: formData.utmCampaign,
        page: window.location.pathname,
      });

      setStatus("success");
      setFormData({ ...INITIAL, leadSource });
      setTouched({});
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
          <div className="font-mono mb-3 text-[10px] uppercase tracking-[0.35em] text-gold">Request Received</div>
          <h3 className="font-serif text-3xl text-navy">Our licensed team will review your details personally.</h3>
          <p className="mx-auto mt-4 max-w-md font-sans text-sm leading-relaxed text-navy/60">
            Your request has been routed through HomesProfessional.com. For urgent timing, reach Carlos directly on WhatsApp at{" "}
            <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="text-gold underline">{CONTACT.phoneUS}</a>.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 bg-navy px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold"
          >
            Send Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden border border-bone bg-white p-8 shadow-2xl lg:p-12">
      <div className="absolute inset-x-0 top-0 h-1 bg-gold" />
      <div className="absolute right-0 top-0 h-32 w-32 -translate-y-16 translate-x-16 -rotate-45 bg-ivory" aria-hidden="true" />
      <div className="relative z-10">
        <div className="mb-8">
          <div className="font-mono mb-2 text-[10px] uppercase tracking-[0.35em] text-gold">Confidential — Senior Seller Desk</div>
          <h3 className="font-serif text-3xl text-navy">Start a Private Conversation</h3>
          <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-navy/45">
            Share the essentials. A licensed professional will respond personally — no automated follow-up sequences.
          </p>
        </div>

        <form
          name="seller-consultation"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
          aria-label="Seller strategy request form"
        >
          {/* Netlify hidden fields */}
          <input type="hidden" name="form-name" value="seller-consultation" />
          <input type="hidden" name="leadSource" value={formData.leadSource} />
          <input type="hidden" name="utmSource" value={formData.utmSource} />
          <input type="hidden" name="utmMedium" value={formData.utmMedium} />
          <input type="hidden" name="utmCampaign" value={formData.utmCampaign} />
          <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }} aria-hidden="true">
            <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Intent */}
          <div className="flex flex-col gap-2">
            <label htmlFor="lf-intent" className="input-label">
              How can we help? <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <select
                id="lf-intent"
                name="intent"
                required
                aria-required="true"
                aria-describedby={fieldError("intent") ? "lf-intent-err" : undefined}
                aria-invalid={!!fieldError("intent")}
                className={`form-input w-full cursor-pointer appearance-none pr-9 ${fieldError("intent") ? "border-red-400 bg-red-50/30" : ""}`}
                value={formData.intent}
                onChange={(e) => setFormData({ ...formData, intent: e.target.value as Intent })}
                onBlur={() => mark("intent")}
              >
                <option value="">Select your situation…</option>
                <option value="Sell South Florida">Sell a South Florida property</option>
                <option value="Activate Spain or LATAM property">Activate a Spain or LATAM property in the Miami MLS</option>
                <option value="Buyer relocation">Buy or relocate to South Florida</option>
                <option value="Agency partnership">Agent or agency partnership inquiry</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold/60" aria-hidden="true">▾</span>
            </div>
            {fieldError("intent") && (
              <p id="lf-intent-err" role="alert" className="font-sans text-xs text-red-600">{fieldError("intent")}</p>
            )}
          </div>

          {/* Name + Email */}
          <div className="grid gap-5 sm:grid-cols-2" ref={firstErrorRef} tabIndex={-1}>
            <div className="flex flex-col gap-2">
              <label htmlFor="lf-name" className="input-label">
                Full Name <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </label>
              <input
                id="lf-name"
                required
                aria-required="true"
                aria-describedby={fieldError("name") ? "lf-name-err" : undefined}
                aria-invalid={!!fieldError("name")}
                name="name"
                type="text"
                placeholder="Your name"
                className={`form-input ${fieldError("name") ? "border-red-400 bg-red-50/30" : ""}`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onBlur={() => mark("name")}
                autoComplete="name"
              />
              {fieldError("name") && (
                <p id="lf-name-err" role="alert" className="font-sans text-xs text-red-600">{fieldError("name")}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lf-email" className="input-label">
                Email Address <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </label>
              <input
                id="lf-email"
                required
                aria-required="true"
                aria-describedby={fieldError("email") ? "lf-email-err" : undefined}
                aria-invalid={!!fieldError("email")}
                name="email"
                type="email"
                placeholder="your@email.com"
                className={`form-input ${fieldError("email") ? "border-red-400 bg-red-50/30" : ""}`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => mark("email")}
                autoComplete="email"
              />
              {fieldError("email") && (
                <p id="lf-email-err" role="alert" className="font-sans text-xs text-red-600">{fieldError("email")}</p>
              )}
            </div>
          </div>

          {/* Phone + Timeline */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="lf-phone" className="input-label">
                Phone / WhatsApp <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </label>
              <input
                id="lf-phone"
                required
                aria-required="true"
                aria-describedby={fieldError("phone") ? "lf-phone-err" : undefined}
                aria-invalid={!!fieldError("phone")}
                name="phone"
                type="tel"
                placeholder="+1 (954) …"
                className={`form-input ${fieldError("phone") ? "border-red-400 bg-red-50/30" : ""}`}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                onBlur={() => mark("phone")}
                autoComplete="tel"
              />
              {fieldError("phone") && (
                <p id="lf-phone-err" role="alert" className="font-sans text-xs text-red-600">{fieldError("phone")}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lf-timeline" className="input-label">Timeline</label>
              <div className="relative">
                <select
                  id="lf-timeline"
                  name="timeline"
                  className="form-input w-full cursor-pointer appearance-none pr-9"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                >
                  <option>Immediately</option>
                  <option>30-90 days</option>
                  <option>3-6 months</option>
                  <option>6+ months</option>
                  <option>Exploring options</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gold/60" aria-hidden="true">▾</span>
              </div>
            </div>
          </div>

          {/* Property + City (contextual — shown for sell/spain intents) */}
          {(formData.intent === "Sell South Florida" || formData.intent === "Activate Spain or LATAM property" || formData.intent === "") && (
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="lf-address" className="input-label">Property Address</label>
                <input
                  id="lf-address"
                  name="propertyAddress"
                  type="text"
                  placeholder="Street address (optional)"
                  className="form-input"
                  value={formData.propertyAddress}
                  onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                  autoComplete="street-address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="lf-city" className="input-label">City / Market</label>
                <input
                  id="lf-city"
                  name="city"
                  type="text"
                  placeholder="Weston, Coral Gables, Madrid…"
                  className="form-input"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  autoComplete="address-level2"
                />
              </div>
            </div>
          )}

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label htmlFor="lf-message" className="input-label">Context</label>
            <textarea
              id="lf-message"
              name="message"
              rows={3}
              placeholder="What should our team know before reaching out?"
              className="form-input"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {status === "error" && (
            <p role="alert" className="font-sans text-sm text-red-600 font-medium">
              {errorMessage}
            </p>
          )}

          <p className="font-mono text-center text-[9px] uppercase tracking-[0.2em] text-navy/40">
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

          <button
            type="submit"
            disabled={status === "submitting"}
            aria-busy={status === "submitting"}
            className="group flex w-full items-center justify-center gap-3 bg-navy py-5 font-sans text-xs font-bold uppercase tracking-[0.28em] text-white shadow-lg shadow-gold/10 transition-all hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
          >
            {status === "submitting"
              ? <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              : <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />}
            {status === "submitting"
              ? "Sending…"
              : (INTENT_CTAS[formData.intent] ?? INTENT_CTAS[""])}
          </button>
          <p className="font-mono text-center text-[8px] uppercase tracking-[0.2em] text-navy/25">
            Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
        </form>
      </div>
    </div>
  );
}
