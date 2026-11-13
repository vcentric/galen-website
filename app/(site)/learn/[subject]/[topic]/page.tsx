import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLessons, getLesson, subjectName } from "@/lib/learn";
import { buildMetadata, breadcrumbLd, learningResourceLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import LessonEnhancer from "@/app/components/v2/LessonEnhancer";

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
  });
}

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
          dateModified: m.reviewedOn || m.publishDate,
        })}
      />

      <header className="wrap pt-28 pb-8 md:pt-36">
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
                <Link className="btn btn-primary mt-5 w-full" href="/download">
                  Get the app
                </Link>
              )}
            </div>
          </div>
        </aside>
      </div>

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
