import Image from "next/image";
import Link from "next/link";
import { faqLd, videoLd } from "@/lib/seo";
import { CONTACT, LINKS, SITE } from "@/lib/site";
import JsonLd from "@/app/components/v2/JsonLd";
import CtaLink from "@/app/components/v2/CtaLink";
import FacultySteps from "@/app/components/v2/FacultySteps";
import { FACULTY_STEPS } from "@/content/site/faculty-steps";
import { INSTITUTION_PARTS, INSTITUTION_VIDEO } from "@/content/site/institution-parts";
import VideoLite from "@/app/components/v2/VideoLite";
import AppScreen from "@/app/components/v2/AppScreen";
import { FaqBlock, Kicker, Section } from "@/app/components/v2/ui";

/**
 * Institutions home. Blueprint: docs/v2/PAGE_BLUEPRINTS.md section 2.
 * Metadata comes from institutions/layout.tsx.
 * Wording: BMC briefing note, vs-LMS comparison, brochure, deck slides 2, 3, 6.
 */

const VIDEO = INSTITUTION_VIDEO;

const HAPPENING = [
  {
    t: "Students are already learning with AI, but it is not verified.",
    b: "Medical students use general AI tools every day. These tools answer without naming a source, are not tied to the NMC curriculum, and can be wrong. Faculty and the college have no view of what students are learning from them.",
  },
  {
    t: "Faculty need support with CBME.",
    b: "Every class has to be mapped to competencies, with lessons, assessments and progress records prepared alongside teaching and clinical duties. A conventional LMS stores the syllabus; it does not help faculty deliver it.",
  },
  {
    t: "The classroom will become AI-connected.",
    b: "AI carries each class through to students, so learning continues after the lecture.",
  },
];

const PARTS = INSTITUTION_PARTS;

const LMS_ROWS = [
  ["Lessons", "Faculty prepare every lesson and its assessments outside the LMS, then upload the files.", "GalenAI drafts the lesson, slides, assessments, SGD cases, mind maps and flashcards from faculty references. Faculty review, edit and publish."],
  ["Quizzes", "Strong quiz tools, but every question is still written and mapped to competencies by faculty.", "The same, and AI drafts competency-based questions with the answer and rationale. Results per student and per competency."],
  ["CBME competencies", "Each college builds its own mapping.", "Timetable, lessons and assessments are tied to competencies from the start."],
  ["What students get", "A course page to download files, submit work and see notices.", "An app for exams and college life: tutor, practice, revision and the college's own lessons, together."],
];

/** Small drawn pictures for the three parts (decorative, in site colours): tutor answer, lesson draft, results by competency. */
const PART_ART = [
  <div key="s" className="pa pa-tutor">
    <span className="pa-q">Why does volume stay the same?</span>
    <i style={{ width: "92%" }} />
    <i style={{ width: "78%" }} />
    <i style={{ width: "56%" }} />
    <span className="pa-src">Source: your college&apos;s lesson</span>
  </div>,
  <div key="f" className="pa pa-draft">
    <div className="pa-row">
      <b>Cardiac cycle</b>
      <span className="pa-tag">Draft</span>
    </div>
    <i style={{ width: "94%" }} />
    <i style={{ width: "82%" }} />
    <i style={{ width: "64%" }} />
    <div className="pa-row pa-actions">
      <span>Edit</span>
      <span className="pa-publish">Publish</span>
    </div>
  </div>,
  <div key="c" className="pa pa-report">
    <b>Results by competency</b>
    {[
      ["PY5.1", "86%"],
      ["PY5.4", "64%"],
      ["PY5.7", "42%"],
      ["PY5.8", "73%"],
    ].map(([code, w]) => (
      <div key={code} className="pa-bar">
        <span>{code}</span>
        <em>
          <u style={{ width: w }} />
        </em>
      </div>
    ))}
  </div>,
];

const FAQS = [
  {
    q: "Does AI-generated content reach students automatically?",
    a: "No. AI produces a draft from the faculty member's own references. It reaches students only after the faculty member reviews, edits and publishes it.",
  },
  {
    q: "Do we have to replace our LMS?",
    a: "No. Existing content in your LMS can be brought into GalenAI after you begin, so the AI tutor and faculty workspace build on it. The approach is agreed with your team.",
  },
  {
    q: "Is GalenAI built for the NMC CBME curriculum?",
    a: "Yes. The timetable, competency calendar, lessons, assessments and analytics are organised around NMC competencies from the start.",
  },
  {
    q: "Can we try it before a demo?",
    a: "Yes. Faculty can try the platform live at faculty.galenai.io, and students can try the app at app.galenai.io.",
  },
];

