import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pushEvent } from "../lib/analytics";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
  }
}

function handleGlobalClick(e: MouseEvent) {
  const target = (e.target as Element).closest("a");
  if (!target) return;

  const href = target.getAttribute("href") ?? "";

  // WhatsApp click events
  if (href.includes("wa.me/1954")) {
    pushEvent("whatsapp_click_us", { destination: href });
  } else if (href.includes("wa.me/346")) {
    pushEvent("whatsapp_click_madrid", { destination: href });
  }

  // Tel: click-to-call events
  if (href.startsWith("tel:")) {
    pushEvent("tel_click", { destination: href, location: "global" });
  }

  // Lead magnet download events
  if (target.hasAttribute("download")) {
    const url = target.getAttribute("href") ?? "";
    const filename = url.split("/").pop() ?? url;
    pushEvent("lead_magnet_download", { file: filename, url });
  }
}

export function Analytics() {
  const location = useLocation();

  // Global click delegation — covers WhatsApp + download links across all pages
  useEffect(() => {
    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  // Virtual pageview on every route change
  useEffect(() => {
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
