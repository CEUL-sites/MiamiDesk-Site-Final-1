import { fig } from '../data/figures';

/** Counts describe infrastructure, never guaranteed exposure for a property. */
export function DistributionMetrics({ lang = 'en', dark = false }: { lang?: 'en' | 'es'; dark?: boolean }) {
  const es = lang === 'es';
  const metrics = [
    [fig('members'), es ? 'Miembros de la asociación' : 'Association members', 'MIAMI REALTORS® + RWorld · May 2026'],
    [fig('globalWebsites'), es ? 'Portales globales' : 'Global portals', `${fig('languages')} ${es ? 'idiomas · programa de distribución MIAMI' : 'languages · MIAMI distribution program'}`],
    [fig('usMls'), es ? 'MLS de EE. UU. a través de RPR' : 'US MLSs through RPR', `${fig('mlsDataExchanges')} ${es ? 'intercambios de datos MLS' : 'MLS data exchanges'}`],
    [fig('internationalAgreements'), es ? 'Acuerdos internacionales' : 'International agreements', 'MIAMI Global Council'],
    [fig('urgAgents'), es ? 'Agentes de United Realty Group' : 'United Realty Group agents', `${fig('urgOfficeNetwork')} ${es ? 'ubicaciones en Florida*' : 'Florida office locations*'}`],
    [fig('association2025Volume'), es ? 'Volumen combinado de la asociación en 2025' : 'Association combined 2025 market volume', 'MIAMI REALTORS® + RWorld'],
  ];
  return <div className={dark ? 'text-white' : 'text-navy-deep'}>
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${dark ? 'border-gold/15' : 'border-bone'}`}>
      {metrics.map(([value, label, detail]) => <div key={label} className={`min-w-0 border p-6 md:p-8 ${dark ? 'border-white/15' : 'border-bone'}`}>
        <p className={`font-serif text-4xl md:text-5xl ${dark ? 'text-gold' : 'text-navy-deep'}`}>{value}</p>
        <p className="mt-3 font-sans text-sm font-semibold">{label}</p>
        <p className={`mt-2 font-sans text-xs ${dark ? 'text-white/75' : 'text-navy/75'}`}>{detail}</p>
      </div>)}
    </div>
    <p className={`mt-5 font-sans text-xs leading-relaxed ${dark ? 'text-white/75' : 'text-navy/75'}`}>
      {es ? 'Fuentes: ' : 'Sources: '}
      <a className="underline" href="https://www.miamirealtors.com/2026/04/20/miami-realtors-and-rworld-announce-merger-creating-the-worlds-largest-local-realtor-association/" target="_blank" rel="noopener noreferrer">MIAMI merger announcement (April 2026)</a>;{' '}
      <a className="underline" href="https://www.miamirealtors.com/global/" target="_blank" rel="noopener noreferrer">MIAMI distribution and Global Council</a>;{' '}
      <a className="underline" href="https://www.urgfl.com/office-locations/" target="_blank" rel="noopener noreferrer">United Realty Group</a>.
      {' '}{es ? '*El directorio incluye Pembroke Pines, marcado como próxima apertura. Los $69 mil millones corresponden a la asociación combinada, no a Carlos ni a URG. La distribución depende de elegibilidad, normas MLS y participación; no garantiza contactos, precio ni venta.' : '*Directory includes Pembroke Pines, marked opening soon. The $69 billion is the combined association’s volume, not Carlos’s or URG’s production. Distribution depends on eligibility, MLS rules and participation; no placement, leads, price or sale is guaranteed.'}
    </p>
  </div>;
}
