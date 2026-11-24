/** The six faculty steps (brochure page 2, verbatim) with the screen that shows each one. Used on /institutions and /institutions/faculty. */
export type FacultyStep = { title: string; body: string; src: string; alt: string };

const UI = "/brand/ui";

export const FACULTY_STEPS: FacultyStep[] = [
  { title: "Upload the timetable", body: "Your CBME timetable, validated on upload.", src: `${UI}/desktop_timetable.webp`, alt: "Timetable with each class, its competencies, faculty and status" },
  { title: "See every competency", body: "A live calendar mapped to competencies.", src: `${UI}/desktop_calendar.webp`, alt: "Faculty week calendar with the classes for the week" },
  { title: "Create lessons", body: "Plan and build lessons with your own references, material and notes.", src: `${UI}/desktop_new_lesson.webp`, alt: "New lesson form: topic, lesson format, what to prepare and the references it is based on" },
  { title: "Create with AI", body: "Slides, assessments, SGD cases, mind maps, flashcards.", src: `${UI}/desktop_ai_workspace.webp`, alt: "AI Workspace with sources, a cited answer and the Studio for slides, assessments, mind maps and flashcards" },
  { title: "Review and publish", body: "Edit anything, then publish to your class.", src: `${UI}/desktop_lesson_page.webp`, alt: "A lesson ready to review, with a Publish to students button" },
  { title: "Track and report", body: "Analytics by competency and student. Audit-ready.", src: `${UI}/desktop_cohort.webp`, alt: "Cohort Analytics with class results, topics to revisit and students who need attention" },
];
