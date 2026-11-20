# Execution plan

For the model or developer building the site from the skeleton. Work top to bottom. Each task is small enough to finish and verify in one sitting. Commit after each task.

Read first: `MASTERPLAN.md` (why), `PAGE_BLUEPRINTS.md` (bespoke pages), `reference/DESIGN_SYSTEM.md` (look), `reference/how-to-use-source/CONTEXT.md` (product facts).

---

## Progress (update as you go)

| Done | Task | Notes |
|---|---|---|
| ✅ | F1 skeleton | |
| ✅ | F2, F3 images | Image optimisation left OFF (Netlify image runtime unverified); screens pre-converted to WebP |
| ✅ | F4, F6 nav and footer | `app/components/v2/Navbar.tsx`, `Footer.tsx`. Legacy v1 components deleted |
| ✅ | F5 `/download`, `/qr` | Pages removed: both are Netlify redirects to `app.galenai.io/download` (`netlify.toml`). QR art at `public/qr/download.svg` (segno) |
| ✅ | F7 OG image | `public/og/default.png` |
| ✅ | F9 analytics | debug logs removed; `demo_interaction`, `generate_lead` events added |
| ✅ | F8 team and FAQ data | Team page is on the v2 design (data in `app/data/team.ts`), with new photos for Varun and Kavitha. To change a photo, replace the file in `public/` and keep its name (3:4 portrait). Student FAQs already rewritten in `content/site/demos.ts` |
| ✅ | F10 remove notebook background | Done with `/team`, `/privacy` and `/terms` on v2. Unused v1 CSS, media and packages removed |
| ✅ | C2, C3, C4, C10, C11, C12 | `PhoneFrame`, `QrBlock`, `TutorDemo`, `LeadForm` (+ `public/__forms.html`), `ModeExplorer`, `StoreBadges` |
| ✅ | P1 student home | |
| ✅ | P2 institutions home | video id still pending |
| ✅ | `/institutions/book-demo` | live; Netlify form `demo-request` needs a notification email |
| ✅ | Section kinds (C1, C5-C9) | `sections/kinds.tsx`: a spec section renders real content when `content` is filled; otherwise the blueprint box shows |
| ✅ | P3 institution subpages | faculty, administration, students, vs-lms, integrations: content filled, still `skeleton` (noindex) until Varun reviews |
| ✅ | P4 features, P5 `/for`, `/vs` | all content filled; pages with `flags` still show the open-questions box |
| ✅ | Review round 1 | real app answers in the tutor demo, video 3GjvIeQn9Yw, St. John's logo, team (Kavitha in, Dr. Sivaramakrishnan out), Team in nav |
| ✅ | P6 how-to-use, `/learn` lessons, `/exams` guides | Live. Lessons are indexable only with `is_published: true` |
| ⏭ | Next | P7 `/go/*` landing pages (still show "To build" boxes), P9 `/institutions/resources/*` (skeleton, needs Dr. Arun), Netlify form notification email |

Gotchas learned: stop any `next start` server before `next build` (TaskStop does not always kill the node process; free port 3123 with `Stop-Process`). Check the build's exit code, not a grep's. Headless Chrome screenshots under 500 px wide are wrong; use Playwright with a mobile viewport.

---

## Setup

```bash
npm ci                                  # NOT npm install: it drifts react-aria and breaks the Keystatic build
npm run dev                             # http://localhost:3000
NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND=local npx next build   # must pass before every commit
```

Skeleton pages show dashed "To build" boxes with the build notes for that section. Browse them at `/features`, `/for/neet-pg`, `/institutions/faculty`, `/go/ask`, `/how-to-use`.

---

## Hard rules (a page that breaks one is not done)

