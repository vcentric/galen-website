# Page blueprints: the bespoke pages

Spec-driven pages (`/features/*`, `/for/*`, `/vs/*`, `/institutions/*`, `/go/*`, `/how-to-use/*`) carry their blueprint in `content/site/*.ts` and render it on screen as dashed "To build" boxes. This file covers the pages that are hand-built: the student home, the institutions home, `/download`, and the shared chrome.

Copy below is draft in the approved voice. Lines marked **verbatim** are approved and must not be reworded. Everything else may be tightened, never lengthened. No em dashes anywhere.

---

## 1. Student home `/`

**Goal:** within one screen, a medical student thinks "I need this" and taps download. Everything below the hero exists to remove one doubt each.
**Tone:** cream background, one dark section for contrast, bold and short.
**File:** `app/(site)/page.tsx`. Build new sections in `app/components/v2/home/`. Delete the legacy section imports as each is replaced.

| # | Section | What is in it | Why it is there |
|---|---|---|---|
| 1 | **Hero** | Kicker: `For MBBS students`. H1: `Ask anything. Get it` **`explained.`** Sub: "The AI tutor for MBBS. Clear answers with references, then practice until it sticks." CTAs: `download` (primary), `try-web` (ghost). Under the buttons, one line of proof: "2,000+ medical students already on it" (approved number). Right side (below on phone): one phone frame showing a real tutor answer (`public/brand/ui/phone_tutor_answer_cited.png`), static image with `priority`. Desktop only: small QR block with the hand-drawn arrow and "Scan. Ask **anything.**" | The promise, the proof it is real, the action. H1 and CTA must fit one phone viewport (check at 360 × 640). |
| 2 | **Try it here** (the hook) | H2: `Go on. Ask it` **`something.`** Three or four question chips ("Why does volume stay the same in isovolumetric contraction?", "How long does troponin T stay raised?", "What produces S2?"). Tapping a chip plays the stored, faculty-checked answer into the phone frame, with references and follow-up chips. Then the button changes to "Ask your own question" → `download`. | This is the "I have to download this" moment: they see it answer before they commit. Answers are stored text from approved collateral, not a live model call, so it is instant and always correct. |
| 3 | **Ask. Practise. Revise.** (**verbatim** heading) | Three beats, one phone screen each. Ask: AI tutor, five modes. Practise: question bank and clinical cases. Revise: flashcards and dashboard. Each beat links to its `/features` page. | The product in three words. Internal links to the feature pages. |
| 4 | **Asking beats watching** (dark section) | H2 with the strike bar: `Stop` ~~`WATCHING`~~ `at 2X. Start` **`asking.`** Two columns of habits, no brand names: "A video subscription you watch at 2X" versus "A tutor that answers your doubt". Replaces the legacy `Comparison` component and its competitor logos. | Reframes the alternative as a habit. Uses the pamphlet set-piece Varun approved. |
| 5 | **One tutor, five ways to teach** | Mode explorer (port from the How to Use page): Auto, Explain, Socratic, Case-based, Quick Q&A. One question, five answers. Link to `/features/tutor-modes`. | The feature students cannot get from a general AI tool. |
| 6 | **Proof** | Two or three real testimonials from `app/data/testimonials.ts` (confirm they are real and current). The approved numbers. College names only in the wording Varun approves (open decision 5). | Trust, next to a CTA. |
| 7 | **If your college uses GalenAI** | One paragraph plus a screen of a faculty-published lesson on the student calendar. Link: "Is your college on GalenAI? Show your faculty" → `/institutions`. | The bridge to the institution side; turns students into the referral channel. |
| 8 | **FAQ** | Rewrite `app/data/faqs.ts` under the copy rules. Six to eight questions, real ones: what is it, is it free, where do answers come from, which exams, is it on iPhone and Android, can my college use it. Rendered with `FaqBlock`, schema via `faqLd`. | Objections, plus FAQ text is what AI engines quote. |
| 9 | **Final CTA** (dark) | H2: `Your next doubt, answered in` **`seconds.`** `download` + `try-web`. Store badges. One small mascot (Dr. Mira) at the card edge. | Last chance, same action. |
| — | **Sticky phone bar** | `StickyMobileCta intent="download"`. | Primary action always one tap away. |

Schema on this page: `softwareAppLd()` (already added), `faqLd()` for section 8, plus the site-wide Organization and WebSite.
Meta (already set): title "GalenAI: AI Tutor and Study App for MBBS Students".
Video: the current hero uses `BrandVideo.webm`. Varun may supply a new student video. Whatever is used goes in section 2 or 3 behind a poster, never as the hero LCP.

**Acceptance for this page:** H1 + primary CTA visible without scrolling at 360 × 640. Lighthouse mobile: LCP under 2.5 s, CLS under 0.1. No competitor names or logos. Every number on the page is on the approved list in MASTERPLAN section 6. Demo answers match the approved collateral text exactly.

---

## 2. Institutions home `/institutions`

**Goal:** a dean, MEU member or faculty lead understands the three-part story in under a minute and either opens the faculty platform or books a demo.
**Tone:** neutral background (`data-tone="neutral"`), dark cover-style hero, calmer than the student page.
**File:** `app/(site)/institutions/page.tsx` (currently a client component rendering legacy sections; rewrite as a server component). Metadata is already supplied by `institutions/layout.tsx`.
**Wording sources:** BMC briefing note, GalenAI vs LMS comparison, brochure, pitch deck slides 2, 3 and 6.

