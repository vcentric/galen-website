/**
 * Stored demo content for the "try it here" sections.
 * Tutor answers are transcribed from real GalenAI app screenshots (Nov 2026,
 * Sources/Context for webpage/The app screen answers from GalenAI/), lightly
 * shortened, em dashes removed. The app shows a "References (n)" pill; we show the
 * count only, never textbook, author or publisher names, and never channel names
 * for the "Watch next" videos. Do not add new medical content without faculty review.
 */

export type DemoExtra =
  | { kind: "table"; title: string; head: [string, string]; rows: [string, string][] }
  | { kind: "video"; title: string; from: string; length: string };

export type DemoAnswer = {
  id: string;
  question: string; // the chip label and the user bubble
  mode: string; // shown on the tutor pill
  answer: string[]; // paragraphs; **bold** spans supported
  extra?: DemoExtra;
  referenceCount: number;
  followUps: string[];
};

export const tutorDemos: DemoAnswer[] = [
  {
    id: "isovolumetric",
    question: "Why does volume stay the same during isovolumetric contraction?",
    mode: "Default",
    answer: [
      "During **isovolumic contraction**, ventricular volume remains constant because all heart valves are closed.",
      "The mitral valve has closed and the aortic valve has not yet opened, so blood cannot enter or leave. Pressure rises rapidly with no change in chamber volume.",
      "It is depicted as a vertical line on the left ventricular pressure-volume loop.",
    ],
    extra: { kind: "video", title: "The Wiggers diagram: how ECG, pressures, volumes and heart sounds fit together", from: "14:18", length: "29:58" },
    referenceCount: 3,
    followUps: ["Quiz me on pressure-volume loops", "What happens to the loop when afterload increases?"],
  },
  {
    id: "s2",
    question: "What produces the second heart sound (S2)?",
    mode: "Default",
    answer: [
      "The **second heart sound** (S2) is produced by vibrations of the cardiac structures and great vessels at the end of ventricular systole.",
      "They are triggered when the semilunar valves, the **aortic valve** and the **pulmonary valve**, close to prevent diastolic reflux of blood into the ventricles.",
      "S2 has two components: **A2** (aortic closure) and **P2** (pulmonary closure). Normally A2 comes first.",
    ],
    extra: { kind: "video", title: "Difference between the first and second heart sounds", from: "0:00", length: "7:32" },
    referenceCount: 3,
    followUps: ["Explain splitting of S2", "Quiz me on heart sounds"],
  },
  {
    id: "troponin",
    question: "How long does cardiac troponin T stay raised after an MI?",
    mode: "Default",
    answer: [
      "Cardiac troponin T (cTnT) typically remains elevated for **10 to 14 days** after an acute myocardial infarction (MI).",
      "Depending on the assay and the size of the infarct, it can sometimes be detected for 5 to 21 days.",
    ],
    extra: {
      kind: "table",
      title: "Biochemical markers of myocardial necrosis",
      head: ["Marker", "MW (kDa)"],
      rows: [
        ["CK-MB mass", "85.0"],
        ["Myoglobin", "17.8"],
        ["Troponin T", "33.0"],
        ["Troponin I", "22.5"],
      ],
    },
    referenceCount: 3,
    followUps: ["Compare troponin and CK-MB", "Quiz me on cardiac markers"],
  },
];

/** Tutor modes, copy from the How to Use page (st-modes). `img` is the How to Use screenshot (public/how-to-use/img);
 * `screen` is the dark app capture of the tutor replying in that mode (public/app, see docs/v2/APP_SCREENS.md). */
export const tutorModes = [
  {
    id: "explain",
    name: "Explain",
    line: "Step-by-step explanations and clarity checks",
    what: "Breaks a topic into numbered steps in plain language, then ends with a quick check question so you know it landed.",
    bestFor: ["First read of a new topic", "A lecture that didn't click", "Cycles, pathways, phases"],
    tryAsking: "Explain the coagulation cascade step by step",
    img: "s_explain_web",
    screen: "mode-explain",
  },
  {
    id: "socratic",
    name: "Socratic",
    line: "Guided questions to build your reasoning",
    what: "Answers your question with a question, one step at a time, until you reach the answer yourself. That is how vivas and ward rounds test you.",
    bestFor: ["Mechanisms and physiology", "Viva and ward-round prep", "Topics you've read but can't explain"],
    tryAsking: "How does furosemide cause hypokalaemia?",
    img: "s_socratic",
    screen: "mode-socratic",
  },
  {
    id: "case",
    name: "Case-based",
    line: "Clinical cases with sequential prompts",
    what: "Builds a short patient scenario on your topic and asks you to decide, step by step: what to ask, examine, order and do.",
    bestFor: ["Clinical postings and phase III", "NEET PG style reasoning", "Linking theory to a patient"],
    tryAsking: "Give me a case on chest pain",
    img: "s_case",
    screen: "mode-case-based",
  },
  {
    id: "quick",
    name: "Quick Q&A",
    line: "Short, direct answers with key points",
    what: "One-line answer first, then three or four bullet points. No long explanation.",
    bestFor: ["Last-minute revision", "Normal values, drugs of choice", "Rapid-fire self testing"],
    tryAsking: "Nerve supply of the diaphragm?",
    img: "s_quick",
    screen: "mode-quick-qa",
  },
  {
    id: "auto",
    name: "Auto",
    line: "Let the tutor choose the best style",
    what: "Decides, message by message, whether to explain, question you or give you a case.",
    bestFor: ["Mixed study sessions", "When you're not sure which mode fits"],
    tryAsking: "Ask as you normally would",
    img: "s_modes",
    screen: "tutor-modes",
  },
] as const;

