import type { PageSpec } from "./types";

/**
 * /institutions/{slug}. Low traffic, high value. Search volume for B2B terms is near
 * zero, so these pages exist to convert referred visitors and to be the cited answer
 * in AI search. Wording source: BMC briefing note, vs-LMS comparison PDF, brochure.
 * The /institutions home itself is bespoke: blueprint in docs/v2/PAGE_BLUEPRINTS.md.
 */
export const institutionPages: PageSpec[] = [
  {
    slug: "faculty",
    path: "/institutions/faculty",
    status: "skeleton",
    audience: "faculty",
    title: "AI Workspace for Medical Faculty",
    description:
      "Upload your references and generate lessons, lecture slides, assessments, SGD cases, mind maps and flashcards in minutes. Nothing reaches students until faculty review and publish.",
    keywords: ["ai lesson plan generator 2,900", "ai in medical education 1,300", "ai for medical faculty (GEO)"],
    kicker: "For faculty",
    h1: "Faculty teach",
    h1Accent: "easier.",
    answer:
      "GalenAI gives medical faculty an AI workspace for CBME teaching. Faculty upload their own references and generate lessons, lecture presentations, competency-based assessments, SGD cases, mind maps and flashcards in minutes. Nothing reaches a student until the faculty member reviews, edits and publishes it.",
    primaryCta: "faculty-live",
    secondaryCta: "demo",
    sections: [
      { id: "workspace", kind: "demo", heading: "The AI Workspace", notes: "public/brand/ui/desktop_ai_workspace.png: Sources, Chat with citations, Studio. Desktop mockup card per design system." },
      { id: "steps", kind: "steps", heading: "From timetable to analytics in six steps", notes: "01 Upload the timetable. 02 See every competency. 03 Create lessons. 04 Create with AI. 05 Review and publish. 06 Track and report. Copy verbatim from brochure page 2." },
      { id: "outputs", kind: "features", heading: "What AI drafts for you", notes: "Five tinted output chips: Lecture PPT, Assessment, SGD case, Mind map, Flashcards (tints in DESIGN_SYSTEM section 3). One screen each." },
      { id: "trust", kind: "explain", heading: "AI drafts. Faculty review.", notes: "Written only from your reference library. Drafts only. Every output stays with your faculty." },
      { id: "cta", kind: "cta", heading: "Try it live", notes: "faculty.galenai.io + Book a demo." },
    ],
    faqs: [
      { q: "Does AI-generated content go to students automatically?", a: "No. AI produces a draft from the faculty member's own references. It reaches students only after the faculty member reviews, edits and publishes it." },
      { q: "Can faculty use their own notes and slides?", a: "Yes. Faculty add their own references, videos and existing content as sources, and GalenAI drafts from those." },
    ],
    related: ["/institutions/administration", "/how-to-use/faculty/start", "/features/ai-lesson-plan-generator"],
  },
  {
    slug: "administration",
    path: "/institutions/administration",
    status: "skeleton",
    audience: "institution",
    title: "CBME Reports and Analytics for the Medical Education Unit",
    description:
      "One connected view of CBME: lessons delivered against the plan, learning and assessment results per student and per competency, CO and PO outcomes, audit-ready.",
    keywords: ["medical education unit 320", "cbme 3,600", "nmc cbme curriculum 70", "cbme audit (GEO)"],
    kicker: "For college and administration",
    h1: "One connected view of",
    h1Accent: "CBME.",
    answer:
      "GalenAI gives the Medical Education Unit and college administration one view of CBME delivery: lessons delivered against the plan, learning and assessment results by student, by competency and by department, and course and programme outcomes, with audit-ready reports in one place.",
    primaryCta: "demo",
    secondaryCta: "faculty-live",
    sections: [
      { id: "view", kind: "screens", heading: "Where every batch stands", notes: "Admin screens a_cohort, a_results, a_overview." },
      { id: "reports", kind: "features", heading: "What you can report on", notes: "List from comparison PDF section 6 'For the MEU and administration'. Summative assessment is 'on request'." },
      { id: "roles", kind: "explain", heading: "Roles: Super Admin and Secretary", notes: "Super Admin: structure, people, settings, timezone, all assessments and analytics. Secretary: timetable only. Source: how-to ad-roles." },
      { id: "setup", kind: "steps", heading: "Setting up your college", notes: "Courses, years, batches; import faculty and students by CSV; upload CBME timetable. Source: how-to ad-*." },
      { id: "cta", kind: "cta", heading: "Bring GalenAI to your campus", notes: "Book a demo." },
    ],
    related: ["/institutions/faculty", "/institutions/vs-lms", "/how-to-use/administration/start"],
  },
  {
    slug: "students",
    path: "/institutions/students",
    status: "skeleton",
    audience: "institution",
    title: "What Your Students Get with GalenAI",
    description:
      "An AI tutor on your college's approved content, with question banks, clinical cases and flashcards mapped to NMC competencies, and progress each student can see.",
    keywords: ["ai for medical colleges (GEO)"],
    kicker: "For your students",
    h1: "Students learn",
    h1Accent: "smarter.",
    answer:
      "With GalenAI, a college gives its students an AI tutor that answers from the college's approved references and shows its source. Question banks, clinical cases and flashcards are mapped to NMC competencies, faculty lessons arrive on the college calendar, and each student sees their own progress.",
    primaryCta: "demo",
    secondaryCta: "try-web",
    sections: [
      { id: "phones", kind: "screens", heading: "The student app", notes: "Three dark phones: dashboard, tutor quiz (larger, middle), question bank. Brochure page 3 layout." },
      { id: "learn", kind: "steps", heading: "How students learn on GalenAI", notes: "Five steps from comparison PDF section 4: Ask the tutor, Trusted answer, Videos and lessons, Practise, See the gap." },
      { id: "why", kind: "explain", heading: "Students are already learning with AI", notes: "Briefing note point 01: general AI is unverified and invisible to the college." },
      { id: "cta", kind: "cta", heading: "See the student app", notes: "Try on web + Book a demo." },
    ],
    related: ["/", "/institutions/faculty"],
  },
  {
    slug: "vs-lms",
    path: "/institutions/vs-lms",
    status: "skeleton",
    audience: "institution",
    title: "GalenAI vs Your LMS for CBME",
    description:
      "Your LMS stores the syllabus. GalenAI delivers it. A side-by-side comparison for medical colleges: lessons, assessments, competencies, AI depth and reports for the MEU.",
    keywords: ["moodle vs canvas 720", "best lms for medical colleges (GEO)", "moodle cbme (GEO)"],
    kicker: "GalenAI versus your LMS",
    h1: "Your LMS stores the syllabus. GalenAI",
    h1Accent: "delivers it.",
    answer:
      "A conventional LMS stores and shares files and reports on activity. It does not create lessons, help students learn, or go deep on AI. GalenAI creates the lesson content from faculty references, keeps students learning with an AI tutor and practice, and records progress for every competency.",
    primaryCta: "demo",
    secondaryCta: "faculty-live",
    sections: [
      { id: "why-now", kind: "explain", heading: "Why this matters now", notes: "Comparison PDF section 1, verbatim sense." },
      { id: "table", kind: "compare", heading: "A typical LMS and GalenAI, side by side", notes: "Full table from the PDF section 2 (12 rows). The PDF names Moodle versions; keep the column header 'Typical LMS' and move version specifics to a footnote ONLY if Varun confirms they are accurate and he wants them public. Voice and viva row: mark Coming soon." },
      { id: "existing", kind: "explain", heading: "Your existing LMS content stays valuable", notes: "PDF section 7. Link /institutions/integrations." },
      { id: "cta", kind: "cta", heading: "See it on your syllabus", notes: "Book a demo." },
    ],
    faqs: [
      { q: "Do we have to replace our LMS?", a: "No. Existing content can be brought into GalenAI after you begin, so the AI tutor and faculty workspace build on it. The approach is agreed with your team." },
    ],
    related: ["/institutions/integrations", "/institutions/faculty"],
    flags: ["Comparison PDF says 'Voice tutor and viva practice' as a GalenAI row, but brand rule says voice viva is always Coming soon. Confirm wording."],
  },
  {
    slug: "integrations",
    path: "/institutions/integrations",
    status: "skeleton",
    audience: "institution",
    title: "Bring Your Existing LMS Content into GalenAI",
    description:
      "Years of lessons and materials in your LMS can be brought into GalenAI, so the AI tutor and faculty workspace build on what you already have.",
    keywords: ["moodle for medical college (GEO)"],
    kicker: "Integrations",
    h1: "Your existing content keeps",
    h1Accent: "working.",
    answer:
      "Colleges do not start from zero on GalenAI. After deployment begins, existing content stored in the college LMS can be brought in, so the AI tutor and the faculty workspace build on it. The integration approach is agreed with each college's team.",
    primaryCta: "demo",
    sections: [
      { id: "how", kind: "explain", heading: "How content comes across", notes: "Keep general. FLAG: no technical claims (SCORM, LTI, SIS) because the deck marks those as Building." },
      { id: "cta", kind: "cta", heading: "Talk to us about your setup", notes: "Book a demo." },
    ],
    related: ["/institutions/vs-lms"],
    flags: ["What integration specifics are safe to state publicly?"],
  },
  {
    slug: "book-demo",
    path: "/institutions/book-demo",
    status: "skeleton",
    audience: "institution",
    title: "Book a GalenAI Demo for Your Medical College",
    description:
      "See GalenAI live on your own syllabus. Book a demo for your medical college, or try the faculty platform now.",
    keywords: [],
    kicker: "Get started",
    h1: "Bring GalenAI to your",
    h1Accent: "campus.",
    answer:
      "Tell us about your college and we will show GalenAI live: the student app, the faculty AI workspace and the CBME reports, using your own timetable and topics where possible.",
    primaryCta: "whatsapp",
    secondaryCta: "faculty-live",
    sections: [
      { id: "form", kind: "form", heading: "Request a demo", notes: "Fields: name, role (dropdown: Dean/Principal, MEU, HOD, Faculty, IT, Other), college, city, phone, email, message. Netlify Forms (data-netlify) so no backend is needed; honeypot field; fires GA4 generate_lead. Success state on page, no redirect." },
      { id: "why", kind: "steps", heading: "Why colleges choose GalenAI", notes: "Three-point why from the brochure back page: 01 Students are already learning with AI. 02 Faculty need support. 03 A connected classroom." },
      { id: "try", kind: "cta", heading: "Or try it right now", notes: "Two cards side by side, brochure back page: charcoal 'Try it out for faculty' (faculty.galenai.io) and white bordered 'Try it out for students' (app.galenai.io)." },
      { id: "contact", kind: "explain", heading: "Contact", notes: "Contact block exactly from lib/site.ts CONTACT (corporate)." },
    ],
    related: ["/institutions"],
  },
];

