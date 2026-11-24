import type { PageSpec, SectionSpec } from "./types";
import { EXAM_PAGES_LIVE } from "../../lib/exams";

/** The shared three-beat loop, reused on every exam page. */
const LOOP: SectionSpec = {
  id: "loop",
  kind: "steps",
  heading: "Ask. Practise. Revise.",
  notes: "Shared loop.",
  content: {
    items: [
      { t: "Ask", b: "Any doubt, answered with references, in the tutor mode that suits the topic." },
      { t: "Practise", b: "Clinical MCQs with reasoning, and cases you work through one decision at a time." },
      { t: "Revise", b: "Flashcards with spaced revision, and a dashboard that shows your weakest topic." },
    ],
  },
};

const HABIT: SectionSpec = {
  id: "habit",
  kind: "compare",
  heading: "Asking beats watching at 2X",
  notes: "Habits only, never a brand.",
  content: {
    table: {
      head: ["", "The old way", "With GalenAI"],
      rows: [
        ["A doubt", "Waits for the next class or a long video", "Answered in seconds, with references"],
        ["Practice", "Hours of questions, no idea why you got them wrong", "Reasoning on every answer, and a tutor to ask"],
        ["Revision", "Re-reading notes you already know", "Spaced flashcards and your weakest topic first"],
      ],
    },
  },
};

/** Dedicated exam modules are not live yet (Varun, Nov 2026). Shown first on every exam page. */
const examModulesSoon = (exam: string): SectionSpec => ({
  id: "modules",
  kind: "explain",
  heading: `Dedicated ${exam} modules are coming soon`,
  notes: "Coming soon notice.",
  content: {
    pill: "Coming soon",
    paragraphs: [
      `We are building AI modules made specifically for ${exam}. Until they launch, you can already prepare with everything in GalenAI today: the AI tutor for any doubt, the question bank with reasoning, flashcards and clinical cases.`,
    ],
  },
});

/** /for/{slug}: exam and stage landing pages for organic search. */
export const audiences: PageSpec[] = [
  {
    slug: "neet-pg",
    path: "/for/neet-pg",
    status: "live",
    audience: "student",
    title: "NEET PG Preparation App: AI Tutor and Question Bank",
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
      examModulesSoon("NEET PG"),
      { id: "demo", kind: "demo", heading: "Try a NEET PG style question", notes: "", content: { demo: "mcq", intro: "Answer it. Then imagine asking why, for every question you get wrong." } },
      LOOP,
      HABIT,
      { id: "tutor", kind: "demo", heading: "Ask the tutor", notes: "", content: { demo: "tutor" } },
      { id: "cta", kind: "cta", heading: "Start with 4 questions", notes: "" },
    ],
    faqs: [
      { q: "Can GalenAI help me prepare for NEET PG?", a: "Yes. Use the question bank in exam mode, ask the tutor about every question you get wrong, revise with flashcards, and use the dashboard to find your weakest subject." },
      { q: "Is GalenAI free?", a: "GalenAI is currently free for a limited time while we gather feedback from students." },
    ],
    related: [...(EXAM_PAGES_LIVE ? ["/exams/neet-pg"] : []), "/features/question-bank", "/features/ai-tutor", "/for/inicet", "/for/fmge"],
  },
  {
    slug: "inicet",
    path: "/for/inicet",
    status: "live",
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
      examModulesSoon("INI-CET"),
      { id: "modes", kind: "demo", heading: "Let the tutor question you", notes: "", content: { demo: "modes", intro: "Socratic mode answers your question with a question, the way a viva tests you." } },
      LOOP,
      { id: "cta", kind: "cta", heading: "Ask your first question", notes: "" },
    ],
    related: ["/for/neet-pg", "/features/tutor-modes"],
  },
  {
    slug: "fmge",
    path: "/for/fmge",
    status: "live",
    audience: "student",
    title: "FMGE Preparation App for Foreign Medical Graduates",
    description:
      "Prepare for FMGE with an AI tutor that explains in simple steps, a question bank with reasoning, and flashcards for fast revision.",
    keywords: ["fmge preparation app (low)", "fmge (head term)"],
    kicker: "For FMGE",
    h1: "Clear the concepts. Clear",
    h1Accent: "FMGE.",
    answer:
      "GalenAI helps foreign medical graduates prepare for FMGE with an AI tutor that explains any topic step by step, clinical MCQs with reasoning, and flashcards with spaced revision, all in one app.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      examModulesSoon("FMGE"),
      { id: "demo", kind: "demo", heading: "Try a question", notes: "", content: { demo: "mcq" } },
      LOOP,
      {
        id: "why",
        kind: "explain",
        heading: "Built for studying on your own",
        notes: "",
        content: {
          paragraphs: [
            "Preparing for FMGE often means studying without a class around you. The tutor fills that gap: ask about any topic, in Explain mode for a clear walk-through or Quick Q&A for rapid revision, and get references with every answer.",
          ],
          items: [{ t: "Tutor modes", href: "/features/tutor-modes" }],
        },
      },
      { id: "cta", kind: "cta", heading: "Start now", notes: "" },
    ],
    related: [...(EXAM_PAGES_LIVE ? ["/exams/fmge-syllabus-and-pattern"] : []), "/for/neet-pg", "/features/question-bank"],
  },
  {
    slug: "mbbs-students",
    path: "/for/mbbs-students",
    status: "live",
    audience: "student",
    title: "Study App for MBBS Students, First to Final Year",
    description:
      "One app for MBBS: an AI tutor for doubts, guided lessons, question bank, flashcards and clinical cases, mapped to the NMC CBME curriculum.",
    keywords: ["medical student app 390", "mbbs study app 40", "how to study pharmacology 590", "ai for mbbs students 30"],
    kicker: "For MBBS students",
    h1: "One app from first lecture to final",
    h1Accent: "exam.",
    answer:
      "GalenAI is a study app for MBBS and medical students around the world. It combines an AI tutor for doubts, guided lessons, a question bank, flashcards and clinical cases in one place, mapped to competency-based curricula such as India's NMC CBME, so college work and exam preparation happen in the same app.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      {
        id: "year",
        kind: "features",
        heading: "What you use it for, phase by phase",
        notes: "",
        content: {
          items: [
            { t: "Phase 1: anatomy, physiology, biochemistry", b: "Explain mode for first reads, Socratic for vivas, guided lessons for structure.", href: "/features/guided-lessons" },
            { t: "Phase 2: pathology, pharmacology, microbiology", b: "Question bank with reasoning and flashcards for the facts that need repetition.", href: "/features/question-bank" },
            { t: "Phase 3: clinical subjects and postings", b: "Clinical cases and Case-based mode to practise decisions, not just recall.", href: "/features/clinical-cases" },
            { t: "After MBBS: NEET PG, INI-CET, FMGE", b: "Exam mode and a dashboard that tracks your weakest subject.", href: "/for/neet-pg" },
          ],
        },
      },
      LOOP,
      {
        id: "college",
        kind: "explain",
        heading: "If your college uses GalenAI",
        notes: "",
        content: {
          paragraphs: ["Your faculty's lessons and materials appear on your calendar in the same app, and the tutor answers from your college's approved content."],
          items: [{ t: "GalenAI for colleges", href: "/institutions" }],
        },
      },
      { id: "cta", kind: "cta", heading: "Ask anything", notes: "" },
    ],
    related: ["/features/ai-tutor", "/features/guided-lessons", "/how-to-use/students"],
  },
];

