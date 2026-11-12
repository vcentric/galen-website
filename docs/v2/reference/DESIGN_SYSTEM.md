# GalenAI Design System (marketing and collateral)

The visual language behind GalenAI's brochure, pamphlets, standee, social posts, merch and the How to Use page (Oct to Nov 2026). Varun (CEO) approved all of it. Use this file as the source of truth for any new GalenAI visual, print or web piece.

**Read first:** this file, then look at `renders/` (what finished work looks like), then `source/` (how it was built). `GalenAI_Marketing_Context.md` in this folder has the campaign history, video specs and review feedback.

---

## 1. Folder map

| Folder | What's inside |
|---|---|
| `brand/logo/` | `lockup.svg` (mark + wordmark), `mark.svg` (mark only), transparent PNGs of both. |
| `brand/fonts/` | woff2: Space Grotesk 400 to 700, Raleway 400 to 700, Inter 400 to 700, Hanken Grotesk 400 to 800, Gochi Hand, JetBrains Mono 700. |
| `brand/mascots/` | `dr-kai.svg`, `dr-mira.svg`. |
| `brand/icons-light/`, `brand/icons-dark/`, `brand/patterns/` | Brand icon set and background patterns from the GalenAI design-system skill. |
| `brand/device_frames/devices.min.css` | devices.css 0.2.0 (MIT): iPhone 14 Pro and iMac frames. |
| `ui_screens/` | High-res product mockups (3x). Desktop 4320 × 2700 on cream, phones with transparent background and frame. |
| `renders/brochure/` | The four A4 brochure pages, both bi-fold spreads, the one-page A4 brochure. |
| `renders/pamphlets/` | All nine A5 pamphlets. |
| `renders/standee/` | 3 × 6 ft roll-up standee. |
| `renders/social/` | Four "Coming to Strings" Instagram posts, one-page Instagram post, YouTube thumbnails. |
| `renders/web/` | The How to Use help page (desktop). |
| `renders/merch/` | Polo, hoodies (mockups and print art). |
| `source/brochure/` | `ui.py` (coded product mockups + icon set), `build3.py` (brochure pages), `onepage.py`, `render.py`, `render_single.py`, one compiled page `p3_students.html`. |
| `source/pamphlets/` | `build*.py` (pamphlet generators), `render.py`, compiled examples `b_notes.html`, `stmt_watch.html`. |
| `source/standee/` | `standee2.py` (final), `ui.py`. |

The Python sources contain an absolute path `S='/tmp/claude-0/.../scratchpad'` and load fonts from `S+'/design/'`. Point `S` at your own folder and copy `brand/fonts/*` plus `brand/logo/lockup.svg` into `<S>/design/` before running.

---

## 2. Brand in one paragraph

GalenAI is AI for Indian medical colleges, built around NMC's CBME curriculum. Two products: a student app (AI tutor, question bank, flashcards, clinical cases, dashboard) and a faculty/institution workspace (timetable, lessons, AI Workspace, assessments, analytics). The look is **bold, flat and editorial**: huge tight Space Grotesk headlines with one orange word, lots of cream space, real product screens, a QR with a hand-drawn arrow. It should feel like a confident student brand, not a hospital brochure.

### Approved lines (use verbatim)
- **AI for medical colleges.** (main tagline)
- **Students learn smarter. Faculty teach easier.** (sub-tagline)
- **Ask. Practise. Revise.** (student line)
- **AI drafts. Faculty review.** (faculty trust line)
- **Bring GalenAI to your campus.** (closing/CTA)
- Your LMS stores the syllabus. GalenAI delivers it.
- Long line (standee/proposals): An app students feel closely aligned with while learning, and a system that helps the Medical Education Unit deliver the whole syllabus in a faster, AI-native way.

---

## 3. Colour

| Token | Hex | Role |
|---|---|---|
| `--o` Orange | `#EB602D` | Accent only. One emphasis word per headline, CTAs, numbers, strike bars, stamps, arrows. Keep to roughly 10 to 15% of a canvas. |
| `--k` Charcoal | `#2E2E2E` | Text, dark pages, phone bodies, borders. **Never pure black.** |
| `--c` Cream | `#FFF0E4` | Default warm background (pamphlets, social). Also text on dark. |
| `--n` Neutral | `#F6F4F1` | Institutional/brochure light pages, web page background. |
| Cream 2 | `#F4E2D2` | Merch print colour, logo head fill. |
| Orange dark | `#C94D20` / `#C24A1C` | Orange text on light UI where contrast matters. |
| Pink (one-off) | `#FFBFDB` | Only the Mnemonic pamphlet. Don't reuse. |

