# Miami Global Listing Desk Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a compliant, segmented, shorter, bilingual, measurable Miami Global Listing Desk conversion funnel.

**Architecture:** Keep the current Vite/React page and design system. Route language at the page boundary, pass audience/language into focused child components, preserve the existing Netlify submission pipeline, and add only the analytics events needed to measure this funnel.

**Tech Stack:** React 19, TypeScript 5.8, React Router 7, Tailwind CSS 4, Motion, Netlify Forms, existing analytics helpers.

## Global Constraints

- Use only: 93,000 members; 200+ global websites; 19 languages; 260+ U.S. MLSs; 437+ international agreements; 11 MLS data exchanges; $69B 2025 association-network volume; 3,500+ URG agents; 20 URG Florida offices.
- Use “Miami Global Listing Desk” as the service name.
- Do not imply MLS ownership, official MIAMI REALTORS® endorsement, guaranteed placement, buyers, leads, commissions, or sales.
- Preserve the existing navy/gold styling, typography, spacing system, compliance footer, and contact details.
- Keep `/global-desk` Spanish/x-default and add `/global-desk/en` for English.
- Do not add dependencies.

---

### Task 1: Record failing production assertions

**Files:**
- No repository files changed.
- Test: live `https://homesprofessional.com/global-desk` DOM and responsive geometry.

**Interfaces:**
- Consumes: deployed page DOM.
- Produces: a red assertion record for the five approved changes.

- [ ] **Step 1: Run the failing source/DOM assertions**

Check that the current live page fails these requirements:

```js
({
  compliantHero: !document.querySelector("h1")?.textContent?.includes("Compradores estadounidenses cualificados"),
  hasAudiencePaths: document.querySelectorAll("[data-global-desk-audience]").length === 3,
  shortForm: !document.querySelector('input[name="images"]') && !!document.querySelector('input[name="propertyUrl"]'),
  spanishSticky: [...document.querySelectorAll("a")].some(a => a.textContent?.includes("Solicitar revisión")),
  stableEnglishRoute: !!document.querySelector('a[href="/global-desk/en"]')
})
```

Expected: at least `compliantHero`, `hasAudiencePaths`, `shortForm`, `spanishSticky`, and `stableEnglishRoute` are `false`.

- [ ] **Step 2: Save the assertion output in the task notes**

Expected: the red state proves the release checks detect the current behavior.

### Task 2: Publish compliant positioning, audience paths, and verified proof

**Files:**
- Modify: `src/pages/GlobalDeskPage.tsx`
- Modify: `src/components/SEO/SchemaOrg.tsx`

**Interfaces:**
- Consumes: `pushEvent(eventName, payload)`, `GlobalDeskListingForm.initialSubmitterType`, verified figure constants.
- Produces: `GlobalDeskPage({ initialLang?: "es" | "en" })`, three `data-global-desk-audience` links, compliant metadata/schema, proof block.

- [ ] **Step 1: Replace the noncompliant hero and service wording**

Use the already approved vocabulary:

```ts
heroEyebrow: "Miami Global Listing Desk · Activación internacional de propiedades",
heroTitle: "Distribución internacional y activación de agentes compradores para propiedad prime española.",
heroSub: "Miami Global Listing Desk ayuda a propiedades prime seleccionadas a entrar en el ecosistema inmobiliario profesional del sur de Florida, operado por Carlos Uzcategui, Florida Realtor®, a través de United Realty Group.",
heroCta: "Solicitar una presentación privada"
```

Mirror in English and keep the explicit brokerage/platform/compliance caveat.

- [ ] **Step 2: Add the audience interface**

Use the exported type:

```ts
export type GlobalDeskSubmitterType = "" | "agency" | "developer" | "owner" | "agent";
```

Store the selected audience in `GlobalDeskPage`, emit:

```ts
pushEvent("global_desk_audience_select", { audience, language: lang });
```

Render exactly three links for owner, agency, and developer with `data-global-desk-audience`.

- [ ] **Step 3: Add verified operating proof**

Render four proof items: Florida license since 2001, CLHMS, 3,500+ URG agents/20 Florida offices, and personal review by Carlos. Do not add performance outcomes.

- [ ] **Step 4: Align page and sitewide Service schema**

Use:

```ts
serviceType: "International property distribution and buyer-agent activation"
```

and state that all activity is subject to brokerage, platform, MLS, association, legal, and compliance requirements.

### Task 3: Shorten the intake and preserve submission reliability

**Files:**
- Modify: `src/components/forms/GlobalDeskListingForm.tsx`
- Modify: `index.html`

**Interfaces:**
- Consumes: `initialSubmitterType?: GlobalDeskSubmitterType`.
- Produces: the existing `global-desk-listing` Netlify submission with fewer first-step fields and optional `propertyUrl`.

- [ ] **Step 1: Initialize the form from the audience choice**

