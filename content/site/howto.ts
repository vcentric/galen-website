/**
 * /how-to-use/{role}/{guide}. Source of every guide is the approved single page at
 * docs/v2/reference/how-to-use-source/index.html (read CONTEXT.md beside it first).
 * `sourceId` is the <section id> in that file. Port the copy verbatim: it is approved.
 * Screenshots are already in public/how-to-use/img (same file names as the source).
 */
export type HowToRole = "students" | "faculty" | "administration";

export type HowToGuide = { slug: string; title: string; sourceId: string; description: string };

export const howToRoles: Record<
  HowToRole,
  { label: string; title: string; description: string; appUrl: string; guides: HowToGuide[] }
> = {
  students: {
    label: "Students",
    title: "How to Use GalenAI: Student Guide",
    description: "Step-by-step guides to the GalenAI student app: AI tutor, tutor modes, question bank, flashcards, clinical cases and dashboard.",
    appUrl: "https://app.galenai.io",
    guides: [
      { slug: "start", title: "Start here", sourceId: "st-start", description: "Your first five minutes on GalenAI as a student." },
      { slug: "sign-in", title: "Sign in and get around", sourceId: "st-signin", description: "How to sign in to GalenAI and find your way around the app." },
      { slug: "ai-tutor", title: "How to use the AI Tutor", sourceId: "st-tutor", description: "Ask your first question, read references and use follow-ups in the GalenAI AI tutor." },
      { slug: "tutor-modes", title: "Tutor modes, one by one", sourceId: "st-modes", description: "When to use Auto, Explain, Socratic, Case-based and Quick Q&A." },
      { slug: "profiles-notes-sources", title: "Profiles, notes and sources", sourceId: "st-extras", description: "Build a Tutor Profile, attach a PDF and check sources." },
      { slug: "guided-lessons", title: "Guided lessons", sourceId: "st-guided", description: "How to start and finish a guided lesson." },
      { slug: "faculty-lessons", title: "Lessons from your faculty", sourceId: "st-lessons", description: "Find the lessons your faculty publish on your college calendar." },
      { slug: "question-bank", title: "How to use the Question Bank", sourceId: "st-qbank", description: "Practise MCQs and read the reasoning." },
      { slug: "flashcards", title: "How to use Flashcards", sourceId: "st-flash", description: "Revise with flashcards and spaced revision." },
      { slug: "clinical-cases", title: "How to use Clinical Cases", sourceId: "st-cases", description: "Work through a clinical case stage by stage." },
      { slug: "dashboard", title: "How to read your Dashboard", sourceId: "st-dashboard", description: "Understand accuracy, streaks and weak topics." },
      { slug: "voice-viva", title: "Voice viva (coming soon)", sourceId: "st-viva", description: "What voice viva will do when it launches." },
      { slug: "use-ai-the-right-way", title: "Use AI the right way", sourceId: "st-integrity", description: "Always and never rules for studying with AI." },
      { slug: "faq", title: "Student FAQ", sourceId: "st-faq", description: "Common student questions about GalenAI." },
      { slug: "quick-reference", title: "Student quick reference", sourceId: "st-ref", description: "Every student feature on one page." },
    ],
  },
  faculty: {
    label: "Faculty",
    title: "How to Use GalenAI: Faculty Guide",
    description: "Step-by-step guides for medical faculty: calendar, lesson planning, AI Workspace, Content Bank, assessments and cohort analytics.",
    appUrl: "https://faculty.galenai.io",
    guides: [
      { slug: "start", title: "Start here", sourceId: "fa-start", description: "Your first session on GalenAI as faculty." },
      { slug: "calendar", title: "Your calendar", sourceId: "fa-calendar", description: "Read your competency-mapped teaching calendar." },
      { slug: "lesson-planning", title: "Lesson planning", sourceId: "fa-lessons", description: "Plan a lesson with Must, Good and Nice to know levels." },
      { slug: "ai-workspace", title: "How to use the AI Workspace", sourceId: "fa-workspace", description: "Add sources, chat with citations and generate in Studio." },
      { slug: "content-bank", title: "Content Bank and publishing", sourceId: "fa-bank", description: "Review, export to PPTX and publish to your class." },
      { slug: "assessments", title: "Assessments and results", sourceId: "fa-assess", description: "Create, schedule and review assessments." },
      { slug: "cohort-analytics", title: "Cohort analytics", sourceId: "fa-analytics", description: "See how your batch is doing by competency." },
      { slug: "faq", title: "Faculty FAQ", sourceId: "fa-faq", description: "Common faculty questions about GalenAI." },
      { slug: "quick-reference", title: "Faculty quick reference", sourceId: "fa-ref", description: "Every faculty feature on one page." },
    ],
  },
  administration: {
    label: "Administration",
    title: "How to Use GalenAI: Administration Guide",
    description: "Set up and run GalenAI for your college: roles, courses, batches, people, the CBME timetable and analytics.",
    appUrl: "https://faculty.galenai.io",
    guides: [
      { slug: "start", title: "Start here", sourceId: "ad-start", description: "Set up your college on GalenAI." },
      { slug: "roles", title: "Roles and permissions", sourceId: "ad-roles", description: "What Super Admin and Secretary can do." },
      { slug: "settings", title: "Overview and settings", sourceId: "ad-settings", description: "Institute settings and timezone." },
      { slug: "courses-years-batches", title: "Courses, years and batches", sourceId: "ad-courses", description: "Create and import your academic structure." },
      { slug: "faculty-and-secretaries", title: "Faculty and secretaries", sourceId: "ad-people", description: "Invite, import and manage staff." },
      { slug: "students", title: "Students", sourceId: "ad-students", description: "Import and manage students." },
      { slug: "cbme-timetable", title: "CBME timetable", sourceId: "ad-timetable", description: "Upload, verify and edit the CBME timetable." },
      { slug: "lessons-and-content", title: "Lessons and content", sourceId: "ad-curriculum", description: "See lessons and content across the institute." },
      { slug: "cbme-analytics", title: "CBME analytics", sourceId: "ad-analytics", description: "Institute-wide analytics by competency." },
      { slug: "faq", title: "Admin FAQ", sourceId: "ad-faq", description: "Common administration questions." },
      { slug: "quick-reference", title: "Admin quick reference", sourceId: "ad-ref", description: "Every admin feature on one page." },
    ],
  },
};

export const howToRoleKeys = Object.keys(howToRoles) as HowToRole[];
