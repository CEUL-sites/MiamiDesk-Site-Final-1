import type { Handler, HandlerEvent } from "@netlify/functions";

// Auto-reply acknowledgment via Resend.
// Carlos must set RESEND_API_KEY in Netlify environment variables.
// FROM address must be a verified domain sender in Resend (e.g. no-reply@homesprofessional.com).

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM_ADDRESS = process.env.RESEND_FROM ?? "Carlos Uzcategui <no-reply@homesprofessional.com>";
const CARLOS_EMAIL = "contact@carlosre.com";
const WHATSAPP_US = "+1 954-865-6622";
const WHATSAPP_LINK = "https://wa.me/19548656622";
const SITE = "https://homesprofessional.com";

// Lead-magnet downloads (exit-intent modal + free-resources strip) submit the
// "lead-magnet-download" form with a `guide` value. We map it to the actual PDF
// so the capture is delivered by email — the lead keeps the guide even if they
// never click the on-page download, and gets a branded, down-funnel touch.
function resolveGuide(guide: string): { title: string; path: string } {
  const g = (guide || "").toLowerCase();
  if (g.includes("buyer")) {
    return { title: "Miami Buyer Brief Q3 2026", path: "/miami-buyer-brief-q3-2026.pdf" };
  }
  if (g.includes("spain") || g.includes("activation")) {
    return { title: "Activating Spanish Inventory in the Miami MLS", path: "/spain-mls-activation-methodology-brief.pdf" };
  }
  return { title: "South Florida Seller's Net Sheet 2026", path: "/south-florida-sellers-net-sheet-2026.pdf" };
}

