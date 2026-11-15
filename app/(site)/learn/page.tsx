import Link from "next/link";
import { getAllLessons, subjectName, SUBJECTS } from "@/lib/learn";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import LessonCard from "@/app/components/v2/LessonCard";

const lessons = getAllLessons();

export const metadata = buildMetadata({
  title: "Learn: Free MBBS Lessons Mapped to NMC Competencies",
  description:
    "Free MBBS lessons in anatomy, physiology, biochemistry, pathology, pharmacology and microbiology, with diagrams, MCQs, viva questions and flashcards.",
  path: "/learn",
  noindex: !lessons.some((l) => l.isPublished),
});

/** /learn hub: every subject that has lessons, with its lesson cards. */
export default function LearnHub() {
  const subjects = Object.keys(SUBJECTS).filter((s) => lessons.some((l) => l.subject === s));
  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Learn", path: "/learn" }])} />
      <header className="wrap pt-28 pb-10 md:pt-36">
        <p className="kick">Free MBBS lessons</p>
        <h1 className="h1 mt-5 max-w-[16ch]">
          Learn the topic, then <span className="acc">test yourself.</span>
        </h1>
        <p className="lead mt-6">
          Each lesson covers one topic from the MBBS syllabus, with diagrams where we have a good open one, six MCQs,
          viva questions and flashcards.{lessons.some((l) => l.isPublished) ? " Reviewed by faculty." : " These lessons are drafts waiting for faculty review."}
        </p>
        <nav className="lesson-chips mt-8" aria-label="Subjects">
          {subjects.map((s) => (
            <a key={s} className="lesson-chip" href={`#${s}`}>
              {subjectName(s)}
            </a>
          ))}
        </nav>
      </header>
      {subjects.map((s) => (
        <section key={s} id={s} className="wrap pb-16">
          <div className="flex items-end justify-between gap-4 mb-6">
            <h2 className="h2">{subjectName(s)}</h2>
            <Link className="font-bold text-[#c94d20] hover:underline" href={`/learn/${s}`}>
              All {subjectName(s).toLowerCase()} →
            </Link>
          </div>
          <div className="lesson-cards">
            {lessons
              .filter((l) => l.subject === s)
              .map((l) => (
                <LessonCard key={l.path} lesson={l} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
