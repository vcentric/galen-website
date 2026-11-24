"use client";

import Image from "next/image";
import { EXAM_PAGES_LIVE, LEARN_NAV_LIVE } from "@/lib/exams";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CtaLink from "./CtaLink";
import { LINKS } from "@/lib/site";
import { isCollegePath } from "@/lib/audience";
import { trackCTAClick } from "@/lib/analytics";

type NavLink = { label: string; href: string; menu?: { label: string; href: string; note?: string }[] };

/** Exams menu: the free guides first (what people search for), then the app pages for each exam. */
const EXAM_MENU = [
  ...(EXAM_PAGES_LIVE
    ? [
        { label: "NEET PG guide", href: "/exams/neet-pg", note: "Dates, pattern, eligibility, counselling" },
        { label: "NEET PG preparation", href: "/exams/neet-pg-preparation-guide", note: "Where to start and how to plan" },
        { label: "Free MCQ practice", href: "/exams/neet-pg-mcq-practice", note: "Questions with explanations" },
        { label: "FMGE guide", href: "/exams/fmge-syllabus-and-pattern", note: "Syllabus and pattern" },
      ]
    : []),
  { label: "GalenAI for NEET PG", href: "/for/neet-pg" },
  { label: "GalenAI for INI-CET", href: "/for/inicet" },
  { label: "GalenAI for FMGE", href: "/for/fmge" },
];

/** Five items at most: what it is, free lessons, exams, help, reading. Team and Contact live in the footer. */
const STUDENT_LINKS: NavLink[] = [
  { label: "Features", href: "/features" },
  ...(LEARN_NAV_LIVE ? [{ label: "Learn", href: "/learn" }] : []),
  { label: "Exams", href: EXAM_PAGES_LIVE ? "/exams" : "/for/neet-pg", menu: EXAM_MENU },
  { label: "How to use", href: "/how-to-use" },
  { label: "Articles", href: "/blog" },
];

const INSTITUTION_LINKS: NavLink[] = [
  { label: "Faculty", href: "/institutions/faculty" },
  { label: "Administration", href: "/institutions/administration" },
  { label: "vs LMS", href: "/institutions/vs-lms" },
  { label: "How to use", href: "/how-to-use/faculty" },
  { label: "Team", href: "/team" },
];

const isActive = (pathname: string, l: NavLink) =>
  pathname === l.href ||
  (l.href !== "/" && pathname.startsWith(`${l.href}/`)) ||
  !!l.menu?.some((m) => pathname === m.href) ||
  (l.label === "Exams" && pathname.startsWith("/exams"));

/**
 * Students / Colleges switch. Plain links (prefetched, instant client navigation),
 * styled as a segmented control whose thumb slides between the two audiences.
 */
function AudienceToggle({ inst }: { inst: boolean }) {
  return (
    <nav aria-label="Choose audience" className="nav-aud" data-side={inst ? "colleges" : "students"}>
      <span aria-hidden className="nav-aud-thumb" />
      <Link href="/" aria-current={!inst ? "page" : undefined}>
        Students
      </Link>
      <Link href="/institutions" aria-current={inst ? "page" : undefined}>
        Colleges
      </Link>
    </nav>
  );
}

const Chevron = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className="nav-chev">
    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NewBadge = () => (
  <span className="badge-shimmer rounded px-1.5 py-[4px] text-[7px] font-bold uppercase leading-none tracking-wide text-white">New</span>
);

/**
 * Site navigation: a floating bar. Small client island (pathname, phone menu, scroll shadow),
 * no animation library. Institution nav on every college path; student nav everywhere else.
 */
