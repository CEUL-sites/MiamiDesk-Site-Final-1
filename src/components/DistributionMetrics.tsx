import { fig } from '../data/figures';
import { Tilt3D } from './Tilt3D';

/** Counts describe infrastructure, never guaranteed exposure for a property. */
export function DistributionMetrics({ lang = 'en', dark = false }: { lang?: 'en' | 'es'; dark?: boolean }) {
  const es = lang === 'es';
  const metrics = [
    [fig('members'), es ? 'Miembros de la asociación' : 'Association members', 'MIAMI REALTORS® + RWorld · May 2026', es ? 'NODO 01 · REGIONAL' : 'NODE 01 · REGIONAL CORE'],
    [fig('globalWebsites'), es ? 'Portales globales' : 'Global portals', `${fig('languages')} ${es ? 'idiomas · programa de distribución MIAMI' : 'languages · MIAMI distribution program'}`],
    [fig('usMls'), es ? 'MLS de EE. UU. a través de RPR' : 'US MLSs through RPR', `${fig('mlsDataExchanges')} ${es ? 'intercambios de datos MLS' : 'MLS data exchanges'}`],
    [fig('internationalAgreements'), es ? 'Acuerdos internacionales' : 'International agreements', 'MIAMI Global Council'],
    [fig('urgAgents'), es ? 'Agentes de United Realty Group' : 'United Realty Group agents', `${fig('urgOfficeNetwork')} ${es ? 'ubicaciones en Florida*' : 'Florida office locations*'}`],
    [fig('association2025Volume'), es ? 'Volumen combinado de la asociación en 2025' : 'Association combined 2025 market volume', 'MIAMI REALTORS® + RWorld'],
  ];

  const nodeTiers = [
    es ? 'NODO 01 · REGIONAL' : 'NODE 01 · REGIONAL CORE',
    es ? 'NODO 02 · PORTALES' : 'NODE 02 · GLOBAL DISCOVERY',
    es ? 'NODO 03 · NACIONAL' : 'NODE 03 · NATIONAL RECIPROCITY',
    es ? 'NODO 04 · BILATERAL' : 'NODE 04 · GLOBAL COUNCIL',
    es ? 'NODO 05 · CORREDURÍA' : 'NODE 05 · BROKERAGE FOOTPRINT',
    es ? 'NODO 06 · VOLUMEN' : 'NODE 06 · NETWORK SCALE',
  ];

  return <div className={dark ? 'text-white' : 'text-navy-deep'}>
    <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
      {metrics.map(([value, label, detail], idx) => (
        <div key={label} className="h-full">
          <Tilt3D className="h-full" maxTilt={5}>
            <div
              className={`group relative flex h-full min-w-0 flex-col justify-between rounded-2xl p-6 md:p-8 backdrop-blur-xl transition-all duration-500 ${
                dark
                  ? 'border border-gold/25 bg-gradient-to-b from-white/[0.08] via-navy-deep/85 to-navy-deep/95 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(212,175,55,0.4)] hover:border-gold hover:shadow-[0_25px_60px_rgba(176,141,87,0.22)]'
                  : 'border border-bone bg-white/85 shadow-md hover:border-gold/50 hover:shadow-lg'
              }`}
            >
              <div>
                <div className={`flex items-center justify-between border-b pb-3 ${dark ? 'border-gold/15' : 'border-bone'}`}>
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.25em] ${dark ? 'text-gold' : 'text-navy-light'}`}>
                    {nodeTiers[idx]}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider ${dark ? 'text-white/60' : 'text-navy/60'}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {es ? 'Conectado' : 'Connected'}
                  </span>
                </div>

                <p className={`mt-5 font-serif text-4xl md:text-5xl tracking-tight ${dark ? 'text-gold' : 'text-navy-deep'}`}>
                  {value}
                </p>
                <p className={`mt-3 font-sans text-sm font-semibold uppercase tracking-[0.12em] ${dark ? 'text-white' : 'text-navy-deep'}`}>
                  {label}
                </p>
              </div>

              <p className={`mt-4 border-t pt-3 font-sans text-xs leading-relaxed ${dark ? 'border-gold/10 text-white/75' : 'border-bone text-navy/75'}`}>
                {detail}
              </p>
            </div>
          </Tilt3D>
        </div>
      ))}
    </div>
    <p className={`mt-6 font-sans text-xs leading-relaxed ${dark ? 'text-white/75' : 'text-navy/75'}`}>
      {es ? 'Fuentes: ' : 'Sources: '}
      <a className="underline hover:text-gold" href="https://www.miamirealtors.com/2026/04/20/miami-realtors-and-rworld-announce-merger-creating-the-worlds-largest-local-realtor-association/" target="_blank" rel="noopener noreferrer">MIAMI merger announcement (April 2026)</a>;{' '}
      <a className="underline hover:text-gold" href="https://www.miamirealtors.com/global/" target="_blank" rel="noopener noreferrer">MIAMI distribution and Global Council</a>;{' '}
      <a className="underline hover:text-gold" href="https://www.urgfl.com/office-locations/" target="_blank" rel="noopener noreferrer">United Realty Group</a>.
      {' '}{es ? '*El directorio incluye Pembroke Pines, marcado como próxima apertura. Los $69 mil millones corresponden a la asociación combinada, no a Carlos ni a URG. La distribución depende de elegibilidad, normas MLS y participación; no garantiza contactos, precio ni venta.' : '*Directory includes Pembroke Pines, marked opening soon. The $69 billion is the combined association’s volume, not Carlos’s or URG’s production. Distribution depends on eligibility, MLS rules and participation; no placement, leads, price or sale is guaranteed.'}
    </p>
  </div>;
}
