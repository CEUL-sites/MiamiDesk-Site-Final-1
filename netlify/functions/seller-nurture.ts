import type { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { NURTURE_STORE, nurtureToken, type NurtureLead } from "./_shared/nurture";

// Daily seller nurture — scheduled via netlify.toml.
//
// Most valuation leads list months after first contact; this keeps Carlos in
// front of them between the day-one acknowledgment and the listing decision.
// Leads are enrolled by submission-created.ts into the "seller-nurture" Blobs
// store; this function sends the next due touch via Resend and advances the
// lead's stage. Leads with a 0–3 month timeline get a compressed cadence.
//
// Compliance: copy never guarantees outcomes, prices, or timelines; every
// email carries the license line, office address, and an unsubscribe link.

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM_ADDRESS = process.env.RESEND_FROM ?? "Carlos Uzcategui <no-reply@homesprofessional.com>";
const REFRESH_SECRET = process.env.NURTURE_REFRESH_SECRET ?? process.env.MARKET_FEED_REFRESH_SECRET ?? "";
const CARLOS_EMAIL = "contact@carlosre.com";
const WHATSAPP_US = "+1 954-865-6622";
const WHATSAPP_LINK = "https://wa.me/19548656622";
const CALENDLY = "https://calendly.com/carlosre";
const SITE = "https://homesprofessional.com";

const MAX_SENDS_PER_RUN = 50;

// Days-since-enrollment thresholds per stage. Stage N is sent once
// daysSince >= OFFSETS[N]. The day-0 confirmation is lead-acknowledgment.ts.
const STANDARD_OFFSETS = [2, 5, 12, 21, 45];
const FAST_OFFSETS = [1, 3, 7, 14, 30];

const FAST_TIMELINE = /0\s*[–-]\s*3|immediat|30\s*[–-]\s*90/i;

// City → most relevant neighborhood selling guide in /journal
const CITY_GUIDES: Record<string, { slug: string; label: string }> = {
  "weston": { slug: "selling-weston-florida-2026", label: "Selling Your Weston Home in 2026" },
  "coral gables": { slug: "selling-coral-gables-2026", label: "Selling in Coral Gables in 2026" },
  "aventura": { slug: "selling-aventura-florida-2026", label: "Selling Your Aventura Home in 2026" },
  "brickell": { slug: "selling-brickell-condo-2026", label: "Selling Your Brickell Condo in 2026" },
  "miami beach": { slug: "selling-miami-beach-condo-2026", label: "Selling Your Miami Beach Condo in 2026" },
  "doral": { slug: "selling-doral-home-2026", label: "Selling Your Doral Home in 2026" },
  "fort lauderdale": { slug: "selling-fort-lauderdale-waterfront-2026", label: "Selling Fort Lauderdale Waterfront in 2026" },
  "coral springs": { slug: "selling-coral-springs-home-2026", label: "Selling Your Coral Springs Home in 2026" },
  "pembroke pines": { slug: "selling-pembroke-pines-home-2026", label: "Selling Your Pembroke Pines Home in 2026" },
  "plantation": { slug: "selling-plantation-home-2026", label: "Selling Your Plantation Home in 2026" },
  "sunrise": { slug: "selling-sunrise-home-2026", label: "Selling Your Sunrise Home in 2026" },
  "hallandale beach": { slug: "selling-hallandale-beach-condo-2026", label: "Selling Your Hallandale Beach Condo in 2026" },
  "kendall": { slug: "selling-kendall-home-2026", label: "Selling Your Kendall Home in 2026" },
  "north miami": { slug: "selling-north-miami-home-2026", label: "Selling Your North Miami Home in 2026" },
  "pompano beach": { slug: "selling-pompano-beach-home-2026", label: "Selling Your Pompano Beach Home in 2026" },
  "downtown miami": { slug: "selling-downtown-miami-condo-2026", label: "Selling Your Downtown Miami Condo in 2026" },
};
const DEFAULT_GUIDE = { slug: "when-to-list-south-florida-home-2026", label: "When to List Your South Florida Home" };

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "there";
}

