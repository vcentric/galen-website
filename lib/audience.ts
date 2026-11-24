/** Pages that belong to the college side of the site (navbar and footer show the college version). */
const FACULTY_FEATURES = ["/features/ai-mind-map-generator", "/features/ai-lesson-plan-generator"];

export const isCollegePath = (p: string) =>
  p.startsWith("/institutions") ||
  p.startsWith("/how-to-use/faculty") ||
  p.startsWith("/how-to-use/administration") ||
  FACULTY_FEATURES.some((f) => p === f || p.startsWith(`${f}/`));

/** Pages both audiences use. They keep whichever side the visitor was last on. */
const SHARED = ["/team", "/contact", "/privacy", "/terms"];
export const isSharedPath = (p: string) => SHARED.some((s) => p === s || p.startsWith(`${s}/`));