export default function Navbar() {
  const pathname = usePathname() ?? "/";
  // The phone menu remembers the page it was opened on, so it closes by itself on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  // "top": transparent, part of the hero. "hidden": scrolled away. "pinned": slid back in on scroll up.
  const [state, setState] = useState<"top" | "hidden" | "pinned">("top");
  // Read from the page: is the hero under the bar dark, and what is the page's own background.
  const [page, setPage] = useState<{ dark: boolean; bg: string }>({ dark: false, bg: "" });
  const open = openOn === pathname;
  const inst = isCollegePath(pathname);
  const links = inst ? INSTITUTION_LINKS : STUDENT_LINKS;

  useEffect(() => {
    // What sits under the bar is only the hero when the page is at the top, so read it there
    // (a reload can restore the page part-way down) and again after every navigation.
    const readPage = () => {
      if (window.scrollY > 8) return;
      const under = document.elementsFromPoint(window.innerWidth / 2, 40).find((el) => !el.closest(".nav"));
      const root = document.querySelector<HTMLElement>(".v2:not(.nav)");
      const next = { dark: !!under?.closest(".tone-dark"), bg: root ? getComputedStyle(root).backgroundColor : "" };
      setPage((p) => (p.dark === next.dark && p.bg === next.bg ? p : next));
    };
    // Distance travelled in the current direction. Trackpads scroll a pixel or two per event,
    // so the direction is judged on the running total, never on a single event.
    let last = window.scrollY;
    let run = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - last;
      last = y;
      run = d > 0 === run > 0 ? run + d : d;
      if (y <= 8) {
        setState("top");
        readPage();
      } else if (y > 72 && run > 6) setState("hidden");
      else if (run < -6) setState("pinned");
      // Past the hero's top edge the bar is never left transparent over content.
      else if (y > 72) setState((s) => (s === "top" ? "hidden" : s));
    };
    const id = requestAnimationFrame(() => {
      // Loaded or restored part-way down the page: start out of the way, not transparent over content.
      if (window.scrollY > 72) setState("hidden");
      else onScroll();
      readPage();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  if (pathname.startsWith("/keystatic")) return null;

  const houseClick = () => trackCTAClick("house_md", { source: "nav", button_type: "link", button_text: "Think Like HouseMD" });

  return (
    <header
      className="v2 nav"
      data-state={open ? "pinned" : state}
      data-ink={page.dark && state === "top" && !open ? "light" : undefined}
      style={page.bg ? ({ "--nav-bg": page.bg } as React.CSSProperties) : undefined}
    >
      <nav className="wrap nav-bar" aria-label="Main">
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
          <Link href={inst ? "/institutions" : "/"} aria-label="GalenAI home" className="shrink-0">
            <Image src="/brand/lockup.svg" alt="GalenAI" width={127} height={28} priority className="nav-logo h-auto w-[98px] sm:w-[116px]" />
          </Link>
          <AudienceToggle inst={inst} />
        </div>

        <ul className="nav-links">
          {links.map((l) => {
            const guides = l.menu?.filter((m) => m.note) ?? [];
            const rest = l.menu?.filter((m) => !m.note) ?? [];
            return (
              <li key={l.href} className={l.menu ? "group relative" : undefined}>
                <Link
                  href={l.href}
                  aria-current={pathname === l.href ? "page" : undefined}
                  aria-haspopup={l.menu ? "true" : undefined}
                  data-active={isActive(pathname, l) ? "" : undefined}
                  className="nav-link"
                >
                  {l.label}
                  {l.menu && <Chevron />}
                </Link>
                {/* Opens on hover and on keyboard focus. Plain links, so crawlers and screen readers see every item. */}
                {l.menu && (
                  <div className="nav-menu" data-cols={guides.length ? 2 : 1}>
                    {guides.length > 0 && (
                      <div>
                        <p className="nav-menu-title">Free guides</p>
                        <ul>
                          {guides.map((m) => (
                            <li key={m.href}>
                              <Link href={m.href} className="nav-menu-item" data-active={pathname === m.href ? "" : undefined}>
                                <span className="block text-[0.95rem] font-bold leading-tight">{m.label}</span>
                                <span className="mt-1 block text-[0.8rem] font-medium leading-snug text-[#2e2e2e]/65">{m.note}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <p className="nav-menu-title">In the app</p>
                      <ul>
                        {rest.map((m) => (
                          <li key={m.href}>
                            <Link href={m.href} className="nav-menu-item" data-active={pathname === m.href ? "" : undefined}>
                              <span className="flex items-center justify-between gap-3 text-[0.95rem] font-bold leading-tight">
                                {m.label}
                                <span aria-hidden className="nav-menu-arrow">
                                  →
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          {/* Think Like HouseMD (house.galenai.io): top-right, left of the main button. */}
          <a href={LINKS.house} rel="noopener" onClick={houseClick} className="nav-house">
            <span className="hidden xl:inline">Think Like HouseMD</span>
            <span className="xl:hidden">HouseMD</span>
            <NewBadge />
          </a>
          <CtaLink
            intent={inst ? "demo" : "download"}
            source="nav"
            label={inst ? "Book a demo" : "Get the app"}
            className="!hidden !min-h-10 !px-5 !text-sm sm:!inline-flex lg:ml-2"
          />
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span aria-hidden />
            <span aria-hidden />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="nav-sheet">
          <div className="wrap">
          <CtaLink intent={inst ? "demo" : "download"} source="nav_menu" label={inst ? "Book a demo" : "Get the app"} className="mb-2 w-full sm:!hidden" />
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="nav-sheet-link" data-active={isActive(pathname, l) ? "" : undefined}>
                  {l.label}
                  <span aria-hidden>→</span>
                </Link>
                {l.menu && (
                  <ul className="nav-sheet-sub">
                    {l.menu.map((m) => (
                      <li key={m.href}>
                        <Link href={m.href}>{m.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {/* The college links already include Team. */}
            {!inst && (
              <li>
                <Link href="/team" className="nav-sheet-link">
                  Team
                  <span aria-hidden>→</span>
                </Link>
              </li>
            )}
            <li>
              <a href={LINKS.house} rel="noopener" onClick={houseClick} className="nav-sheet-link">
                <span className="flex items-center gap-2">
                  Think Like HouseMD <NewBadge />
                </span>
                <span aria-hidden>→</span>
              </a>
            </li>
          </ul>
          </div>
        </div>
      )}
    </header>
  );
}
