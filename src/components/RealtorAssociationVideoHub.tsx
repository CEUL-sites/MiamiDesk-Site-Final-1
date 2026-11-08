import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  ExternalLink,
  Film,
  Play,
  Tv,
  Volume2,
} from "lucide-react";

type Variant = "agents" | "buyers" | "global-desk";

interface BroadcastSpot {
  id: string;
  labelEn: string;
  labelEs: string;
  titleEn: string;
  titleEs: string;
  duration: string;
  sourceLabelEn: string;
  sourceLabelEs: string;
  videoSrc?: string;
  youtubeId?: string;
  posterSrc: string;
  externalHref: string;
}

interface ChannelItem {
  id: string;
  tabLabelEn: string;
  tabLabelEs: string;
  badgeEn: string;
  badgeEs: string;
  titleEn: string;
  titleEs: string;
  summaryEn: string;
  summaryEs: string;
  spots: readonly BroadcastSpot[];
  metrics: readonly { value: string; labelEn: string; labelEs: string }[];
  externalLinks: readonly { labelEn: string; labelEs: string; href: string }[];
}

const CHANNELS: readonly ChannelItem[] = [
  {
    id: "perfect-strangers",
    tabLabelEn: "01 · Only a REALTOR®",
    tabLabelEs: "01 · Only a REALTOR®",
    badgeEn: "MIAMI REALTORS® + RWorld Campaign · Perfect Strangers",
    badgeEs: "Campaña MIAMI REALTORS® + RWorld · Perfect Strangers",
    titleEn: "Perfect Strangers Become Coordinated Closings Through the 93,000-Agent Network.",
    titleEs: "Desconocidos se convierten en cierres coordinados a través de la red de 93,000 agentes.",
    summaryEn:
      "In South Florida, over 90% of residential transactions close through cooperating buyer and seller agents working inside the MLS ecosystem—connecting two sides who never met before.",
    summaryEs:
      "En el sur de Florida, más del 90% de las operaciones residenciales se cierran mediante agentes colaboradores dentro del ecosistema MLS—conectando a compradores y vendedores con seguridad contractual.",
    spots: [
      {
        id: "perfect-strangers-spot",
        labelEn: "Perfect Strangers (0:30)",
        labelEs: "Perfect Strangers (0:30)",
        titleEn: "Only a REALTOR® — Perfect Strangers (Official Campaign Spot)",
        titleEs: "Only a REALTOR® — Perfect Strangers (Spot Oficial)",
        duration: "0:30",
        sourceLabelEn: "RWorld · Native HD Broadcast",
        sourceLabelEs: "RWorld · Emisión HD Nativa",
        videoSrc: "/videos/only_a_realtor_perfect_strangers.mp4",
        posterSrc: "/images/posters/only_a_realtor_perfect_strangers.jpg",
        externalHref: "https://onlyarealtor.com",
      },
      {
        id: "kyle-marie-spot",
        labelEn: "Relocation Story · Kyle & Marie (1:22)",
        labelEs: "Relocalización · Kyle y Marie (1:22)",
        titleEn: "Only a REALTOR® — International Relocation Story (Kyle & Marie)",
        titleEs: "Only a REALTOR® — Historia de Relocalización Internacional (Kyle y Marie)",
        duration: "1:22",
        sourceLabelEn: "RWorld · Native HD Broadcast",
        sourceLabelEs: "RWorld · Emisión HD Nativa",
        videoSrc: "/videos/only_a_realtor_kyle_marie.mp4",
        posterSrc: "/images/posters/only_a_realtor_kyle_marie.jpg",
        externalHref: "https://onlyarealtor.com",
      },
    ],
    metrics: [
      { value: "93,000", labelEn: "MIAMI REALTORS® Members", labelEs: "Miembros MIAMI REALTORS®" },
      { value: ">90%", labelEn: "Cooperating Agent Closings", labelEs: "Cierres entre Agentes" },
      { value: "25 Yrs", labelEn: "Licensed FL Principal", labelEs: "Licencia FL desde 2001" },
    ],
    externalLinks: [
      {
        labelEn: "Only a REALTOR® Official Portal ↗",
        labelEs: "Portal Oficial Only a REALTOR® ↗",
        href: "https://onlyarealtor.com",
      },
      {
        labelEn: "RWorld Videos: Box of Memories ↗",
        labelEs: "RWorld Videos: Box of Memories ↗",
        href: "https://rworldvideos.com/programs/box-of-memories?utm_source=product&utm_medium=share&utm_campaign=content_share&utm_term=2362789&utm_content=copy",
      },
    ],
  },
  {
    id: "box-of-memories",
    tabLabelEn: "02 · Box of Memories",
    tabLabelEs: "02 · Box of Memories",
    badgeEn: "RWorld Videos · Box of Memories & Real Client Transitions",
    badgeEs: "RWorld Videos · Box of Memories y Transiciones Reales",
    titleEn: "Any Agent Can List a Property. Only a REALTOR® Guides the Entire Transition.",
    titleEs: "Cualquier agente publica una propiedad. Solo un REALTOR® guía toda la transición.",
    summaryEn:
      "Featured on RWorld Videos: whether unpacking a first home or packing 24 years of family memories, a licensed REALTOR® underwrites inspections, condo reserves, insurance, and contract timing across Miami-Dade, Broward, and Palm Beach.",
    summaryEs:
      "Destacado en RWorld Videos: ya sea al comprar su primera vivienda o al cerrar 24 años de recuerdos familiares, un REALTOR® con licencia protege inspecciones, reservas de condominio, seguros y plazos contractuales.",
    spots: [
      {
        id: "box-of-memories-spot",
        labelEn: "Box of Memories (0:30)",
        labelEs: "Box of Memories (0:30)",
        titleEn: "Only a REALTOR® — Box of Memories (RWorld Official Spot)",
        titleEs: "Only a REALTOR® — Box of Memories (Spot Oficial RWorld)",
        duration: "0:30",
        sourceLabelEn: "RWorld Videos · Native HD Broadcast",
        sourceLabelEs: "RWorld Videos · Emisión HD Nativa",
        videoSrc: "/videos/only_a_realtor_box_of_memories.mp4",
        posterSrc: "/images/posters/only_a_realtor_box_of_memories.jpg",
        externalHref:
          "https://rworldvideos.com/programs/box-of-memories?utm_source=product&utm_medium=share&utm_campaign=content_share&utm_term=2362789&utm_content=copy",
      },
      {
        id: "spencer-melissa-spot",
        labelEn: "Spencer & Melissa (1:18)",
        labelEs: "Spencer y Melissa (1:18)",
        titleEn: "Only a REALTOR® — Why Repeat Sellers Keep the Same REALTOR®",
        titleEs: "Only a REALTOR® — Por qué los propietarios confían en su REALTOR®",
        duration: "1:18",
        sourceLabelEn: "RWorld · Native HD Broadcast",
        sourceLabelEs: "RWorld · Emisión HD Nativa",
        videoSrc: "/videos/only_a_realtor_spencer_melissa.mp4",
        posterSrc: "/images/posters/only_a_realtor_spencer_melissa.jpg",
        externalHref: "https://onlyarealtor.com",
      },
      {
        id: "ronnie-sandra-spot",
        labelEn: "Ronnie & Sandra (2:10)",
        labelEs: "Ronnie y Sandra (2:10)",
        titleEn: "Only a REALTOR® — Downsizing & Retirement Transition (Ronnie & Sandra)",
        titleEs: "Only a REALTOR® — Transición Patrimonial y Retiro (Ronnie y Sandra)",
        duration: "2:10",
        sourceLabelEn: "RWorld · Native HD Broadcast",
        sourceLabelEs: "RWorld · Emisión HD Nativa",
        videoSrc: "/videos/only_a_realtor_ronnie_sandra.mp4",
        posterSrc: "/images/posters/only_a_realtor_ronnie_sandra.jpg",
        externalHref: "https://onlyarealtor.com",
      },
    ],
    metrics: [
      { value: "3,500+", labelEn: "URG Florida Agents", labelEs: "Agentes URG en Florida" },
      { value: "19", labelEn: "FL Office Locations", labelEs: "Ubicaciones en Florida" },
      { value: "CLHMS", labelEn: "Luxury Specialist", labelEs: "Especialista CLHMS" },
    ],
    externalLinks: [
      {
        labelEn: "Watch 'Box of Memories' on RWorld ↗",
        labelEs: "Ver 'Box of Memories' en RWorld ↗",
        href: "https://rworldvideos.com/programs/box-of-memories?utm_source=product&utm_medium=share&utm_campaign=content_share&utm_term=2362789&utm_content=copy",
      },
      {
        labelEn: "Only a REALTOR® Client Stories ↗",
        labelEs: "Historias Reales Only a REALTOR® ↗",
        href: "https://onlyarealtor.com",
      },
    ],
  },
  {
    id: "nar-thats-who-we-r",
    tabLabelEn: "03 · Why Use a REALTOR®",
    tabLabelEs: "03 · Por qué un REALTOR®",
    badgeEn: "National Association of REALTORS® · That's Who We R® Campaign",
    badgeEs: "National Association of REALTORS® · Campaña That's Who We R®",
    titleEn: "Bound by the REALTOR® Code of Ethics—Not Just a Real Estate License.",
    titleEs: "Sujetos al Código de Ética REALTOR®—no solo a una licencia inmobiliaria.",
    summaryEn:
      "Every REALTOR® is bound by the National Association of REALTORS® Code of Ethics to protect client interests first. Switch between the official NAR campaign spots below or play the native RWorld broadcast.",
    summaryEs:
      "Todo REALTOR® está obligado por el Código de Ética de la National Association of REALTORS® a priorizar los intereses de su cliente. Seleccione cualquiera de los spots oficiales a continuación.",
    spots: [
      {
        id: "nar-chair",
        labelEn: "NAR Spot · Chair (0:15)",
        labelEs: "Spot NAR · Chair (0:15)",
        titleEn: "National Association of REALTORS® — 'Chair' (15-Second Spot)",
        titleEs: "National Association of REALTORS® — 'Chair' (Spot 0:15)",
        duration: "0:15",
        sourceLabelEn: "NAR Official · YouTube Broadcast",
        sourceLabelEs: "NAR Oficial · Emisión YouTube",
        youtubeId: "z71JEYcLC7o",
        posterSrc: "/images/posters/nar_chair.jpg",
        externalHref: "https://www.youtube.com/watch?v=z71JEYcLC7o",
      },
      {
        id: "nar-donut",
        labelEn: "NAR Spot · Donut (0:15)",
        labelEs: "Spot NAR · Donut (0:15)",
        titleEn: "National Association of REALTORS® — 'Donut' (15-Second Spot)",
        titleEs: "National Association of REALTORS® — 'Donut' (Spot 0:15)",
        duration: "0:15",
        sourceLabelEn: "NAR Official · YouTube Broadcast",
        sourceLabelEs: "NAR Oficial · Emisión YouTube",
        youtubeId: "JDjhs9hF9f0",
        posterSrc: "/images/posters/nar_donut.jpg",
        externalHref: "https://www.youtube.com/watch?v=JDjhs9hF9f0",
      },
      {
        id: "nar-dog",
        labelEn: "NAR Spot · Dog (0:15)",
        labelEs: "Spot NAR · Dog (0:15)",
        titleEn: "National Association of REALTORS® — 'Dog' (15-Second Spot)",
        titleEs: "National Association of REALTORS® — 'Dog' (Spot 0:15)",
        duration: "0:15",
        sourceLabelEn: "NAR Official · YouTube Broadcast",
        sourceLabelEs: "NAR Oficial · Emisión YouTube",
        youtubeId: "icZrgxe8K5I",
        posterSrc: "/images/posters/nar_dog.jpg",
        externalHref: "https://www.youtube.com/watch?v=icZrgxe8K5I",
      },
    ],
    metrics: [
      { value: "100%", labelEn: "REALTOR® Code of Ethics", labelEs: "Código de Ética REALTOR®" },
      { value: "260+", labelEn: "U.S. MLSs via RPR", labelEs: "MLS de EE. UU. vía RPR" },
      { value: "SL705771", labelEn: "FL Licensed Since 2001", labelEs: "Licencia FL desde 2001" },
    ],
    externalLinks: [
      {
        labelEn: "NAR Spot · Chair (0:15) ↗",
        labelEs: "Spot NAR · Chair (0:15) ↗",
        href: "https://www.youtube.com/watch?v=z71JEYcLC7o",
      },
      {
        labelEn: "NAR Spot · Donut (0:15) ↗",
        labelEs: "Spot NAR · Donut (0:15) ↗",
        href: "https://www.youtube.com/watch?v=JDjhs9hF9f0",
      },
      {
        labelEn: "NAR Spot · Dog (0:15) ↗",
        labelEs: "Spot NAR · Dog (0:15) ↗",
        href: "https://www.youtube.com/watch?v=icZrgxe8K5I",
      },
    ],
  },
  {
    id: "miami-rankings",
    tabLabelEn: "04 · Miami & Global Rankings",
    tabLabelEs: "04 · Miami y Rankings Globales",
    badgeEn: "MIAMI Association of REALTORS® · Global Market Standing & 437+ Partners",
    badgeEs: "MIAMI Association of REALTORS® · Posicionamiento Global y 437+ Socios",
    titleEn: "#1 U.S. Destination for International Capital & 437+ Partner Associations.",
    titleEs: "Mercado nº 1 en EE. UU. para capital internacional y más de 437 asociaciones socias.",
    summaryEn:
      "Backed by 93,000 MIAMI REALTORS® members, 200+ global portals in 19 languages, and 437+ international partner associations, South Florida connects domestic wealth migration with European and Latin American buyers.",
    summaryEs:
      "Respaldado por 93,000 miembros de MIAMI REALTORS®, más de 200 portales globales en 19 idiomas y más de 437 asociaciones internacionales, el sur de Florida conecta la migración patrimonial con compradores globales.",
    spots: [
      {
        id: "miami-in-rankings",
        labelEn: "Miami in the Rankings (4:52)",
        labelEs: "Miami in the Rankings (4:52)",
        titleEn: "MIAMI Association of REALTORS® — Miami in the Rankings",
        titleEs: "MIAMI Association of REALTORS® — Miami en los Rankings Globales",
        duration: "4:52",
        sourceLabelEn: "MIAMI REALTORS® · Official Broadcast",
        sourceLabelEs: "MIAMI REALTORS® · Emisión Oficial",
        youtubeId: "0OmztZur7pw",
        posterSrc: "/images/posters/miami_in_the_rankings.jpg",
        externalHref: "https://www.youtube.com/watch?v=0OmztZur7pw",
      },
      {
        id: "top-20-miami",
        labelEn: "Top 20 Reasons to Buy in Miami (2:24)",
        labelEs: "Top 20 Razones para Comprar en Miami (2:24)",
        titleEn: "MIAMI Association of REALTORS® — Top 20 Reasons to Visit & Buy in Miami",
        titleEs: "MIAMI Association of REALTORS® — Top 20 Razones para Comprar en Miami",
        duration: "2:24",
        sourceLabelEn: "MIAMI REALTORS® · Official Broadcast",
        sourceLabelEs: "MIAMI REALTORS® · Emisión Oficial",
        youtubeId: "wrKmN-d8WTk",
        posterSrc: "/images/posters/miami_top_20_reasons.jpg",
        externalHref: "https://www.youtube.com/watch?v=wrKmN-d8WTk",
      },
      {
        id: "top-20-broward",
        labelEn: "Top 20 Reasons · Broward (2:11)",
        labelEs: "Top 20 Razones · Broward (2:11)",
        titleEn: "MIAMI Association of REALTORS® — Top 20 Reasons to Visit & Buy in Broward",
        titleEs: "MIAMI Association of REALTORS® — Top 20 Razones para Comprar en Broward",
        duration: "2:11",
        sourceLabelEn: "MIAMI REALTORS® · Official Broadcast",
        sourceLabelEs: "MIAMI REALTORS® · Emisión Oficial",
        youtubeId: "0M0J4PAiYNI",
        posterSrc: "/images/posters/broward_top_20_reasons.jpg",
        externalHref: "https://www.youtube.com/watch?v=0M0J4PAiYNI",
      },
    ],
    metrics: [
      { value: "437+", labelEn: "International Agreements", labelEs: "Acuerdos Internacionales" },
      { value: "200+", labelEn: "Global Portals (19 Langs)", labelEs: "Portales (19 Idiomas)" },
      { value: "11", labelEn: "Direct MLS Data Exchanges", labelEs: "Intercambios Directos MLS" },
    ],
    externalLinks: [
      {
        labelEn: "Miami in the Rankings (YouTube 4:52) ↗",
        labelEs: "Miami in the Rankings (YouTube 4:52) ↗",
        href: "https://www.youtube.com/watch?v=0OmztZur7pw",
      },
      {
        labelEn: "Top 20 Reasons to Buy in Miami ↗",
        labelEs: "Top 20 Razones para Comprar en Miami ↗",
        href: "https://www.youtube.com/watch?v=wrKmN-d8WTk",
      },
      {
        labelEn: "Florida Realtors® Global Network ↗",
        labelEs: "Red Global de Florida Realtors® ↗",
        href: "https://www.floridarealtors.org/global",
      },
    ],
  },
] as const;

