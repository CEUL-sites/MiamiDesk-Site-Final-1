// Public copy for the Miami Desk chat window (registration gate, limits,
// progress). Reviewed by the compliance-reviewer agent (consent wording per its TCPA notes) — any change goes back
// through that review. No statistics, no time promises, no exclamation marks.

export type ChatLang = "en" | "es";

export const CHAT_COPY = {
  en: {
    opening:
      "Welcome. Tell me what brings you here — a South Florida sale, a purchase, a cross-border inquiry, or an agent referral — and I'll gather the right details so Carlos can respond with strategy, not a questionnaire.",
    placeholderFirst: "Ask anything about South Florida…",
    placeholderNext: "Continue the conversation…",
    inputLabel: "Ask the Miami Desk a question",
    send: "Send question",
    freeLeft: (n: number) => (n === 1 ? "1 free question left" : `${n} free questions left`),
    regLeft: (n: number) => (n === 1 ? "1 question left" : `${n} questions left`),
    footer: "AI intake · Our licensed team responds",
    networkError: "Network error. Please try again or contact us directly.",
    verifyError: "We could not verify this browser. Please reload the page and try again.",
    tooLong: "Please keep your question under 600 characters.",
    // Registration gate
    regTitle: "Continue with Carlos's team",
    regBody:
      "You have used the free questions for this conversation. Share your details to continue — Carlos receives a summary of this conversation and responds directly.",
    name: "Full name",
    email: "Email",
    phone: "Phone / WhatsApp",
    contactHint: "Email or phone is required.",
    interest: "I'm interested in",
    interests: [
      ["selling", "Selling a property"],
      ["buying", "Buying a property"],
      ["investing", "Investing"],
      ["referral", "Agent referral"],
      ["other", "Something else"],
    ] as const,
    consent:
      "Optional: I agree to receive WhatsApp/SMS updates about my inquiry from Carlos Uzcategui, United Realty Group, at this number. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out. Consent is not a condition of service.",
    privacy: "Your details are used to respond to this inquiry and, if you opt in above, to send updates.",
    privacyLink: "Privacy Policy",
    submit: "Continue the conversation",
    submitting: "Sending…",
    unlocked: "Thank you. Carlos will follow up directly. You can continue the conversation below.",
    // Limits
    dailyTitle: "Today's question limit has been reached",
    dailyBody: "The Miami Desk has reached its question limit for today. Reach Carlos directly on WhatsApp or through the contact form.",
    contactForm: "Contact form",
  },
  es: {
    opening:
      "Le damos la bienvenida. Cuénteme qué le trae por aquí — una venta en el sur de Florida, una compra, una consulta internacional o una referencia de agente — y reuniré los datos adecuados para que Carlos le responda con una estrategia, no con un cuestionario.",
    placeholderFirst: "Pregunte sobre el sur de Florida…",
    placeholderNext: "Continúe la conversación…",
    inputLabel: "Haga una pregunta al Miami Desk",
    send: "Enviar pregunta",
    freeLeft: (n: number) => (n === 1 ? "Le queda 1 pregunta gratuita" : `Le quedan ${n} preguntas gratuitas`),
    regLeft: (n: number) => (n === 1 ? "Le queda 1 pregunta" : `Le quedan ${n} preguntas`),
    footer: "Asistente de IA · Nuestro equipo con licencia responde",
    networkError: "Error de conexión. Inténtelo de nuevo o contáctenos directamente.",
    verifyError: "No pudimos verificar este navegador. Recargue la página e inténtelo de nuevo.",
    tooLong: "Su pregunta debe tener menos de 600 caracteres.",
    regTitle: "Continúe con el equipo de Carlos",
    regBody:
      "Ha utilizado las preguntas gratuitas de esta conversación. Comparta sus datos para continuar — Carlos recibe un resumen de esta conversación y le responde directamente.",
    name: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono / WhatsApp",
    contactHint: "Se requiere correo electrónico o teléfono.",
    interest: "Me interesa",
    interests: [
      ["selling", "Vender una propiedad"],
      ["buying", "Comprar una propiedad"],
      ["investing", "Invertir"],
      ["referral", "Derivación de agente"],
      ["other", "Otro asunto"],
    ] as const,
    consent:
      "Opcional: acepto recibir actualizaciones por WhatsApp/SMS sobre mi consulta de parte de Carlos Uzcategui, United Realty Group, en este número. La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para darse de baja. El consentimiento no es una condición del servicio.",
    privacy: "Sus datos se usan para responder a esta consulta y, si lo acepta arriba, para enviarle actualizaciones.",
    privacyLink: "Política de privacidad",
    submit: "Continuar la conversación",
    submitting: "Enviando…",
    unlocked: "Gracias. Carlos le contactará directamente. Puede continuar la conversación a continuación.",
    dailyTitle: "Se ha alcanzado el límite de preguntas de hoy",
    dailyBody: "El Miami Desk ha alcanzado su límite de preguntas por hoy. Contacte a Carlos directamente por WhatsApp o mediante el formulario de contacto.",
    contactForm: "Formulario de contacto",
  },
} as const;