/**
 * Student testimonials. The first four are from the previous site
 * (app/data/testimonials.ts, em dash replaced by a comma); the last three were
 * supplied by Varun in Nov 2026 (Rose Joseph: "material" in place of "textbooks"
 * at his request, "that fact" corrected to "the fact"). All seven are shown, in
 * the auto-scrolling row on the home page.
 */
export const testimonials = [
  {
    quote:
      "What I like most about GalenAI is how it supports continuous learning. It has become my go-to platform for NEET PG. The AI truly understands what I'm looking for, and the clinical cases are both engaging and challenging, it has changed my perspective on how exam preparation should be approached.",
    name: "Dr. Dhanya Rao",
    meta: "MBBS, Father Muller Medical College · NEET PG aspirant",
  },
  {
    quote:
      "GalenAI has become a part of my day-to-day medical studies. It really helps with both pre-lecture preparation and post-lecture revision, especially for internals. The AI understands my syllabus well, and having all 19 subjects in one place makes it easy to query and learn. The clinical cases are challenging and push me to improve my clinical thinking and skills.",
    name: "Dr. Navya Yalangi Rao",
    meta: "MBBS, 3rd Year · Bharati Vidyapeeth Medical College",
  },
  {
    quote:
      "The AI Tutor, particularly with its various learning modes, has been a constant source of support throughout my studies. I have found the subject-wise Q-Banks to be exceptionally helpful; because they are aligned with specific competencies, they have made my revision process both structured and highly effective. GalenAI makes incorporating AI into serious medical preparation feel natural, reliable, and intuitive.",
    name: "Dr. Varun Gopal Rajan",
    meta: "MBBS · MRCS aspirant, Adichunchanagiri Institute of Medical Science",
  },
  {
    quote:
      "As a final year student, GalenAI is like my study buddy. I use it during my postings for fast reading and answering questions, and during my study sessions to keep things concise. As a person who learns through application, the case based learning and the different modes available in the tutor are my personal favourite. It helps me learn through cases, questions, flash cards and it truly feels like a buddy.",
    name: "Siddhartha Kakani",
    meta: "III MBBS Phase II, Bharati Vidyapeeth Medical College, Pune",
  },
  {
    quote: "It was useful to revise before classes and I even used it before exam for quick revision.",
    name: "K Netanya Harriet",
    meta: "First-year MBBS, St. John's Medical College",
  },
  {
    quote: "I liked the fact that it uses standardised material for reference and framing answers.",
    name: "Rose Joseph",
    meta: "First-year MBBS, St. John's Medical College",
  },
  {
    quote: "It's good and easy to approach. Timesaving.",
    name: "Kiran Rawat",
    meta: "First-year MBBS, St. John's Medical College",
  },
];

/** Student FAQs. Rewritten from app/data/faqs.ts under the copy rules. */
export const studentFaqs = [
  {
    q: "What is GalenAI?",
    a: "GalenAI is an AI study app for medical students around the world, from first-year MBBS to PG entrance and licensing exams. It has an AI tutor that explains any doubt with references, a question bank with step-by-step reasoning, flashcards, clinical cases and a dashboard that shows your weak topics, all mapped to competencies.",
  },
  {
    q: "Is GalenAI free?",
    a: "GalenAI is currently free for a limited time while we gather feedback from students.",
  },
  {
    q: "Where do the answers come from?",
    a: "Answers are written from standard medical references, and every reply lists its references so you can check them. In colleges that use GalenAI, the tutor also answers from the college's approved content.",
  },
  {
    q: "Who is GalenAI for?",
    a: "MBBS students from first year to internship, NEET PG and INI-CET aspirants, foreign medical graduates preparing for FMGE, and doctors preparing for exams like USMLE and PLAB.",
  },
  {
    q: "I already use textbooks and video lectures. Why GalenAI?",
    a: "GalenAI does not replace them. It helps you use them better: it explains what did not click, tests whether you understood it, and shows you what to study next.",
  },
  {
    q: "Is it on iPhone and Android?",
    a: "Yes. GalenAI is on the App Store, Google Play and the web at app.galenai.io, and your progress carries across devices.",
  },
  {
    q: "Can my college use GalenAI?",
    a: "Yes. Colleges use GalenAI to give students an AI tutor on approved content and to give faculty an AI workspace for CBME teaching. Your faculty can see how it works at galenai.io/institutions.",
  },
];
