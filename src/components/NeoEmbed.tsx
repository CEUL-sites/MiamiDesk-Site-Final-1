import { useEffect } from "react";
import { NEO } from "../constants";

export function NeoEmbed({ lang = "en" }: { lang?: "en" | "es" }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = NEO.loader;
    script.setAttribute("data-neokey", NEO.key);
    script.setAttribute("data-neolang", lang);
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [lang]);

  return (
    <iframe
      id="NEOiframe"
      title="MIAMI NEO — New Estate Only pre-construction inventory"
      loading="lazy"
      style={{ width: "100%", height: "200vh", border: "none" }}
    />
  );
}
