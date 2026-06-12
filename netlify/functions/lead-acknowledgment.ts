import type { Handler, HandlerEvent } from "@netlify/functions";

// Auto-reply acknowledgment via Resend.
// Carlos must set RESEND_API_KEY in Netlify environment variables.
// FROM address must be a verified domain sender in Resend (e.g. no-reply@homesprofessional.com).

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM_ADDRESS = process.env.RESEND_FROM ?? "Carlos Uzcategui <no-reply@homesprofessional.com>";
const CARLOS_EMAIL = "contact@carlosre.com";
const WHATSAPP_US = "+1 954-865-6622";

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
    ? "Your home valuation request has been received. Carlos will prepare your MLS-based valuation personally and follow up within one business day."
    : formName === "seller-intake"
    ? "Your seller strategy review request has been received. Carlos will review your property details personally and follow up within one business day."
    : formName === "buyer-mandate"
    ? "Your Miami buyer brief request has been received. Carlos will prepare a brief tailored to your search parameters and follow up within one business day."
    : formName === "referral-intake-es"
    ? "Your cross-border referral inquiry has been received. Carlos handles all licensed professional inquiries confidentially and will follow up within one business day."
    : "Your referral inquiry has been received. Carlos handles all licensed professional inquiries confidentially and will follow up within one business day.";

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

  let body: { formName?: string; name?: string; email?: string; country?: string; brokerage?: string };
  try {
    body = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { formName = "", name = "", email = "", country = "" } = body;

  if (!email || !email.includes("@")) {
    // No valid email — skip silently (referral form doesn't always have one)
    return { statusCode: 200, body: JSON.stringify({ ok: true, skipped: "no_email" }) };
  }

  const useSpanish = isSpanishContext(country, name);
  const { subject, html } = useSpanish
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
