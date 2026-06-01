import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "../../constants";
import { pushEvent } from "../../lib/analytics";

const COUNTRIES = [
  "United States", "Spain", "Venezuela", "Colombia", "Argentina", "Mexico",
  "Brazil", "Peru", "Chile", "Ecuador", "Panama", "Dominican Republic",
  "Cuba", "Bolivia", "Uruguay", "Paraguay", "Costa Rica", "Guatemala",
  "United Kingdom", "Canada", "France", "Germany", "Italy", "Other",
];

const NEIGHBORHOODS = [
  "Brickell", "Coral Gables", "Coconut Grove", "Key Biscayne", "Miami Beach",
  "Bal Harbour", "Sunny Isles Beach", "Aventura", "Weston", "Pinecrest",
  "Doral", "Fort Lauderdale", "Boca Raton", "Edgewater / Wynwood", "Other",
];

const PRICE_RANGES = [
  "$500K – $1M", "$1M – $2M", "$2M – $5M", "$5M – $10M", "$10M+",
];

const INITIAL: Record<string, string> = {
  name: "", email: "", country: "", targetNeighborhoods: "", priceRange: "",
  financing: "", timeline: "", visaStatus: "", preferredContact: "WhatsApp", source: "buyer-mandate",
};

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function BuyerMandateForm() {
  const [form, setForm] = useState(INITIAL);
  const [neighborhoodSel, setNeighborhoodSel] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const toggleNeighborhood = (n: string) => {
    setNeighborhoodSel((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (neighborhoodSel.length === 0) { setErr("Please select at least one neighborhood."); return; }
    setStatus("submitting");
    setErr("");
    const submission = { ...form, targetNeighborhoods: neighborhoodSel.join(", ") };
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: ctrl.signal,
        body: encodeForm({ "form-name": "buyer-mandate", "bot-field": "", ...submission, sourcePage: "buyer-mandate" }),
      });
      if (!res.ok) throw new Error("submission_failed");
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "buyer-mandate", name: form.name, email: form.email, country: form.country }),
      }).catch(() => {});
      pushEvent("form_submit_buyer"); window.location.href = "/thanks/buyer";
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError"
          ? "Request timed out. Please WhatsApp Carlos directly."
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
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Buyer Mandate Received</p>
        <h3 className="mt-3 font-serif text-2xl text-navy">Carlos will prepare your Miami buyer brief.</h3>
        <p className="mt-4 font-sans text-sm leading-relaxed text-navy/55 max-w-md mx-auto">
          Confirmation sent to your email. Carlos responds within one business day from his Weston, Florida office.
        </p>
        <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-sans text-sm text-gold underline">
          WhatsApp for immediate questions
        </a>
      </div>
    );
  }

  return (
    <div className="border border-bone bg-white">
      <div className="border-b border-bone bg-navy-deep px-8 py-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">Confidential Buyer Desk</p>
        <h3 className="mt-2 font-serif text-2xl text-white">Request a Miami buyer brief</h3>
        <p className="mt-2 font-sans text-sm text-white/50">Share your search parameters — Carlos builds a brief tailored to your budget and timeline.</p>
      </div>

      <form
        name="buyer-mandate"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-6 p-8"
      >
        <input type="hidden" name="form-name" value="buyer-mandate" />
        <input type="hidden" name="source" value="buyer-mandate" />
        <input type="hidden" name="targetNeighborhoods" value={neighborhoodSel.join(", ")} />
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
          <Field label="Country of Origin *">
            <select required name="country" className="form-input w-full" value={form.country} onChange={set("country")}>
              <option value="">Select country…</option>
              {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Preferred Contact *">
            <select required name="preferredContact" className="form-input w-full" value={form.preferredContact} onChange={set("preferredContact")}>
              <option>WhatsApp</option>
              <option>Email</option>
              <option>Phone call</option>
            </select>
          </Field>
        </div>

        <Field label="Target Neighborhoods * (select all that apply)">
          <div className="flex flex-wrap gap-2 pt-1">
            {NEIGHBORHOODS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => toggleNeighborhood(n)}
                className={`border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] transition-colors ${
                  neighborhoodSel.includes(n)
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-bone text-navy/50 hover:border-gold/40"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Budget Range *">
            <select required name="priceRange" className="form-input w-full" value={form.priceRange} onChange={set("priceRange")}>
              <option value="">Select range…</option>
              {PRICE_RANGES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Financing *">
            <select required name="financing" className="form-input w-full" value={form.financing} onChange={set("financing")}>
              <option value="">Select…</option>
              <option>All cash</option>
              <option>U.S. conventional mortgage</option>
              <option>Foreign-national loan</option>
              <option>Undecided / need guidance</option>
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Purchase Timeline *">
            <select required name="timeline" className="form-input w-full" value={form.timeline} onChange={set("timeline")}>
              <option value="">Select…</option>
              <option>0 – 3 months</option>
              <option>3 – 6 months</option>
              <option>6 – 12 months</option>
              <option>Exploratory — no fixed date</option>
            </select>
          </Field>
          <Field label="Visa / Residency Status (optional)">
            <input name="visaStatus" type="text" placeholder="e.g., B-2, permanent resident, citizen, pending…" className="form-input" value={form.visaStatus} onChange={set("visaStatus")} />
          </Field>
        </div>

        {status === "error" && (
          <p className="font-sans text-sm text-red-600">{err}</p>
        )}

        <button type="submit" disabled={status === "submitting"} className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-gold disabled:opacity-60">
          {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === "submitting" ? "Sending…" : "Request Miami Buyer Brief"}
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
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">{label}</span>
      {children}
    </label>
  );
}
