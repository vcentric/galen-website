import Link from "next/link";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import { ExamHeader, FactTable, VerifiedBox, StatusBanner } from "@/app/components/v2/ExamFacts";
import { EXAM_PAGES_LIVE, NEET_PG_LAST_CHECKED } from "@/lib/exams";

const path = "/exams/neet-pg-exam-pattern-and-syllabus";
export const metadata = buildMetadata({
  title: "NEET PG Exam Pattern and Syllabus (2026 Bulletin)",
  description:
    "NEET PG exam pattern and syllabus from the NBEMS bulletin: 180 MCQs, 3 hours 30 minutes, +4 and -1 marking, five timed sections, and how the syllabus is set.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

const SUBJECTS: [string, string][] = [
  ["Anatomy", "/learn/anatomy"],
  ["Physiology", "/learn/physiology"],
  ["Biochemistry", "/learn/biochemistry"],
  ["Pathology", "/learn/pathology"],
  ["Microbiology", "/learn/microbiology"],
  ["Pharmacology", "/learn/pharmacology"],
];

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path: "/exams/neet-pg" }, { name: "NEET PG exam pattern and syllabus", path }];
  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        kick="NEET PG"
        title={<>NEET PG 2026 exam pattern <span className="acc">and syllabus.</span></>}
        lead="Everything on this page is taken from the official NBEMS information bulletin for NEET PG 2026. Where the bulletin does not say something, this page does not either."
      >
        <div className="mt-6"><Breadcrumbs trail={trail} /></div>
        <StatusBanner checked={NEET_PG_LAST_CHECKED} />
      </ExamHeader>

      <div className="wrap pb-16">
        <article className="lesson-body" style={{ maxWidth: "46rem" }}>
          <h2>Exam pattern at a glance</h2>
          <FactTable
            rows={[
              ["Exam date (2026 session)", "30 August 2026, in a single shift"],
              ["Mode", "Computer-based test, in a single day"],
              ["Questions", "180 multiple choice questions, each with 4 response options"],
              ["Language", "English only"],
              ["Time allowed", "3 hours 30 minutes"],
              ["Correct answer", "4 marks"],
              ["Wrong answer", "1 mark deducted"],
              ["Unattempted question", "Zero marks"],
              ["Maximum marks", "720 (180 questions at 4 marks each)"],
              ["Sections", "Five time-bound sections, A to E, of 36 questions each, 42 minutes per section"],
            ]}
          />
          <p>
            Maximum marks are worked out here from the bulletin&apos;s question count and marks per question; the bulletin states the
            marking scheme but does not print the total.
          </p>

          <h2>How the timed sections work</h2>
          <ul>
            <li>The paper is split into five sections, A to E. Each has 36 questions and 42 minutes.</li>
            <li>You cannot move to the next section until the time for the current section is over.</li>
            <li>Once a section&apos;s time ends, you cannot review or change your answers in it.</li>
            <li>The next section starts on its own when the previous one ends.</li>
            <li>You can mark any question, attempted or not, for review and come back to it, but only within the same section. A question marked for review is still marked as answered or not.</li>
            <li>The bulletin notes that the actual number of timed sections may vary with the total number of questions and practical arrangements.</li>
          </ul>

          <h2>How ties are broken</h2>
          <p>If two or more candidates score the same, the bulletin applies these in order, with fewer wrong answers ranking higher each time:</p>
          <ol>
            <li>Fewer wrong answers across the whole paper.</li>
            <li>Fewer wrong answers in Section A, then Section B, then C, then D, then E.</li>
            <li>After that, the bulletin goes on to marks in the MBBS professional examinations. Read that clause in the bulletin before relying on it.</li>
          </ol>

          <h2>Syllabus</h2>
          <p>
            The bulletin defines the syllabus in one line: the syllabus for the exam comprises the subjects and knowledge areas in the
            MBBS curriculum issued by the National Medical Commission (and the Medical Council of India before it). There is no separate
            topic list in the bulletin, and it does not give subject-wise weightage. This page therefore does not publish one.
          </p>
          <p>
            The practical reading: any topic in the NMC competency-based MBBS curriculum can be asked. GalenAI lessons are mapped to NMC
            competency codes so you can see which part of the curriculum a topic covers.
          </p>
          <h3>Start with the basic subjects on GalenAI</h3>
          <ul>
            {SUBJECTS.map(([n, href]) => (
              <li key={n}>
                <Link href={href}>{n} lessons</Link>
              </li>
            ))}
          </ul>
          <p>
            Want to test yourself? <Link href="/exams/neet-pg-mcq-practice">Try the practice questions</Link> or{" "}
            <Link href="/download">get the app</Link>.
          </p>
        </article>
      </div>

      <section className="wrap pb-20">
        <VerifiedBox
          source="NEET PG 2026 information bulletin, NBEMS"
          href="https://natboard.edu.in/viewnbeexam?exam=neetpg"
          pages="section 5, Scheme of NEET-PG 2026, bulletin pages 32 and 33; tie-breaker criteria, pages 92 and 93"
          verified={NEET_PG_LAST_CHECKED}
          note="This is the bulletin for the 30 August 2026 exam. When NBEMS publishes the next bulletin, check it before relying on these numbers."
        />
      </section>
    </div>
  );
}