function wrap(bodyHtml: string, email: string, language: "en" | "es" = "en"): string {
  const unsub = `${SITE}/.netlify/functions/nurture-unsubscribe?email=${encodeURIComponent(email)}&token=${nurtureToken(email)}`;
  const footerDisclaimer = language === "es"
    ? `Recibe este correo porque solicitó una revisión de estrategia de venta en HomesProfessional.com.
          <a href="${unsub}" style="color: rgba(11,30,63,0.45);">Cancelar suscripción</a>`
    : `You're receiving this because you requested a seller strategy review at HomesProfessional.com.
          <a href="${unsub}" style="color: rgba(11,30,63,0.45);">Unsubscribe</a>`;
  return `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B1E3F;">
      <div style="border-bottom: 2px solid #B08D57; padding-bottom: 16px; margin-bottom: 24px;">
        <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #B08D57; margin: 0;">HomesProfessional.com</p>
      </div>
      ${bodyHtml}
      <div style="border-top: 1px solid #e8e3da; margin-top: 32px; padding-top: 16px;">
        <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(11,30,63,0.35); margin: 0;">
          Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
        </p>
        <p style="font-family: monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(11,30,63,0.25); margin: 6px 0 0;">
          15951 SW 41 St #700, Weston, FL 33331 · ${WHATSAPP_US} · ${CARLOS_EMAIL}
        </p>
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 11px; color: rgba(11,30,63,0.35); margin: 12px 0 0;">
          ${footerDisclaimer}
        </p>
      </div>
    </div>
  `;
}

const P_STYLE = `font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: rgba(11,30,63,0.7);`;
const H_STYLE = `font-size: 24px; font-weight: 400; line-height: 1.2; margin: 0 0 16px;`;
const A_STYLE = `color: #B08D57;`;

function buildEmail(stage: number, lead: NurtureLead): { subject: string; html: string } {
  return (lead.language ?? "en") === "es" ? buildEmailES(stage, lead) : buildEmailEN(stage, lead);
}