| # | Section | What is in it |
|---|---|---|
| 1 | **Hero** (dark, grid) | H1 (**verbatim**): `AI for medical` **`colleges.`** Sub (**verbatim**): "Students learn smarter. Faculty teach easier." Four chips: Institution, Faculty, Student, CBME. CTAs: `faculty-live` (primary, "Try it live for faculty"), `demo` (ghost). Visual: AI Workspace desktop mockup with the tutor phone overlapping, as on the brochure cover. |
| 2 | **Video** | `VideoLite` with the institutions video (YouTube id pending). Below it, a three-line text summary of what the video shows, so the content is crawlable. `videoLd()` once the id and upload date exist. |
| 3 | **What is happening** | H2: `Students are already learning with AI. Colleges have no part in it,` **`yet.`** Three numbered points from the briefing note: 01 Students are already learning with AI, but it is not verified. 02 Faculty need support with CBME. 03 The classroom will become AI-connected. Body text from the briefing note. |
| 4 | **The AI Connected Classroom** | H2: `The AI Connected` **`Classroom.`** "Three parts, working together." Three cards, each linking to its subpage: **Students** — "An AI tutor on approved content." Ask. Practise. Revise. → `/institutions/students`. **Faculty** — "An AI workspace for teaching." AI drafts. Faculty review. → `/institutions/faculty`. **College and administration** — "One connected view of CBME reports." → `/institutions/administration`. (The dashes in this row are table shorthand; on the page these are a title and a line beneath it.) |
| 5 | **How faculty create content** | Six numbered steps (**verbatim** from the brochure): 01 Upload the timetable. 02 See every competency. 03 Create lessons. 04 Create with AI. 05 Review and publish. 06 Track and report. Lesson page mockup with the "Generate lesson content" panel overlaid. Row of five tinted output chips: Lecture PPT, Assessment, SGD case, Mind map, Flashcards. Footer line (**verbatim**): "AI drafts. Faculty review. Every output stays with your faculty." |
| 6 | **Your LMS stores the syllabus. GalenAI delivers it.** (**verbatim**, dark) | Four-row teaser of the comparison table (Lessons, Quiz tools, CBME competencies, What students get). Link: "See the full comparison" → `/institutions/vs-lms`. Line: "Your existing LMS content stays valuable." → `/institutions/integrations`. |
| 7 | **Proof** | "MoU signed with St. John's Medical College, Bengaluru." "2,000+ students signed up at launch." "All first-year students in our college deployments have been actively using it." Founders line with credentials. Nothing else without Varun's yes. |
| 8 | **FAQ** | Does AI content reach students automatically? Do we have to replace our LMS? How long does setup take? (confirm) Who owns the content? (confirm) How is it priced? (confirm, or route to demo). |
| 9 | **Bring GalenAI to your campus.** (**verbatim**) | Two cards side by side as on the brochure back page: charcoal "Try it out for **faculty**" (faculty.galenai.io), white bordered "Try it out for **students**" (app.galenai.io). Below: `demo` button and the contact block from `lib/site.ts`. |

Navigation on this page: Solution, Faculty, Administration, vs LMS, How to use, Contact. Primary nav button: "Book a demo".
Schema: Organization (site-wide), `videoLd`, `faqLd`, `breadcrumbLd`.

**Acceptance:** the retired lines ("Medical Education Operating System", "Built for how a medical college actually runs") appear nowhere. The word "pilot" appears nowhere. Voice viva, if mentioned, carries the Coming soon pill.

---

## 3. `/download`

Currently a client redirect that sends desktop visitors back to `/`.
- Phone: redirect to the right store using `playStoreUrl()` / `appStoreUrl()` from `lib/cta.ts` with the visitor's UTMs. Keep the brief "Opening the store" state.
- Desktop: a real page. H1: `Get GalenAI on your` **`phone.`** QR block (points to `/download` with the current UTMs, so the scan is attributed), both store badges, and "Or try it on web" → `try-web`.
- The server-rendered HTML must contain the store links as plain anchors, so the page works without JavaScript and crawlers see where it leads.
- `/qr` keeps working for printed QR codes. Same store-URL helpers. Stays `noindex`.

---

## 4. Navbar and Footer

Legacy `Navbar.tsx` (506 lines) and `Footer.tsx` (308 lines) are client components with GSAP. Rebuild both as light server components with one small client island for the phone menu.

**Navbar (student pages):** Logo (cream-head lockup) · Features · For NEET PG · How to use · Articles · For colleges · button `download` ("Get the app").
**Navbar (any `/institutions` path):** Logo · Faculty · Administration · vs LMS · How to use · For students · button `demo`.
The legacy code checks `pathname === "/institutions"` exactly; the new one must use `startsWith("/institutions")` so the subpages get the institution nav.

**Footer:** four columns. Students (features, exams, how to use, download). Colleges (institutions pages, book a demo, faculty platform). Company (team, blog, contact, privacy, terms). Contact block **verbatim** from `lib/site.ts`. This footer is the site's main internal-link hub, so every live hub page is linked from it.

Keep the "Think Like HouseMD" link (house.galenai.io) in the student nav or footer.
