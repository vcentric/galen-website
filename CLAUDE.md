# GalenAI website (galenai.io)

Next.js 16 App Router, React 19, Tailwind 4, Keystatic (Markdoc blog), deployed on Netlify.
Branch `v2-redesign` is a rebuild in progress. **Read `docs/v2/EXECUTION.md` before changing anything**; it links to the masterplan, page blueprints and design system.

## Commands
- `npm ci` (never `npm install`: it drifts `react-aria` and breaks the Keystatic build)
- `npm run dev`
- `npm run lint` and `NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=local npx next build` must pass before every commit

## Map
- `app/(site)/` pages with Navbar and Footer. `app/(go)/go/[slug]` ad landing pages with no chrome, always noindex.
- `content/site/*.ts` page registry: the single source for routes, metadata, sitemap and llms.txt. `status: "skeleton"` pages are noindex and out of the sitemap.
- `app/components/v2/` new components. `SpecPage` renders a `PageSpec`; `sections/index.ts` maps section kinds to components (unregistered kinds show a dashed blueprint box).
- `lib/site.ts` URLs, contact, approved lines. `lib/seo.ts` metadata and JSON-LD. `lib/cta.ts` CTA intents and store links.
- `app/components/blog/` article components. `app/data/team.ts` team page data. `app/components/v2/LegalPage.tsx` layout for `/privacy` and `/terms` (legal text: change only when the policy changes).
- `content/learn/{subject}/{topic}/index.mdoc` lessons, rendered by `lib/learn.ts`. A lesson is indexable only with `is_published: true`.
- `/download` and `/qr` are not pages: `netlify.toml` redirects both to `app.galenai.io/download`.
- `docs/v2/reference/` approved design system and the How to Use source page.

## Non-negotiable copy rules
No em dashes. "faculty", never "faculties". No textbook, publisher, author or competitor names. No "pilot". No invented numbers. Voice viva is always "Coming soon". Approved lines in `lib/site.ts` are used verbatim.

## Working rules
- `/learn` lessons come from the RAG lesson generator. Do not write lesson content by hand.
- Do not push, merge or deploy without Varun asking.
- Change only what the task asks; approved copy is ported verbatim.