Text tints on light: body copy `rgba(46,46,46,.75 to .85)`, rules `rgba(46,46,46,.12)`.
Output chips in the brochure use soft paired tints: slides `#d4482a/#fde6e1`, assessment `#3a5bd9/#e8eefc`, SGD `#c27c0e/#fbefd9`, mind map `#7048d6/#efe8fc`, flashcards `#2f7a4f/#e3f4ea`. These are the only place secondary hues appear.

### Backgrounds
- **Light:** flat cream or neutral. No gradients, no corner glows (Varun removed a pink/peach corner glow).
- **Dark:** charcoal with a faint square grid: two 2px lines at `rgba(255,240,228,.04 to .05)`, cell 80 px (pamphlets) or 90 px (brochure).
  `background: linear-gradient(rgba(255,240,228,.05) 2px,transparent 2px) 0 0/80px 80px, linear-gradient(90deg,rgba(255,240,228,.05) 2px,transparent 2px) 0 0/80px 80px, #2e2e2e;`
- **Spotlight (one pamphlet):** charcoal with a soft cream radial in the top-left.

---

## 4. Typography

| Role | Face | Weight | Tracking | Line height |
|---|---|---|---|---|
| Headlines, numbers, CTAs | **Space Grotesk** (`SG`) | 700 | `-0.045em` to `-0.05em` | 0.9 to 0.95 |
| Sub-heads, item titles | Space Grotesk | 700 | `-0.01em` to `-0.02em` | 1.05 to 1.12 |
| Body, leads, descriptions | **Raleway** (`RW`) | 500 to 600 | normal | 1.35 to 1.4 |
| Kickers / labels | Raleway | 600 to 700, UPPERCASE | `0.14em` to `0.18em` | 1 |
| Product UI inside mockups | **Inter** (`IN`) | 400 to 700 | normal | 1.3 to 1.5 |
| Email templates | Hanken Grotesk | | | |
| Stickers only | Gochi Hand | | | |
| Code/tech merch | JetBrains Mono 700 | | `0.2em`+ caps | |

Rules: one orange word or phrase per headline (usually the last word, e.g. "Faculty teach **easier.**"). Headlines are short, stacked one idea per line, `white-space:nowrap` on poster headlines so lines break where you put `<br>`.

### Type scale per format (canvas pixels as built)
| Element | A4 brochure (1485 × 2100) | A5 pamphlet (1480 × 2100) | Standee (1828 × 3658) | Web page |
|---|---|---|---|---|
| Hero headline | 226 px (cover) | 196 to 272 px | ~300 px | clamp(34px, 5vw, 56px) |
| Section headline | 160 px | | | clamp(26px, 3.4vw, 36px) |
| Closing headline | 136 px | | | |
| Sub-line / s2 | 66 px SG | 60 to 64 px SG (`.s2`), 92 px (`.sub`) | | 17 to 18 px RW |
| Lead paragraph | 38 px RW 500 | | | 18 px |
| Kicker | 26 px RW 700, `.18em` | 30 px RW 600, `.14em` | | 12 px, `.17em` |
| Kicker number | 30 px SG orange | | | |
| Item number | 40 px SG orange | | | |
| Item title | 34 px SG | | | 16 px SG |
| Item description | 26 px RW | | | 15 px |
| Footer line | 40 px SG orange + 28 px RW | | | |
| CTA "Scan. …" | | 76 to 84 px SG, line height 0.98 | | |
| URL under CTA | | 32 px RW 600, `.04em` | | |
| Chips | 30 px RW 600 | | | 13 px Inter |

---

## 5. Layout

| Format | Canvas | Margins | Notes |
|---|---|---|---|
| A5 pamphlet | 1480 × 2100 px (148 × 210 mm) | 96 px all round; headline at left 84 px (optical) | Top bar 96 px tall: kicker left, logo right (84 px tall). Bottom: CTA left, QR right, arrow between. |
| A4 brochure page | 1485 × 2100 px | 120 px | Kicker at top 124 px. Headline from ~205 px. Footer rule at 1955 px. Two-column item grid 1245 px wide, 56 px column gap, 44 px row gap. |
| Bi-fold spread | 2970 × 2100 px | | A4 sheet folding to A5: outside = back (left) + cover (right); inside = faculty (left) + students (right). |
| Standee 3 × 6 ft | 1828 × 3658 px (914 × 1829 mm) | | Logo top-left, giant headline, long line, two cards side by side (Students white, Faculty charcoal) so both QRs sit at chest height; "Get in touch" row kept clear of the roll-up base. |
| Instagram | 1480 × 1850 rendered, downscaled to 1080 × 1350 | | Bigger logo than print. |
| YouTube thumbnail | 1280 × 720 | | Big type, tilted product screens, high contrast. Not a slide. |

