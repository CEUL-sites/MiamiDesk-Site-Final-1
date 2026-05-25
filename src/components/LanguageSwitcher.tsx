/**
 * LanguageSwitcher — compact EN / ES toggle.
 * Does not depend on i18n; uses plain anchor navigation.
 * Current language is determined from window.location.pathname.
 */

export function LanguageSwitcher() {
  const isEs =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/es");

  const enHref = (() => {
    if (typeof window === "undefined") return "/";
    const path = window.location.pathname;
    if (path.startsWith("/es/")) return path.slice(3) || "/";
    if (path === "/es") return "/";
    return path;
  })();

  const esHref = (() => {
    if (typeof window === "undefined") return "/es";
    const path = window.location.pathname;
    if (path.startsWith("/es")) return path;
    return "/es";
  })();

  const baseClass =
    "font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-1 transition-colors duration-200";
  const activeClass = "text-gold font-semibold";
  const inactiveClass = "text-white/45 hover:text-gold";

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
      <span className="text-white/20 text-[9px]" aria-hidden="true">
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
