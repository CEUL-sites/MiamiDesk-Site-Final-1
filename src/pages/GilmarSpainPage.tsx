import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CheckCircle2,
  Globe2,
  Lock,
  Scale,
  ShieldCheck,
  X,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { FaqAccordion } from "../components/FaqAccordion";
import { JsonLd } from "../components/SEO/JsonLd";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { BuyerMandateForm } from "../components/forms/BuyerMandateForm";
import { CONTACT, PUBLIC_COMPLIANCE } from "../constants";
import { HouseBotHero } from "../components/housebot/HouseBotHero";
import "./gilmar-spain.css";

type Lang = "en" | "es";

interface PropertyDetail {
  slug: string;
  code: string;
  name: string;
  locationEn: string;
  locationEs: string;
  regionEn: string;
  regionEs: string;
  taxBadgeEn: string;
  taxBadgeEs: string;
  unitLabelEn: string;
  unitLabelEs: string;
  priceEur: number;
  priceSuffixEn: string;
  priceSuffixEs: string;
  priceNoteEn: string;
  priceNoteEs: string;
  builtSqm: number;
  builtSqft: number;
  outdoorSqm: number;
  outdoorSqft: number;
  specsEn: string;
  specsEs: string;
  sizeSummaryEn: string;
  sizeSummaryEs: string;
  summaryEn: string;
  summaryEs: string;
  highlightsEn: string[];
  highlightsEs: string[];
  address: string;
  complianceEn: string;
  complianceEs: string;
  gallery: { src: string; altEn: string; altEs: string; captionEn: string; captionEs: string }[];
}

const EUR_TO_USD = 1.1052;

function formatEur(amount: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatUsd(amountEur: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amountEur * EUR_TO_USD));
}

const DEVELOPMENTS: readonly PropertyDetail[] = [
  {
    slug: "elysian-69",
    code: "01",
    name: "The Elysian Collection",
    locationEn: "Caleta de Fuste · Fuerteventura",
    locationEs: "Caleta de Fuste · Fuerteventura",
    regionEn: "Canary Islands · Spain",
    regionEs: "Islas Canarias · España",
    taxBadgeEn: "IGIC Canary Islands (to confirm)",
    taxBadgeEs: "IGIC Canarias (por confirmar)",
    unitLabelEn: "Block M · Floor 3B · Unit 69",
    unitLabelEs: "Bloque M · Planta 3B · Unidad 69",
    priceEur: 366000,
    priceSuffixEn: "",
    priceSuffixEs: "",
    priceNoteEn: "Selected-unit price · IGIC tax treatment to confirm",
    priceNoteEs: "Precio de unidad seleccionada · Tratamiento fiscal IGIC por confirmar",
    builtSqm: 134,
    builtSqft: 1442,
    outdoorSqm: 63.3,
    outdoorSqft: 681,
    specsEn: "3 Bedrooms · 2 Bathrooms · 134 m² Built",
    specsEs: "3 Dormitorios · 2 Baños · 134 m² construidos",
    sizeSummaryEn: "105.75 m² interior + 63.30 m² across two terraces",
    sizeSummaryEs: "105,75 m² interiores + 63,30 m² en dos terrazas",
    summaryEn:
      "An elevated three-bedroom residence with two terraces facing the Atlantic and Caleta de Fuste, paired with an open living, dining, and kitchen island layout.",
    summaryEs:
      "Vivienda elevada de tres dormitorios con dos terrazas hacia el Atlántico y Caleta de Fuste, y salón-comedor abierto con cocina en isla.",
    highlightsEn: [
      "105.75 m² interior living space + 63.30 m² across two terraces",
      "En-suite primary bedroom · Private parking included · Communal pool",
      "Available on any open unit in the development upon written registration",
    ],
    highlightsEs: [
      "105,75 m² de superficie interior + 63,30 m² en dos terrazas",
      "Dormitorio principal en suite · Plaza de garaje · Piscina comunitaria",
      "Disponible en cualquier unidad libre de la promoción mediante registro previo",
    ],
    address: "Urbanización Castillo 3, Fase P, número 1 · Caleta de Fuste, Fuerteventura, Canary Islands, Spain",
    complianceEn:
      "GILMAR identifies Block M, Floor 3B, Unit 69. Current availability, delivery, unit plan, and whether the quoted price includes IGIC require written confirmation.",
    complianceEs:
      "GILMAR identifica Bloque M, Planta 3B, Unidad 69. Disponibilidad vigente, entrega, plano e inclusión de IGIC requieren confirmación escrita.",
    gallery: [
      {
        src: "/images/gilmar/elysian.jpg",
        altEn: "The Elysian Collection exterior architecture and communal pool rendering",
        altEs: "Render exterior de arquitectura y piscina comunitaria de The Elysian Collection",
        captionEn: "Architecture & pool · Project rendering, not Unit 69",
        captionEs: "Arquitectura y piscina · Render de la promoción, no Unidad 69",
      },
      {
        src: "/images/gilmar/elysian-terrace.webp",
        altEn: "The Elysian Collection terrace rendering",
        altEs: "Render de terraza de The Elysian Collection",
        captionEn: "Terrace view · Project rendering, not Unit 69",
        captionEs: "Terraza · Render de la promoción, no Unidad 69",
      },
      {
        src: "/images/gilmar/elysian-showhome.webp",
        altEn: "The Elysian Collection show-home interior",
        altEs: "Interior de vivienda piloto en The Elysian Collection",
        captionEn: "Show-home interior · Not Unit 69",
        captionEs: "Vivienda piloto · No es la Unidad 69",
      },
    ],
  },
  {
    slug: "balcon-first-floor",
    code: "02",
    name: "Balcón del Mediterráneo",
    locationEn: "Selwo · Estepona",
    locationEs: "Selwo · Estepona",
    regionEn: "Costa del Sol · Spain",
    regionEs: "Costa del Sol · España",
    taxBadgeEn: "IVA Mainland (+ VAT)",
    taxBadgeEs: "IVA Península (+ IVA)",
    unitLabelEn: "First-Floor Residence · 3 En-Suite Bedrooms",
    unitLabelEs: "Vivienda en Primera Planta · 3 Dormitorios en Suite",
    priceEur: 1442000,
    priceSuffixEn: "+ VAT",
    priceSuffixEs: "+ IVA",
    priceNoteEn: "GILMAR quoted price · Purchase taxes & costs additional",
    priceNoteEs: "Precio comunicado por GILMAR · Impuestos y gastos adicionales",
    builtSqm: 205.09,
    builtSqft: 2208,
    outdoorSqm: 27.55,
    outdoorSqft: 297,
    specsEn: "3 En-Suite Bedrooms + Guest WC · 205.09 m² Built",
    specsEs: "3 Dormitorios en Suite + Aseo · 205,09 m² construidos",
    sizeSummaryEn: "27.55 m² private terrace · 2 underground parking spaces",
    sizeSummaryEs: "27,55 m² de terraza privada · 2 plazas de garaje",
    summaryEn:
      "A first-floor residence in Selwo on Estepona’s New Golden Mile featuring three en-suite bedrooms, a separate guest toilet, expansive living areas, and wellness amenities.",
    summaryEs:
      "Vivienda en primera planta en Selwo (Nueva Milla de Oro de Estepona) con tres dormitorios en suite, aseo de cortesía, amplios salones y zonas wellness.",
    highlightsEn: [
      "27.55 m² private terrace + two underground parking spaces & storage room",
      "Communal pools, wellness and spa facilities, gym, and landscaped gardens",
      "Available on any open unit in the development upon written registration",
    ],
    highlightsEs: [
      "27,55 m² de terraza privada + dos plazas subterráneas y trastero",
      "Piscinas comunitarias, spa y zona wellness, gimnasio y jardines",
      "Disponible en cualquier unidad libre de la promoción mediante registro previo",
    ],
    address: "Urbanización Balcón del Mediterráneo, Calle El Burgo, s/n · 29680 Estepona, Málaga, Spain",
    complianceEn:
      "Exact block, staircase, unit code, plan, and delivery are awaiting confirmation. Price excludes VAT and purchase costs; request a current written quotation.",
    complianceEs:
      "Bloque exacto, escalera, código de unidad, plano y entrega pendientes de confirmación. El precio excluye IVA y gastos de compra.",
    gallery: [
      {
        src: "/images/gilmar/balcon-residence.jpg",
        altEn: "Balcón del Mediterráneo interior rendering",
        altEs: "Render interior de Balcón del Mediterráneo",
        captionEn: "Interior · Project rendering, not the selected unit",
        captionEs: "Interior · Render de la promoción, no la unidad seleccionada",
      },
      {
        src: "/images/gilmar/balcon-terrace.jpg",
        altEn: "Balcón del Mediterráneo terrace developer visualization",
        altEs: "Visualización de terraza en Balcón del Mediterráneo",
        captionEn: "Terrace · Developer visualization",
        captionEs: "Terraza · Visualización del promotor",
      },
      {
        src: "/images/gilmar/balcon-spa.webp",
        altEn: "Balcón del Mediterráneo shared wellness and spa area",
        altEs: "Zona común de bienestar y spa en Balcón del Mediterráneo",
        captionEn: "Shared wellness facilities · Project visualization",
        captionEs: "Instalaciones comunes de bienestar · Visualización",
      },
    ],
  },
  {
    slug: "be-grand-208803",
    code: "03",
    name: "Be Grand El Limonar",
    locationEn: "Muelle Uno · El Limonar",
    locationEs: "Muelle Uno · El Limonar",
    regionEn: "Málaga · Spain",
    regionEs: "Málaga · España",
    taxBadgeEn: "IVA Mainland (+ VAT)",
    taxBadgeEs: "IVA Península (+ IVA)",
    unitLabelEn: "Fifth Floor · Unit C · Private Pool",
    unitLabelEs: "Quinta Planta · Unidad C · Piscina Privada",
    priceEur: 1950000,
    priceSuffixEn: "+ VAT",
    priceSuffixEs: "+ IVA",
    priceNoteEn: "GILMAR quoted price · Purchase taxes & costs additional",
    priceNoteEs: "Precio comunicado por GILMAR · Impuestos y gastos adicionales",
    builtSqm: 120.3,
    builtSqft: 1295,
    outdoorSqm: 186.55,
    outdoorSqft: 2008,
    specsEn: "2 Bedrooms · 2 Bathrooms · 120.30 m² Built",
    specsEs: "2 Dormitorios · 2 Baños · 120,30 m² construidos",
    sizeSummaryEn: "186.55 m² reported outdoor area · Private pool",
    sizeSummaryEs: "186,55 m² exteriores comunicados · Piscina privada",
    summaryEn:
      "A two-bedroom residence in El Limonar with an open living, dining, and kitchen area, private outdoor terrace with private pool, Porcelanosa finishes, and Siemens appliances.",
    summaryEs:
      "Vivienda de dos dormitorios en El Limonar con salón-comedor y cocina abierta, terraza con piscina privada, acabados Porcelanosa y electrodomésticos Siemens.",
    highlightsEn: [
      "186.55 m² reported outdoor area with private pool + 120.30 m² defined built area",
      "Shared pools, sea-view chill-out areas, and fitness center · Est. completion end of 2027",
      "Available on any open unit in the development upon written registration",
    ],
    highlightsEs: [
      "186,55 m² de área exterior comunicada con piscina privada + 120,30 m² construidos",
      "Piscinas comunes, zona chill-out con vistas al mar y gimnasio · Entrega est. fin 2027",
      "Disponible en cualquier unidad libre de la promoción mediante registro previo",
    ],
    address: "Calle Ramal de Monte Sancha, 28 · El Limonar, Málaga, Spain",
    complianceEn:
      "Confirm the fifth-floor designation, private outdoor layout, exact plan, area definitions, delivery, and availability in writing.",
    complianceEs:
      "Confirmar por escrito la quinta planta, distribución exterior privada, plano exacto, superficies, entrega y disponibilidad.",
    gallery: [
      {
        src: "/images/gilmar/be-grand-muelle-uno-c-garden.webp",
        altEn: "Be Grand El Limonar Muelle Uno C garden and private pool rendering",
        altEs: "Render de jardín y piscina privada en Be Grand El Limonar Muelle Uno C",
        captionEn: "Muelle Uno C garden & pool rendering · Match to confirm",
        captionEs: "Render jardín y piscina Muelle Uno C · Por confirmar",
      },
      {
        src: "/images/gilmar/be-grand-muelle-uno-c-living.webp",
        altEn: "Be Grand El Limonar Muelle Uno C living-room rendering",
        altEs: "Render del salón Muelle Uno C en Be Grand El Limonar",
        captionEn: "Living-room reference rendering · Match to confirm",
        captionEs: "Render salón de referencia · Por confirmar",
      },
      {
        src: "/images/gilmar/be-grand-development.webp",
        altEn: "Be Grand El Limonar exterior development rendering",
        altEs: "Render exterior de la promoción Be Grand El Limonar",
        captionEn: "Development exterior rendering · Not unit-specific",
        captionEs: "Render exterior de la promoción · No acredita vistas",
      },
      {
        src: "/images/gilmar/be-grand-shared-rooftop-sea.webp",
        altEn: "Be Grand El Limonar shared sea-view rooftop area",
        altEs: "Azotea común con vistas al mar en Be Grand El Limonar",
        captionEn: "Shared rooftop area · Common area",
        captionEs: "Azotea común · Zona común",
      },
    ],
  },
];

