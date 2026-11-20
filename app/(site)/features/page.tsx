import Image from "next/image";
import Link from "next/link";
import { features } from "@/content/site";
import type { PageSpec } from "@/content/site/types";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import JsonLd from "@/app/components/v2/JsonLd";
import CtaLink from "@/app/components/v2/CtaLink";
import FeatureIndex, { type FeatureGroup } from "@/app/components/v2/FeatureIndex";
import type { AppScreenName } from "@/app/components/v2/AppScreen";
import QrBlock from "@/app/components/v2/QrBlock";
import StickyMobileCta from "@/app/components/v2/StickyMobileCta";
import StoreBadges from "@/app/components/v2/StoreBadges";
import { Kicker } from "@/app/components/v2/ui";

export const metadata = buildMetadata({
  title: "Features: AI Tutor, Question Bank, Flashcards",
  description:
    "Everything in GalenAI: an AI tutor with five teaching modes, question bank, flashcards, clinical cases, guided lessons and a dashboard for your weak topics.",
  path: "/features",
});

const SPACE = "font-[family-name:var(--font-space-var)]";

/**
 * The student app, in the order of the approved line "Ask. Practise. Revise.".
 * Each entry is a feature slug and the app screen (public/app) shown for it.
 * A feature page that is not listed here appears in the AI tools band below, so nothing is orphaned.
 */
const CHAPTERS: { id: string; word: string; line: string; rows: [slug: string, screen: AppScreenName][] }[] = [
  {
    id: "ask",
    word: "Ask.",
    line: "An AI tutor for every doubt",
    rows: [
      ["ai-tutor", "tutor-s2"],
      ["tutor-modes", "tutor-modes"],
      ["guided-lessons", "guided-lesson-picker"],
    ],
  },
  {
    id: "practise",
    word: "Practise.",
    line: "Questions and cases that test you",
    rows: [
      ["question-bank", "question-bank-answer"],
      ["clinical-cases", "clinical-case-step"],
      ["voice-viva", "viva"],
    ],
  },
  {
    id: "revise",
    word: "Revise.",
    line: "Flashcards and a map of your gaps",
    rows: [
      ["flashcards", "flashcard-front"],
      ["dashboard", "dashboard"],
    ],
  },
];

const SOON = / · Coming soon$/;
const nameOf = (f: PageSpec) => f.kicker.replace(SOON, "");
const promiseOf = (f: PageSpec) => `${f.h1} ${f.h1Accent}`.trim();

/** Features hub: the three-word index of the student app, then the AI tools for teaching. */
export default function FeaturesHub() {
  const bySlug = new Map(features.map((f) => [f.slug, f]));
  const groups: FeatureGroup[] = CHAPTERS.map((c) => ({
    id: c.id,
    word: c.word,
    line: c.line,
    rows: c.rows.flatMap(([slug, screen]) => {
      const f = bySlug.get(slug);
      return f ? [{ path: f.path, name: nameOf(f), promise: promiseOf(f), description: f.description, screen, soon: SOON.test(f.kicker) }] : [];
    }),
  }));
  const listed = new Set(CHAPTERS.flatMap((c) => c.rows.map(([slug]) => slug)));
  const tools = features.filter((f) => !listed.has(f.slug));
  const trail = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
  ];

  return (
    <div className="v2">
      <JsonLd data={[breadcrumbLd(trail), itemListLd("GalenAI features", features.map((f) => ({ name: nameOf(f), path: f.path })))]} />

      <FeatureIndex groups={groups}>
        <header className="pb-[clamp(3.5rem,9vw,7rem)] pt-28 md:pt-36">
          {/* The approved line as the headline. Each word jumps to its part of the index. */}
          <h1 className={`${SPACE} text-[clamp(3.75rem,17vw,7rem)] font-bold leading-[0.86] tracking-[-0.055em] xl:text-[8.5rem]`}>
            {CHAPTERS.map((c, i) => (
              <a key={c.id} href={`#${c.id}`} className={`block w-fit ${i === CHAPTERS.length - 1 ? "acc" : "hover:text-[#c94d20]"}`}>
                {c.word}
              </a>
            ))}
          </h1>
          <p className="lead mt-8">One app for MBBS: a tutor that explains, practice that shows your gaps, and revision that sticks.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink intent="download" source="features_hub_hero" />
            <CtaLink intent="try-web" source="features_hub_hero" variant="ghost" />
          </div>
        </header>
      </FeatureIndex>

      {/* AI tools for teaching: the generator pages, on the dark grid with the faculty workspace. */}
      {tools.length > 0 && (
        <section id="create" className="tone-dark overflow-hidden">
          <div className="wrap grid items-center gap-x-16 gap-y-14 py-[clamp(4rem,10vw,7.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div>
              <Kicker>Create with AI</Kicker>
              <h2 className="h1 mt-5 !text-[clamp(2.4rem,6vw,4.25rem)]">
                AI drafts.
                <br />
                Faculty <span className="acc">review.</span>
              </h2>
              <p className="lead mt-6">Turn a topic or your own references into quizzes, flashcards, mind maps and lesson plans.</p>
              <ol className="mt-10">
                {tools.map((f) => (
                  <li key={f.slug} className="border-t-[3px] last:border-b-[3px]" style={{ borderColor: "var(--rule)" }}>
                    <Link href={f.path} className="group flex items-center justify-between gap-6 py-5">
                      <span className="min-w-0">
                        <span className={`${SPACE} block text-[1.35rem] font-bold leading-tight tracking-[-0.025em] group-hover:text-[#eb602d]`}>{nameOf(f)}</span>
                        <span className="mt-1 block text-[0.95rem] font-semibold" style={{ color: "var(--body)" }}>
                          {promiseOf(f)}
                        </span>
                      </span>
                      <span aria-hidden className={`${SPACE} text-xl font-bold text-[#eb602d] transition-transform duration-200 group-hover:translate-x-1`}>
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-wrap gap-3">
                <CtaLink intent="faculty-live" source="features_hub_create" />
                <CtaLink intent="demo" source="features_hub_create" variant="ghost" />
              </div>
            </div>
            <div className="relative lg:-mr-[clamp(0rem,6vw,7rem)]">
              <Image
                src="/brand/ui/desktop_ai_workspace.webp"
                alt="The GalenAI AI Workspace: faculty sources, chat with citations and the Studio"
                width={1800}
                height={1125}
                sizes="(min-width: 1024px) 680px, 92vw"
                className="h-auto w-full rounded-[18px] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              />
              <Image
                src="/brand/ui/panel_generate_lesson_content.webp"
                alt="Generate lesson content panel: written only from your reference library, drafts only"
                width={900}
                height={1226}
                sizes="220px"
                className="absolute -bottom-10 -left-6 hidden h-auto w-[34%] rounded-[16px] shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:block"
              />
            </div>
          </div>
        </section>
      )}

      <section className="wrap py-[clamp(4rem,10vw,7.5rem)]">
        <div className="flex flex-wrap items-end justify-between gap-10">
          <div>
            <h2 className="h1">
              All in one <span className="acc">app.</span>
            </h2>
            <p className="lead mt-5">{SITE.studentLine} iPhone, Android and web.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink intent="download" source="features_hub_final" />
              <CtaLink intent="try-web" source="features_hub_final" variant="ghost" />
            </div>
            <div className="mt-6">
              <StoreBadges source="features_hub_final_badge" />
            </div>
          </div>
          <QrBlock className="hidden lg:flex" size={176} big />
        </div>
      </section>

      <StickyMobileCta intent="download" source="features_hub" />
    </div>
  );
}
