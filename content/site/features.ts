import type { PageSpec, Screen } from "./types";

/**
 * /features/{slug}. One page per capability. Each answers "what is it, how does it
 * work, how is it different from what I do today" and ends in the download CTA.
 * Product facts: docs/v2/reference/how-to-use-source/CONTEXT.md.
 * Screens: public/how-to-use/img (approved How to Use page captures).
 */

const phone = (name: string, alt: string, caption?: string): Screen => ({
  src: `/how-to-use/img/${name}.webp`,
  alt,
  frame: "phone",
  caption,
});
/** Real app capture from public/app (see components/v2/AppScreen.tsx). */
const app = (name: string, alt: string, caption?: string): Screen => ({ src: name, alt, frame: "app", caption });
const desk = (name: string, alt: string, caption?: string): Screen => ({
  src: `/how-to-use/img/${name}.webp`,
  alt,
  frame: "desk",
  caption,
});

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
      "GalenAI's AI tutor is a medical tutor on your phone for medical students everywhere. You ask a doubt in your own words, and it answers step by step with references, related figures and teaching videos, then offers follow-up questions and a quick quiz so the concept sticks.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "See a real answer", notes: "Tutor demo.", content: { demo: "tutor" } },
      {
        id: "how",
        kind: "steps",
        heading: "How the AI tutor works",
        notes: "How-to st-tutor.",
        content: {
          items: [
            { t: "Ask in your own words", b: "Type a doubt, or tap the paperclip to attach a PDF or an image, like a diagram or your notes, and ask about it." },
            { t: "Read the answer", b: "Every reply has References you can open, plus related figures, tables and videos where they help." },
            { t: "Keep going", b: "Tap a follow-up chip, ask for a quiz, or switch the tutor mode." },
          ],
        },
      },
      {
        id: "why",
        kind: "features",
        heading: "Why students use it instead of searching",
        notes: "",
        content: {
          items: [
            { t: "References on every reply", b: "Open them to see where the answer came from." },
            { t: "Watch next, from trusted teaching channels", b: "The right video for the topic, starting at the right minute." },
            { t: "Follow-ups that push you further", b: "\"Quiz me on this\" and the next question you should be asking." },
            { t: "Five tutor modes", b: "Explain, Socratic, Case-based, Quick Q&A or Auto.", href: "/features/tutor-modes" },
            { t: "Your chat history", b: "Every conversation saved, so revision starts where you stopped." },
          ],
          screens: [app("chat-history", "Chat history in the GalenAI app")],
        },
      },
      { id: "cta", kind: "cta", heading: "Ask your first question", notes: "" },
    ],
    faqs: [
      { q: "Is the GalenAI AI tutor free?", a: "GalenAI is currently free for a limited time while we gather feedback from students." },
      { q: "Where do the tutor's answers come from?", a: "Answers are written from standard medical references, and each reply lists its references so you can check them. In colleges that use GalenAI, the tutor also answers from the college's approved content." },
      { q: "Can I use it for NEET PG, INI-CET or FMGE?", a: "Yes. You can ask exam-style doubts, switch to Quick Q&A for rapid revision, and practise in the question bank in the same app." },
      { q: "Can I ask about a diagram or my own notes?", a: "Yes. Attach an image or a PDF with the paperclip and ask the tutor about it." },
      { q: "Can the tutor make quizzes and flashcards for me?", a: "Yes. Ask it to quiz you on any topic, or to turn a topic into flashcards, right inside the chat." },
    ],
    related: ["/features/tutor-modes", "/features/question-bank", "/how-to-use/students/ai-tutor", "/vs/chatgpt"],
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
      "GalenAI lets you choose how the tutor answers. Auto picks for you, Explain breaks the topic down, Socratic questions you until you reach the answer, Case-based teaches through a patient, and Quick Q&A fires short answers for revision. You can also build a Tutor Profile with your own instructions.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "explorer", kind: "demo", heading: "Try each mode", notes: "Mode explorer.", content: { demo: "modes" } },
      {
        id: "how",
        kind: "steps",
        heading: "How to switch modes",
        notes: "How-to st-modes.",
        content: {
          items: [
            { t: "Tap the pill next to Send", b: "It shows the mode you are in. Default is plain chat." },
            { t: "Open Tutor Mode", b: "Pick Auto, Explain, Socratic, Case-based or Quick Q&A." },
            { t: "Ask as usual", b: "Switch at any point in the chat if you want a different style." },
          ],
        },
      },
      {
        id: "profile",
        kind: "explain",
        heading: "Build your own tutor with Tutor Profile",
        notes: "How-to st-extras.",
        content: {
          paragraphs: [
            "A Tutor Profile is a tutor you build yourself. In Manage profiles you write instructions for how it teaches, what it should refer to and how answers should be formatted.",
            "Use one profile for clinical reasoning and another for memorising, then switch between them. A profile and Tutor Mode are used one at a time.",
          ],
          items: [{ t: "How to build a Tutor Profile", href: "/how-to-use/students/profiles-notes-sources" }],
        },
      },
      { id: "cta", kind: "cta", heading: "Pick a mode and ask", notes: "" },
    ],
    related: ["/features/ai-tutor", "/how-to-use/students/tutor-modes", "/for/inicet"],
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
      "The GalenAI question bank gives MBBS students clinical MCQs with step-by-step reasoning for every answer. Questions are organised by subject and competency, so you can practise for university exams and for NEET PG, INI-CET and FMGE, then ask the tutor about anything you got wrong.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      { id: "demo", kind: "demo", heading: "Try one question", notes: "MCQ demo.", content: { demo: "mcq", intro: "Pick an answer. You get the reasoning straight away." } },
      {
        id: "how",
        kind: "steps",
        heading: "How practice works",
        notes: "How-to st-qbank.",
        content: {
          items: [
            { t: "Pick a subject", b: "Every subject, with competencies shown on each question." },
            { t: "Answer", b: "One question at a time, in practice or exam mode." },
            { t: "Read the reasoning", b: "Why the right answer is right, and why yours was not." },
            { t: "Close the gap", b: "Ask the tutor, then check your weak topics on the dashboard." },
          ],
        },
      },
      {
        id: "screens",
        kind: "screens",
        heading: "Inside the question bank",
        notes: "",
        content: {
          screens: [
            app("question-bank", "Question bank subjects by year and phase", "Subjects by phase"),
            app("question-bank-answer", "A question answered with the explanation", "Answer and reasoning"),
            app("tutor-s2", "Asking the AI tutor why", "Ask the tutor why"),
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Get 4 questions now", notes: "" },
    ],
    faqs: [{ q: "Does the question bank cover NEET PG and FMGE?", a: "Yes. You can practise clinical MCQs for university exams and PG entrance in the same app, including an exam mode." }],
    related: ["/features/dashboard", "/for/neet-pg", "/how-to-use/students/question-bank"],
    flags: ["Confirm question bank size and PYQ coverage before any number is printed."],
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
      {
        id: "screens",
        kind: "screens",
        heading: "Flip, rate, repeat",
        notes: "",
        content: {
          screens: [
            app("flashcards", "Flashcard decks by subject, with cards due", "Decks"),
            app("flashcard-front", "A flashcard, front", "Recall"),
            app("flashcard-back", "A flashcard, back, rated Easy, Medium or Hard", "Rate it"),
          ],
        },
      },
      {
        id: "how",
        kind: "explain",
        heading: "How spaced revision works",
        notes: "No retention statistics.",
        content: {
          paragraphs: [
            "After each card you say how well you knew it. Cards you knew well come back later; cards you struggled with come back sooner. Over a few days, your revision time goes to the facts you actually forget.",
            "Faculty in colleges that use GalenAI can also publish their own decks to the class.",
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Start your first deck", notes: "" },
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
      "GalenAI clinical cases let medical students work through a patient from presentation to management. You decide what to ask, examine and order at each stage, and the AI responds and gives feedback, so you practise clinical reasoning and not only recall.",
    primaryCta: "download",
    secondaryCta: "try-web",
    sections: [
      {
        id: "screens",
        kind: "screens",
        heading: "Open a case",
        notes: "",
        content: {
          screens: [
            app("clinical-cases", "Clinical cases by system", "Pick a system, then a case"),
          ],
        },
      },
      {
        id: "how",
        kind: "steps",
        heading: "How a case runs",
        notes: "How-to st-cases.",
        content: {
          items: [
            { t: "History", b: "Ask the questions you would ask on the ward." },
            { t: "Examination and investigations", b: "Choose what to examine and what to order." },
            { t: "Diagnosis and management", b: "Commit to a diagnosis and a plan." },
            { t: "Feedback and score", b: "See what you missed and why it mattered." },
          ],
        },
      },
      {
        id: "more",
        kind: "explain",
        heading: "Want quick cases inside a chat?",
        notes: "",
        content: {
          paragraphs: ["Switch the tutor to Case-based mode and ask for a case on any topic, like chest pain or painless jaundice. It walks you through one decision at a time."],
          items: [
            { t: "Tutor modes", href: "/features/tutor-modes" },
            { t: "How to use Clinical Cases", href: "/how-to-use/students/clinical-cases" },
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Take your first case", notes: "" },
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
      {
        id: "what",
        kind: "features",
        heading: "What it tracks",
        notes: "How-to st-dashboard. Sample data.",
        content: {
          items: [
            { t: "Questions, accuracy and completion", b: "Today, the past 7 days and overall." },
            { t: "Your focus area", b: "The subject where your accuracy is lowest, with a Practise now button." },
            { t: "Weekly activity and streak", b: "So consistency is visible." },
            { t: "Competencies covered", b: "Progress across the CBME competencies." },
          ],
          screens: [app("dashboard", "GalenAI dashboard (sample data)")],
        },
      },
      { id: "cta", kind: "cta", heading: "Find your weak topic", notes: "" },
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
      {
        id: "screens",
        kind: "screens",
        heading: "Inside a guided lesson",
        notes: "",
        content: {
          screens: [
            phone("d_lesson_must", "Must know section of a lesson", "Must know"),
            phone("d_lesson_good", "Good to know section", "Good to know"),
            phone("d_quiz_q", "End-of-lesson quiz", "Quick quiz"),
          ],
        },
      },
      {
        id: "college",
        kind: "explain",
        heading: "Lessons from your own faculty",
        notes: "How-to st-lessons.",
        content: {
          paragraphs: [
            "When your college uses GalenAI, the lessons and materials your faculty publish arrive on your calendar, mapped to the competency, with slides, questions and files attached.",
          ],
          items: [{ t: "GalenAI for colleges", href: "/institutions" }],
        },
      },
      { id: "cta", kind: "cta", heading: "Start a guided lesson", notes: "" },
    ],
    related: ["/institutions", "/how-to-use/students/guided-lessons"],
  },
  {
    slug: "voice-viva",
    path: "/features/voice-viva",
    status: "skeleton",
    audience: "student",
    title: "Voice Viva Practice (Coming Soon)",
    description: "Practise viva questions out loud with an AI examiner. Voice viva is coming soon to GalenAI.",
    keywords: ["anatomy viva questions 260", "physiology viva questions 170", "ent viva questions 6,600"],
    kicker: "Voice viva · Coming soon",
    h1: "Practise your viva out",
    h1Accent: "loud.",
    answer:
      "Voice viva is a coming-soon GalenAI feature that lets medical students practise viva questions by speaking to an AI examiner. Until it launches, you can practise viva-style questions in text with the AI tutor's Socratic mode.",
    primaryCta: "download",
    sections: [
      {
        id: "preview",
        kind: "screens",
        heading: "What it will look like",
        notes: "Coming soon pill everywhere.",
        content: { pill: "Coming soon", screens: [app("viva", "Voice viva preview (coming soon)")] },
      },
      {
        id: "now",
        kind: "explain",
        heading: "What you can do today",
        notes: "",
        content: {
          paragraphs: ["Socratic mode asks before it tells. Ask a \"why\" or \"how\" question and answer the tutor in your own words, the way a viva works. Tap Give me a hint when you are stuck."],
          items: [{ t: "Tutor modes", href: "/features/tutor-modes" }],
        },
      },
      { id: "cta", kind: "cta", heading: "Practise in Socratic mode now", notes: "" },
    ],
    related: ["/features/tutor-modes"],
  },

  /* ── Generator pages: keyword-led (9,900 / 3,600 / 2,900 / 2,400 monthly).
     Blocked on a product answer: what can a logged-in STUDENT generate today?
     Content below describes the faculty AI Workspace, which is confirmed. */
  {
    slug: "ai-quiz-generator",
    path: "/features/ai-quiz-generator",
    status: "skeleton",
    audience: "all",
    title: "AI Quiz Generator for Medical Topics",
    description:
      "Turn any medical topic or your own references into a quiz with answers and reasoning. Built for MBBS students and medical faculty.",
    keywords: ["ai quiz generator 9,900", "ai mcq generator 390", "mcq generator from pdf 140", "ai assessment generator 110"],
    kicker: "AI quiz generator",
    h1: "Any topic. Quizzed in",
    h1Accent: "seconds.",
    answer:
      "GalenAI's AI quiz generator makes multiple-choice questions on a medical topic, with the correct answer and reasoning. Students ask the AI tutor to quiz them on any topic, their own notes or an attached PDF; faculty use the AI Workspace to draft competency-based assessments from their own references.",
    primaryCta: "download",
    secondaryCta: "faculty-live",
    sections: [
      {
        id: "students",
        kind: "steps",
        heading: "For students: quiz yourself in the chat",
        notes: "",
        content: {
          items: [
            { t: "Ask about a topic, or attach your notes", b: "A topic, a PDF or an image of your notes all work." },
            { t: "Tap \"Quiz me on this\"", b: "Or type \"Give me 5 questions on heart sounds\"." },
            { t: "Answer and learn", b: "Every question comes with the reasoning." },
          ],
        },
      },
      {
        id: "faculty",
        kind: "screens",
        heading: "For faculty: assessments from your references",
        notes: "",
        content: {
          intro: "In the AI Workspace Studio, choose Assessment. AI drafts competency-based questions with the answer and rationale. Faculty review, then schedule.",
          screens: [desk("a_ws_assess", "Assessment draft in the AI Workspace")],
        },
      },
      { id: "cta", kind: "cta", heading: "Make your first quiz", notes: "" },
    ],
    related: ["/features/question-bank", "/institutions/faculty"],
  },
  {
    slug: "ai-flashcard-generator",
    path: "/features/ai-flashcard-generator",
    status: "skeleton",
    audience: "all",
    title: "AI Flashcard Generator for Medical Students and Faculty",
    description: "Generate medical flashcards from a topic or your own references, then revise them with spaced revision in GalenAI.",
    keywords: ["ai flashcard generator 3,600"],
    kicker: "AI flashcard generator",
    h1: "Your notes, turned into",
    h1Accent: "flashcards.",
    answer:
      "GalenAI generates flashcards on any medical topic. Students ask the AI tutor to turn a topic or their notes into flashcards and revise them with spaced revision; faculty create decks in the AI Workspace from their own sources and publish them to the class.",
    primaryCta: "download",
    secondaryCta: "faculty-live",
    sections: [
      {
        id: "students",
        kind: "steps",
        heading: "For students: flashcards from the tutor",
        notes: "",
        content: {
          items: [
            { t: "Ask about a topic, or attach your notes", b: "A topic, a PDF or an image all work." },
            { t: "Ask for flashcards", b: "\"Make flashcards on the brachial plexus.\"" },
            { t: "Revise", b: "Cards you find hard come back sooner." },
          ],
        },
      },
      {
        id: "demo",
        kind: "screens",
        heading: "For faculty: decks for the whole class",
        notes: "",
        content: { screens: [desk("a_flash", "Flashcards generated in the AI Workspace")] },
      },
      {
        id: "how",
        kind: "steps",
        heading: "How faculty create a deck",
        notes: "",
        content: {
          items: [
            { t: "Add your sources", b: "Your references, notes or slides." },
            { t: "Studio, then Flashcards", b: "AI drafts the deck." },
            { t: "Review and publish", b: "Students revise it with spaced revision." },
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Generate a deck", notes: "" },
    ],
    related: ["/features/flashcards", "/institutions/faculty"],
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
      { id: "demo", kind: "screens", heading: "A generated mind map", notes: "", content: { screens: [desk("a_mindmap", "Mind map generated in the AI Workspace")] } },
      {
        id: "how",
        kind: "steps",
        heading: "How it works",
        notes: "",
        content: {
          items: [
            { t: "Add your sources", b: "Upload references for the topic." },
            { t: "Studio, then Mind map", b: "AI drafts the map from your sources only." },
            { t: "Review and publish", b: "Edit, then publish to your class." },
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Try it live", notes: "" },
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
      {
        id: "demo",
        kind: "screens",
        heading: "Generate lesson content",
        notes: "",
        content: { screens: [{ src: "/brand/ui/desktop_lesson_page.webp", alt: "Knee Joint lesson page with competencies", frame: "desk" }] },
      },
      {
        id: "how",
        kind: "steps",
        heading: "From timetable to published lesson",
        notes: "Brochure steps.",
        content: {
          items: [
            { t: "Upload the timetable", b: "Your CBME timetable, validated on upload." },
            { t: "See every competency", b: "A live calendar mapped to competencies." },
            { t: "Create lessons", b: "Plan with your own references, material and notes." },
            { t: "Create with AI", b: "Generate Must, Good and Nice to know content." },
            { t: "Review and publish", b: "Edit anything, then publish to your class." },
            { t: "Track and report", b: "Analytics by competency and student." },
          ],
        },
      },
      { id: "cta", kind: "cta", heading: "Try it live", notes: "" },
    ],
    related: ["/institutions/faculty", "/how-to-use/faculty/lesson-planning"],
  },
];