1. **Copy:** no em dashes. "faculty", never "faculties". No textbook, publisher or author names. No competitor names or logos. No "pilot". Voice viva always carries "Coming soon". No number that is not on the approved list (MASTERPLAN section 6). Medical content only from approved collateral; do not write new medical facts.
2. **Design:** one orange phrase per headline. Flat backgrounds. Never pure black. One mascot per page at most. Cream-head logo only.
3. **Links to apps and stores go through `CtaLink` and `lib/cta.ts`.** URLs and contact details come from `lib/site.ts`. Never hardcode.
4. **Every route calls `buildMetadata()`.** Client pages get it from a sibling `layout.tsx`.
5. **Publish gate:** a spec page stays `status: "skeleton"` until its checklist passes and its `flags` are cleared by Varun. Do not flip pages live in bulk.
6. **Server components by default.** `"use client"` only for real interaction, and keep those components small.
7. **Do not write `/learn` lesson content by hand.** Lessons come from the RAG lesson generator and are copied in after review.
8. **Change only what the task asks.** Approved copy in the how-to source is ported verbatim.
9. **Do not push, merge or deploy.** Commit locally on `v2-redesign`. Varun decides when it goes to the remote.

Check before each commit:
```bash
npm run lint                                                                                   # must report 0 errors
grep -rn "—" app content lib --include=*.ts --include=*.tsx | grep -v "^.*//" | grep -v "/\*"   # em dashes in copy
grep -rniE "faculties|pilot|marrow|prepladder|guyton" app content --include=*.ts --include=*.tsx
```
(Legacy files will match until they are replaced. New and edited files must not.)

---

## Part F: foundation (do first)

| # | Task | Done when |
|---|---|---|
| F1 | **Done in skeleton.** Route groups `(site)` and `(go)`, `lib/site.ts`, `lib/seo.ts`, `lib/cta.ts`, registry in `content/site/`, `SpecPage`, sitemap, robots, llms.txt, v2 CSS. | Build passes, 100+ routes prerendered |
| F2 | Turn image optimisation back on: remove `images.unoptimized: true` from `next.config.ts`, confirm the Netlify Next runtime serves `/_next/image`. If it cannot, pre-convert every PNG to WebP and keep it off. | Images served as WebP/AVIF at the right size |
| F3 | Convert `public/brand/ui/*.png` (2.5 MB) and `public/Student Layer.png` to WebP. | No PNG over 150 kB referenced by a page |
| F4 | Replace the logo in Navbar and Footer with `public/brand/lockup.svg`. | Cream-head lockup everywhere |
| F5 | Rebuild `/download` and `/qr` per PAGE_BLUEPRINTS section 3, using `playStoreUrl()` and `appStoreUrl()`. | Desktop sees QR + badges + web link; phone reaches the store with `referrer` (Android) or `ct` (iOS) set when UTMs are present |
| F6 | Rebuild Navbar and Footer per PAGE_BLUEPRINTS section 4. | Server components; institution nav on every `/institutions/*` path; footer links every live hub |
| F7 | Social preview image `public/og/default.png`, 1200 × 630, cover style ("AI for medical colleges." on the dark grid). Optional: per-page images with `next/og`. | Sharing any page shows the image |
| F8 | Fix `app/data/team.ts` and `faqs.ts` after Varun answers decisions 1 and 8. | Team page correct; FAQs follow the copy rules |
| F9 | Add GA4 events: `generate_lead` (demo form), `demo_interaction` (home try-it chips), keep `cta_click`. Remove the `console.log` calls in `lib/analytics.ts`. | Events visible in GA4 DebugView |
| F10 | Remove the notebook-paper background from `:root` in `globals.css` once no legacy page depends on it. | Flat backgrounds site-wide |

## Part C: shared components (`app/components/v2/`)

Build once, register in `sections/index.ts` under `byKind`, and every spec page upgrades.

| # | Component | Notes |
|---|---|---|
| C1 | `sections/Steps` (kind `steps`) | Orange number, title, one line. Numbers only for real sequences |
| C2 | `PhoneFrame`, `DesktopFrame` | Design system section 6. Fixed aspect ratio so there is no layout shift |
| C3 | `QrBlock` | Rounded box, hand-drawn orange arrow, specific payoff line. Generate the QR as inline SVG at build time |
| C4 | `sections/Demo` (kind `demo`) | Phone frame + question chips that swap stored answers. Client component, small. Demo content lives in `content/site/demos.ts` (create it; copy answers from the approved collateral) |
| C5 | `sections/Screens` (kind `screens`), `sections/Features` (kind `features`) | Image galleries and dot lists |
| C6 | `sections/Compare` (kind `compare`) | Accessible `<table>`; stacks on phone |
| C7 | `sections/Proof` (kind `proof`) | Approved numbers and testimonials only |
| C8 | `sections/Explain` (kind `explain`) | Prose block, max 68 characters wide |
| C9 | `sections/CtaBand` (kind `cta`) | Dark band, heading from the section spec, the page's primary CTA |
| C10 | `sections/LeadForm` (kind `form`) | Netlify Forms, honeypot, inline success state, `generate_lead` |
| C11 | `ModeExplorer`, `StepViewer` | Ported from the how-to source page. Used by `/features/tutor-modes`, the home page and every how-to guide |
| C12 | `StoreBadges` | Official badge artwork, links via `lib/cta.ts` |

