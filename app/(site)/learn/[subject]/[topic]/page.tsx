import CtaLink from "@/app/components/v2/CtaLink";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLessons, getLesson, subjectName } from "@/lib/learn";
import { buildMetadata, breadcrumbLd, learningResourceLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import LessonEnhancer from "@/app/components/v2/LessonEnhancer";
import LessonCard from "@/app/components/v2/LessonCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ subject: l.subject, topic: l.topic }));
}

type Params = { params: Promise<{ subject: string; topic: string }> };

export async function generateMetadata({ params }: Params) {
  const { subject, topic } = await params;
  const lesson = getLesson(subject, topic);
  if (!lesson) return {};
  const m = lesson.meta;
  return buildMetadata({
    title: (m.metaTitle || m.title).replace(/\s*\|\s*GalenAI\s*$/, ""),
    description: m.metaDescription,
    path: m.path,
    type: "article",
    noindex: !m.isPublished,
    image: firstImage(lesson.html),
  });
}

/** First figure in the lesson, used for the social preview and the structured data. */
const firstImage = (html: string) => html.match(/src="(\/learn-images\/[^"]+)"/)?.[1];

const fmtDate = (d: string) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";

export default async function LessonPage({ params }: Params) {
  const { subject, topic } = await params;
  const lesson = getLesson(subject, topic);
  if (!lesson) notFound();
  const m = lesson.meta;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: subjectName(subject), path: `/learn/${subject}` },
    { name: m.title, path: m.path },
  ];
  const minutes = Math.max(1, Math.round(lesson.words / 200));
  // Other lessons in the same subject: the ones next to this one in the list, so every lesson is linked from several others.
  const siblings = getAllLessons().filter((l) => l.subject === subject && l.isPublished);
  const at = siblings.findIndex((l) => l.topic === topic);
  const related = siblings.length > 1 ? Array.from({ length: Math.min(6, siblings.length - 1) }, (_, i) => siblings[(at + 1 + i) % siblings.length]) : [];

  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd(trail)} />
      <JsonLd
        data={learningResourceLd({
          name: m.title,
          description: m.metaDescription,
          path: m.path,
          subject: subjectName(subject),
          competencyCodes: m.cbmeCodes,
          reviewedBy: m.reviewedBy || undefined,
          dateModified: m.reviewedOn || m.publishDate || undefined,
          datePublished: m.publishDate || undefined,
          image: firstImage(lesson.html),
          minutes,
          keywords: [m.primaryKeyword, ...m.cbmeCodes.map((c) => `NMC ${c}`)].filter(Boolean),
        })}
      />

      <header className="wrap pt-24 pb-8 md:pt-28">
        <Breadcrumbs trail={trail} />
        {!m.isPublished && (
          <p className="lesson-draft" role="note">
            <b>Draft preview.</b> Generated from the GalenAI textbook library and waiting for faculty review. Not
            indexed by search engines.
          </p>
        )}
        <p className="kick">
          {subjectName(subject)}
          {m.phase ? ` · ${m.phase}` : ""}
        </p>
        <h1 className="h1 mt-5 max-w-[18ch]">{m.title}</h1>
        {m.subtitle && <p className="lead mt-6">{m.subtitle}</p>}
        <div className="lesson-chips mt-7">
          {m.cbmeCodes.map((c) => (
            <span key={c} className="lesson-chip lesson-chip-code" title={m.competencyText || "NMC CBME competency"}>
              NMC {c}
            </span>
          ))}
          {m.region && <span className="lesson-chip">{m.region}</span>}
          <span className="lesson-chip">{minutes} min read</span>
          <span className="lesson-chip">6 MCQs · viva · flashcards</span>
        </div>
        <p className="lesson-byline mt-6">
          {m.authorName}
          {m.publishDate ? ` · ${fmtDate(m.publishDate)}` : ""}
          {m.reviewedBy ? ` · Reviewed by ${m.reviewedBy}` : " · Faculty review pending"}
        </p>
      </header>

      <div className="wrap lesson-grid pb-20">
        <LessonEnhancer>
          <article className="lesson-body" dangerouslySetInnerHTML={{ __html: lesson.html }} />
        </LessonEnhancer>

        <aside className="lesson-side">
          <div className="lesson-side-inner">
            {lesson.toc.length > 0 && (
              <nav className="lesson-toc" aria-label="On this page">
                <p className="lesson-toc-h">On this page</p>
                <ol>
                  {lesson.toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>{t.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="lesson-appcard tone-dark">
              <p className="h3">
                Stuck on a step? <span className="acc">Ask the tutor.</span>
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed" style={{ color: "var(--body)" }}>
                GalenAI explains {m.title.toLowerCase()} step by step, then tests you on it.
              </p>
              {m.appPracticeUrl ? (
                <a className="btn btn-primary mt-5 w-full" href={m.appPracticeUrl} rel="noopener">
                  Practise {m.cbmeCodes[0] ?? "this topic"}
                </a>
              ) : (
                <CtaLink intent="download" source={`learn_${subject}_${topic}_sidebar`} label="Get the app" className="mt-5 w-full" />
              )}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="wrap pb-16" aria-labelledby="more-lessons">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 id="more-lessons" className="h2 !text-[clamp(1.5rem,3vw,2.1rem)]">
              More {subjectName(subject).toLowerCase()} <span className="acc">lessons.</span>
            </h2>
            <Link className="font-bold text-[#c94d20] hover:underline" href={`/learn/${subject}`}>
              All {subjectName(subject).toLowerCase()} →
            </Link>
          </div>
          <div className="lesson-cards">
            {related.map((l) => (
              <LessonCard key={l.path} lesson={l} />
            ))}
          </div>
          <p className="mt-8 font-semibold" style={{ color: "var(--body)" }}>
            Preparing for a PG entrance?{" "}
            <Link href="/exams/neet-pg-mcq-practice" className="text-[#2e2e2e] underline decoration-[#eb602d] decoration-2 underline-offset-4">
              Practise free MCQs
            </Link>{" "}
            or read the{" "}
            <Link href="/exams/neet-pg" className="text-[#2e2e2e] underline decoration-[#eb602d] decoration-2 underline-offset-4">
              NEET PG guide
            </Link>
            .
          </p>
        </section>
      )}

      {m.sources.length > 0 && (
        <section className="wrap pb-20">
          <div className="lesson-sources">
            <p className="lesson-toc-h">Sources</p>
            <ul>
              {m.sources.map((s) => (
                <li key={s}>{s.replace(/\s*\(retrieved from the GalenAI library[^)]*\)?/i, "")}</li>
              ))}
              <li>Image credits are given under each figure. All images are openly licensed.</li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
