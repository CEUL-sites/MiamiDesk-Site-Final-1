# Production requirements regression correction — October 14, 2026

Base: e8e8715d17655fc1bff721874b6a8402fcd0031d (PR #172), following the production fixes in PR #171.

The later presentation update omitted the shared six-figure grid from the homepage distribution section and sent two homepage seller CTAs to a separate seller page. The correction restores the existing DistributionMetrics component on both homepage languages and sends those seller CTAs to their existing #list-here hero form. The shared media component keeps #contact on /sell through a configurable target.

The six approved figures retain their existing source attribution, property eligibility restrictions, association-volume qualification and Pembroke Pines opening-soon note. No new statistics or outcome claims were added.

Validation:

- 32 application tests passed; TypeScript checking passed.
- 16 HubSpot safeguard tests passed; all repository verification scripts and search-foundation checks passed.
- Clean npm run build passed, with 175 prerendered routes and 171 indexable sitemap URLs.
- Development and production-preview browser checks each passed 18 route/viewport combinations at 1440×1000 and 390×844. No application console errors or horizontal overflow. Verified the restored grid, EN/ES CTA navigation, /sell contact target and two-step seller payload.
- Independent code review identified the shared /sell media usage; its target was preserved and rechecked. No remaining concrete review issues.
- The live HTML audit of all 171 sitemap URLs passed: rendered H1s, unique titles, descriptions, canonical tags, licensing and Fair Housing notices. City aliases resolve correctly; unknown journal and image paths return 404.
- Google Search Console accepted the updated sitemap on October 14 and discovered 171 pages.
- Both supplied URG directory images were readable and checked: 19 Florida locations, including Pembroke Pines marked opening soon; the additional Texas and North Carolina offices were not counted as Florida offices.

Local browser checks intercepted external requests and simulated submissions. The production honeypot check returned HTTP 200 without creating a lead; required Netlify form fields remained registered. No live email or CRM receipt is claimed. Production hubspot-status reports configured=false and marketingEnrollment=false.

Q3 city figures remain pending the official October 16 release. Verified Q2 figures, city strategy callouts and the pending-release notice remain displayed.
