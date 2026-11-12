/**
 * Single source of truth for site-wide facts: URLs, contact block, approved lines.
 * Never hardcode these in components. Copy rules live in docs/v2/MASTERPLAN.md.
 */

export const SITE = {
  name: "GalenAI",
  legalName: "GalenAI Private Limited",
  url: "https://www.galenai.io",
  locale: "en_IN",
  // Approved lines. Use verbatim.
  tagline: "AI for medical colleges.",
  subTagline: "Students learn smarter. Faculty teach easier.",
  studentLine: "Ask. Practise. Revise.",
  facultyLine: "AI drafts. Faculty review.",
  lmsLine: "Your LMS stores the syllabus. GalenAI delivers it.",
  campusLine: "Bring GalenAI to your campus.",
  defaultDescription:
    "GalenAI is the AI tutor, question bank, flashcards and clinical cases app for MBBS students in India, with an AI teaching workspace for medical college faculty, built around the NMC CBME curriculum.",
  ogImage: "/og/default.png", // TODO(exec): 1200x630, see docs/v2/EXECUTION.md task F7
} as const;

export const LINKS = {
  app: "https://app.galenai.io",
  faculty: "https://faculty.galenai.io",
  house: "https://house.galenai.io",
  appStore: "https://apps.apple.com/us/app/galenai/id6755653561",
  playStore: "https://play.google.com/store/apps/details?id=com.galenai.galenai",
  whatsapp: "https://wa.me/919741591110",
  linkedin: "https://www.linkedin.com/company/galenai-india",
  instagram: "https://www.instagram.com/galen_ai",
} as const;

export const IDS = {
  appStoreId: "6755653561",
  playPackage: "com.galenai.galenai",
  ga4: "G-K3TH8HMZP6",
} as const;

/** Contact block. Institution pages use `corporate`; student pages use `support`. */
export const CONTACT = {
  corporate: "corporate.relations@galenai.io",
  support: "support@galenai.io",
  info: "info@galenai.io",
  phone: "+91 88485 42046",
  phoneHref: "tel:+918848542046",
  address: "GalenAI Private Limited, Bangalore 560078",
} as const;

export const absoluteUrl = (path = "") =>
  `${SITE.url}${path === "/" ? "" : path}`;
