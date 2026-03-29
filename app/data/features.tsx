import React from "react";

export const features = [
  {
    id: 0,
    tag: "AI Tutor",
    title: "Your Personal AI Medical Tutor",
    desc: "Learn the way you think. Ask anything, GalenAI breaks it down step-by-step, adapts to your learning style, and explains with verified, curriculum-aligned references so you truly understand, not just memorize.",
    screen: "/mobile.png",
    video: "/AI Tutor_1.webm",
    duration: 10,
  },
  {
    id: 1,
    tag: "Question Banks",
    title: "Practice Questions That Teach You Why, Not Just What",
    desc: "Every question is designed to build understanding. Get clear explanations that connect concepts, highlight common traps, and show how examiners think, not just the right answer.",
    screen: "/qbanks.png",
    video: "/Qn bank_1.webm",
    duration: 12,
  },
  {
    id: 2,
    tag: "Flashcards",
    title: "Remember What Actually Matters",
    desc: "High-yield flashcards built from concepts, not isolated facts. Designed for quick revision, spaced recall, and retaining what truly sticks.",
    screen: "/Flashcards.png",
    video: "/Flashcards.webm",
    duration: 10,
  },
  {
    id: 3,
    tag: "Clinical Cases",
    title: "Learn Medicine the Way It's Practiced",
    desc: "Work through real clinical scenarios. Build diagnostic thinking, connect concepts to patients, and prepare for viva and ward discussions, not just MCQs.",
    screen: "/clinicalcases.png",
    video: "/Clinical cases.webm",
    duration: 14,
  },
  {
    id: 4,
    tag: "Learning Analytics",
    title: "Know How You’re Actually Learning",
    desc: "Track your progress across subjects, competencies, and questions. Understand your accuracy, concept mastery, and learning patterns, with clear insights on where you stand and what to focus on next.",
    screen: "/mobile.png",
    video: "/dashboard.webm",
    duration: 6,
  },
  {
    id: 5,
    tag: "Coming Soon",
    title: "More Powerful Features on the Way",
    desc: "We're constantly building. AI-powered study plans, peer collaboration tools, and faculty dashboards are headed your way.",
    screen: "/mobile.png",
    duration: 6,
  },
];

export const COMING_SOON_DATA = [
  {
    title: "Viva Agent",
    desc: "Ace viva, case presentations, and OSCE with guided practice.",
    icon: (
      <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Images in Chat",
    desc: "Learn with images, diagrams, and mind maps.",
    icon: (
      <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Study Planner",
    desc: "Stay on track with an AI that plans and follows your schedule.",
    icon: (
      <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];
