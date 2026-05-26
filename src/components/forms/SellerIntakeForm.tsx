import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "../../constants";
import { pushEvent } from "../../lib/analytics";

const CITIES = [
  "Aventura", "Bal Harbour", "Boca Raton", "Brickell", "Coconut Grove",
  "Coral Gables", "Coral Springs", "Doral", "Fort Lauderdale", "Hallandale Beach",
  "Hialeah", "Hollywood", "Homestead", "Kendall", "Key Biscayne",
  "Miami", "Miami Beach", "Miami Lakes", "Miramar", "Palm Beach",
  "Pembroke Pines", "Pinecrest", "Plantation", "Pompano Beach", "South Miami",
  "Sunny Isles Beach", "Sunrise", "Weston", "West Palm Beach", "Other",
];

const VALUE_BANDS = [
  "$500K – $1M", "$1M – $2M", "$2M – $5M", "$5M – $10M", "$10M – $25M", "$25M+",
];

const INITIAL: Record<string, string> = {
  name: "", email: "", phone: "", propertyAddress: "", city: "",
  valueBand: "", occupancy: "", timeline: "", priorListing: "",
  preferredContact: "WhatsApp", source: "seller-intake",
};

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function SellerIntakeForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErr("");
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: ctrl.signal,
        body: encodeForm({ "form-name": "seller-intake", "bot-field": "", ...form, sourcePage: "seller-intake" }),
      });
      if (!res.ok) throw new Error("submission_failed");
      // Trigger auto-reply
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "seller-intake", name: form.name, email: form.email, phone: form.phone }),
      }).catch(() => {});
      pushEvent("form_submit_seller"); window.location.href = "/thanks/seller";
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError"
          ? "The request timed out. Please WhatsApp Carlos directly."
          : "Could not submit. Please try WhatsApp below."
      );
      setStatus("error");
    } finally {
      window.clearTimeout(t);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-bone bg-white p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-gold/10 text-gold">
          <CheckCircle2 size={30} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Strategy Review Requested</p>
        <h3 className="mt-3 font-serif text-2xl text-navy">Carlos will review your property details personally.</h3>
        <p className="mt-4 font-sans text-sm leading-relaxed text-navy/55 max-w-md mx-auto">
          You will receive a confirmation to {form.email || "your email"} within minutes. Carlos responds within one business day from his Weston, Florida office.
        </p>
        <p className="mt-6 font-sans text-sm text-navy/55">
          For immediate questions:{" "}
          <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="text-gold underline">
            WhatsApp {CONTACT.phoneUS}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="border border-bone bg-white">
      <div className="border-b border-bone bg-navy-deep px-8 py-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">Confidential Seller Desk</p>
        <h3 className="mt-2 font-serif text-2xl text-white">Schedule a 30-minute listing strategy call</h3>
        <p className="mt-2 font-sans text-sm text-white/50">Share the essentials — Carlos reviews every submission personally before responding.</p>
      </div>

      <form
        name="seller-intake"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-6 p-8"
      >
        <input type="hidden" name="form-name" value="seller-intake" />
        <input type="hidden" name="source" value="seller-intake" />
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name *">
            <input required name="name" type="text" placeholder="Your name" className="form-input" value={form.name} onChange={set("name")} />
          </Field>
          <Field label="Email Address *">
            <input required name="email" type="email" placeholder="your@email.com" className="form-input" value={form.email} onChange={set("email")} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Phone / WhatsApp *">
            <input required name="phone" type="tel" placeholder="+1 or +34..." className="form-input" value={form.phone} onChange={set("phone")} />
          </Field>
          <Field label="Preferred Contact *">
            <select required name="preferredContact" className="form-input w-full" value={form.preferredContact} onChange={set("preferredContact")}>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Phone call</option>
            </select>
          </Field>
        </div>

        <Field label="Property Address *">
          <input required name="propertyAddress" type="text" placeholder="Street address or building name" className="form-input" value={form.propertyAddress} onChange={set("propertyAddress")} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="City *">
            <select required name="city" className="form-input w-full" value={form.city} onChange={set("city")}>
              <option value="">Select city…</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Estimated Value *">
            <select required name="valueBand" className="form-input w-full" value={form.valueBand} onChange={set("valueBand")}>
              <option value="">Select range…</option>
              {VALUE_BANDS.map((v) => <option key={v}>{v}</option>)}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Occupancy *">
            <select required name="occupancy" className="form-input w-full" value={form.occupancy} onChange={set("occupancy")}>
              <option value="">Select…</option>
              <option>Owner-occupied</option>
              <option>Tenanted</option>
              <option>Vacant</option>
            </select>
          </Field>
          <Field label="Selling Timeline *">
            <select required name="timeline" className="form-input w-full" value={form.timeline} onChange={set("timeline")}>
              <option value="">Select…</option>
              <option>0 – 3 months</option>
              <option>3 – 6 months</option>
              <option>6 – 12 months</option>
              <option>Exploratory — no fixed date</option>
            </select>
          </Field>
        </div>

        <Field label="Prior Listing History (optional)">
          <textarea name="priorListing" rows={3} placeholder="Has this property been listed before? Any relevant context about prior attempts, pricing history, or condition." className="form-input" value={form.priorListing} onChange={set("priorListing")} />
        </Field>

        {status === "error" && (
          <p className="font-sans text-sm text-red-600">{err}</p>
        )}

        <button type="submit" disabled={status === "submitting"} className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-gold disabled:opacity-60">
          {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === "submitting" ? "Sending…" : "Request Listing Strategy Call"}
        </button>

        <p className="text-center font-mono text-[8px] uppercase tracking-[0.18em] text-navy/30">
          {CONTACT.licenseDisplay} · United Realty Group · Equal Housing Opportunity
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">{label}</label>
      {children}
    </div>
  );
}
