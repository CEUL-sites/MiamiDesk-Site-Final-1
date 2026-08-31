import { useEffect } from "react";
import { removeExistingNeoLoader, shouldLoadNeoEmbed } from "../lib/neoEmbed";

const NEO_KEY = "69a57c73d098c3620b75ec83";
const NEO_SCRIPT = "https://assets.newestateonly.com/iframe-loader/load.js";

export function NeoListingsEmbed() {
  useEffect(() => {
    // react-snap serializes effects into the generated HTML. Loading the vendor
    // script there creates a hydration race: it may run while React is replacing
    // the prerendered iframe, and the vendor's #NEOiframe lookup returns null.
    // Load only in the hydrated browser, after confirming the iframe is mounted.
    if (!shouldLoadNeoEmbed(window.navigator.userAgent)) return;
    if (!document.getElementById("NEOiframe")) return;

    // Remove a stale loader left by a previous SPA route before initializing the
    // iframe for this route. The vendor script relies on document.currentScript.
    removeExistingNeoLoader(NEO_KEY);

    const script = document.createElement("script");
    script.src = NEO_SCRIPT;
    script.async = true;
    script.setAttribute("data-neokey", NEO_KEY);
    script.setAttribute("data-neolang", "en");
    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <iframe
      id="NEOiframe"
      title="New Pre-Construction Developments — Miami and South Florida"
      style={{ width: "100%", height: "200vh", border: "none", display: "block" }}
    />
  );
}