Print: produce a trim PDF and a **3 mm bleed** PDF. Keep text 15 to 17 mm inside trim.

---

## 6. Components (copy these)

**Kicker.** Short orange rule, then an uppercase label. Brochure version adds an orange number.
```html
<div class="kick"><b>01</b><i></i>For faculty &amp; institutions</div>
.kick{font:700 26px RW;letter-spacing:.18em;text-transform:uppercase;display:flex;align-items:center;gap:22px}
.kick b{color:#eb602d;font:700 30px SG} .kick i{width:70px;height:4px;background:#eb602d}
```

**Headline with orange word.** `.h1{font:700 160px/.94 SG;letter-spacing:-.045em}` + `<span class="o">easier.</span>`.

**Strike bar** across a word (WATCHING, Doomscroll): a rotated orange bar.
`.strike:after{content:"";position:absolute;left:-20px;right:-20px;top:52%;height:34px;background:#eb602d;transform:rotate(-3deg);border-radius:6px}`

**Speed pill** ("AT [2X]"): small spaced caps label above a charcoal pill with 210 px cream text, radius 40.

**QR block.** Rounded box 420 px, padding 34, radius 32. Light pages: white with 6 px charcoal border. Dark pages: cream fill. QR is vector SVG (segno, error level M, dark `#2e2e2e`, no light fill). A hand-drawn orange curved arrow points from the CTA to the QR.

**CTA.** Two lines: "Scan." then the payoff with an orange phrase ("Ask **anything.**", "Get **4 questions.**", "See the **answer.**"), URL underneath. Every QR promises a specific, instant payoff.

**Numbered item.** Orange 40 px number (01 to 06), 34 px SG title, 26 px RW description. Use numbers only for real sequences (setup steps, the three-point "why").

**Feature item (non-sequence).** 16 px orange dot instead of a number.

**Footer line.** 3 px rule at 12% charcoal, then orange SG statement + grey RW support ("AI drafts. Faculty review. Every output stays with your faculty.").

**Coming soon pill.** 17 px RW 700 caps, orange text, 2 px orange border, full radius. Voice viva must always carry it.

**Chips** (cover): 3 px border at 30% cream, full radius, 30 px RW 600 (Institution, Faculty, Student, CBME).

**Phone frame.** Charcoal `#111` body, radius 58, padding 12, notch pill, big soft shadow. Student screens inside are **dark mode** (near-black, orange accents). Layer phones at different heights; the middle one larger.

**Desktop mockup card.** Radius 22, shadow `0 30px 80px rgba(46,46,46,.22)` plus a 2 px 8% outline. Overlay a smaller panel (e.g. "Generate lesson content") on top of a full screen for depth.

**Contact rows.** 52 px white icon tile (radius 14, 2 px 10% border) with an orange line icon, then text. Section labels in orange 21 px RW caps.

**Social stamp.** Tilted orange "COMING TO STRINGS" stamp bottom-left; charcoal `app.galenai.io` pill bottom-right with a one-line hook above it.

**Pamphlet set-pieces** (one per pamphlet, all coded in HTML): attendance register table with hard 12 px offset shadow; batch-group chat card with Dr. Kai avatar ("Ask me instead."); SLUDGE letter tiles; tutor-mode dropdown (Auto, Explain selected, Socratic, Case-based, Quick Q&A); clinical MCQ card on dark; giant orange "?".

---

## 7. Imagery

- **Product screens are coded in HTML**, not screenshots, so print stays sharp (`source/brochure/ui.py`: `workspace()`, `lesson()`, `genpanel()`, `dash()`, `tutor_quiz()`, `qbank()`, `tutor_ans()`). Faculty desktop uses faculty name "Dr. Meera Iyer"; sample topics cardiac cycle, Knee Joint, PY5.x competencies.
- For quick reuse, take ready PNGs from `ui_screens/`.
- Icons: 24 px grid line icons, stroke 1.8 to 2, round caps (`ic()` in `ui.py`), or the brand icon set in `brand/icons-*`.
- **Mascots:** Dr. Kai and Dr. Mira. One mascot per piece, small, at a card edge (e.g. Dr. Mira with "Try me!" on the standee, Dr. Kai as chat avatar).
- **Logo:** always the normal lockup with the **cream head** inside the orange mark. Never the black/charcoal-head version. Top-right on pamphlets and posters, top-left on brochure cover and standee. Larger on social.