/** /vs/{slug}: habit-level comparisons only. No named competitor products beyond the general-AI category. */
export const comparisons: PageSpec[] = [
  {
    slug: "chatgpt",
    path: "/vs/chatgpt",
    status: "live",
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
      {
        id: "table",
        kind: "compare",
        heading: "Side by side",
        notes: "Describe general AI fairly. No claims about a named product's accuracy.",
        content: {
          table: {
            head: ["", "General AI chat", "GalenAI"],
            rows: [
              ["Built for", "Everyone and every topic", "Medical students, around the NMC CBME curriculum"],
              ["Where answers come from", "Often not shown", "References on every reply"],
              ["How it teaches", "Answers what you ask", "Explain, Socratic, Case-based, Quick Q&A, or your own Tutor Profile"],
              ["Practice", "Only if you ask it to write questions", "Question bank with reasoning, clinical cases, flashcards"],
              ["Progress", "Not tracked", "Dashboard by subject and competency"],
              ["Your college", "Not connected", "Faculty lessons on your calendar, where your college uses GalenAI"],
            ],
          },
        },
      },
      { id: "demo", kind: "demo", heading: "The same question, the GalenAI way", notes: "", content: { demo: "tutor" } },
      { id: "cta", kind: "cta", heading: "Ask it your hardest doubt", notes: "" },
    ],
    related: ["/features/ai-tutor", "/vs/lms", "/features/tutor-modes"],
  },
  {
    slug: "lms",
    path: "/vs/lms",
    status: "live",
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
      {
        id: "table",
        kind: "compare",
        heading: "What students get",
        notes: "Student rows from the comparison PDF.",
        content: {
          table: {
            head: ["", "Typical LMS", "GalenAI"],
            rows: [
              ["Day to day", "Download files, submit work, see notices", "Ask, practise and revise in one app"],
              ["Doubts", "Read the files or post in a forum", "AI tutor with references, any time"],
              ["Practice", "Quizzes your faculty write", "Question bank, clinical cases and flashcards, plus your faculty's assessments"],
              ["Lessons", "Files uploaded to a course page", "Lessons on your calendar, mapped to the competency"],
            ],
            note: "For the faculty and administration comparison, see GalenAI vs your LMS for colleges.",
          },
        },
      },
      {
        id: "college",
        kind: "explain",
        heading: "Want this at your college?",
        notes: "",
        content: {
          paragraphs: ["Show your faculty how GalenAI works for colleges: lessons drafted from their own references, and CBME reports for the Medical Education Unit."],
          items: [
            { t: "GalenAI vs your LMS, for colleges", href: "/institutions/vs-lms" },
            { t: "GalenAI for colleges", href: "/institutions" },
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Try it", notes: "" },
    ],
    related: ["/institutions/vs-lms", "/features/ai-tutor"],
  },
];