const IDX_MARKETS = [
  {
    key: "madrid",
    regionEn: "Madrid",
    regionEs: "Madrid",
    count: "1,061",
    areasEn: "Salamanca, Chamberí, La Moraleja, Pozuelo & Obra Nueva",
    areasEs: "Salamanca, Chamberí, La Moraleja, Pozuelo y Obra Nueva",
    image: "/images/madrid-gran-via-editorial.webp",
    altEn: "Madrid architectural streetscape — GILMAR portfolio",
    altEs: "Arquitectura de Madrid — Cartera de GILMAR",
  },
  {
    key: "costa-del-sol",
    regionEn: "Costa del Sol",
    regionEs: "Costa del Sol",
    count: "737",
    areasEn: "Marbella, Puerto Banús, Estepona, Benahavís & Málaga",
    areasEs: "Marbella, Puerto Banús, Estepona, Benahavís y Málaga",
    image: "/images/gilmar/balcon-residence.jpg",
    altEn: "Costa del Sol residential architecture — GILMAR portfolio",
    altEs: "Vivienda en Costa del Sol — Cartera de GILMAR",
  },
  {
    key: "canary-islands",
    regionEn: "Canary Islands",
    regionEs: "Islas Canarias",
    count: "201",
    areasEn: "Tenerife, Gran Canaria, Lanzarote & Fuerteventura",
    areasEs: "Tenerife, Gran Canaria, Lanzarote y Fuerteventura",
    image: "/images/gilmar/elysian.jpg",
    altEn: "Canary Islands coastal residences — GILMAR portfolio",
    altEs: "Residencial en Islas Canarias — Cartera de GILMAR",
  },
  {
    key: "seville-cadiz",
    regionEn: "Seville & Cádiz",
    regionEs: "Sevilla y Cádiz",
    count: "23+",
    areasEn: "Seville capital, Aljarafe, Sotogrande & Costa de la Luz",
    areasEs: "Sevilla capital, Aljarafe, Sotogrande y Costa de la Luz",
    image: "/images/gilmar/seville-plaza-de-espana.jpg",
    altEn: "Plaza de España, Seville — GILMAR portfolio across Seville and Cádiz",
    altEs: "Plaza de España, Sevilla — Cartera de GILMAR en Sevilla y Cádiz",
    credit: "Photo: Ludovic Delot · CC BY-SA 4.0",
  },
] as const;

const ADVISORY_PILLARS = [
  {
    num: "1.",
    titleEn: "Legal, Tax & Valuation Advisory",
    titleEs: "Asesoría Jurídica, Fiscal y Valoración",
    bodyEn:
      "In-house legal and tax department handling registry charge checks, contract review, notary coordination, tax guidance, and complimentary market valuations.",
    bodyEs:
      "Departamento jurídico y fiscal propio para verificación de cargas, contratos, coordinación notarial, orientación tributaria y valoración de mercado sin compromiso.",
    pointsEn: [
      "Registry title and lien verification",
      "Purchase contract review & notary coordination",
      "Non-resident tax & acquisition cost guidance",
    ],
    pointsEs: [
      "Verificación registral y de cargas",
      "Revisión contractual y coordinación notarial",
      "Orientación tributaria para no residentes",
    ],
  },
  {
    num: "2.",
    titleEn: "Mortgage Center · THIRSA · Capital Markets",
    titleEs: "Centro Hipotecario · THIRSA · Capital Markets",
    bodyEn:
      "Dedicated Centro Hipotecario comparing Spanish banks for resident and international buyers, official THIRSA appraisals (Bank of Spain–homologated), and Capital Markets advisory.",
    bodyEs:
      "Intermediación bancaria mediante Centro Hipotecario, tasaciones oficiales THIRSA (homologada por el Banco de España) y división Capital Markets para inversión.",
    pointsEn: [
      "Non-resident Spanish mortgage structuring",
      "Bank of Spain–homologated THIRSA appraisals",
      "Institutional & family-office Capital Markets desk",
    ],
    pointsEs: [
      "Hipotecas en España para compradores internacionales",
      "Tasaciones oficiales THIRSA homologadas por Banco de España",
      "División Capital Markets para patrimonio e inversión",
    ],
  },
  {
    num: "3.",
    titleEn: "Renovations & Interior Design",
    titleEs: "Reformas e Interiorismo · Soluciones Constructivas",
    bodyEn:
      "Comprehensive 360 service via Gilmar Soluciones Constructivas covering feasibility studies, licensing, architectural remodeling, interior design, and home staging.",
    bodyEs:
      "Servicio integral 360 mediante Gilmar Soluciones Constructivas: estudios técnicos, licencias, ejecución de reformas, interiorismo y home staging.",
    pointsEn: [
      "Technical feasibility studies & municipal licensing",
      "Turnkey architectural remodeling & interior design",
      "Asset positioning and editorial home staging",
    ],
    pointsEs: [
      "Estudios técnicos y tramitación de licencias",
      "Ejecución llave en mano de reformas e interiorismo",
      "Puesta en valor y home staging residencial",
    ],
  },
  {
    num: "4.",
    titleEn: "After-Sales & Closing Support",
    titleEs: "Servicio Posventa y Entrega en España",
    bodyEn:
      "Support before, during, and after deed signing including utility transfers, energy certificates, insurance, relocation logistics, and ongoing asset care.",
    bodyEs:
      "Acompañamiento antes, durante y después de la escritura: cambio de suministros, certificado energético, mudanzas, seguros y gestión patrimonial.",
    pointsEn: [
      "Utility activation, insurance & energy certificates",
      "Relocation logistics & keyholder coordination",
      "Continuity for international owners post-deed",
    ],
    pointsEs: [
      "Suministros, seguros y certificado energético",
      "Logística de mudanza y entrega de llaves",
      "Acompañamiento continuado tras la escritura",
    ],
  },
] as const;

