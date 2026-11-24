# Website analytics

What the marketing site (`www.galenai.io`) reports, and why. **Keep this file in step with the code:**
an event that is not listed here should not be sent, and a listed event must still be sent.

## Setup

| | |
|---|---|
| Tool | Google Analytics 4, a property used only by the website. The student app, web app and faculty platform report to a different property. |
| Measurement ID | `G-TSKV0W5C91` (`IDS.ga4` in `lib/site.ts`) |
| Where it reports | Only on `www.galenai.io` and `galenai.io` (`ANALYTICS_HOSTS` in `lib/analytics.ts`). Localhost and Netlify preview links send nothing. |
| Code | `lib/analytics.ts` (one `trackEvent` function, page context), `app/components/v2/Analytics.tsx` (loads the tag, page-level events) |
| Staff visits | Open any page once with `?internal=1` to mark a browser as internal (`?internal=0` clears it). GA's "Internal traffic" data filter must be **active** for this to exclude them. |
| Checking events locally | On a non-reporting host every event is kept in `window.__galenEvents`. Open the console and read it. |

No personal data is ever sent. The demo form reports only that it was started or submitted and the role chosen, never a name, email, phone number or college.

## Sent with every event

| Field | Meaning | Values |
|---|---|---|
| `section` | Part of the site the event happened in | home, features, learn, exams, articles, how_to, colleges, team, contact, legal, campaign, other |
| `audience` | Which side of the site | student, college |
| `utm_source`, `utm_medium`, `utm_campaign`, … | The campaign tags in the page address, if any | as given |

## Events

### Reading

| Event | Sent when | Fields | Question it answers |
|---|---|---|---|
| `content_view` | A page is opened (once per page) | `content_type`, `content_id`, `content_group` | How many visits did each lesson, article, guide or page get? Which subject or category is read most? |
| `content_progress` | The reader passes 25, 50 and 75 per cent of a lesson, article, exam guide or how-to guide (once each) | `content_type`, `content_id`, `content_group`, `percent` | Where do readers stop? |
| `content_read` | The reader reaches the end of the text (once) | `content_type`, `content_id`, `content_group`, `seconds` | Which pieces are read to the end, and how long does that take? |

`content_type`: lesson, subject_hub, article, exam_guide, how_to_guide, feature_page, landing.
`content_id`: the page's own slug (for example `brachial-plexus`).
`content_group`: the subject for lessons, the category for articles, the role for how-to guides.

Google's own `page_view` is left automatic. Use `content_view` for "views per lesson or article", because it carries the fields above.

### Learning interactions

| Event | Sent when | Fields | Question it answers |
|---|---|---|---|
| `mcq_answer` | An MCQ is answered in a lesson or on the exam practice page | `where` (lesson, mcq_practice), `correct`, `question` (its number), `content_group` (practice page only) | Do readers try the questions? How many get them right? |
| `quiz_complete` | All of a lesson's MCQs are answered, or an exam practice run is finished | `where`, `score`, `total`, `content_group` (practice page only) | How many readers finish the questions, and how do they score? |
| `flashcard_flip` | A lesson flashcard is turned to its answer | `where`, `card` (its number) | Are the flashcards used? |
| `viva_open` | A viva question is opened in a lesson | `where`, `question` (its number) | Are the viva questions used? |

### Finding things

| Event | Sent when | Fields | Question it answers |
|---|---|---|---|
| `site_search` | Someone searches the lessons, articles or how-to guides (sent once typing pauses, two characters or more) | `where` (learn, articles, how_to), `search_term` (first 80 characters), `results` | What are people looking for? What do they search for and not find (`results` = 0)? |
| `content_filter` | An article category tab or an exam practice subject is chosen | `where` (articles, mcq_practice), `choice` | Which categories and subjects are people after? |
| `faq_open` | An FAQ question is opened, on any page | `question_text` (first 100 characters) | Which questions do visitors actually have? |
| `page_not_found` | The not-found page is shown | `path`, `referrer` | Which broken links are people hitting, and from where? |

