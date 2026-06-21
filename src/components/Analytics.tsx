import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pushEvent } from "../lib/analytics";
import { captureAttribution } from "../lib/attribution";
import { isTrackingAllowed } from "../lib/consent";

// react-snap (puppeteer) sets navigator.webdriver = true during prerender builds.
// We use this to suppress all analytics during the static-site generation pass
// so build-time page visits don't appear as real sessions in GA4 / Meta / LinkedIn.
const isPrerender = typeof navigator !== "undefined" && navigator.webdriver;

function handleGlobalClick(e: MouseEvent) {
  const target = (e.target as Element).closest("a");
  if (!target) return;

  const href = target.getAttribute("href") ?? "";

  if (href.includes("wa.me/1954")) {
    pushEvent("whatsapp_click_us", { destination: href });
  } else if (href.includes("wa.me/346")) {
    pushEvent("whatsapp_click_madrid", { destination: href });
  }

  if (target.hasAttribute("download")) {
    const url = target.getAttribute("href") ?? "";
    const filename = url.split("/").pop() ?? url;
    pushEvent("lead_magnet_download", { file: filename, url });
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
