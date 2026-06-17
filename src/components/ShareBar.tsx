import { useEffect, useState } from "react";
import { Link2, Check, Mail, Share2 } from "lucide-react";
import { trackFunnelEvent } from "../lib/analytics";

// Share row for journal posts. The URL is passed in (not read from
// window.location) so it resolves correctly during reactSnap prerendering
// and always points at the canonical address.
//
// Mobile gets the native OS share sheet (WhatsApp, iMessage, etc.) when the
// browser supports navigator.share; every platform also gets explicit
// WhatsApp / LinkedIn / Facebook / X / email / copy-link fallbacks.

interface ShareBarProps {
  url: string;
  title: string;
  /** Short text used for WhatsApp / native share / email body. */
  summary?: string;
  theme?: "light" | "dark";
}

const BRAND_SVG: Record<string, string> = {
  whatsapp:
    "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24Zm-2.9 4.43c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.19-1.42-1.33-1.66-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01Z",
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.71h.05c.53-.95 1.83-1.95 3.77-1.95C20.7 8.76 22 11 22 14.27V21h-4v-5.94c0-1.42-.03-3.25-2-3.25-2 0-2.3 1.55-2.3 3.15V21H9V9Z",
  facebook:
    "M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z",
  x: "M18.24 2h3.3l-7.2 8.23L22.84 22h-6.63l-5.2-6.8L4.99 22H1.68l7.7-8.8L1.2 2h6.8l4.7 6.21L18.24 2Zm-1.16 18.03h1.83L7.01 3.87H5.05l12.03 16.16Z",
};

function BrandIcon({ name }: { name: keyof typeof BRAND_SVG }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BRAND_SVG[name]} />
    </svg>
  );
}

export function ShareBar({ url, title, summary, theme = "light" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const text = summary || title;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(`${text} ${url}`);

  const targets = [
    { key: "whatsapp", label: "Share on WhatsApp", href: `https://wa.me/?text=${encodedText}` },
    { key: "linkedin", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { key: "facebook", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { key: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
  ] as const;

  const isDark = theme === "dark";
  const labelCls = isDark ? "text-white/40" : "text-navy/45";
  const btnCls = isDark
    ? "border-white/15 text-white/55 hover:border-gold/50 hover:text-gold"
    : "border-hairline text-navy/55 hover:border-gold/50 hover:text-gold";

  async function nativeShare() {
    try {
      await navigator.share({ title, text, url });
      trackFunnelEvent("journal_share", { method: "native", url });
    } catch {
      /* user dismissed the share sheet — no-op */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackFunnelEvent("journal_share", { method: "copy_link", url });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${labelCls}`}>Share</span>

      <div className="flex flex-wrap items-center gap-2">
        {canNativeShare && (
          <button
            type="button"
            onClick={nativeShare}
            aria-label="Share this article"
            className={`flex h-9 w-9 items-center justify-center border transition-colors ${btnCls}`}
          >
            <Share2 size={15} />
          </button>
        )}

        {targets.map((t) => (
          <a
            key={t.key}
            href={t.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.label}
            onClick={() => trackFunnelEvent("journal_share", { method: t.key, url })}
            className={`flex h-9 w-9 items-center justify-center border transition-colors ${btnCls}`}
          >
            <BrandIcon name={t.key} />
          </a>
        ))}

        <a
          href={`mailto:?subject=${encodedTitle}&body=${encodedText}`}
          aria-label="Share by email"
          onClick={() => trackFunnelEvent("journal_share", { method: "email", url })}
          className={`flex h-9 w-9 items-center justify-center border transition-colors ${btnCls}`}
        >
          <Mail size={15} />
        </a>

        <button
          type="button"
          onClick={copyLink}
          aria-label={copied ? "Link copied" : "Copy link"}
          className={`flex h-9 items-center gap-1.5 border px-3 transition-colors ${btnCls}`}
        >
          {copied ? <Check size={15} className="text-gold" /> : <Link2 size={15} />}
          <span className="font-mono text-[9px] uppercase tracking-[0.16em]">
            {copied ? "Copied" : "Copy link"}
          </span>
        </button>
      </div>
    </div>
  );
}
