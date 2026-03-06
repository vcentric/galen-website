import React from "react";

export const features = [
  {
    id: 0,
    tag: "AI Tutor",
    title: "Your Personal Medical Tutor, On Demand",
    desc: "Ask questions the way you actually think. GalenAI explains concepts step-by-step, aligned with standard textbooks — so you stop guessing and start understanding.",
    screen: "/mobile.png",
  },
  {
    id: 1,
    tag: "Question Banks",
    title: "Practice Questions That Tell You Why, Not Just What",
    desc: "Every question becomes a learning moment. Get explanations that connect concepts, highlight traps, and show how examiners think — not just the right option.",
    screen: "/qbanks.png",
  },
  {
    id: 2,
    tag: "Flashcards",
    title: "Remember What Actually Matters",
    desc: "High-yield flashcards built from concepts — not random facts. Perfect for quick revisions, spaced recall, and busy days.",
    screen: "/Flashcards.png",
  },
  {
    id: 3,
    tag: "Clinical Cases",
    title: "Learn Medicine the Way It's Practiced",
    desc: "Work through real-world clinical scenarios. Build diagnostic thinking, connect theory to patients, and prepare for viva and ward discussions — not just MCQs.",
    screen: "/clinicalcases.png",
  },
  {
    id: 4,
    tag: "Coming Soon",
    title: "More Powerful Features on the Way",
    desc: "We're constantly building. AI-powered study plans, peer collaboration tools, and faculty dashboards are headed your way.",
    screen: "/mobile.png",
  },
];

export const COMING_SOON_DATA = [
  {
    title: "Analytics",
    subtitle: "Your learning, mapped and measured",
    desc: "Track what you've mastered, spot weak areas early, and follow a clear competency path—topic by topic.",
    icon: (
      <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Viva Agent",
    subtitle: "Practice viva like a real exam",
    desc: "Rapid-fire questioning, instant feedback, and model answers—so you speak with clarity in clinics and exams.",
    icon: (
      <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Productivity Agent",
    subtitle: "Turn your day into a study plan",
    desc: "Convert your syllabus + time into a realistic daily routine—revision, Qs, flashcards, and reminders done for you.",
    icon: (
      <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];
