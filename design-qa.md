# Six-hero design QA

Scope: approved visual direction, hero behavior and responsive presentation. This is not production-release approval.

Source visual truth:
- `/workspace/scratch/0a7a482a7d50/generated_images/exec-2ac07d0f-0d05-4c63-b56e-8450b3845749.png`
- `/workspace/scratch/0a7a482a7d50/generated_images/exec-373350a1-72fe-4bcb-828b-4275ee956d94.png`

Implementation evidence:
- `/workspace/scratch/hp-staging-home.jpg`
- `/workspace/scratch/hp-staging-sellers-final.jpg`
- `/workspace/scratch/hp-design-comparison.jpg` (both sources and both implementations together)
- `/workspace/scratch/hp-responsive-home.jpg`
- Complete before/after gallery: `HomesProfessional-Hero-Review.html` in the delivery package.

Source images 1505×1045; implementation 1357×932 CSS pixels. Combined comparison normalizes panel widths. The source is an approved creative direction, not an exact viewport specification. The Home card intentionally preserves the existing two-stage form, market selection and priority controls; the mock’s inline address row is not a substitute for the functioning workflow. Sellers uses a straight image edge, retains useful original content and avoids unsupported added copy. These are intentional product constraints, not claimed pixel equivalence.

Browser environment: cloud Chrome; desktop1357×932; local iframe viewport 390×844 and 768×844 across all six pages, with additional 320px Home and Sellers inspection. No physical mobile keyboard testing or mobile-sized hosted-browser viewport was available.

Comparison history:
1. P1: Sellers white navigation lost contrast on ivory. Fixed with scoped solid navy navbar; hosted screenshot confirms readable original logo and links.
2. P2: Home primary button appeared too low at 390px. Removed duplicated CTA/WhatsApp, shortened credentials and tightened mobile gaps. Address and button are visible earlier; preserved contact step expands on demand.
3. P2: Contact’s repeated form introduction pushed fields below the mobile opening. Scoped compact heading/prose, smaller portrait and 2-column intent controls bring the first field forward.
4. P1: Netlify’s older prerender browser rejected Object.hasOwn. Replaced with Object.prototype.hasOwnProperty.call; subsequent hosted build succeeded.
5. P2: Automated accessibility found a heading-level skip in Contact and visible-name mismatches on EN/ES controls. Corrected heading semantics and accessible names ; 40 frontend/integration tests pass, including Contact heading regression.

Required fidelity surfaces:
- Typography: existing editorial serif and readable sans preserved; controlled responsive H1 wrapping, no clipping observed at reviewed widths. All six pages have one H1.
- Spacing: compact initial Home; balanced Sellers split; copy/graphic separation on Buyers and Markets; a panoramic Global Desk hero; early intent-aware Contact form. The below-hero site remains intact.
- Palette: navy/ivory/gold uses existing site palette; media scrims keep copy legible; Sellers navigation correction verified.
- Assets: distinct architecture concepts, labeled as concepts, with optimized mobile sources. Existing principal portrait retained. County geometry is source-derived; Global Desk architecture is explicitly conceptual. No fictitious listings or client evidence introduced.
- Copy: matches the approved six-page direction. Existing Buyer headline retained after audit. Seller benefits focus on positioning, negotiation and personal review rather than promised outcomes.

Primary interactions tested on actual Netlify preview:
- Home empty-address feedback, manual address entry and transition to contact details.
- Sellers consultation and system anchors.
- Buyers consultation anchor to the existing buyer form.
- County selection, Enter activation, qualitative guidance and local service links.
- Global Desk English/Spanish and international inquiry anchor.
- Contact buyer/referral intent, optional property fields and empty required-field validation.

Console: no general application crash after the compatibility fix. Google returns RefererNotAllowedMapError on the preview host; fallback remains enabled. Extension metadata errors are unrelated to site code. No verified submission or CRM write was performed.

Remaining release conditions: authorize exact Google preview referrer; complete existing server-side HubSpot configuration (public status configured:false in production and staging); validate delivery end to end; resolve or explicitly accept outstanding load-performance work. Local compressed mobile Lighthouse LCP is 3.84–5.53s across the pages, CLS 0; this does not establish 75th-percentile field CWV or INP. Existing below-hero/footer accessibility findings remain.

Follow-up polish: real-device keyboard/cropping checks and hosted field/performance validation. No P0/P1/P2 visual-direction discrepancy remains within the reviewed hero presentations.

final result: passed


## Global Desk panorama revision — 19 October 2026

The user selected the clean Madrid–Miami architectural panorama and rejected agent cards and connection effects. Replaced only the Global Desk opening, with a page-scoped stylesheet and two optimized WebP sources. No new dependency, video, form, or third-party service. Existing cooperation terms, English/Spanish state, tracking calls and inquiry destinations remain intact.

- English H1: International Property. Miami Connections.
- Spanish H1: Propiedad internacional. Conexiones en Miami.
- English CTA: Discuss Your Listing; secondary: How It Works.
- Spanish CTA: Consultar su propiedad; secondary: Cómo funciona.
- Artwork is visibly labeled conceptual; it depicts neither an actual listing nor a real combined city.

Validation: TypeScript, 40 existing frontend/integration tests, Global Desk language/conversion contract, Vite production build and whitespace checks passed. Netlify completed its full configured build and prerender for application commit 938b0edbe501e984b3b1673f036163a98332f02c (deploy 6ad6795ca6a27e06b347ffb0, ready). The local standalone react-snap attempt lacked its downloaded Chromium; the hosted full build supplies the prerender validation.

Browser evidence: desktop 1357×932; local iframe widths 320, 390 and 768 (844px high). The narrow frame has a 314px content viewport after its scrollbar. No horizontal overflow; Spanish CTA bottom approximately501px at that narrow width, with the full hero approximately759px tall. Desktop hero approximately654px tall. EN/ES control contrast was corrected with a dark backing. The mobile crop loads its960px source, desktop its1920px source. Hosted title, one H1, loaded artwork, language toggle, workflow anchor and Spanish inquiry anchor verified. The inquiry destination retains form name global-desk-listing; no submission or third-party message was sent. No relevant application console error observed; browser-extension metadata errors excluded.

Working preview: https://deploy-preview-179--miamidesk.netlify.app/global-desk/
Review: https://github.com/CEUL-sites/MiamiDesk-Site-Final-1/pull/179

Physical-device keyboard behavior, field Core Web Vitals and new Lighthouse measurements were not tested in this focused visual revision. Existing Google/HubSpot configuration limitations recorded above are not resolved by the hero change. Production publication remains a separate approval.
