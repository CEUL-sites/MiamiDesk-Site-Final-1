import { Link } from "react-router-dom";

const SPANISH_MARKETS = [
  { label: "Weston, FL", to: "/es/vender-weston", note: "Casas unifamiliares y comunidades cerradas" },
  { label: "Coral Gables, FL", to: "/es/vender-coral-gables", note: "Residencias de lujo y estilo mediterráneo" },
  { label: "Brickell, Miami", to: "/es/vender-brickell", note: "Condominios de torre alta e inversión" },
  { label: "Doral, FL", to: "/es/vender-doral", note: "Comunidades planificadas y townhomes" },
] as const;

export function EsCityLinks() {
  return (
    <section
      id="mercados-espanol"
      aria-labelledby="mercados-espanol-heading"
      className="border-t border-hairline bg-ivory py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-ink font-semibold">
          Guías por Ciudad en Español
        </p>
        <h2
          id="mercados-espanol-heading"
          className="mt-3 font-serif text-2xl text-navy-deep sm:text-3xl tracking-tight"
        >
          Venda su Propiedad en el Sur de Florida
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-navy/75">
          Seleccione su mercado para revisar datos recientes del MLS, preguntas frecuentes y opciones de transición.
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPANISH_MARKETS.map((market) => (
            <li key={market.to} className="border border-hairline bg-white p-5 transition-colors hover:border-gold">
              <Link
                to={market.to}
                className="font-serif text-lg text-navy-deep underline decoration-gold/50 underline-offset-4 hover:text-gold-ink"
              >
                Vender en {market.label}
              </Link>
              <p className="mt-2 font-sans text-xs leading-relaxed text-navy/65">{market.note}</p>
            </li>
          ))}
        </ul>

        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-navy-deep">
          <Link to="/es/vender" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-ink">
            Representación de vendedores
          </Link>
          <Link to="/es/comprar" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-ink">
            Asesoría para compradores
          </Link>
          <Link to="/es/agentes" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-ink">
            Referidos para agentes
          </Link>
        </p>
      </div>
    </section>
  );
}
