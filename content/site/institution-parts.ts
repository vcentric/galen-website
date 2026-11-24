import { SITE } from "@/lib/site";

/** The three parts of the AI Connected Classroom. Used on /institutions and /go/college. */
export const INSTITUTION_PARTS = [
  {
    who: "Students",
    title: "An AI tutor on approved content.",
    body: "The tutor answers from the college's approved references and shows its source. Question banks, clinical cases and flashcards are mapped to NMC competencies, and each student sees their own progress.",
    line: SITE.studentLine,
    href: "/institutions/students",
  },
  {
    who: "Faculty",
    title: "An AI workspace for teaching.",
    body: "Faculty upload their own references and generate lessons, slides, assessments and case discussions in minutes. Nothing reaches a student until faculty review, edit and publish it.",
    line: SITE.facultyLine,
    href: "/institutions/faculty",
  },
  {
    who: "College and administration",
    title: "One connected view of CBME reports.",
    body: "Published content reaches the class directly. Results and cohort analytics by student, by competency and by department show where each batch stands, ready for CBME reporting.",
    line: SITE.lmsLine,
    href: "/institutions/administration",
  },
];

/** The institutions explainer video (YouTube). */
export const INSTITUTION_VIDEO = {
  youtubeId: "3GjvIeQn9Yw",
  name: "How GalenAI Brings AI to Medical Colleges (CBME Ready)",
  description:
    "A CBME timetable uploaded and validated, competency-mapped lessons and assessments drafted with AI from faculty references, published to the class, and results by competency.",
  uploadDate: "2026-11-09",
  durationIso: "PT1M56S",
};
