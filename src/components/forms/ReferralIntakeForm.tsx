import React, { useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { CONTACT } from "../../constants";
import { trackLead, pushEvent } from "../../lib/analytics";
import { getAttribution, getLeadSource } from "../../lib/attribution";
import { notifyLeadDirect } from "../../lib/leadNotify";

const INITIAL: Record<string, string> = {
  licenseeName: "", brokerageName: "", email: "", phone: "", country: "", referralType: "",
  clientSummary: "", preferredContact: "Email", source: "referral-intake",
};

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function ReferralIntakeForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");
  const formStartFired = useRef(false);

  const handleFormFocus = () => {
    if (formStartFired.current || navigator.webdriver) return;
    formStartFired.current = true;
    pushEvent("form_start", {
      form_name: "referral-intake",
      page_path: window.location.pathname,
      funnel_stage: "consideration",
    });
  };

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
        body: encodeForm({ "form-name": "referral-intake", "bot-field": "", ...form, sourcePage: "referral-intake", ...getAttribution() }),
      });
      if (!res.ok) throw new Error("submission_failed");
      notifyLeadDirect({
        name: form.licenseeName, email: form.email, phone: form.phone,
        city: form.country, timeline: form.referralType,
        message: `${form.brokerageName ? form.brokerageName + " · " : ""}${form.clientSummary}`,
        sourcePage: "referral-intake", leadSource: getLeadSource(),
      });
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "referral-intake", name: form.licenseeName, email: form.email, phone: form.phone, brokerage: form.brokerageName }),
      }).catch(() => {});
      trackLead("agent", { form: "referral-intake" }); window.location.href = "/thanks/agent";
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError"
          ? "Request timed out. Please WhatsApp Carlos directly."
          : "Could not submit. Please try WhatsApp or email below."
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
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Referral Inquiry Received</p>
        <h3 className="mt-3 font-serif text-2xl text-navy">Carlos will follow up with you directly.</h3>
        <p className="mt-4 font-sans text-sm leading-relaxed text-navy/55 max-w-md mx-auto">
          All licensed professional inquiries are handled confidentially. A formal written referral agreement is executed before any client engagement.
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
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Agent & Agency Partner Desk</p>
        <h3 className="mt-2 font-serif text-2xl text-white">Submit a cross-border referral</h3>
        <p className="mt-2 font-sans text-sm text-white/50">Licensed professionals only. All submissions are handled confidentially. Written referral agreement executed before client engagement.</p>
      </div>

      <form
        name="referral-intake"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        onFocus={handleFormFocus}
        className="space-y-6 p-8"
      >
        <input type="hidden" name="form-name" value="referral-intake" />
        <input type="hidden" name="source" value="referral-intake" />
        <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your Name (Licensee) *">
            <input required name="licenseeName" type="text" placeholder="Licensed agent / attorney name" className="form-input" value={form.licenseeName} onChange={set("licenseeName")} />
          </Field>
          <Field label="Brokerage / Agency *">
            <input required name="brokerageName" type="text" placeholder="Firm name" className="form-input" value={form.brokerageName} onChange={set("brokerageName")} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email Address *">
            <input required name="email" type="email" placeholder="your@email.com" className="form-input" value={form.email} onChange={set("email")} />
          </Field>
          <Field label="Phone / WhatsApp *">
            <input required name="phone" type="tel" placeholder="+1 or +34…" className="form-input" value={form.phone} onChange={set("phone")} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Country *">
            <input required name="country" type="text" placeholder="United States, Spain, Colombia…" className="form-input" value={form.country} onChange={set("country")} />
          </Field>
          <Field label="Preferred Contact *">
            <select required name="preferredContact" className="form-input w-full" value={form.preferredContact} onChange={set("preferredContact")}>
              <option>Email</option>
              <option>WhatsApp</option>
              <option>Phone call</option>
            </select>
          </Field>
        </div>

        <Field label="Referral Type *">
          <select required name="referralType" className="form-input w-full" value={form.referralType} onChange={set("referralType")}>
            <option value="">Select…</option>
            <option>Buyer mandate — client buying in South Florida</option>
            <option>Seller mandate — client selling in South Florida</option>
            <option>Co-listing — joint MLS representation</option>
            <option>Spain inventory activation — developer / owner into Miami MLS</option>
            <option>URG affiliation inquiry</option>
            <option>Other</option>
          </select>
        </Field>

        <Field label="Client Summary *">
          <textarea
            required
            name="clientSummary"
            rows={5}
            placeholder="Describe the client situation, property or search parameters, urgency, and any relevant context. Do not include any information the client has not authorized you to share."
            className="form-input"
            value={form.clientSummary}
            onChange={set("clientSummary")}
          />
        </Field>

        {status === "error" && (
          <p className="font-sans text-sm text-red-600">{err}</p>
        )}

        <button type="submit" disabled={status === "submitting"} className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-gold disabled:opacity-60">
          {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === "submitting" ? "Sending…" : "Submit Cross-Border Referral"}
        </button>

        <p className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">
          Confidential · Licensed Professionals Only · Written Agreements · {CONTACT.shortLicense}
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">{label}</label>
      {children}
    </div>
  );
}
