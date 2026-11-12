"use client";

import { useEffect, useState } from "react";
import { appStoreUrl, playStoreUrl } from "@/lib/cta";
import { LINKS } from "@/lib/site";
import { getUtmParams } from "@/lib/utm";
import { trackCTAClick } from "@/lib/analytics";

/**
 * Sends phones to the right store with attribution the store can read
 * (Play: `referrer`, App Store: `ct`). Desktop stays on the page, or, when
 * `desktopFallback="web"` (used by /qr), goes to the web app.
 * Renders a small "Opening the store" notice only while redirecting.
 */
export default function StoreRedirect({
  source,
  desktopFallback = "stay",
}: {
  source: string;
  desktopFallback?: "stay" | "web";
}) {
  const [target, setTarget] = useState<string | null>(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const utm = getUtmParams();
    let dest: string | null = null;
    let logical = "";
    if (/android/i.test(ua)) {
      dest = playStoreUrl(utm);
      logical = "play_store";
    } else if (/iphone|ipad|ipod/i.test(ua)) {
      dest = appStoreUrl(utm);
      logical = "app_store";
    } else if (desktopFallback === "web") {
      const u = new URL(LINKS.app);
      Object.entries(utm).forEach(([k, v]) => u.searchParams.set(k, v));
      dest = u.toString();
      logical = "web_app";
    }
    if (!dest) return;
    setTarget(dest);
    trackCTAClick(logical, { source, button_type: "link", button_text: "auto_redirect" });
    window.location.replace(dest);
  }, [source, desktopFallback]);

  if (!target) return null;
  return (
    <div role="status" className="fixed inset-x-0 top-24 z-[110] bg-[#2e2e2e] px-4 py-3 text-center text-sm font-semibold text-[#fff0e4]">
      Opening the store…{" "}
      <a href={target} className="underline">
        Tap here if nothing happens
      </a>
    </div>
  );
}
