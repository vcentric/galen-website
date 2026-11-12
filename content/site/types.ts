import type { CtaIntent } from "@/lib/cta";

/**
 * A page spec is the contract between strategy (this registry) and build.
 * The route renders whatever is here; the executor replaces `blueprint` sections
 * with real section components one at a time (see app/components/v2/sections).
 *
 * status "skeleton" = rendered but noindex and left out of the sitemap.
 * status "live"     = indexable and in the sitemap. Flip only after the page checklist
 *                     in docs/v2/EXECUTION.md passes. This is the publish gate.
 */
export type Status = "skeleton" | "live";

export type SectionKind =
  | "demo" // interactive or looping product demo (phone or desktop frame)
  | "steps" // numbered sequence (real sequences only)
  | "features" // dot-list of capabilities with screens
  | "screens" // product screens gallery
  | "compare" // side-by-side table
  | "proof" // testimonials, real numbers, college names
  | "explain" // plain prose answering one question (GEO body copy)
  | "video" // lite YouTube embed + transcript
  | "form" // lead form
  | "cta" // closing CTA band
  | "links"; // internal link hub

export type Screen = { src: string; alt: string; frame: "phone" | "desk" | "none"; caption?: string };

/**
 * Real content for a section. When present, the shared component for the section's
 * kind renders it (app/components/v2/sections/kinds.tsx). When absent, the section
 * shows its blueprint box. Fill `content` to finish a section.
 */
export type SectionContent = {
  intro?: string; // one line under the heading
  items?: { t: string; b?: string; href?: string }[]; // steps, features, links
  paragraphs?: string[]; // explain
  screens?: Screen[]; // screens, demo fallback
  table?: { head: [string, string, string]; rows: [string, string, string][]; note?: string }; // compare
  demo?: "tutor" | "modes" | "mcq"; // demo widget
  pill?: string; // e.g. "Coming soon"
};

export type SectionSpec = {
  id: string; // anchor id
  kind: SectionKind;
  heading: string; // real H2, phrased the way people ask
  notes: string; // what goes here: copy direction, assets, source file
  content?: SectionContent;
};

export type Faq = { q: string; a: string };

export type PageSpec = {
  slug: string;
  path: string;
  status: Status;
  audience: "student" | "faculty" | "institution" | "all";
  // SEO
  title: string; // <title>, no brand suffix
  description: string; // meta description
  keywords: string[]; // target queries with monthly India volume where known
  // Above the fold
  kicker: string;
  h1: string; // without the accent
  h1Accent: string; // the one orange word or phrase, rendered after h1
  answer: string; // answer-first paragraph, 40 to 60 words, quotable by AI engines
  primaryCta: CtaIntent;
  secondaryCta?: CtaIntent;
  // Body
  sections: SectionSpec[];
  faqs?: Faq[];
  related?: string[]; // paths, for hub-and-spoke internal links
  flags?: string[]; // open questions for Varun; page stays skeleton until cleared
};