const HEADER_COPY: Record<
  Variant,
  {
    eyebrowEn: string;
    eyebrowEs: string;
    headingEn: string;
    headingEs: string;
    subEn: string;
    subEs: string;
    ctaLabelEn: string;
    ctaLabelEs: string;
    ctaHref: string;
  }
> = {
  agents: {
    eyebrowEn: "MIAMI REALTORS® + RWorld + NAR · Official Broadcast Archive",
    eyebrowEs: "MIAMI REALTORS® + RWorld + NAR · Archivo Oficial de Campaña",
    headingEn: "Why the 93,000-Agent REALTOR® Network Wins for Your Clients",
    headingEs: "Por qué la red de 93,000 agentes REALTOR® impulsa a sus clientes",
    subEn:
      "Watch the official 'Only a REALTOR® — Perfect Strangers' and 'Box of Memories' films alongside NAR's 'That's Who We R®' and MIAMI REALTORS® global broadcasts.",
    subEs:
      "Vea los films oficiales 'Only a REALTOR® — Perfect Strangers' y 'Box of Memories' junto a las campañas de la NAR y MIAMI REALTORS®.",
    ctaLabelEn: "Register a Client Referral or Co-Listing",
    ctaLabelEs: "Registrar un Referido o Co-Exclusiva",
    ctaHref: "#south-florida-referral",
  },
  buyers: {
    eyebrowEn: "Only a REALTOR® + NAR · Buyer Protection & MLS Intelligence",
    eyebrowEs: "Only a REALTOR® + NAR · Protección al Comprador e Inteligencia MLS",
    headingEn: "The REALTOR® Advantage Behind Every South Florida Acquisition",
    headingEs: "La ventaja de contar con un REALTOR® en el sur de Florida",
    subEn:
      "Watch 'Only a REALTOR® — Perfect Strangers', 'Box of Memories', and the official NAR & MIAMI REALTORS® broadcasts on why buyers rely on a licensed REALTOR®.",
    subEs:
      "Vea 'Only a REALTOR® — Perfect Strangers', 'Box of Memories' y las emisiones oficiales sobre cómo un REALTOR® protege su compra.",
    ctaLabelEn: "Request a Private Buyer Consultation",
    ctaLabelEs: "Solicitar Consulta Privada de Comprador",
    ctaHref: "#buyer-mandate",
  },
  "global-desk": {
    eyebrowEn: "MIAMI REALTORS® + RWorld · Global Broadcast Showcase",
    eyebrowEs: "MIAMI REALTORS® + RWorld · Escaparate Audiovisual Global",
    headingEn: "Inside the World's Largest Local REALTOR® Ecosystem",
    headingEs: "Dentro de la asociación local de REALTORS® más grande del mundo",
    subEn:
      "Explore the official RWorld 'Only a REALTOR®' films and MIAMI REALTORS® global market broadcasts connecting 93,000 member agents with 437+ international partner associations.",
    subEs:
      "Explore los films oficiales 'Only a REALTOR®' y las emisiones de MIAMI REALTORS® que conectan a 93,000 agentes con más de 437 asociaciones internacionales.",
    ctaLabelEn: "Request a Private Global Desk Discussion",
    ctaLabelEs: "Solicitar Conversación Privada Global Desk",
    ctaHref: "#listing-request",
  },
};

