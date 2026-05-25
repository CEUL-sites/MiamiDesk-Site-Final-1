import { useEffect } from "react";

const NEO_KEY = "69a57c73d098c3620b75ec83";
const NEO_SCRIPT = "https://assets.newestateonly.com/iframe-loader/load.js";

export function NeoListingsEmbed() {
  useEffect(() => {
    // Only inject once — the script self-targets the iframe by id
    if (document.querySelector(`script[data-neokey="${NEO_KEY}"]`)) return;

    const script = document.createElement("script");
    script.src = NEO_SCRIPT;
    script.async = true;
    script.setAttribute("data-neokey", NEO_KEY);
    script.setAttribute("data-neolang", "en");
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      id="NEOiframe"
      title="New Pre-Construction Developments — Miami and South Florida"
      style={{ width: "100%", height: "200vh", border: "none", display: "block" }}
    />
  );
}
