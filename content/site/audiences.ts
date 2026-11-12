import type { PageSpec } from "./types";

/** /for/{slug}: exam and stage landing pages for organic search. */
export const audiences: PageSpec[] = [
  {
    slug: "neet-pg",
    path: "/for/neet-pg",
    status: "skeleton",
    audience: "student",
    title: "NEET PG Preparation App with AI Tutor and Question Bank",
    description:
      "Prepare for NEET PG with an AI tutor that explains every doubt, a clinical question bank with reasoning, flashcards and a dashboard that shows your weak topics.",
    keywords: ["neet pg preparation app 320", "neet pg app 170", "neet pg question bank 880", "how to prepare for neet pg 320"],
    kicker: "For NEET PG",
    h1: "NEET PG prep that answers",
    h1Accent: "back.",
    answer:
      "GalenAI is a NEET PG preparation app built around an AI tutor. You practise clinical MCQs in exam mode, ask the tutor to explain any option you got wrong, revise with flashcards, and track accuracy by subject so each session targets your weakest topic.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "Try a NEET PG style question", notes: "Reuse the interactive MCQ section. Then 'Ask why' opens the tutor answer." },
      { id: "loop", kind: "steps", heading: "Ask. Practise. Revise.", notes: "The three-beat loop with one phone screen each." },
      { id: "habit", kind: "compare", heading: "Asking beats watching at 2X", notes: "Habit comparison from the pamphlets (WATCHING struck through, video subscription). Never name a competitor." },
      { id: "proof", kind: "proof", heading: "Students already on it", notes: "Only approved proof points. See MASTERPLAN section 6." },
      { id: "cta", kind: "cta", heading: "Start with 4 questions", notes: "Download CTA." },
    ],
    faqs: [
      { q: "Is GalenAI enough for NEET PG preparation?", a: "TODO(exec+varun): honest answer on what GalenAI covers today versus a full course. Do not overclaim." },
      { q: "Does GalenAI have previous year questions?", a: "TODO(varun): confirm." },
    ],
    related: ["/features/question-bank", "/features/ai-tutor", "/for/inicet", "/for/fmge"],
    flags: ["Confirm question bank size and PYQ coverage before any number is printed."],
  },
  {
    slug: "inicet",
    path: "/for/inicet",
    status: "skeleton",
    audience: "student",
    title: "INI-CET Preparation with an AI Tutor",
    description:
      "Prepare for INI-CET with concept-first explanations, clinical MCQs with reasoning, and a tutor that questions you back in Socratic mode.",
    keywords: ["inicet preparation app (low)", "ini cet (head term)"],
    kicker: "For INI-CET",
    h1: "INI-CET rewards",
    h1Accent: "understanding.",
    answer:
      "INI-CET tests concepts more than recall. GalenAI helps you prepare with an AI tutor that explains the why behind each answer, a Socratic mode that questions you until you can reason it out, and a clinical question bank with step-by-step reasoning.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "See Socratic mode on a concept", notes: "Mode explorer locked to Socratic." },
      { id: "loop", kind: "steps", heading: "Ask. Practise. Revise.", notes: "Shared section." },
      { id: "cta", kind: "cta", heading: "Ask your first question", notes: "Download CTA." },
    ],
    related: ["/for/neet-pg", "/features/tutor-modes"],
  },
  {
    slug: "fmge",
    path: "/for/fmge",
    status: "skeleton",
    audience: "student",
    title: "FMGE Preparation App for Foreign Medical Graduates",
    description:
      "Prepare for FMGE with an AI tutor that explains in simple steps, a question bank with reasoning, and flashcards for fast revision.",
    keywords: ["fmge preparation app (low)", "fmge (head term)"],
    kicker: "For FMGE",
    h1: "Clear the concepts. Clear",
    h1Accent: "FMGE.",
    answer:
      "GalenAI helps foreign medical graduates prepare for FMGE with an AI tutor that explains any topic step by step, clinical MCQs with reasoning for every option, and flashcards with spaced revision, all in one app.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "Try a question", notes: "Shared interactive MCQ." },
      { id: "loop", kind: "steps", heading: "Ask. Practise. Revise.", notes: "Shared section." },
      { id: "cta", kind: "cta", heading: "Start now", notes: "Download CTA." },
    ],
    related: ["/for/neet-pg", "/features/question-bank"],
  },
  {
    slug: "mbbs-students",
    path: "/for/mbbs-students",
    status: "skeleton",
    audience: "student",
    title: "The Study App for MBBS Students, First Year to Final Year",
    description:
      "One app for MBBS: an AI tutor for doubts, guided lessons, question bank, flashcards and clinical cases, mapped to the NMC CBME curriculum.",
    keywords: ["medical student app 390", "mbbs study app 40", "how to study pharmacology 590", "ai for mbbs students 30"],
    kicker: "For MBBS students",
    h1: "One app from first lecture to final",
    h1Accent: "exam.",
    answer:
      "GalenAI is a study app for MBBS students in India. It combines an AI tutor for doubts, guided lessons, a question bank, flashcards and clinical cases in one place, mapped to the NMC's competency-based curriculum, so college work and exam preparation happen in the same app.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "year", kind: "features", heading: "What you use it for, year by year", notes: "Phase 1, 2, 3: subjects and the feature that helps most. Keep it factual." },
      { id: "loop", kind: "steps", heading: "Ask. Practise. Revise.", notes: "Shared section." },
      { id: "college", kind: "explain", heading: "If your college uses GalenAI", notes: "Faculty lessons on your calendar. Link /institutions." },
      { id: "cta", kind: "cta", heading: "Ask anything", notes: "Download CTA." },
    ],
    related: ["/features/ai-tutor", "/features/guided-lessons", "/how-to-use/students/start"],
  },
];

