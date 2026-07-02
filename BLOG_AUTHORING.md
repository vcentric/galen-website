# Blog Authoring Guide

Everything needed to create a blog post for the GalenAI site — the file format, every
frontmatter field, the rich content components, image sizing, and how publishing works.

This doc is written so that **Claude (or any author) can produce a valid post from scratch**,
and so the marketing team understands what each field does in the Keystatic editor.

---

## 1. Two ways to create a post

1. **Keystatic admin (marketing team)** — run the site, open `/keystatic`, click **Blog Posts →
   New**, fill the form, hit **Save**. Every field below maps to a labelled input.
2. **By hand / by Claude** — create the files directly in the repo (described in §2). Both
   produce the exact same result; Keystatic just writes the same files for you.

Either way, **a post is not live until it is committed to git and the site rebuilds** (see §11).

---

## 2. File layout

Each post is a **folder** containing a single `index.mdoc` file:

```
content/posts/<slug>/index.mdoc      ← the post (frontmatter + body)
public/blog-images/<slug>/...        ← images for that post (hero, in-body figures)
```

- `<slug>` is the URL slug. The post will live at `https://www.galenai.io/blog/<slug>`.
- The slug is derived from the **Title** (lowercased, spaces → hyphens). Keep it short and
  clean, e.g. `nmr-doctor-id-explained`.
- `index.mdoc` has two parts: **YAML frontmatter** (between `---` fences) and the **Markdoc
  body** (everything after the closing `---`).

---

## 3. Frontmatter fields (complete reference)

Order doesn't matter, but keep it consistent with the example in §10. Types, defaults, and
validation are enforced exactly as below.

### Core (always fill these)

| Field | Required | Type | Notes |
|---|---|---|---|
| `title` | ✅ | string | The headline. Also generates the slug/folder name. Long titles: use YAML `>-` folding (see §10). |
| `excerpt` | ✅ | string, **max 160 chars** | Card summary **and** the default SEO/meta description. One or two tight sentences. |
| `category` | ✅ | enum | Exactly one of the 9 categories in §4. |
| `author_name` | ✅ | string | Byline. Defaults to `Team GalenAI`. Use a real person's name for authored pieces. |
| `author_type` | ✅ | enum | Drives SEO author markup (Person vs Organization). Values in §5. Default `galenai_team`. |
| `publish_date` | ✅ | date `YYYY-MM-DD` | Shown on the article + used for sorting and SEO `datePublished`. |
| `is_published` | ✅ | boolean | **`false` = draft (hidden everywhere). Set `true` to go live.** Default `false`. |

### Optional — presentation

| Field | Type | Notes |
|---|---|---|
| `subtitle` | string | Deck shown under the title on the article page. If empty, the excerpt is used as the deck. |
| `tags` | list of strings | Topic tags. Feed SEO `keywords`. Keep to 2–5. |
| `author_role` | string | e.g. `Dept of Medicine`, `3rd Year MBBS, AIIMS Delhi`. Appended to the byline. |
| `read_time_minutes` | integer ≥ 1 | **Leave empty to auto-calculate** from word count. Set only to override. |
| `hero_image` | image path | Cover image. Optional — posts render fine without one (branded placeholder shown). See §6. |
| `hero_image_caption` | string | Caption under the hero. |
| `hero_image_source` | string | Credit/source under the hero (rendered italic). |
| `is_editors_choice` | boolean | `true` = featured in the strip above the tabs on `/blog`. **Max 2 display** site-wide. Default `false`. |

### Optional — category-specific (fill only when relevant)

| Field | Type | Use with | Effect |
|---|---|---|---|
| `case_study_institution` | string | **Case Studies** | Institution label on the card, e.g. `St. John's Medical College, Bengaluru`. |
| `case_study_outcome` | string, **max 100 chars** | **Case Studies** | One-line result rendered as an orange outcome pill on the card. |
| `partner_name` | string | Case Studies / Company Updates | Partner org; shown next to the Press Release label. |
| `is_press_release` | boolean | **Company Updates** | Shows a "Press Release" badge in the article header. Default `false`. |
| `is_b2b` | boolean | **For Institutions** | Adds a "Download as PDF" button (clean print output). Default `false`. |

### Optional — sources & SEO

