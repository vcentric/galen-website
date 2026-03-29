export interface FAQItem {
  question: string;
  answer: string;
  links?: { label: string; url: string }[];
}

export const faqs: FAQItem[] = 
[
  {
    question: "How can GalenAI help me in my medical studies?",
    answer: "GalenAI is your daily medical learning companion. It helps you understand concepts clearly, practise clinical reasoning, revise efficiently with flashcards and questions, and track your progress — all in one place.",
  },
  {
    question: "Is GalenAI free to use?",
    answer: "Yes. GalenAI is currently free for a limited time as we gather quality feedback from early users. This helps us refine the product before introducing paid plans.",
  },
  {
    question: "Can I trust the answers on GalenAI?",
    answer: "Yes. All responses are built with verified medical references and designed to align with your curriculum. Transparency and reliability are core to the product.",
  },
  {
    question: "What stage is GalenAI currently at?",
    answer: "GalenAI is live and actively evolving. We are continuously improving the platform based on real student usage and feedback.",
  },
  {
    question: "Is my data safe on GalenAI?",
    answer: "Absolutely. GalenAI follows privacy-first principles. Your data is secure, private, and never shared.",
  },
  {
    question: "Where is GalenAI available?",
    answer: "GalenAI is live on web, iOS, and Android. You can access it across devices and continue your learning seamlessly.",
    links: [
      {
        label: "iOS App",
        url: "/qr",
      },
      {
        label: "Android App",
        url: "/qr",
      },
    ],
  },
   {
    question: "I already use textbooks and video lectures. Why GalenAI?",
    answer: "GalenAI doesn't replace your existing resources — it helps you use them better. It explains concepts, tests your understanding, tracks progress, and guides you on what to focus on next.",
  },
  {
    question: "How does GalenAI help me stay consistent?",
    answer: "With progress tracking, learning insights, and structured practice, GalenAI helps you build consistent study habits — not last-minute cramming.",
  },
  {
    question: "Who is GalenAI built for?",
    answer: "GalenAI is designed for MBBS students, PG aspirants (NEET PG, INI-CET), FMGs, and doctors preparing for exams like USMLE and PLAB.",
  },
  {
    question: "Can students collaborate or work with the GalenAI team?",
    answer: "Yes. We actively collaborate with students for feedback, content, and growth initiatives. If you're interested, reach out to us at info@galenai.io.",
  },
  {
    question: "Is GalenAI available for faculty or institutions?",
    answer: "Yes. GalenAI is building tools for faculty and medical institutions to support teaching, understand student progress, and enhance academic workflows. If you're interested in partnerships or pilots, reach out to us at info@galenai.io.",
  },
  {
    question: "How can I get support or report an issue?",
    answer: "You can reach us at support@galenai.io. We're actively supporting early users and improving the experience quickly.",
  },
];

