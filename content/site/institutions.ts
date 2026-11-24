import type { PageSpec } from "./types";

/**
 * /institutions/{slug}. Low traffic, high value. Search volume for B2B terms is near
 * zero, so these pages exist to convert referred visitors and to be the cited answer
 * in AI search. Wording source: BMC briefing note, vs-LMS comparison PDF, brochure,
 * How to Use page. The /institutions home itself is bespoke (PAGE_BLUEPRINTS.md).
 */

const SIX_STEPS = [
  { t: "Upload the timetable", b: "Your CBME timetable, validated on upload." },
  { t: "See every competency", b: "A live calendar mapped to competencies." },
  { t: "Create lessons", b: "Plan and build lessons with your own references, material and notes." },
  { t: "Create with AI", b: "Slides, assessments, SGD cases, mind maps, flashcards." },
  { t: "Review and publish", b: "Edit anything, then publish to your class." },
  { t: "Track and report", b: "Analytics by competency and student. Audit-ready." },
];

export const institutionPages: PageSpec[] = [
  {
    slug: "faculty",
    path: "/institutions/faculty",
    status: "live",
    audience: "faculty",
    title: "AI Workspace for Medical Faculty",
    description:
      "Upload your references and generate lessons, slides, assessments, SGD cases and flashcards in minutes. Nothing reaches students until faculty review and publish.",
    keywords: ["ai lesson plan generator 2,900", "ai in medical education 1,300", "ai for medical faculty (GEO)"],
    kicker: "For faculty",
    h1: "Faculty teach",
    h1Accent: "easier.",
    answer:
      "GalenAI gives medical faculty an AI workspace for CBME teaching. Faculty upload their own references and generate lessons, lecture presentations, competency-based assessments, SGD cases, mind maps and flashcards in minutes. Nothing reaches a student until the faculty member reviews, edits and publishes it.",
    primaryCta: "faculty-live",
    secondaryCta: "demo",
    sections: [
      {
        id: "workspace",
        kind: "screens",
        heading: "The AI Workspace",
        notes: "Desktop mockup.",
        content: {
          intro: "Sources on the left, a chat that cites them in the middle, and a Studio that turns them into teaching material.",
          screens: [{ src: "/brand/ui/desktop_ai_workspace.webp", alt: "GalenAI AI Workspace with sources, cited chat and Studio", frame: "desk" }],
        },
      },
      {
        id: "steps",
        kind: "steps",
        heading: "From timetable to analytics in six steps",
        notes: "Brochure page 2, verbatim.",
        content: { intro: "CBME gives you the framework. GalenAI runs the delivery.", items: SIX_STEPS },
      },
      {
        id: "outputs",
        kind: "features",
        heading: "What AI drafts for you",
        notes: "Studio outputs.",
        content: {
          intro: "Pick your sources, choose an output, and review the draft.",
          items: [
            { t: "Lecture presentations", b: "Slides from your references, exportable as PPTX from the Content Bank." },
            { t: "Competency-based assessments", b: "Questions with the correct answer and rationale, mapped to the competency, ready to schedule.", href: "/features/ai-quiz-generator" },
            { t: "SGD cases", b: "Case discussions for small group teaching, built on the topic you are teaching." },
            { t: "Mind maps", b: "A whole topic on one map, so students see how the concepts connect.", href: "/features/ai-mind-map-generator" },
            { t: "Flashcards", b: "Decks published to the class for spaced revision in the student app.", href: "/features/ai-flashcard-generator" },
          ],
          screens: [{ src: "/how-to-use/img/f_ws_gallery.webp", alt: "Studio outputs in the AI Workspace", frame: "desk" }],
        },
      },
      {
        id: "lessons",
        kind: "screens",
        heading: "Lessons with Must, Good and Nice to know",
        notes: "Lesson page + generate panel.",
        content: {
          intro: "Competencies are prefilled from the classes attached to the lesson. Generate content level by level, written only from your reference library.",
          screens: [{ src: "/brand/ui/desktop_lesson_page.webp", alt: "Cardiac cycle lesson page with Must know, Good to know and Nice to know sections", frame: "desk" }],
        },
      },
      {
        id: "trust",
        kind: "explain",
        heading: "AI drafts. Faculty review.",
        notes: "Trust line.",
        content: {
          paragraphs: [
            "Everything AI produces is a draft. It is written only from the references the faculty member adds, and it is not saved or shown to anyone until they review it.",
            "Faculty edit what they need, then publish to their class. Published lessons and materials appear on the student calendar, mapped to the competency. Every output stays with your faculty.",
          ],
          items: [{ t: "How to use the AI Workspace", href: "/how-to-use/faculty/ai-workspace" }],
        },
      },
      { id: "cta", kind: "cta", heading: "Try it live", notes: "faculty.galenai.io + Book a demo.", content: { intro: "Open the faculty platform now, or let us walk you through it." } },
    ],
    faqs: [
      { q: "Does AI-generated content go to students automatically?", a: "No. AI produces a draft from the faculty member's own references. It reaches students only after the faculty member reviews, edits and publishes it." },
      { q: "Can faculty use their own notes and slides?", a: "Yes. Faculty add their own references, videos and existing content as sources, and GalenAI drafts from those." },
      { q: "Can faculty change the class date or time?", a: "No. The timetable is managed by the college's secretary role, so the calendar stays consistent for every batch. Faculty plan and publish the teaching." },
    ],
    related: ["/institutions/administration", "/how-to-use/faculty", "/features/ai-lesson-plan-generator"],
  },
  {
    slug: "administration",
    path: "/institutions/administration",
    status: "live",
    audience: "institution",
    title: "CBME Reports and Analytics for Medical Colleges",
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
      {
        id: "view",
        kind: "screens",
        heading: "Where every batch stands",
        notes: "Admin screens.",
        content: {
          intro: "Cohort analytics by competency, results by assessment, and an overview of the whole institute.",
          screens: [
            { src: "/brand/ui/desktop_admin_cohort.webp", alt: "Cohort analytics: class average, topics to revisit and students who need attention", frame: "desk", caption: "Cohort analytics" },
            { src: "/brand/ui/desktop_admin_results.webp", alt: "Assessment results: scores by student, score distribution and weakest competencies", frame: "desk", caption: "Results" },
          ],
        },
      },
      {
        id: "reports",
        kind: "features",
        heading: "What you can report on",
        notes: "Comparison PDF section 6.",
        content: {
          items: [
            { t: "Lessons delivered, per competency", b: "And lesson delivery against the plan." },
            { t: "Learning per student, per competency", b: "See who needs support before the exam, not after." },
            { t: "Assessment results, per competency", b: "By student, by batch and by department." },
            { t: "Course outcomes (CO) and programme outcomes (PO)", b: "Mapped from the same data." },
            { t: "Summative assessment", b: "On request." },
            { t: "CBME units and competencies in one view", b: "Audit-ready reports, all in one place." },
          ],
        },
      },
      {
        id: "roles",
        kind: "explain",
        heading: "Who does what: Super Admin and Secretary",
        notes: "How-to ad-roles.",
        content: {
          paragraphs: [
            "The Super Admin sets up the institute: structure, people, settings and the institute timezone, and can see every assessment and all analytics.",
            "The Secretary manages the timetable only: uploading, verifying and editing classes. Faculty plan and teach; they cannot change a class's date, time or batch, so the calendar stays consistent.",
          ],
          items: [{ t: "Roles and permissions guide", href: "/how-to-use/administration/roles" }],
        },
      },
      {
        id: "setup",
        kind: "steps",
        heading: "Setting up your college",
        notes: "How-to ad-*.",
        content: {
          items: [
            { t: "Create the structure", b: "Courses, years and batches, or import them." },
            { t: "Add your people", b: "Invite or import faculty, secretaries and students by CSV." },
            { t: "Upload the CBME timetable", b: "It is validated on upload and becomes the competency calendar." },
            { t: "Teaching starts", b: "Faculty plan and publish; analytics fill in as students learn." },
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Bring GalenAI to your campus", notes: "Book a demo." },
    ],
    faqs: [
      { q: "Can GalenAI produce reports for CBME audits?", a: "Yes. Lesson delivery, learning and assessment results are recorded per competency, with course and programme outcomes, so audit-ready reports come from one place." },
      { q: "How do we add students and faculty?", a: "Invite them individually or import them by CSV. The required columns are listed in the administration guide." },
    ],
    related: ["/institutions/faculty", "/institutions/vs-lms", "/how-to-use/administration"],
  },
  {
    slug: "students",
    path: "/institutions/students",
    status: "live",
    audience: "institution",
    title: "What Your Students Get with GalenAI",
    description:
      "An AI tutor on your college's approved content, with question banks, clinical cases and flashcards mapped to NMC competencies, and progress students can see.",
    keywords: ["ai for medical colleges (GEO)"],
    kicker: "For your students",
    h1: "Students learn",
    h1Accent: "smarter.",
    answer:
      "With GalenAI, a college gives its students an AI tutor that answers from the college's approved references and shows its source. Question banks, clinical cases and flashcards are mapped to NMC competencies, faculty lessons arrive on the college calendar, and each student sees their own progress.",
    primaryCta: "demo",
    secondaryCta: "try-web",
    sections: [
      { id: "tutor", kind: "demo", heading: "The AI tutor", notes: "Tutor demo.", content: { demo: "tutor" } },
      {
        id: "learn",
        kind: "steps",
        heading: "How students learn on GalenAI",
        notes: "Comparison PDF section 4.",
        content: {
          items: [
            { t: "Ask the tutor", b: "Open the AI tutor and ask, in the mode that suits the topic." },
            { t: "Trusted answer", b: "The answer comes from approved references, with the source shown." },
            { t: "Videos and lessons", b: "The right videos and the faculty's own lessons are right there." },
            { t: "Practise", b: "Cases, quizzes and flashcards for college and university exams." },
            { t: "See the gap", b: "Weak competencies show up, so the next session targets them." },
          ],
        },
      },
      {
        id: "phones",
        kind: "screens",
        heading: "One app for exams and college life",
        notes: "Student screens.",
        content: {
          screens: [
            { src: "dashboard", alt: "Student dashboard with progress by competency", frame: "app", caption: "Dashboard" },
            { src: "/how-to-use/img/d_cal.webp", alt: "Faculty lessons on the student calendar", frame: "phone", caption: "College calendar" },
            { src: "question-bank-answer", alt: "Question bank answer with explanation", frame: "app", caption: "Question bank" },
          ],
        },
      },
      {
        id: "why",
        kind: "explain",
        heading: "Students are already learning with AI",
        notes: "Briefing note 01.",
        content: {
          paragraphs: [
            "Medical students use general AI tools every day. These tools answer without naming a source, are not tied to the NMC curriculum, and can be wrong. Faculty and the college have no view of what students are learning from them.",
            "GalenAI gives students the same speed with answers from approved content, practice mapped to competencies, and the lessons their own faculty publish. When a college puts in the effort to create lessons and assessments on GalenAI, students use it, and they appreciate the institution for providing it.",
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "See the student app", notes: "Try on web + Book a demo." },
    ],
    related: ["/", "/institutions/faculty", "/institutions/administration"],
  },
  {
    slug: "vs-lms",
    path: "/institutions/vs-lms",
    status: "live",
    audience: "institution",
    title: "GalenAI vs Your LMS for CBME",
    description:
      "Your LMS stores the syllabus. GalenAI delivers it. A side-by-side comparison for medical colleges: lessons, assessments, competencies, AI depth and MEU reports.",
    keywords: ["moodle vs canvas 720", "best lms for medical colleges (GEO)", "moodle cbme (GEO)"],
    kicker: "GalenAI versus your LMS",
    h1: "Your LMS stores the syllabus. GalenAI",
    h1Accent: "delivers it.",
    answer:
      "A conventional LMS stores and shares files and reports on activity. It does not create lessons, help students learn, or go deep on AI. GalenAI creates the lesson content from faculty references, keeps students learning with an AI tutor and practice, and records progress for every competency.",
    primaryCta: "demo",
    secondaryCta: "faculty-live",
    sections: [
      {
        id: "why-now",
        kind: "explain",
        heading: "Why this matters now",
        notes: "Comparison PDF section 1.",
        content: {
          paragraphs: [
            "The NMC requires competency-based medical education (CBME) to be delivered and recorded competency by competency. For faculty and the Medical Education Unit, that is a much larger day-to-day task than syllabus-based teaching.",
            "A conventional LMS stores and shares files, and reports on activity. Delivering CBME needs lessons created, assessments mapped to competencies, students learning from them, and progress recorded for every competency.",
          ],
        },
      },
      {
        id: "table",
        kind: "compare",
        heading: "A typical LMS and GalenAI, side by side",
        notes: "Comparison PDF section 2. Moodle version specifics omitted.",
        content: {
          table: {
            head: ["Area", "Typical LMS", "GalenAI"],
            rows: [
              ["Lessons", "Faculty prepare every lesson and its assessments outside the LMS, competency by competency, then upload the files.", "GalenAI creates the lesson, with lecture presentations, assessments, SGD cases, mind maps and flashcards, from the faculty's own references. Faculty review, edit and publish."],
              ["Quiz tools and results", "Strong quiz tools and automatic marking, but every question is written and mapped to competencies by faculty.", "The same, and AI drafts competency-based assessments with the answer and rationale. Results per student and per competency."],
              ["CBME competencies", "Each college builds its own mapping.", "Timetable, lessons and assessments are tied to competencies from the start."],
              ["What students get", "A course page to download files, submit work and see notices.", "An app for exams and college life: tutor, practice, revision and the college's own lessons, together."],
              ["AI tutor", "None. A student reads files and posts in forums.", "Answers from the college's approved references, with the source shown, in modes from Explain to Socratic to Case-based."],
              ["Clinical cases", "Faculty write and upload cases.", "AI creates cases and students work through them with AI. Case videos are supported."],
              ["Videos", "Faculty upload videos or add links by hand.", "Relevant videos are found and linked to the topic. Faculty can upload their own, with AI quizzes built on top."],
              ["Revision", "Students make their own plan.", "Flashcards with spaced revision, quizzes and exam mode, in one place."],
              ["Voice and viva", "Not available.", "Voice tutor and viva practice: coming soon."],
              ["Reports for the MEU", "Activity, completion and grade reports.", "Lesson delivery, learning and assessment results per competency, CO and PO outcomes, ready for CBME audit."],
              ["Existing content", "Stays inside the LMS.", "Can be brought into GalenAI after you begin, so it keeps working."],
            ],
          },
        },
      },
      {
        id: "existing",
        kind: "explain",
        heading: "Your existing LMS content stays valuable",
        notes: "PDF section 7.",
        content: {
          paragraphs: [
            "Years of content are stored in your LMS. After we begin, existing content can be brought into GalenAI, so the AI tutor and faculty workspace build on it. We have already worked on module integrations, and we agree the approach with your team.",
          ],
          items: [{ t: "How integration works", href: "/institutions/integrations" }],
        },
      },
      { id: "cta", kind: "cta", heading: "See it on your syllabus", notes: "Book a demo." },
    ],
    faqs: [
      { q: "Do we have to replace our LMS?", a: "No. Existing content can be brought into GalenAI after you begin, so the AI tutor and faculty workspace build on it. The approach is agreed with your team." },
      { q: "Is voice viva available now?", a: "Voice tutor and viva practice are coming soon. Students can practise viva-style questions in text today with the tutor's Socratic mode." },
    ],
    related: ["/institutions/integrations", "/institutions/faculty", "/institutions/administration"],
  },
  {
    slug: "integrations",
    path: "/institutions/integrations",
    status: "live",
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
      {
        id: "how",
        kind: "steps",
        heading: "How content comes across",
        notes: "Kept general: no SCORM/LTI/SIS claims (deck marks those as Building).",
        content: {
          items: [
            { t: "We review what you have", b: "Together with your team, we look at the lessons, materials and videos in your LMS." },
            { t: "We agree the approach", b: "Which content comes across, in what order, and how it maps to competencies." },
            { t: "It starts working", b: "Imported content becomes sources for the AI tutor and the faculty workspace." },
          ],
        },
      },
      {
        id: "why",
        kind: "explain",
        heading: "Why it matters",
        notes: "",
        content: {
          paragraphs: [
            "The work your faculty have already done should not be lost. When existing content becomes a source, the tutor can answer from it and faculty can generate new lessons and assessments on top of it.",
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Talk to us about your setup", notes: "Book a demo." },
    ],
    related: ["/institutions/vs-lms", "/institutions/faculty"],
  },
  {
    slug: "book-demo",
    path: "/institutions/book-demo",
    status: "live",
    audience: "institution",
    title: "Book a GalenAI Demo for Your Medical College",
    description:
      "See GalenAI live on your own syllabus. Book a demo for your medical college or teaching hospital, or try the faculty platform yourself right now.",
    keywords: [],
    kicker: "Get started",
    h1: "Bring GalenAI to your",
    h1Accent: "campus.",
    answer:
      "Tell us about your college and we will show GalenAI live: the student app, the faculty AI workspace and the CBME reports, using your own timetable and topics where possible.",
    primaryCta: "whatsapp",
    secondaryCta: "faculty-live",
    sections: [
      { id: "form", kind: "form", heading: "Request a demo", notes: "LeadForm (bespoke section)." },
      { id: "why", kind: "steps", heading: "Why colleges choose GalenAI", notes: "Bespoke section." },
      { id: "try", kind: "cta", heading: "Or try it right now", notes: "Bespoke section." },
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
