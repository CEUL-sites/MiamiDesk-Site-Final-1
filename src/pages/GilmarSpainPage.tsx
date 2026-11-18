import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Languages,
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
import { Tilt3D } from "../components/Tilt3D";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { BuyerMandateForm } from "../components/forms/BuyerMandateForm";
import { CONTACT, PUBLIC_COMPLIANCE } from "../constants";

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
    code: "01 / SELECTED RESIDENCE",
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
    code: "02 / SELECTED RESIDENCE",
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
    code: "03 / SELECTED RESIDENCE",
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
    regionEn: "MADRID",
    regionEs: "MADRID",
    count: "1,061",
    areasEn: "Salamanca, Chamberí, La Moraleja, Pozuelo & Obra Nueva",
    areasEs: "Salamanca, Chamberí, La Moraleja, Pozuelo y Obra Nueva",
    image: "/images/madrid-gran-via-editorial.webp",
    altEn: "Madrid architectural streetscape — GILMAR portfolio",
    altEs: "Arquitectura de Madrid — Cartera de GILMAR",
  },
  {
    key: "costa-del-sol",
    regionEn: "COSTA DEL SOL",
    regionEs: "COSTA DEL SOL",
    count: "737",
    areasEn: "Marbella, Puerto Banús, Estepona, Benahavís & Málaga",
    areasEs: "Marbella, Puerto Banús, Estepona, Benahavís y Málaga",
    image: "/images/gilmar/balcon-residence.jpg",
    altEn: "Costa del Sol residential architecture — GILMAR portfolio",
    altEs: "Vivienda en Costa del Sol — Cartera de GILMAR",
  },
  {
    key: "canary-islands",
    regionEn: "CANARY ISLANDS",
    regionEs: "ISLAS CANARIAS",
    count: "201",
    areasEn: "Tenerife, Gran Canaria, Lanzarote & Fuerteventura",
    areasEs: "Tenerife, Gran Canaria, Lanzarote y Fuerteventura",
    image: "/images/gilmar/elysian.jpg",
    altEn: "Canary Islands coastal residences — GILMAR portfolio",
    altEs: "Residencial en Islas Canarias — Cartera de GILMAR",
  },
  {
    key: "seville-cadiz",
    regionEn: "SEVILLE & CÁDIZ",
    regionEs: "SEVILLA Y CÁDIZ",
    count: "23+",
    areasEn: "Seville capital, Aljarafe, Sotogrande & Costa de la Luz",
    areasEs: "Sevilla capital, Aljarafe, Sotogrande y Costa de la Luz",
    image: "/images/segovia-aqueduct-editorial.webp",
    altEn: "Spanish heritage architecture — GILMAR portfolio across Andalusia",
    altEs: "Arquitectura española — Cartera de GILMAR en Andalucía",
  },
] as const;