function buildEmailEN(stage: number, lead: NurtureLead): { subject: string; html: string } {
  const fn = firstName(lead.name);
  const guide = CITY_GUIDES[lead.city.toLowerCase()] ?? DEFAULT_GUIDE;

  switch (stage) {
    case 1:
      return {
        subject: "What you'd actually keep from a South Florida sale",
        html: wrap(`
          <h1 style="${H_STYLE}">The number that matters isn't the sale price.</h1>
          <p style="${P_STYLE}">Dear ${fn},<br><br>
            While your property analysis is in progress, here is the resource most sellers ask about first:
            the <a href="${SITE}/south-florida-sellers-net-sheet-2026.pdf" style="${A_STYLE}"><strong>South Florida Seller's Net Sheet 2026</strong></a> —
            a line-by-line view of commissions, taxes, and closing costs, so you can see what a sale would actually leave in your pocket.</p>
          <p style="${P_STYLE}">Your full review will cover active and closed comparables, absorption in your sub-market, and a positioning recommendation —
            prepared from Miami and South Florida REALTORS® MLS data, not an algorithm.</p>
          <p style="${P_STYLE}">Questions in the meantime? Reply to this email or WhatsApp me at <a href="${WHATSAPP_LINK}" style="${A_STYLE}">${WHATSAPP_US}</a>.</p>
        `, lead.email),
      };
    case 2:
      return {
        subject: "Six questions to ask before you choose a listing agent",
        html: wrap(`
          <h1 style="${H_STYLE}">How to interview a listing agent — including me.</h1>
          <p style="${P_STYLE}">Dear ${fn},<br><br>
            Whoever you ultimately list with, you should interview them properly. I published the six questions
            I believe every South Florida seller should ask — about MLS positioning, buyer-agent activation,
            and how pricing decisions actually get made:</p>
          <p style="${P_STYLE}"><a href="${SITE}/journal/how-to-choose-a-listing-agent-south-florida-2026" style="${A_STYLE}"><strong>How to Choose a Listing Agent in South Florida →</strong></a></p>
          <p style="${P_STYLE}">Ask these of any agent you speak with. If you'd like to put them to me directly, my calendar is open: <a href="${CALENDLY}" style="${A_STYLE}">${CALENDLY}</a>.</p>
        `, lead.email),
      };
    case 3:
      return {
        subject: `Your local market, properly read${lead.city && lead.city !== "Other" ? ` — ${lead.city}` : ""}`,
        html: wrap(`
          <h1 style="${H_STYLE}">What moves the needle in your market.</h1>
          <p style="${P_STYLE}">Dear ${fn},<br><br>
            Every sub-market in South Florida behaves differently — buyer profile, days on market, and which
            preparation work actually returns its cost. This guide covers the dynamics most relevant to your property:</p>
          <p style="${P_STYLE}"><a href="${SITE}/journal/${guide.slug}" style="${A_STYLE}"><strong>${guide.label} →</strong></a></p>
          <p style="${P_STYLE}">When you're ready for numbers specific to your street rather than your city,
            that's exactly what the confidential review covers: <a href="${SITE}/home-value" style="${A_STYLE}">request it here</a> or simply reply to this email.</p>
        `, lead.email),
      };
    case 4:
      return {
        subject: "Closing costs and timing — the two things sellers underestimate",
        html: wrap(`
          <h1 style="${H_STYLE}">Plan the exit before you list.</h1>
          <p style="${P_STYLE}">Dear ${fn},<br><br>
            Two pieces of homework save sellers the most money: understanding the full cost stack before
            accepting an offer, and choosing a listing window deliberately instead of by default.</p>
          <p style="${P_STYLE}">
            <a href="${SITE}/journal/seller-closing-costs-south-florida-2026" style="${A_STYLE}"><strong>Seller Closing Costs in South Florida →</strong></a><br>
            <a href="${SITE}/journal/when-to-list-south-florida-home-2026" style="${A_STYLE}"><strong>When to List Your South Florida Home →</strong></a>
          </p>
          <p style="${P_STYLE}">Both are grounded in Miami and South Florida REALTORS® MLS data. If your plans have firmed up since we last spoke,
            reply here or WhatsApp me at <a href="${WHATSAPP_LINK}" style="${A_STYLE}">${WHATSAPP_US}</a> and I'll refresh your analysis.</p>
        `, lead.email),
      };
    default:
      return {
        subject: "Still thinking about selling? Your analysis can be refreshed",
        html: wrap(`
          <h1 style="${H_STYLE}">No pressure — just an open door.</h1>
          <p style="${P_STYLE}">Dear ${fn},<br><br>
            It's been a few weeks since you asked about selling${lead.city && lead.city !== "Other" ? ` in ${lead.city}` : " in South Florida"}.
            Markets move; if the timing question is still open for you, I'm happy to re-run the comparables and
            give you a current read — no listing commitment, as always.</p>
          <p style="${P_STYLE}">
            Book 30 minutes: <a href="${CALENDLY}" style="${A_STYLE}">${CALENDLY}</a><br>
            Or WhatsApp me directly: <a href="${WHATSAPP_LINK}" style="${A_STYLE}">${WHATSAPP_US}</a>
          </p>
          <p style="${P_STYLE}">This is the last note in this series — I won't keep emailing unless you'd like me to.</p>
        `, lead.email),
      };
  }
}

