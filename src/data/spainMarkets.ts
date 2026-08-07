// ──────────────────────────────────────────────────────────────────────────
// Spain market records for the /vender-<market> landing pages.
//
// These are the Spain-side counterpart to the 17 /sell-<city> South Florida
// pages. Until now the entire Spain funnel was one generic /global-desk page,
// so an owner searching "vender villa Marbella comprador americano" had
// nowhere to land.
//
// COMPLIANCE (see CLAUDE.md):
//   · No invented figures. Every number rendered on these pages comes from
//     src/data/figures.json via the shared NETWORK_FIGURES block in the page
//     template — market records carry NO statistics of their own, precisely so
//     a plausible-sounding "average price in Marbella rose X%" can never be
//     introduced here without a source.
//   · No guarantee of sale, price, or timeline.
//   · Carlos is licensed in FLORIDA ONLY. Every record's `structure` field
//     restates that local Spanish representation stays with licensed Spanish
//     agencies. The template renders it on every page — it is not optional
//     garnish, it is the compliance spine of the Spain proposition.
//
// Each record's substance is market-specific (who actually buys there, which
// submarkets, and why that connects to a Miami-area buyer agent). Two markets
// read differently because the facts differ — not because wording was
// shuffled. Keep it that way when adding one.
// ──────────────────────────────────────────────────────────────────────────

export interface SpainMarket {
  /** URL slug — page lives at /vender-<slug> */
  slug: string;
  /** Market name as used in prose and headings */
  name: string;
  /** Wider region, for meta and breadcrumbs */
  region: string;
  /** <title> */
  title: string;
  /** Meta description — under 160 chars */
  description: string;
  keywords: string;
  /** H1 second line (italic gold) */
  heroTitle: string;
  /** Hero supporting paragraph */
  heroSub: string;
  /** Why this market connects to a Miami buyer — the core argument */
  whyHeading: string;
  whyBody: string;
  /** Three qualitative cards. No numbers — see compliance note above. */
  cards: { label: string; value: string; sub: string }[];
  /** Named submarkets an owner will recognise */
  submarkets: string[];
  /** What makes the Miami connection concrete for this market specifically */
  miamiLink: string;
  faqs: { q: string; a: string }[];
}

/** Shared across every Spain page — the licensing boundary, stated plainly. */
export const SPAIN_STRUCTURE =
  "Miami Global Listing Desk es un servicio de distribución internacional operado por Carlos Uzcategui, Florida Realtor® SL705771, a través de United Realty Group. Carlos está colegiado en Florida — no en España. La representación local en España (visitas, negociación y cualificación del comprador) la mantiene su agencia española con licencia. Toda actividad de MLS, portal, corretaje o cooperación está sujeta a requisitos de corretaje, plataforma y cumplimiento. No se garantiza colocación, comprador, precio ni venta.";

