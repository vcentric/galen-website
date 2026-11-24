import { getAllLessons, subjectName, SUBJECTS } from "@/lib/learn";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import LessonIndex from "@/app/components/v2/LessonIndex";

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
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Home", path: "/" }, { name: "Learn", path: "/learn" }]),
          itemListLd("Free MBBS lessons", lessons.map((l) => ({ name: l.title, path: l.path }))),
        ]}
      />
      <header className="wrap pt-28 pb-10 md:pt-36">
        <p className="kick">Free MBBS lessons</p>
        <h1 className="h1 mt-5 max-w-[16ch]">
          Learn the topic, then <span className="acc">test yourself.</span>
        </h1>
        <p className="lead mt-6">
          Each lesson covers one topic from the MBBS syllabus, with diagrams where we have a good open one, six MCQs,
          viva questions and flashcards.{lessons.some((l) => l.reviewedBy) ? " Reviewed by faculty." : ""}
        </p>
      </header>
      <LessonIndex
        subjects={subjects.map((s) => ({
          id: s,
          name: subjectName(s),
          blurb: SUBJECTS[s]?.blurb ?? "",
          lessons: lessons
            .filter((l) => l.subject === s)
            .map((l) => ({ path: l.path, title: l.title, subtitle: l.subtitle, code: l.cbmeCodes[0], draft: !l.isPublished })),
        }))}
      />
    </div>
  );
}
