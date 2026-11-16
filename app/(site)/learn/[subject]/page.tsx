import { notFound } from "next/navigation";
import { getAllLessons, subjectName, SUBJECTS } from "@/lib/learn";
import { buildMetadata, breadcrumbLd, itemListLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import LessonCard from "@/app/components/v2/LessonCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...new Set(getAllLessons().map((l) => l.subject))].map((subject) => ({ subject }));
}

type Params = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: Params) {
  const { subject } = await params;
  const lessons = getAllLessons().filter((l) => l.subject === subject);
  return buildMetadata({
    title: `${subjectName(subject)} for MBBS: Free Lessons, MCQs and Viva`,
    description: `Free ${subjectName(subject).toLowerCase()} lessons for MBBS students: one topic per page, mapped to NMC competencies, with diagrams, MCQs, viva questions and flashcards.`,
    path: `/learn/${subject}`,
    noindex: !lessons.some((l) => l.isPublished) || lessons.length < 5,
  });
}

export default async function SubjectHub({ params }: Params) {
  const { subject } = await params;
  const lessons = getAllLessons().filter((l) => l.subject === subject);
  if (!lessons.length) notFound();
  const trail = [
    { name: "Home", path: "/" },
    { name: "Learn", path: "/learn" },
    { name: subjectName(subject), path: `/learn/${subject}` },
  ];
  return (
    <div className="v2 lesson">
      <JsonLd data={[breadcrumbLd(trail), itemListLd(`${subjectName(subject)} lessons for MBBS`, lessons.map((l) => ({ name: l.title, path: l.path })))]} />
      <header className="wrap pt-24 pb-10 md:pt-28">
        <Breadcrumbs trail={trail} />
        <p className="kick">Learn</p>
        <h1 className="h1 mt-5">
          {subjectName(subject)} <span className="acc">lessons.</span>
        </h1>
        <p className="lead mt-6">
          {SUBJECTS[subject]?.blurb} {lessons.length} free lessons for MBBS students, each mapped to its NMC competency, with MCQs, viva
          questions and flashcards.
        </p>
      </header>
      <section className="wrap pb-24">
        <div className="lesson-cards">
          {lessons.map((l) => (
            <LessonCard key={l.path} lesson={l} />
          ))}
        </div>
      </section>
    </div>
  );
}