function buildLeadMagnetEmail(guide: string, name: string, useSpanish: boolean): { subject: string; html: string } {
  const { title, path } = resolveGuide(guide);
  const url = `${SITE}${path}`;
  const isBuyer = path.includes("buyer");
  const P = `font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: rgba(11,30,63,0.7);`;
  const nextHref = isBuyer ? `${SITE}/buy` : `${SITE}/home-value`;

  const bodyEN = `
        <h1 style="font-size: 24px; font-weight: 400; line-height: 1.2; margin: 0 0 16px;">Your guide is ready to download.</h1>
        <p style="${P}">Dear ${name || "there"},<br><br>
          Thank you for requesting the <strong>${title}</strong>. You can download it here:</p>
        <p style="${P}">
          <a href="${url}" style="display:inline-block;background:#B08D57;color:#0B1E3F;text-decoration:none;padding:12px 22px;font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">Download the guide →</a>
        </p>
        <p style="${P}">${isBuyer
          ? `When you're ready to act on it, the next step is a tailored buyer brief for your specific search — <a href="${nextHref}" style="color:#B08D57;">start here</a>.`
          : `When you'd like numbers specific to your property rather than general ranges, a free, no-obligation valuation is the natural next step — <a href="${nextHref}" style="color:#B08D57;">request yours here</a>.`}</p>
        <p style="${P}">Questions in the meantime? Reply to this email or WhatsApp me at <a href="${WHATSAPP_LINK}" style="color:#B08D57;">${WHATSAPP_US}</a>.</p>`;

  const bodyES = `
        <h1 style="font-size: 24px; font-weight: 400; line-height: 1.2; margin: 0 0 16px;">Su guía está lista para descargar.</h1>
        <p style="${P}">Estimado/a ${name || "cliente"},<br><br>
          Gracias por solicitar el <strong>${title}</strong> (documento en inglés). Puede descargarlo aquí:</p>
        <p style="${P}">
          <a href="${url}" style="display:inline-block;background:#B08D57;color:#0B1E3F;text-decoration:none;padding:12px 22px;font-family:monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">Descargar la guía →</a>
        </p>
        <p style="${P}">${isBuyer
          ? `Cuando quiera actuar, el siguiente paso es un informe de comprador adaptado a su búsqueda — <a href="${nextHref}" style="color:#B08D57;">comience aquí</a>.`
          : `Cuando quiera números específicos de su propiedad y no rangos generales, una valoración gratuita y sin compromiso es el siguiente paso natural — <a href="${nextHref}" style="color:#B08D57;">solicítela aquí</a>.`}</p>
        <p style="${P}">¿Preguntas mientras tanto? Responda a este correo o escríbame por WhatsApp al <a href="${WHATSAPP_LINK}" style="color:#B08D57;">${WHATSAPP_US}</a>.</p>`;

  return {
    subject: useSpanish ? `Su guía: ${title}` : `Your guide: ${title}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B1E3F;">
        <div style="border-bottom: 2px solid #B08D57; padding-bottom: 16px; margin-bottom: 24px;">
          <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #B08D57; margin: 0;">HomesProfessional.com</p>
        </div>
        ${useSpanish ? bodyES : bodyEN}
        <div style="border-top: 1px solid #e8e3da; margin-top: 32px; padding-top: 16px;">
          <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(11,30,63,0.35); margin: 0;">
            Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
          <p style="font-family: monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(11,30,63,0.25); margin: 6px 0 0;">
            15951 SW 41 St #700, Weston, FL 33331 · ${WHATSAPP_US} · ${CARLOS_EMAIL}
          </p>
        </div>
      </div>
    `,
  };
}

// Global Desk listing-request acknowledgment (§8). No prices, no commitments.
// Language is chosen explicitly on the page (Spanish default), passed as `language`.
function buildGlobalDeskEmail(useSpanish: boolean): { subject: string; html: string } {
  const P = `font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: rgba(11,30,63,0.72);`;
  const subject = useSpanish
    ? "Su solicitud de listado — recibida para revisión"
    : "Your listing request — received for review";
  const bodyES = `
        <h1 style="font-size: 22px; font-weight: 400; line-height: 1.25; margin: 0 0 16px;">Su solicitud de listado ha sido recibida para revisión.</h1>
        <p style="${P}">Gracias. Su solicitud de listado ha sido recibida para revisión de colocación en la sección internacional del Miami MLS.</p>
        <p style="${P}">Tras la revisión, recibirá una propuesta de cooperación y colocación a medida. La cooperación de referidos se formaliza operación por operación mediante los formularios de la Asociación de REALTORS® de Miami, vía United Realty Group. Todos los términos comerciales se tratan de forma privada.</p>
        <p style="${P}">Carlos Uzcategui<br>
          REALTOR® con licencia en Florida SL705771 · United Realty Group<br>
          WhatsApp España +34 646 85 30 78 · EE. UU. +1 954-865-6622<br>
          <a href="mailto:${CARLOS_EMAIL}" style="color:#B08D57;">${CARLOS_EMAIL}</a><br>
          Equal Housing Opportunity</p>`;
  const bodyEN = `
        <h1 style="font-size: 22px; font-weight: 400; line-height: 1.25; margin: 0 0 16px;">Your listing request has been received for review.</h1>
        <p style="${P}">Thank you. Your listing request has been received for placement review in the international listings section of the Miami MLS.</p>
        <p style="${P}">After review, you will receive a tailored cooperation and placement proposal. Referral cooperation is formalized transaction by transaction on Miami REALTORS® Association forms, via United Realty Group. All commercial terms are handled privately.</p>
        <p style="${P}">Carlos Uzcategui<br>
          Florida Licensed Realtor® SL705771 · United Realty Group<br>
          WhatsApp Spain +34 646 85 30 78 · USA +1 954-865-6622<br>
          <a href="mailto:${CARLOS_EMAIL}" style="color:#B08D57;">${CARLOS_EMAIL}</a><br>
          Equal Housing Opportunity</p>`;
  return {
    subject,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B1E3F;">
        <div style="border-bottom: 2px solid #B08D57; padding-bottom: 16px; margin-bottom: 24px;">
          <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #B08D57; margin: 0;">Global Desk · HomesProfessional.com</p>
        </div>
        ${useSpanish ? bodyES : bodyEN}
        <div style="border-top: 1px solid #e8e3da; margin-top: 32px; padding-top: 16px;">
          <p style="font-family: monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(11,30,63,0.25); margin: 0;">
            15951 SW 41 St #700, Weston, FL 33331 · ${WHATSAPP_US} · ${CARLOS_EMAIL}
          </p>
        </div>
      </div>
    `,
  };
}

