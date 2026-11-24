// Fair housing copy guard (federal Fair Housing Act, 24 CFR 100.75; Florida
// Fair Housing Act). Advertising must not describe a city, neighborhood or
// community by the race, color, national origin or religion of its buyers or
// residents, or signal a preferred buyer on those grounds (steering).
//
// What this flags: a national-origin, ethnic or religious descriptor attached
// to people — buyers, families, a community, demand, a buyer pool — in
// English or Spanish, plus "diverse buyer"-style demographic framing.
//
// What stays allowed (Carlos, 2026-11-24): families, schools, parks, named
// local businesses and landmarks; bilingual English/Spanish service; the
// international referral network and the Global Desk's Spain/LATAM service
// lines when they are not tied to the make-up of an area. Service-line pages
// are therefore outside the scan scope in verify-fair-housing.mjs.

const ORIGIN_EN = [
  'latin american', 'latam', 'latino', 'latina', 'hispanic', 'south american', 'central american',
  'venezuelan', 'colombian', 'brazilian', 'argentine', 'argentinian', 'cuban', 'mexican', 'peruvian',
  'dominican', 'haitian', 'haitian-american', 'caribbean', 'caribbean-american', 'european', 'eastern european',
  'asian', 'chinese', 'russian', 'israeli', 'canadian', 'british', 'french', 'german',
  'jewish', 'muslim', 'christian', 'catholic', 'orthodox', 'black', 'white',
];
const PEOPLE_EN = [
  'buyers?', 'buyer pool', 'buyer demand', 'buyer community', 'famil(?:y|ies)', 'communit(?:y|ies)',
  'demand', 'purchasers?', 'residents?', 'population', 'diaspora', 'neighborhoods?', 'enclaves?',
  'relocators?', 'professional families', 'capital flows?', 'investors?',
];
const ORIGIN_ES = [
  'latinoamerican[oa]s?', 'latin[oa]s?', 'hispan[oa]s?', 'hispanohablantes?', 'sudamerican[oa]s?',
  'venezolan[oa]s?', 'colombian[oa]s?', 'brasileñ[oa]s?', 'argentin[oa]s?', 'cuban[oa]s?', 'mexican[oa]s?',
  'peruan[oa]s?', 'dominican[oa]s?', 'haitian[oa]s?', 'europe[oa]s?', 'asiátic[oa]s?', 'judí[oa]s?',
];
const PEOPLE_ES = ['compradores?', 'familias?', 'comunidad(?:es)?', 'demanda', 'inversionistas?', 'residentes?', 'población'];

const RULES = [
  {
    id: 'origin-people-en',
    re: new RegExp(`\\b(?:${ORIGIN_EN.join('|')})\\s+(?:[a-z-]+\\s+){0,2}?(?:${PEOPLE_EN.join('|')})\\b`, 'gi'),
  },
  {
    id: 'origin-people-es',
    re: new RegExp(`\\b(?:${PEOPLE_ES.join('|')})\\s+(?:[a-záéíóúñ]+\\s+){0,2}?(?:${ORIGIN_ES.join('|')})(?![a-záéíóúñ])`, 'gi'),
  },
  {
    id: 'origin-of-buyers-en',
    re: /\bbuyers?\s+(?:from|out of)\s+(?:venezuela|colombia|brazil|argentina|cuba|mexico|peru|haiti|latin america|south america|europe|israel|russia|china)\b/gi,
  },
  {
    id: 'demographic-framing',
    re: /\b(?:diverse\s+(?:buyer|buyers|population|community|communities)|bilingual\s+(?:market|community|city|environment|infrastructure)|cultural familiarity|comunidad hispanohablante|infraestructura bilingüe|entorno bilingüe)\b/gi,
  },
];

/** Returns [{ rule, match, index }] for every fair-housing pattern hit in `text`. */
export function findFairHousingIssues(text) {
  const issues = [];
  for (const { id, re } of RULES) {
    re.lastIndex = 0;
    for (const m of text.matchAll(re)) issues.push({ rule: id, match: m[0], index: m.index });
  }
  return issues;
}
