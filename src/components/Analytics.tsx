import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;

    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: path,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location]);

  return null;
}
