export type AiDeskVisitorType =
  | "south_florida_seller"
  | "south_florida_buyer"
  | "investor"
  | "past_client"
  | "sphere_of_influence"
  | "new_website_visitor"
  | "potential_client"
  | "agent_referral_partner"
  | "broker_agency_partner"
  | "spanish_real_estate_agency"
  | "spanish_property_owner"
  | "developer_new_construction"
  | "spain_investment_inquiry"
  | "latam_cross_border_inquiry"
  | "relocation_inquiry"
  | "general_real_estate_question"
  | "press_vendor_unrelated";

export type AiDeskMlsNeed = "none" | "buyer_search" | "seller_context" | "investor_context" | "general_market";

export type AiDeskIntent = {
  visitorType: AiDeskVisitorType;
  mlsNeed: AiDeskMlsNeed;
  language: "english" | "spanish" | "unknown";
  city?: string;
  budgetMin?: number;
  budgetMax?: number;
  propertyType?: string;
  confidence: "low" | "medium" | "high";
};

export type DeskMessage = {
  role: string;
  content: string;
};

const SOUTH_FLORIDA_CITIES = [
  "Miami",
  "Weston",
  "Coral Gables",
  "Doral",
  "Brickell",
  "Aventura",
  "Miami Beach",
  "Sunny Isles",
  "Bal Harbour",
  "Key Biscayne",
  "Coconut Grove",
  "Pinecrest",
  "Fort Lauderdale",
  "Hollywood",
  "Pembroke Pines",
  "Miramar",
  "Plantation",
  "Coral Springs",
  "Parkland",
  "Boca Raton",
  "Palm Beach",
  "Pompano Beach",
  "Hallandale",
  "Homestead",
  "Kendall",
  "Miami Lakes",
  "Sunrise",
];

const hasAny = (text: string, terms: string[]) => terms.some((term) => text.includes(term));

const normalizeText = (messages: DeskMessage[]) =>
  messages
    .map((message) => message.content)
    .join(" ")
    .toLowerCase();

const lastUserText = (messages: DeskMessage[]) =>
  [...messages]
    .reverse()
    .find((message) => message.role === "user")
    ?.content ?? "";

const detectLanguage = (text: string): AiDeskIntent["language"] => {
  if (/[¿¡áéíóúñü]/i.test(text)) return "spanish";
  if (hasAny(text.toLowerCase(), ["quiero", "vender", "comprar", "inmobiliaria", "propiedad", "referido", "españa", "madrid"])) {
    return "spanish";
  }
  return text.trim() ? "english" : "unknown";
};

const detectCity = (text: string) =>
  SOUTH_FLORIDA_CITIES.find((city) => text.toLowerCase().includes(city.toLowerCase()));