```ts
export function GlobalDeskListingForm({
  lang,
  initialSubmitterType = "",
}: {
  lang: Lang;
  initialSubmitterType?: GlobalDeskSubmitterType;
}) {
  const [submitterType, setSubmitterType] = useState(initialSubmitterType);
```

Render the form with `key={selectedAudience || "unselected"}` so a new audience selection initializes cleanly.

- [ ] **Step 2: Remove upload and technical-detail requirements**

Remove image/document state, `FileField`, upload validation, and first-step bedroom/bathroom/area/condition/features inputs. Keep role, engagement path, contact, jurisdiction, license/project conditional fields, property count, location, asking price, timeline, and description.

- [ ] **Step 3: Add optional property URL and qualification copy**

```tsx
<Field label={t.propertyUrl}>
  <input name="propertyUrl" type="url" className="form-input-dark" value={form.propertyUrl || ""} onChange={set("propertyUrl")} />
</Field>
```

Explain that images and supporting documents are requested after Carlos's initial review.

- [ ] **Step 4: Preserve reliability and tracking**

Keep the 20-second AbortController, `response.ok` check, direct notification, acknowledgment request, `trackLead`, authorization, consent, and bilingual error/success states. Add `property_url` and `audience` to the form-submit analytics payload.

- [ ] **Step 5: Update Netlify's static form declaration**

Add:

```html
<input name="propertyUrl" />
```

Keep old declared fields harmlessly for backward compatibility.

### Task 4: Make language and mobile conversion behavior route-aware

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/pages/GlobalDeskPage.tsx`
- Modify: `src/components/MobileStickyCTA.tsx`
- Modify: `src/components/CookieBanner.tsx`
- Modify: `src/components/Navbar.tsx`
- Modify: `src/constants.ts`
- Modify: `package.json`
- Modify: `vite.config.ts`

**Interfaces:**
- Consumes: `GlobalDeskPage.initialLang`, `MobileStickyCTA.language`, `MobileStickyCTA.primaryHref`.
- Produces: Spanish `/global-desk`, English `/global-desk/en`, route-aware labels/canonical/hreflang, sticky guards.

- [ ] **Step 1: Add the English route and prerender/sitemap entries**

```tsx
<Route path="/global-desk" element={<GlobalDeskPage initialLang="es" />} />
<Route path="/global-desk/en" element={<GlobalDeskPage initialLang="en" />} />
```

Add `/global-desk/en` to react-snap and sitemap route lists.

- [ ] **Step 2: Replace the state-only language toggle with route links**

```tsx
<a href="/global-desk" aria-current={lang === "es" ? "page" : undefined}>ES</a>
<a href="/global-desk/en" aria-current={lang === "en" ? "page" : undefined}>EN</a>
```

Set canonical and hreflang from the route language.

- [ ] **Step 3: Guard the sticky CTA**

Add optional props:

```ts
type MobileStickyCTAProps = {
  language?: "es" | "en";
  primaryHref?: string;
};
```

Hide the sticky control while consent is unresolved or any `[data-sticky-cta-guard]` element intersects. Use “Solicitar revisión” in Spanish and “Request review” in English.

- [ ] **Step 4: Localize the cookie dialog**

Use the current route to render Spanish copy on `/global-desk` and English on `/global-desk/en`; preserve the existing consent storage and event.

- [ ] **Step 5: Keep navigation and Spain routing correct**

Treat `/global-desk/en` as a Global Desk subroute for active navigation and Spain WhatsApp routing. Replace verified URG office values of 21 with 20 in `src/constants.ts`.

### Task 5: Publish and verify the deployed funnel

**Files:**
- Verify all files above at their final GitHub SHAs.
- Save screenshots outside the repository.

**Interfaces:**
- Consumes: default-branch deployment.
- Produces: live Spanish/English verified release.

- [ ] **Step 1: Verify source invariants**

Confirm current GitHub files contain the compliant hero, three audience links, short form, `propertyUrl`, route-aware sticky CTA, English route, and 20-office figure.

- [ ] **Step 2: Verify the live deployment**

Run the Task 1 assertions again on Spanish and English routes.

Expected: all five assertions are `true`.

- [ ] **Step 3: Exercise interactions**

On Spanish: select “Propietario”, confirm the form preselects owner, and confirm the sticky CTA is hidden while the hero CTA/form is visible.

On English: confirm English metadata, heading, audience cards, form copy, cookie copy, and “Request review”.

- [ ] **Step 4: Check rendered quality**

At desktop and 390×844 mobile: no header overlap, no horizontal overflow, no framework overlay, readable CTA hierarchy, and no cookie/sticky stacking.

- [ ] **Step 5: Check console and commit state**

Explain any third-party-only warnings. Confirm the deployed source contains the final commit and report workflow/check status without claiming unavailable CI evidence.
