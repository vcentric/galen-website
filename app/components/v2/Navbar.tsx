"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CtaLink from "./CtaLink";

const STUDENT_LINKS = [
  { label: "Features", href: "/features" },
  { label: "For NEET PG", href: "/for/neet-pg" },
  { label: "How to use", href: "/how-to-use" },
  { label: "Articles", href: "/blog" },
  { label: "For colleges", href: "/institutions" },
];

const INSTITUTION_LINKS = [
  { label: "Faculty", href: "/institutions/faculty" },
  { label: "Administration", href: "/institutions/administration" },
  { label: "vs LMS", href: "/institutions/vs-lms" },
  { label: "How to use", href: "/how-to-use/faculty" },
  { label: "For students", href: "/" },
];

/**
 * Site navigation. Small client island (pathname + phone menu), no animation library.
 * Institution nav on every /institutions path; student nav everywhere else.
 */
export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const inst = pathname.startsWith("/institutions");
  const links = inst ? INSTITUTION_LINKS : STUDENT_LINKS;

  useEffect(() => setOpen(false), [pathname]);
  if (pathname.startsWith("/keystatic")) return null;

  return (
    <header className="v2 fixed inset-x-0 top-0 z-[120] !bg-[#fff0e4]/90 backdrop-blur border-b border-black/5">
      <nav className="wrap flex h-16 items-center justify-between gap-4" aria-label="Main">
        <Link href={inst ? "/institutions" : "/"} aria-label="GalenAI home" className="shrink-0">
          <Image src="/brand/lockup.svg" alt="GalenAI" width={127} height={28} priority />
        </Link>

        <ul className="hidden lg:flex items-center gap-7 text-[0.95rem] font-semibold">
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
          <CtaLink
            intent={inst ? "demo" : "download"}
            source="nav"
            label={inst ? "Book a demo" : "Get the app"}
            className="!min-h-10 !px-4 !text-sm"
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