## Part P: pages, in this order

| # | Page | Source |
|---|---|---|
| P1 | Student home `/` | PAGE_BLUEPRINTS section 1 |
| P2 | Institutions home `/institutions` | PAGE_BLUEPRINTS section 2 |
| P3 | `/institutions/faculty`, `/administration`, `/students`, `/vs-lms`, `/book-demo`, `/integrations` | `content/site/institutions.ts` |
| P4 | `/features` hub and the eight core feature pages | `content/site/features.ts` |
| P5 | `/for/*` and `/vs/*` | `content/site/audiences.ts` |
| P6 | `/how-to-use/*` (35 guides) | Port from `reference/how-to-use-source/index.html`. Then set `HOW_TO_LIVE = true` |
| P7 | `/go/*` (six variants) | `content/site/go.ts`. Needs the campaign briefs and ad creatives from Varun for exact message match |
| P8 | The four generator feature pages | Blocked on open decision 3 |
| P9 | `/institutions/resources/*` (five) and a `/institutions/resources` hub page | Needs Dr. Arun's review. Note: the hub route does not exist yet; add `app/(site)/institutions/resources/page.tsx` |
| P10 | `/contact`, `/team` refresh | |
| ✅ | `/learn/*` | Built from the RAG lesson files in `content/learn/` |

### Checklist to flip any page to live

- [ ] No dashed "To build" boxes left; no `TODO` text rendered
- [ ] All `flags` on the spec answered by Varun and removed
- [ ] Hard rules 1 and 2 pass (run the greps)
- [ ] Title under about 60 characters, description 140 to 160, both unique
- [ ] One H1; H2s read as questions or plain statements
- [ ] Answer-first paragraph is true, specific and 40 to 60 words
- [ ] At least three internal links in, three out
- [ ] Checked at 360, 768 and 1440 px wide: no horizontal scroll
- [ ] Lighthouse mobile: LCP under 2.5 s, CLS under 0.1, accessibility 95+
- [ ] Structured data validates (Google Rich Results Test or schema.org validator)
- [ ] Then: `status: "live"` (or `live: true` in `staticRoutes`, and remove the page's `noindex: true`), rebuild, confirm it appears in `/sitemap.xml`

## Part A: the apps (other repos, hand to tech)

| # | Where | Change |
|---|---|---|
| A1 | `app.galenai.io` | `<title>GalenAI: AI Tutor for Medical Students</title>`, meta description, `<link rel="canonical" href="https://app.galenai.io/">`, Open Graph tags and image. Keep `Disallow: /share/`. Add `Sitemap:` line only if public pages exist |
| A2 | `faculty.galenai.io` | Title "GalenAI for Faculty" (currently "GalenAI Faculty Sandbox"). Serve a real `robots.txt` (today it returns the app's 404 page with status 200). `noindex` on every route except sign-in. Return real 404 status for unknown paths |
| A3 | App Store and Play Store listings | Align the first line and description with the site: "AI tutor, question bank, flashcards and clinical cases for MBBS students." Same screenshots as the site |
| A4 | Google Search Console | Verify `www.galenai.io` (domain property covers subdomains). Submit `https://www.galenai.io/sitemap.xml`. Token goes in `app/layout.tsx` `verification` |
| A5 | Netlify | Confirm `www` is the primary domain and the bare domain 301s to it (canonicals assume `www`) |

## After launch

- Search Console weekly: indexed pages against the sitemap count, queries per section.
- GA4: `cta_click` by `source` and `intent`, per landing page. This is the conversion number.
- Test AI visibility monthly: ask ChatGPT, Perplexity and Gemini "best AI tutor for MBBS students in India" and "LMS for CBME medical colleges"; note whether GalenAI is named and which page is cited.
- Promote the best `/go` variant's hero to the home page.
