declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  console.log("📊 GA Event Tracked:", eventName, params || "");
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};

export const trackCTAClick = (destination: "app_store" | "play_store" | "web_app" | "final_cta") => {
  console.log("🚀 GA CTA Click Tracked:", destination);
  if (typeof window === "undefined") return; // SSR guard
  window.gtag?.("event", "cta_click", { destination });
};

