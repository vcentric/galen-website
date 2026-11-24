import Image from "next/image";
import Link from "next/link";
import { faqLd, videoLd } from "@/lib/seo";
import { CONTACT, LINKS, SITE } from "@/lib/site";
import JsonLd from "@/app/components/v2/JsonLd";
import CtaLink from "@/app/components/v2/CtaLink";
import VideoLite from "@/app/components/v2/VideoLite";
import AppScreen from "@/app/components/v2/AppScreen";
import { FaqBlock, Kicker, Section } from "@/app/components/v2/ui";

/**
 * Institutions home. Blueprint: docs/v2/PAGE_BLUEPRINTS.md section 2.
 * Metadata comes from institutions/layout.tsx.
 * Wording: BMC briefing note, vs-LMS comparison, brochure, deck slides 2, 3, 6.
 */

const VIDEO = {
  youtubeId: "3GjvIeQn9Yw",
  name: "How GalenAI Brings AI to Medical Colleges (CBME Ready)",
  description:
    "A CBME timetable uploaded and validated, competency-mapped lessons and assessments drafted with AI from faculty references, published to the class, and results by competency.",
  uploadDate: "2026-11-09",
  durationIso: "PT1M56S",
};

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

const PARTS = [
  {
    who: "Students",
    title: "An AI tutor on approved content.",
    body: "The tutor answers from the college's approved references and shows its source. Question banks, clinical cases and flashcards are mapped to NMC competencies, and each student sees their own progress.",
    line: SITE.studentLine,
    href: "/institutions/students",
  },
  {
    who: "Faculty",
    title: "An AI workspace for teaching.",
    body: "Faculty upload their own references and generate lessons, slides, assessments and case discussions in minutes. Nothing reaches a student until faculty review, edit and publish it.",
    line: SITE.facultyLine,
    href: "/institutions/faculty",
  },
  {
    who: "College and administration",
    title: "One connected view of CBME reports.",
    body: "Published content reaches the class directly. Results and cohort analytics by student, by competency and by department show where each batch stands, ready for CBME reporting.",
    line: SITE.lmsLine,
    href: "/institutions/administration",
  },
];

const STEPS = [
  ["Upload the timetable", "Your CBME timetable, validated on upload."],
  ["See every competency", "A live calendar mapped to competencies."],
  ["Create lessons", "Plan and build lessons with your own references, material and notes."],
  ["Create with AI", "Slides, assessments, SGD cases, mind maps, flashcards."],
  ["Review and publish", "Edit anything, then publish to your class."],
  ["Track and report", "Analytics by competency and student. Audit-ready."],
];

