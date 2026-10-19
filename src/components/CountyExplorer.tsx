import counties from '../data/heroCounties.json';
import { pushEvent } from '../lib/analytics';
import './advisory-heroes.css';
const details = [
  { text: 'Compare urban condominiums, established neighborhoods and waterfront homes. Review building costs, property condition and competing inventory for your specific location.', links: [['Coral Gables','/sell-coral-gables'],['Doral','/sell-doral'],['Miami','/sell-miami']] },
  { text: 'From coastal properties to western communities, evaluate the competing homes, insurance considerations and timing that affect your next move.', links: [['Weston','/sell-weston'],['Fort Lauderdale','/sell-fort-lauderdale'],['Plantation','/sell-plantation']] },
  { text: 'Define the neighborhood, property type and ownership costs before drawing conclusions from a county-wide figure. Request comparable sales for your property.', links: [['Palm Beach property review','/contact?intent=seller&market=palm-beach']] },
];
export function CountyExplorer({ selected, onSelect }: { selected: number; onSelect: (index: number) => void }) {
  function select(index: number) { onSelect(index); pushEvent('market_selected', { county: counties[index].name, location:'markets_hero' }); }
  return <div id="market-explorer" className="county-explorer">
    <svg viewBox="0 0 230 400" role="group" aria-label="Select a South Florida county">
      {counties.map((county,index) => <path key={county.id} d={county.path} fillRule="evenodd" role="button" tabIndex={0} aria-label={county.name} aria-pressed={selected === index} onClick={() => select(index)} onKeyDown={event => { if(event.key === 'Enter' || event.key === ' ') {event.preventDefault();select(index);} }}><title>{county.name}</title></path>)}
    </svg>
    <div className="county-options">{counties.map((county,index) => <button key={county.id} type="button" aria-pressed={selected===index} onClick={() => select(index)}>{county.name}</button>)}<p className="advisory-note">Select a county<br />North is up</p></div>
    <div className="county-detail" aria-live="polite"><h2>{counties[selected].name}</h2><p>{details[selected].text}</p><div className="flex flex-wrap gap-x-5">{details[selected].links.map(([name,href]) => <a key={href} href={href}>{name} →</a>)}</div></div>
    <p className="advisory-note" style={{gridColumn:'1 / -1',marginTop:0}}>Boundaries: <a href="https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html" target="_blank" rel="noopener noreferrer">U.S. Census Bureau, 2025</a>. Simplified for display. No live market data.</p>
  </div>;
}
