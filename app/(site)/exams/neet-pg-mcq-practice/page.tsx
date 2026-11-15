import { getAllMcqs, getAllLessons, subjectName } from "@/lib/learn";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import { ExamHeader } from "@/app/components/v2/ExamFacts";
import { mcqPageIndexable } from "@/lib/exams";
import McqPractice from "@/app/components/v2/McqPractice";

const path = "/exams/neet-pg-mcq-practice";
const lessons = getAllLessons();
const anyReviewed = lessons.some((l) => l.isPublished);
const indexable = mcqPageIndexable(anyReviewed);
// When the page is public, serve reviewed questions only. Drafts are visible only while the page is noindex.
const mcqs = getAllMcqs(indexable);

export const metadata = buildMetadata({
  title: "Free MCQ Practice for NEET PG, INI-CET and FMGE Preparation",
  description:
    "Free MCQ practice built from GalenAI lessons, mapped to NMC competencies, with an explanation for every answer and a link to practise more in the app.",
  path,
  noindex: !indexable, // stays hidden until faculty have reviewed the lesson MCQs
});

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path: "/exams/neet-pg" }, { name: "MCQ practice", path }];
  const subjects = [...new Set(mcqs.map((q) => q.subject))].map((key) => ({ key, name: subjectName(key) }));
  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        kick="Practice"
        title={<>Free MCQ practice, <span className="acc">with explanations.</span></>}
        lead="Questions come from GalenAI lessons on basic medical subjects. Pick a subject, answer, and read why. Every question links back to its lesson."
      >
        <div className="mt-6"><Breadcrumbs trail={trail} /></div>
        {!indexable && (
          <p className="lesson-draft" role="note">
            <b>Draft preview.</b> These questions have not been reviewed by faculty yet. Not indexed by search engines.
          </p>
        )}
      </ExamHeader>
      <div className="wrap pb-20">
        <McqPractice mcqs={mcqs} subjects={subjects} />
      </div>
    </div>
  );
}