// Spanish track — formal "usted" tone matching lead-acknowledgment.ts.
// Same stages, links, and compliance rules as the English sequence; the
// linked guides themselves are in English and are flagged as such.
function buildEmailES(stage: number, lead: NurtureLead): { subject: string; html: string } {
  const fn = lead.name.trim() ? firstName(lead.name) : "cliente";
  const guide = CITY_GUIDES[lead.city.toLowerCase()] ?? DEFAULT_GUIDE;

  switch (stage) {
    case 1:
      return {
        subject: "Lo que realmente conservaría de una venta en el Sur de Florida",
        html: wrap(`
          <h1 style="${H_STYLE}">El número que importa no es el precio de venta.</h1>
          <p style="${P_STYLE}">Estimado/a ${fn},<br><br>
            Mientras el análisis de su propiedad está en preparación, le comparto el recurso que los vendedores consultan primero:
            el <a href="${SITE}/south-florida-sellers-net-sheet-2026.pdf" style="${A_STYLE}"><strong>South Florida Seller's Net Sheet 2026</strong></a> (documento en inglés) —
            un desglose línea por línea de comisiones, impuestos y costos de cierre, para que vea lo que una venta realmente le dejaría.</p>
          <p style="${P_STYLE}">Su revisión completa incluirá comparables activos y cerrados, absorción en su submercado y una recomendación de posicionamiento —
            elaborada con datos del MLS de Miami and South Florida REALTORS®, no con un algoritmo.</p>
          <p style="${P_STYLE}">¿Preguntas mientras tanto? Responda a este correo o escríbame por WhatsApp al <a href="${WHATSAPP_LINK}" style="${A_STYLE}">${WHATSAPP_US}</a>.</p>
        `, lead.email, "es"),
      };
    case 2:
      return {
        subject: "Seis preguntas antes de elegir a su agente de listado",
        html: wrap(`
          <h1 style="${H_STYLE}">Cómo entrevistar a un agente de listado — incluido yo.</h1>
          <p style="${P_STYLE}">Estimado/a ${fn},<br><br>
            Con quien sea que termine listando su propiedad, conviene entrevistarlo bien. Publiqué las seis preguntas
            que considero que todo vendedor del Sur de Florida debería hacer — sobre posicionamiento en el MLS, activación
            de agentes de compradores y cómo se toman realmente las decisiones de precio:</p>
          <p style="${P_STYLE}"><a href="${SITE}/journal/how-to-choose-a-listing-agent-south-florida-2026" style="${A_STYLE}"><strong>Cómo elegir un agente de listado en el Sur de Florida → (guía en inglés)</strong></a></p>
          <p style="${P_STYLE}">Hágale estas preguntas a cualquier agente con quien hable. Si desea hacérmelas directamente, mi calendario está abierto: <a href="${CALENDLY}" style="${A_STYLE}">${CALENDLY}</a>.</p>
        `, lead.email, "es"),
      };
    case 3:
      return {
        subject: `Su mercado local, bien leído${lead.city && lead.city !== "Other" ? ` — ${lead.city}` : ""}`,
        html: wrap(`
          <h1 style="${H_STYLE}">Lo que realmente mueve la aguja en su mercado.</h1>
          <p style="${P_STYLE}">Estimado/a ${fn},<br><br>
            Cada submercado del Sur de Florida se comporta de manera distinta — el perfil del comprador, los días en el mercado,
            y qué preparación realmente recupera su costo. Esta guía cubre la dinámica más relevante para su propiedad:</p>
          <p style="${P_STYLE}"><a href="${SITE}/journal/${guide.slug}" style="${A_STYLE}"><strong>${guide.label} → (guía en inglés)</strong></a></p>
          <p style="${P_STYLE}">Cuando quiera números específicos de su calle y no de su ciudad, eso es exactamente lo que cubre la revisión
            confidencial: <a href="${SITE}/home-value" style="${A_STYLE}">solicítela aquí</a> o simplemente responda a este correo.</p>
        `, lead.email, "es"),
      };
    case 4:
      return {
        subject: "Costos de cierre y el momento de listar — lo que más se subestima",
        html: wrap(`
          <h1 style="${H_STYLE}">Planifique la salida antes de listar.</h1>
          <p style="${P_STYLE}">Estimado/a ${fn},<br><br>
            Dos tareas le ahorran más dinero a un vendedor: entender la estructura completa de costos antes de aceptar una oferta,
            y elegir la ventana de listado de forma deliberada, no por inercia.</p>
          <p style="${P_STYLE}">
            <a href="${SITE}/journal/seller-closing-costs-south-florida-2026" style="${A_STYLE}"><strong>Costos de cierre para vendedores en el Sur de Florida →</strong></a><br>
            <a href="${SITE}/journal/when-to-list-south-florida-home-2026" style="${A_STYLE}"><strong>Cuándo listar su propiedad en el Sur de Florida →</strong></a>
          </p>
          <p style="${P_STYLE}">Ambas guías (en inglés) se basan en datos del MLS de Miami and South Florida REALTORS®. Si sus planes han avanzado desde la última vez,
            responda aquí o escríbame por WhatsApp al <a href="${WHATSAPP_LINK}" style="${A_STYLE}">${WHATSAPP_US}</a> y actualizaré su análisis.</p>
        `, lead.email, "es"),
      };
    default:
      return {
        subject: "¿Sigue considerando vender? Su análisis puede actualizarse",
        html: wrap(`
          <h1 style="${H_STYLE}">Sin presión — solo una puerta abierta.</h1>
          <p style="${P_STYLE}">Estimado/a ${fn},<br><br>
            Han pasado algunas semanas desde que consultó sobre vender${lead.city && lead.city !== "Other" ? ` en ${lead.city}` : " en el Sur de Florida"}.
            Los mercados se mueven; si la pregunta del momento oportuno sigue abierta para usted, con gusto vuelvo a correr los comparables
            y le doy una lectura actualizada — sin compromiso de listado, como siempre.</p>
          <p style="${P_STYLE}">
            Reserve 30 minutos: <a href="${CALENDLY}" style="${A_STYLE}">${CALENDLY}</a><br>
            O escríbame directamente por WhatsApp: <a href="${WHATSAPP_LINK}" style="${A_STYLE}">${WHATSAPP_US}</a>
          </p>
          <p style="${P_STYLE}">Este es el último correo de esta serie — no seguiré escribiéndole salvo que usted lo desee.</p>
        `, lead.email, "es"),
      };
  }
}

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_ADDRESS, to: [to], reply_to: CARLOS_EMAIL, subject, html }),
  });
  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
    return false;
  }
  return true;
}

