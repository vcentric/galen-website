import { SiAppstore, SiGoogleplay } from "react-icons/si";
import { LINKS } from "@/lib/site";

/**
 * Plain store links (server-rendered, crawlable). Attribution-aware links are
 * built on /download, which is where every in-page "download" CTA goes.
 * TODO(varun): swap for the official Apple and Google badge artwork if wanted.
 */
export default function StoreBadges({ tone = "light" }: { tone?: "light" | "dark" }) {
  const cls =
    tone === "dark"
      ? "border-[#fff0e4]/40 text-[#fff0e4] hover:border-[#fff0e4]"
      : "border-[#2e2e2e]/25 text-[#2e2e2e] hover:border-[#2e2e2e]";
  return (
    <div className="flex flex-wrap gap-3">
      <a href={LINKS.appStore} rel="noopener" className={`inline-flex items-center gap-2.5 rounded-xl border-2 px-4 py-2.5 ${cls}`}>
        <SiAppstore className="h-5 w-5" aria-hidden />
        <span className="text-left leading-tight">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider opacity-70">Download on the</span>
          <span className="block font-bold">App Store</span>
        </span>
      </a>
      <a href={LINKS.playStore} rel="noopener" className={`inline-flex items-center gap-2.5 rounded-xl border-2 px-4 py-2.5 ${cls}`}>
        <SiGoogleplay className="h-5 w-5" aria-hidden />
        <span className="text-left leading-tight">
          <span className="block text-[0.65rem] font-semibold uppercase tracking-wider opacity-70">Get it on</span>
          <span className="block font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
