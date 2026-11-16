// Server-only GILMAR cooperating compensation schedule.
// Browser code never imports this file; rates are resolved server-side when
// formatting internal registration alerts for Carlos Uzcategui.
// Pure module (no env vars, no I/O, no DOM) so unit tests import it directly.

export type GilmarCooperationMode = "buyer_agency" | "referral";
export type GilmarLanguage = "en" | "es";

export interface GilmarDevelopmentRates {
  canonicalName: string;
  buyerAgencyRate: string;
  referralRate: string;
}

export const GILMAR_DEVELOPMENT_RATES: Record<string, GilmarDevelopmentRates> = {
  "be-grand-208803": {
    canonicalName: "Be Grand El Limonar",
    buyerAgencyRate: "3%",
    referralRate: "1%",
  },
  "balcon-first-floor": {
    canonicalName: "Balcón del Mediterráneo",
    buyerAgencyRate: "3%",
    referralRate: "1%",
  },
  "elysian-69": {
    canonicalName: "The Elysian Collection",
    buyerAgencyRate: "1.5%",
    referralRate: "1%",
  },
};

export interface ResolvedGilmarRate {
  developmentKey: string | null;
  developmentName: string;
  mode: GilmarCooperationMode | null;
  cooperationLabel: string;
  rate: string | null;
  displayRate: string | null;
  commission: string;
  subjectFee: string;
}

const stripAccents = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function normalizeGilmarDevelopmentKey(development?: string): string | null {
  const s = stripAccents(development ?? "");
  if (!s) return null;
  if (s === "be-grand-208803" || s.includes("be grand") || s.includes("limonar")) {
    return "be-grand-208803";
  }
  if (s === "balcon-first-floor" || s.includes("balcon del mediterraneo") || s.includes("balcon")) {
    return "balcon-first-floor";
  }
  if (s === "elysian-69" || s.includes("elysian")) {
    return "elysian-69";
  }
  return null;
}

export function normalizeGilmarCooperationMode(rawMode?: string): GilmarCooperationMode | null {
  const s = stripAccents(rawMode ?? "");
  if (!s) return null;
  if (/\bbuyer_agency\b|buyer\s+agency|agencia\s+de\s+comprador/.test(s)) {
    return "buyer_agency";
  }
  if (/\breferral\b|solo\s+referencia|honorarios\s+de\s+referencia/.test(s)) {
    return "referral";
  }
  return null;
}

export function normalizeGilmarLanguage(language?: string): GilmarLanguage {
  return (language ?? "").trim().toLowerCase().startsWith("es") ? "es" : "en";
}

export function resolveGilmarCommission(input: {
  development?: string;
  cooperationMode?: string;
  language?: string;
}): ResolvedGilmarRate {
  const lang = normalizeGilmarLanguage(input.language);
  const developmentKey = normalizeGilmarDevelopmentKey(input.development);
  const mode = normalizeGilmarCooperationMode(input.cooperationMode);
  const entry = developmentKey ? GILMAR_DEVELOPMENT_RATES[developmentKey] : undefined;
  const developmentName = entry?.canonicalName ?? ((input.development ?? "").trim() || "Not specified");
  const cooperationLabel =
    mode === "buyer_agency" ? "Buyer agency" : mode === "referral" ? "Referral" : "Not specified";

  if (!entry || !mode) {
    return {
      developmentKey,
      developmentName,
      mode,
      cooperationLabel,
      rate: null,
      displayRate: null,
      commission:
        lang === "es"
          ? "La compensación en otra propiedad de GILMAR se confirma por escrito caso por caso."
          : "Compensation on other GILMAR property is confirmed in writing case by case.",
      subjectFee: "commission agreed in writing",
    };
  }

  const rate = mode === "buyer_agency" ? entry.buyerAgencyRate : entry.referralRate;
  const displayRate = lang === "es" ? rate.replace(".", ",") : rate;

  const commission =
    mode === "referral"
      ? lang === "es"
        ? `${displayRate} de honorarios de referencia sin acuerdo de representación de comprador firmado.`
        : `${displayRate} referral fee without a signed buyer agency agreement.`
      : lang === "es"
        ? `${displayRate} del precio de venta con acuerdo de representación de comprador firmado y acompañamiento hasta el cierre.`
        : `${displayRate} of sale price with a signed buyer agency agreement and participation through closing.`;

  const subjectFee = mode === "referral" ? `${displayRate} referral fee` : `${displayRate} buyer agency`;

  return {
    developmentKey,
    developmentName,
    mode,
    cooperationLabel,
    rate,
    displayRate,
    commission,
    subjectFee,
  };
}
