import Link from "next/link";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { ExamHeader } from "@/app/components/v2/ExamFacts";
import { EXAM_GUIDE, EXAM_PAGES_LIVE, NEET_PG_LAST_CHECKED } from "@/lib/exams";

const path = "/exams";
export const metadata = buildMetadata({
  title: "Exam Guides: NEET PG and FMGE",
  description:
    "Plain guides to NEET PG and FMGE: exam pattern, eligibility, application, preparation, test day and results, with every exam fact taken from the official NBEMS bulletin.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

/** What each page of the NEET PG guide answers. Same wording as the "Your path, step by step" list on /exams/neet-pg. */
const WHAT: Record<string, string> = {
  "/exams/neet-pg": "What NEET PG is and how a cycle runs",
  "/exams/neet-pg-exam-pattern-and-syllabus": "Understand the exam",
  "/exams/neet-pg-eligibility-and-application": "Check you are eligible and know how to apply",
  "/exams/neet-pg-preparation-guide": "Build your preparation plan",
  "/exams/neet-pg-mcq-practice": "Practise questions and learn from the explanations",
  "/exams/neet-pg-test-day-guide": "Know what happens on test day",
  "/exams/neet-pg-result-and-counselling": "Understand result, percentile and counselling",
};

/** From the NEET PG 2026 bulletin, as shown on the exam pattern page. */
const NEET_FACTS: [string, string][] = [
  ["180", "multiple choice questions"],
  ["3 h 30 min", "in five timed sections"],
  ["+4 / −1", "right answer / wrong answer"],
];

const APP_PAGES: [string, string][] = [
  ["GalenAI for NEET PG", "/for/neet-pg"],
  ["GalenAI for INI-CET", "/for/inicet"],
  ["GalenAI for FMGE", "/for/fmge"],
];

export default function ExamsHub() {
  const trail = [{ name: "Home", path: "/" }, { name: "Exam guides", path }];
  const [neet, fmge] = EXAM_GUIDE;
  return (
    <div className="v2 lesson exam">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        trail={trail}
        kick="Exam guides"
        title={<>NEET PG and FMGE, <span className="acc">explained.</span></>}
        lead="Plain guides to the exams after MBBS. Every exam fact is taken from the official NBEMS bulletin, and each page says which bulletin and when we last checked it."
      />

      <div className="exam-band">
      <section className="wrap exam-hub">
        <div className="exam-hub-head">
          <span className="happening-n">01</span>
          <h2 className="lidx-name">NEET PG</h2>
          <p className="lidx-blurb">One exam decides most MD, MS and PG Diploma seats in India.</p>
          <dl className="exam-hub-facts">
            {NEET_FACTS.map(([n, l]) => (
              <div key={l}>
                <dt>{n}</dt>
                <dd>{l}</dd>
              </div>
            ))}
          </dl>
          <p className="exam-hub-note">From the NEET PG 2026 bulletin. Last checked {NEET_PG_LAST_CHECKED}.</p>
        </div>
        <ol className="exam-hub-list">
          {neet.pages.map((p, i) => (
            <li key={p.path}>
              <Link href={p.path} className="exam-hub-row">
                <span className="fout-n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="fout-t">{p.label}</span>
                  <span className="fout-b">{WHAT[p.path]}</span>
                </span>
                <span aria-hidden className="fout-go">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap exam-hub">
        <div className="exam-hub-head">
          <span className="happening-n">02</span>
          <h2 className="lidx-name">FMGE</h2>
          <p className="lidx-blurb">The FMGE bulletin publishes a subject-wise marks blueprint, so the guide can show real numbers.</p>
        </div>
        <ol className="exam-hub-list">
          {fmge.pages.map((p, i) => (
            <li key={p.path}>
              <Link href={p.path} className="exam-hub-row">
                <span className="fout-n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="fout-t">{p.label}</span>
                  <span className="fout-b">Subjects, marks per subject and how the paper is set</span>
                </span>
                <span aria-hidden className="fout-go">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap exam-hub exam-hub-last">
        <div className="exam-hub-head">
          <span className="happening-n">03</span>
          <h2 className="lidx-name">Prepare with GalenAI</h2>
          <p className="lidx-blurb">How the app fits each exam.</p>
        </div>
        <ul className="exam-hub-list">
          {APP_PAGES.map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="exam-hub-row exam-hub-row-plain">
                <span className="fout-t">{label}</span>
                <span aria-hidden className="fout-go">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      </div>
    </div>
  );
}
