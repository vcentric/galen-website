/**
 * /exams guide pages. They stay noindex and out of the sitemap until EXAM_PAGES_LIVE is true.
 * Every exam fact on these pages comes from an official NBEMS bulletin (see the VerifiedBox on each page).
 * Flip to true only after the founder has approved the pages.
 */
export const EXAM_PAGES_LIVE = false;

export const EXAM_PAGES = [
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
export const LEARN_NAV_LIVE = false;

/** The MCQ practice page is indexable only when exam pages are live and at least one lesson is reviewed. */
export const mcqPageIndexable = (anyReviewed: boolean) => EXAM_PAGES_LIVE && anyReviewed;
