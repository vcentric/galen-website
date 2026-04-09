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

export const trackCTAClick = (destination: string, extraParams?: Record<string, any>) => {
  console.log("🚀 GA CTA Click Tracked:", destination);
  
  trackEvent("cta_click", { 
    destination,
    ...extraParams 
  });
};