const parseBudget = (text: string): Pick<AiDeskIntent, "budgetMin" | "budgetMax"> => {
  const normalized = text.toLowerCase().replace(/,/g, "");
  const rangeMatch = normalized.match(/(?:\$)?(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?\s*(?:-|to|and|a)\s*(?:\$)?(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?/);
  const singleMatch = normalized.match(/(?:budget|under|up to|hasta|presupuesto|around|sobre|aprox(?:\.|imadamente)?)\s*(?:\$)?(\d+(?:\.\d+)?)\s*(m|million|k|thousand)?/);

  const toNumber = (value: string, unit?: string) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return undefined;
    if (unit === "m" || unit === "million") return Math.round(parsed * 1_000_000);
    if (unit === "k" || unit === "thousand") return Math.round(parsed * 1_000);
    if (parsed < 10000) return Math.round(parsed * 1_000_000);
    return Math.round(parsed);
  };

  if (rangeMatch) {
    return {
      budgetMin: toNumber(rangeMatch[1], rangeMatch[2]),
      budgetMax: toNumber(rangeMatch[3], rangeMatch[4] || rangeMatch[2]),
    };
  }

  if (singleMatch) {
    const amount = toNumber(singleMatch[1], singleMatch[2]);
    return normalized.includes("under") || normalized.includes("up to") || normalized.includes("hasta")
      ? { budgetMax: amount }
      : { budgetMin: amount ? Math.round(amount * 0.85) : undefined, budgetMax: amount ? Math.round(amount * 1.15) : undefined };
  }

  return {};
};

const detectPropertyType = (text: string) => {
  if (hasAny(text, ["condo", "apartment", "apartamento", "unit"])) return "Residential";
  if (hasAny(text, ["house", "home", "single family", "casa", "villa", "townhouse", "townhome"])) return "Residential";
  if (hasAny(text, ["commercial", "retail", "office", "industrial", "comercial"])) return "Commercial Sale";
  return undefined;
};

export const classifyAiDeskIntent = (messages: DeskMessage[]): AiDeskIntent => {
  const allText = normalizeText(messages);
  const latest = lastUserText(messages);
  const latestLower = latest.toLowerCase();
  const city = detectCity(allText);
  const budget = parseBudget(allText);
  const language = detectLanguage(allText);
  const propertyType = detectPropertyType(allText);

  if (hasAny(allText, ["press", "media", "vendor", "seo", "advertising", "solicitation", "partnership proposal"])) {
    return { visitorType: "press_vendor_unrelated", mlsNeed: "none", language, city, propertyType, ...budget, confidence: "medium" };
  }

  if (hasAny(allText, ["past client", "carlos helped me", "helped me before", "i know carlos", "friend told me", "referral for carlos", "wanted to ask carlos", "conozco a carlos", "cliente anterior"])) {
    return { visitorType: "past_client", mlsNeed: city ? "general_market" : "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["developer", "new construction", "pre-construction", "builder", "inventory", "desarrollador", "obra nueva"])) {
    return { visitorType: "developer_new_construction", mlsNeed: "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["spanish agency", "agencia española", "real estate agency in spain", "inmobiliaria en españa", "agency in madrid"])) {
    return { visitorType: "spanish_real_estate_agency", mlsNeed: "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["broker", "agent", "agency", "referral agreement", "refer a client", "referido", "referir", "cooperation", "cooperacion", "cooperación"])) {
    return { visitorType: "agent_referral_partner", mlsNeed: city ? "general_market" : "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["madrid", "spain", "españa", "spanish property", "property in spain", "invest in spain", "comprar en españa", "invertir en españa"])) {
    const visitorType = hasAny(allText, ["sell", "selling", "vender", "owner", "propietario"]) ? "spanish_property_owner" : "spain_investment_inquiry";
    return { visitorType, mlsNeed: city ? "buyer_search" : "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["latam", "latin america", "venezuela", "colombia", "argentina", "mexico", "peru", "chile", "latin", "latinoamerica", "latinoamérica"])) {
    return { visitorType: "latam_cross_border_inquiry", mlsNeed: city ? "buyer_search" : "none", language, city, propertyType, ...budget, confidence: "medium" };
  }

  if (hasAny(allText, ["relocat", "moving to", "move to", "mudanza", "me mudo", "traslado"])) {
    return { visitorType: "relocation_inquiry", mlsNeed: city ? "buyer_search" : "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["invest", "rental income", "roi", "return", "cap rate", "appreciation", "portfolio", "inversion", "inversión", "renta", "rentabilidad"])) {
    return { visitorType: "investor", mlsNeed: city ? "investor_context" : "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["sell", "selling", "seller", "list my", "listing", "home worth", "value my", "valuation", "property value", "vender", "venta", "valorar", "cuanto vale", "cuánto vale"])) {
    return { visitorType: "south_florida_seller", mlsNeed: city ? "seller_context" : "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (hasAny(allText, ["buy", "buyer", "purchase", "searching", "looking for", "showing", "comprar", "busco", "buscando"])) {
    return { visitorType: "south_florida_buyer", mlsNeed: city ? "buyer_search" : "none", language, city, propertyType, ...budget, confidence: "high" };
  }

  if (city || hasAny(allText, ["market", "mls", "property", "real estate", "mercado", "inmobiliario"])) {
    return { visitorType: "general_real_estate_question", mlsNeed: city ? "general_market" : "none", language, city, propertyType, ...budget, confidence: "medium" };
  }

  return { visitorType: "potential_client", mlsNeed: "none", language, city, propertyType, ...budget, confidence: "low" };
};
