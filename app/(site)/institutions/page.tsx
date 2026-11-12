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
    <div className="v2" data-tone="neutral">
      <JsonLd data={[faqLd(FAQS), videoLd(VIDEO)]} />

      {/* 1. Hero, brochure-cover style */}
      <section className="tone-dark overflow-hidden">
        <div className="wrap pt-36 pb-16 md:pt-44 md:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <Kicker>For medical colleges</Kicker>
              <h1 className="h1 mt-5">
                AI for medical
                <br />
                <span className="acc">colleges.</span>
              </h1>
              <p className="h3 mt-6 !text-[clamp(1.2rem,2.2vw,1.6rem)] opacity-90">{SITE.subTagline}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {["Institution", "Faculty", "Student", "CBME"].map((c) => (
                  <li key={c} className="rounded-full border-2 border-[#fff0e4]/30 px-4 py-1.5 text-sm font-semibold">
                    {c}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <CtaLink intent="faculty-live" source="inst_hero" />
                <CtaLink intent="demo" source="inst_hero" variant="ghost" />
              </div>
            </div>
            <div className="relative">
              <Image
                src="/brand/ui/desktop_ai_workspace.webp"
                alt="GalenAI AI Workspace: faculty sources, chat with citations and the Studio"
                width={1800}
                height={1125}
                priority
                sizes="(min-width: 1024px) 600px, 92vw"
                className="h-auto w-full rounded-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              />
              {/* Real student app screen (dark theme), overlapping the workspace like the brochure cover. */}
              <div className="absolute -bottom-12 -left-4 hidden sm:block">
                <AppScreen name="tutor-isovolumetric" alt="" width={165} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Where we are (before the video, Varun Nov 2026): approved proof points only */}
      <Section id="outcomes">
        <Kicker>Where we are</Kicker>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="card flex flex-col justify-between gap-6 p-7">
            {/* TODO(varun): swap for the logo file Varun sends, if different */}
            <Image
              src="/stjohns.webp"
              alt="St. John's National Academy of Health Sciences"
              width={1252}
              height={210}
              sizes="360px"
              className="h-auto w-full max-w-[360px]"
            />
            <p className="font-semibold">
              <span className="h3 text-[#eb602d]">MoU signed</span> with St. John&apos;s Medical College, Bengaluru.
            </p>
          </div>
          <div className="card flex flex-col justify-between gap-6 p-7">
            <p className="h1 !text-[clamp(3rem,7vw,4.5rem)] text-[#eb602d]">2,000+</p>
            <p className="font-semibold">students signed up at launch.</p>
          </div>
        </div>
        <p className="mt-8 max-w-3xl" style={{ color: "var(--body)" }}>
          Founded by Dr. Arun Biju Oommen (MD Medicine; faculty at St. John&apos;s Medical College Hospital, Bengaluru)
          and Varun Jagannathan, supported by senior faculty, CBME experts and medical students.{" "}
          <Link href="/team" className="font-bold underline underline-offset-4">
            Meet the team
          </Link>
        </p>
      </Section>

      {/* 3. Video */}
      <Section id="video">
        <div className="mx-auto max-w-4xl">
          <VideoLite youtubeId={VIDEO.youtubeId} title={VIDEO.name} />
          <p className="mt-5 text-center" style={{ color: "var(--body)" }}>
            In under two minutes: {VIDEO.description.charAt(0).toLowerCase() + VIDEO.description.slice(1)}
          </p>
        </div>
      </Section>

      {/* 3. What is happening */}
      <Section id="overview">
        <Kicker>What is happening</Kicker>
        <h2 className="h2 mt-5 max-w-4xl">
          Students are already learning with AI. Colleges have no part in it, <span className="acc">yet.</span>
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {HAPPENING.map((h, i) => (
            <li key={h.t} className="border-t-4 border-[#eb602d] pt-6">
              <span className="font-[family-name:var(--font-space-var)] text-5xl font-bold text-[#eb602d]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="h3 mt-4">{h.t}</h3>
              <p className="mt-3" style={{ color: "var(--body)" }}>
                {h.b}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4. The AI Connected Classroom */}
      <Section id="solution">
        <Kicker>The solution</Kicker>
        <h2 className="h2 mt-5">
          The AI Connected <span className="acc">Classroom.</span>
        </h2>
        <p className="lead mt-4">Three parts, working together.</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {PARTS.map((p) => (
            <Link key={p.who} href={p.href} className="card group flex flex-col p-7">
              <p className="kick">{p.who}</p>
              <h3 className="h3 mt-5 !text-2xl">{p.title}</h3>
              <p className="mt-3 flex-1" style={{ color: "var(--body)" }}>
                {p.body}
              </p>
              <p className="mt-6 font-bold text-[#c94d20]">{p.line}</p>
              <span className="mt-4 font-bold underline decoration-2 underline-offset-4 group-hover:decoration-[#eb602d]">
                Learn more
              </span>
            </Link>
          ))}
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
            alt="A Knee Joint lesson page with competencies AN18.4 and AN18.5"
            width={1800}
            height={1125}
            sizes="(min-width: 1024px) 900px, 92vw"
            className="h-auto w-full rounded-[22px] shadow-[0_30px_80px_rgba(46,46,46,0.22)] lg:w-[78%]"
          />
          <Image
            src="/brand/ui/panel_generate_lesson_content.webp"
            alt="Generate lesson content panel: written only from your reference library, drafts only"
            width={900}
            height={1226}
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
