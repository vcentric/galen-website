# GalenAI website v2: masterplan

Owner: Varun (CEO). Planned 12 Nov 2026. Branch `v2-redesign`.
This is the strategy and the reasons. `PAGE_BLUEPRINTS.md` is what each bespoke page contains. `EXECUTION.md` is the ordered task list. Read all three before changing code.

---

## 1. What this site is for

| Audience | Share of visits | Job of the site | The one action |
|---|---|---|---|
| **Students** (MBBS, NEET PG, INI-CET, FMGE) | Most | Make them think "I need this now" inside one screen | Get the app (phone) or try it on web (desktop) |
| **Colleges** (deans, MEU, faculty) | Few, high value | Explain the three-part story, prove it is real | Try the faculty platform live, or book a demo |
| **Search and AI engines** | Feeds both | Understand what GalenAI is, cite it, send the right people | Crawl, index, quote |

The home page `/` is the student page. `/institutions` is the college page. Everything else supports one of the two.

---

## 2. Research: what makes a consumer app site convert

**Honest note on evidence.** I searched for controlled studies on app landing page conversion and found almost none in public. What exists is vendor blogs and teardowns. So the principles below are ranked by how well supported they are, and nothing here should be quoted as a statistic.

| Principle | Support | How we apply it |
|---|---|---|
| **Speed.** Google's Core Web Vitals "good" thresholds are LCP under 2.5 s, INP under 200 ms, CLS under 0.1, at the 75th percentile of real users. | Strong (Google's own published thresholds; consistent across sources) | Performance budget in section 7. Our users are on mid-range Android on mobile data, so this matters more for us than for a desktop SaaS site. |
| **One primary action, repeated.** Nav CTA and hero CTA ask for the same thing. | Moderate (consistent practitioner guidance; a Demand Curve teardown of Ahrefs; Duolingo teardowns note CTA and H1 fit one viewport on every device) | One CTA vocabulary (`lib/cta.ts`). Hero, nav, sticky phone bar and final band all carry the same intent. |
| **Message match.** The landing page repeats the promise of the ad that sent the visitor. | Moderate (practitioner consensus; a secondary source attributes a 20 to 50 percent lift for dedicated pages to Unbounce, which I could not verify in Unbounce's own report) | `/go/*` pages, one per campaign, section 4. |
| **Show the product working, not a description of it.** | Moderate (teardowns; consistent with Duolingo, which lets you start the product before signing up) | The "try it here" section on the home page: a real question, a real answer, in a phone frame, before any download. |
| **Specific payoff on the button.** "Get 4 questions" beats "Get started". | Weak to moderate (practitioner opinion), but already a GalenAI brand rule that Varun approved for QR codes | Every CTA label names what happens next. |
| **Social proof near the CTA.** | Weak (vendor-cited figures only) | Use it, but only with real, approved numbers (section 6). Do not expect a measured lift. |
| **App store pages are the most-cited source when AI engines recommend apps.** | Weak (one vendor study, AppTweak, May 2026 ChatGPT sample) | Treat the store listings as part of GEO: same wording as the site. Task A3. |

Sources: Google Core Web Vitals documentation (web.dev); Unbounce Conversion Benchmark Report (Q4 2024 data: median landing page conversion 6.6 percent across about 41,000 pages, varies widely by industry); landingdoctors.com Duolingo teardown; AppTweak "GEO for apps" (2026); Demand Curve Ahrefs teardown (TechCrunch, 2021).

**What we will not know until launch:** which headline and which demo convert best for GalenAI's students. The architecture is built so that can be tested cheaply: `/go/*` variants are data, sections are shared.

---

## 3. The student funnel

Today every button goes to `/qr`, which redirects by device. That is kept, cleaned up and made explicit.

```
                         ┌──────────── phone ───────────┐
Ad / reel ─► /go/{x} ─┐  │  CTA "download" ─► /download ─► App Store / Play Store
Search ─► /learn, /for ├─►│                                 (attribution carried, see below)
Direct ─► /           ─┘  │
                         └──────────── desktop ─────────┐
                            CTA "try-web" ─► app.galenai.io (trial web app)
                            CTA "download" ─► /download page with QR + store badges
                                                app.galenai.io itself prompts the download
```

Rules:
1. **Two CTAs in the hero, always the same two:** primary `download` ("Download the app"), secondary `try-web` ("Try it on web"). No device sniffing in the hero, so there is no layout shift and it works without JavaScript.
2. **`/download` becomes a real page.** Phones are redirected to the right store as now. Desktop no longer bounces to `/`; it shows a QR code, both store badges and a "Try it on web" button. (Today a desktop visitor who clicks download lands back on the home page, which is a dead end.)
3. **Sticky phone bar** (`StickyMobileCta`) appears after the hero scrolls away.
4. **iOS Smart App Banner** is on site-wide (`itunes.appId` in the root layout).
5. **Attribution fix.** The old code appended `utm_*` to store URLs. Google Play ignores those and only passes a `referrer` parameter to the app. `lib/cta.ts` has `playStoreUrl()` and `appStoreUrl()` that encode UTMs the way each store reads them. `/download` and `/qr` must use them (task F5).

The institution funnel is simpler: `faculty-live` (faculty.galenai.io) for people who want to touch it, `demo` (`/institutions/book-demo`) for people who want to talk.

---

## 4. How ad landing pages blend with the home page

The home page tells the whole story in order. A `/go` page is **one beat of that story**, matched to one ad.

| | Home `/` | `/go/{slug}` |
|---|---|---|
| Visitor | Anyone | Came from one specific ad or QR |
| Claims | The full sequence | One, the same words as the ad |
| Navigation | Full nav and footer | None. The logo is not even a link |
| CTAs | Two (download, try on web) | One, with a specific label |
| Indexing | Indexed | `noindex`, not in sitemap |
| Built from | Shared section components | The **same** section components |

Because both use the same sections, a variant that wins on `/go` can be promoted to the home page by reordering, not rebuilding. A new campaign is a new entry in `content/site/go.ts`; no route code.

Six variants are specified: `ask`, `neet-pg`, `first-year`, `faculty`, `college`, `event`.

---

## 5. Search and AI visibility system

**Where the traffic is** (Apify / Keyword Planner, India, Nov 2026; full data in the Marketing Team project at `output/website-v2/research/kw_round3.json`):

- Topic-level searches are enormous and low competition (brachial plexus 246,000 a month, anatomy of knee joint 165,000). This is the `/learn` engine, **built last, after the RAG integration**. Not in this phase.
- Feature-tool terms have real demand (ai quiz generator 9,900, ai flashcard generator 3,600, ai lesson plan generator 2,900, ai mind map generator 2,400) → `/features/*`.
- Student app terms are modest (best ai for medical students 1,000, neet pg question bank 880) → `/for/*`, `/vs/chatgpt`.
- Institution terms are close to zero. Colleges do not search for this. `/institutions/*` is for conversion and for being the cited answer in AI search, not for volume.

**The machinery (already built in the skeleton):**

| Piece | Where | What it does |
|---|---|---|
| Per-page title, description, canonical, social tags | `buildMetadata()` in `lib/seo.ts` | Fixes the old site's single shared title |
| Brand entity schema | Root layout: `Organization` + `WebSite` with `sameAs` | Separates "GalenAI" from the physician Galen in search |
| Page schema | `softwareAppLd`, `faqLd`, `breadcrumbLd`, `videoLd`, `articleLd`, `learningResourceLd` | Structured data per page type |
| Page registry | `content/site/*.ts` | One source for routes, metadata, sitemap and llms.txt |
| Publish gate | `status: "skeleton" \| "live"` | Skeleton pages are `noindex` and absent from the sitemap. Flip to live only when the checklist passes |
| Sitemap | `app/sitemap.ts` | Generated from the registry and blog. The stale static file is deleted |
| Robots | `app/robots.ts` | Allows search and AI crawlers by name |
| llms.txt | `app/llms.txt/route.ts` | Generated from the registry |
| Answer-first paragraph | `PageSpec.answer` | 40 to 60 words at the top of every page that an engine can quote whole |

**Writing rules for anything meant to rank or be cited:**
1. Open with the direct answer. Then elaborate.
2. H2s are the questions people ask ("How does the AI tutor work?"), not slogans.
3. State facts plainly, name the source, date anything that can change.
4. Every page links up to its hub and across to two or three siblings. No orphans.
5. No page goes live from a template alone. Each one has its own screens, example and FAQ.
6. Nothing behind a login wall.

**Not doing:** HowTo schema for rich results (Google retired those in 2023), per-question pages (keyword data says no), named-competitor pages (brand rule, and "x vs y" volume is small).

---

## 6. Proof and claims: what may be printed

Allowed now (already public in the deck and briefing note):
- MoU signed with St. John's Medical College, Bengaluru.
- 2,000+ students signed up.
- "All first-year students in our college deployments have been actively using it."
- Founders: Dr. Arun Biju Oommen (MD Medicine; faculty at St. John's Medical College Hospital), Varun Jagannathan.

Needs Varun's yes first: college logos on the student page (the current `TrustedBy` shows AIIMS, CMC, JIPMER and others, which can read as endorsement; safer wording is "Students from"), any question-bank size, "free" wording, 150+ reachable colleges, ICMR grants, any usage percentage.

Never: invented statistics, star ratings we do not have, textbook or publisher names, competitor names, "pilots", "faculties", em dashes. Voice viva is always "Coming soon".

**Existing site violations to remove during the rebuild:** `app/components/Comparison.tsx` uses competitor logos (`public/marrow.webp`, `chatgpt.webp`, `openevidence.webp`). `app/data/features.tsx` lists "Images in Chat" as coming soon (status unconfirmed). `app/data/team.ts` still lists Dr. Sivaramakrishnan and omits Rayan Dsouza.

---

## 7. Performance budget

Test on a throttled mid-range Android profile (Lighthouse mobile, slow 4G), not on a laptop.

| Metric | Budget |
|---|---|
| LCP | under 2.5 s. The LCP element must be the H1 text or a static image with `priority`. Never a video, never something animated in by GSAP |
| INP | under 200 ms |
| CLS | under 0.1. Every image and video has width and height. No content injected above the fold after load |
| Home page JS (first load) | aim under 180 kB gzipped. GSAP only below the fold, loaded lazily |
| Hero | No autoplay video as LCP. Poster image first, video loads after interaction or when idle |

Specific fixes queued in EXECUTION: `images.unoptimized: true` in `next.config.ts` turns off Next image optimisation (large PNGs ship as is); hero videos are `.webm` only (add an `.mp4` fallback and test on iOS Safari); the Navbar and Hero import GSAP at the top of the page; `public/Student Layer.png` and the new `public/brand/ui/*.png` need converting to WebP or AVIF.

---

## 8. Design mapping

Source of truth: `docs/v2/reference/DESIGN_SYSTEM.md`. How it maps to code:

| Design system | Code |
|---|---|
| Orange #EB602D, one emphasis word per headline | `--color-orange`; `<Headline text accent>` renders exactly one `.acc` span |
| Charcoal #2E2E2E, never pure black | `--color-dark` |
| Cream #FFF0E4 (student pages) | `.v2` default background (`--color-light`) |
| Neutral #F6F4F1 (institution pages) | `.v2[data-tone="neutral"]` (`--color-beige`) |
| Dark page with faint 80 px grid | `.tone-dark` / `<Section tone="dark">` |
| Flat backgrounds, no glows or gradients | Nothing in `v2.css` uses one. The legacy notebook-paper background on `:root` goes when the last legacy page does |
| Space Grotesk 700, tight tracking, line height about 0.95 | `.h1`, `.h2`, `.h3` |
| Raleway body, uppercase kicker with orange rule | `.lead`, `.kick` / `<Kicker>` |
| Inter inside product UI mockups | Not loaded yet. Add only if mockups are coded in HTML rather than images |
| Coming soon pill | `.pill-soon` |
| Desktop mockup card (radius 22, soft shadow, 2 px outline) | `.card` |
| Phone frame, dark-mode student screens | To build: `PhoneFrame` (task C2). Screens in `public/brand/ui/` and `public/how-to-use/img/` |
| QR block with hand-drawn orange arrow, specific payoff | To build: `QrBlock` (task C3), used on `/download` and desktop hero |
| One mascot per piece, small, at a card edge | `public/brand/mascots/`. Use on at most one section per page |
| Logo: cream-head lockup only | `public/brand/lockup.svg`. Replace `galenai-logo.webp` in Navbar and Footer |

Web type scale (from the design system's web column): hero `clamp(34px, 5vw, 56px)` was set for the help page. Marketing pages go bigger, as in the print pieces: `.h1` is `clamp(2.4rem, 7.2vw, 4.75rem)`.

---

## 9. The apps (`app.galenai.io`, `faculty.galenai.io`)

They are logged-in tools in other repos. They should not be what ranks; the marketing site should. What they need is in `EXECUTION.md` part A, written as a patch list for whoever owns those repos:
- `app.galenai.io`: real title and description, canonical, social tags, keep `/share/` disallowed.
- `faculty.galenai.io`: title currently reads "GalenAI Faculty Sandbox"; `/robots.txt` returns the app's 404 page with a 200 status. Needs a real `robots.txt`, `noindex` on everything but sign-in, and a proper title.
- Both verified in Google Search Console.

---

## 10. Open decisions for Varun

1. Pricing wording on the student side ("free", "free for a limited time", freemium).
2. Is image and attachment chat live, or PDF only?
3. Can students generate quizzes, flashcards or mind maps themselves, or is generation faculty-only? This decides the audience and CTA of four `/features` pages.
4. Institutions YouTube video link (and whether the student video is being replaced).
5. College logos on the student page: keep, reword as "Students from", or drop.
6. `/vs/chatgpt` names a product. You approved the structure; confirm you are comfortable, or it becomes `/vs/general-ai`.
7. The LMS comparison PDF lists "Voice tutor and viva practice" as a GalenAI capability, but the brand rule says voice viva is always "Coming soon". Which wording goes on the web?
8. Team page: remove Dr. Sivaramakrishnan, add Rayan Dsouza as Fractional CTO?
9. Search Console verification token, and the App Store Connect provider token for iOS campaign attribution.
10. Demo form destination: Netlify Forms is specified (no backend). Where should submissions be emailed?
