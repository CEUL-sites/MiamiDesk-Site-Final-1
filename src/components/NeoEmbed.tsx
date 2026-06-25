import { useEffect, useRef, useState } from "react";
import { NEO } from "../constants";

export function NeoEmbed({ lang = "en" }: { lang?: "en" | "es" }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = NEO.loader;
    script.setAttribute("data-neokey", NEO.key);
    script.setAttribute("data-neolang", lang);

    script.onload = () => {
      // Give the script ~4 s to inject content into the iframe before declaring ready
      timerRef.current = setTimeout(() => setStatus("ready"), 4000);
    };
    script.onerror = () => setStatus("error");

    document.body.appendChild(script);

    // Hard fallback: if neither onload nor onerror fires within 12 s, show fallback
    const hardTimeout = setTimeout(() => setStatus((s) => (s === "loading" ? "error" : s)), 12000);

    return () => {
      script.remove();
      if (timerRef.current) clearTimeout(timerRef.current);
      clearTimeout(hardTimeout);
    };
  }, [lang]);

  if (status === "error") {
    return (
      <div className="rounded border border-navy/20 bg-navy-deep/95 px-8 py-14 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          New Pre-Construction Developments
        </p>
        <p className="mx-auto mt-4 max-w-md font-sans text-base leading-relaxed text-white/70">
          Inventory feed temporarily unavailable. Request a private property review and Carlos
          will send you current pre-construction options directly.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://wa.me/19548656622?text=I%20would%20like%20information%20on%20pre-construction%20developments%20in%20South%20Florida."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            WhatsApp · Request Inventory List
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/25 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            Contact Form
          </a>
        </div>
        <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
          FL SL705771 · United Realty Group
        </p>
      </div>
    );
  }

  return (
    <>
      {status === "loading" && (
        <div className="flex min-h-[40vh] items-center justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-primary/40">
            Loading inventory…
          </span>
        </div>
      )}
      <iframe
        id="NEOiframe"
        title="MIAMI NEO — New Estate Only pre-construction inventory"
        loading="lazy"
        style={{
          width: "100%",
          height: status === "ready" ? "200vh" : "0",
          border: "none",
          display: "block",
        }}
      />
    </>
  );
}
