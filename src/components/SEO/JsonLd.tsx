import { useEffect } from "react";

// Renders a <script type="application/ld+json"> tag directly into
// document.head via a ref-counted-free imperative effect, instead of through
// <Helmet>. react-helmet-async's React19Dispatcher renders Helmet's script
// children as real elements in the component tree; React 19 does not hoist
// inline scripts out of the tree, so when rendered inside <Helmet> they end
// up as literal DOM nodes sitting in #root next to the app-shell <Suspense>
// boundary. react-snap's prerendered snapshot then contains DOM nodes that
// hydrateRoot doesn't expect, which throws React error #418 on every route
// and forces a full client-side re-render, discarding the prerender.
//
// By managing the <script> tag ourselves in an effect (after mount, outside
// React's render tree diffing), the JSON-LD payload still ends up in
// document.head for search engines and social scrapers reading the live DOM
// — and, more importantly, for react-snap, which snapshots document.head
// after the page has rendered. React itself never has to reconcile the tag,
// so hydration is unaffected.
//
// `id` must be a stable, unique string per usage (e.g. "home-agent",
// "buy-faq") — it's used both as the effect dependency and as the
// data-jsonld attribute that identifies "this" script for cleanup/dedup.
export function JsonLd({ id, data }: { id: string; data: unknown; key?: string }) {
  useEffect(() => {
    const json = JSON.stringify(data);

    // Dedup guard: react-snap prerenders this component, so the previous
    // run's <script data-jsonld="id"> is already serialized into the
    // snapshot's <head> before this effect ever runs on the client. Without
    // this removal, every hydration would append a second copy alongside
    // the prerendered one, and repeated hot-reloads/mounts would keep
    // stacking duplicates. Remove ANY existing script with this id anywhere
    // in the document (not just head) before appending the fresh one.
    document
      .querySelectorAll(`script[type="application/ld+json"][data-jsonld="${id}"]`)
      .forEach((el) => el.remove());

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-jsonld", id);
    script.textContent = json;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, JSON.stringify(data)]);

  return null;
}