| Field | Type | Notes |
|---|---|---|
| `sources` | list of strings | References; rendered as a numbered "Sources & References" section at the article bottom. One entry per source. |
| `meta_title` | string | SEO `<title>` override. **Defaults to the post title** if empty. ~50–60 chars ideal. |
| `meta_description` | string | SEO description override. **Defaults to the excerpt** if empty. ~150–160 chars ideal. |

> **Draft safety:** a post with `is_published: false` is excluded from the blog index, the
> sitemap, related-post lists, and its direct URL 404s. You can safely stage half-finished
> drafts in the repo.

---

## 4. Categories (pick exactly one)

Must match one of these strings **exactly** (case- and character-sensitive, note the `×`):

```
Exam Prep
CBME Decoded
Medicine × AI
Global Med Ed
From the Field
Inside GalenAI
Case Studies
For Institutions
Company Updates
```

---

## 5. Author types

Set `author_type` to one of these values (controls the byline system + SEO author schema):

| Value | Use for |
|---|---|
| `galenai_team` | Generic "Team GalenAI" posts (→ marked as Organization in SEO). |
| `founder` | Posts authored by a founder. |
| `faculty` | Doctors / faculty contributors (→ marked as Person). |
| `student` | Student contributors. |
| `senior` | Senior resident / senior contributor. |
| `guest` | Outside guest author. |

Any value other than `galenai_team` is treated as a **named person** in structured data
(better for author credibility / E-E-A-T), so pair it with a real `author_name`.

---

## 6. Images & hero sizing

**Where images go:** `public/blog-images/<slug>/`. Reference them by web path
`/blog-images/<slug>/<file>` (Keystatic does this automatically; by hand, place the file and
use that path).

**Hero image (`hero_image`):**
- **Recommended size: 1200 × 630 px** (1.91:1 — the standard social/OG ratio; also used for
  Google/Twitter previews).
- **Format: WebP preferred** (smaller = faster + less bandwidth), JPG or PNG also fine.
- Keep it **under ~300 KB** where possible.
- On cards it is center-cropped to 16:9, so keep the subject roughly centered.
- Optional — omit it and a branded placeholder is shown.

**In-body images** use the `imageWithCaption` component (§8). Same folder + format guidance;
width ~1200 px is plenty since the content column caps at 800 px.

---

## 7. Body: standard Markdown

Everything after the frontmatter is **Markdoc** (Markdown + the custom tags in §8).

- **Headings:** use `##` and `###` for section headings — these auto-populate the article's
  Table of Contents sidebar. Don't use `#` (that's the page title).
- **Bold** `**text**`, *italic* `*text*`, links `[label](https://...)`.
- **Bulleted lists** with `-` for unordered points.
- **Numbered lists** with `1.` `2.` `3.` — these render as **orange numbered step circles**,
  so use them only for genuine sequences/steps, not for arbitrary lists.
- **Blockquotes** with `>` for pull quotes.
- **Tables** use Markdoc's table syntax (§9) and render with a dark header + striped rows.

---

## 8. Rich content components

These are Markdoc tags. **Wrapper** tags have an open/close pair; **block** tags are
self-closing (`/%}`). Copy the syntax exactly.

### Callout (wrapper) — tip or summary box
```markdoc
{% callout type="tip" %}
**Key point** — a highlighted aside. `type` is either "tip" or "summary".
{% /callout %}
```

### Stat callout (block) — big number on a dark card
```markdoc
{% statCallout number="722" label="Doctors registered on the NMR as of July 2025 — under 1% of those eligible." /%}
```
- `number` (required): the figure — text, so `"722"`, `"50%"`, `"3x"` all work.
- `label` (required): keep it to one line.

### Action box (wrapper) — titled "do this" box
```markdoc
{% actionBox title="What to do this week" %}
- Register on the NMR portal
- Keep your Aadhaar + degree scans ready
{% /actionBox %}
```
- `title` (required). Body can contain lists, paragraphs, links.

### CTA box (wrapper) — inline call-to-action
```markdoc
{% cta %}
**Ready to study smarter?** [Try GalenAI free](/qr) and get a personalised plan.
{% /cta %}
```
- No attributes. `**bold**` renders orange; links render underlined-orange on the dark box.

### Image with caption (block)
```markdoc
{% imageWithCaption src="/blog-images/<slug>/figure-1.webp" alt="Describe the image" caption="What the reader is looking at." source="Source: NMC, 2025" /%}
```
- `src` (required, web path). `alt`, `caption`, `source` optional.

---

## 9. Tables

