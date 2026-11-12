import { LINKS, IDS } from "./site";

/**
 * One CTA vocabulary for the whole site. A page declares an intent, never a raw URL.
 *
 * Student funnel (see docs/v2/MASTERPLAN.md section 3):
 *   phone   -> "download"  -> /download -> store (attribution carried)
 *   desktop -> "try-web"   -> app.galenai.io trial, which itself prompts the download
 * Institution funnel:
 *   "faculty-live" -> faculty.galenai.io,  "demo" -> /institutions/book-demo
 */
export type CtaIntent = "download" | "try-web" | "faculty-live" | "demo" | "whatsapp";

export const CTA: Record<CtaIntent, { href: string; label: string; short: string }> = {
  download: { href: "/download", label: "Download the app", short: "Get the app" },
  "try-web": { href: LINKS.app, label: "Try it on web", short: "Try on web" },
  "faculty-live": { href: LINKS.faculty, label: "Try it live for faculty", short: "Try it live" },
  demo: { href: "/institutions/book-demo", label: "Book a demo", short: "Book a demo" },
  whatsapp: { href: LINKS.whatsapp, label: "Chat on WhatsApp", short: "WhatsApp" },
};

type Utm = Record<string, string>;

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
  const ct = (utm.utm_campaign ?? utm.utm_source ?? "").slice(0, 40);
  if (!ct) return LINKS.appStore;
  const pt = providerToken ? `&pt=${providerToken}` : ""; // TODO(varun): provider token from App Store Connect
  return `${LINKS.appStore}?ct=${encodeURIComponent(ct)}${pt}&mt=8`;
}

export { IDS };
