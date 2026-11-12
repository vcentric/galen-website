import type { Metadata } from "next";
import { SITE, LINKS, CONTACT, IDS, absoluteUrl } from "./site";

/**
 * Per-page metadata. Every route must call this (directly or through a spec page).
 * Gives each page its own title, description, canonical and social preview,
 * which the old site lacked (one shared title for every page).
 */
export function buildMetadata(opts: {
  title: string; // without the brand suffix; keep under ~55 characters
  description: string; // 140 to 160 characters, states what the page answers
  path: string; // "/features/ai-tutor"
  noindex?: boolean;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = absoluteUrl(opts.path);
  const image = opts.image ?? SITE.ogImage;
  const fullTitle = opts.path === "/" ? opts.title : `${opts.title} | ${SITE.name}`;
  return {
    title: { absolute: fullTitle },
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title: fullTitle,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: opts.type ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: opts.description,
      images: [image],
    },
  };
}

/* ───────────── JSON-LD builders. Render with <JsonLd data={...} /> ───────────── */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: absoluteUrl("/brand/lockup.svg"),
  description: SITE.defaultDescription,
  email: CONTACT.corporate,
  telephone: CONTACT.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    postalCode: "560078",
    addressCountry: "IN",
  },
  // sameAs ties the brand entity together for Google and AI engines
  // ("galen ai" is otherwise confused with the physician Galen).
  sameAs: [LINKS.linkedin, LINKS.instagram, LINKS.appStore, LINKS.playStore, LINKS.app, LINKS.faculty],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": ORG_ID },
  inLanguage: "en",
});

export const softwareAppLd = (opts?: { name?: string; description?: string; path?: string }) => ({
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: opts?.name ?? SITE.name,
  description: opts?.description ?? SITE.defaultDescription,
  url: absoluteUrl(opts?.path ?? "/"),
  applicationCategory: "EducationalApplication",
  operatingSystem: "iOS, Android, Web",
  installUrl: LINKS.playStore,
  downloadUrl: [LINKS.appStore, LINKS.playStore],
  publisher: { "@id": ORG_ID },
  // Do NOT add aggregateRating or offers.price until Varun supplies real, current values.
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: absoluteUrl(t.path),
  })),
});

export const videoLd = (v: {
  name: string;
  description: string;
  youtubeId: string;
  uploadDate: string; // ISO date
  durationIso?: string; // e.g. "PT1M15S"
}) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: v.name,
  description: v.description,
  thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`,
  uploadDate: v.uploadDate,
  ...(v.durationIso ? { duration: v.durationIso } : {}),
  embedUrl: `https://www.youtube-nocookie.com/embed/${v.youtubeId}`,
  publisher: { "@id": ORG_ID },
});

export const articleLd = (a: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.headline,
  description: a.description,
  mainEntityOfPage: absoluteUrl(a.path),
  datePublished: a.datePublished,
  dateModified: a.dateModified ?? a.datePublished,
  author: a.authorName ? { "@type": "Person", name: a.authorName } : { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
});

/** For /learn topic pages (built last, after RAG). Kept here so the schema is ready. */
export const learningResourceLd = (l: {
  name: string;
  description: string;
  path: string;
  subject: string;
  competencyCodes?: string[];
  reviewedBy?: string;
  dateModified: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: l.name,
  description: l.description,
  url: absoluteUrl(l.path),
  about: l.subject,
  educationalLevel: "MBBS",
  learningResourceType: "Topic note",
  inLanguage: "en",
  dateModified: l.dateModified,
  ...(l.competencyCodes?.length ? { teaches: l.competencyCodes } : {}),
  ...(l.reviewedBy ? { reviewedBy: { "@type": "Person", name: l.reviewedBy } } : {}),
  publisher: { "@id": ORG_ID },
});

export { IDS };
