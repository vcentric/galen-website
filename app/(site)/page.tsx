import Image from "next/image";
import Link from "next/link";
import { buildMetadata, faqLd, softwareAppLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { studentFaqs } from "@/content/site/demos";
import TestimonialMarquee from "@/app/components/v2/TestimonialMarquee";
import JsonLd from "@/app/components/v2/JsonLd";
import CtaLink from "@/app/components/v2/CtaLink";
import StickyMobileCta from "@/app/components/v2/StickyMobileCta";
import StoreBadges from "@/app/components/v2/StoreBadges";
import TutorDemo from "@/app/components/v2/TutorDemo";
import HomeHero from "@/app/components/v2/HomeHero";
import BeatStage, { type Beat } from "@/app/components/v2/BeatStage";
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
            <Kicker>Free to read</Kicker>
            <h2 className="h2 mt-5">
              {published.length} MBBS lessons, each with MCQs and <span className="acc">viva questions.</span>
            </h2>
            <p className="lead mt-5">
              One topic per page, mapped to its NMC competency, with diagrams, six MCQs, viva questions and flashcards. No sign-up.
            </p>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learnSubjects.map(({ s, lessons }) => (
                <li key={s}>
                  <div className="card flex h-full flex-col p-6">
                    <h3 className="h3 !text-[1.35rem]">
                      <Link href={`/learn/${s}`} className="hover:text-[#c94d20]">
                        {subjectName(s)}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm font-semibold" style={{ color: "var(--body)" }}>
                      {lessons.length} lessons
                    </p>
                    <ul className="mt-4 flex-1 space-y-1.5 text-[0.95rem] font-semibold">
                      {lessons.slice(0, 4).map((l) => (
                        <li key={l.path}>
                          <Link href={l.path} className="underline decoration-[#2e2e2e]/20 underline-offset-4 hover:decoration-[#eb602d]">
                            {l.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/learn/${s}`} className="mt-4 font-bold text-[#c94d20] hover:underline">
                      All {subjectName(s).toLowerCase()} lessons →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            {EXAM_PAGES_LIVE && (
              <div className="mt-10">
                <h3 className="h3">Exam guides, built from the official bulletins</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {EXAM_GUIDES.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="inline-block rounded-full border-2 border-[#2e2e2e]/15 bg-white px-3.5 py-1.5 text-sm font-bold hover:border-[#eb602d]"
                      >
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-[22px] border-2 p-7" style={{ borderColor: "var(--rule)" }}>
            <p className="kick opacity-70">The old way</p>
            <ul className="mt-5 space-y-3 text-lg" style={{ color: "var(--body)" }}>
              <li>A video subscription you watch at 2X</li>
              <li>Doubts that wait for the next class</li>
              <li>Hours of notes, no idea what you missed</li>
            </ul>
          </div>
          <div className="rounded-[22px] bg-[#fff0e4] p-7 text-[#2e2e2e]">
            <p className="kick">With GalenAI</p>
            <ul className="mt-5 space-y-3 text-lg font-semibold">
              <li>A tutor that answers the doubt you have right now</li>
              <li>Questions that check you understood it</li>
              <li>A dashboard that shows exactly what is weak</li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <CtaLink intent="download" source="home_habit" label="Ask your first question" />
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

      {/* 6. Proof */}
      <Section id="students">
        <Kicker>Students on GalenAI</Kicker>
        <h2 className="h2 mt-5">
          Built with medical <span className="acc">students.</span>
        </h2>
      </Section>
      {/* Full-bleed auto-scrolling row (all testimonials) */}
      <div className="-mt-10 pb-6 md:-mt-14">
        <TestimonialMarquee />
      </div>

      {/* 7. Bridge to institutions: students as the referral channel */}
      <Section id="college">
        <div className="card grid items-center gap-8 p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <Kicker>For your college</Kicker>
            <h2 className="h2 mt-5">
              Your faculty&apos;s lessons, in the same <span className="acc">app.</span>
            </h2>
            <p className="lead mt-4">
              When a college uses GalenAI, lessons your faculty publish appear on your calendar, and the tutor answers
              from your college&apos;s approved content.
            </p>
            <Link href="/institutions" className="btn btn-ghost mt-6">
              Show your college
            </Link>
          </div>
          <PhoneFrame src="/how-to-use/img/d_cal.webp" alt="Faculty lessons on the student calendar" width={200} className="mx-auto" />
        </div>
      </Section>

      {/* 8. FAQ */}
      <Section id="faq">
        <Kicker>FAQ</Kicker>
        <h2 className="h2 mt-5">
          Questions, <span className="acc">answered.</span>
        </h2>
        <div className="mt-8">
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