const ADVISORY_PILLARS = [
  {
    titleEn: "Legal, Tax & Valuation Advisory",
    titleEs: "Asesoría Jurídica, Fiscal y Valoración Gratuita",
    bodyEn:
      "In-house legal and tax department handling registry charge checks, contract review, notary coordination, tax guidance, and complimentary market valuations.",
    bodyEs:
      "Departamento jurídico y fiscal propio para verificación de cargas, contratos, coordinación notarial, orientación tributaria y valoración gratuita sin compromiso.",
  },
  {
    titleEn: "Mortgage Center · THIRSA · Capital Markets",
    titleEs: "Centro Hipotecario · THIRSA · Capital Markets",
    bodyEn:
      "Dedicated Centro Hipotecario comparing Spanish banks for resident and international buyers, official THIRSA appraisals (Bank of Spain–homologated), and Capital Markets advisory.",
    bodyEs:
      "Intermediación bancaria mediante Centro Hipotecario, tasaciones oficiales THIRSA (homologada por el Banco de España) y división Capital Markets para inversión.",
  },
  {
    titleEn: "Renovations & Interior Design",
    titleEs: "Reformas e Interiorismo · Soluciones Constructivas",
    bodyEn:
      "Comprehensive 360 service via Gilmar Soluciones Constructivas covering feasibility studies, licensing, architectural remodeling, interior design, and home staging.",
    bodyEs:
      "Servicio integral 360 mediante Gilmar Soluciones Constructivas: estudios técnicos, licencias, ejecución de reformas, interiorismo y home staging.",
  },
  {
    titleEn: "After-Sales & Closing Support",
    titleEs: "Servicio Posventa y Entrega en España",
    bodyEn:
      "Support before, during, and after deed signing including utility transfers, energy certificates, insurance, relocation logistics, and ongoing asset care.",
    bodyEs:
      "Acompañamiento antes, durante y después de la escritura: cambio de suministros, certificado energético, mudanzas, seguros y gestión patrimonial.",
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
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-navy-deep/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={property.name}
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-3xl border border-gold/40 bg-[#071526] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={es ? "Cerrar" : "Close"}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-white/15 bg-navy/85 text-white/80 transition-colors hover:border-gold hover:text-gold"
        >
          <X size={18} />
        </button>

        <div className="relative h-64 w-full overflow-hidden bg-navy sm:h-80">
          <img
            src={currentPhoto.src}
            alt={es ? currentPhoto.altEs : currentPhoto.altEn}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071526] via-[#071526]/30 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="border border-white/20 bg-navy-deep/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
              {es ? property.regionEs : property.regionEn}
            </span>
            <button
              type="button"
              onClick={() => setUnbrandedView((v) => !v)}
              className="border border-gold/40 bg-navy-deep/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white hover:border-gold hover:text-gold"
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
          <div className="absolute bottom-3 left-6 right-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              {es ? property.locationEs : property.locationEn} · {es ? currentPhoto.captionEs : currentPhoto.captionEn}
            </p>
            <h3 className="mt-1 font-serif text-2xl text-white sm:text-3xl">{property.name}</h3>
          </div>
        </div>

        {property.gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-b border-white/10 bg-navy-deep px-6 py-3">
            {property.gallery.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActivePhoto(idx)}
                className={`h-14 w-24 shrink-0 overflow-hidden border transition-all ${
                  idx === activePhoto ? "border-gold ring-1 ring-gold" : "border-white/15 opacity-70 hover:opacity-100"
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
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="font-serif text-3xl font-semibold text-gold">{priceEurStr}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65">
                {es ? "Aprox." : "Approx."} {priceUsdStr} · {es ? property.priceNoteEs : property.priceNoteEn}
              </p>
            </div>
            <div className="text-right">
              <p className="font-sans text-xs font-semibold text-white">
                {es ? property.unitLabelEs : property.unitLabelEn}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gold/80">
                {es ? property.specsEs : property.specsEn}
              </p>
            </div>
          </div>

          <p className="mt-5 font-sans text-sm leading-relaxed text-white/85">
            {es ? property.summaryEs : property.summaryEn}
          </p>

          <ul className="mt-5 space-y-2">
            {(es ? property.highlightsEs : property.highlightsEn).map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/80">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
              {es ? "Ubicación y verificación" : "Location & confirmation status"}
            </p>
            <p className="mt-1 font-sans text-xs text-white/75">{property.address}</p>
            <p className="mt-2 font-sans text-[11px] leading-relaxed text-white/60">
              {es ? property.complianceEs : property.complianceEn}
            </p>
            {!unbrandedView && (
              <p className="mt-2 font-sans text-[11px] leading-relaxed text-gold/90">
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
              className="inline-flex flex-1 items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              {unbrandedView
                ? es
                  ? "Solicitar dossier completo"
                  : "Request full property brief"
                : es
                  ? "Registrar cliente para esta propiedad"
                  : "Register a client for this residence"}
              <ArrowRight size={13} />
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

  const es = lang === "es";
  const faqs = getFaqs(lang);
  const selectedMarket = IDX_MARKETS.find((m) => m.key === activeMarketKey) ?? IDX_MARKETS[0];

  const pipelineNodes = [
    {
      step: "01",
      titleEn: "Florida Agent Registration (GD-Ref)",
      titleEs: "Registro en Florida (GD-Ref)",
      buyerAgencyEn: "Submit your Florida license, brokerage details, and client initials to issue your GD-Ref prior to introduction.",
      buyerAgencyEs: "Envíe licencia de Florida, brokerage e iniciales para emitir su GD-Ref antes de la presentación.",
      referralEn: "Register license and buyer criteria prior to any introduction to protect your client relationship.",
      referralEs: "Registre licencia y criterios del comprador antes de presentar al cliente para proteger la relación.",
    },
    {
      step: "02",
      titleEn: "Written Fee Agreement & GILMAR Approval",
      titleEs: "Acuerdo Escrito y Aprobación GILMAR",
      buyerAgencyEn: "Receive case-by-case written buyer-agency cooperation terms approved by GILMAR Spain and your brokerage.",
      buyerAgencyEs: "Reciba condiciones escritas de agencia de comprador aprobadas por GILMAR España y su brokerage.",
      referralEn: "Each referral receives an asset-specific negotiated fee documented in writing upon GILMAR Spain approval.",
      referralEs: "Cada referido recibe un honorario negociado por activo documentado por escrito tras aprobación de GILMAR.",
    },
    {
      step: "03",
      titleEn: "GILMAR Local Execution (36 Teams)",
      titleEs: "Ejecución Local GILMAR (36 Equipos)",
      buyerAgencyEn: "GILMAR runs showings, Centro Hipotecario financing, legal, and tax coordination while you represent the buyer.",
      buyerAgencyEs: "GILMAR gestiona visitas, Centro Hipotecario y asesoría jurídica/fiscal mientras usted representa al comprador.",
      referralEn: "United Realty Group and GILMAR manage local viewings, advisory, and negotiation in 10 languages.",
      referralEs: "United Realty Group y GILMAR gestionan visitas, asesoría y negociación en 10 idiomas.",
    },
    {
      step: "04",
      titleEn: "Spanish Notary & Closing",
      titleEs: "Notaría y Cierre en España",
      buyerAgencyEn: "Deed execution before a Spanish notary supported by registry checks and post-closing administration.",
      buyerAgencyEs: "Escritura pública ante notario en España con verificación registral y administración posventa.",
      referralEn: "Closing supervised through deed signing with full registry and tax compliance verification.",
      referralEs: "Cierre supervisado hasta escritura pública con verificación registral y fiscal.",
    },
    {
      step: "05",
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
          content="https://homesprofessional.com/images/gilmar/balcon-terrace.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://homesprofessional.com/images/gilmar/balcon-terrace.jpg"
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

      <main id="main-content" className="min-h-screen bg-white-soft pb-28 lg:pb-0">
        <Navbar />

        {/* ── 1. Hero Band ─────────────────────────────────────────── */}
        <section
          data-sticky-cta-guard
          className="relative overflow-hidden bg-navy-deep py-16 text-white md:py-24"
          aria-labelledby="gilmar-spain-h1"
        >
          <img
            src="/images/gilmar/balcon-terrace.jpg"
            alt={es ? "Balcón del Mediterráneo — Terraza en España" : "Balcón del Mediterráneo — Terrace in Spain"}
            width="1159"
            height="820"
            fetchPriority="high"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06111F] via-[#06111F]/90 to-[#06111F]/65" />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              <div className="inline-flex items-center gap-4 bg-white px-4 py-2 shadow-sm">
                <img
                  src="/images/gilmar/gilmar-consulting-horizontal.png"
                  alt="GILMAR Consulting Inmobiliario"
                  width="120"
                  height="43"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-serif text-lg text-navy-deep" aria-hidden="true">×</span>
                <img
                  src="/images/urg-logo-original.webp"
                  alt="United Realty Group"
                  width="110"
                  height="35"
                  className="h-7 w-auto object-contain"
                />
              </div>

              <div
                className="inline-flex border border-white/20 bg-navy-deep/80"
                role="group"
                aria-label={es ? "Idioma de la página" : "Page language"}
              >
                {(["en", "es"] as Lang[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleLanguage(option)}
                    aria-pressed={lang === option}
                    className={`px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                      lang === option ? "bg-gold text-navy-deep" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 max-w-4xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">
                {es
                  ? "GILMAR ESPAÑA × UNITED REALTY GROUP · DESK BILATERAL"
                  : "GILMAR SPAIN × UNITED REALTY GROUP · BILATERAL DESK"}
              </p>
              <h1
                id="gilmar-spain-h1"
                className="mt-4 font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
              >
                {es
                  ? "Su comprador quiere España. Conserve la relación y el honorario."
                  : "Your buyer wants Spain. Keep the relationship and the commission."}
              </h1>
              <p className="mt-5 max-w-3xl font-sans text-base leading-relaxed text-white/80 md:text-lg">
                {es
                  ? "Fundada en 1983, con 36 equipos comerciales y atención en 10 idiomas, GILMAR conecta a sus clientes con más de 2.000 propiedades activas en España. Cada referido cuenta con su propio honorario negociado según el producto (obra nueva, segunda mano, inversión o comercial), respetado por escrito tras la aprobación de GILMAR España."
                  : "Established in 1983 with 36 commercial teams and service in 10 languages, GILMAR connects your clients to 2,000+ active properties across Spain. Each referral carries its own negotiated fee based on asset class (new developments, resale residential, investment, or commercial), protected in writing once approved by GILMAR Spain."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => jumpToRegister("agent")}
                  className="inline-flex items-center gap-2 bg-gold px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep shadow-lg transition-colors hover:bg-gold-soft"
                >
                  {es ? "Registrar licencia y cliente" : "Register License & Client"}
                  <ArrowRight size={14} />
                </button>
                <a
                  href="#spain-idx"
                  className="inline-flex items-center gap-2 border border-white/25 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  <Lock size={14} />
                  {es ? "Explorar 2.000+ propiedades IDX" : "Browse 2,000+ Spain IDX"}
                </a>
              </div>

              <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-xs text-white/80 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Scale size={15} className="shrink-0 text-gold" />
                  <span>
                    {es
                      ? "Honorarios negociados por tipo de activo"
                      : "Negotiated referral fees by asset class"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={15} className="shrink-0 text-gold" />
                  <span>
                    {es
                      ? "Aprobación y acuerdo escrito de GILMAR España"
                      : "Written agreement approved by GILMAR Spain"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={15} className="shrink-0 text-gold" />
                  <span>
                    {es
                      ? "Pago vía United Realty Group a su brokerage"
                      : "Paid via United Realty Group to your brokerage"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. GILMAR Integral Advisory Ecosystem ─────────────────── */}
        <section className="bg-ivory py-16 md:py-24" aria-labelledby="advisory-heading">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold-ink">
                  {es
                    ? "GILMAR CONSULTING INMOBILIARIO · SERVICIOS INTEGRALES"
                    : "GILMAR CONSULTING INMOBILIARIO · INTEGRAL ADVISORY"}
                </p>
                <h2 id="advisory-heading" className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                  {es
                    ? "Una operación completa en España, con respaldo 360."
                    : "A complete purchase in Spain, supported end to end."}
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-4 border border-bone bg-white px-5 py-4 text-center">
                <div>
                  <p className="font-serif text-2xl font-semibold text-navy-deep">1983</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-primary/65">
                    {es ? "Fundación" : "Founded"}
                  </p>
                </div>
                <div className="border-l border-bone pl-4">
                  <p className="font-serif text-2xl font-semibold text-navy-deep">36</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-primary/65">
                    {es ? "Equipos" : "Teams"}
                  </p>
                </div>
                <div className="border-l border-bone pl-4">
                  <p className="font-serif text-2xl font-semibold text-navy-deep">10</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-primary/65">
                    {es ? "Idiomas" : "Languages"}
                  </p>
                </div>
                <div className="border-l border-bone pl-4">
                  <p className="font-serif text-2xl font-semibold text-navy-deep">2,000+</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-primary/65">
                    {es ? "Propiedades" : "Listings"}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ADVISORY_PILLARS.map((pillar) => (
                <Tilt3D key={pillar.titleEn} maxTilt={4} className="h-full">
                  <div className="h-full border border-bone bg-white p-6 shadow-sm transition-shadow hover:border-gold/50 hover:shadow-md">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                      {es ? "División Especializada" : "Specialized Division"}
                    </p>
                    <h3 className="mt-3 font-serif text-xl text-navy-deep">
                      {es ? pillar.titleEs : pillar.titleEn}
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/75">
                      {es ? pillar.bodyEs : pillar.bodyEn}
                    </p>
                  </div>
                </Tilt3D>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. Featured GILMAR Developments (3D Cards + Telemetry Compare) ── */}
        <section id="featured-residences" className="bg-white py-16 md:py-24" aria-labelledby="residences-heading">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold-ink">
                  {es ? "PROMOCIONES SELECCIONADAS DE GILMAR" : "SELECTED GILMAR DEVELOPMENTS"}
                </p>
                <h2 id="residences-heading" className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                  {es ? "Tres residencias representativas para iniciar." : "Three selected residences to begin the conversation."}
                </h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-ink-primary/70">
                  {es
                    ? "Cada vivienda mostrada representa una selección en promociones activas; puede registrar interés en cualquier unidad disponible."
                    : "Each residence shown is one selected example; you may register client interest on any available unit in the development."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex border border-bone bg-ivory p-1" role="group" aria-label={es ? "Divisa" : "Currency"}>
                  <button
                    type="button"
                    aria-pressed={currencyMode === "eur"}
                    onClick={() => setCurrencyMode("eur")}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${currencyMode === "eur" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/70"}`}
                  >
                    EUR (€)
                  </button>
                  <button
                    type="button"
                    aria-pressed={currencyMode === "usd"}
                    onClick={() => setCurrencyMode("usd")}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${currencyMode === "usd" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/70"}`}
                  >
                    {es ? "USD ($ · BCE)" : "USD ($ · ECB)"}
                  </button>
                </div>
                <div className="inline-flex border border-bone bg-ivory p-1" role="group" aria-label={es ? "Superficie" : "Area"}>
                  <button
                    type="button"
                    aria-pressed={areaMode === "sqm"}
                    onClick={() => setAreaMode("sqm")}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${areaMode === "sqm" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/70"}`}
                  >
                    m²
                  </button>
                  <button
                    type="button"
                    aria-pressed={areaMode === "sqft"}
                    onClick={() => setAreaMode("sqft")}
                    className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${areaMode === "sqft" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/70"}`}
                  >
                    ft²
                  </button>
                </div>
                <div className="inline-flex shrink-0 border border-bone bg-ivory p-1" role="group" aria-label="View mode">
                  <button
                    type="button"
                    aria-pressed={viewMode === "cards"}
                    onClick={() => setViewMode("cards")}
                    className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] ${
                      viewMode === "cards" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/70"
                    }`}
                  >
                    {es ? "Tarjetas" : "Cards"}
                  </button>
                  <button
                    type="button"
                    aria-pressed={viewMode === "compare"}
                    onClick={() => setViewMode("compare")}
                    className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] ${
                      viewMode === "compare" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/70"
                    }`}
                  >
                    {es ? "Comparar las tres" : "Compare Three"}
                  </button>
                </div>
              </div>
            </div>

            {viewMode === "cards" ? (
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {DEVELOPMENTS.map((prop) => {
                  const primaryPhoto = prop.gallery[0];
                  const priceEur = `${formatEur(prop.priceEur, lang)} ${es ? prop.priceSuffixEs : prop.priceSuffixEn}`.trim();
                  const priceUsd = formatUsd(prop.priceEur, lang);
                  const primaryPrice = currencyMode === "usd" ? `${priceUsd} (${es ? "aprox." : "approx."})` : priceEur;
                  const secondaryPrice = currencyMode === "usd" ? priceEur : `${es ? "Aprox." : "Approx."} ${priceUsd}`;
                  const builtVal = areaMode === "sqft" ? `${prop.builtSqft.toLocaleString()} ft²` : `${prop.builtSqm} m²`;
                  const outVal = areaMode === "sqft" ? `${prop.outdoorSqft.toLocaleString()} ft²` : `${prop.outdoorSqm} m²`;

                  return (
                    <Tilt3D key={prop.slug} maxTilt={5} className="h-full">
                      <div className="flex h-full flex-col overflow-hidden border border-bone bg-ivory shadow-sm transition-shadow hover:border-gold/50 hover:shadow-md">
                        <button
                          type="button"
                          onClick={() => setSelectedProperty(prop)}
                          className="group relative h-56 w-full overflow-hidden bg-navy-deep text-left"
                        >
                          <img
                            src={primaryPhoto.src}
                            alt={es ? primaryPhoto.altEs : primaryPhoto.altEn}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-transparent" />
                          <span className="absolute left-3 top-3 bg-gold px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-navy-deep">
                            {es ? prop.regionEs : prop.regionEn}
                          </span>
                          <span className="absolute right-3 top-3 border border-white/25 bg-navy-deep/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white">
                            {es ? prop.taxBadgeEs : prop.taxBadgeEn}
                          </span>
                          <span className="absolute bottom-3 left-4 right-4 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                            {es ? prop.locationEs : prop.locationEn}
                          </span>
                        </button>

                        <div className="flex flex-1 flex-col justify-between p-6">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-primary/60">
                              {prop.code}
                            </p>
                            <h3 className="mt-1 font-serif text-2xl text-navy-deep">{prop.name}</h3>
                            <p className="mt-0.5 font-sans text-xs text-ink-primary/70">
                              {es ? prop.unitLabelEs : prop.unitLabelEn}
                            </p>
                            <p className="mt-3 font-serif text-2xl font-semibold text-navy-deep">{primaryPrice}</p>
                            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-primary/60">
                              {secondaryPrice} · {es ? prop.priceNoteEs : prop.priceNoteEn}
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-2 border border-bone bg-white p-2.5">
                              <div>
                                <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-ink-primary/60">
                                  {es ? "Construidos" : "Built"}
                                </span>
                                <span className="font-serif text-sm font-semibold text-navy-deep">{builtVal}</span>
                              </div>
                              <div className="border-l border-bone pl-2">
                                <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-ink-primary/60">
                                  {es ? "Exterior" : "Outdoor"}
                                </span>
                                <span className="font-serif text-sm font-semibold text-navy-deep">{outVal}</span>
                              </div>
                            </div>
                            <p className="mt-3 font-sans text-xs leading-relaxed text-ink-primary/75">
                              {es ? prop.summaryEs : prop.summaryEn}
                            </p>
                          </div>

                          <div className="mt-5 space-y-2 border-t border-bone pt-4">
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy-deep">
                              {es ? prop.specsEs : prop.specsEn}
                            </p>
                            <div className="flex gap-2 pt-2">
                              <button
                                type="button"
                                onClick={() => setSelectedProperty(prop)}
                                className="flex-1 border border-navy-deep px-3 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep transition-colors hover:bg-navy-deep hover:text-white"
                              >
                                {es ? "Galería y Dossier" : "Gallery & Brief"}
                              </button>
                              <button
                                type="button"
                                onClick={() => jumpToRegister("agent")}
                                className="flex-1 bg-gold px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-navy-deep transition-colors hover:bg-gold-soft"
                              >
                                {es ? "Registrar Cliente" : "Register Client"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tilt3D>
                  );
                })}
              </div>
            ) : (
              <div className="mt-10 space-y-6">
                {/* Interactive Visual Telemetry Bar Matrix */}
                <div className="grid gap-4 md:grid-cols-3">
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
                      <div key={prop.slug} className="border border-bone bg-ivory p-5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-serif text-xl text-navy-deep">{prop.name}</h3>
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-primary/65">
                              {es ? prop.locationEs : prop.locationEn}
                            </p>
                          </div>
                          <span className="border border-bone bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-navy-deep">
                            {es ? prop.taxBadgeEs : prop.taxBadgeEn}
                          </span>
                        </div>
                        <div className="mt-4 space-y-3 text-xs">
                          <div>
                            <div className="flex justify-between font-semibold text-navy-deep">
                              <span>{es ? "Precio" : "Price"}</span>
                              <span>{priceDisp}</span>
                            </div>
                            <div className="mt-1 h-2 bg-bone">
                              <div className="h-full origin-left bg-gold" style={{ transform: `scaleX(${priceRatio.toFixed(2)})` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between font-semibold text-navy-deep">
                              <span>{es ? "Superficie construida" : "Built Area"}</span>
                              <span>{builtDisp}</span>
                            </div>
                            <div className="mt-1 h-2 bg-bone">
                              <div className="h-full origin-left bg-navy-deep" style={{ transform: `scaleX(${areaRatio.toFixed(2)})` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between font-semibold text-navy-deep">
                              <span>{es ? "Exterior / Terraza" : "Outdoor Area"}</span>
                              <span>{outDisp}</span>
                            </div>
                            <div className="mt-1 h-2 bg-bone">
                              <div className="h-full origin-left bg-gold-ink" style={{ transform: `scaleX(${outRatio.toFixed(2)})` }} />
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedProperty(prop)}
                            className="flex-1 border border-navy-deep px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-deep"
                          >
                            {es ? "Dossier" : "Brief"}
                          </button>
                          <button
                            type="button"
                            onClick={() => jumpToRegister("agent")}
                            className="flex-1 bg-gold px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-navy-deep"
                          >
                            {es ? "Registrar" : "Register"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="overflow-x-auto border border-bone bg-white">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead className="bg-navy-deep font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                      <tr>
                        <th className="p-4">{es ? "Promoción" : "Development"}</th>
                        <th className="p-4">{es ? "Ubicación" : "Location"}</th>
                        <th className="p-4">{es ? "Precio" : "Quoted Price"}</th>
                        <th className="p-4">{es ? "Especificaciones" : "Specifications"}</th>
                        <th className="p-4">{es ? "Acción" : "Action"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-bone">
                      {DEVELOPMENTS.map((prop) => {
                        const priceEur = `${formatEur(prop.priceEur, lang)} ${es ? prop.priceSuffixEs : prop.priceSuffixEn}`.trim();
                        const priceUsd = formatUsd(prop.priceEur, lang);
                        return (
                          <tr key={prop.slug} className="hover:bg-ivory">
                            <td className="p-4">
                              <p className="font-serif text-lg font-semibold text-navy-deep">{prop.name}</p>
                              <p className="text-xs text-ink-primary/65">{es ? prop.unitLabelEs : prop.unitLabelEn}</p>
                            </td>
                            <td className="p-4 text-xs text-ink-primary/80">
                              {es ? prop.locationEs : prop.locationEn}
                            </td>
                            <td className="p-4">
                              <p className="font-semibold text-navy-deep">{priceEur}</p>
                              <p className="text-xs text-ink-primary/60">
                                {es ? "Aprox." : "Approx."} {priceUsd}
                              </p>
                            </td>
                            <td className="p-4 text-xs text-ink-primary/80">
                              <p>{es ? prop.specsEs : prop.specsEn}</p>
                              <p className="text-ink-primary/60">{es ? prop.sizeSummaryEs : prop.sizeSummaryEn}</p>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => setSelectedProperty(prop)}
                                  className="border border-navy-deep px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-deep"
                                >
                                  {es ? "Ver" : "View"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => jumpToRegister("agent")}
                                  className="bg-gold px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-navy-deep"
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

            <details className="mt-6 border border-bone bg-ivory px-4 py-3 font-sans text-[11px] leading-relaxed text-ink-primary/70">
              <summary className="cursor-pointer font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-navy-deep">
                {es ? "Fuente de unidades y notas de conversión BCE" : "Unit source & ECB FX reference disclosures"}
              </summary>
              <p className="mt-2">
                {es
                  ? "Fuente de unidades: GILMAR (noviembre de 2026). Disponibilidad, precios, impuestos, entregas y planos requieren confirmación escrita vigente. Conversión aproximada a tipo de referencia BCE (1 EUR = 1,1052 USD, 13 nov. 2026). No se representa ninguna publicación MLS activa."
                  : "Unit source: GILMAR (reviewed Nov 2026). Availability, prices, taxes, delivery, and exact plans require current written confirmation. USD conversion approximate at ECB reference rate (1 EUR = 1.1052 USD, Nov 13, 2026). No active MLS listing is represented."}
              </p>
            </details>
          </div>
        </section>

        {/* ── 4. Registration-Gated 2,000+ Spain IDX Regional Node Selector ── */}
        <section id="spain-idx" className="scroll-mt-24 bg-navy-deep py-16 text-white md:py-24" aria-labelledby="idx-heading">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
                  <Lock size={14} />
                  <span>
                    {es
                      ? "CATÁLOGO IDX PRIVADO · MÁS DE 2.000 PROPIEDADES EN ESPAÑA"
                      : "REGISTERED IDX ACCESS · 2,000+ ACTIVE PROPERTIES IN SPAIN"}
                  </span>
                </div>
                <h2 id="idx-heading" className="mt-3 font-serif text-3xl text-white md:text-4xl">
                  {es
                    ? "Explore más de 2.000 propiedades en España mediante registro."
                    : "Browse 2,000+ properties across Spain through registration."}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {IDX_MARKETS.map((m) => (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setActiveMarketKey(m.key)}
                      aria-pressed={m.key === activeMarketKey}
                      className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                        m.key === activeMarketKey
                          ? "border-gold bg-gold font-bold text-navy-deep"
                          : "border-white/20 bg-white/[0.04] text-white/80 hover:border-gold/50"
                      }`}
                    >
                      {es ? m.regionEs : m.regionEn} · {m.count}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-gold/35 bg-white/[0.04] p-5 lg:col-span-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                  {es ? selectedMarket.regionEs : selectedMarket.regionEn}
                </p>
                <p className="mt-1 font-serif text-3xl font-semibold text-white">{selectedMarket.count}</p>
                <p className="mt-1 font-sans text-xs text-white/75">
                  {es ? selectedMarket.areasEs : selectedMarket.areasEn}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {IDX_MARKETS.map((market) => {
                const isSelected = market.key === activeMarketKey;
                return (
                  <Tilt3D key={market.key} maxTilt={4} className="h-full">
                    <div
                      onMouseEnter={() => setActiveMarketKey(market.key)}
                      className={`flex h-full flex-col overflow-hidden border transition-all ${
                        isSelected
                          ? "border-gold bg-navy shadow-[0_12px_32px_rgba(201,168,76,0.2)]"
                          : "border-gold/25 bg-navy/80"
                      }`}
                    >
                      <div className="h-44 w-full overflow-hidden bg-navy">
                        <img
                          src={market.image}
                          alt={es ? market.altEs : market.altEn}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                            {es ? market.regionEs : market.regionEn}
                          </p>
                          <p className="mt-1 font-serif text-3xl font-semibold text-white">{market.count}</p>
                          <p className="mt-2 font-sans text-xs leading-relaxed text-white/70">
                            {es ? market.areasEs : market.areasEn}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => jumpToRegister("agent")}
                          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold hover:text-white"
                        >
                          {es ? "Registrar para ver IDX" : "Register to browse"}
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </Tilt3D>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => jumpToRegister("agent")}
                className="inline-flex items-center gap-2 bg-gold px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep hover:bg-gold-soft"
              >
                {es ? "Registro de Agente (Licencia)" : "Agent Registration (License Required)"}
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() => jumpToRegister("buyer")}
                className="inline-flex items-center gap-2 border border-white/25 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white hover:border-gold hover:text-gold"
              >
                {es ? "Registro de Comprador para IDX" : "Buyer IDX Registration"}
              </button>
            </div>
          </div>
        </section>

        {/* ── 5. Interactive 5-Stage Deal-Flow Pipeline ───────────── */}
        <section className="bg-white py-16 md:py-24" aria-labelledby="coop-heading">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold-ink">
                  {es
                    ? "COOPERACIÓN ENTRE BROKERAGES · ACUERDOS POR OPERACIÓN"
                    : "BROKERAGE-TO-BROKERAGE COOPERATION · WRITTEN REFERRAL AGREEMENTS"}
                </p>
                <h2 id="coop-heading" className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                  {es
                    ? "Honorarios negociados por tipo de activo — protegidos por escrito."
                    : "Negotiated referral fees by asset class — protected in writing."}
                </h2>
              </div>

              <div className="inline-flex border border-bone bg-ivory p-1" role="group" aria-label={es ? "Modalidad de cooperación" : "Cooperation mode"}>
                <button
                  type="button"
                  aria-pressed={pipelineMode === "buyer_agency"}
                  onClick={() => setPipelineMode("buyer_agency")}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] ${
                    pipelineMode === "buyer_agency" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/75"
                  }`}
                >
                  {es ? "Agencia de comprador" : "Buyer Agency"}
                </button>
                <button
                  type="button"
                  aria-pressed={pipelineMode === "referral"}
                  onClick={() => setPipelineMode("referral")}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] ${
                    pipelineMode === "referral" ? "bg-navy-deep font-bold text-gold" : "text-navy-deep/75"
                  }`}
                >
                  {es ? "Solo referencia" : "Referral Only"}
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="tablist">
              {pipelineNodes.map((node, idx) => {
                const selected = activePipelineNode === idx;
                return (
                  <button
                    key={node.step}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActivePipelineNode(idx)}
                    className={`flex flex-col border p-4 text-left transition-all ${
                      selected
                        ? "border-gold bg-navy-deep text-white shadow-md"
                        : "border-bone bg-ivory text-navy-deep hover:border-gold/55"
                    }`}
                  >
                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${selected ? "text-gold" : "text-gold-ink"}`}>
                      {node.step}
                    </span>
                    <span className="mt-1.5 font-serif text-base font-semibold">
                      {es ? node.titleEs : node.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border border-gold/50 bg-ivory p-6">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                  {es ? `Etapa ${activeNode.step}` : `Stage ${activeNode.step}`} ·{" "}
                  {pipelineMode === "buyer_agency"
                    ? es ? "Agencia de comprador hasta el cierre" : "Buyer Agency Through Closing"
                    : es ? "Solo referencia" : "Referral Only"}
                </p>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-navy-deep">
                  {pipelineMode === "buyer_agency"
                    ? es ? activeNode.buyerAgencyEs : activeNode.buyerAgencyEn
                    : es ? activeNode.referralEs : activeNode.referralEn}
                </p>
              </div>

              <button
                type="button"
                onClick={() => jumpToRegister("agent")}
                className="inline-flex items-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep hover:bg-gold-soft"
              >
                {es ? "Registrar cliente y recibir condiciones" : "Register a client and receive terms"}
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </section>

        {/* ── 6. Native Registration Desk (HubSpot + WhatsApp + Netlify) ── */}
        <section id="register-desk" className="scroll-mt-24 bg-navy-deep py-16 text-white md:py-24" aria-labelledby="register-desk-heading">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
                {es ? "MESA DE REGISTRO BILATERAL" : "BILATERAL REGISTRATION DESK"}
              </p>
              <h2 id="register-desk-heading" className="mt-3 font-serif text-3xl text-white md:text-4xl">
                {es
                  ? "Regístrese para desbloquear el catálogo IDX y las condiciones por escrito."
                  : "Register to unlock the 2,000+ IDX portfolio and written referral terms."}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/70">
                {es
                  ? "Seleccione su perfil: registro profesional de agente (con licencia) o solicitud directa de comprador."
                  : "Choose your registration path below: licensed agent referral registration or direct buyer IDX inquiry."}
              </p>
            </div>

            <div className="mt-8 flex justify-center border-b border-white/15">
              <button
                type="button"
                onClick={() => setIntakeTab("agent")}
                className={`border-b-2 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  intakeTab === "agent"
                    ? "border-gold bg-white/5 font-bold text-gold"
                    : "border-transparent text-white/65 hover:text-white"
                }`}
              >
                {es ? "01 · Registro de Agente y Referido" : "01 · Agent & Referral Registration"}
              </button>
              <button
                type="button"
                onClick={() => setIntakeTab("buyer")}
                className={`border-b-2 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  intakeTab === "buyer"
                    ? "border-gold bg-white/5 font-bold text-gold"
                    : "border-transparent text-white/65 hover:text-white"
                }`}
              >
                {es ? "02 · Registro de Comprador IDX" : "02 · Buyer IDX Registration"}
              </button>
            </div>

            <div className="mt-8">
              {intakeTab === "agent" ? (
                <ReferralIntakeForm language={lang} initialPurpose="client_referral" sourcePage="gilmar-spain-referral" />
              ) : (
                <BuyerMandateForm variant="gilmar-spain" language={lang} />
              )}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
              <BadgeCheck size={14} className="text-gold" />
              <span>{PUBLIC_COMPLIANCE}</span>
            </div>
          </div>
        </section>

        {/* ── 7. FAQ ──────────────────────────────────────────────── */}
        <section className="bg-ivory py-16 md:py-24" aria-labelledby="gilmar-faq-heading">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold-ink">
                {es ? "PREGUNTAS FRECUENTES" : "FREQUENTLY ASKED QUESTIONS"}
              </p>
              <h2 id="gilmar-faq-heading" className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
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
