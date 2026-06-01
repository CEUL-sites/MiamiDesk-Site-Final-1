/**
 * LanguageSwitcher — compact EN / ES toggle.
 * Uses a route map so /es/vender ↔ /sell, etc. are properly resolved
 * instead of slicing the path prefix (which produces bare 404 routes).
 */

const ES_TO_EN: Record<string, string> = {
  "/es": "/",
  "/es/vender": "/sell",
  "/es/comprar": "/buy",
  "/es/agentes": "/agents",
  "/es/spain-desk": "/spain-desk",
  "/es/madrid": "/madrid",
  "/es/gracias/agente": "/thanks/agent",
};

const EN_TO_ES: Record<string, string> = {
  "/": "/es",
  "/sell": "/es/vender",
  "/buy": "/es/comprar",
  "/agents": "/es/agentes",
  "/spain-desk": "/es/spain-desk",
  "/madrid": "/es/madrid",
  "/thanks/agent": "/es/gracias/agente",
};

export function LanguageSwitcher({ onLight = false }: { onLight?: boolean }) {
  const path =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const isEs = path.startsWith("/es");

  const enHref = isEs
    ? (ES_TO_EN[path] ?? "/")
    : path;

  const esHref = isEs
    ? path
    : (EN_TO_ES[path] ?? "/es");

  const baseClass =
    "font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-1 transition-colors duration-200";
  const activeClass = "text-gold font-semibold";
  const inactiveClass = onLight
    ? "text-navy/45 hover:text-gold"
    : "text-white/45 hover:text-gold";
  const dividerClass = onLight ? "text-navy/20 text-[9px]" : "text-white/20 text-[9px]";

  return (
    <div className="flex items-center gap-1" aria-label="Language selector">
      <a
        href={enHref}
        aria-label="Switch to English"
        aria-current={!isEs ? "page" : undefined}
        className={`${baseClass} ${!isEs ? activeClass : inactiveClass}`}
      >
        EN
      </a>
      <span className={dividerClass} aria-hidden="true">
        |
      </span>
      <a
        href={esHref}
        aria-label="Cambiar a Español"
        aria-current={isEs ? "page" : undefined}
        className={`${baseClass} ${isEs ? activeClass : inactiveClass}`}
      >
        ES
      </a>
    </div>
  );
}
