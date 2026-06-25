import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pushEvent } from "../lib/analytics";
import { captureAttribution } from "../lib/attribution";
import { isTrackingAllowed } from "../lib/consent";

// react-snap (puppeteer) sets navigator.webdriver = true during prerender builds.
// We use this to suppress all analytics during the static-site generation pass
// so build-time page visits don't appear as real sessions in GA4 / Meta / LinkedIn.
const isPrerender = typeof navigator !== "undefined" && navigator.webdriver;

// Delegated tracking for every contact CTA on the site (WhatsApp, phone, and
// guide downloads) so we don't have to wire an onClick into each of the dozens
// of anchors spread across pages. Fires both the legacy event names (kept for
// existing GTM triggers) and the standardized Batch-2 names with a
// form_location param so each contact is attributable to the page it came from.
function handleGlobalClick(e: MouseEvent) {
  const target = (e.target as Element).closest("a");
  if (!target) return;

  const href = target.getAttribute("href") ?? "";
  const form_location = typeof window !== "undefined" ? window.location.pathname : "";

  if (href.includes("wa.me/1954")) {
    pushEvent("whatsapp_click_us", { destination: href });
    pushEvent("contact_whatsapp", { line: "us", destination: href, form_location });
  } else if (href.includes("wa.me/346") || href.includes("wa.me/34")) {
    pushEvent("whatsapp_click_madrid", { destination: href });
    pushEvent("contact_whatsapp", { line: "es", destination: href, form_location });
  }

  if (href.startsWith("tel:")) {
    pushEvent("contact_call", { destination: href, form_location });
  }

  if (target.hasAttribute("download")) {
    const url = target.getAttribute("href") ?? "";
    const filename = url.split("/").pop() ?? url;
    pushEvent("lead_magnet_download", { file: filename, url });
    pushEvent("download_guide", { guide: filename, form_location });
  }
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    if (isPrerender) return;
    captureAttribution();
  }, []);

  useEffect(() => {
    if (isPrerender) return;
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  useEffect(() => {
    if (isPrerender || !isTrackingAllowed()) return; // visitor declined analytics cookies
    const path = location.pathname + location.search;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "spa_pageview",
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return null;
}