// Output chip tints: the only place secondary hues appear (design system section 3).
const OUTPUTS = [
  ["Lecture PPT", "#d4482a", "#fde6e1"],
  ["Assessment", "#3a5bd9", "#e8eefc"],
  ["SGD case", "#c27c0e", "#fbefd9"],
  ["Mind map", "#7048d6", "#efe8fc"],
  ["Flashcards", "#2f7a4f", "#e3f4ea"],
];

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

      {/* 2. Where we are: the demo video beside the approved proof points (before everything else, Varun Nov 2026) */}
      <Section id="outcomes">
        <Kicker>Where we are</Kicker>
        <div className="mt-9 grid items-start gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-14">
          <div id="video" className="scroll-mt-24">
            <VideoLite youtubeId={VIDEO.youtubeId} title={VIDEO.name} />
            <p className="mt-5 max-w-2xl text-[0.98rem]" style={{ color: "var(--body)" }}>
              In under two minutes: {VIDEO.description.charAt(0).toLowerCase() + VIDEO.description.slice(1)}
            </p>
          </div>
          <ul className="proof">
            <li>
              <p className="h1 !text-[clamp(3.2rem,6vw,4.4rem)] text-[#eb602d]">2,000+</p>
              <p className="mt-2 font-semibold">students signed up at launch.</p>
            </li>
            <li>
              {/* TODO(varun): swap for the logo file Varun sends, if different */}
              <Image
                src="/stjohns.webp"
                alt="St. John's National Academy of Health Sciences"
                width={1252}
                height={210}
                sizes="300px"
                className="h-auto w-full max-w-[300px]"
              />
              <p className="mt-4 font-semibold">
                <span className="text-[#c94d20]">MoU signed</span> with St. John&apos;s Medical College, Bengaluru.
              </p>
            </li>
            <li>
              <p className="text-[0.98rem]" style={{ color: "var(--body)" }}>
                Founded by Dr. Arun Biju Oommen (MD Medicine; faculty at St. John&apos;s Medical College Hospital, Bengaluru)
                and Varun Jagannathan, supported by senior faculty, CBME experts and medical students.
              </p>
              <Link href="/team" className="proof-link">
                Meet the team <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </Section>

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
        <div className="relative mt-10">
          <Image
            src="/brand/ui/desktop_lesson_page.webp"
            alt="A Cardiac cycle lesson page with Must know, Good to know and Nice to know sections"
            width={1800}
            height={1125}
            sizes="(min-width: 1024px) 900px, 92vw"
            className="h-auto w-full rounded-[22px] shadow-[0_30px_80px_rgba(46,46,46,0.22)] lg:w-[78%]"
          />
          <Image
            src="/brand/ui/panel_generate_lesson_content.webp"
            alt="New lesson form: choose a topic and what to prepare, then generate a draft from your own references"
            width={900}
            height={1002}
            sizes="300px"
            className="absolute bottom-[-8%] right-0 hidden h-auto w-[30%] rounded-[18px] shadow-[0_30px_80px_rgba(46,46,46,0.28)] lg:block"
          />
        </div>
        <ul className="mt-14 flex flex-wrap gap-2.5">
          {OUTPUTS.map(([label, fg, bg], i) => (
            <li
              key={label}
              className="rounded-full px-4 py-2 text-sm font-bold"
              style={{ color: fg, background: bg, transform: `translateY(${i % 2 ? 4 : 0}px)` }}
            >
              {label}
            </li>
          ))}
        </ul>
        <ol className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {STEPS.map(([t, b], i) => (
            <li key={t} className="flex gap-5">
              <span className="font-[family-name:var(--font-space-var)] text-3xl font-bold text-[#eb602d]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="h3">{t}</h3>
                <p className="mt-1" style={{ color: "var(--body)" }}>
                  {b}
                </p>
              </div>
            </li>
          ))}
        </ol>
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
        <ul className="mt-10 space-y-3 md:hidden">
          {LMS_ROWS.map(([area, lms, g]) => (
            <li key={area} className="rounded-[18px] border-2 p-5" style={{ borderColor: "var(--rule)" }}>
              <p className="h3 !text-lg">{area}</p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider opacity-60">Typical LMS</p>
              <p className="mt-1" style={{ color: "var(--body)" }}>
                {lms}
              </p>
              <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#eb602d]">GalenAI</p>
              <p className="mt-1 font-semibold">{g}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-sm uppercase tracking-wider opacity-70">
                <th className="py-3 pr-6 font-semibold">Area</th>
                <th className="py-3 pr-6 font-semibold">Typical LMS</th>
                <th className="py-3 font-semibold text-[#eb602d]">GalenAI</th>
              </tr>
            </thead>
            <tbody>
              {LMS_ROWS.map(([area, lms, g]) => (
                <tr key={area} className="border-t align-top" style={{ borderColor: "var(--rule)" }}>
                  <th scope="row" className="py-5 pr-6 font-bold">
                    {area}
                  </th>
                  <td className="py-5 pr-6" style={{ color: "var(--body)" }}>
                    {lms}
                  </td>
                  <td className="py-5 font-semibold">{g}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-bold">
          <Link href="/institutions/vs-lms" className="underline decoration-[#eb602d] decoration-2 underline-offset-4">
            See the full comparison
          </Link>
          <Link href="/institutions/integrations" className="underline decoration-[#eb602d] decoration-2 underline-offset-4">
            Your existing LMS content stays valuable
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

      {/* 9. Bring GalenAI to your campus */}
      <Section id="contact">
        <h2 className="h1 !text-[clamp(2.2rem,6vw,4.25rem)]">
          Bring GalenAI to your <span className="acc">campus.</span>
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="tone-dark rounded-[22px] p-8">
            <h3 className="h2 !text-[2rem]">
              Try it out for <span className="acc">faculty</span>
            </h3>
            <p className="mt-3" style={{ color: "var(--body)" }}>
              The AI Workspace, lesson planning and assessments, live.
            </p>
            <div className="mt-6">
              <CtaLink intent="faculty-live" source="inst_final" label="faculty.galenai.io" />
            </div>
          </div>
          <div className="rounded-[22px] border-[3px] border-[#2e2e2e] bg-white p-8">
            <h3 className="h2 !text-[2rem]">
              Try it out for <span className="acc">students</span>
            </h3>
            <p className="mt-3" style={{ color: "var(--body)" }}>
              The AI tutor, question bank, flashcards and cases.
            </p>
            <div className="mt-6">
              <CtaLink intent="try-web" source="inst_final" label="app.galenai.io" variant="ghost" />
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <CtaLink intent="demo" source="inst_final" />
          <address className="not-italic text-sm" style={{ color: "var(--body)" }}>
            <a href={`mailto:${CONTACT.corporate}`} className="font-semibold text-[#2e2e2e]">
              {CONTACT.corporate}
            </a>
            {" · "}
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            {" · "}
            {CONTACT.address}
            {" · "}
            <a href={LINKS.linkedin} rel="noopener">LinkedIn</a>
          </address>
        </div>
      </Section>
    </div>
  );
}
