// Single source of truth for blog categories.
// Imported by keystatic.config.ts (CMS select options) and the FilterBar UI so
// the two can never drift apart. Order here = tab order on /blog.
export const BLOG_CATEGORIES = [
  "Exam Prep",
  "CBME Decoded",
  "Medicine × AI",
  "Global Med Ed",
  "From the Field",
  "Inside GalenAI",
  "Case Studies",
  "For Institutions",
  "Company Updates",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
