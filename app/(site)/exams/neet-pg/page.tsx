import { AppLink } from "@/app/components/v2/CtaLink";
import Link from "next/link";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import { ExamHeader, FactTable, VerifiedBox, StatusBanner } from "@/app/components/v2/ExamFacts";
import { EXAM_PAGES_LIVE, NEET_PG_LAST_CHECKED } from "@/lib/exams";

const path = "/exams/neet-pg";
export const metadata = buildMetadata({
  title: "NEET PG Guide: Exam, Dates, Application, Prep",
  description:
    "A plain guide to NEET PG: what it is, how a cycle runs from application to counselling, the exam pattern, and where to start preparing. From the NBEMS bulletin.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

const STEPS: [string, string, string][] = [
  ["1", "Understand the exam", "/exams/neet-pg-exam-pattern-and-syllabus"],
  ["2", "Check you are eligible and know how to apply", "/exams/neet-pg-eligibility-and-application"],
  ["3", "Build your preparation plan", "/exams/neet-pg-preparation-guide"],
  ["4", "Practise questions and learn from the explanations", "/exams/neet-pg-mcq-practice"],
  ["5", "Know what happens on test day", "/exams/neet-pg-test-day-guide"],
  ["6", "Understand result, percentile and counselling", "/exams/neet-pg-result-and-counselling"],
];

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path }];
  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        kick="NEET PG guide"
        title={<>NEET PG, <span className="acc">start to finish.</span></>}
        lead="One exam decides most MD, MS and PG Diploma seats in India. This guide covers what it is, how a cycle runs, and how to start preparing, with every exam fact taken from the official NBEMS bulletin."
      >
        <div className="mt-6"><Breadcrumbs trail={trail} /></div>
        <StatusBanner checked={NEET_PG_LAST_CHECKED} />
      </ExamHeader>

      <div className="wrap pb-16">
        <article className="lesson-body" style={{ maxWidth: "46rem" }}>
          <h2>What NEET PG is</h2>
          <p>
            NEET PG is the National Eligibility cum Entrance Test for postgraduate medical courses. According to the 2026 bulletin it is a single
            eligibility-cum-ranking exam for MD, MS and PG Diploma seats, Post MBBS DNB, direct 6-year DrNB and NBEMS Post MBBS Diploma courses.
            The exam is conducted by the National Board of Examinations in Medical Sciences (NBEMS).
          </p>
          <p>
            NBEMS only conducts the exam and declares the result. It has no role in counselling or seat allotment, which are run by the Medical
            Counselling Committee (MCC) and by state authorities.
          </p>

          <h2>A cycle at a glance (2026 dates as the example)</h2>
          <FactTable
            rows={[
              ["Application window", "1 July 2026 (5:00 PM) to 21 July 2026 (11:55 PM)"],
              ["Edit window", "25 to 28 July 2026"],
              ["Test city shown", "11 August 2026"],
              ["Admit card", "27 August 2026"],
              ["Exam", "30 August 2026, one shift, computer-based"],
              ["Result", "By 30 September 2026"],
              ["Internship completion cut-off", "30 September 2026"],
            ]}
          />
          <p>
            These are the 2026 dates. NBEMS has not published 2027 dates as of {NEET_PG_LAST_CHECKED}. If the 2027 cycle follows a similar order,
            you would apply first, then edit, get a test city, get an admit card, sit the exam and wait for the result. Do not plan around a date
            until NBEMS publishes it.
          </p>

          <h2>Your path, step by step</h2>
          <ol>
            {STEPS.map(([, label, href]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ol>

          <h2>Where GalenAI helps</h2>
          <ul>
            <li><Link href="/learn">Lessons</Link> mapped to NMC competencies, each with MCQs, viva questions and flashcards.</li>
            <li><Link href="/exams/neet-pg-mcq-practice">Free practice questions</Link> with an explanation for every answer.</li>
            <li><AppLink intent="download" source="exam_neet_pg_inline">The GalenAI app</AppLink> for the full question bank and the AI tutor.</li>
          </ul>
        </article>
      </div>

      <section className="wrap pb-20">
        <VerifiedBox
          source="NEET PG 2026 information bulletin, NBEMS"
          href="https://natboard.edu.in/viewnbeexam?exam=neetpg"
          pages="Important Dates, page 2; Introduction, pages 5 to 8"
          verified={NEET_PG_LAST_CHECKED}
          note="This is the bulletin for the 30 August 2026 exam. When NBEMS publishes the 2027 bulletin, these dates and numbers will change."
        />
      </section>
    </div>
  );
}
