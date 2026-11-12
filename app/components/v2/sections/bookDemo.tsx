import { CONTACT, LINKS } from "@/lib/site";
import CtaLink from "../CtaLink";
import LeadForm from "../LeadForm";
import { Headline } from "../ui";
import type { SectionProps } from "./index";

/** Bespoke sections for /institutions/book-demo (registered in sections/index.ts byPage). */

export function DemoFormSection({ section }: SectionProps) {
  return (
    <>
      <Headline as="h2" text={section.heading} />
      <div className="mt-8">
        <LeadForm source="book_demo" />
      </div>
    </>
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
      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {WHY.map(([t, b], i) => (
          <li key={t} className="border-t-[3px] pt-5" style={{ borderColor: "var(--rule)" }}>
            <span className="font-[family-name:var(--font-space-var)] text-3xl font-bold text-[#eb602d]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="h3 mt-3">{t}</h3>
            <p className="mt-2" style={{ color: "var(--body)" }}>
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
    <>
      <Headline as="h2" text={section.heading} />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="tone-dark rounded-[22px] p-8">
          <h3 className="h2 !text-[2rem]">
            Try it out for <span className="acc">faculty</span>
          </h3>
          <div className="mt-6">
            <CtaLink intent="faculty-live" source="book_demo_try" label="faculty.galenai.io" />
          </div>
        </div>
        <div className="rounded-[22px] border-[3px] border-[#2e2e2e] bg-white p-8">
          <h3 className="h2 !text-[2rem]">
            Try it out for <span className="acc">students</span>
          </h3>
          <div className="mt-6">
            <CtaLink intent="try-web" source="book_demo_try" label="app.galenai.io" variant="ghost" />
          </div>
        </div>
      </div>
    </>
  );
}

export function DemoContactSection({ section }: SectionProps) {
  return (
    <>
      <Headline as="h2" text={section.heading} />
      <address className="mt-6 not-italic text-lg leading-loose">
        <a href={`mailto:${CONTACT.corporate}`} className="font-bold underline underline-offset-4">
          {CONTACT.corporate}
        </a>
        <br />
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        <br />
        {CONTACT.address}
        <br />
        <a href={LINKS.linkedin} rel="noopener" className="underline underline-offset-4">
          LinkedIn: galenai-india
        </a>
      </address>
    </>
  );
}
