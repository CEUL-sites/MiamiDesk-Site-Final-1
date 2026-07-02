import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

// TODO: Legal review by Florida real estate counsel and an RGPD-qualified Spanish counsel
// required before this policy is considered final. Remove this notice once cleared.

const EFFECTIVE_DATE = "May 2026";
const CONTACT_EMAIL = "contact@carlosre.com";

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | HomesProfessional.com</title>
        <meta name="description" content="Privacy policy for HomesProfessional.com — how we collect, use, and protect your information." />
        <link rel="canonical" href="https://homesprofessional.com/privacy" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <main id="main-content" className="min-h-screen bg-white pb-20">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 py-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Legal</p>
          <h1 className="mt-4 font-serif text-4xl text-navy">Privacy Policy</h1>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-navy/45">Effective: {EFFECTIVE_DATE} · HomesProfessional.com</p>

          <div className="mt-10 space-y-10 font-sans text-base leading-relaxed text-navy/75">

            <section>
              <h2 className="font-serif text-2xl text-navy">1. Who we are</h2>
              <p className="mt-4">This website, HomesProfessional.com, is operated by Carlos Uzcategui, Florida Licensed Realtor® SL705771, an associate at United Realty Group (1200 S Pine Island Rd, Suite 600, Plantation, FL 33324). Questions about this policy may be directed to <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline">{CONTACT_EMAIL}</a>.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">2. Data we collect</h2>
              <p className="mt-4">We collect information in the following ways:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li><strong>Contact and inquiry forms.</strong> When you submit a seller strategy request, buyer brief, referral inquiry, or lead magnet request, we collect your name, email address, phone number, and any property or transaction details you provide. Submissions are processed by Netlify Forms.</li>
                <li><strong>AI desk interactions.</strong> If you use the AI chat assistant on this site, your message text is transmitted to our Netlify Function, which calls the Google Gemini API. We do not store AI chat transcripts beyond the duration of your session.</li>
                <li><strong>Cookies and usage data.</strong> We set a single functional cookie to record your cookie consent choice. If analytics services are enabled (see Section 5), additional identifiers may be set by those services.</li>
                <li><strong>Server logs.</strong> Netlify automatically retains standard server logs including IP address, browser type, and page requests. These are retained per Netlify's data retention policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">3. How we use your data</h2>
              <p className="mt-4">Information you submit through our forms is used solely to respond to your inquiry, provide the requested advisory service, and, with your consent, to send relevant market information. We do not sell your personal data. We do not share your data with third parties except as described in Section 4.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">4. Data sharing</h2>
              <p className="mt-4">Your information may be shared with the following parties in the course of providing services:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li><strong>United Realty Group.</strong> As Carlos's brokerage, United Realty Group may have access to transaction-related data as required by Florida real estate law and brokerage supervision requirements.</li>
                <li><strong>Miami and South Florida REALTORS® / MLS.</strong> If your property is listed, listing data enters the MLS database as required by association membership rules.</li>
                <li><strong>Netlify.</strong> Form submissions and hosting infrastructure. See Netlify's privacy policy at netlify.com.</li>
                <li><strong>Google (Gemini API).</strong> AI desk messages are processed by Google's Gemini API. See Google's privacy policy at policies.google.com.</li>
                <li><strong>Legal requirements.</strong> We may disclose data if required by applicable law, court order, or regulatory authority.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">5. Analytics</h2>
              <p className="mt-4">This site may use analytics services (Google Analytics 4, Meta Pixel, LinkedIn Insight Tag) to understand traffic patterns and improve service delivery. These services set their own cookies and may collect device and behavioral data. You may opt out of analytics cookies via the cookie preference control on this site.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">6. Data retention</h2>
              <p className="mt-4">Form submissions are retained for as long as necessary to fulfill the inquiry or as required by Florida real estate record-keeping regulations (minimum 5 years for transaction-related records under Florida Statute § 475.5015). You may request deletion of inquiry records that did not result in a transaction by contacting us at {CONTACT_EMAIL}.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">7. Your rights</h2>
              <p className="mt-4">Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict processing of your personal data. Residents of the European Union and Spain have additional rights under the General Data Protection Regulation (GDPR / RGPD), including the right to data portability and the right to lodge a complaint with a supervisory authority (Agencia Española de Protección de Datos — aepd.es — for Spain-based contacts).</p>
              <p className="mt-4">To exercise any of these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline">{CONTACT_EMAIL}</a>. We will respond within 30 days.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">8. Cookies</h2>
              <p className="mt-4">We use a single first-party cookie (<code className="bg-bone px-1 font-mono text-sm">hp_cookie_consent</code>) to store your cookie preference. If you accept analytics cookies, third-party cookies from Google, Meta, and LinkedIn may also be set. You may change your preference at any time using the cookie settings control in the site footer.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">9. Security</h2>
              <p className="mt-4">All data is transmitted over HTTPS. API keys and third-party credentials are stored exclusively as server-side environment variables and are never exposed in the client-side code bundle.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">10. Changes to this policy</h2>
              <p className="mt-4">We may update this policy periodically. The effective date at the top of this page reflects the most recent revision. Continued use of this site after a policy update constitutes acceptance of the revised terms.</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-navy">11. Contact</h2>
              <p className="mt-4">Carlos Uzcategui · Florida Licensed Realtor® SL705771<br />
              United Realty Group · 15951 SW 41 St #700, Weston, FL 33331<br />
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline">{CONTACT_EMAIL}</a><br />
              +1 954-865-6622</p>
            </section>

          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
