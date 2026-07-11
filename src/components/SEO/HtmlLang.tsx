import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

// Sets the <html lang> attribute and og:locale per route so search engines,
// social scrapers, and screen readers see the correct language. Spanish
// surfaces live under /es/* plus the standalone /la-comision-secreta page;
// everything else is English. react-helmet-async applies these to the real
// document, and react-snap bakes them into each prerendered page.
//
// og:locale is emitted here (not statically in index.html) so Spanish pages
// no longer advertise en_US — a static tag would ship on every URL.
const SPANISH = (path: string) => path.startsWith("/es") || path === "/la-comision-secreta";
const PAGE_OWNS_LANGUAGE_METADATA = (path: string) => path === "/global-desk";

export function HtmlLang() {
  const { pathname } = useLocation();
  if (PAGE_OWNS_LANGUAGE_METADATA(pathname)) return null;

  const spanish = SPANISH(pathname);
  return (
    <Helmet htmlAttributes={{ lang: spanish ? "es" : "en" }}>
      <meta property="og:locale" content={spanish ? "es_ES" : "en_US"} />
    </Helmet>
  );
}
