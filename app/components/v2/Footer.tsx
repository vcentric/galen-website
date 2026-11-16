import Image from "next/image";
import Link from "next/link";
import { SiInstagram, SiLinkedin } from "react-icons/si";
import { CONTACT, LINKS, SITE } from "@/lib/site";
import StoreBadges from "./StoreBadges";
import { AppLink } from "./CtaLink";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
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
    title: "Learn and exams",
    links: [
      { label: "Free MBBS lessons", href: "/learn" },
      { label: "Anatomy", href: "/learn/anatomy" },
      { label: "Physiology", href: "/learn/physiology" },
      { label: "Biochemistry", href: "/learn/biochemistry" },
      { label: "Pathology", href: "/learn/pathology" },
      { label: "NEET PG guide", href: "/exams/neet-pg" },
      { label: "NEET PG MCQ practice", href: "/exams/neet-pg-mcq-practice" },
      { label: "FMGE guide", href: "/exams/fmge-syllabus-and-pattern" },
      { label: "For NEET PG", href: "/for/neet-pg" },
    ],
  },
  {
    title: "Colleges",
    links: [
      { label: "For medical colleges", href: "/institutions" },
      { label: "For faculty", href: "/institutions/faculty" },
      { label: "For administration", href: "/institutions/administration" },
      { label: "GalenAI vs your LMS", href: "/institutions/vs-lms" },
      { label: "Book a demo", href: "/institutions/book-demo" },
      { label: "Faculty platform", href: `${LINKS.faculty}/?utm_source=website&utm_medium=footer_link&utm_campaign=galenweb` },
    ],
  },
  {
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
 * Site footer. Server component. This is the main internal-link hub, so every live
 * hub page should be linked from here. Contact block comes verbatim from lib/site.ts.
 */
export default function Footer() {
  return (
    <footer id="contact" className="v2 tone-dark">
      <div className="wrap py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_2.6fr]">
          <div>
            <Image src="/brand/lockup.svg" alt="GalenAI" width={154} height={34} />
            <p className="h2 mt-8 max-w-sm">
              {SITE.tagline.replace("colleges.", "")}
              <span className="acc">colleges.</span>
            </p>
            <p className="mt-3 font-semibold" style={{ color: "var(--body)" }}>
              {SITE.subTagline}
            </p>
            <div className="mt-8">
              <StoreBadges tone="dark" source="footer_badge" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="kick text-[#eb602d]">{col.title}</h2>
                <ul className="mt-5 space-y-3 text-[0.95rem] font-medium">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.label === "Download" ? (
                        <AppLink intent="download" source="footer_link" className="hover:text-[#eb602d]">
                          {l.label}
                        </AppLink>
                      ) : l.href.startsWith("http") ? (
                        <a href={l.href} rel="noopener" className="hover:text-[#eb602d]">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="hover:text-[#eb602d]">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between" style={{ borderColor: "var(--rule)", color: "var(--body)" }}>
          <address className="not-italic">
            <a href={`mailto:${CONTACT.corporate}`} className="hover:text-[#eb602d]">{CONTACT.corporate}</a>
            {" · "}
            <a href={CONTACT.phoneHref} className="hover:text-[#eb602d]">{CONTACT.phone}</a>
            {" · "}
            {CONTACT.address}
          </address>
          <div className="flex items-center gap-4">
            <a href={LINKS.linkedin} rel="noopener" aria-label="GalenAI on LinkedIn" className="hover:text-[#eb602d]">
              <SiLinkedin className="h-5 w-5" />
            </a>
            <a href={LINKS.instagram} rel="noopener" aria-label="GalenAI on Instagram" className="hover:text-[#eb602d]">
              <SiInstagram className="h-5 w-5" />
            </a>
            <span>© {new Date().getFullYear()} {SITE.legalName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
