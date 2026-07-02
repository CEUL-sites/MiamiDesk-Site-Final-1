import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { pushEvent } from "../lib/analytics";

export default function NotFoundPage() {
  const location = useLocation();

  useEffect(() => {
    if (navigator.webdriver) return;
    pushEvent("404_view", {
      page_path: location.pathname + location.search,
      referrer: document.referrer,
    });
  }, [location.pathname, location.search]);

  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | HomesProfessional.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main id="main-content" className="flex min-h-[70vh] flex-col items-center justify-center bg-bone-warm px-6 py-24 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">404</p>
        <h1 className="mt-5 font-serif text-5xl text-navy lg:text-6xl">Page Not Found</h1>
        <p className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-navy/60">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="group inline-flex items-center justify-center gap-2 bg-navy px-8 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold"
          >
            Back to Home
          </a>
          <a
            href="/sell-south-florida"
            className="inline-flex items-center justify-center border border-navy/30 px-8 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-navy transition-colors hover:border-gold hover:text-gold"
          >
            Seller Strategy Review
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
