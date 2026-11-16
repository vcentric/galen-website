import { LINKS, IDS } from "./site";

/**
 * One CTA vocabulary for the whole site. A page declares an intent, never a raw URL.
 *
 * Student funnel (see docs/v2/MASTERPLAN.md section 3):
 *   "download" -> app.galenai.io/download, which sends each phone to its store
 *   "try-web"  -> app.galenai.io, the web app
 * Institution funnel:
 *   "faculty-live" -> faculty.galenai.io,  "demo" -> /institutions/book-demo
 */
export type CtaIntent = "download" | "try-web" | "faculty-live" | "demo" | "whatsapp";

export const CTA: Record<CtaIntent, { href: string; label: string; short: string }> = {
  download: { href: `${LINKS.app}/download`, label: "Download the app", short: "Get the app" },
  "try-web": { href: LINKS.app, label: "Try it on web", short: "Try on web" },
  "faculty-live": { href: LINKS.faculty, label: "Try it live for faculty", short: "Try it live" },
  demo: { href: "/institutions/book-demo", label: "Book a demo", short: "Book a demo" },
  whatsapp: { href: LINKS.whatsapp, label: "Chat on WhatsApp", short: "WhatsApp" },
};

type Utm = Record<string, string>;

/**
 * UTM scheme for every link into the apps (one structure, no history to keep):
 *   utm_source   = website                      always
 *   utm_medium   = <page>_<placement>           where the click came from, e.g. home_hero, features_quiz_final,
 *                                               nav, footer, learn_cardiac_cycle_sidebar, exam_neet_pg_inline
 *   utm_campaign = galenweb                     always
 * Medium is the `source` string each CTA already declares, lower-cased with `_` separators.
 * If the visitor arrived with their own UTM (ad, post, QR) the client keeps theirs and drops ours.
 */
export const UTM_SOURCE = "website";
export const UTM_CAMPAIGN = "galenweb";

export const mediumFrom = (source: string): string =>
  source.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "unknown";

const APP_INTENTS: CtaIntent[] = ["download", "try-web", "faculty-live"];

/** Link for an intent with the website UTM added when the target is one of our apps. */
export function ctaHref(intent: CtaIntent, source: string): string {
  const href = CTA[intent].href;
  if (!APP_INTENTS.includes(intent)) return href;
  const u = new URL(href);
  u.searchParams.set("utm_source", UTM_SOURCE);
  u.searchParams.set("utm_medium", mediumFrom(source));
  u.searchParams.set("utm_campaign", UTM_CAMPAIGN);
  return u.toString();
}

/** The website's own UTM as a plain object, for store links that need `referrer` / `ct`. */
export const websiteUtm = (source: string): Utm => ({
  utm_source: UTM_SOURCE,
  utm_medium: mediumFrom(source),
  utm_campaign: UTM_CAMPAIGN,
});

/**
 * Store links with attribution that the stores actually read.
 * The old site appended utm_* straight onto store URLs. Google Play ignores those:
 * it only forwards the `referrer` parameter (URL-encoded utm string) to the app's
 * install referrer. The App Store only reads campaign token `ct` (needs provider
 * token `pt` from App Store Connect to show in App Analytics).
 */
export function playStoreUrl(utm: Utm = {}): string {
  const pairs = Object.entries(utm).filter(([k]) => k.startsWith("utm_"));
  if (!pairs.length) return LINKS.playStore;
  const referrer = pairs.map(([k, v]) => `${k}=${v}`).join("&");
  return `${LINKS.playStore}&referrer=${encodeURIComponent(referrer)}`;
}

export function appStoreUrl(utm: Utm = {}, providerToken?: string): string {
  // App Store reads one token, 40 chars max: campaign and medium together, e.g. galenweb_home_hero.
  const ct = [utm.utm_campaign ?? utm.utm_source, utm.utm_medium].filter(Boolean).join("_").slice(0, 40);
  if (!ct) return LINKS.appStore;
  const pt = providerToken ? `&pt=${providerToken}` : ""; // TODO(varun): provider token from App Store Connect
  return `${LINKS.appStore}?ct=${encodeURIComponent(ct)}${pt}&mt=8`;
}

export { IDS };