Use Markdoc's `{% table %}` block. Rows are groups of list items separated by `---`; the
**first row is the header** (bold it):

```markdoc
{% table %}
- **System**
- **What it does**
- **Who it's for**
---
- **NMR**
- National unique ID for all Indian doctors
- All MBBS graduates, interns, PGs
---
- **ABHA / HPR**
- Digital health identity + professional registry
- Students + practitioners
{% /table %}
```

Renders with a dark header, striped rows, and rounded corners automatically.

---

## 10. Complete example

`content/posts/nmr-doctor-id-explained/index.mdoc`:

```markdoc
---
title: >-
  Your Doctor ID Is About to Go Global — What Every MBBS Student Needs to Know
subtitle: The NMC's new digital identity system is live. Less than 1% have registered.
excerpt: India launched a national digital doctor ID in 2024. Here's why it matters for students and what to do before you graduate.
category: Global Med Ed
tags:
  - NMR
  - licensing
  - careers
author_name: Dr. Priya Sharma
author_role: Dept of Medicine
author_type: faculty
publish_date: 2026-07-08
read_time_minutes: 6
hero_image: /blog-images/nmr-doctor-id-explained/hero.webp
hero_image_caption: The NMR portal dashboard.
hero_image_source: Source: nmr.nmc.org.in
is_editors_choice: false
is_published: true
sources:
  - NMC official letter to Ministry of Health, August 2025 (Parliamentary Question No. 3264)
  - National Medical Register — nmr.nmc.org.in
meta_title: NMR Doctor ID Explained for MBBS Students | GalenAI
meta_description: What the National Medical Register means for MBBS students, and how to register before you graduate.
---
The NMC launched a national digital identity system for all Indian doctors in 2024. Less than 1% have registered. Here's what it means for you.

## What is the NMR?

In August 2024, the Health Ministry launched the **National Medical Register** — India's first centralised, Aadhaar-verified database of every registered practitioner.

{% statCallout number="722" label="Doctors registered on the NMR as of July 2025 — out of 14 lakh eligible." /%}

The NMR is:

- **Dynamic** — updated in real time
- **Aadhaar-verified** — one identity, no duplicates
- **Nationally unified** — one ID across all states

{% callout type="summary" %}
**In short:** the NMR replaces 34 fragmented state registries with a single verifiable ID.
{% /callout %}

### How registration works

{% table %}
- **System**
- **What it does**
- **Who it's for**
---
- **NMR**
- National unique ID for all Indian doctors
- All MBBS graduates, interns, PGs
{% /table %}

Follow these steps:

1. Create an account on the NMR portal
2. Link your Aadhaar
3. Upload your degree + SMC certificate

{% actionBox title="Do this before you graduate" %}
- Keep digital scans of your Aadhaar and degree ready
- Check whether your college has issued your masked UID
{% /actionBox %}

{% cta %}
**Want study tools built for the new system?** [Try GalenAI free](/qr).
{% /cta %}
```

---

## 11. How publishing works (important)

```
Save in Keystatic / commit index.mdoc  →  push to git  →  Netlify rebuilds  →  live
```

- Posts are **statically generated at build time**. A new/edited post appears only **after the
  site rebuilds** (repo-connected Netlify autodeploys on push).
- On each build, these are regenerated automatically from the published posts — **no manual
  step**: the blog index, the category pages, `sitemap.xml`, and each article's SEO metadata +
  `BlogPosting` structured data (for Google rich results).
- Setting `is_published: false` (or removing a post) removes it from all of the above on the
  next build, and its URL 404s.

---

## 12. Pre-publish checklist

- [ ] `title`, `excerpt` (≤160 chars), `category`, `author_name`, `author_type`,
      `publish_date` all set.
- [ ] `is_published: true` when ready to go live.
- [ ] Category matches one of the 9 exactly (mind the `×` in "Medicine × AI").
- [ ] Hero image (if used) ~1200×630, WebP, in `public/blog-images/<slug>/`.
- [ ] `##`/`###` used for sections (drives the Table of Contents).
- [ ] Numbered lists used only for real step sequences.
- [ ] Component tags closed correctly (`{% /callout %}`, self-closing `/%}` for block tags).
- [ ] Category-specific fields set where relevant (case study / press release / B2B).
- [ ] `sources` filled for anything with cited facts.
- [ ] Committed + pushed so Netlify rebuilds.
```
