/**
 * Stored demo content for the "try it here" sections. Every medical fact here is
 * copied from approved, faculty-checked collateral (brochure, pamphlets, How to Use
 * page). Do not add new medical content without faculty review.
 */

export type DemoAnswer = {
  id: string;
  question: string; // the chip label and the user bubble
  mode: string; // shown on the tutor pill
  answer: string[]; // paragraphs
  references: string[];
  followUps: string[];
};

export const tutorDemos: DemoAnswer[] = [
  {
    id: "isovolumetric",
    question: "Why does volume stay the same during isovolumetric contraction?",
    mode: "Explain",
    answer: [
      "Because both valves are shut. The mitral valve has just closed (S1) and the aortic valve has not opened yet, so blood has nowhere to go.",
      "Pressure climbs from about 10 to 80 mmHg while volume holds at about 120 mL. That flat line is the left edge of the pressure-volume loop.",
    ],
    references: ["Uploaded textbook, Ch. 9, p. 114", "Lecture notes, p. 3"],
    followUps: ["Quiz me on the cardiac cycle", "What happens in isovolumetric relaxation?"],
  },
  {
    id: "s2",
    question: "What produces the second heart sound (S2)?",
    mode: "Quick Q&A",
    answer: [
      "Closure of the semilunar valves.",
      "S2 is caused by closure of the aortic and pulmonary valves at the end of systole.",
    ],
    references: ["Uploaded textbook, Ch. 9"],
    followUps: ["What produces S1?", "Give me 4 questions on heart sounds"],
  },
  {
    id: "troponin",
    question: "How long does cardiac troponin T stay raised after an MI?",
    mode: "Auto",
    answer: [
      "About 10 to 14 days after an acute myocardial infarction.",
      "A common mistake is 3 to 4 days. Want to lock this in with 5 questions?",
    ],
    references: ["Standard references (3)"],
    followUps: ["Yes, give me 5 questions", "Compare troponin and CK-MB"],
  },
];

/** Tutor modes, copy from the How to Use page (st-modes). Screens in public/how-to-use/img. */
export const tutorModes = [
  {
    id: "explain",
    name: "Explain",
    line: "Step-by-step explanations and clarity checks",
    what: "Breaks a topic into numbered steps in plain language, then ends with a quick check question so you know it landed.",
    bestFor: ["First read of a new topic", "A lecture that didn't click", "Cycles, pathways, phases"],
    tryAsking: "Explain the coagulation cascade step by step",
    img: "s_explain",
  },
  {
    id: "socratic",
    name: "Socratic",
    line: "Guided questions to build your reasoning",
    what: "Answers your question with a question, one step at a time, until you reach the answer yourself. That is how vivas and ward rounds test you.",
    bestFor: ["Mechanisms and physiology", "Viva and ward-round prep", "Topics you've read but can't explain"],
    tryAsking: "How does furosemide cause hypokalaemia?",
    img: "s_socratic",
  },
  {
    id: "case",
    name: "Case-based",
    line: "Clinical cases with sequential prompts",
    what: "Builds a short patient scenario on your topic and asks you to decide, step by step: what to ask, examine, order and do.",
    bestFor: ["Clinical postings and phase III", "NEET PG style reasoning", "Linking theory to a patient"],
    tryAsking: "Give me a case on chest pain",
    img: "s_case",
  },
  {
    id: "quick",
    name: "Quick Q&A",
    line: "Short, direct answers with key points",
    what: "One-line answer first, then three or four bullet points. No long explanation.",
    bestFor: ["Last-minute revision", "Normal values, drugs of choice", "Rapid-fire self testing"],
    tryAsking: "Nerve supply of the diaphragm?",
    img: "s_quick",
  },
  {
    id: "auto",
    name: "Auto",
    line: "Let the tutor choose the best style",
    what: "Decides, message by message, whether to explain, question you or give you a case.",
    bestFor: ["Mixed study sessions", "When you're not sure which mode fits"],
    tryAsking: "Ask as you normally would",
    img: "s_modes",
  },
] as const;

/** Student testimonials, from app/data/testimonials.ts, trimmed. TODO(varun): confirm still current. */
export const testimonials = [
  {
    quote:
      "It has become my go-to platform for NEET PG. The clinical cases are both engaging and challenging, and it has changed how I think exam preparation should be approached.",
    name: "Dr. Dhanya Rao",
    meta: "MBBS, Father Muller Medical College · NEET PG aspirant",
  },
  {
    quote:
      "It helps with both pre-lecture preparation and post-lecture revision, especially for internals. Having all 19 subjects in one place makes it easy to query and learn.",
    name: "Dr. Navya Yalangi Rao",
    meta: "MBBS, Bharati Vidyapeeth Medical College",
  },
  {
    quote:
      "I use it during my postings for fast reading and answering questions. The case-based learning and the different tutor modes are my personal favourite. It truly feels like a study buddy.",
    name: "Siddhartha Kakani",
    meta: "III MBBS Phase II, Bharati Vidyapeeth Medical College, Pune",
  },
];

/** Student FAQs. Rewritten from app/data/faqs.ts under the copy rules. */
export const studentFaqs = [
  {
    q: "What is GalenAI?",
    a: "GalenAI is a study app for MBBS students and PG aspirants in India. It has an AI tutor that explains any doubt with references, a question bank with step-by-step reasoning, flashcards, clinical cases and a dashboard that shows your weak topics, all mapped to the NMC's competency-based curriculum.",
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
