import Image from "next/image";
import Link from "next/link";
import { buildMetadata, faqLd, softwareAppLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { studentFaqs, testimonials } from "@/content/site/demos";
import JsonLd from "@/app/components/v2/JsonLd";
import CtaLink from "@/app/components/v2/CtaLink";
import QrBlock from "@/app/components/v2/QrBlock";
import StickyMobileCta from "@/app/components/v2/StickyMobileCta";
import StoreBadges from "@/app/components/v2/StoreBadges";
import TutorDemo from "@/app/components/v2/TutorDemo";
import ModeExplorer from "@/app/components/v2/ModeExplorer";
import PhoneFrame from "@/app/components/v2/PhoneFrame";
import { FaqBlock, Kicker, Section } from "@/app/components/v2/ui";

export const metadata = buildMetadata({
  title: "GalenAI: AI Tutor and Study App for MBBS Students",
  description:
    "Ask any MBBS doubt and get it explained in seconds. AI tutor, question bank, flashcards and clinical cases in one app, built around the NMC CBME curriculum.",
  path: "/",
});

const BEATS = [
  {
    word: "Ask.",
    title: "An AI tutor for every doubt",
    body: "Ask in your own words. Get a clear answer with references, in the mode that suits the topic.",
    img: "/how-to-use/img/s_explain.webp",
    href: "/features/ai-tutor",
    link: "How the tutor works",
  },
  {
    word: "Practise.",
    title: "Questions and cases that test you",
    body: "Clinical MCQs with step-by-step reasoning, and patient cases you work through one decision at a time.",
    img: "/how-to-use/img/s_qb_ans.webp",
    href: "/features/question-bank",
    link: "See the question bank",
  },
  {
    word: "Revise.",
    title: "Flashcards and a map of your gaps",
    body: "Spaced revision brings hard cards back sooner. Your dashboard shows the weakest topic so you know what's next.",
    img: "/how-to-use/img/s_dash.webp",
    href: "/features/dashboard",
    link: "See the dashboard",
  },
];

/** Student home. Blueprint: docs/v2/PAGE_BLUEPRINTS.md section 1. */
export default function Home() {
  return (
    <div className="v2">
      <JsonLd data={[softwareAppLd(), faqLd(studentFaqs)]} />

      {/* 1. Hero: promise, proof, action. H1 + CTA fit one phone viewport. */}
      <section className="wrap pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <Kicker>For MBBS students</Kicker>
            <h1 className="h1 mt-5">
              Ask anything.
              <br />
              Get it <span className="acc">explained.</span>
            </h1>
            <p className="lead mt-6">
              The AI tutor for MBBS. Clear answers with references, then practice until it sticks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink intent="download" source="home_hero" />
              <CtaLink intent="try-web" source="home_hero" variant="ghost" />
            </div>
            <p className="mt-5 text-sm font-semibold" style={{ color: "var(--body)" }}>
              <span className="text-[#2e2e2e]">2,000+</span> medical students already on it. iPhone, Android and web.
            </p>
            <QrBlock className="mt-10 hidden lg:flex" size={112} />
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/brand/ui/phone_tutor_answer_cited.webp"
              alt="GalenAI AI tutor answering a cardiac cycle question with references"
              width={720}
              height={1369}
              priority
              sizes="(min-width: 1024px) 340px, 260px"
              className="h-auto w-[260px] lg:w-[340px]"
            />
          </div>
        </div>
      </section>

      {/* 2. Try it here: the "I need this" moment, before any download. */}
      <section id="try" className="sec bg-white/60">
        <div className="wrap">
          <TutorDemo source="home_try" />
        </div>
      </section>

      {/* 3. Ask. Practise. Revise. (verbatim heading) */}
      <Section id="features">
        <Kicker>One app</Kicker>
        <h2 className="h2 mt-5">
          Ask. Practise. <span className="acc">Revise.</span>
        </h2>
        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-8">
          {BEATS.map((b) => (
            <div key={b.word} className="flex flex-col">
              <PhoneFrame src={b.img} alt={b.title} width={220} className="mx-auto md:mx-0" />
              <p className="h2 mt-8 !text-[2rem] acc">{b.word}</p>
              <h3 className="h3 mt-2">{b.title}</h3>
              <p className="mt-2" style={{ color: "var(--body)" }}>
                {b.body}
              </p>
              <Link href={b.href} className="mt-3 font-bold underline decoration-[#eb602d] decoration-2 underline-offset-4">
                {b.link}
              </Link>
            </div>
          ))}
        </div>
      </Section>

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
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="card flex flex-col p-7">
              <blockquote className="flex-1 text-[1.05rem] leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6">
                <span className="block font-bold">{t.name}</span>
                <span className="block text-sm" style={{ color: "var(--body)" }}>
                  {t.meta}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

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
            <StoreBadges tone="dark" />
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
