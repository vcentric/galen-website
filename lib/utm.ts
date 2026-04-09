"use client";

/**
 * Utility to handle UTM parameter preservation across the website.
 */

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

/**
 * Gets current UTM parameters from the URL.
 */
export const getUtmParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  
  const searchParams = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  
  UTM_PARAMS.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      utms[param] = value;
    }
  });
  
  return utms;
};

/**
 * Appends current UTM parameters to a given URL.
 */
export const decorateUrl = (url: string): string => {
  if (typeof window === "undefined") return url;
  if (!url) return url;
  
  // Only decorate relative links or links to our own domains/stores
  const isExternal = url.startsWith("http") && !url.includes("galenai.io") && !url.includes("apple.com") && !url.includes("google.com") && !url.includes("wa.me");
  
  // If it's a hash link on the same page, don't decorate
  if (url.startsWith("#")) return url;

  try {
    const utms = getUtmParams();
    if (Object.keys(utms).length === 0) return url;
    
    // Create a URL object to easily manipulate params
    // If it's a relative URL, we need a base to parse it
    const baseUrl = url.startsWith("http") ? url : `https://galenai.io${url.startsWith("/") ? "" : "/"}${url}`;
    const urlObj = new URL(baseUrl);
    
    Object.entries(utms).forEach(([key, value]) => {
      // Don't overwrite existing params on the target URL
      if (!urlObj.searchParams.has(key)) {
        urlObj.searchParams.set(key, value);
      }
    });
    
    // Return original relative path if it was relative
    if (!url.startsWith("http")) {
      return urlObj.pathname + urlObj.search + urlObj.hash;
    }
    
    return urlObj.toString();
  } catch (e) {
    console.error("Failed to decorate URL:", e);
    return url;
  }
};
