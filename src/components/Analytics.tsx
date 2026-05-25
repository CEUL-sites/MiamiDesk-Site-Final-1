import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    fbq: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;

    // Push virtual pageview to GTM dataLayer — GA4 tag picks this up via History Change trigger
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "spa_pageview",
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });

    // Meta Pixel virtual pageview (direct — not via GTM)
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return null;
}