export default function InstitutionsPage() {
  return (
    <div className="v2">
      <JsonLd data={[faqLd(FAQS), videoLd(VIDEO)]} />

      {/* 1. Hero, brochure-cover style */}
      <section className="tone-dark overflow-hidden">
        <div className="wrap pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="grid items-center gap-14 xl:grid-cols-[32rem_minmax(0,1fr)] xl:gap-12">
            <div>
              <Kicker>For medical colleges</Kicker>
              <h1 className="h1 mt-5 lg:!text-[clamp(3.5rem,5vw,4.4rem)]">
                AI for medical
                <br />
                <span className="acc">colleges.</span>
              </h1>
              <p className="h3 mt-6 !text-[clamp(1.15rem,2vw,1.35rem)] opacity-90">{SITE.subTagline}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <CtaLink intent="faculty-live" source="inst_hero" />
                <CtaLink intent="demo" source="inst_hero" variant="ghost" />
              </div>
            </div>
            <figure className="inst-hero-art">
              <div className="inst-hero-window">
                <div className="inst-hero-bar" aria-hidden>
                  <i />
                  <i />
                  <i />
                  <span>faculty.galenai.io</span>
                </div>
                <Image
                  src="/brand/ui/desktop_ai_workspace.webp"
                  alt="GalenAI AI Workspace: faculty sources, chat with citations and the Studio"
                  width={1800}
                  height={1125}
                  priority
                  sizes="(min-width: 1024px) 900px, 92vw"
                  className="h-auto w-full"
                />
              </div>
              {/* Real student app screen (dark theme), in front of the faculty workspace. */}
              <div className="inst-hero-phone">
                <AppScreen name="tutor-isovolumetric" alt="The GalenAI student app answering a question on the same topic" width={160} />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Where we are: the approved proof points (Varun Nov 2026), on a raised panel that sits across the
          bottom edge of the dark hero, so the facts are the first thing met after the headline. */}
      <section id="outcomes" className="proof-sec">
        <div className="wrap">
          <div className="proof-panel">
            <Kicker>Where we are</Kicker>
            <ul className="proof">
              <li>
                <p className="proof-n">2,000+</p>
                <p className="proof-t">students signed up at launch.</p>
              </li>
              <li>
                {/* TODO(varun): swap for the logo file Varun sends, if different */}
                <Image
                  src="/stjohns.webp"
                  alt="St. John's National Academy of Health Sciences"
                  width={1252}
                  height={210}
                  sizes="300px"
                  className="proof-logo"
                />
                <p className="proof-t">
                  <span className="text-[#c94d20]">MoU signed</span> with St. John&apos;s Medical College, Bengaluru.
                </p>
              </li>
              <li>
                <div className="proof-faces" aria-hidden>
                  <span>
                    <Image src="/Dr. Arun Biju.webp" alt="" fill sizes="56px" className="object-cover object-top" />
                  </span>
                  <span>
                    <Image src="/Varun.webp" alt="" fill sizes="56px" className="object-cover object-top" />
                  </span>
                </div>
                <div>
                  <p className="proof-b">
                    Founded by Dr. Arun Biju Oommen (MD Medicine; faculty at St. John&apos;s Medical College Hospital, Bengaluru)
                    and Varun Jagannathan, supported by senior faculty, CBME experts and medical students.
                  </p>
                  <Link href="/team" className="proof-link">
                    Meet the team <span aria-hidden>→</span>
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2b. The demo video, as its own block: what it shows on the left, the video on the right. */}
      <section id="video" className="sec spec-band scroll-mt-16">
        <div className="wrap demo-video">
          <div>
            <Kicker>In under two minutes</Kicker>
            <p className="demo-video-t">{VIDEO.description}</p>
          </div>
          <VideoLite youtubeId={VIDEO.youtubeId} title={VIDEO.name} />
        </div>
      </section>

      {/* 3. What is happening: two things true today, then the change they lead to (which the next section answers) */}
      <Section id="overview">
        <Kicker>What is happening</Kicker>
        <h2 className="h2 mt-5 max-w-4xl">
          Students are already learning with AI. Colleges have no part in it, <span className="acc">yet.</span>
        </h2>
        <ol className="happening">
          {HAPPENING.slice(0, 2).map((h, i) => (
            <li key={h.t} className="happening-now">
              <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h3 mt-5 !text-[clamp(1.35rem,2.2vw,1.7rem)]">{h.t}</h3>
              <p className="mt-4" style={{ color: "var(--body)" }}>
                {h.b}
              </p>
            </li>
          ))}
          <li className="happening-next tone-dark">
            <div>
              <span className="happening-n">03</span>
              <h3 className="h2 mt-5 !text-[clamp(1.9rem,4vw,3rem)]">
                The classroom will become <span className="acc">AI-connected.</span>
              </h3>
            </div>
            <div className="happening-next-side">
              <p className="lead">{HAPPENING[2].b}</p>
              <a href="#solution" aria-label="See the solution: the AI Connected Classroom" className="happening-go">
                <span aria-hidden>↓</span>
              </a>
            </div>
          </li>
        </ol>
      </Section>

      {/* 4. The AI Connected Classroom */}
      <Section id="solution">
        <Kicker>The solution</Kicker>
        <h2 className="h2 mt-5">
          The AI Connected <span className="acc">Classroom.</span>
        </h2>
        <p className="lead mt-4">Three parts, working together.</p>
        {/* No cards: three drawn screens sit straight on the page, joined by one flowing line.
            Shown in the order the work travels: faculty publish, students learn, the college sees results. */}
        <div className="loop">
          <svg className="loop-line" viewBox="0 0 1000 165" preserveAspectRatio="none" aria-hidden>
            <path d="M105 65 C 260 65, 300 100, 453 100 S 650 65, 800 65" />
          </svg>
          <span className="loop-tag loop-tag-a" aria-hidden>
            Lessons go out
          </span>
          <span className="loop-tag loop-tag-b" aria-hidden>
            Results come back
          </span>
          {[1, 0, 2].map((idx, i) => {
            const p = PARTS[idx];
            return (
              <Link key={p.who} href={p.href} className="loop-part group">
                <div className="loop-art" aria-hidden>
                  {PART_ART[idx]}
                </div>
                <div className="loop-text">
                  <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="loop-who">{p.who}</h3>
                  <p className="loop-title">{p.title}</p>
                  <p className="loop-body">{p.body}</p>
                  <p className="loop-more">
                    {p.line}
                    <span className="sr-only"> Learn more</span>
                    <span aria-hidden>→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* 5. How faculty create content */}
      <Section id="faculty">
        <Kicker>For faculty</Kicker>
        <h2 className="h2 mt-5">
          Faculty teach <span className="acc">easier.</span>
        </h2>
        <p className="lead mt-4">CBME gives you the framework. GalenAI runs the delivery, from timetable to analytics.</p>
        <FacultySteps steps={FACULTY_STEPS} />
        <div className="mt-12 border-t-[3px] pt-6" style={{ borderColor: "var(--rule)" }}>
          <p className="h3 text-[#eb602d]">AI drafts. Faculty review.</p>
          <p className="mt-1" style={{ color: "var(--body)" }}>
            Every output stays with your faculty.
          </p>
        </div>
      </Section>

      {/* 6. LMS contrast */}
      <Section id="vs-lms" tone="dark">
        <Kicker>GalenAI versus your LMS</Kicker>
        <h2 className="h2 mt-5 max-w-3xl">
          Your LMS stores the syllabus. GalenAI <span className="acc">delivers it.</span>
        </h2>
        {/* Phones: one block per area, the GalenAI answer larger and marked by the same orange rule. */}
        <ul className="vs-cards md:hidden">
          {LMS_ROWS.map(([area, lms, g]) => (
            <li key={area}>
              <p className="vs-area">{area}</p>
              <p className="vs-label">Typical LMS</p>
              <p className="mt-1" style={{ color: "var(--body)" }}>
                {lms}
              </p>
              <div className="vs-ours">
                <p className="vs-label vs-label-ours">GalenAI</p>
                <p className="vs-ours-text">{g}</p>
              </div>
            </li>
          ))}
        </ul>
        {/* Tablet and up: a real table set like a ledger. No panels or ticks: the LMS side is small and quiet,
            the GalenAI side is set large in the heading face, and one orange rule divides them. */}
        <div className="mt-12 hidden md:block">
          <table className="vs-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Area</span>
                </th>
                <th scope="col">Typical LMS</th>
                <th scope="col">
                  <Image src="/brand/lockup.svg" alt="GalenAI" width={127} height={28} className="h-auto w-[104px]" />
                </th>
              </tr>
            </thead>
            <tbody>
              {LMS_ROWS.map(([area, lms, g], i) => (
                <tr key={area}>
                  <th scope="row">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {area}
                  </th>
                  <td>{lms}</td>
                  <td>{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/institutions/vs-lms" className="btn btn-primary">
            See the full comparison
          </Link>
          <Link href="/institutions/integrations" className="vs-link">
            Your existing LMS content stays valuable <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>

      {/* 8. FAQ */}
      <Section id="faq">
        <Kicker>FAQ</Kicker>
        <h2 className="h2 mt-5">
          Questions from <span className="acc">colleges.</span>
        </h2>
        <div className="mt-8">
          <FaqBlock faqs={FAQS} />
        </div>
      </Section>

      {/* 9. Bring GalenAI to your campus. One main action (book a demo) with the contact details under it;
          the two live products sit beside it as a ruled list, not as boxes. */}
      <Section id="contact" tone="dark">
        <h2 className="h1 !text-[clamp(2.4rem,7vw,5.25rem)]">
          Bring GalenAI to
          <br className="hidden sm:block" /> your <span className="acc">campus.</span>
        </h2>
        <div className="closing">
          <div>
            <CtaLink intent="demo" source="inst_final" className="!min-h-14 !px-8 !text-lg" />
            <address className="closing-contact">
              <a href={`mailto:${CONTACT.corporate}`}>{CONTACT.corporate}</a>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              <span>{CONTACT.address}</span>
              <a href={LINKS.linkedin} rel="noopener">
                LinkedIn <span aria-hidden>↗</span>
              </a>
            </address>
          </div>
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
              <CtaLink intent="faculty-live" source="inst_final" label="faculty.galenai.io" variant="ghost" />
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
              <CtaLink intent="try-web" source="inst_final" label="app.galenai.io" variant="ghost" />
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