function getFaqs(lang: Lang) {
  const es = lang === "es";
  return [
    {
      q: es ? "¿Cómo se determina el honorario de referencia?" : "How is the referral fee determined?",
      a: es
        ? "La estructura de honorarios varía según el producto (obra nueva, vivienda de segunda mano, activos de inversión o inmobiliario comercial) y el nivel de servicio. Cada caso tiene su propio honorario negociado, respetado por escrito tras la aprobación de GILMAR España y abonado al cierre a través de United Realty Group directamente a su brokerage."
        : "Compensation depends on the product category (new developments, resale residential, investment real estate, or commercial) and level of service. Each case carries its own negotiated fee, respected in writing once approved by GILMAR Spain and paid at closing through United Realty Group directly to your brokerage.",
    },
    {
      q: es ? "¿Por qué no se publican porcentajes de comisión en esta página?" : "Why are commission percentages not published openly on this page?",
      a: es
        ? "Las tarifas de cooperación entre agencias no se muestran al público ni a compradores finales para evitar solicitudes de descuento y preservar la negociación profesional. Las condiciones específicas de su operación se entregan por escrito tras registrar su licencia profesional y los datos iniciales del cliente."
        : "Brokerage-to-brokerage fee structures are kept private from public consumer traffic so end buyers do not request fee discounts and each transaction is structured properly. Written terms for your specific referral are issued after registering your license and client details.",
    },
    {
      q: es ? "¿Cómo accedo al catálogo de más de 2.000 propiedades en España?" : "How do I access the 2,000+ Spain property IDX portfolio?",
      a: es
        ? "Regístrese en el formulario inferior con su licencia profesional (o como comprador) indicando zona, tipo de activo y presupuesto. Nuestro equipo habilita el acceso guiado a la cartera de GILMAR en Madrid, Costa del Sol, Islas Canarias, Sevilla y Cádiz."
        : "Complete the registration form below with your real estate license (or as a buyer) noting your target region, asset class, and budget. Our desk enables guided access to GILMAR’s 2,000+ active properties across Madrid, Costa del Sol, the Canary Islands, Seville, and Cádiz.",
    },
    {
      q: es ? "¿Quién me paga y en qué momento?" : "Who pays my brokerage and when?",
      a: es
        ? "GILMAR abona la compensación acordada a United Realty Group en el cierre en España, y United Realty Group paga de brokerage a brokerage a su agencia conforme al acuerdo escrito aprobado."
        : "GILMAR pays the agreed compensation to United Realty Group at closing in Spain, and United Realty Group disburses payment directly to your brokerage under the approved written agreement.",
    },
    {
      q: es ? "¿Tiene Carlos Uzcategui licencia para ejercer en España?" : "Is Carlos Uzcategui licensed in Spain?",
      a: es
        ? "No. Carlos Uzcategui ejerce exclusivamente bajo su licencia de Florida (Sales Associate SL705771, United Realty Group). Las visitas, negociaciones y trámites locales en España son ejecutados por los equipos de GILMAR en España."
        : "No. Carlos Uzcategui operates solely under his Florida real estate license (Sales Associate SL705771, United Realty Group). All local viewings, negotiations, and closings in Spain are handled by GILMAR’s local Spanish teams.",
    },
  ];
}

