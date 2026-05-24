# HomesProfessional.com

Website for Carlos Uzcategui, Florida Licensed Realtor® SL705771, an associate at United Realty Group. The site serves as the primary digital presence for a South Florida real estate advisory practice covering seller representation, buyer mandates, cross-border Spain and LATAM advisory, and agent-to-agent referral coordination. It is built to meet the credibility standard required by institutional sellers, family office principals, and Madrid-based agency counterparties.

## Stack

- **React 19** + **TypeScript** — client-side application
- **Vite 6** — build tooling
- **Tailwind CSS v4** — utility-first styling with custom design tokens
- **react-router-dom 7** — client-side routing
- **react-helmet-async** — document head / SEO management
- **react-snap** — prerendering for SEO (Puppeteer/Chrome 68, requires `build.target: 'es2019'`)
- **motion/react** — animation
- **Netlify** — hosting, form handling, serverless functions

## Environment variables

The following environment variables must be set in the Netlify dashboard (Settings → Environment variables). No values should be committed to the repository.

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Google Gemini API key — AI desk assistant (server-side only via `netlify/functions/ai-desk.ts`) |
| `BRIDGE_API_TOKEN` | Bridge Data Output API token — live MLS listing ticker (server-side only via `netlify/functions/ticker-listings.ts`) |

The site functions without either variable. The AI desk returns a 503 gracefully; the MLS ticker falls back to representative South Florida listings.

## Local development

```bash
yarn install
yarn dev       # development server at http://localhost:5173
yarn build     # production build + react-snap prerender to /dist
yarn lint      # TypeScript type check (tsc --noEmit)
```

## Deployment

Netlify deploys automatically from the `main` branch on push. Build command: `yarn build`. Publish directory: `dist`. Functions directory: `netlify/functions`.

The `netlify.toml` at the repository root configures redirects, cache headers, and a Content-Security-Policy-Report-Only header. Promote the CSP to enforcement (`Content-Security-Policy`) once the report-only period confirms no violations.

## Principal contact

Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group  
Weston, FL · contact@carlosre.com · +1 954-865-6622
