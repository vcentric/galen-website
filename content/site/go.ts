import type { CtaIntent } from "@/lib/cta";

/**
 * /go/{slug}: paid and campaign landing pages. Always noindex, never in the sitemap,
 * no site navigation, one CTA, one claim.
 *
 * How they blend with the home page: the home page tells the whole story; a /go page
 * is ONE beat of that story, matched word for word to the ad that sent the visitor
 * (message match). They reuse the same section components (demo, steps, proof, cta),
 * so a win on a /go test can be promoted to the home page with no rebuild.
 * Add a variant by adding an entry here. No new route code.
 */
export type GoPage = {
  slug: string;
  channel: string; // where the traffic comes from
  title: string;
  kicker: string;
  h1: string;
  h1Accent: string;
  sub: string;
  cta: CtaIntent;
  ctaLabel: string; // specific payoff, never "Get started"
  blocks: { kind: "demo" | "steps" | "proof" | "compare" | "video" | "form"; notes: string }[];
  utmDefaults: { utm_source: string; utm_medium: string; utm_campaign: string };
};

export const goPages: GoPage[] = [
  {
    slug: "ask",
    channel: "Instagram and YouTube reels: 'Ask, don't watch'",
    title: "Ask anything. Get it explained.",
    kicker: "Ask, don't watch",
    h1: "Stop watching at 2X. Start",
    h1Accent: "asking.",
    sub: "An AI tutor for MBBS that explains any doubt in seconds, with references.",
    cta: "download",
    ctaLabel: "Ask your first question",
    blocks: [
      { kind: "demo", notes: "Tutor answer phone, sample question chips. Same component as home 'try it' section." },
      { kind: "steps", notes: "Ask. Practise. Revise. Three lines only." },
      { kind: "proof", notes: "One testimonial + approved number." },
    ],
    utmDefaults: { utm_source: "instagram", utm_medium: "paid_social", utm_campaign: "ask_dont_watch" },
  },
  {
    slug: "neet-pg",
    channel: "Search and social ads to NEET PG aspirants",
    title: "NEET PG prep with an AI tutor",
    kicker: "For NEET PG",
    h1: "Get the question wrong. Then get it",
    h1Accent: "explained.",
    sub: "Clinical MCQs with reasoning, and a tutor for every option you missed.",
    cta: "download",
    ctaLabel: "Get 4 questions",
    blocks: [
      { kind: "demo", notes: "Interactive MCQ. After answering, CTA becomes 'See the rest in the app'." },
      { kind: "proof", notes: "Real stat only, e.g. '60% of students on GalenAI get this wrong' if Varun confirms it for the question shown." },
    ],
    utmDefaults: { utm_source: "google", utm_medium: "cpc", utm_campaign: "neet_pg" },
  },
  {
    slug: "first-year",
    channel: "Campus and Gen Z social. Light Hinglish allowed (one or two words).",
    title: "MBBS first year, sorted",
    kicker: "For MBBS students",
    h1: "Kisi ke paas notes hain? Ask me",
    h1Accent: "instead.",
    sub: "Doubts, viva prep and revision in one app. Dr. Kai is up at 2 am too.",
    cta: "download",
    ctaLabel: "Ask anything",
    blocks: [
      { kind: "demo", notes: "Batch group chat card set-piece with Dr. Kai avatar (pamphlet 'NotesHain'). One mascot only." },
      { kind: "steps", notes: "Ask. Practise. Revise." },
    ],
    utmDefaults: { utm_source: "instagram", utm_medium: "paid_social", utm_campaign: "first_year" },
  },
  {
    slug: "faculty",
    channel: "LinkedIn, email and WhatsApp to faculty and MEU",
    title: "AI workspace for medical faculty",
    kicker: "For faculty",
    h1: "Faculty teach",
    h1Accent: "easier.",
    sub: "Lessons, slides, assessments and SGD cases from your own references, in minutes. AI drafts. Faculty review.",
    cta: "faculty-live",
    ctaLabel: "Try it live",
    blocks: [
      { kind: "video", notes: "Institutions short video (75 s). YouTube id pending from Varun." },
      { kind: "steps", notes: "Six brochure steps." },
    ],
    utmDefaults: { utm_source: "linkedin", utm_medium: "paid_social", utm_campaign: "faculty" },
  },
  {
    slug: "college",
    channel: "Outbound to deans, principals and management",
    title: "AI for medical colleges",
    kicker: "For medical colleges",
    h1: "AI for medical",
    h1Accent: "colleges.",
    sub: "Students learn smarter. Faculty teach easier. One connected view of CBME for administration.",
    cta: "demo",
    ctaLabel: "Book a demo",
    blocks: [
      { kind: "video", notes: "Institutions video." },
      { kind: "steps", notes: "Three parts: Students, Faculty, College and administration." },
      { kind: "form", notes: "Inline short demo form (name, college, phone)." },
    ],
    utmDefaults: { utm_source: "email", utm_medium: "outbound", utm_campaign: "college" },
  },
  {
    slug: "event",
    channel: "QR on brochure, standee and pamphlets. Per-event utm_campaign in the QR link.",
    title: "GalenAI at your campus",
    kicker: "Scan. Try. Done.",
    h1: "You scanned. Now ask",
    h1Accent: "anything.",
    sub: "Students: get the app. Faculty: try the workspace live.",
    cta: "download",
    ctaLabel: "Get the app",
    blocks: [
      { kind: "steps", notes: "Two cards side by side like the standee: Students (white) and Faculty (charcoal), each with its own CTA. Dr. Mira small with 'Try me!'." },
    ],
    utmDefaults: { utm_source: "event", utm_medium: "qr_code", utm_campaign: "event" },
  },
];
