import { CONTACT, LINKS } from "@/lib/site";
import CtaLink from "../CtaLink";
import LeadForm from "../LeadForm";
import { Headline } from "../ui";
import type { SectionProps } from "./index";

/** Bespoke sections for /institutions/book-demo (registered in sections/index.ts byPage). */

/** From the page's own answer line and the form's confirmation message. */
const NEXT = [
  ["Tell us about your college", "A few details, so the demo fits your setup."],
  ["We get back within two working days", "To agree a time that suits your team."],
  ["See it live", "The student app, the faculty AI workspace and the CBME reports, using your own timetable and topics where possible."],
];

/**
 * The form and everything a visitor needs around it, in one dark panel: what happens next on the left
 * (with the direct contact routes for anyone who would rather not fill a form), the form on the right.
 */
export function DemoFormSection({ section }: SectionProps) {
  return (
    <div className="demo tone-dark">
      <div className="demo-side">
        <Headline as="h2" text={section.heading} />
        <ol className="demo-next">
          {NEXT.map(([t, b], i) => (
            <li key={t}>
              <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
              <p className="demo-next-t">{t}</p>
              <p className="demo-next-b">{b}</p>
            </li>
          ))}
        </ol>
        <address className="demo-direct">
          <p className="vs-label">Or reach us directly</p>
          {LINKS.booking && (
            <a href={LINKS.booking} target="_blank" rel="noopener" data-cta="booking">
              Book a 30-minute call <span aria-hidden>↗</span>
            </a>
          )}
          <a href={`mailto:${CONTACT.corporate}`}>{CONTACT.corporate}</a>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          <a href={LINKS.linkedin} rel="noopener">
            LinkedIn: galenai-india <span aria-hidden>↗</span>
          </a>
          <span>{CONTACT.address}</span>
        </address>
      </div>
      <LeadForm source="book_demo" />
    </div>
  );
}

const WHY = [
  ["Students are already learning with AI.", "Give them a tutor that answers from your approved content, not an unverified general tool."],
  ["Faculty need support.", "Lessons, slides, assessments and SGD cases drafted from their own references, in minutes."],
  ["A connected classroom.", "What faculty publish reaches students on the college calendar, with results by competency."],
];

export function DemoWhySection({ section }: SectionProps) {
  return (
    <>
      <Headline as="h2" text={section.heading} />
      <ol className="demo-why">
        {WHY.map(([t, b], i) => (
          <li key={t}>
            <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="h3 mt-4 !text-[1.35rem]">{t}</h3>
            <p className="mt-3" style={{ color: "var(--body)" }}>
              {b}
            </p>
          </li>
        ))}
      </ol>
    </>
  );
}

export function DemoTrySection({ section }: SectionProps) {
  return (
    <div className="demo-try">
      <Headline as="h2" text={section.heading} />
      <ul className="closing-try">
        <li>
          <div>
            <h3 className="h3 !text-[1.6rem]">
              Try it out for <span className="acc">faculty</span>
            </h3>
            <p className="mt-2" style={{ color: "var(--body)" }}>
              The AI Workspace, lesson planning and assessments, live.
            </p>
          </div>
          <CtaLink intent="faculty-live" source="book_demo_try" label="faculty.galenai.io" variant="ghost" />
        </li>
        <li>
          <div>
            <h3 className="h3 !text-[1.6rem]">
              Try it out for <span className="acc">students</span>
            </h3>
            <p className="mt-2" style={{ color: "var(--body)" }}>
              The AI tutor, question bank, flashcards and cases.
            </p>
          </div>
          <CtaLink intent="try-web" source="book_demo_try" label="app.galenai.io" variant="ghost" />
        </li>
      </ul>
    </div>
  );
}
