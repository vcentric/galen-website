"use client";

import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { LINKS } from "@/lib/site";
import { appStoreUrl, playStoreUrl, websiteUtm } from "@/lib/cta";
import { getUtmParams } from "@/lib/utm";
import { useHydrated } from "@/lib/useHydrated";
import { trackCTAClick } from "@/lib/analytics";

/**
 * Direct store links. The website UTM goes in the form each store reads (Play `referrer`, App Store `ct`);
 * a visitor who arrived with their own UTM keeps theirs instead.
 * TODO(varun): swap for the official Apple and Google badge artwork if wanted.
 */
export default function StoreBadges({ tone = "light", source }: { tone?: "light" | "dark"; source: string }) {
  const own = websiteUtm(source);
  const visitor = useHydrated() ? getUtmParams() : {};
  const utm = Object.keys(visitor).length ? visitor : own;
  const urls = { ios: appStoreUrl(utm), android: playStoreUrl(utm) };
  const cls =
    tone === "dark"
      ? "border-[#fff0e4]/40 text-[#fff0e4] hover:border-[#fff0e4]"
      : "border-[#2e2e2e]/25 text-[#2e2e2e] hover:border-[#2e2e2e]";
  const track = (store: string, text: string) => () =>
    trackCTAClick(store, { source, button_type: "link", button_text: text, intent: "download" });
  return (
    <div className="flex flex-wrap gap-3">
      <a href={urls.ios} rel="noopener" onClick={track("app_store", "App Store")} className={`inline-flex items-center gap-2.5 rounded-xl border-2 px-4 py-2.5 ${cls}`}>
        <SiAppstore className="h-5 w-5" aria-hidden />
        <span className="text-left leading-tight">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider opacity-70">Download on the</span>
          <span className="block font-bold">App Store</span>
        </span>
      </a>
      <a href={urls.android} rel="noopener" onClick={track("play_store", "Google Play")} className={`inline-flex items-center gap-2.5 rounded-xl border-2 px-4 py-2.5 ${cls}`}>
        <SiGoogleplay className="h-5 w-5" aria-hidden />
        <span className="text-left leading-tight">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider opacity-70">Get it on</span>
          <span className="block font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