/** /vs/{slug}: habit-level comparisons only. No named competitor products. */
export const comparisons: PageSpec[] = [
  {
    slug: "chatgpt",
    path: "/vs/chatgpt",
    status: "skeleton",
    audience: "student",
    title: "GalenAI vs ChatGPT for Medical Students",
    description:
      "General AI answers anything. GalenAI is built for MBBS: referenced answers, tutor modes, a question bank and the CBME curriculum. See the difference.",
    keywords: ["chatgpt for medical students 390", "best ai for medical students 1,000"],
    kicker: "GalenAI vs general AI",
    h1: "General AI answers. A tutor",
    h1Accent: "teaches.",
    answer:
      "General AI chat tools answer almost anything, but they are not tied to the medical curriculum and may not show where an answer came from. GalenAI is built for MBBS students: answers list their references, the tutor can explain, question or quiz you, and practice is mapped to NMC competencies.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "table", kind: "compare", heading: "Side by side", notes: "Rows: source shown, curriculum mapping, tutor modes, practice (MCQ, flashcards, cases), progress tracking, college lessons. Describe general AI fairly and factually; no claims about a named product's accuracy. FLAG: brand rule says do not name competitors; Varun approved this slug in the structure, keep copy about the habit, not an attack." },
      { id: "same-question", kind: "demo", heading: "The same question, the GalenAI way", notes: "Show only the GalenAI answer with references and follow-ups. Do not fabricate another product's output." },
      { id: "cta", kind: "cta", heading: "Ask it your hardest doubt", notes: "Download CTA." },
    ],
    related: ["/features/ai-tutor", "/vs/lms"],
  },
  {
    slug: "lms",
    path: "/vs/lms",
    status: "skeleton",
    audience: "student",
    title: "GalenAI vs Your College LMS: What Students Get",
    description:
      "Your LMS holds the coursework. GalenAI is where you practise every day: tutor, question bank, flashcards and your faculty's lessons in one app.",
    keywords: ["moodle vs canvas 720"],
    kicker: "GalenAI vs an LMS",
    h1: "Your LMS holds the coursework. GalenAI is where you",
    h1Accent: "practise.",
    answer:
      "A college LMS is a place to download files, submit work and see notices. GalenAI is a learning app: an AI tutor, question bank, flashcards and clinical cases, plus the lessons your faculty publish. Colleges can read the faculty and administration comparison on the institutions page.",
    primaryCta: "download",
    sections: [
      { id: "table", kind: "compare", heading: "What students get", notes: "Student rows only from the comparison PDF. Link to /institutions/vs-lms for the full table." },
      { id: "cta", kind: "cta", heading: "Try it", notes: "Download CTA + link 'Tell your college' to /institutions." },
    ],
    related: ["/institutions/vs-lms"],
  },
];