function PropertyDetailModal({
  property,
  lang,
  onClose,
  onRegister,
}: {
  property: PropertyDetail;
  lang: Lang;
  onClose: () => void;
  onRegister: () => void;
}) {
  const es = lang === "es";
  const [activePhoto, setActivePhoto] = useState(0);
  const [unbrandedView, setUnbrandedView] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const currentPhoto = property.gallery[activePhoto] ?? property.gallery[0];
  const priceEurStr = `${formatEur(property.priceEur, lang)} ${es ? property.priceSuffixEs : property.priceSuffixEn}`.trim();
  const priceUsdStr = formatUsd(property.priceEur, lang);

  return (
    <div
      className="gilmar-editorial fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-[#282828]/80 px-4 py-8 backdrop-blur-sm sm:py-12"
      role="dialog"
      aria-modal="true"
      aria-label={property.name}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl border border-[#ddd8cc] bg-white text-[#282828] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={es ? "Cerrar" : "Close"}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-white/40 bg-[#2d2d2d]/85 text-white transition-colors hover:bg-[#817360]"
        >
          <X size={18} />
        </button>

        <div className="relative h-64 w-full overflow-hidden bg-[#2d2d2d] sm:h-80">
          <img
            src={currentPhoto.src}
            alt={es ? currentPhoto.altEs : currentPhoto.altEn}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#282828]/80 via-[#282828]/20 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 pr-12">
            <span className="bg-white/95 px-3 py-1 text-xs font-medium tracking-wider text-[#282828] uppercase">
              {es ? property.regionEs : property.regionEn}
            </span>
            <button
              type="button"
              onClick={() => setUnbrandedView((v) => !v)}
              className="border border-white/70 bg-[#2d2d2d]/85 px-3 py-1 text-xs font-medium tracking-wide text-white transition-colors hover:bg-[#817360]"
            >
              {unbrandedView
                ? es
                  ? "Vista con referencia agente"
                  : "Switch to Agent View"
                : es
                  ? "Vista sin marca para cliente"
                  : "Unbranded Client View"}
            </button>
          </div>
          <div className="absolute bottom-4 left-6 right-6">
            <p className="text-xs font-medium tracking-wider text-white/90 uppercase">
              {es ? property.locationEs : property.locationEn} · {es ? currentPhoto.captionEs : currentPhoto.captionEn}
            </p>
            <h3 className="g-serif mt-1 text-2xl font-medium text-white sm:text-3xl">{property.name}</h3>
          </div>
        </div>

        {property.gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b border-[#ddd8cc] bg-[#f8f7f1] px-6 py-3">
            {property.gallery.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActivePhoto(idx)}
                className={`h-14 w-24 shrink-0 overflow-hidden border transition-all ${
                  idx === activePhoto ? "border-[#817360] ring-2 ring-[#817360]/40" : "border-[#ddd8cc] opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={photo.src}
                  alt={es ? photo.altEs : photo.altEn}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[#ddd8cc] pb-5">
            <div>
              <p className="g-serif text-3xl font-semibold text-[#282828]">{priceEurStr}</p>
              <p className="mt-1 text-xs text-[#5b5b5f]">
                {es ? "Aprox." : "Approx."} {priceUsdStr} · {es ? property.priceNoteEs : property.priceNoteEn}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm font-medium text-[#282828]">
                {es ? property.unitLabelEs : property.unitLabelEn}
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#817360]">
                {es ? property.specsEs : property.specsEn}
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[#5b5b5f]">
            {es ? property.summaryEs : property.summaryEn}
          </p>

          <ul className="mt-5 space-y-2.5">
            {(es ? property.highlightsEs : property.highlightsEn).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#282828]">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#817360]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border border-[#ddd8cc] bg-[#f2f0e1]/65 p-4">
            <p className="text-xs font-medium tracking-wider text-[#817360] uppercase">
              {es ? "Ubicación y verificación" : "Location & confirmation status"}
            </p>
            <p className="mt-1 text-xs font-medium text-[#282828]">{property.address}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#5b5b5f]">
              {es ? property.complianceEs : property.complianceEn}
            </p>
            {!unbrandedView && (
              <p className="mt-2 border-t border-[#c6b296]/60 pt-2 text-xs leading-relaxed text-[#282828]">
                {es
                  ? "Honorario de referencia negociado según activo y nivel de servicio, respetado por escrito tras aprobación de GILMAR España y pagado a su brokerage vía United Realty Group."
                  : "Negotiated referral fee varies by asset class and level of service, respected in writing upon GILMAR Spain approval, and paid through United Realty Group to your brokerage."}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onRegister();
              }}
              className="g-btn-charcoal flex-1"
            >
              {unbrandedView
                ? es
                  ? "Solicitar dossier completo"
                  : "Request full property brief"
                : es
                  ? "Registrar cliente para esta propiedad"
                  : "Register a client for this residence"}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GilmarSpainPage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "es") return "es";
    if (param === "en") return "en";
    try {
      return window.localStorage.getItem("gd-lang") === "es" ? "es" : "en";
    } catch {
      return "en";
    }
  });
  const [viewMode, setViewMode] = useState<"cards" | "compare">("cards");
  const [currencyMode, setCurrencyMode] = useState<"eur" | "usd">("eur");
  const [areaMode, setAreaMode] = useState<"sqm" | "sqft">("sqm");
  const [activeMarketKey, setActiveMarketKey] = useState<string>("madrid");
  const [pipelineMode, setPipelineMode] = useState<"buyer_agency" | "referral">("buyer_agency");
  const [activePipelineNode, setActivePipelineNode] = useState<number>(0);
  const [intakeTab, setIntakeTab] = useState<"agent" | "buyer">("agent");
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetail | null>(null);

  useEffect(() => {
    if (typeof document === "undefined" || navigator.webdriver) return;
    if (document.getElementById("gilmar-fonts-css")) return;
    const link = document.createElement("link");
    link.id = "gilmar-fonts-css";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  const es = lang === "es";
  const faqs = getFaqs(lang);
  const selectedMarket = IDX_MARKETS.find((m) => m.key === activeMarketKey) ?? IDX_MARKETS[0];

  const pipelineNodes = [
    {
      step: "1.",
      code: "01",
      titleEn: "Florida Agent Registration (GD-Ref)",
      titleEs: "Registro en Florida (GD-Ref)",
      buyerAgencyEn: "Submit your Florida license, brokerage details, and client initials to issue your GD-Ref prior to introduction.",
      buyerAgencyEs: "Envíe licencia de Florida, brokerage e iniciales para emitir su GD-Ref antes de la presentación.",
      referralEn: "Register license and buyer criteria prior to any introduction to protect your client relationship.",
      referralEs: "Registre licencia y criterios del comprador antes de presentar al cliente para proteger la relación.",
    },
    {
      step: "2.",
      code: "02",
      titleEn: "Written Fee Agreement & GILMAR Approval",
      titleEs: "Acuerdo Escrito y Aprobación GILMAR",
      buyerAgencyEn: "Receive case-by-case written buyer-agency cooperation terms approved by GILMAR Spain and your brokerage.",
      buyerAgencyEs: "Reciba condiciones escritas de agencia de comprador aprobadas por GILMAR España y su brokerage.",
      referralEn: "Each referral receives an asset-specific negotiated fee documented in writing upon GILMAR Spain approval.",
      referralEs: "Cada referido recibe un honorario negociado por activo documentado por escrito tras aprobación de GILMAR.",
    },
    {
      step: "3.",
      code: "03",
      titleEn: "GILMAR Local Execution (36 Teams)",
      titleEs: "Ejecución Local GILMAR (36 Equipos)",
      buyerAgencyEn: "GILMAR runs showings, Centro Hipotecario financing, legal, and tax coordination while you represent the buyer.",
      buyerAgencyEs: "GILMAR gestiona visitas, Centro Hipotecario y asesoría jurídica/fiscal mientras usted representa al comprador.",
      referralEn: "United Realty Group and GILMAR manage local viewings, advisory, and negotiation in 10 languages.",
      referralEs: "United Realty Group y GILMAR gestionan visitas, asesoría y negociación en 10 idiomas.",
    },
    {
      step: "4.",
      code: "04",
      titleEn: "Spanish Notary & Closing",
      titleEs: "Notaría y Cierre en España",
      buyerAgencyEn: "Deed execution before a Spanish notary supported by registry checks and post-closing administration.",
      buyerAgencyEs: "Escritura pública ante notario en España con verificación registral y administración posventa.",
      referralEn: "Closing supervised through deed signing with full registry and tax compliance verification.",
      referralEs: "Cierre supervisado hasta escritura pública con verificación registral y fiscal.",
    },
    {
      step: "5.",
      code: "05",
      titleEn: "Broker Payout via United Realty Group",
      titleEs: "Pago vía United Realty Group",
      buyerAgencyEn: "At closing, GILMAR remits to United Realty Group and URG pays broker to broker to your brokerage.",
      buyerAgencyEs: "Al cierre, GILMAR liquida a United Realty Group y URG abona de brokerage a brokerage a su agencia.",
      referralEn: "At closing, United Realty Group disburses the agreed referral commission directly to your brokerage.",
      referralEs: "Al cierre, United Realty Group abona el honorario de referencia directamente a su brokerage.",
    },
  ] as const;

  const activeNode = pipelineNodes[activePipelineNode] ?? pipelineNodes[0];

  const toggleLanguage = (next: Lang) => {
    setLang(next);
    try {
      window.localStorage.setItem("gd-lang", next);
    } catch {
      // Ignore storage failures in restricted contexts
    }
  };

  const jumpToRegister = (tab: "agent" | "buyer") => {
    setIntakeTab(tab);
    const el = document.getElementById("register-desk");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>
          {es
            ? "GILMAR × URG España | Carlos Uzcategui"
            : "GILMAR × URG Spain Desk | Carlos Uzcategui"}
        </title>
        <meta
          name="description"
          content={
            es
              ? "Cartera de más de 2.000 propiedades en España con GILMAR Consulting Inmobiliario y honorarios de referencia negociados por escrito vía United Realty Group."
              : "Browse 2,000+ properties across Spain with GILMAR Consulting Inmobiliario through registration, backed by written negotiated referral agreements via United Realty Group."
          }
        />
        <link rel="canonical" href="https://homesprofessional.com/gilmar-spain" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/gilmar-spain" />
        <meta
          property="og:title"
          content="GILMAR × URG Spain Desk | Carlos Uzcategui, REALTOR®"
        />
        <meta
          property="og:description"
          content="Bilateral Spain–South Florida portal connecting licensed agents and buyers to 2,000+ Spanish properties with written negotiated referral agreements."
        />
        <meta
          property="og:image"
          content="https://homesprofessional.com/images/gilmar/balcon-residence.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://homesprofessional.com/images/gilmar/balcon-residence.jpg"
        />
      </Helmet>

      <JsonLd
        id="gilmar-spain-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://homesprofessional.com/" },
            { "@type": "ListItem", position: 2, name: "Global Desk", item: "https://homesprofessional.com/global-desk" },
            { "@type": "ListItem", position: 3, name: "GILMAR Spain Desk", item: "https://homesprofessional.com/gilmar-spain" },
          ],
        }}
      />

      <JsonLd
        id="gilmar-spain-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />

      <main id="main-content" className="gilmar-editorial min-h-screen pb-28 lg:pb-0">
        <Navbar />

        {/* ── 1. Full-Bleed Sunlit Architectural Hero (gilmar.es/vender/ cadence) ── */}
        <section
          data-sticky-cta-guard
          className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden bg-[#2d2d2d] pt-24 pb-10 text-white md:min-h-screen md:pt-28 md:pb-12"
          aria-labelledby="gilmar-spain-h1"
        >
          <img
            src="/images/gilmar/balcon-residence.jpg"
            alt={es ? "Balcón del Mediterráneo — Salón con vistas al mar en España" : "Balcón del Mediterráneo — Sunlit Mediterranean interior in Spain"}
            width="1920"
            height="1080"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Balanced neutral charcoal veil — keeps the interior luminous while ensuring crisp white headline contrast */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2d2d2d]/72 via-[#2d2d2d]/42 to-[#2d2d2d]/68" />

          {/* Top Co-Branding & Single Language Switcher Bar (zero white box — transparent pro lockup) */}
          <div className="relative z-10 mx-auto w-full max-w-[1170px] px-6">
            <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/30 pb-5">
              <div className="inline-flex items-center gap-5 sm:gap-7">
                <img
                  src="/images/gilmar/gilmar-logo-trimmed.png"
                  alt="GILMAR Consulting Inmobiliario"
                  width="2367"
                  height="644"
                  className="h-8 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:h-10"
                />
                <span className="h-7 w-[1px] bg-white/45 sm:h-8" aria-hidden="true" />
                <img
                  src="/images/gilmar/urg-logo-pro.png"
                  alt="United Realty Group"
                  width="1024"
                  height="331"
                  className="h-8 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)] sm:h-10"
                />
              </div>

              <div
                className="inline-flex items-center gap-1 rounded-[3px] border border-white/40 bg-[#2d2d2d]/55 p-1 backdrop-blur-sm"
                role="group"
                aria-label={es ? "Idioma de la página" : "Page language"}
              >
                {(["en", "es"] as Lang[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleLanguage(option)}
                    aria-pressed={lang === option}
                    className={`rounded-[2px] px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                      lang === option
                        ? "bg-[#817360] text-white"
                        : "text-white/85 hover:text-white"
                    }`}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Centered Editorial Hero Headline & Restrained CTAs */}
          <div className="relative z-10 mx-auto my-auto w-full max-w-[920px] px-6 py-12 text-center md:py-16">
            <p className="text-xs font-medium tracking-[0.22em] text-white/90 uppercase">
              {es
                ? "GILMAR ESPAÑA × UNITED REALTY GROUP · DESK BILATERAL"
                : "GILMAR SPAIN × UNITED REALTY GROUP · BILATERAL DESK"}
            </p>
            <h1
              id="gilmar-spain-h1"
              className="g-serif mt-4 text-4xl font-medium leading-[1.12] text-white drop-shadow-sm sm:text-5xl md:text-6xl"
            >
              {es
                ? "Su comprador quiere España. Conserve la relación y el honorario."
                : "Your buyer wants Spain. Keep the relationship and the commission."}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/95 md:text-lg">
              {es
                ? "La tranquilidad y seguridad de acompañar a su cliente en más de 2.000 propiedades activas en España, con honorarios negociados por escrito y respaldo local de GILMAR desde 1983."
                : "Established in 1983 with 36 commercial teams and service in 10 languages, GILMAR connects your clients to 2,000+ active properties across Spain under written brokerage cooperation."}
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => jumpToRegister("agent")}
                className="g-btn-hero-ghost"
              >
                {es ? "Registrar licencia y cliente" : "Register License & Client"}
                <ArrowRight size={15} />
              </button>
              <a
                href="#spain-idx"
                className="g-btn-taupe"
              >
                <Lock size={14} />
                {es ? "Explorar 2.000+ propiedades IDX" : "Browse 2,000+ Spain IDX"}
              </a>
            </div>
          </div>

          {/* Bottom Hairline Trust Strip */}
          <div className="relative z-10 mx-auto w-full max-w-[1170px] px-6">
            <div className="grid gap-3 border-t border-white/30 pt-5 text-xs text-white/90 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <Scale size={15} className="shrink-0 text-[#f2f0e1]" />
                <span>
                  {es
                    ? "Honorarios negociados por tipo de activo"
                    : "Negotiated referral fees by asset class"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={15} className="shrink-0 text-[#f2f0e1]" />
                <span>
                  {es
                    ? "Aprobación y acuerdo escrito de GILMAR España"
                    : "Written agreement approved by GILMAR Spain"}
                </span>
              </div>
              <div className="flex items-center justify-center gap-2 sm:justify-end">
                <Building2 size={15} className="shrink-0 text-[#f2f0e1]" />
                <span>
                  {es
                    ? "Pago vía United Realty Group a su brokerage"
                    : "Paid via United Realty Group to your brokerage"}
                </span>
              </div>
            </div>
            <p className="mt-3 text-right text-[11px] text-white/65">
              {es
                ? "Visualización de promoción · Balcón del Mediterráneo, Estepona"
                : "Project visualization · Balcón del Mediterráneo, Estepona"}
            </p>
          </div>
        </section>

        {/* ── 2. Editorial Intro & Heritage Split (gilmar.es/vender/ Section 5 rhythm) ── */}
        <section className="bg-white py-16 md:py-24" aria-labelledby="heritage-heading">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="g-eyebrow">
                {es
                  ? "GILMAR CONSULTING INMOBILIARIO · DESDE 1983"
                  : "GILMAR CONSULTING INMOBILIARIO · SINCE 1983"}
              </p>
              <h2 id="heritage-heading" className="g-serif mt-3 text-3xl font-medium text-[#282828] md:text-5xl">
                {es
                  ? "¿Por qué acompañar a su cliente en España con GILMAR?"
                  : "Why serve your Spain-bound buyer through GILMAR?"}
              </h2>
              <div className="mx-auto mt-5 h-[1px] w-16 bg-[#c6b296]" />
            </div>

            {/* Two-column editorial narrative with Gilmar's signature vertical hairline divider */}
            <div className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-4 text-[15px] leading-7 text-[#5b5b5f]">
                <p>
                  {es
                    ? "GILMAR lidera la consultoría inmobiliaria residencial en las principales zonas de Madrid, Costa del Sol, costa de Cádiz, Sevilla e Islas Canarias, con 36 equipos comerciales especializados y atención en 10 idiomas."
                    : "GILMAR operates across Spain’s prime residential markets—Madrid, Costa del Sol, Málaga, Seville, Cádiz, and the Canary Islands—through 36 specialized commercial teams serving clients in 10 languages."}
                </p>
                <p>
                  {es
                    ? "A través del escritorio bilateral con United Realty Group en Florida, cada agente conserva su relación profesional con el comprador mientras los equipos locales en España ejecutan visitas, verificación registral y firma ante notario."
                    : "Through the bilateral desk with United Realty Group in Florida, originating professionals retain their client relationship while GILMAR’s local Spanish teams execute tours, legal review, financing, and closing."}
                </p>
              </div>
              <div className="g-split-divider space-y-6">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-2">
                  <div>
                    <p className="g-serif text-4xl font-medium text-[#282828]">1983</p>
                    <p className="mt-1 text-xs tracking-wider text-[#817360] uppercase">
                      {es ? "Año de fundación" : "Year Founded"}
                    </p>
                  </div>
                  <div>
                    <p className="g-serif text-4xl font-medium text-[#282828]">36</p>
                    <p className="mt-1 text-xs tracking-wider text-[#817360] uppercase">
                      {es ? "Equipos comerciales" : "Commercial Teams"}
                    </p>
                  </div>
                  <div>
                    <p className="g-serif text-4xl font-medium text-[#282828]">10</p>
                    <p className="mt-1 text-xs tracking-wider text-[#817360] uppercase">
                      {es ? "Idiomas de atención" : "Languages Served"}
                    </p>
                  </div>
                  <div>
                    <p className="g-serif text-4xl font-medium text-[#282828]">2,000+</p>
                    <p className="mt-1 text-xs tracking-wider text-[#817360] uppercase">
                      {es ? "Propiedades activas" : "Active Listings"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean inline placement for the Miami Desk AI concierge on light canvas */}
            <div className="mt-10 border-t border-[#e8e3da] pt-6">
              <HouseBotHero variant="globalDesk" lang={lang} tone="light" className="justify-center" />
            </div>
          </div>
        </section>

        {/* ── 3. Numbered 1.–4. Integral Advisory Spread (gilmar.es/vender/ numbered editorial rows) ── */}
        <section className="border-t border-[#ece7dc] bg-white py-16 md:py-24" aria-labelledby="advisory-heading">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="g-eyebrow">
                {es ? "SERVICIOS INTEGRALES 360" : "INTEGRAL 360 ADVISORY"}
              </p>
              <h2 id="advisory-heading" className="g-serif mt-3 text-3xl font-medium text-[#282828] md:text-5xl">
                {es
                  ? "Una operación completa en España, paso a paso."
                  : "A complete purchase in Spain, supported end to end."}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#5b5b5f]">
                {es
                  ? "Cuatro divisiones especializadas dentro de GILMAR cubren cada etapa técnica, financiera y jurídica de la compra para su cliente."
                  : "Four specialized in-house divisions within GILMAR handle every legal, financing, renovation, and closing detail for your buyer."}
              </p>
            </div>

            <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {ADVISORY_PILLARS.map((pillar) => (
                <article
                  key={pillar.titleEn}
                  className="border-t border-[#c6b296] pt-7"
                >
                  <h3 className="g-serif text-2xl font-medium text-[#282828] sm:text-3xl">
                    <span className="g-num mr-2">{pillar.num}</span>
                    {es ? pillar.titleEs : pillar.titleEn}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#5b5b5f]">
                    {es ? pillar.bodyEs : pillar.bodyEn}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {(es ? pillar.pointsEs : pillar.pointsEn).map((point) => (
                      <li key={point} className="g-serif flex items-start gap-3 text-[17px] leading-snug text-[#282828]">
                        <Check size={16} className="mt-1 shrink-0 text-[#817360]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Three Selected Residences (Warm #F2F0E1 Gilmar Cream Canvas) ── */}
        <section id="featured-residences" className="bg-[#f2f0e1] py-16 md:py-24" aria-labelledby="residences-heading">
          <div className="mx-auto max-w-[1170px] px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="g-eyebrow">
                  {es ? "PROMOCIONES SELECCIONADAS DE GILMAR" : "SELECTED GILMAR DEVELOPMENTS"}
                </p>
                <h2 id="residences-heading" className="g-serif mt-3 text-3xl font-medium text-[#282828] md:text-5xl">
                  {es ? "Tres residencias representativas para iniciar." : "Three selected residences to begin the conversation."}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[#5b5b5f]">
                  {es
                    ? "Cada vivienda mostrada representa una selección en promociones activas; puede registrar interés en cualquier unidad disponible."
                    : "Each residence shown is one selected example; you may register client interest on any available unit in the development."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex border border-[#c6b296] bg-white p-0.5" role="group" aria-label={es ? "Divisa" : "Currency"}>
                  <button
                    type="button"
                    aria-pressed={currencyMode === "eur"}
                    onClick={() => setCurrencyMode("eur")}
                    className={`px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                      currencyMode === "eur" ? "bg-[#2d2d2d] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                    }`}
                  >
                    EUR (€)
                  </button>
                  <button
                    type="button"
                    aria-pressed={currencyMode === "usd"}
                    onClick={() => setCurrencyMode("usd")}
                    className={`px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                      currencyMode === "usd" ? "bg-[#2d2d2d] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                    }`}
                  >
                    {es ? "USD ($ · BCE)" : "USD ($ · ECB)"}
                  </button>
                </div>

                <div className="inline-flex border border-[#c6b296] bg-white p-0.5" role="group" aria-label={es ? "Superficie" : "Area"}>
                  <button
                    type="button"
                    aria-pressed={areaMode === "sqm"}
                    onClick={() => setAreaMode("sqm")}
                    className={`px-3 py-1.5 text-xs font-medium tracking-wider transition-colors ${
                      areaMode === "sqm" ? "bg-[#2d2d2d] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                    }`}
                  >
                    m²
                  </button>
                  <button
                    type="button"
                    aria-pressed={areaMode === "sqft"}
                    onClick={() => setAreaMode("sqft")}
                    className={`px-3 py-1.5 text-xs font-medium tracking-wider transition-colors ${
                      areaMode === "sqft" ? "bg-[#2d2d2d] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                    }`}
                  >
                    ft²
                  </button>
                </div>

                <div className="inline-flex shrink-0 border border-[#c6b296] bg-white p-0.5" role="group" aria-label="View mode">
                  <button
                    type="button"
                    aria-pressed={viewMode === "cards"}
                    onClick={() => setViewMode("cards")}
                    className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                      viewMode === "cards" ? "bg-[#817360] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                    }`}
                  >
                    {es ? "Tarjetas" : "Cards"}
                  </button>
                  <button
                    type="button"
                    aria-pressed={viewMode === "compare"}
                    onClick={() => setViewMode("compare")}
                    className={`px-4 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors ${
                      viewMode === "compare" ? "bg-[#817360] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                    }`}
                  >
                    {es ? "Comparar las tres" : "Compare Three"}
                  </button>
                </div>
              </div>
            </div>

            {viewMode === "cards" ? (
              <div className="mt-10 grid gap-7 md:grid-cols-3">
                {DEVELOPMENTS.map((prop) => {
                  const primaryPhoto = prop.gallery[0];
                  const priceEur = `${formatEur(prop.priceEur, lang)} ${es ? prop.priceSuffixEs : prop.priceSuffixEn}`.trim();
                  const priceUsd = formatUsd(prop.priceEur, lang);
                  const primaryPrice = currencyMode === "usd" ? `${priceUsd} (${es ? "aprox." : "approx."})` : priceEur;
                  const secondaryPrice = currencyMode === "usd" ? priceEur : `${es ? "Aprox." : "Approx."} ${priceUsd}`;
                  const builtVal = areaMode === "sqft" ? `${prop.builtSqft.toLocaleString()} ft²` : `${prop.builtSqm} m²`;
                  const outVal = areaMode === "sqft" ? `${prop.outdoorSqft.toLocaleString()} ft²` : `${prop.outdoorSqm} m²`;

                  return (
                    <article
                      key={prop.slug}
                      className="flex h-full flex-col overflow-hidden border border-[#ddd8cc] bg-white transition-shadow duration-300 hover:shadow-lg"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(prop)}
                        className="group relative h-60 w-full overflow-hidden bg-[#2d2d2d] text-left"
                      >
                        <img
                          src={primaryPhoto.src}
                          alt={es ? primaryPhoto.altEs : primaryPhoto.altEn}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#282828]/70 via-transparent to-transparent" />
                        <span className="absolute bottom-3 left-4 right-4 text-xs font-medium tracking-[0.14em] text-white uppercase">
                          {es ? prop.locationEs : prop.locationEn}
                        </span>
                      </button>

                      <div className="flex flex-1 flex-col justify-between p-6">
                        <div>
                          {/* Non-overlapping structured region + tax metadata row */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ece7dc] pb-3">
                            <span className="text-[11px] font-medium tracking-[0.14em] text-[#817360] uppercase">
                              {prop.code} · {es ? prop.regionEs : prop.regionEn}
                            </span>
                            <span className="bg-[#f2f0e1] px-2 py-0.5 text-[11px] font-medium text-[#5b5b5f]">
                              {es ? prop.taxBadgeEs : prop.taxBadgeEn}
                            </span>
                          </div>

                          <h3 className="g-serif mt-4 text-2xl font-medium text-[#282828]">{prop.name}</h3>
                          <p className="mt-1 text-xs text-[#5b5b5f]">
                            {es ? prop.unitLabelEs : prop.unitLabelEn}
                          </p>

                          <p className="g-serif mt-4 text-3xl font-semibold text-[#282828]">{primaryPrice}</p>
                          <p className="mt-0.5 text-xs text-[#87868a]">
                            {secondaryPrice} · {es ? prop.priceNoteEs : prop.priceNoteEn}
                          </p>

                          <div className="mt-4 grid grid-cols-2 gap-3 border-y border-[#ece7dc] py-3">
                            <div>
                              <span className="block text-[11px] tracking-wider text-[#87868a] uppercase">
                                {es ? "Construidos" : "Built"}
                              </span>
                              <span className="g-serif text-lg font-medium text-[#282828]">{builtVal}</span>
                            </div>
                            <div className="border-l border-[#ece7dc] pl-3">
                              <span className="block text-[11px] tracking-wider text-[#87868a] uppercase">
                                {es ? "Exterior" : "Outdoor"}
                              </span>
                              <span className="g-serif text-lg font-medium text-[#282828]">{outVal}</span>
                            </div>
                          </div>

                          <p className="mt-4 text-sm leading-relaxed text-[#5b5b5f]">
                            {es ? prop.summaryEs : prop.summaryEn}
                          </p>
                        </div>

                        <div className="mt-6 space-y-3 border-t border-[#ece7dc] pt-4">
                          <p className="text-xs font-medium text-[#282828]">
                            {es ? prop.specsEs : prop.specsEn}
                          </p>
                          <div className="flex flex-col gap-2.5 xl:flex-row">
                            <button
                              type="button"
                              onClick={() => setSelectedProperty(prop)}
                              className="g-btn-outline min-w-0 flex-1 px-3 py-2.5 text-center text-xs"
                            >
                              {es ? "Galería y Dossier" : "Gallery & Brief"}
                            </button>
                            <button
                              type="button"
                              onClick={() => jumpToRegister("agent")}
                              className="g-btn-taupe min-w-0 flex-1 px-3 py-2.5 text-center text-xs"
                            >
                              {es ? "Registrar Cliente" : "Register Client"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-10 space-y-6">
                <div className="grid gap-5 md:grid-cols-3">
                  {DEVELOPMENTS.map((prop) => {
                    const priceRatio = Math.min(1, prop.priceEur / 2100000);
                    const areaRatio = Math.min(1, prop.builtSqm / 220);
                    const outRatio = Math.min(1, prop.outdoorSqm / 200);
                    const priceDisp =
                      currencyMode === "usd"
                        ? formatUsd(prop.priceEur, lang)
                        : `${formatEur(prop.priceEur, lang)} ${es ? prop.priceSuffixEs : prop.priceSuffixEn}`.trim();
                    const builtDisp = areaMode === "sqft" ? `${prop.builtSqft.toLocaleString()} ft²` : `${prop.builtSqm} m²`;
                    const outDisp = areaMode === "sqft" ? `${prop.outdoorSqft.toLocaleString()} ft²` : `${prop.outdoorSqm} m²`;

                    return (
                      <div key={prop.slug} className="border border-[#ddd8cc] bg-white p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="g-serif text-2xl font-medium text-[#282828]">{prop.name}</h3>
                            <p className="text-xs tracking-wider text-[#817360] uppercase">
                              {es ? prop.locationEs : prop.locationEn}
                            </p>
                          </div>
                          <span className="bg-[#f2f0e1] px-2.5 py-0.5 text-[11px] text-[#5b5b5f]">
                            {es ? prop.taxBadgeEs : prop.taxBadgeEn}
                          </span>
                        </div>

                        <div className="mt-5 space-y-3.5 text-xs">
                          <div>
                            <div className="flex justify-between font-medium text-[#282828]">
                              <span>{es ? "Precio" : "Price"}</span>
                              <span>{priceDisp}</span>
                            </div>
                            <div className="mt-1.5 h-1.5 bg-[#ece7dc]">
                              <div className="h-full origin-left bg-[#817360]" style={{ transform: `scaleX(${priceRatio.toFixed(2)})` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between font-medium text-[#282828]">
                              <span>{es ? "Superficie construida" : "Built Area"}</span>
                              <span>{builtDisp}</span>
                            </div>
                            <div className="mt-1.5 h-1.5 bg-[#ece7dc]">
                              <div className="h-full origin-left bg-[#2d2d2d]" style={{ transform: `scaleX(${areaRatio.toFixed(2)})` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between font-medium text-[#282828]">
                              <span>{es ? "Exterior / Terraza" : "Outdoor Area"}</span>
                              <span>{outDisp}</span>
                            </div>
                            <div className="mt-1.5 h-1.5 bg-[#ece7dc]">
                              <div className="h-full origin-left bg-[#c6b296]" style={{ transform: `scaleX(${outRatio.toFixed(2)})` }} />
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedProperty(prop)}
                            className="g-btn-outline flex-1 px-3 py-2 text-xs"
                          >
                            {es ? "Dossier" : "Brief"}
                          </button>
                          <button
                            type="button"
                            onClick={() => jumpToRegister("agent")}
                            className="g-btn-taupe flex-1 px-3 py-2 text-xs"
                          >
                            {es ? "Registrar" : "Register"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="overflow-x-auto border border-[#ddd8cc] bg-white">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead className="bg-[#2d2d2d] text-xs font-medium tracking-wider text-white uppercase">
                      <tr>
                        <th className="p-4">{es ? "Promoción" : "Development"}</th>
                        <th className="p-4">{es ? "Ubicación" : "Location"}</th>
                        <th className="p-4">{es ? "Precio" : "Quoted Price"}</th>
                        <th className="p-4">{es ? "Especificaciones" : "Specifications"}</th>
                        <th className="p-4">{es ? "Acción" : "Action"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ece7dc]">
                      {DEVELOPMENTS.map((prop) => {
                        const priceEur = `${formatEur(prop.priceEur, lang)} ${es ? prop.priceSuffixEs : prop.priceSuffixEn}`.trim();
                        const priceUsd = formatUsd(prop.priceEur, lang);
                        const primaryPrice = currencyMode === "usd" ? `${priceUsd} (${es ? "aprox." : "approx."})` : priceEur;
                        const secondaryPrice = currencyMode === "usd" ? priceEur : `${es ? "Aprox." : "Approx."} ${priceUsd}`;
                        const builtDisp = areaMode === "sqft" ? `${prop.builtSqft.toLocaleString()} ft²` : `${prop.builtSqm} m²`;
                        const outDisp = areaMode === "sqft" ? `${prop.outdoorSqft.toLocaleString()} ft²` : `${prop.outdoorSqm} m²`;
                        return (
                          <tr key={prop.slug} className="hover:bg-[#f8f7f1]">
                            <td className="p-4">
                              <p className="g-serif text-xl font-medium text-[#282828]">{prop.name}</p>
                              <p className="text-xs text-[#5b5b5f]">{es ? prop.unitLabelEs : prop.unitLabelEn}</p>
                            </td>
                            <td className="p-4 text-xs text-[#5b5b5f]">
                              {es ? prop.locationEs : prop.locationEn}
                            </td>
                            <td className="p-4">
                              <p className="font-medium text-[#282828]">{primaryPrice}</p>
                              <p className="text-xs text-[#87868a]">{secondaryPrice}</p>
                            </td>
                            <td className="p-4 text-xs text-[#5b5b5f]">
                              <p className="text-[#282828]">
                                {es ? "Construidos" : "Built"}: {builtDisp} · {es ? "Exterior" : "Outdoor"}: {outDisp}
                              </p>
                              <p className="mt-0.5">{es ? prop.specsEs : prop.specsEn}</p>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedProperty(prop)}
                                  className="g-btn-outline px-3 py-1.5 text-xs"
                                >
                                  {es ? "Ver" : "View"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => jumpToRegister("agent")}
                                  className="g-btn-taupe px-3 py-1.5 text-xs"
                                >
                                  {es ? "Registrar" : "Register"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <details className="mt-7 border border-[#ddd8cc] bg-white px-5 py-3.5 text-xs leading-relaxed text-[#5b5b5f]">
              <summary className="cursor-pointer font-medium tracking-wider text-[#282828] uppercase">
                {es ? "Fuente de unidades y notas de conversión BCE" : "Unit source & ECB FX reference disclosures"}
              </summary>
              <p className="mt-2.5">
                {es
                  ? "Fuente de unidades: GILMAR (noviembre de 2026). Disponibilidad, precios, impuestos, entregas y planos requieren confirmación escrita vigente. Conversión aproximada a tipo de referencia BCE (1 EUR = 1,1052 USD, 13 nov. 2026). No se representa ninguna publicación MLS activa."
                  : "Unit source: GILMAR (reviewed Nov 2026). Availability, prices, taxes, delivery, and exact plans require current written confirmation. USD conversion approximate at ECB reference rate (1 EUR = 1.1052 USD, Nov 13, 2026). No active MLS listing is represented."}
              </p>
            </details>
          </div>
        </section>

        {/* ── 5. Registration-Gated 2,000+ Spain IDX Portfolio (Clean White Editorial Canvas) ── */}
        <section id="spain-idx" className="scroll-mt-24 bg-white py-16 md:py-24" aria-labelledby="idx-heading">
          <div className="mx-auto max-w-[1170px] px-6">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="g-eyebrow inline-flex items-center gap-2">
                  <Lock size={13} />
                  <span>
                    {es
                      ? "CATÁLOGO IDX PRIVADO · MÁS DE 2.000 PROPIEDADES EN ESPAÑA"
                      : "REGISTERED IDX ACCESS · 2,000+ ACTIVE PROPERTIES IN SPAIN"}
                  </span>
                </div>
                <h2 id="idx-heading" className="g-serif mt-3 text-3xl font-medium text-[#282828] md:text-5xl">
                  {es
                    ? "Explore más de 2.000 propiedades en España mediante registro."
                    : "Browse 2,000+ properties across Spain through registration."}
                </h2>

                <div className="mt-6 flex flex-wrap gap-2">
                  {IDX_MARKETS.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setActiveMarketKey(m.key)}
                      aria-pressed={m.key === activeMarketKey}
                      className={`border px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors ${
                        m.key === activeMarketKey
                          ? "border-[#817360] bg-[#817360] text-white"
                          : "border-[#ddd8cc] bg-white text-[#5b5b5f] hover:border-[#817360] hover:text-[#282828]"
                      }`}
                    >
                      {es ? m.regionEs : m.regionEn} · {m.count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-l-2 border-[#817360] bg-[#f2f0e1] p-6 lg:col-span-5">
                <p className="text-xs font-medium tracking-[0.16em] text-[#817360] uppercase">
                  {es ? selectedMarket.regionEs : selectedMarket.regionEn}
                </p>
                <p className="g-serif mt-1 text-4xl font-medium text-[#282828]">{selectedMarket.count}</p>
                <p className="mt-1.5 text-sm text-[#5b5b5f]">
                  {es ? selectedMarket.areasEs : selectedMarket.areasEn}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {IDX_MARKETS.map((market) => {
                const isSelected = market.key === activeMarketKey;
                return (
                  <div
                    key={market.key}
                    onMouseEnter={() => setActiveMarketKey(market.key)}
                    className={`flex h-full flex-col overflow-hidden border bg-white transition-all duration-300 ${
                      isSelected
                        ? "border-[#817360] shadow-md"
                        : "border-[#ddd8cc] hover:border-[#c6b296]"
                    }`}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-[#f2f0e1]">
                      <img
                        src={market.image}
                        alt={es ? market.altEs : market.altEn}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      {"credit" in market && (
                        <span className="pointer-events-none absolute right-1.5 bottom-1 text-[9px] tracking-wide text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
                          {market.credit}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <p className="text-[11px] font-medium tracking-[0.16em] text-[#817360] uppercase">
                          {es ? market.regionEs : market.regionEn}
                        </p>
                        <p className="g-serif mt-1 text-3xl font-medium text-[#282828]">{market.count}</p>
                        <p className="mt-2 text-xs leading-relaxed text-[#5b5b5f]">
                          {es ? market.areasEs : market.areasEn}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => jumpToRegister("agent")}
                        className="mt-5 inline-flex items-center gap-1.5 border-t border-[#ece7dc] pt-3 text-xs font-medium tracking-wider text-[#282828] uppercase transition-colors hover:text-[#817360]"
                      >
                        {es ? "Registrar para ver IDX" : "Register to browse"}
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => jumpToRegister("agent")}
                className="g-btn-charcoal"
              >
                {es ? "Registro de Agente (Licencia)" : "Agent Registration (License Required)"}
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => jumpToRegister("buyer")}
                className="g-btn-outline"
              >
                {es ? "Registro de Comprador para IDX" : "Buyer IDX Registration"}
              </button>
            </div>
          </div>
        </section>

        {/* ── 6. Interactive 5-Stage Cooperation Protocol (Numbered Editorial Rhythm) ── */}
        <section className="border-t border-[#ece7dc] bg-[#f8f7f1] py-16 md:py-24" aria-labelledby="coop-heading">
          <div className="mx-auto max-w-[1170px] px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="g-eyebrow">
                  {es
                    ? "COOPERACIÓN ENTRE BROKERAGES · ACUERDOS POR OPERACIÓN"
                    : "BROKERAGE-TO-BROKERAGE COOPERATION · WRITTEN REFERRAL AGREEMENTS"}
                </p>
                <h2 id="coop-heading" className="g-serif mt-3 text-3xl font-medium text-[#282828] md:text-5xl">
                  {es
                    ? "Honorarios negociados por tipo de activo — protegidos por escrito."
                    : "Negotiated referral fees by asset class — protected in writing."}
                </h2>
              </div>

              <div className="inline-flex border border-[#c6b296] bg-white p-0.5" role="group" aria-label={es ? "Modalidad de cooperación" : "Cooperation mode"}>
                <button
                  type="button"
                  aria-pressed={pipelineMode === "buyer_agency"}
                  onClick={() => setPipelineMode("buyer_agency")}
                  className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors ${
                    pipelineMode === "buyer_agency" ? "bg-[#2d2d2d] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                  }`}
                >
                  {es ? "Agencia de comprador" : "Buyer Agency"}
                </button>
                <button
                  type="button"
                  aria-pressed={pipelineMode === "referral"}
                  onClick={() => setPipelineMode("referral")}
                  className={`px-4 py-2 text-xs font-medium tracking-wider uppercase transition-colors ${
                    pipelineMode === "referral" ? "bg-[#2d2d2d] text-white" : "text-[#5b5b5f] hover:text-[#282828]"
                  }`}
                >
                  {es ? "Solo referencia" : "Referral Only"}
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="tablist">
              {pipelineNodes.map((node, idx) => {
                const selected = activePipelineNode === idx;
                return (
                  <button
                    key={node.code}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActivePipelineNode(idx)}
                    className={`flex flex-col border p-5 text-left transition-all ${
                      selected
                        ? "border-[#2d2d2d] bg-[#2d2d2d] text-white shadow-sm"
                        : "border-[#ddd8cc] bg-white text-[#282828] hover:border-[#817360]"
                    }`}
                  >
                    <span className={`g-serif text-2xl font-medium ${selected ? "text-[#c6b296]" : "text-[#817360]"}`}>
                      {node.step}
                    </span>
                    <span className="g-serif mt-2 text-lg font-medium leading-snug">
                      {es ? node.titleEs : node.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-6 border border-[#c6b296] bg-white p-6 md:p-8">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-[0.16em] text-[#817360] uppercase">
                  {es ? `Etapa ${activeNode.code}` : `Stage ${activeNode.code}`} ·{" "}
                  {pipelineMode === "buyer_agency"
                    ? es ? "Agencia de comprador hasta el cierre" : "Buyer Agency Through Closing"
                    : es ? "Solo referencia" : "Referral Only"}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-[#282828]">
                  {pipelineMode === "buyer_agency"
                    ? es ? activeNode.buyerAgencyEs : activeNode.buyerAgencyEn
                    : es ? activeNode.referralEs : activeNode.referralEn}
                </p>
              </div>

              <button
                type="button"
                onClick={() => jumpToRegister("agent")}
                className="g-btn-taupe"
              >
                {es ? "Registrar cliente y recibir condiciones" : "Register a client and receive terms"}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>

        {/* ── 6b. Team & Custom Search Callout (gilmar.es/vender/ "Nuestro equipo, tu ventaja" framing) ── */}
        <section className="bg-white py-16 md:py-24" aria-labelledby="beyond-developments-heading">
          <div className="mx-auto max-w-[1140px] px-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="grid grid-cols-12 items-end gap-3 lg:col-span-5">
                <div className="col-span-7 overflow-hidden border border-[#ece7dc]">
                  <img
                    src="/images/gilmar/balcon-terrace.jpg"
                    alt={es ? "Terraza residencial en Costa del Sol — visualización" : "Costa del Sol residential terrace visualization"}
                    className="h-52 w-full object-cover"
                  />
                </div>
                <div className="col-span-5 overflow-hidden border border-[#ece7dc]">
                  <img
                    src="/images/gilmar/be-grand-shared-rooftop-sea.webp"
                    alt={es ? "Azotea con vistas al mar en Málaga — zona común" : "Sea-view shared rooftop in Málaga"}
                    className="h-44 w-full object-cover"
                  />
                </div>
                <div className="col-span-12 overflow-hidden border border-[#ece7dc]">
                  <img
                    src="/images/gilmar/balcon-spa.webp"
                    alt={es ? "Zona común de bienestar — visualización" : "Shared wellness lounge visualization"}
                    className="h-40 w-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 lg:pl-6">
                <div className="g-editorial-frame">
                  <div className="g-eyebrow inline-flex items-center gap-2">
                    <Globe2 size={14} aria-hidden="true" />
                    <span>
                      {es
                        ? "MÁS ALLÁ DE LAS PROMOCIONES · MADRID · MARBELLA · ESTEPONA · MÁLAGA · SOTOGRANDE · CANARIAS"
                        : "BEYOND THE DEVELOPMENTS · MADRID · MARBELLA · ESTEPONA · MÁLAGA · SOTOGRANDE · CANARY ISLANDS"}
                    </span>
                  </div>
                  <h2 id="beyond-developments-heading" className="g-serif mt-4 text-3xl font-medium leading-tight text-[#282828] md:text-4xl">
                    {es
                      ? "¿Busca otra zona o presupuesto en España (€500K a €5M+)?"
                      : "Looking for a different Spanish market or budget band (€500K to €5M+)?"}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#5b5b5f]">
                    {es
                      ? "Nuestros equipos coordinan búsquedas a medida en obra nueva, segunda mano, inversión y activo comercial en toda España, con la misma protección escrita para su agencia."
                      : "Our teams coordinate tailored searches across new developments, prime resale, investment assets, and commercial property throughout Spain under the same written brokerage protection."}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => jumpToRegister("buyer")}
                      className="g-btn-charcoal"
                    >
                      {es ? "Enviar criterios de búsqueda" : "Send the search brief"}
                      <ArrowRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => jumpToRegister("agent")}
                      className="g-btn-outline"
                    >
                      {es ? "Registrar un cliente para España" : "Register a client for Spain"}
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <details className="mt-10 border border-[#ddd8cc] bg-[#f8f7f1] px-5 py-3.5 text-xs leading-relaxed text-[#5b5b5f]">
              <summary className="flex cursor-pointer items-center gap-2 font-medium tracking-wider text-[#282828] uppercase">
                <ShieldCheck size={14} className="shrink-0 text-[#817360]" aria-hidden="true" />
                <span>
                  {es
                    ? "Divulgaciones regulatorias, fuente de unidades y cooperación fuera del MLS"
                    : "Regulatory disclosures, unit source & non-MLS cooperation caveats"}
                </span>
              </summary>
              <p className="mt-3">
                {es
                  ? "Unidades seleccionadas según información de GILMAR (revisada en noviembre de 2026). Disponibilidad, precios, impuestos y entrega requieren confirmación escrita vigente. Las imágenes son ilustrativas y no muestran las residencias concretas. Los honorarios de cooperación son negociables, se determinan por operación y nivel de servicio, no se publican en esta página y se documentan fuera del MLS: las condiciones se emiten por escrito tras el registro del cliente y requieren un acuerdo firmado y la aprobación de United Realty Group. El registro no garantiza aceptación ni pago."
                  : "Selected units based on GILMAR information (reviewed Nov 2026). Availability, prices, taxes, and delivery require current written confirmation. Images are illustrative and do not depict the specific residences. Cooperating compensation is negotiable, determined per transaction and level of service, is not published on this page, and is documented outside the MLS: terms are issued in writing after client registration and require a signed agreement and United Realty Group approval. Registration does not guarantee acceptance or payment."}{" "}
                {CONTACT.licenseDisplay} · {CONTACT.brokerage}.
              </p>
            </details>
          </div>
        </section>

        {/* ── 7. Bilateral Registration Desk (gilmar.es/vender/ #F2F0E1 warm cream lead band) ── */}
        <section id="register-desk" className="scroll-mt-24 bg-[#f2f0e1] py-16 md:py-24" aria-labelledby="register-desk-heading">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="g-eyebrow">
                {es ? "MESA DE REGISTRO BILATERAL" : "BILATERAL REGISTRATION DESK"}
              </p>
              <h2 id="register-desk-heading" className="g-serif mt-3 text-3xl font-medium text-[#282828] md:text-5xl">
                {es
                  ? "Regístrese para acceder al catálogo IDX y recibir condiciones por escrito."
                  : "Register to unlock the 2,000+ IDX portfolio and written referral terms."}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-[#5b5b5f]">
                {es
                  ? "Seleccione su perfil: registro profesional de agente con licencia o solicitud directa de comprador."
                  : "Choose your registration path below: licensed agent referral registration or direct buyer IDX inquiry."}
              </p>
            </div>

            <div className="mt-9 flex justify-center border-b border-[#c6b296]">
              <button
                type="button"
                onClick={() => setIntakeTab("agent")}
                className={`border-b-2 px-6 py-3.5 text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
                  intakeTab === "agent"
                    ? "border-[#2d2d2d] text-[#282828]"
                    : "border-transparent text-[#87868a] hover:text-[#282828]"
                }`}
              >
                {es ? "01 · Registro de Agente y Referido" : "01 · Agent & Referral Registration"}
              </button>
              <button
                type="button"
                onClick={() => setIntakeTab("buyer")}
                className={`border-b-2 px-6 py-3.5 text-xs font-medium tracking-[0.14em] uppercase transition-colors ${
                  intakeTab === "buyer"
                    ? "border-[#2d2d2d] text-[#282828]"
                    : "border-transparent text-[#87868a] hover:text-[#282828]"
                }`}
              >
                {es ? "02 · Registro de Comprador IDX" : "02 · Buyer IDX Registration"}
              </button>
            </div>

            <div className="gilmar-form-shell mt-8">
              {intakeTab === "agent" ? (
                <ReferralIntakeForm language={lang} initialPurpose="client_referral" sourcePage="gilmar-spain-referral" />
              ) : (
                <BuyerMandateForm variant="gilmar-spain" language={lang} />
              )}
            </div>

            <div className="mt-10 border-t border-[#c6b296]/70 pt-7">
              <div className="mb-4 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
                <img
                  src="/images/gilmar/gilmar-logo-trimmed.png"
                  alt="GILMAR Consulting Inmobiliario"
                  width="2367"
                  height="644"
                  className="h-7 w-auto object-contain sm:h-8"
                />
                <span className="h-6 w-[1px] bg-[#c6b296]" aria-hidden="true" />
                <img
                  src="/images/gilmar/urg-logo-pro.png"
                  alt="United Realty Group"
                  width="1024"
                  height="331"
                  className="h-7 w-auto object-contain sm:h-8"
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-[#5b5b5f]">
                <BadgeCheck size={15} className="shrink-0 text-[#817360]" />
                <span>{PUBLIC_COMPLIANCE}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. FAQ (Clean White Editorial Band) ── */}
        <section className="bg-white py-16 md:py-24" aria-labelledby="gilmar-faq-heading">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="g-eyebrow">
                {es ? "PREGUNTAS FRECUENTES" : "FREQUENTLY ASKED QUESTIONS"}
              </p>
              <h2 id="gilmar-faq-heading" className="g-serif mt-3 text-3xl font-medium text-[#282828] md:text-5xl">
                {es ? "Protocolo de cooperación e inventario en España." : "Cooperation protocol & Spain portfolio access."}
              </h2>
            </div>
            <div className="mt-10">
              <FaqAccordion faqs={faqs} tone="light" />
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Only the mobile pill: it opens #register-desk. The desktop bar ("What's your
          South Florida home worth?") and the exit-intent seller net sheet are Miami
          seller offers — off-message here, and the net sheet would file Spain agents
          and buyers in HubSpot as Miami seller-guide requests. */}
      <MobileStickyCTA lang={lang} />

      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          lang={lang}
          onClose={() => setSelectedProperty(null)}
          onRegister={() => jumpToRegister("agent")}
        />
      )}
    </>
  );
}
