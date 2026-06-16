import { Home } from "lucide-react";
import { CONTACT } from "../constants";
import { REPRESENTED_PROPERTIES } from "../data/representedProperties";

/**
 * Recently Represented — a grid of properties Carlos has listed or bought for
 * clients, driven entirely by the curated src/data/representedProperties.ts
 * file. No fabricated transactions: when the curated list is empty the section
 * renders nothing, so it degrades gracefully until Carlos supplies real records.
 */
export function RecentlyRepresented() {
  const properties = REPRESENTED_PROPERTIES;
  if (properties.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Recently Represented</p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight text-navy-deep">
          Properties Carlos has represented across South Florida.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((p, i) => (
            <div key={`${p.location}-${i}`} className="flex flex-col overflow-hidden border border-hairline bg-ivory">
              <div className="relative h-48 bg-navy/5">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={`${p.propertyType} in ${p.location}`}
                    loading="lazy"
                    width="400"
                    height="192"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Home size={28} className="text-navy/20" />
                  </div>
                )}
                <div className="absolute left-3 top-3 bg-gold px-2 py-1 font-mono text-[7px] uppercase tracking-[0.18em] text-navy">
                  {p.side} Side
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <p className="font-serif text-lg text-navy-deep">{p.location}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-navy/45">
                  {[p.propertyType, p.year].filter(Boolean).join(" · ")}
                </p>
                {p.note && <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/65">{p.note}</p>}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 border-t border-hairline pt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-navy/35">
          Representative transactions · {CONTACT.licenseDisplay} · {CONTACT.brokerage} · Equal Housing Opportunity
        </p>
      </div>
    </section>
  );
}