const SPANISH_COUNTRIES = new Set([
  "spain", "venezuela", "colombia", "argentina", "mexico", "peru", "chile",
  "ecuador", "panama", "dominican republic", "cuba", "bolivia", "uruguay",
  "paraguay", "costa rica", "guatemala",
]);

function isSpanishContext(country: string, name: string): boolean {
  return SPANISH_COUNTRIES.has(country.toLowerCase()) ||
    /[áéíóúüñ¿¡]/i.test(name);
}

function buildEmailEN(formName: string, name: string): { subject: string; html: string } {
  const intro = formName === "seller-hero"
    ? "Your home valuation request has been received. Carlos will prepare your MLS-based valuation personally and follow up with you directly."
    : formName === "seller-intake"
    ? "Your seller strategy review request has been received. Carlos will review your property details personally and follow up with you directly."
    : formName === "buyer-mandate"
    ? "Your Miami buyer brief request has been received. Carlos will prepare a brief tailored to your search parameters and follow up with you directly."
    : formName === "referral-intake-es"
    ? "Your cross-border referral inquiry has been received. Carlos handles all licensed professional inquiries confidentially and will follow up with you directly."
    : "Your referral inquiry has been received. Carlos handles all licensed professional inquiries confidentially and will follow up with you directly.";

  return {
    subject: formName === "seller-hero"
      ? "Home Valuation Request Confirmed — HomesProfessional.com"
      : formName === "seller-intake"
      ? "Seller Strategy Review Request Confirmed — HomesProfessional.com"
      : formName === "buyer-mandate"
      ? "Miami Buyer Brief Request Confirmed — HomesProfessional.com"
      : formName === "referral-intake-es"
      ? "Consulta de Colaboración Confirmada — Agent Partner Desk"
      : "Referral Inquiry Confirmed — Agent Partner Desk",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B1E3F;">
        <div style="border-bottom: 2px solid #B08D57; padding-bottom: 16px; margin-bottom: 24px;">
          <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #B08D57; margin: 0;">HomesProfessional.com</p>
        </div>
        <h1 style="font-size: 24px; font-weight: 400; line-height: 1.2; margin: 0 0 16px;">${intro.split(".")[0]}.</h1>
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: rgba(11,30,63,0.7);">
          Dear ${name || "there"},<br><br>
          ${intro}
        </p>
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: rgba(11,30,63,0.7);">
          For immediate questions, WhatsApp Carlos directly at <strong>${WHATSAPP_US}</strong> or reply to this email at <a href="mailto:${CARLOS_EMAIL}" style="color: #B08D57;">${CARLOS_EMAIL}</a>.
        </p>
        <div style="border-top: 1px solid #e8e3da; margin-top: 32px; padding-top: 16px;">
          <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(11,30,63,0.35); margin: 0;">
            Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
          <p style="font-family: monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(11,30,63,0.25); margin: 6px 0 0;">
            Weston, Florida · ${WHATSAPP_US} · ${CARLOS_EMAIL}
          </p>
        </div>
      </div>
    `,
  };
}

function buildEmailES(formName: string, name: string): { subject: string; html: string } {
  const intro = formName === "seller-hero"
    ? "Su solicitud de valoración de propiedad ha sido recibida. Carlos preparará su valoración basada en el MLS personalmente y le responderá dentro de un día hábil."
    : formName === "seller-intake"
    ? "Su solicitud de revisión de estrategia de venta ha sido recibida. Carlos revisará los detalles de su propiedad personalmente y le responderá dentro de un día hábil."
    : formName === "buyer-mandate"
    ? "Su solicitud de informe de comprador en Miami ha sido recibida. Carlos preparará un informe adaptado a sus parámetros de búsqueda y le responderá dentro de un día hábil."
    : formName === "referral-intake-es"
    ? "Su consulta de colaboración ha sido recibida. Carlos gestiona todas las consultas de profesionales licenciados de forma confidencial y le responderá dentro de un día hábil. Se firmará un acuerdo de colaboración por escrito antes de cualquier presentación de cliente."
    : "Su consulta de referido ha sido recibida. Carlos gestiona todas las consultas de profesionales licenciados de forma confidencial y le responderá dentro de un día hábil.";

  return {
    subject: formName === "seller-hero"
      ? "Solicitud de Valoración Confirmada — HomesProfessional.com"
      : formName === "seller-intake"
      ? "Solicitud de Revisión de Estrategia Confirmada — HomesProfessional.com"
      : formName === "buyer-mandate"
      ? "Solicitud de Informe de Comprador Confirmada — HomesProfessional.com"
      : formName === "referral-intake-es"
      ? "Consulta de Colaboración Confirmada — HomesProfessional.com"
      : "Consulta de Referido Confirmada — Agent Partner Desk",
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #0B1E3F;">
        <div style="border-bottom: 2px solid #B08D57; padding-bottom: 16px; margin-bottom: 24px;">
          <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: #B08D57; margin: 0;">HomesProfessional.com</p>
        </div>
        <h1 style="font-size: 24px; font-weight: 400; line-height: 1.2; margin: 0 0 16px;">${intro.split(".")[0]}.</h1>
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: rgba(11,30,63,0.7);">
          Estimado/a ${name || "cliente"},<br><br>
          ${intro}
        </p>
        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.7; color: rgba(11,30,63,0.7);">
          Para preguntas inmediatas, comuníquese con Carlos por WhatsApp al <strong>${WHATSAPP_US}</strong> o responda a este correo en <a href="mailto:${CARLOS_EMAIL}" style="color: #B08D57;">${CARLOS_EMAIL}</a>.
        </p>
        <div style="border-top: 1px solid #e8e3da; margin-top: 32px; padding-top: 16px;">
          <p style="font-family: monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(11,30,63,0.35); margin: 0;">
            Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
          <p style="font-family: monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(11,30,63,0.25); margin: 6px 0 0;">
            Weston, Florida · ${WHATSAPP_US} · ${CARLOS_EMAIL}
          </p>
        </div>
      </div>
    `,
  };
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!RESEND_API_KEY) {
    // Resend not configured — log internally and return success to not break form flow
    console.warn("RESEND_API_KEY not set — acknowledgment email skipped");
    return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: "no_key" }) };
  }

  let body: { formName?: string; name?: string; email?: string; country?: string; brokerage?: string; guide?: string; language?: string };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { formName = "", name = "", email = "", country = "", guide = "", language = "" } = body;

  if (!email || !email.includes("@")) {
    // No valid email — skip silently (referral form doesn't always have one)
    return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: "no_email" }) };
  }

  // Global Desk uses an explicit on-page language choice; everything else
  // infers Spanish from country/name context.
  const useSpanish =
    formName === "global-desk-listing" ? language === "es" : isSpanishContext(country, name);
  const { subject, html } = formName === "global-desk-listing"
    ? buildGlobalDeskEmail(useSpanish)
    : formName === "lead-magnet-download"
    ? buildLeadMagnetEmail(guide, name, useSpanish)
    : useSpanish
    ? buildEmailES(formName, name)
    : buildEmailEN(formName, name);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [email],
        reply_to: CARLOS_EMAIL,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Resend error:", res.status, text);
      return { statusCode: 500, body: JSON.stringify({ error: "email_failed" }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true }),
    };
  } catch {
    return { statusCode: 500, body: JSON.stringify({ error: "network_error" }) };
  }
};
