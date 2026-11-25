"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * A thin line across the top of the screen while the next page loads, so a click is never left
 * unanswered on a slow connection. It starts when an internal link is clicked and finishes when
 * the address has changed. A page that arrives almost at once never shows it.
 * It also replays the fade-in of the page wrapper (.page-in) on every page change after the first.
 * The bar is driven straight through its data-state attribute, so nothing re-renders.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const shown = useRef(pathname); // the page currently on screen

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    const start = () => {
      const el = bar.current;
      if (!el) return;
      clear();
      // From here on, new pages fade in (see .page-in). The first page of a visit never does.
      document.documentElement.dataset.nav = "";
      el.dataset.state = "idle";
      // Wait a moment: a page that is already loaded should not flash a bar.
      timers.current.push(window.setTimeout(() => (el.dataset.state = "loading"), 140));
      // Never leave it stuck if the page change is cancelled.
      timers.current.push(window.setTimeout(() => (el.dataset.state = "idle"), 12000));
    };
    // Heard on the way down (capture), before the link's own handler takes over the click.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page, or a jump within it
      start();
    };
    document.addEventListener("click", onClick, true);
    // Back and forward. A jump within the page also arrives here, and is not a page change.
    const onPop = () => {
      if (window.location.pathname !== shown.current) start();
    };
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      clear();
    };
  }, []);

  // The new page is in place but not painted yet: replay its fade-in, so it never shows at full strength first.
  useLayoutEffect(() => {
    if (shown.current === pathname) return;
    shown.current = pathname;
    const page = document.querySelector<HTMLElement>(".page-in");
    if (!page || !("nav" in document.documentElement.dataset)) return;
    page.style.animation = "none";
    void page.offsetWidth;
    page.style.animation = "";
  }, [pathname]);

  // The address has changed: the new page is here.
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    clear();
    if (el.dataset.state !== "loading") {
      el.dataset.state = "idle";
      return;
    }
    el.dataset.state = "done";
    timers.current.push(window.setTimeout(() => (el.dataset.state = "idle"), 350));
  }, [pathname]);

  return <div ref={bar} className="route-progress" data-state="idle" aria-hidden />;
}
