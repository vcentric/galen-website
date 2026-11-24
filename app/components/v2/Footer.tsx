"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import { isCollegePath } from "@/lib/audience";
import { findClosingCta } from "@/lib/closing";
import { CONTACT, LINKS, SITE } from "@/lib/site";
import StoreBadges from "./StoreBadges";
import CtaLink, { AppLink } from "./CtaLink";

type Col = { id: string; title: string; links: { label: string; href: string }[] };

const COLUMNS: Col[] = [
  {
    id: "students",
    title: "Students",
    links: [
      { label: "Features", href: "/features" },
      { label: "AI Tutor", href: "/features/ai-tutor" },
      { label: "Question Bank", href: "/features/question-bank" },
      { label: "Flashcards", href: "/features/flashcards" },
      { label: "Clinical Cases", href: "/features/clinical-cases" },
      { label: "For MBBS students", href: "/for/mbbs-students" },
      { label: "GalenAI vs ChatGPT", href: "/vs/chatgpt" },
      { label: "How to use", href: "/how-to-use/students" },
      { label: "Download", href: "https://app.galenai.io/download" },
    ],
  },
  {
    id: "learn",
    title: "Learn",
    links: [
      { label: "Free MBBS lessons", href: "/learn" },
      { label: "Anatomy", href: "/learn/anatomy" },
      { label: "Physiology", href: "/learn/physiology" },
      { label: "Biochemistry", href: "/learn/biochemistry" },
      { label: "Pathology", href: "/learn/pathology" },
      { label: "Microbiology", href: "/learn/microbiology" },
      { label: "Pharmacology", href: "/learn/pharmacology" },
    ],
  },
  {
    id: "exams",
    title: "Exams",
    links: [
      { label: "Exam guides", href: "/exams" },
      { label: "NEET PG guide", href: "/exams/neet-pg" },
      { label: "NEET PG MCQ practice", href: "/exams/neet-pg-mcq-practice" },
      { label: "FMGE guide", href: "/exams/fmge-syllabus-and-pattern" },
      { label: "For NEET PG", href: "/for/neet-pg" },
    ],
  },
  {
    id: "colleges",
    title: "Colleges",
    links: [
      { label: "For medical colleges", href: "/institutions" },
      { label: "For faculty", href: "/institutions/faculty" },
      { label: "For administration", href: "/institutions/administration" },
      { label: "GalenAI vs your LMS", href: "/institutions/vs-lms" },
      { label: "Faculty guides", href: "/how-to-use/faculty" },
      { label: "Book a demo", href: "/institutions/book-demo" },
      { label: "Faculty platform", href: `${LINKS.faculty}/?utm_source=website&utm_medium=footer_link&utm_campaign=galenweb` },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "Team", href: "/team" },
      { label: "Articles", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Think Like HouseMD", href: LINKS.house },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

/**
 * Site footer: dark on every page, so the end of the site is always clear. This is the main internal-link hub,
 * so every live hub page is linked from here (all links are in the page; on phones the groups fold).
 * It follows the audience like the navbar: the line, the action and the contact email change, and that
 * audience's links come first. Contact details come verbatim from lib/site.ts.
 */
export default function Footer() {
  const pathname = usePathname() ?? "/";
  const inst = isCollegePath(pathname);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  // When the page already ends in a dark closing section with its own button, the footer does not repeat it on phones.
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setClosing(!!findClosingCta()));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  if (pathname.startsWith("/keystatic")) return null;

  const own = inst ? "colleges" : "students";
  const columns = inst ? [COLUMNS[3], COLUMNS[0], COLUMNS[1], COLUMNS[2], COLUMNS[4]] : COLUMNS;
  const email = inst ? CONTACT.corporate : CONTACT.support;

  return (
    <footer className="v2 foot" data-tone="dark">
      <div className="wrap">
        <div className="foot-main">
        <div className="foot-top">
          <div>
            <Image src="/brand/lockup.svg" alt="GalenAI" width={127} height={28} />
            <p className="foot-line">{inst ? SITE.subTagline : `${SITE.studentLine} All in one app.`}</p>
          </div>
          <div className={closing ? "foot-act max-md:!hidden" : "foot-act"}>
            {inst ? (
              <>
                <CtaLink intent="demo" source="footer" className="!min-h-11 !px-5 !text-sm" />
                <CtaLink intent="faculty-live" source="footer" variant="ghost" className="!min-h-11 !px-5 !text-sm" />
              </>
            ) : (
              <StoreBadges tone="dark" source="footer_badge" />
            )}
          </div>
        </div>

        <nav aria-label="Site" className="foot-cols">
          {columns.map((col) => {
            const isOpen = open[col.id] ?? col.id === own;
            return (
              <div key={col.id} className="foot-col" data-open={isOpen ? "" : undefined}>
                <h2>
                  <button type="button" aria-expanded={isOpen} aria-controls={`foot-${col.id}`} onClick={() => setOpen((o) => ({ ...o, [col.id]: !isOpen }))}>
                    {col.title}
                    <span aria-hidden className="faq-plus" />
                  </button>
                </h2>
                <ul id={`foot-${col.id}`}>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.label === "Download" ? (
                        <AppLink intent="download" source="footer_link">
                          {l.label}
                        </AppLink>
                      ) : l.href.startsWith("http") ? (
                        <a href={l.href} rel="noopener">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>
        </div>

        <div className="foot-contact">
          <address>
            <a href={`mailto:${email}`}>{email}</a>
            {inst && <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>}
            <span>{CONTACT.address}</span>
          </address>
          <p className="foot-switch">
            <span>{inst ? "Are you a student?" : "From a medical college?"}</span>
            <Link href={inst ? "/" : "/institutions"}>
              {inst ? "GalenAI for students" : "GalenAI for colleges"} <span aria-hidden>→</span>
            </Link>
          </p>
        </div>

        <div className="foot-legal">
          <span>
            © {new Date().getFullYear()} {SITE.legalName}
          </span>
          <span className="foot-legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href={LINKS.linkedin} rel="noopener">
              <SiLinkedin className="h-4 w-4" aria-hidden /> LinkedIn
            </a>
            <a href={LINKS.instagram} rel="noopener">
              <SiInstagram className="h-4 w-4" aria-hidden /> Instagram
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
