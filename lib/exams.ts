/**
 * /exams guide pages. They stay noindex and out of the sitemap until EXAM_PAGES_LIVE is true.
 * Every exam fact on these pages comes from an official NBEMS bulletin (see the VerifiedBox on each page).
 * Flip to true only after the founder has approved the pages.
 */
export const EXAM_PAGES_LIVE = true;

export const EXAM_PAGES = [
  "/exams",
  "/exams/neet-pg",
  "/exams/neet-pg-eligibility-and-application",
  "/exams/neet-pg-exam-pattern-and-syllabus",
  "/exams/neet-pg-test-day-guide",
  "/exams/neet-pg-result-and-counselling",
  "/exams/neet-pg-preparation-guide",
  "/exams/neet-pg-mcq-practice",
  "/exams/fmge-syllabus-and-pattern",
];

export const NEET_PG_LAST_CHECKED = "15 November 2026";

/** Show the Learn link in the main navigation. Keep false until lessons are reviewed and published. */
export const LEARN_NAV_LIVE = true;

/** The MCQ practice page is indexable only when exam pages are live and at least one lesson is reviewed. */
export const mcqPageIndexable = (anyReviewed: boolean) => EXAM_PAGES_LIVE && anyReviewed;

/** The guide as a reading order, for the side menu and the next/previous links on each page. */
export const EXAM_GUIDE: { group: string; pages: { path: string; label: string }[] }[] = [
  {
    group: "NEET PG guide",
    pages: [
      { path: "/exams/neet-pg", label: "Overview" },
      { path: "/exams/neet-pg-exam-pattern-and-syllabus", label: "Exam pattern and syllabus" },
      { path: "/exams/neet-pg-eligibility-and-application", label: "Eligibility and application" },
      { path: "/exams/neet-pg-preparation-guide", label: "Preparation guide" },
      { path: "/exams/neet-pg-mcq-practice", label: "MCQ practice" },
      { path: "/exams/neet-pg-test-day-guide", label: "Test day guide" },
      { path: "/exams/neet-pg-result-and-counselling", label: "Result and counselling" },
    ],
  },
  { group: "FMGE", pages: [{ path: "/exams/fmge-syllabus-and-pattern", label: "Syllabus and pattern" }] },
];
