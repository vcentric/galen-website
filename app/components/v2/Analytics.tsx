"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";
import { ensureGtag, isLiveHost, pageContext, trackEvent } from "@/lib/analytics";
import { IDS } from "@/lib/site";

const noSubscribe = () => () => {};

/**
 * Website analytics (GA4, website-only property). Loads the tag on the live host only, and sends the
 * page-level events of the tracking plan:
 *   content_view      once per page, with what kind of page it is (section, type, id, group)
 *   content_progress  at 25, 50 and 75 per cent of an article, lesson or guide
 *   content_read      once, when the reader reaches the end of it
 *   faq_open, contact_click  for server-rendered FAQ items and contact links, anywhere on the site
 * Every event and field is described in docs/v2/ANALYTICS.md. Keep that file in step with the code.
 * GA's own page_view is left automatic and untouched.
 */
export default function Analytics() {
  const pathname = usePathname() ?? "/";
  const live = useSyncExternalStore(noSubscribe, isLiveHost, () => false);

  useEffect(() => {
    if (live) ensureGtag(IDS.ga4);
  }, [live]);

  // Site-wide interactions that live in server-rendered markup, caught once here.
  useEffect(() => {
    // Which FAQ questions people open.
    const onToggle = (e: Event) => {
      const d = e.target;
      if (d instanceof HTMLDetailsElement && d.open && d.matches("details.faq-item")) {
        trackEvent("faq_open", { question_text: (d.querySelector("summary")?.textContent ?? "").trim().slice(0, 100) });
      }
    };
    // Email, phone and social links. WhatsApp buttons already report cta_click.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href") ?? "";
      const method = href.startsWith("mailto:") ? "email" : href.startsWith("tel:") ? "phone" : href.includes("linkedin.com") ? "linkedin" : href.includes("instagram.com") ? "instagram" : "";
      if (a && method) trackEvent("contact_click", { method, where: a.closest("footer") ? "footer" : "page" });
    };
    document.addEventListener("toggle", onToggle, true);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const ctx = pageContext(pathname);
    // An article knows its category, so it reports its own view (BlogPostClient).
    if (ctx.content_type !== "article") trackEvent("content_view", ctx);

    if (!["lesson", "article", "exam_guide", "how_to_guide"].includes(ctx.content_type)) return;
    // Progress through the text: 25, 50 and 75 per cent, then content_read at the end. Each is sent once.
    const started = Date.now();
    const sent = new Set<number>();
    const base = { content_type: ctx.content_type, content_id: ctx.content_id, content_group: ctx.content_group };
    const check = () => {
      const body = document.querySelector("main .blog-content, main article.lesson-body, main .htu");
      if (!body) return;
      const r = body.getBoundingClientRect();
      if (r.height < 200) return;
      const seen = (window.innerHeight - r.top) / r.height;
      for (const pct of [25, 50, 75]) {
        if (seen * 100 >= pct && !sent.has(pct)) {
          sent.add(pct);
          trackEvent("content_progress", { ...base, percent: pct });
        }
      }
      if (r.bottom <= window.innerHeight + 40 && !sent.has(100)) {
        sent.add(100);
        window.removeEventListener("scroll", check);
        trackEvent("content_read", { ...base, seconds: Math.round((Date.now() - started) / 1000) });
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);

  return live ? <Script src={`https://www.googletagmanager.com/gtag/js?id=${IDS.ga4}`} strategy="afterInteractive" /> : null;
}

/** For the not-found page: reports the address that was tried and where the visitor came from. */
export function NotFoundPing() {
  useEffect(() => {
    trackEvent("page_not_found", { path: window.location.pathname.slice(0, 200), referrer: document.referrer.slice(0, 200) });
  }, []);
  return null;
}
