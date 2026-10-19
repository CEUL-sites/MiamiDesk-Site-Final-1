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
- Spacing: compact initial Home; balanced Sellers split; copy/graphic separation on Buyers, Markets and Global Desk; early intent-aware Contact form. The below-hero site remains intact.
- Palette: navy/ivory/gold uses existing site palette; media scrims keep copy legible; Sellers navigation correction verified.
- Assets: distinct architecture concepts, labeled as concepts, with optimized mobile sources. Existing principal portrait retained. County geometry is source-derived; Global Desk is explicitly schematic. No fictitious listings or client evidence introduced.
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
