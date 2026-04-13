import { getUtmParams } from "./utm";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  const utms = getUtmParams();
  const eventParams = { ...utms, ...params };

  console.log("📊 GA Event Tracked:", eventName, eventParams);

  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
};

export const getDestinationFromHref = (href: string): string => {
  if (!href) return "unknown";
  if (href.startsWith("#")) return href.substring(1);
  if (href === "/qr") return "qr";
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
  [key: string]: any;
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

  console.log("🚀 GA CTA Click Tracked:", logicalDestination, params);

  trackEvent("cta_click", {
    destination: logicalDestination,
    ...params,
  });
};
