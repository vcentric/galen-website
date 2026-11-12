import type { PageSpec } from "./types";

/**
 * /features/{slug}. One page per capability. Each answers "what is it, how does it
 * work, how is it different from what I do today" and ends in the download CTA.
 * Product facts come from docs/v2/reference/how-to-use-source/CONTEXT.md.
 */
export const features: PageSpec[] = [
  {
    slug: "ai-tutor",
    path: "/features/ai-tutor",
    status: "skeleton",
    audience: "student",
    title: "AI Tutor for MBBS Students",
    description:
      "Ask any MBBS doubt and get a clear, referenced answer in seconds. GalenAI's AI tutor explains, quizzes you and follows up, in the mode that suits the topic.",
    keywords: ["ai tutor 22,200", "ai tutor for students 1,300", "best ai for medical students 1,000", "ai study assistant 880"],
    kicker: "AI Tutor",
    h1: "Ask anything. Get it",
    h1Accent: "explained.",
    answer:
      "GalenAI's AI tutor is a medical tutor on your phone for MBBS students in India. You ask a doubt in your own words, and it answers step by step with references shown, then offers follow-up questions and a quick quiz so the concept sticks.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "See a real answer", notes: "Phone frame, dark mode. Use public/brand/ui/phone_tutor_answer_cited.webp or how-to img s_explain. Sample question chips swap the answer (cardiac cycle, troponin, heart sounds). Medical content must be the faculty-checked text already in the collateral." },
      { id: "how", kind: "steps", heading: "How the AI tutor works", notes: "3 steps: Ask in your words (or attach a PDF with the paperclip). Read the answer with References. Tap a follow-up chip or ask for a quiz. Source: how-to st-tutor." },
      { id: "why", kind: "features", heading: "Why students use it instead of searching", notes: "Dot list: references on every reply; follow-up chips; feedback (thumbs, flag); chat history; works for college lessons and exam prep. Citations are supporting, not the headline." },
      { id: "modes", kind: "links", heading: "Choose how it teaches", notes: "Teaser cards for the five modes, link to /features/tutor-modes." },
      { id: "cta", kind: "cta", heading: "Ask your first question", notes: "Download CTA + try on web. Specific payoff, not 'Get started'." },
    ],
    faqs: [
      { q: "Is the GalenAI AI tutor free?", a: "TODO(varun): confirm current pricing wording. The live site says free for a limited time." },
      { q: "Where do the tutor's answers come from?", a: "Answers are written from standard medical references, and each reply lists its references so you can check them. In colleges that use GalenAI, the tutor also answers from the college's approved content." },
      { q: "Can I use it for NEET PG, INI-CET or FMGE?", a: "Yes. You can ask exam-style doubts, switch to Quick Q&A for rapid revision, and practise in the question bank in the same app." },
    ],
    related: ["/features/tutor-modes", "/features/question-bank", "/how-to-use/students/ai-tutor", "/vs/chatgpt"],
    flags: ["Confirm pricing/free wording.", "Confirm what attachments are live today (PDF only, or images too)."],
  },
  {
    slug: "tutor-modes",
    path: "/features/tutor-modes",
    status: "skeleton",
    audience: "student",
    title: "Tutor Modes: Explain, Socratic, Case-based, Quick Q&A",
    description:
      "Pick how GalenAI teaches you. Explain for clarity, Socratic to be questioned, Case-based for clinical thinking, Quick Q&A for fast revision, or build your own Tutor Profile.",
    keywords: ["socratic tutor ai 40", "ai tutor for students 1,300"],
    kicker: "Tutor modes",
    h1: "One tutor. Five ways to",
    h1Accent: "teach.",
    answer:
      "GalenAI lets you choose how the tutor answers. Auto picks for you, Explain breaks the topic down, Socratic questions you until you reach the answer, Case-based teaches through a patient, and Quick Q&A fires short questions for revision. You can also build a Tutor Profile with your own instructions.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "explorer", kind: "demo", heading: "Try each mode", notes: "Port the mode explorer from the How to Use page (#modeSeg segmented control + mode panels + modeImg map). Same question answered five ways." },
      { id: "when", kind: "features", heading: "Which mode to use when", notes: "Table: mode, use it when, example prompt. Source: how-to st-modes 'use it when' chips." },
      { id: "profile", kind: "explain", heading: "Build your own tutor with Tutor Profile", notes: "Student writes instructions: how it teaches, what it refers to, answer format (Manage profiles). Clinical Reasoning Coach and Memory Builder are example names only. Tutor Mode and a profile are mutually exclusive." },
      { id: "cta", kind: "cta", heading: "Pick a mode and ask", notes: "Download CTA." },
    ],
    related: ["/features/ai-tutor", "/how-to-use/students/tutor-modes"],
  },
  {
    slug: "question-bank",
    path: "/features/question-bank",
    status: "skeleton",
    audience: "student",
    title: "MBBS and NEET PG Question Bank with Explanations",
    description:
      "Clinical MCQs with step-by-step reasoning, mapped to subjects and competencies. Practise for university exams, NEET PG, INI-CET and FMGE in the same app as your tutor.",
    keywords: ["neet pg question bank 880", "mbbs question bank app 170", "pathology mcq 4,400", "microbiology mcq 2,900"],
    kicker: "Question bank",
    h1: "Practise until it",
    h1Accent: "sticks.",
    answer:
      "The GalenAI question bank gives MBBS students clinical MCQs with step-by-step reasoning for every option. Questions are organised by subject and competency, so you can practise for university exams and for NEET PG, INI-CET and FMGE, then ask the tutor about anything you got wrong.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "Try one question", notes: "Interactive MCQ: the S2 heart sound question from the brochure (PY5.7). Tap an option, see the explanation. This is the curiosity hook; keep it real and faculty-checked." },
      { id: "how", kind: "steps", heading: "How practice works", notes: "Pick subject, answer, read reasoning, ask the tutor, see weak areas on the dashboard. Source: how-to st-qbank." },
      { id: "exam", kind: "features", heading: "Built for college exams and PG entrance", notes: "Exam mode for university exams and PG exams. Do not name competitor question banks." },
      { id: "cta", kind: "cta", heading: "Get 4 questions now", notes: "Mirror the pamphlet payoff 'Scan. Get 4 questions.' Download CTA." },
    ],
    related: ["/features/dashboard", "/for/neet-pg", "/how-to-use/students/question-bank"],
  },
  {
    slug: "flashcards",
    path: "/features/flashcards",
    status: "skeleton",
    audience: "student",
    title: "Medical Flashcards with Spaced Revision",
    description:
      "Flashcards for MBBS subjects with spaced revision, in the same app as your AI tutor and question bank. Revise high-yield facts in minutes a day.",
    keywords: ["neet pg flashcards 140", "medical flashcards app 40", "pharmacology mnemonics 720", "anatomy mnemonics 720"],
    kicker: "Flashcards",
    h1: "Revise in minutes, not",
    h1Accent: "hours.",
    answer:
      "GalenAI flashcards help MBBS students revise high-yield facts with spaced revision, so cards you find hard come back sooner. They sit in the same app as the tutor and question bank, so a card you do not understand is one tap away from an explanation.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "Flip a card", notes: "Tap-to-flip sample deck (3 cards). Source: how-to st-flash screens." },
      { id: "how", kind: "steps", heading: "How spaced revision works", notes: "Plain explanation of spaced revision; no invented retention statistics." },
      { id: "cta", kind: "cta", heading: "Start your first deck", notes: "Download CTA." },
    ],
    related: ["/features/question-bank", "/how-to-use/students/flashcards"],
  },
  {
    slug: "clinical-cases",
    path: "/features/clinical-cases",
    status: "skeleton",
    audience: "student",
    title: "AI Clinical Cases for Medical Students",
    description:
      "Work through patient cases step by step with AI: history, examination, investigations, diagnosis and management, with feedback at each stage.",
    keywords: ["clinical cases for medical students 70", "ai osce practice 70"],
    kicker: "Clinical cases",
    h1: "Think like a",
    h1Accent: "clinician.",
    answer:
      "GalenAI clinical cases let medical students work through a patient from presentation to management. You choose what to ask, examine and order at each stage, and the AI responds and gives feedback, so you practise clinical reasoning and not only recall.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "Open a case", notes: "Screens s_cc_subjects, s_cc_list, s_cc_intro, s_cc_stage as a stepped viewer." },
      { id: "how", kind: "steps", heading: "How a case runs", notes: "Stages in order. Source: how-to st-cases." },
      { id: "cta", kind: "cta", heading: "Take your first case", notes: "Download CTA. Mention house.galenai.io (Think Like HouseMD) as a related link, not a CTA." },
    ],
    related: ["/features/ai-tutor", "/how-to-use/students/clinical-cases"],
  },
  {
    slug: "dashboard",
    path: "/features/dashboard",
    status: "skeleton",
    audience: "student",
    title: "Study Dashboard: Progress by Subject and Competency",
    description:
      "See your accuracy, streak and weak topics by subject and CBME competency, so your next study session targets the gap.",
    keywords: ["mbbs study timetable 70"],
    kicker: "Dashboard",
    h1: "See exactly what is",
    h1Accent: "weak.",
    answer:
      "The GalenAI dashboard shows MBBS students their questions attempted, accuracy, streak and progress by subject and CBME competency. It points to the topic you are weakest in and takes you straight to practice, so you stop guessing what to study next.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "screens", heading: "Your progress at a glance", notes: "public/brand/ui/phone_dashboard.webp. Label clearly as sample data." },
      { id: "what", kind: "features", heading: "What it tracks", notes: "Today, past 7 days, overall competencies, focus area, weekly activity, best subject. Source: how-to st-dashboard." },
      { id: "cta", kind: "cta", heading: "Find your weak topic", notes: "Download CTA." },
    ],
    related: ["/features/question-bank", "/how-to-use/students/dashboard"],
  },
  {
    slug: "guided-lessons",
    path: "/features/guided-lessons",
    status: "skeleton",
    audience: "student",
    title: "Guided Lessons and Lessons from Your Faculty",
    description:
      "Learn a topic step by step with guided lessons, and get the lessons your own faculty publish, on your college calendar, inside the same app.",
    keywords: ["how to study mbbs 1st year 40"],
    kicker: "Guided lessons",
    h1: "A lesson, not a",
    h1Accent: "lecture.",
    answer:
      "Guided lessons take you through a topic in order: must know, good to know and nice to know, with a quiz at the end. If your college uses GalenAI, the lessons your faculty publish appear on your calendar in the same app.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "screens", heading: "Inside a guided lesson", notes: "Screens d_lesson_must, d_lesson_good, d_quiz_q, d_quiz_res." },
      { id: "college", kind: "explain", heading: "Lessons from your own faculty", notes: "Bridge to institutions: link /institutions. Source: how-to st-lessons." },
      { id: "cta", kind: "cta", heading: "Start a guided lesson", notes: "Download CTA." },
    ],
    related: ["/institutions", "/how-to-use/students/guided-lessons"],
  },
  {
    slug: "voice-viva",
    path: "/features/voice-viva",
    status: "skeleton",
    audience: "student",
    title: "Voice Viva Practice (Coming Soon)",
    description:
      "Practise viva questions out loud with an AI examiner. Voice viva is coming soon to GalenAI.",
    keywords: ["anatomy viva questions 260", "physiology viva questions 170", "ent viva questions 6,600"],
    kicker: "Voice viva · Coming soon",
    h1: "Practise your viva out",
    h1Accent: "loud.",
    answer:
      "Voice viva is a coming-soon GalenAI feature that lets medical students practise viva questions by speaking to an AI examiner. Until it launches, you can practise viva-style questions in text with the AI tutor's Socratic mode.",
    primaryCta: "download",
    sections: [
      { id: "preview", kind: "screens", heading: "What it will look like", notes: "Screen d_viva. MUST carry the Coming soon pill everywhere. No launch date unless Varun gives one." },
      { id: "now", kind: "explain", heading: "What you can do today", notes: "Socratic mode for viva-style practice. Link /features/tutor-modes." },
      { id: "cta", kind: "cta", heading: "Practise in Socratic mode now", notes: "Download CTA." },
    ],
    related: ["/features/tutor-modes"],
    flags: ["Is a waitlist wanted, or just the download CTA?"],
  },

  /* ── Generator pages: keyword-led (9,900 / 3,600 / 2,900 / 2,400 monthly). ──
     Blocked on a product answer: what can a logged-in STUDENT generate today?
     In the faculty AI Workspace, Studio makes Slides, Assessment, Mind map, Flashcards.
     If students cannot generate, these pages are faculty-facing and CTA = faculty-live. */
  {
    slug: "ai-quiz-generator",
    path: "/features/ai-quiz-generator",
    status: "skeleton",
    audience: "all",
    title: "AI Quiz Generator for Medical Topics",
    description:
      "Turn any medical topic or your own notes into a quiz with answers and reasoning. Built for MBBS students and medical faculty.",
    keywords: ["ai quiz generator 9,900", "ai mcq generator 390", "mcq generator from pdf 140", "ai assessment generator 110"],
    kicker: "AI quiz generator",
    h1: "Any topic. Quizzed in",
    h1Accent: "seconds.",
    answer:
      "GalenAI's AI quiz generator makes multiple-choice questions on a medical topic, with the correct answer and reasoning for each option. Students use it in the tutor chat to test themselves; faculty use the AI Workspace to draft competency-based assessments from their own references.",
    primaryCta: "download",
    secondaryCta: "faculty-live",
    sections: [
      { id: "demo", kind: "demo", heading: "See a generated quiz", notes: "public/brand/ui/phone_tutor_quiz_references.webp (troponin quiz). " },
      { id: "students", kind: "steps", heading: "For students: quiz yourself in the chat", notes: "Ask the tutor for a quiz on a topic." },
      { id: "faculty", kind: "steps", heading: "For faculty: assessments from your references", notes: "AI Workspace, Studio, Assessment. AI drafts. Faculty review." },
      { id: "cta", kind: "cta", heading: "Make your first quiz", notes: "Two CTAs by audience." },
    ],
    related: ["/features/question-bank", "/institutions/faculty"],
    flags: ["Confirm students can ask for a quiz from an attached PDF today."],
  },
  {
    slug: "ai-flashcard-generator",
    path: "/features/ai-flashcard-generator",
    status: "skeleton",
    audience: "all",
    title: "AI Flashcard Generator for Medical Students and Faculty",
    description:
      "Generate medical flashcards from a topic or your own references, then revise them with spaced revision in GalenAI.",
    keywords: ["ai flashcard generator 3,600"],
    kicker: "AI flashcard generator",
    h1: "Your notes, turned into",
    h1Accent: "flashcards.",
    answer:
      "GalenAI generates flashcards from medical references. Faculty create decks in the AI Workspace from their own sources and publish them to the class; students revise them with spaced revision in the app.",
    primaryCta: "faculty-live",
    secondaryCta: "download",
    sections: [
      { id: "demo", kind: "screens", heading: "A generated deck", notes: "Faculty screen a_flash / f_ws_gallery." },
      { id: "how", kind: "steps", heading: "How it works", notes: "Add sources, Studio, Flashcards, review, publish." },
      { id: "cta", kind: "cta", heading: "Generate a deck", notes: "CTA depends on the flag below." },
    ],
    related: ["/features/flashcards", "/institutions/faculty"],
    flags: ["Can students generate their own flashcards, or faculty only?"],
  },
  {
    slug: "ai-mind-map-generator",
    path: "/features/ai-mind-map-generator",
    status: "skeleton",
    audience: "faculty",
    title: "AI Mind Map Generator for Medical Teaching",
    description:
      "Generate a mind map of any medical topic from your own references in the GalenAI AI Workspace, then review and publish it to your class.",
    keywords: ["ai mind map generator 2,400"],
    kicker: "AI mind map generator",
    h1: "A whole topic on one",
    h1Accent: "map.",
    answer:
      "GalenAI's AI Workspace turns a medical topic and your uploaded references into a mind map. Faculty review and edit it, then publish it to the class so students see how the concepts connect.",
    primaryCta: "faculty-live",
    secondaryCta: "demo",
    sections: [
      { id: "demo", kind: "screens", heading: "A generated mind map", notes: "Screen a_mindmap." },
      { id: "how", kind: "steps", heading: "How it works", notes: "Sources, Studio, Mind map, review, publish." },
      { id: "cta", kind: "cta", heading: "Try it live", notes: "faculty.galenai.io." },
    ],
    related: ["/institutions/faculty"],
  },
  {
    slug: "ai-lesson-plan-generator",
    path: "/features/ai-lesson-plan-generator",
    status: "skeleton",
    audience: "faculty",
    title: "AI Lesson Plan Generator for CBME",
    description:
      "Draft a competency-mapped lesson with Must know, Good to know and Nice to know levels from your own references. AI drafts, faculty review.",
    keywords: ["ai lesson plan generator 2,900"],
    kicker: "AI lesson plan generator",
    h1: "Lesson plans, mapped to",
    h1Accent: "competencies.",
    answer:
      "GalenAI drafts a CBME lesson from your own reference library: competencies prefilled from the class, content split into Must know, Good to know and Nice to know, with an optional focus. Nothing is saved or reaches students until the faculty member reviews and publishes it.",
    primaryCta: "faculty-live",
    secondaryCta: "demo",
    sections: [
      { id: "demo", kind: "screens", heading: "Generate lesson content", notes: "public/brand/ui/desktop_lesson_page.webp with panel_generate_lesson_content.webp overlaid (brochure page 2 layout)." },
      { id: "how", kind: "steps", heading: "From timetable to published lesson", notes: "The six brochure steps: upload timetable, see every competency, create lessons, create with AI, review and publish, track and report." },
      { id: "cta", kind: "cta", heading: "Try it live", notes: "faculty.galenai.io + Book a demo." },
    ],
    related: ["/institutions/faculty", "/how-to-use/faculty/lesson-planning"],
  },
];
