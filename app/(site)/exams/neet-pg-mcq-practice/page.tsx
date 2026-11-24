import { getAllMcqs, getAllLessons, subjectName } from "@/lib/learn";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { ExamBody, ExamHeader } from "@/app/components/v2/ExamFacts";
import { mcqPageIndexable } from "@/lib/exams";
import McqPractice from "@/app/components/v2/McqPractice";

const path = "/exams/neet-pg-mcq-practice";
const lessons = getAllLessons();
const anyReviewed = lessons.some((l) => l.isPublished);
const indexable = mcqPageIndexable(anyReviewed);
// When the page is public, serve reviewed questions only. Drafts are visible only while the page is noindex.
const mcqs = getAllMcqs(indexable);

export const metadata = buildMetadata({
  title: "Free NEET PG MCQ Practice with Explanations",
  description:
    "Free MCQ practice for NEET PG, INI-CET and FMGE, built from GalenAI lessons and mapped to NMC competencies, with an explanation for every answer.",
  path,
  noindex: !indexable, // stays hidden until faculty have reviewed the lesson MCQs
});

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path: "/exams/neet-pg" }, { name: "MCQ practice", path }];
  const subjects = [...new Set(mcqs.map((q) => q.subject))].map((key) => ({ key, name: subjectName(key) }));
  return (
    <div className="v2 lesson exam">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        trail={trail}
        kick="Practice"
        title={<>Free MCQ practice, <span className="acc">with explanations.</span></>}
        lead="Questions come from GalenAI lessons on basic medical subjects. Pick a subject, answer, and read why. Every question links back to its lesson."
      >
        {!indexable && (
          <p className="exam-status" role="note">
            <b>Preview.</b> This page is not indexed by search engines yet.
          </p>
        )}
      </ExamHeader>
      <ExamBody path={path} plain>
        <McqPractice mcqs={mcqs} subjects={subjects} />
      </ExamBody>
    </div>
  );
}
