// Registration gate shown inside the Miami Desk chat after the free questions.
//
// Order of operations:
//   1. POST ai-desk-register — the server spam-screens the details and, only
//      on a clean verdict, unlocks more questions for this session.
//   2. On unlock, the lead goes down the standard two paths (Netlify Forms
//      "ai-desk-registration" + lead-notify) so Carlos is alerted exactly as
//      for any other form, de-duplicated server-side.
// A quarantined submission is held server-side for Carlos's digest and the
// chat hands off without unlocking more model calls.

import { Loader2, ShieldCheck } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { getAttribution, getLeadSource } from "../../lib/attribution";
import { notifyLeadDirect } from "../../lib/leadNotify";
import { trackMicroConversion } from "../../lib/analytics";
import { CHAT_COPY, type ChatLang } from "./miamiDeskChatCopy";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

interface Props {
  lang: ChatLang;
  sessionToken: string | null;
  /** Recent visitor questions, attached to the lead so Carlos has context. */
  summary: string;
  onUnlocked: (turnsLeft: number) => void;
  onHandoff: () => void;
}

export function ChatRegistrationPanel({ lang, sessionToken, summary, onUnlocked, onHandoff }: Props) {
  const t = CHAT_COPY[lang];
  const renderedAt = useRef(Date.now());
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "selling", messagingConsent: "no", botField: "" });
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (form.name.trim().length < 2 || (!form.email.trim() && !form.phone.trim())) {
      setError(t.contactHint);
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/.netlify/functions/ai-desk-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          botField: form.botField,
          formRenderedAt: String(renderedAt.current),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : t.networkError);
        setStatus("idle");
        return;
      }
      if (!data.unlocked) {
        onHandoff();
        return;
      }

      const sourcePage = `ai-desk${window.location.pathname.replace(/\/+$/, "").replace(/\//g, "-")}`;
      const message = `Interest: ${form.interest}\n${summary}`.slice(0, 1500);
      // Path 1: Netlify Forms (fires submission-created).
      void fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "ai-desk-registration",
          "bot-field": "",
          formRenderedAt: String(renderedAt.current),
          name: form.name,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          messagingConsent: form.messagingConsent,
          message,
          sourcePage,
          language: lang,
          ...getAttribution(),
        }),
      }).catch(() => {});
      // Path 2: direct backup alert (de-duplicated against path 1).
      notifyLeadDirect({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message,
        sourcePage,
        formName: "ai-desk-registration",
        leadSource: getLeadSource(),
        messagingConsent: form.messagingConsent,
        crmFields: { interest: form.interest, language: lang },
        botField: "",
        formRenderedAt: String(renderedAt.current),
      });
      trackMicroConversion("ai_desk_registration", { interest: form.interest, lang });
      onUnlocked(typeof data.turnsLeft === "number" ? data.turnsLeft : 0);
    } catch {
      setError(t.networkError);
      setStatus("idle");
    }
  }

  const field =
    "w-full rounded-lg bg-white/5 px-3 py-2.5 font-sans text-base text-white placeholder:text-white/60 outline-none ring-1 ring-white/15 focus:ring-gold/50 sm:text-sm";

  return (
    <form onSubmit={submit} noValidate className="border border-gold/35 bg-gold/[0.06] p-4" aria-labelledby="ai-desk-reg-title">
      <div className="mb-2 flex items-center gap-2">
        <ShieldCheck size={15} className="shrink-0 text-gold" aria-hidden="true" />
        <p id="ai-desk-reg-title" className="font-mono text-xs uppercase tracking-[0.12em] text-gold">{t.regTitle}</p>
      </div>
      <p className="mb-4 font-sans text-sm leading-relaxed text-white/80">{t.regBody}</p>

      {/* Honeypot — visually hidden AND hidden from assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave empty
          <input tabIndex={-1} autoComplete="off" value={form.botField} onChange={(e) => set("botField")(e.target.value)} />
        </label>
      </div>

      <div className="space-y-2.5">
        <label className="block">
          <span className="sr-only">{t.name}</span>
          <input className={field} placeholder={t.name} autoComplete="name" required maxLength={120} value={form.name} onChange={(e) => set("name")(e.target.value)} />
        </label>
        <label className="block">
          <span className="sr-only">{t.email}</span>
          <input className={field} type="email" placeholder={t.email} autoComplete="email" maxLength={254} value={form.email} onChange={(e) => set("email")(e.target.value)} />
        </label>
        <label className="block">
          <span className="sr-only">{t.phone}</span>
          <input className={field} type="tel" placeholder={t.phone} autoComplete="tel" maxLength={40} value={form.phone} onChange={(e) => set("phone")(e.target.value)} />
        </label>
        <p className="font-sans text-xs text-white/60">{t.contactHint}</p>
        <label className="block">
          <span className="mb-1 block font-mono text-xs uppercase tracking-[0.12em] text-white/70">{t.interest}</span>
          <select className={field} value={form.interest} onChange={(e) => set("interest")(e.target.value)}>
            {t.interests.map(([v, label]) => (
              <option key={v} value={v} className="bg-navy-deep">{label}</option>
            ))}
          </select>
        </label>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-0.5 accent-[#B08D57]"
            checked={form.messagingConsent === "yes"}
            onChange={(e) => set("messagingConsent")(e.target.checked ? "yes" : "no")}
          />
          <span className="font-sans text-xs leading-[1.45] text-white/70">{t.consent}</span>
        </label>
      </div>

      {error && <p role="alert" className="mt-3 font-sans text-xs text-red-300">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-gold px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-navy-deep transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? <><Loader2 size={13} className="animate-spin" aria-hidden="true" /> {t.submitting}</> : t.submit}
      </button>
      <p className="mt-3 font-sans text-xs text-white/60">
        {t.privacy}{" "}
        <a href="/privacy" className="underline hover:text-gold">{t.privacyLink}</a>
      </p>
    </form>
  );
}