---

## 8. Voice and copy rules

- Bold, short, confident. One idea per line. Vague taglines get rejected.
- **No em dashes** anywhere.
- **"faculty"**, never "faculties".
- **Never name a textbook publisher or author.** Say "uploaded textbook, ch. 9, p. 114" or "standard references" / "your college's approved content".
- Citations are a supporting feature, not the headline.
- **No invented statistics.** Only real numbers Varun supplies (e.g. "60% of students on GalenAI get this wrong").
- Don't name competitors. Dig at habits ("video subscription", "watching at 2X").
- No "pilots open" on new material.
- Voice viva is always "Coming soon".
- Medical content must be correct; faculty check before print.
- Gen Z student pieces can use light Hinglish (one or two words: "nahi", "toh?", "kisi ke paas notes hain?"). No politics or exam-leak references.
- Contact block, exactly: corporate.relations@galenai.io · +91 88485 42046 · GalenAI Private Limited, Bangalore 560078 · www.galenai.io · LinkedIn: galenai-india · Instagram: @galen_ai

---

## 9. Worked example: the bi-fold brochure

Files: `renders/brochure/panel_1..4`, `spread_inside`, `spread_outside`; source `source/brochure/build3.py`.

1. **Cover (dark grid):** logo 92 px top-left at (120,120). Headline "AI for / medical / **colleges.**" at 226 px from y 330. Sub-tagline 66 px SG at y 1010. Four chips at y 1205. AI Workspace desktop mockup (scale 0.92) bottom-right, AI tutor answer phone overlapping bottom-left.
2. **Faculty (neutral):** kicker "01 For faculty & institutions". "Faculty teach **easier.**" 160 px. Lead 38 px. Lesson page mockup with the Generate lesson content panel overlaid. Row of five tinted output chips, slightly staggered vertically. Six numbered steps in a 2-column grid. Footer "AI drafts. Faculty review."
3. **Students (neutral):** kicker "02 For students". "Students learn **smarter.**" Three dark phones (dashboard, tutor quiz larger in the middle, question bank). Six dot features, Voice viva with Coming soon pill. Footer "Ask. Practise. Revise. All in one app."
4. **Back (neutral):** kicker "03 Get started", logo top-right. "Bring GalenAI to your **campus.**" 136 px. Three-point why (01 to 03) between rules. Two QR cards side by side: charcoal "Try it out for **faculty**" (faculty.galenai.io) and white bordered "Try it out for **students**" (app.galenai.io). Contact and Follow columns with icon tiles.

Spreads: outside = back + cover, inside = faculty + students.

---

## 10. Build pipeline

1. Write each piece as an HTML/CSS page at the fixed pixel canvas above; fonts via local `@font-face` from `brand/fonts/`.
2. Render with Playwright Chromium:
   - PDF: `print_background=True`, exact mm page size, zero margin.
   - PNG: `device_scale_factor=2` (3 for print-quality images), Lanczos downscale for social.
   - Transparent PNG (merch, overlays): `omit_background=True`.
3. QR codes: `segno` → vector SVG, then **decode every QR** with OpenCV `QRCodeDetector` and confirm the URL. Tracked links look like `https://platqs.short.gy/<slug>?utm_medium=qr_code`; QR targets can only be a completed tutor chat, a 4-question bank, or a flashcard set.
4. Print sharpness: CSS `filter: drop-shadow` rasterises in PDFs; use `box-shadow` on a separate element. Check with `pdfimages -list`.

### Checks before calling anything final
- No overlaps or out-of-bounds elements after any layout change (titles vs subtext, mascot vs cards, chips in an even grid).
- Space to breathe; Varun flags "clustered" layouts.
- OCR the output for banned words: publisher names, "faculties", "pilot".
- Files are RGB; if a printer wants CMYK, convert and ask for a proof (orange shifts).

---

## 11. Do and don't (from review rounds)

| Do | Don't |
|---|---|
| Huge tight headlines, one orange word | Serif "old money" styling (rejected for merch) |
| Flat cream/neutral or charcoal grid | Pink or peach corner glows, gradients on light pages |
| Real product screens, whole and readable | Flashy motion-graphics remix (rejected) |
| One mascot, small | Several mascots or big mascot heroes |
| Specific payoff on every QR | Bare "Scan me" |
| Normal cream-head logo | Black-head logo |
| Outline chat bubbles with a tail for apparel | Filled bubbles that look like patches |
| Ask before changing more than the one thing requested | Touching approved parts while fixing another |
