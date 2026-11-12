"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CtaLink from "./CtaLink";
import { LINKS } from "@/lib/site";

const STUDENT_LINKS = [
  { label: "Features", href: "/features" },
  { label: "For NEET PG", href: "/for/neet-pg" },
  { label: "How to use", href: "/how-to-use" },
  { label: "Articles", href: "/blog" },
  { label: "Team", href: "/team" },
];

const INSTITUTION_LINKS = [
  { label: "Faculty", href: "/institutions/faculty" },
  { label: "Administration", href: "/institutions/administration" },
  { label: "vs LMS", href: "/institutions/vs-lms" },
  { label: "How to use", href: "/how-to-use/faculty" },
  { label: "Team", href: "/team" },
];

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
            <li key={l.href}>
              <Link
                href={l.href}
                className={`hover:text-[#c94d20] ${pathname === l.href ? "text-[#c94d20]" : ""}`}
              >
                {l.label}
              </Link>
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
        <div id="mobile-menu" className="lg:hidden border-t border-black/5 bg-[#fff0e4]">
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
              </li>
            ))}
            <li>
              <a href="https://house.galenai.io" rel="noopener" className="block py-3 h3">
                Think Like HouseMD
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
