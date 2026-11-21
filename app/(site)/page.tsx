import Image from "next/image";
import Link from "next/link";
import { buildMetadata, faqLd, softwareAppLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { studentFaqs } from "@/content/site/demos";
import TestimonialWall from "@/app/components/v2/TestimonialWall";
import JsonLd from "@/app/components/v2/JsonLd";
import CtaLink from "@/app/components/v2/CtaLink";
import StickyMobileCta from "@/app/components/v2/StickyMobileCta";
import StoreBadges from "@/app/components/v2/StoreBadges";
import TutorDemo from "@/app/components/v2/TutorDemo";
import HomeHero from "@/app/components/v2/HomeHero";
import BeatStage, { type Beat } from "@/app/components/v2/BeatStage";
import LibraryShelf, { type ShelfBook } from "@/app/components/v2/LibraryShelf";
import ModeExplorer from "@/app/components/v2/ModeExplorer";
import PhoneFrame from "@/app/components/v2/PhoneFrame";
import { FaqBlock, Kicker, Section } from "@/app/components/v2/ui";
import { getAllLessons, subjectName, SUBJECTS } from "@/lib/learn";
import { EXAM_PAGES_LIVE } from "@/lib/exams";

export const metadata = buildMetadata({
  title: "GalenAI: AI Tutor and Study App for MBBS Students",
  description:
    "Ask any MBBS doubt and get it explained in seconds. AI tutor, question bank, flashcards and clinical cases in one app, built around the NMC CBME curriculum.",
  path: "/",
});

const BEATS: Beat[] = [
  {
    word: "Ask.",
    title: "An AI tutor for every doubt",
    body: "Ask in your own words. Get a clear answer with references, in the mode that suits the topic.",
    img: "tutor-s2",
    href: "/features/ai-tutor",
    link: "How the tutor works",
  },
  {
    word: "Practise.",
    title: "Questions and cases that test you",
    body: "Clinical MCQs with step-by-step reasoning, and patient cases you work through one decision at a time.",
    img: "question-bank-answer",
    href: "/features/question-bank",
    link: "See the question bank",
  },
  {
    word: "Revise.",
    title: "Flashcards and a map of your gaps",
    body: "Spaced revision brings hard cards back sooner. Your dashboard shows the weakest topic so you know what's next.",
    img: "dashboard",
    href: "/features/dashboard",
    link: "See the dashboard",
  },
];

const STAGES = [
  {
    tag: "Phase 1 and 2",
    who: "First and second year",
    icon: "microscope",
    body: "Anatomy, physiology, biochemistry, then pathology, pharmacology and microbiology. Doubts explained, vivas practised, facts revised.",
    href: "/for/mbbs-students",
    link: "For MBBS students",
  },
  {
    tag: "Phase 3",
    who: "Final years and postings",
    icon: "stethoscope",
    body: "Clinical cases you work through one decision at a time, and quick answers between ward rounds.",
    href: "/features/clinical-cases",
    link: "Clinical cases",
  },
  {
    tag: "NEET PG and INI-CET",
    who: "Interns and PG aspirants",
    icon: "checklist",
    body: "Clinical MCQs with reasoning, exam mode, and a dashboard that shows your weakest subject. Dedicated PG modules coming soon.",
    href: "/for/neet-pg",
    link: "For NEET PG",
  },
  {
    tag: "FMGE",
    who: "Foreign medical graduates",
    icon: "stopwatch",
    body: "A tutor for studying on your own, with a question bank and flashcards for fast revision. Dedicated FMGE modules coming soon.",
    href: "/for/fmge",
    link: "For FMGE",
  },
];

const OLD_WAY = ["A video subscription you watch at 2X", "Doubts that wait for the next class", "Hours of notes, no idea what you missed"];
// Brand icon (public/brand/icons) and line.
const NEW_WAY: [string, string][] = [
  ["chat", "A tutor that answers the doubt you have right now"],
  ["checklist", "Questions that check you understood it"],
  ["graph", "A dashboard that shows exactly what is weak"],
];

const EXAM_GUIDES = [
  { label: "NEET PG complete guide", href: "/exams/neet-pg" },
  { label: "NEET PG pattern and syllabus", href: "/exams/neet-pg-exam-pattern-and-syllabus" },
  { label: "NEET PG preparation guide", href: "/exams/neet-pg-preparation-guide" },
  { label: "Free NEET PG MCQ practice", href: "/exams/neet-pg-mcq-practice" },
  { label: "FMGE syllabus and pattern", href: "/exams/fmge-syllabus-and-pattern" },
];

/** Student home. Blueprint: docs/v2/PAGE_BLUEPRINTS.md section 1. */
export default function Home() {
  const published = getAllLessons().filter((l) => l.isPublished);
  const learnSubjects = Object.keys(SUBJECTS)
    .map((s) => ({ s, lessons: published.filter((l) => l.subject === s) }))
    .filter((x) => x.lessons.length > 0);
  const books: ShelfBook[] = [
    ...learnSubjects.map(({ s, lessons }) => ({
      key: s,
      name: subjectName(s),
      count: lessons.length,
      blurb: SUBJECTS[s].blurb,
      items: lessons.slice(0, 6).map((l) => ({ title: l.title, href: l.path, code: l.cbmeCodes[0] })),
      more: { label: `All ${subjectName(s).toLowerCase()} lessons`, href: `/learn/${s}` },
    })),
    ...(EXAM_PAGES_LIVE
      ? [{ key: "exams", name: "Exam guides", blurb: "Built from the official bulletins.", items: EXAM_GUIDES.map((g) => ({ title: g.label, href: g.href })), kind: "exams" as const }]
      : []),
  ];
  return (
    <div className="v2">
      <JsonLd data={[softwareAppLd(), faqLd(studentFaqs)]} />

      {/* 1. Hero: the promise, and the ask bar that shows it happening (HomeHero.tsx). */}
      <HomeHero />

      {/* 1b. Who it's for: every stage of medical school, one card each. */}
      <Section id="who">
        <Kicker>Who it&apos;s for</Kicker>
        <h2 className="h2 mt-5">
          Built for every stage of medical <span className="acc">school.</span>
        </h2>
        {/* Index cards: the stage on a file tab, a brand icon, and the hard offset shadow from the print pieces (styles: .paper in v2.css). */}
        <ul className="paper-row mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((st) => (
            <li key={st.who}>
              <Link href={st.href} className="paper group">
                <span className="paper-tab">{st.tag}</span>
                <Image src={`/brand/icons/${st.icon}.svg`} alt="" width={56} height={56} className="h-14 w-14 self-end" />
                <h3 className="h3 mt-3 !text-[1.4rem]">{st.who}</h3>
                <p className="mt-4 flex-1 border-t-2 border-[#eb602d] pt-4" style={{ color: "var(--body)" }}>
                  {st.body}
                </p>
                <span className="mt-5 font-[family-name:var(--font-space-var)] font-bold">
                  {st.link}{" "}
                  <span aria-hidden className="inline-block text-[#eb602d] transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-semibold" style={{ color: "var(--body)" }}>
          Teaching at a medical college?{" "}
          <Link href="/institutions" className="text-[#2e2e2e] underline decoration-[#eb602d] decoration-2 underline-offset-4">
            See GalenAI for colleges
          </Link>
        </p>
      </Section>

      {/* 2. Try it here: the "I need this" moment, before any download. */}
      <section id="try" className="sec bg-white/60">
        <div className="wrap">
          <TutorDemo source="home_try" />
        </div>
      </section>

      {/* 3. Ask. Practise. Revise. The approved line, as three words you can open (BeatStage.tsx). */}
      <Section id="features">
        <Kicker>One app</Kicker>
        <h2 className="sr-only">Ask. Practise. Revise.</h2>
        <div className="mt-6">
          <BeatStage beats={BEATS} />
        </div>
      </Section>

      {/* 3b. Free lessons and exam guides: the public library that search and AI engines land on. */}
      {learnSubjects.length > 0 && (
        <section id="learn" className="sec bg-white/60">
          <div className="wrap">
            {/* The library as a shelf: one spine per subject, as thick as its lesson count; the chosen book is open beside it. */}
            <LibraryShelf books={books}>
              <Kicker>Free to read</Kicker>
              <h2 className="h2 mt-5">
                {published.length} MBBS lessons, each with MCQs and <span className="acc">viva questions.</span>
              </h2>
              <p className="lead mt-5">
                One topic per page, mapped to its NMC competency, with diagrams, six MCQs, viva questions and flashcards. No sign-up.
              </p>
            </LibraryShelf>
          </div>
        </section>
      )}

      {/* 4. Asking beats watching (dark). Habit, never a brand. */}
      <Section id="ask-dont-watch" tone="dark">
        <Kicker>Ask, don&apos;t watch</Kicker>
        <h2 className="h1 mt-5 !text-[clamp(2.2rem,6vw,4.25rem)]">
          Stop <span className="strike">watching</span> at 2X.
          <br />
          Start <span className="acc">asking.</span>
        </h2>
        {/* The old way is a dull video player racing at 2X; the GalenAI note is slapped on top of it, bright and askew (.versus in v2.css). */}
        <div className="versus mt-12">
          <div className="versus-old">
            <p className="kick opacity-70">The old way</p>
            <div className="oldplay" aria-hidden>
              <span className="oldplay-speed">
                <small>At</small>
                <b>2X</b>
              </span>
              <span className="oldplay-bar">
                <i />
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-[1.05rem]" style={{ color: "var(--body)" }}>
              {OLD_WAY.map((t) => (
                <li key={t} className="flex gap-3">
                  <span aria-hidden className="mt-[0.65em] h-[2px] w-4 shrink-0 bg-current opacity-60" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="versus-new">
            <p className="kick">With GalenAI</p>
            <ul className="mt-6 space-y-4">
              {NEW_WAY.map(([icon, t]) => (
                <li key={t} className="flex items-center gap-4">
                  <span className="grid h-[3.25rem] w-[3.25rem] shrink-0 place-items-center rounded-[14px] border-2 border-[#2e2e2e]/10 bg-white">
                    <Image src={`/brand/icons/${icon}.svg`} alt="" width={30} height={30} className="h-[1.9rem] w-[1.9rem]" />
                  </span>
                  <span className="h3 !text-[1.2rem] !leading-snug">{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaLink intent="download" source="home_habit" label="Ask your first question" />
            </div>
          </div>
        </div>
      </Section>

      {/* 5. Tutor modes */}
      <Section id="modes">
        <Kicker>Tutor modes</Kicker>
        <h2 className="h2 mt-5">
          One tutor. Five ways to <span className="acc">teach.</span>
        </h2>
        <p className="lead mt-5">Pick how it answers. Or build your own Tutor Profile with your own instructions.</p>
        <div className="mt-10">
          <ModeExplorer />
        </div>
      </Section>

      {/* 6. Proof: the testimonials as an endless wall of cards (TestimonialWall.tsx). */}
      <Section id="students">
        <TestimonialWall>
          <Kicker>Students on GalenAI</Kicker>
          <h2 className="h2 mt-5">
            Built with medical <span className="acc">students.</span>
          </h2>
          <p className="mt-6 text-sm font-semibold" style={{ color: "var(--body)" }}>
            <span className="mr-1 inline-flex items-center gap-1 rounded-full bg-[#eb602d]/10 px-2.5 py-0.5 font-bold text-[#c94d20]">
              <span aria-hidden>✦</span> 2,000+
            </span>
            medical students already on it.
          </p>
          <div className="mt-6">
            <CtaLink intent="download" source="home_students" />
          </div>
        </TestimonialWall>
      </Section>

      {/* 7. Bridge to institutions: students as the referral channel.
          A dark panel that shows the hand-off: the faculty workspace behind, the student calendar in front (.college in v2.css). */}
      <Section id="college">
        <div className="college tone-dark">
          <div>
            <Kicker>For your college</Kicker>
            <h2 className="h2 mt-5">
              Your faculty&apos;s lessons, in the same <span className="acc">app.</span>
            </h2>
            <p className="lead mt-4">
              When a college uses GalenAI, lessons your faculty publish appear on your calendar, and the tutor answers
              from your college&apos;s approved content.
            </p>
            <Link href="/institutions" className="btn btn-primary mt-7">
              Show your college
            </Link>
          </div>
          <div className="college-art">
            <Image
              src="/brand/ui/desktop_content_bank.webp"
              alt="A lecture deck in the GalenAI faculty Content Bank, with the Publish to students button"
              width={1597}
              height={728}
              sizes="(min-width: 1024px) 620px, 92vw"
              className="college-desk"
            />
            <span className="college-tag college-tag-from">Faculty publish</span>
            <svg className="college-arrow" width="92" height="74" viewBox="0 0 92 74" fill="none" aria-hidden>
              <path d="M86 6C70 2 44 8 28 30c-6 8-10 18-11 28" stroke="#eb602d" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M5 46l12 14 13-12" stroke="#eb602d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="college-phone">
              <PhoneFrame src="/brand/ui/phone_calendar.webp" alt="Faculty lessons on the student calendar" width={176} notch={false} />
              <span className="college-tag college-tag-to">On your calendar</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. FAQ */}
      <Section id="faq">
        {/* Heading beside the list on desktop; it stays in view while the list scrolls. */}
        <div className="grid gap-x-14 gap-y-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
          <div className="self-start lg:sticky lg:top-28">
            <Kicker>FAQ</Kicker>
            <h2 className="h2 mt-5">
              Questions, <span className="acc">answered.</span>
            </h2>
          </div>
          <FaqBlock faqs={studentFaqs} />
        </div>
      </Section>

      {/* 9. Final CTA */}
      <Section tone="dark">
        <div className="relative">
          <h2 className="h1 !text-[clamp(2.2rem,6vw,4.25rem)]">
            Your next doubt,
            <br />
            answered in <span className="acc">seconds.</span>
          </h2>
          <p className="lead mt-5">{SITE.studentLine} All in one app.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink intent="download" source="home_final" />
            <CtaLink intent="try-web" source="home_final" variant="ghost" />
          </div>
          <div className="mt-8">
            <StoreBadges tone="dark" source="home_final_badge" />
          </div>
          <Image
            src="/brand/mascots/dr-mira.svg"
            alt=""
            width={150}
            height={150}
            className="pointer-events-none absolute -bottom-6 right-0 hidden h-auto w-[150px] md:block"
          />
        </div>
      </Section>

      <StickyMobileCta intent="download" source="home" />
    </div>
  );
}