### Buttons and conversions

| Event | Sent when | Fields | Question it answers |
|---|---|---|---|
| `cta_click` | A main button or app link is clicked: download, try on web, store badges, book a demo, try it live for faculty, WhatsApp, a lesson's link into the app, and the internal buttons "Show your college", "See the full comparison" and "Talk to us" | `destination`, `placement`, `button_text`, `button_type` (primary, secondary, link), `intent` (when it is one of the standard buttons) | Which pages and placements send people to the app or to a demo? |
| `form_start` | A visitor first clicks into the demo request form | `form` (demo_request), `placement` | How many people begin the form? |
| `generate_lead` | The demo request form is submitted successfully | `placement`, `role` | How many demo requests, from which page, from which role? |
| `form_error` | The demo request could not be sent | `form`, `placement` | Is the form failing? |
| `contact_click` | An email, phone, LinkedIn or Instagram link is clicked | `method` (email, phone, linkedin, instagram), `where` (page, footer) | Do visitors contact us directly, and how? |
| `share` | An article share button is used | `method` (copy, linkedin, twitter), `content_type`, `content_id` | Which articles get shared? |
| `pdf_download` | "Download as PDF" is used on an article | `content_type`, `content_id` | Which articles are saved? |

`destination` is one of: app_download, web_app, app_store, play_store, whatsapp, or the page path for an internal button.
`placement` is `<page>_<position>` (the code calls it `source`; it is sent as `placement` because GA uses "source" for where a visitor came from), for example `home_hero`, `features_quiz_final`, `learn_anatomy_axilla_sidebar`, `lesson_body`.

`form_start` to `generate_lead` is the demo form's completion rate.

### Demos and page furniture

| Event | Sent when | Fields | Question it answers |
|---|---|---|---|
| `demo_interaction` | A visitor uses one of the try-it demos (a tutor question, the sample MCQ, the quiz in a chat, the flashcard phone) | `demo`, `placement`, `correct` (question demos) | Do visitors try the product on the page? |
| `ui_select` | A visitor chooses something in an interactive section | `component` (ask_practise_revise, tutor_modes, library_shelf, faculty_steps), `choice` | Which parts of the product are visitors curious about? |
| `video_start` | The college demo video is played | `video_title`, `video_id` | How many visitors watch the demo? |
| `audience_switch` | The Students / Colleges switch in the navbar is used | `from`, `to` | Do visitors arrive on the wrong side? |

## From Google automatically

Enhanced measurement is on for this stream, so GA also records, without any code here: `page_view`, `session_start`, `first_visit`, `user_engagement` (time engaged), `scroll` (90 per cent of the page) and `click` (links to other domains).

## Setup in the GA admin

1. **Custom dimensions** (Admin → Custom definitions, event scope), or the fields do not appear in reports:
   `section`, `audience`, `where`, `correct`, `question`, `card`, `choice`, `question_text`, `path`, `destination`, `placement`, `button_text`, `button_type`, `intent`, `form`, `role`, `demo`, `component`, `from`, `to`.
   GA already has built-in dimensions for `content_type`, `content_id`, `content_group`, `search_term`, `method` and `video_title`, so those are not registered again.
   **Custom metrics** (same screen, second tab): `percent`, `seconds`, `score`, `total`, `results`.
2. **Key events (conversions):** `generate_lead`, and `cta_click`.
3. **Data filters:** activate "Internal traffic".
4. **Data retention:** 14 months. **Search Console:** link it. **BigQuery:** turn on the export.

## Not tracked, on purpose

- Navbar, footer and "related" link clicks: the order of `content_view` events already shows where a visitor went next.
- How-to guide step clicks and copied prompts.
- Anything typed into the demo form.

## Adding an event

Send it with `trackEvent(name, fields)` from `lib/analytics.ts`, use lower_snake_case, reuse an existing field name where one fits, and add a row to this file with the question it answers. If it has no question, it should not be sent.
