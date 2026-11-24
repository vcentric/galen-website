import { isCollegePath } from "./audience";
import { IDS } from "./site";
import { getUtmParams } from "./utm";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Only the live site reports. Localhost, preview links and any other host stay out of the numbers. */
export const ANALYTICS_HOSTS = ["www.galenai.io", "galenai.io"];
export const isLiveHost = () => typeof window !== "undefined" && ANALYTICS_HOSTS.includes(window.location.hostname);

export type PageContext = {
  section: string; // home, features, learn, exams, articles, how_to, colleges, team, contact, legal, campaign
  audience: "student" | "college";
  content_type: string; // lesson, subject_hub, article, exam_guide, how_to_guide, feature_page, landing
  content_id: string; // the page's own slug
  content_group: string; // subject for lessons, category for articles, role for how-to
};

/** What kind of page a path is. Everything here comes from the URL; articles add their category themselves. */
export function pageContext(pathname: string): PageContext {
  const p = pathname.replace(/\/+$/, "") || "/";
  const [a = "", b = "", c = ""] = p.split("/").filter(Boolean);
  const audience = isCollegePath(p) ? "college" : "student";
  const ctx = (section: string, content_type: string, content_id = "", content_group = ""): PageContext => ({ section, audience, content_type, content_id, content_group });
  if (p === "/") return ctx("home", "landing", "home");
  if (a === "learn") return c ? ctx("learn", "lesson", c, b) : b ? ctx("learn", "subject_hub", b, b) : ctx("learn", "landing", "learn");
  if (a === "exams") return b ? ctx("exams", "exam_guide", b) : ctx("exams", "landing", "exams");
  if (a === "blog") return b === "category" ? ctx("articles", "landing", c, c) : b ? ctx("articles", "article", b) : ctx("articles", "landing", "articles");
  if (a === "how-to-use") return c ? ctx("how_to", "how_to_guide", c, b) : ctx("how_to", "landing", b || "how-to-use", b);
  if (a === "institutions") return ctx("colleges", b ? "feature_page" : "landing", c || b || "institutions", b === "resources" ? "resources" : "");
  if (a === "features" || a === "for" || a === "vs") return ctx("features", b ? "feature_page" : "landing", b ? `${a === "features" ? "" : `${a}-`}${b}` : a, a);
  if (a === "go") return ctx("campaign", "landing", b);
  if (a === "privacy" || a === "terms") return ctx("legal", "landing", a);
  if (a === "team" || a === "contact") return ctx(a, "landing", a);
  return ctx("other", "landing", a);
}

const INTERNAL_KEY = "galen_internal";

/** Staff open any page once with ?internal=1 to mark this browser (?internal=0 clears it). GA's internal-traffic filter then drops their visits. */
function internalFlag(): boolean {
  try {
    const q = new URLSearchParams(window.location.search).get("internal");
    if (q === "1") localStorage.setItem(INTERNAL_KEY, "1");
    if (q === "0") localStorage.removeItem(INTERNAL_KEY);
    return localStorage.getItem(INTERNAL_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Sets up the gtag queue and configures the property, once. Called before the first event, so an event
 * sent while the tag script is still loading is queued behind the config, not dropped.
 */
export function ensureGtag(measurementId: string) {
  if (typeof window === "undefined" || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, internalFlag() ? { traffic_type: "internal" } : {});
}

/** Events kept for inspection on hosts that do not report (window.__galenEvents in the console). */
type Sent = { name: string; params: Record<string, unknown> };

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  const utms = getUtmParams();
  const { section, audience } = pageContext(window.location.pathname);
  // "source" in the code is the page and placement of a button. It is sent as "placement", because GA
  // already uses the word source for where a visitor came from.
  const { source, ...rest } = params ?? {};
  // Every event carries where it happened, so reports can be cut by section and audience.
  const eventParams = { section, audience, ...utms, ...rest, ...(source !== undefined ? { placement: source } : {}) };

  if (!isLiveHost()) {
    const w = window as unknown as { __galenEvents?: Sent[] };
    (w.__galenEvents ??= []).push({ name: eventName, params: eventParams });
    return;
  }
  ensureGtag(IDS.ga4);
  window.gtag?.("event", eventName, eventParams);
};

export const getDestinationFromHref = (href: string): string => {
  if (!href) return "unknown";
  if (href.startsWith("#")) return href.substring(1);
  if (href.includes("app.galenai.io/download")) return "app_download";
  if (href.includes("app.galenai.io")) return "web_app";
  if (href.includes("apps.apple.com")) return "app_store";
  if (href.includes("play.google.com")) return "play_store";
  if (href.includes("wa.me")) return "whatsapp";
  if (href.startsWith("/")) return href.substring(1) || "home";
  return href;
};

export type CtaButtonType = "primary" | "secondary" | "link";

export interface CtaClickParams {
  source: string;
  button_type: CtaButtonType;
  button_text: string;
  [key: string]: unknown;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidButtonType = (value: unknown): value is CtaButtonType =>
  value === "primary" || value === "secondary" || value === "link";

export const trackCTAClick = (destination: string, params: CtaClickParams) => {
  const logicalDestination = getDestinationFromHref(destination);

  if (
    !isNonEmptyString(logicalDestination) ||
    logicalDestination === "unknown"
  ) {
    console.error("[analytics] Dropped cta_click: invalid destination", {
      destination,
      logicalDestination,
      params,
    });
    return;
  }

  if (!isNonEmptyString(params?.source)) {
    console.error("[analytics] Dropped cta_click: missing source", {
      destination: logicalDestination,
      params,
    });
    return;
  }

  if (!isValidButtonType(params?.button_type)) {
    console.error("[analytics] Dropped cta_click: invalid button_type", {
      destination: logicalDestination,
      params,
    });
    return;
  }

  if (!isNonEmptyString(params?.button_text)) {
    console.error("[analytics] Dropped cta_click: missing button_text", {
      destination: logicalDestination,
      params,
    });
    return;
  }


  trackEvent("cta_click", {
    destination: logicalDestination,
    ...params,
  });
};