export function RealtorAssociationVideoHub({
  variant = "agents",
  lang = "en",
}: {
  variant?: Variant;
  lang?: "en" | "es";
}) {
  const [activeChannelIndex, setActiveChannelIndex] = useState(
    variant === "buyers" ? 1 : 0,
  );
  const [activeSpotIndex, setActiveSpotIndex] = useState(0);
  const [engagedYoutubeId, setEngagedYoutubeId] = useState<string | null>(null);

  const es = lang === "es";
  const header = HEADER_COPY[variant];
  const currentChannel = CHANNELS[activeChannelIndex];
  const currentSpot =
    currentChannel.spots[activeSpotIndex] ?? currentChannel.spots[0];

  const handleSelectChannel = (idx: number) => {
    setActiveChannelIndex(idx);
    setActiveSpotIndex(0);
    setEngagedYoutubeId(null);
  };

  const handleSelectSpot = (idx: number) => {
    setActiveSpotIndex(idx);
    setEngagedYoutubeId(null);
  };

  const ytEmbedUrl = currentSpot.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${currentSpot.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null;

  return (
    <section
      aria-label={es ? header.eyebrowEs : header.eyebrowEn}
      className="border-y border-bone bg-[#060F1E] py-14 text-white md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Top Header Row */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-gold/35 bg-gold/10 px-3 py-1">
              <Film size={13} className="text-gold" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                {es ? header.eyebrowEs : header.eyebrowEn}
              </span>
            </div>
            <h2 className="mt-3.5 font-serif text-3xl leading-tight text-white md:text-4xl">
              {es ? header.headingEs : header.headingEn}
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-white/70">
            {es ? header.subEs : header.subEn}
          </p>
        </div>

        {/* 4-Channel Interactive Selector Bar */}
        <div
          role="tablist"
          aria-label={es ? header.headingEs : header.headingEn}
          className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-4"
        >
          {CHANNELS.map((ch, idx) => {
            const isSelected = activeChannelIndex === idx;
            return (
              <button
                key={ch.id}
                type="button"
                role="tab"
                id={`realtor-hub-tab-${variant}-${ch.id}`}
                aria-selected={isSelected}
                aria-controls={`realtor-hub-panel-${variant}-${ch.id}`}
                onClick={() => handleSelectChannel(idx)}
                className={`flex items-center justify-between gap-2 border px-4 py-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-gold bg-gold text-[#060F1E] font-semibold shadow-lg"
                    : "border-white/15 bg-white/[0.04] text-white/80 hover:border-gold/60 hover:text-white"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                  {es ? ch.tabLabelEs : ch.tabLabelEn}
                </span>
                <Tv size={14} className={isSelected ? "text-[#060F1E]" : "text-gold"} />
              </button>
            );
          })}
        </div>

        {/* Main Split Showcase Stage */}
        <div
          id={`realtor-hub-panel-${variant}-${currentChannel.id}`}
          role="tabpanel"
          aria-labelledby={`realtor-hub-tab-${variant}-${currentChannel.id}`}
          className="mt-4 grid gap-6 border border-white/15 bg-[#0A192F] p-5 shadow-2xl lg:grid-cols-12 lg:items-start lg:gap-8 lg:p-7"
        >
          {/* Left 7 Cols: Official Campaign Player + Sub-Spot Switcher */}
          <div className="lg:col-span-7">
            {/* Sub-spot selector bar when a channel has multiple official films */}
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border border-white/12 bg-black/35 px-3 py-2">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                <Volume2 size={12} className="text-gold" />
                {es ? "Seleccionar Spot Oficial:" : "Select Official Spot:"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentChannel.spots.map((spot, sIdx) => {
                  const active = sIdx === activeSpotIndex;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleSelectSpot(sIdx)}
                      className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors cursor-pointer ${
                        active
                          ? "bg-gold text-[#060F1E] font-semibold"
                          : "border border-white/15 bg-white/[0.04] text-white/75 hover:border-gold/50 hover:text-white"
                      }`}
                    >
                      {es ? spot.labelEs : spot.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Video Stage */}
            <div className="relative aspect-video w-full overflow-hidden border border-gold/35 bg-black shadow-xl">
              {currentSpot.videoSrc ? (
                <video
                  key={currentSpot.videoSrc}
                  src={currentSpot.videoSrc}
                  poster={currentSpot.posterSrc}
                  controls
                  playsInline
                  autoPlay
                  muted
                  loop
                  preload="metadata"
                  className="h-full w-full object-cover"
                  aria-label={es ? currentSpot.titleEs : currentSpot.titleEn}
                />
              ) : engagedYoutubeId === currentSpot.youtubeId && ytEmbedUrl ? (
                <iframe
                  key={currentSpot.youtubeId}
                  src={ytEmbedUrl}
                  title={es ? currentSpot.titleEs : currentSpot.titleEn}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <div className="relative h-full w-full">
                  <img
                    src={currentSpot.posterSrc}
                    alt={es ? currentSpot.titleEs : currentSpot.titleEn}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E]/90 via-[#060F1E]/35 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        currentSpot.youtubeId &&
                        setEngagedYoutubeId(currentSpot.youtubeId)
                      }
                      className="group inline-flex items-center gap-3 border border-gold bg-[#060F1E]/90 px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-gold hover:text-[#060F1E] cursor-pointer"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-[#060F1E] transition-transform group-hover:scale-105">
                        <Play size={14} fill="currentColor" />
                      </span>
                      {es
                        ? `Reproducir Spot Oficial (${currentSpot.duration})`
                        : `Play Official Broadcast (${currentSpot.duration})`}
                    </button>
                    <p className="mt-3 max-w-md font-serif text-base text-white">
                      {es ? currentSpot.titleEs : currentSpot.titleEn}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Spot Caption & Direct Source Links */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
              <div>
                <p className="font-serif text-sm text-white">
                  {es ? currentSpot.titleEs : currentSpot.titleEn}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                  {es ? currentSpot.sourceLabelEs : currentSpot.sourceLabelEn} ·{" "}
                  {currentSpot.duration}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {currentChannel.externalLinks.map((link) => (
                  <a
                    key={link.href + link.labelEn}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-white/80 underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold"
                  >
                    {es ? link.labelEs : link.labelEn}
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Executive Takeaway, Metrics & Direct Action */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                {es ? currentChannel.badgeEs : currentChannel.badgeEn}
              </p>
              <h3 className="mt-2.5 font-serif text-2xl leading-snug text-white">
                {es ? currentChannel.titleEs : currentChannel.titleEn}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/75">
                {es ? currentChannel.summaryEs : currentChannel.summaryEn}
              </p>

              {/* 3 Metric Chips */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/15 py-4">
                {currentChannel.metrics.map((m) => (
                  <div key={m.labelEn} className="bg-white/[0.03] px-2.5 py-2 text-center">
                    <p className="font-serif text-xl text-gold">{m.value}</p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/65">
                      {es ? m.labelEs : m.labelEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={header.ctaHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#060F1E] transition-colors hover:bg-gold-light"
              >
                {es ? header.ctaLabelEs : header.ctaLabelEn}
                <ArrowRight size={13} />
              </a>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                <BadgeCheck size={13} className="text-gold" />
                FL SL705771 · United Realty Group
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
