# GalenAI "How to Use" page: context for Claude Code

Read this before editing `index.html`. The page is approved by Varun (CEO). Change only what is asked.

## What it is
A single-page help centre for GalenAI with three role tabs: **Students**, **Faculty**, **Administration**. Each tab opens with a "Start here" flow, then one guide per feature. Every guide is a numbered step list beside a screenshot; clicking a step swaps the screenshot.

Structure was modelled on the Consensus LibGuide (sticky "On this page" rail, "use it when" chips, copyable example prompts, Tip / Note / Careful callouts, Always / Never block, quick-reference table) and Canvas role guides (separate Student / Instructor / Admin guides written as numbered "how do I" steps with screenshots).

## Files
- `index.html`: the whole page (HTML, CSS, JS in one file; no build step, no framework).
- `img/`: screenshots as WebP. Phone screens 600 × 1281, desktop screens 1600 × 1050. `logo.svg` is the normal GalenAI lockup (cream head).
- Prefix convention: `s_` student app, `d_` designed student screens (lessons, quiz, viva), `f_` faculty, `a_` super admin, `s1_` secretary.

## How the page works (JS at the bottom of index.html)
- **Role tabs:** `.rolepage[data-role="students|faculty|admin"]`. Hash routing: `#students`, `#faculty`, `#admin`, or any section id. Section ids are prefixed `st-`, `fa-`, `ad-` and the prefix decides the tab.
- **Contents rail:** built automatically from elements with `data-toc` (section) or `data-toc-sub` (sub-heading). Add the attribute and the rail updates.
- **Step viewer:** inside `.howto`, each `li` with `data-img="name"` (no extension) and `data-cap="caption"` swaps the `.shot` figure. An `li` without `data-img` is a plain step.
- **Mode explorer:** `#modeSeg` buttons + `.mode-panel[data-mode]`; screenshot map is `modeImg` in the JS.
- **Search:** indexes sections, sub-headings, steps, mode panels and FAQ items across all tabs. No setup needed.
- **Prompts:** `.prompt` buttons copy their text. Lightbox opens on any `.shot img`.
- Figures: `.shot.phone` for app screens, `.shot.desk` for desktop screens; `.howto.wide` gives desktop screens more room.

## Product facts the copy relies on
- Student app: Home (Continue, Start a guided lesson, Ask anything), menu (Dashboard, Question Bank, Flashcards, Clinical Cases), chat history.
- Tutor selector (pill next to Send): **Default** / **Tutor Mode** (Auto, Explain, Socratic, Case-based, Quick Q&A) / **Tutor Profile**. Tutor Mode and a profile are mutually exclusive.
- **Tutor Profile = a tutor the student builds themselves**: they write instructions for how it teaches, what it refers to and the answer format (via Manage profiles…). Clinical Reasoning Coach and Memory Builder are example names only.
- Every reply has References, feedback (thumbs, flag, copy) and follow-up chips. Paperclip attaches a PDF.
- Voice viva is **Coming soon**.
- Faculty: Calendar, Lesson Planning (Must / Good / Nice to know + materials), AI Workspace (Sources, Chat with citations, Studio: Slides, Assessment, Mind map, Flashcards), Content Bank (review, Export PPTX, Publish to class), Assessments (Generating, Ready, Scheduled, Available, Closed, Failed), Results, Cohort Analytics. Faculty can't change class date/time/batch; the secretary does.
- Admin roles: Super Admin (structure, people, settings, institute timezone, all assessments and analytics) and Secretary (timetable only). Import CSV columns are listed on the page and come from the institute prototype.

## Copy rules (non-negotiable)
- No em dashes anywhere in copy.
- "faculty", never "faculties".
- Never name a textbook, publisher or author. Use "uploaded textbook, ch. 9, p. 114" or "standard references".
- No invented statistics. Screens show sample data and the page says so.
- No "pilots". Don't name competitors.
- Medical content in examples must be correct.
- Brand: orange #EB602D (one emphasis word per headline), charcoal #2E2E2E, cream #FFF0E4, neutral #F6F4F1. Space Grotesk headings, Raleway body, Inter for UI labels. Light and dark themes are both defined as tokens at the top of the CSS.

## Screenshot notes
- Student screens were captured from the mobile UI kit prototype (v15) with Playwright; tutor replies, one MCQ and reference names were rewritten in the DOM before capture. Faculty and admin screens come from the institute "all screens" prototype. Replace any of them with live-app captures at the same size and file name and the page picks them up.
- Still wanted from the live app: real Socratic and Explain chats, the current tutor-mode picker, the Tutor Profile builder (Manage profiles), and a full clinical case to the score screen.

## Open items
- Admin configuration details: Varun will supply more content for the Administration tab.
- Faculty sign-in URL: page says faculty.galenai.io (brochure); prototype shows insti.galenai.io. Confirm before launch.
- Contact block (footer and rail): corporate.relations@galenai.io · +91 88485 42046 · GalenAI Private Limited, Bangalore 560078.

## Checks before shipping a change
1. Open the page at 1440 px and 390 px wide; no horizontal scroll.
2. Every `data-img` has a matching `img/<name>.webp`.
3. grep the copy for em dashes, "faculties", publisher names.
4. Click through each role tab and the mode switcher.
