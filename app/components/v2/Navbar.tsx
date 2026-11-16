"use client";

import Image from "next/image";
import { EXAM_PAGES_LIVE, LEARN_NAV_LIVE } from "@/lib/exams";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CtaLink from "./CtaLink";
import { LINKS } from "@/lib/site";

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
  { label: "Exams", href: EXAM_PAGES_LIVE ? "/exams/neet-pg" : "/for/neet-pg", menu: EXAM_MENU },
  { label: "How to use", href: "/how-to-use" },
  { label: "Articles", href: "/blog" },
];

const INSTITUTION_LINKS: NavLink[] = [
  { label: "Faculty", href: "/institutions/faculty" },
  { label: "Administration", href: "/institutions/administration" },
  { label: "vs LMS", href: "/institutions/vs-lms" },
  { label: "How to use", href: "/how-to-use/faculty" },
];

const isActive = (pathname: string, l: NavLink) =>
  pathname === l.href ||
  (l.href !== "/" && pathname.startsWith(`${l.href}/`)) ||
  !!l.menu?.some((m) => pathname === m.href) ||
  (l.label === "Exams" && pathname.startsWith("/exams"));

/** Pages that belong to the college side of the site (toggle shows "Colleges"). */
const isCollegePath = (p: string) =>
  p.startsWith("/institutions") || p.startsWith("/how-to-use/faculty") || p.startsWith("/how-to-use/administration");

/**
 * Students / Colleges switch. Plain links (prefetched, instant client navigation),
 * styled as a segmented control so the two audiences are one tap apart everywhere.
 */
function AudienceToggle({ inst, className = "" }: { inst: boolean; className?: string }) {
  const item = (active: boolean) =>
    `rounded-full px-3 py-1.5 sm:px-4 transition-colors ${active ? "bg-[#2e2e2e] text-[#fff0e4]" : "text-[#2e2e2e]/70 hover:text-[#2e2e2e]"}`;
  return (
    <nav aria-label="Choose audience" className={`flex shrink-0 items-center rounded-full border border-[#2e2e2e]/15 bg-white/70 p-1 text-[13px] font-bold sm:text-sm ${className}`}>
      <Link href="/" aria-current={!inst ? "page" : undefined} className={item(!inst)}>
        Students
      </Link>
      <Link href="/institutions" aria-current={inst ? "page" : undefined} className={item(inst)}>
        Colleges
      </Link>
    </nav>
  );
}

/**
 * Site navigation. Small client island (pathname + phone menu), no animation library.
 * Institution nav on every /institutions path; student nav everywhere else.
 */
export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const inst = isCollegePath(pathname);
  const links = inst ? INSTITUTION_LINKS : STUDENT_LINKS;

  useEffect(() => setOpen(false), [pathname]);
  if (pathname.startsWith("/keystatic")) return null;

  return (
    <header className="v2 fixed inset-x-0 top-0 z-[120] !bg-[#fff0e4]/90 backdrop-blur border-b border-black/5">
      {/* Top bar: Think Like HouseMD (house.galenai.io). 32px; page offsets in v2 pages account for it. */}
      <a
        href={LINKS.house}
        rel="noopener"
        className="flex h-8 items-center justify-center gap-2 bg-[#2e2e2e] px-4 text-[12.5px] font-semibold text-[#fff0e4] hover:bg-[#3a3a3a]"
      >
        <span className="rounded-full bg-[#eb602d] px-2 py-px text-[10px] font-bold uppercase tracking-wider text-white">Play</span>
        <span className="truncate">
          Think like <span className="text-[#ff9466]">HouseMD</span>: one patient, three clues, can you diagnose?
        </span>
        <span aria-hidden>→</span>
      </a>
      <nav className="wrap flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link href={inst ? "/institutions" : "/"} aria-label="GalenAI home" className="shrink-0">
          <Image src="/brand/lockup.svg" alt="GalenAI" width={127} height={28} priority className="h-auto w-[104px] sm:w-[127px]" />
        </Link>

        <ul className="hidden lg:flex items-center gap-6 xl:gap-7 text-[0.95rem] font-semibold">
          {links.map((l) => (
            <li key={l.href} className={l.menu ? "group relative" : undefined}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                aria-haspopup={l.menu ? "true" : undefined}
                className={`inline-flex items-center gap-1 py-5 hover:text-[#c94d20] ${isActive(pathname, l) ? "text-[#c94d20]" : ""}`}
              >
                {l.label}
                {l.menu && (
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden className="mt-px transition-transform group-hover:rotate-180 group-focus-within:rotate-180">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>
              {/* Opens on hover and on keyboard focus. Plain links, so crawlers and screen readers see every item. */}
              {l.menu && (
                <ul className="invisible absolute left-1/2 top-full z-10 w-[19rem] -translate-x-1/2 rounded-[18px] border border-black/10 bg-white p-2 opacity-0 shadow-[0_24px_60px_rgba(46,46,46,0.16)] transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {l.menu.map((m) => (
                    <li key={m.href}>
                      <Link href={m.href} className={`block rounded-xl px-3.5 py-2.5 hover:bg-[#fff0e4] ${pathname === m.href ? "text-[#c94d20]" : ""}`}>
                        <span className="block text-[0.95rem] font-bold leading-tight">{m.label}</span>
                        {m.note && <span className="mt-0.5 block text-[0.8rem] font-medium leading-snug text-[#2e2e2e]/65">{m.note}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <AudienceToggle inst={inst} />
          <CtaLink
            intent={inst ? "demo" : "download"}
            source="nav"
            label={inst ? "Book a demo" : "Get the app"}
            className="!hidden !min-h-10 !px-4 !text-sm sm:!inline-flex"
          />
          <button
            type="button"
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border-2 border-[#2e2e2e]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-black/5 bg-[#fff0e4]">
          <div className="wrap pt-4 sm:hidden">
            <CtaLink
              intent={inst ? "demo" : "download"}
              source="nav_menu"
              label={inst ? "Book a demo" : "Get the app"}
              className="w-full"
            />
          </div>
          <ul className="wrap py-4 flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="block py-3 h3">
                  {l.label}
                </Link>
                {l.menu && (
                  <ul className="mb-2 ml-1 border-l-2 border-[#eb602d]/40 pl-4">
                    {l.menu.map((m) => (
                      <li key={m.href}>
                        <Link href={m.href} className="block py-2 text-[1rem] font-semibold text-[#2e2e2e]/85">
                          {m.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link href="/team" className="block py-3 h3">
                Team
              </Link>
            </li>
            <li>
              <a href={LINKS.house} rel="noopener" className="block py-3 h3">
                Think Like HouseMD
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