export const handler: Handler = async (event: HandlerEvent) => {
  // Scheduled invocations have no httpMethod; manual HTTP runs need the secret.
  if (event.httpMethod) {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    const incoming = event.headers?.["x-refresh-secret"] ?? "";
    if (!REFRESH_SECRET || incoming !== REFRESH_SECRET) {
      return { statusCode: 401, body: JSON.stringify({ ok: false, error: "Unauthorized" }) };
    }
  }

  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — nurture run skipped");
    return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: "no_key" }) };
  }

  const store = getStore(NURTURE_STORE);
  const { blobs } = await store.list();
  const now = Date.now();

  let sent = 0;
  let failed = 0;
  let skipped = 0;

  for (const blob of blobs) {
    if (sent >= MAX_SENDS_PER_RUN) break;

    let lead: NurtureLead | null = null;
    try {
      lead = (await store.get(blob.key, { type: "json" })) as NurtureLead | null;
    } catch {
      continue;
    }
    if (!lead || lead.unsubscribed || !lead.email?.includes("@")) { skipped++; continue; }

    const offsets = FAST_TIMELINE.test(lead.timeline ?? "") ? FAST_OFFSETS : STANDARD_OFFSETS;
    const stage = lead.stage ?? 0;
    if (stage >= offsets.length) { skipped++; continue; }

    const daysSince = (now - new Date(lead.enrolledAt).getTime()) / 86_400_000;
    if (!(daysSince >= offsets[stage])) { skipped++; continue; }

    const nextStage = stage + 1;
    const { subject, html } = buildEmail(nextStage, lead);
    try {
      const ok = await sendEmail(lead.email, subject, html);
      if (!ok) { failed++; continue; }
      await store.setJSON(blob.key, { ...lead, stage: nextStage, lastSentAt: new Date().toISOString() });
      sent++;
    } catch (err) {
      console.error("Nurture send error for", blob.key, err);
      failed++;
    }
  }

  console.log(`seller-nurture run: sent=${sent} failed=${failed} skipped=${skipped} total=${blobs.length}`);
  return { statusCode: 200, body: JSON.stringify({ ok: true, sent, failed, skipped, total: blobs.length }) };
};