export const SPAIN_MARKETS: SpainMarket[] = [
  {
    slug: "vender-marbella",
    name: "Marbella",
    region: "Costa del Sol, Málaga",
    title: "Vender una Propiedad en Marbella a Compradores de Miami | Miami Global Listing Desk",
    description:
      "Prepare su villa o ático de Marbella para agentes compradores del área de Miami. Su agencia española sigue siendo la suya. Carlos Uzcategui, Florida Realtor® SL705771.",
    keywords:
      "vender villa Marbella, vender propiedad Marbella comprador americano, Marbella Puerto Banús vender, vender ático Marbella, Milla de Oro Marbella venta, comprador estadounidense Marbella, Costa del Sol vender propiedad internacional",
    heroTitle: "ante los agentes compradores del área de Miami.",
    heroSub:
      "Marbella ya vende a un comprador internacional. Lo que rara vez ocurre es que ese inventario llegue preparado —con datos claros y materiales bilingües— al escritorio del Realtor® que representa al comprador estadounidense. Ese es el hueco que cubre esta mesa.",
    whyHeading: "El comprador americano de Marbella casi nunca llega solo. Llega con su agente.",
    whyBody:
      "En Estados Unidos el comprador trabaja con su propio agente, y ese agente espera una ficha profesional: superficie construida y parcela declaradas por separado, régimen de propiedad, cargas comunitarias, IBI, estado de licencias y una descripción que no dependa de adjetivos. Un anuncio de portal español, traducido literalmente, no responde a ninguna de esas preguntas — y el agente pasa a la siguiente propiedad. Preparar la propiedad para esa conversación es un trabajo distinto de publicarla.",
    cards: [
      {
        label: "Perfil del comprador",
        value: "Internacional consolidado",
        sub: "Norte de Europa, Reino Unido y Oriente Medio, con presencia estadounidense creciente en el segmento villa",
      },
      {
        label: "Producto dominante",
        value: "Villa y ático en urbanización",
        sub: "Parcela privada, seguridad perimetral y servicios — el formato que el comprador de Miami ya entiende",
      },
      {
        label: "Paralelismo con Miami",
        value: "Estilo de vida equivalente",
        sub: "Golf, puerto deportivo y residencia de temporada — el mismo criterio de compra que un agente de Miami trabaja a diario",
      },
    ],
    submarkets: [
      "Milla de Oro",
      "Puerto Banús",
      "Nueva Andalucía",
      "Sierra Blanca",
      "La Zagaleta",
      "Nagüeles",
      "Los Monteros",
      "Marbella Club",
      "Benahavís",
      "Estepona (Nueva Milla de Oro)",
    ],
    miamiLink:
      "El comprador de una villa en la Milla de Oro y el de una casa frente al agua en Coral Gables o Fort Lauderdale evalúan lo mismo: privacidad, seguridad, agua o golf a pie de parcela, y una comunidad internacional ya formada. Un agente comprador de Miami no necesita que le expliquen ese perfil — necesita la ficha técnica en un formato que pueda reenviar a su cliente.",
    faqs: [
      {
        q: "¿Pierdo a mi agencia de Marbella si entro en esta mesa?",
        a: "No. Su agencia española mantiene la relación con usted, las visitas, la negociación local y la cualificación del comprador. Carlos es Realtor® colegiado en Florida, no en España: su función es preparar la propiedad para agentes compradores del área de Miami y canalizar la cooperación profesional cuando corresponda. La estructura está pensada para sumarse a su representación local, no para sustituirla.",
      },
      {
        q: "¿Qué tipo de propiedad de Marbella encaja?",
        a: "Encaja mejor la propiedad que soporta el escrutinio de un comprador extranjero: titularidad clara, licencias en regla, superficies verificables y comunidad con cuentas ordenadas. El formato —villa, ático, obra nueva— importa menos que la calidad de la documentación. Carlos revisa cada solicitud y responde con una valoración de encaje franca, incluida la respuesta negativa cuando la propiedad no tiene recorrido con este comprador.",
      },
      {
        q: "¿Se publica mi propiedad en el MLS de Miami?",
        a: "No automáticamente. Cualquier actividad de MLS, portal o corretaje está sujeta a las normas de la plataforma, a los requisitos de elegibilidad de la propiedad y al marco de cumplimiento aplicable — y varía según el caso. Lo que sí es constante es la preparación profesional del material y la vía de cooperación con agentes compradores a través de United Realty Group. No se promete colocación.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "En la vía de exclusiva, la comisión la paga el vendedor al cierre — sin cuota mensual. Los planes de activación de cartera se detallan en propuesta privada, operación por operación. Los términos comerciales se tratan siempre por escrito y en privado antes de cualquier activación.",
      },
    ],
  },
  {
    slug: "vender-madrid",
    name: "Madrid",
    region: "Comunidad de Madrid",
    title: "Vender un Piso o Villa en Madrid a Compradores Latinoamericanos de Miami | Global Listing Desk",
    description:
      "Salamanca, Chamberí, La Moraleja: prepare su propiedad de Madrid para agentes compradores del área de Miami. Carlos Uzcategui, Florida Realtor® SL705771.",
    keywords:
      "vender piso Madrid comprador internacional, vender propiedad barrio Salamanca, vender chalet La Moraleja, Madrid vender comprador latinoamericano, vender ático Madrid, Puerta de Hierro venta, Chamberí vender piso",
    heroTitle: "ante el mismo comprador que ya opera en Miami.",
    heroSub:
      "Madrid y Miami comparten comprador. Las familias mexicanas, venezolanas, colombianas y argentinas que compran en Salamanca o La Moraleja son, con frecuencia, las mismas que ya tienen patrimonio en Brickell, Key Biscayne o Coral Gables — y muchas trabajan con un agente en Miami.",
    whyHeading: "Madrid es el mercado español con el solape más directo con la cartera de un agente de Miami.",
    whyBody:
      "No es una afinidad cultural genérica: es el mismo perfil patrimonial moviéndose entre dos ciudades. Un agente comprador de Miami que ya representa a una familia latinoamericana en Brickell entiende sin traducción qué significa un piso en Jerónimos o un chalet en Puerta de Hierro. Lo que le falta no es contexto — es una ficha profesional en su formato, con superficies, régimen de comunidad y cargas expresados como él los lee.",
    cards: [
      {
        label: "Perfil del comprador",
        value: "Capital latinoamericano",
        sub: "El grupo que los agentes del área de Miami ya representan a diario en su propio mercado",
      },
      {
        label: "Producto dominante",
        value: "Piso señorial y chalet",
        sub: "Vivienda clásica rehabilitada en el centro y chalet en urbanización al norte",
      },
      {
        label: "Paralelismo con Miami",
        value: "Cartera compartida",
        sub: "Una misma familia con patrimonio en las dos ciudades — el solape más directo de todos los mercados españoles",
      },
    ],
    submarkets: [
      "Barrio de Salamanca",
      "Jerónimos",
      "Chamberí",
      "Almagro",
      "Chamartín",
      "El Viso",
      "La Moraleja",
      "Puerta de Hierro",
      "Aravaca",
      "Pozuelo de Alarcón",
    ],
    miamiLink:
      "La familia que compra en Recoletos y la que compra en Key Biscayne responden al mismo criterio: seguridad jurídica, colegio internacional cerca, liquidez de la zona y una comunidad que ya conoce. Un agente de Miami que trabaja ese perfil puede evaluar una propiedad de Madrid en minutos — siempre que la ficha esté completa y en su idioma profesional.",
    faqs: [
      {
        q: "¿Por qué un comprador de Miami miraría Madrid?",
        a: "Porque en muchos casos ya está mirando. El patrimonio latinoamericano que sostiene buena parte del prime madrileño tiene con frecuencia presencia simultánea en el sur de Florida, y ese comprador se apoya en su agente estadounidense para operar. La mesa no crea esa demanda: la hace visible en el canal profesional donde ese agente trabaja.",
      },
      {
        q: "¿Mi agencia de Madrid sigue llevando la operación?",
        a: "Sí. Carlos es Realtor® colegiado en Florida, no en España. Las visitas, la negociación local y la cualificación del comprador en España las gestiona su agencia con licencia. La mesa aporta la preparación profesional del material y la vía de cooperación con agentes compradores del área de Miami, sin alterar su relación local.",
      },
      {
        q: "¿Sirve para un piso, o hace falta una cartera?",
        a: "Una sola propiedad es válida — no se requiere cartera. La vía de exclusiva está pensada exactamente para eso: una propiedad concreta, acuerdo a seis meses, comisión pagada por el vendedor al cierre y sin cuota mensual. Los planes de cartera existen para promotores y agencias con varias unidades.",
      },
      {
        q: "¿En qué idioma se prepara el material?",
        a: "Bilingüe. La ficha profesional se prepara en español e inglés porque el agente comprador y su cliente final rara vez leen el mismo idioma. Esa duplicidad es parte del trabajo de preparación, no un extra: un material que el agente no puede reenviar tal cual a su cliente no circula.",
      },
    ],
  },
  {
    slug: "vender-costa-blanca",
    name: "Costa Blanca",
    region: "Alicante, Comunidad Valenciana",
    title: "Vender una Villa en la Costa Blanca a Compradores Internacionales de Miami | Global Listing Desk",
    description:
      "Jávea, Moraira, Altea, Dénia: prepare su propiedad de la Costa Blanca para agentes compradores del área de Miami. Carlos Uzcategui, Florida Realtor® SL705771.",
    keywords:
      "vender villa Jávea, vender casa Moraira, vender propiedad Altea, Costa Blanca vender comprador extranjero, vender villa Dénia, Alicante vender propiedad internacional, Benissa vender casa",
    heroTitle: "ante un canal profesional que aún no ha explorado.",
    heroSub:
      "La Costa Blanca lleva décadas vendiendo a comprador extranjero, casi siempre por el mismo canal: portales y agencias orientadas al mercado británico, alemán, belga y neerlandés. El comprador estadounidense apenas aparece — no por falta de encaje, sino porque el inventario nunca llega a su agente.",
    whyHeading: "Un mercado con recorrido internacional demostrado y un canal sin explotar.",
    whyBody:
      "Jávea, Moraira o Altea ya han resuelto lo difícil: producto consolidado, comunidad extranjera establecida, servicios y conectividad. Lo que no se ha construido es la vía hacia el agente comprador estadounidense, un profesional acostumbrado a trabajar con ficha técnica formal y compensación documentada entre corredores. Presentar la propiedad en ese formato abre una demanda que el canal norteeuropeo no cubre.",
    cards: [
      {
        label: "Perfil del comprador",
        value: "Norteeuropeo establecido",
        sub: "Británico, alemán, belga y neerlandés — un canal maduro, pero uno solo",
      },
      {
        label: "Producto dominante",
        value: "Villa con vistas al mar",
        sub: "Parcela independiente, piscina y orientación — producto de segunda residencia consolidado",
      },
      {
        label: "Oportunidad",
        value: "Canal estadounidense abierto",
        sub: "El agente comprador de EE. UU. es un interlocutor que este mercado aún no ha trabajado de forma sistemática",
      },
    ],
    submarkets: [
      "Jávea (Xàbia)",
      "Moraira",
      "Altea",
      "Dénia",
      "Benissa Costa",
      "Calpe",
      "Alfaz del Pi",
      "Albir",
      "Finestrat",
      "Santa Pola",
    ],
    miamiLink:
      "El comprador de una villa con vistas en Jávea y el de una casa en un canal navegable de Fort Lauderdale o Pompano Beach comparten criterio: segunda residencia, mantenimiento previsible, clima y una comunidad internacional ya asentada. El agente de Miami trabaja ese perfil todo el año; lo que no ha visto es inventario español presentado en su formato profesional.",
    faqs: [
      {
        q: "Mi propiedad no es de lujo extremo. ¿Encaja igualmente?",
        a: "Puede encajar. El criterio no es el precio sino la claridad: titularidad sin cargas ocultas, licencias en regla, superficies verificables y comunidad ordenada. Una villa correctamente documentada en un rango medio compite mejor por la atención de un agente comprador que una propiedad cara con documentación confusa. Carlos responde con una valoración de encaje franca en ambos sentidos.",
      },
      {
        q: "Ya trabajo con varias agencias en la zona. ¿Hay conflicto?",
        a: "En la vía de exclusiva se acuerda una relación concreta sobre una propiedad determinada; en el plan de activación, no. La estructura se define por escrito antes de cualquier actividad, precisamente para que la relación con sus agencias locales quede clara desde el principio. Su representación local en España la mantiene su agencia con licencia — Carlos está colegiado en Florida.",
      },
      {
        q: "¿Qué recibo exactamente?",
        a: "Preparación profesional del material en español e inglés, con los datos que un agente comprador estadounidense necesita para evaluar y reenviar, y una vía de cooperación profesional a través de United Realty Group cuando corresponda. La exposición es infraestructura: no se garantiza colocación, comprador ni venta.",
      },
      {
        q: "¿Cuánto tarda el proceso?",
        a: "La revisión inicial y la propuesta escrita son rápidas. La preparación del material depende de la documentación disponible de la propiedad. Lo que no puede fijarse por adelantado es el tiempo hasta un comprador: eso depende del mercado, del precio y de factores fuera del control de cualquier profesional, y nadie que le prometa un plazo se lo puede sostener.",
      },
    ],
  },
  {
    slug: "vender-ibiza",
    name: "Ibiza",
    region: "Islas Baleares",
    title: "Vender una Propiedad en Ibiza a Compradores Internacionales de Miami | Global Listing Desk",
    description:
      "Prepare su villa o finca de Ibiza para agentes compradores del área de Miami. Su agencia balear sigue siendo la suya. Carlos Uzcategui, Florida Realtor® SL705771.",
    keywords:
      "vender villa Ibiza, vender finca Ibiza, vender propiedad Ibiza comprador americano, Ibiza venta propiedad lujo, Santa Eulalia vender casa, San José Ibiza vender villa, Baleares vender propiedad internacional",
    heroTitle: "ante el comprador estadounidense que ya conoce la isla.",
    heroSub:
      "Ibiza es una marca global antes que un mercado inmobiliario. El comprador estadounidense de alto patrimonio conoce la isla — el problema no es el reconocimiento, es que cuando decide comprar, su agente no encuentra inventario presentado en un formato profesional que pueda evaluar.",
    whyHeading: "Reconocimiento de marca máximo, canal profesional mínimo.",
    whyBody:
      "Pocos mercados españoles tienen la notoriedad internacional de Ibiza y, a la vez, tan poca infraestructura de cooperación entre corredores con Estados Unidos. La operación ultra-prime en la isla se mueve por redes privadas y discreción, lo que protege al vendedor pero estrecha el conjunto de compradores. Una vía profesional y confidencial hacia agentes compradores del área de Miami amplía ese conjunto sin publicar la propiedad en abierto.",
    cards: [
      {
        label: "Perfil del comprador",
        value: "Ultra-prime internacional",
        sub: "Patrimonio alto, decisión rápida y expectativa de discreción absoluta",
      },
      {
        label: "Producto dominante",
        value: "Villa y finca payesa",
        sub: "Parcela amplia, privacidad y a menudo licencia turística — con documentación que exige rigor",
      },
      {
        label: "Requisito operativo",
        value: "Confidencialidad",
        sub: "La cooperación profesional entre corredores permite alcance sin exposición pública",
      },
    ],
    submarkets: [
      "Santa Eulalia del Río",
      "San José (Sant Josep)",
      "San Juan (Sant Joan)",
      "Ibiza ciudad · Dalt Vila",
      "Talamanca",
      "Cala Jondal",
      "Es Cubells",
      "San Antonio",
      "Roca Llisa",
      "Formentera",
    ],
    miamiLink:
      "El comprador de una finca en San José y el de una propiedad en Star Island o Bal Harbour operan igual: por referencia, con discreción y a través de un profesional de confianza que filtra antes de enseñar. La cooperación entre corredores está diseñada exactamente para eso — alcanzar al comprador correcto sin poner la propiedad en un escaparate público.",
    faqs: [
      {
        q: "No quiero que mi propiedad se publique en abierto. ¿Es posible?",
        a: "Sí, y es el modo habitual en este segmento. La cooperación profesional entre corredores permite que agentes compradores cualificados conozcan una propiedad sin publicación pública. El alcance del material y quién puede verlo se define por escrito antes de cualquier actividad.",
      },
      {
        q: "Mi propiedad tiene licencia turística. ¿Cambia algo?",
        a: "Cambia la documentación, y para mejor si está en regla: el rendimiento por alquiler es un argumento que el comprador de inversión estadounidense entiende bien. También exige rigor — la normativa balear es estricta y un agente comprador preguntará por la licencia en la primera conversación. La ficha profesional debe recogerlo con precisión.",
      },
      {
        q: "¿Carlos está colegiado en España?",
        a: "No. Carlos Uzcategui es Realtor® colegiado en Florida (SL705771) y opera a través de United Realty Group. No presta servicios de intermediación en España: la representación local —visitas, negociación y cualificación del comprador— la mantiene su agencia balear con licencia. La mesa se ocupa exclusivamente de la preparación y la activación del lado de Miami.",
      },
      {
        q: "¿Qué pasa si no encaja?",
        a: "Se lo dirá. Carlos revisa cada solicitud personalmente y responde con una valoración de encaje franca, incluida la negativa. Una propiedad sin recorrido con este comprador no mejora por entrar en un programa de activación, y decírselo cuesta menos que descubrirlo seis meses después.",
      },
    ],
  },
  {
    slug: "vender-barcelona",
    name: "Barcelona",
    region: "Cataluña",
    title: "Vender un Piso o Casa en Barcelona a Compradores de Miami | Miami Global Listing Desk",
    description:
      "Eixample, Sarrià-Sant Gervasi, Pedralbes: prepare su propiedad de Barcelona para agentes compradores del área de Miami. Carlos Uzcategui, Florida Realtor® SL705771.",
    keywords:
      "vender piso Barcelona comprador internacional, vender casa Pedralbes, vender ático Eixample, Sarrià Sant Gervasi vender piso, Barcelona vender propiedad extranjero, Diagonal Mar vender, vender torre Barcelona",
    heroTitle: "ante agentes compradores del área de Miami.",
    heroSub:
      "Barcelona vende a comprador internacional con naturalidad, pero casi siempre europeo. El comprador estadounidense —que asocia la ciudad con calidad de vida urbana, no con segunda residencia de playa— llega por otra vía y con otras preguntas.",
    whyHeading: "Una ciudad que el comprador estadounidense evalúa como destino urbano, no como resort.",
    whyBody:
      "Eso cambia la ficha. Donde el comprador de costa pregunta por parcela y orientación, el comprador urbano estadounidense pregunta por año de rehabilitación, ascensor, eficiencia energética, régimen de la comunidad, ruido y aparcamiento. Son datos que el anuncio español medio no destaca y que un agente de Miami necesita antes de enseñar nada a su cliente. Preparar la propiedad para esa conversación es un trabajo de traducción técnica, no solo idiomática.",
    cards: [
      {
        label: "Perfil del comprador",
        value: "Urbano internacional",
        sub: "Europeo consolidado, con demanda estadounidense ligada a traslado profesional y calidad de vida",
      },
      {
        label: "Producto dominante",
        value: "Piso señorial y torre",
        sub: "Finca regia rehabilitada en el Eixample y casa unifamiliar en la zona alta",
      },
      {
        label: "Dato decisivo",
        value: "Rehabilitación y comunidad",
        sub: "Año de reforma, estado del edificio y cuentas de la comunidad pesan más aquí que en cualquier mercado de costa",
      },
    ],
    submarkets: [
      "Eixample Dreta",
      "Sarrià-Sant Gervasi",
      "Pedralbes",
      "Les Corts",
      "Gràcia",
      "Diagonal Mar",
      "El Born · Ciutat Vella",
      "Turó Parc",
      "Bonanova",
      "Sitges",
    ],
    miamiLink:
      "El comprador de un ático en el Eixample y el de un piso alto en Brickell o Downtown Miami buscan lo mismo: ciudad densa y caminable, servicios a pie de calle y un activo urbano con liquidez. El agente de Miami que trabaja producto de torre reconoce ese perfil de inmediato — necesita la ficha del edificio, no solo fotos del salón.",
    faqs: [
      {
        q: "¿Qué documentación necesito reunir?",
        a: "Cuanta más, mejor evaluación recibirá: nota simple, superficies (construida y útil, por separado), año de construcción y de rehabilitación, cédula de habitabilidad, certificado energético, cuota y estado de cuentas de la comunidad, y derramas aprobadas o previstas. La ausencia de alguno no impide la consulta inicial — solo hace la primera respuesta menos precisa.",
      },
      {
        q: "¿Mi agencia de Barcelona sigue llevando la propiedad?",
        a: "Sí. Carlos está colegiado en Florida, no en España. Su agencia catalana con licencia mantiene las visitas, la negociación local y la cualificación del comprador. La mesa aporta la preparación bilingüe del material y la vía de cooperación con agentes compradores del área de Miami.",
      },
      {
        q: "¿Hay demanda estadounidense real en Barcelona?",
        a: "La demanda estadounidense en Barcelona se asocia sobre todo a traslado profesional, estancias prolongadas y compra patrimonial urbana, con un perfil distinto al de la costa. Es un conjunto más reducido que el europeo, y por eso llegar a él exige un canal profesional en lugar de esperar a que aparezca en un portal. No se garantiza comprador ni resultado.",
      },
      {
        q: "¿Puedo presentar varias propiedades?",
        a: "Sí. Una sola propiedad es válida bajo la vía de exclusiva; para varias unidades o una promoción existe el plan de activación de cartera, con estructura de referidos a través de United Realty Group. Los términos se detallan en propuesta privada.",
      },
    ],
  },
  {
    slug: "vender-valencia",
    name: "Valencia",
    region: "Comunidad Valenciana",
    title: "Vender una Propiedad en Valencia a Compradores Internacionales de Miami | Global Listing Desk",
    description:
      "Ruzafa, El Cabanyal, La Eliana: prepare su propiedad de Valencia para agentes compradores del área de Miami. Carlos Uzcategui, Florida Realtor® SL705771.",
    keywords:
      "vender piso Valencia comprador extranjero, vender casa La Eliana, vender piso Ruzafa, El Cabanyal vender propiedad, Valencia vender comprador internacional, vender chalet Rocafort, Valencia venta propiedad americano",
    heroTitle: "ante un comprador estadounidense que aún no la ha descubierto.",
    heroSub:
      "Valencia se ha convertido en uno de los destinos de traslado internacional con mayor tracción de España. El reconocimiento entre compradores estadounidenses, sin embargo, va muy por detrás de la realidad de la ciudad — y ahí hay recorrido.",
    whyHeading: "Un mercado en fase de descubrimiento, no de saturación.",
    whyBody:
      "A diferencia de Marbella o Ibiza, Valencia no llega al comprador estadounidense con la marca ya hecha. Eso obliga a que el material haga más trabajo: explicar la ciudad, no solo la propiedad. Un agente comprador de Miami que nunca ha operado en Valencia necesita el contexto —conectividad, servicios, tipo de barrio, coste de vida comparado— junto a la ficha técnica. Preparado así, el argumento es sólido; presentado como un anuncio suelto, no llega a ninguna parte.",
    cards: [
      {
        label: "Perfil del comprador",
        value: "Traslado internacional",
        sub: "Profesionales y familias que se instalan, con reconocimiento estadounidense aún en formación",
      },
      {
        label: "Producto dominante",
        value: "Piso rehabilitado y chalet",
        sub: "Vivienda urbana reformada en el centro y chalet en urbanización del área metropolitana",
      },
      {
        label: "Ventaja del material",
        value: "El contexto vende",
        sub: "En un mercado sin marca previa, explicar la ciudad forma parte de la ficha — no es relleno",
      },
    ],
    submarkets: [
      "Ruzafa",
      "El Carmen · Ciutat Vella",
      "El Cabanyal",
      "Pla del Remei",
      "Gran Vía",
      "Benimaclet",
      "La Eliana",
      "Rocafort",
      "Godella",
      "Alboraya · Patacona",
    ],
    miamiLink:
      "El comprador que se traslada a Valencia y el que llega a South Miami o Coral Springs comparten lógica: ciudad manejable, buenos colegios, coste de vida sostenible y una comunidad internacional en crecimiento. Es un argumento de traslado, no de segunda residencia — y se presenta de otra forma.",
    faqs: [
      {
        q: "Valencia no es un mercado de lujo. ¿Tiene sentido esta vía?",
        a: "Tiene sentido cuando la propiedad está bien documentada y el argumento de traslado es real. El agente comprador estadounidense que trabaja relocalización valora previsibilidad y claridad por encima del precio. Dicho esto, no todo encaja: Carlos responde con una valoración franca, y en un mercado con menor reconocimiento previo la respuesta negativa es más frecuente que en Marbella o Madrid.",
      },
      {
        q: "¿Qué hace que una propiedad de Valencia destaque en este canal?",
        a: "La documentación completa y un contexto bien explicado. Superficies verificables, año de rehabilitación, certificado energético y cuentas de la comunidad resuelven la parte técnica; la parte de contexto —barrio, conectividad, servicios— es la que un agente sin experiencia previa en la ciudad necesita para poder defender la propiedad ante su cliente.",
      },
      {
        q: "¿Su agencia local sigue interviniendo?",
        a: "Sí. Carlos Uzcategui es Realtor® colegiado en Florida, no en España, y no presta servicios de intermediación en territorio español. Las visitas, la negociación y la cualificación del comprador las mantiene su agencia valenciana con licencia.",
      },
      {
        q: "¿Cómo empiezo?",
        a: "Con el formulario de esta página: ubicación, nombre y un teléfono de contacto. Carlos revisa cada consulta personalmente y responde con una valoración de encaje. Si tiene recorrido, la propuesta escrita detalla la vía —exclusiva o plan de activación— con alcance y términos en privado.",
      },
    ],
  },
];

export const getSpainMarket = (slug: string): SpainMarket | undefined =>
  SPAIN_MARKETS.find((m) => m.slug === slug);
