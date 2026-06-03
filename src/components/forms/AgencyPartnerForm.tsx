import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "../../constants";
import { pushEvent } from "../../lib/analytics";

const INITIAL: Record<string, string> = {
  agentName: "",
  agency: "",
  role: "",
  country: "",
  email: "",
  whatsapp: "",
  website: "",
  inventoryType: "",
  priceRange: "",
  numberOfListings: "",
  listingUrl: "",
  message: "",
  consent: "",
  source: "agency-partner-intake",
};

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function AgencyPartnerForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [err, setErr] = useState("");

  const set = (k: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setErr("Please confirm your consent to proceed.");
      return;
    }
    setStatus("submitting");
    setErr("");
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: ctrl.signal,
        body: encodeForm({
          "form-name": "agency-partner-intake",
          "bot-field": "",
          ...form,
          sourcePage: window.location.pathname,
        }),
      });
      if (!res.ok) throw new Error("submission_failed");
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formName: "agency-partner-intake",
          name: form.agentName,
          email: form.email,
          brokerage: form.agency,
        }),
      }).catch(() => {});
      pushEvent("form_submit_agency_partner");
      window.location.href = "/thanks/agent";
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError"
          ? "Request timed out. Please WhatsApp Carlos directly."
          : "Could not submit. Please try WhatsApp or email."
      );
      setStatus("error");
    } finally {
      window.clearTimeout(t);
    }
  };

  return (
    <div className="border border-white/10">
      <div className="border-b border-white/10 bg-white/[0.03] px-8 py-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">Miami Desk · International Listing Review</p>
        <h3 className="mt-2 font-serif text-2xl text-white">Submit a listing or agency inquiry</h3>
        <p className="mt-2 font-sans text-sm text-white/45">
          For agents, agencies, and developers outside South Florida. All submissions are treated as confidential.
          Carlos reviews every inquiry personally before responding.
        </p>
      </div>

      <form
        name="agency-partner-intake"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        className="space-y-6 p-8"
      >
        <input type="hidden" name="form-name" value="agency-partner-intake" />
        <input type="hidden" name="source" value="agency-partner-intake" />
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Agent identity */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your Name *">
            <input required name="agentName" type="text" placeholder="First and last name" className="form-input-dark" value={form.agentName} onChange={set("agentName")} />
          </Field>
          <Field label="Agency / Company *">
            <input required name="agency" type="text" placeholder="Firm or developer name" className="form-input-dark" value={form.agency} onChange={set("agency")} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your Role *">
            <select required name="role" className="form-input-dark w-full" value={form.role} onChange={set("role")}>
              <option value="">Select…</option>
              <option>Listing Agent</option>
              <option>Team Lead / Sales Director</option>
              <option>Agency Director / Owner</option>
              <option>Developer / Project Sales</option>
              <option>Property Manager</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Country / Market *">
            <input required name="country" type="text" placeholder="Spain, Colombia, Mexico…" className="form-input-dark" value={form.country} onChange={set("country")} />
          </Field>
        </div>

        {/* Contact */}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email *">
            <input required name="email" type="email" placeholder="your@agency.com" className="form-input-dark" value={form.email} onChange={set("email")} />
          </Field>
          <Field label="WhatsApp / Phone">
            <input name="whatsapp" type="tel" placeholder="+34 600 000 000" className="form-input-dark" value={form.whatsapp} onChange={set("whatsapp")} />
          </Field>
        </div>

        <Field label="Agency Website">
          <input name="website" type="url" placeholder="https://youragency.com" className="form-input-dark" value={form.website} onChange={set("website")} />
        </Field>

        {/* Inventory */}
        <div className="border-t border-white/10 pt-6">
          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-white/35 mb-5">Inventory Details</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Type of Inventory *">
              <select required name="inventoryType" className="form-input-dark w-full" value={form.inventoryType} onChange={set("inventoryType")}>
                <option value="">Select…</option>
                <option>Luxury Apartments / Penthouses</option>
                <option>Villas / Single-Family Estates</option>
                <option>New Development / Pre-Construction</option>
                <option>Branded Residences</option>
                <option>Mixed Portfolio</option>
                <option>Commercial / Investment</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Price Range *">
              <select required name="priceRange" className="form-input-dark w-full" value={form.priceRange} onChange={set("priceRange")}>
                <option value="">Select…</option>
                <option>€500K – €1M</option>
                <option>€1M – €2.5M</option>
                <option>€2.5M – €5M</option>
                <option>€5M – €10M</option>
                <option>€10M+</option>
                <option>Varies across portfolio</option>
              </select>
            </Field>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Number of Listings">
            <input name="numberOfListings" type="text" placeholder="1, 3–5, 10+…" className="form-input-dark" value={form.numberOfListings} onChange={set("numberOfListings")} />
          </Field>
          <Field label="Listing URL (optional)">
            <input name="listingUrl" type="url" placeholder="Link to property or portfolio page" className="form-input-dark" value={form.listingUrl} onChange={set("listingUrl")} />
          </Field>
        </div>

        <Field label="Message / Partnership Interest *">
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Briefly describe the property or portfolio, what kind of exposure or partnership you are looking for, and any specific context that will help Carlos respond accurately."
            className="form-input-dark"
            value={form.message}
            onChange={set("message")}
          />
        </Field>

        {/* Consent */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-gold"
            checked={!!form.consent}
            onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked ? "yes" : "" }))}
          />
          <label htmlFor="consent" className="font-sans text-xs leading-relaxed text-white/45">
            I confirm that I am a real estate professional or developer and I authorize Carlos Uzcategui
            (HomesProfessional.com) to contact me regarding the submitted inquiry. I understand that this
            submission does not create a binding agreement and that all collaborations are subject to
            professional review and written agreement.
          </label>
        </div>

        {status === "error" && (
          <p className="font-sans text-sm text-red-400">{err}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex w-full items-center justify-center gap-3 bg-gold py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-navy-deep transition-all hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          {status === "submitting" ? "Sending…" : "Submit Listing for Review"}
        </button>

        <p className="text-center font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
          Confidential · No obligation · {CONTACT.shortLicense} · Equal Housing Opportunity
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45">{label}</label>
      {children}
    </div>
  );
}
