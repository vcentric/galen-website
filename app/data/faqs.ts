export interface FAQItem {
  question: string;
  answer: string;
  links?: { label: string; url: string }[];
}

export const faqs: FAQItem[] = [
  {
    question: "How can GalenAI help me in my medical studies?",
    answer: "GalenAI is your daily medical learning companion. It helps you understand concepts clearly, revise efficiently with flashcards and quizzes, practise clinical reasoning, and stay consistent with smart planning and progress tracking.",
  },
  {
    question: "Is GalenAI free to use?",
    answer: "Yes. GalenAI currently offers a free version available till May with access to core learning features. Advanced features will be part of paid plans when we fully launch.",
  },
  {
    question: "Can I trust the answers on GalenAI?",
    answer: "Yes. All answers are backed by verified medical sources with references you can check instantly. Source transparency is built into the product.",
  },
  {
    question: "What stage is GalenAI currently at?",
    answer: "GalenAI is live and actively evolving. We are rolling out features in phases while learning from real medical students using the platform.",
  },
  {
    question: "Is my data safe on GalenAI?",
    answer: "Absolutely. GalenAI follows privacy-first principles. Your data is secure, private, and never shared.",
  },
  {
    question: "Where is GalenAI available? (Web / iOS / Android)",
    answer: "GalenAI is currently available as a web app. Native mobile apps are coming soon.",
    links: [
      {
        label: "iOS App",
        url: "https://apps.apple.com/in/app/galenai/id6755653561",
      },
      {
        label: "Android App",
        url: "https://play.google.com/store/apps/details?id=com.galenai.galenai",
      },
    ],
  },
  {
    question: "I already use textbooks and video lectures. Why GalenAI?",
    answer: "GalenAI doesn't replace textbooks or videos — it helps you learn actively. It explains, tests, tracks progress, and guides you on what to study next.",
  },
  {
    question: "How does GalenAI help me stay consistent and motivated?",
    answer: "With built-in reminders, progress tracking, focused study sessions, and gentle nudges, GalenAI helps you build daily study habits — not last-minute cramming.",
  },
  {
    question: "Who is GalenAI built for?",
    answer: "GalenAI is designed for MBBS, MD/MS, SS aspirants, and early-career doctors who want to learn medicine better — not just crack exams.",
  },
  {
    question: "How can I get support or report an issue?",
    answer: "You can reach us at support@galenai.io. In-app support and instant doubt resolution are coming soon.",
  },
];
