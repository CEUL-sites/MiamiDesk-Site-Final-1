# Spanish WhatsApp Business — Global Desk operating specification
Last reviewed: 2026-11-15. Status: ready for owner approval and setup; not yet activated in the WhatsApp mobile app.

## Identity and routing
- Business number (Spain): +34 646 85 30 78. This is a Spain / international partnership contact, NOT the primary number for Florida homeowners.
- Public Florida voice and WhatsApp: +1 954-865-6622. Preserve all U.S. links, landing pages and seller CTAs.
- Display name recommendation: **Carlos Uzcategui** (subject to WhatsApp display-name rules).
- Business category: Real Estate.
- Business website: https://homesprofessional.com
- Business email: contact@carlosre.com
- Business description (English):
  "Carlos Uzcategui | Global Real Estate Desk. Florida Realtor® SL705771, licensed since 2001, with United Realty Group. South Florida listings, international property exposure, and Miami–Madrid agency referrals through local partners. English / Español."
- Business description (Spanish alternate):
  "Carlos Uzcategui | Global Real Estate Desk. Realtor® con licencia en Florida SL705771 desde 2001, United Realty Group. Venta de inmuebles en el sur de Florida, exposición internacional y colaboración Miami–Madrid con agencias locales. English / Español."
- Photo: approved Carlos headshot or authorized United Realty Group logo, not AI-generated professional identity imagery.
- Hours: by appointment, do not promise availability 24/7.
- Compliance: Carlos is licensed in Florida, not as a real estate broker in Spain; partners remain responsible for local representation.

## App-native automations (no API required)
Tools → Business Profile: review photo, name, description, website, email, category and hours.
Tools → Greeting message: enable a factual bilingual greeting for new chats.
Tools → Away message: enable for outside advertised availability; indicate a team member reviews the request, no guaranteed response SLA.
Tools → Quick replies: create shortcuts below.
Tools → Labels: New inquiry, Spain property owner, Agency / broker, Developer, South Florida seller, Qualified, Follow-up, Closed.
Never imply WhatsApp Business app alone delivers website-form notifications to a separate personal WhatsApp number: that requires an authorized relay.

## Greeting (EN / ES)
Thank you for contacting Carlos Uzcategui's Global Real Estate Desk. We work on South Florida real estate and cross-border cooperation with local partners. Are you contacting us as a property owner, buyer, real estate professional or developer? Please share your name and the relevant market. Our team will review your inquiry.

Gracias por contactar con el Global Real Estate Desk de Carlos Uzcategui. Trabajamos en el sur de Florida y en cooperación internacional con profesionales locales. ¿Nos escribe como propietario, comprador, profesional inmobiliario o promotor? Indíquenos su nombre y mercado de interés. Nuestro equipo revisará su consulta.

## Away message
Thank you for your message. Our team reviews inquiries by appointment and will respond when available. For South Florida real estate matters, our direct U.S. number is +1 954-865-6622.

Gracias por su mensaje. Nuestro equipo revisa las consultas en horario de atención con cita previa. Para consultas inmobiliarias en el sur de Florida, nuestro número directo en EE. UU. es +1 954-865-6622.

## Suggested quick replies
/seller — "Thank you. Please share the property city, approximate type, and your intended sale timeline. A team member will evaluate the best next step. Please do not send identity or financial documents in chat."
/propietario — "Gracias. Indíquenos la ciudad, tipo de inmueble y plazo aproximado de venta. Nuestro equipo evaluará el siguiente paso. No envíe documentos de identidad ni financieros por este chat."
/agency — "Thank you for considering an international partnership. Please share your agency, market, role and approximate portfolio scope. Any MLS exposure or referral terms require eligibility and written agreement."
/agencia — "Gracias por considerar una colaboración internacional. Indíquenos agencia, mercado, cargo y tipo de cartera. La eventual publicación en MLS o compensación queda sujeta a elegibilidad y acuerdo escrito."
/referral — "Please share your brokerage, client market and type of referral. Do not disclose client details until we establish appropriate consent and referral terms."
/human — "Thank you. A team member will review this conversation personally. No offer, valuation or agreement is confirmed by an automated reply."

## Meta Business Agent (optional; availability not guaranteed)
1. In WhatsApp Business mobile app, check Tools → AI agent.
2. If the feature is unavailable, do not claim it is running; use built-in greeting, away and quick replies.
3. If available, add this website and verified business knowledge. Start in **draft/supervised** mode if offered.
4. Configure automatic replies only for new one-to-one chats, if suitable, and human escalation for property valuation, legal/tax questions, negotiation, specific property claims, commissions and client documents.
5. Explicitly disclose when an AI agent responds. Do not promise availability, MLS eligibility, sales outcome, professional licensure in Spain, or a specific fee.
6. Test English and Spanish on a separate number before allowing unsupervised replies. Meta notes AI agent may disable greeting/away messages; audit those settings after activation.
7. Never share account secrets, tokens, private client files or CRM exports through AI training text.

## Website lead alerts: independent system
Website form → Netlify intake and spam screening → HubSpot CRM record/task → authorized owner WhatsApp notification to +1 954-865-6622.
The Spanish WhatsApp Business profile is not required for form notification delivery. Cloud API or another approved API provider requires account authorization, and billed template messages may apply. Do not revive CallMeBot as the sole production channel (previous server calls were blocked by HTTP 403).

## Verification checklist
- U.S. public WhatsApp still shows +1 954-865-6622.
- Spain-only links show +34 646 85 30 78.
- Bilingual greeting appears for new conversations and not during the 14-day repeat period.
- Labels and quick replies can be used by the owner.
- New actual website lead reaches HubSpot, Resend email, and U.S. WhatsApp with delivery confirmed; do not mark WhatsApp operational before this test.