/** /institutions/resources/{slug}: small authority set for GEO. Written from NMC public documents. */
export const institutionResources: PageSpec[] = [
  ["cbme-explained", "CBME Explained for Medical Colleges", "What competency-based medical education means for a college day to day: competencies, teaching hours, assessment and records.", "cbme 3,600; nmc cbme curriculum 70", "CBME,", "explained."],
  ["cbme-timetable-and-competency-calendar", "CBME Timetable and Competency Calendar: A Practical Guide", "How to build a CBME timetable mapped to competencies, and how to keep it current through the year.", "cbme timetable 20", "The CBME timetable, made", "workable."],
  ["aetcom-modules-for-faculty", "AETCOM Modules: A Guide for Faculty", "What the AETCOM modules are, how they are scheduled across phases and how to assess them.", "aetcom module 720; aetcom 2,900", "AETCOM, for", "faculty."],
  ["medical-education-unit-guide", "The Medical Education Unit: Role and Responsibilities", "What the Medical Education Unit does under NMC norms and how it supports CBME delivery.", "medical education unit 320", "What the MEU actually", "does."],
  ["ai-in-medical-education", "AI in Medical Education: What Colleges Should Know", "Where AI helps medical teaching today, what to check before adopting it, and why faculty review matters.", "ai in medical education 1,300", "AI in medical education, without the", "hype."],
].map(([slug, title, description, kw, h1, accent]) => ({
  slug,
  path: `/institutions/resources/${slug}`,
  status: "skeleton" as const,
  audience: "institution" as const,
  title,
  description,
  keywords: kw.split("; "),
  kicker: "Resources",
  h1,
  h1Accent: accent,
  answer: "TODO(exec): 40 to 60 word direct answer. Must be accurate to NMC public documents and reviewed by Dr. Arun before status is set to live.",
  primaryCta: "demo" as const,
  sections: [
    { id: "body", kind: "explain" as const, heading: title, notes: "1,200 to 1,800 words, question-style H2s, cite NMC documents by name and year with links. Faculty-reviewed. No invented statistics." },
    { id: "galenai", kind: "explain" as const, heading: "How GalenAI helps", notes: "Short, factual, one paragraph, links to /institutions/faculty or /administration." },
    { id: "cta", kind: "cta" as const, heading: "Bring GalenAI to your campus", notes: "Book a demo." },
  ],
  related: ["/institutions", "/institutions/vs-lms"],
  flags: ["Needs Dr. Arun sign-off before going live."],
}));
