import Link from "next/link";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import { ExamHeader, FactTable, VerifiedBox } from "@/app/components/v2/ExamFacts";
import { EXAM_PAGES_LIVE } from "@/lib/exams";

const path = "/exams/fmge-syllabus-and-pattern";
export const metadata = buildMetadata({
  title: "FMGE Syllabus, Subject-wise Marks and Exam Pattern",
  description:
    "FMGE exam pattern, pass mark and the official subject-wise marks from the NBEMS bulletin: 300 MCQs in two parts, no negative marking, 150 out of 300 to pass.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

const PRE: [string, number][] = [
  ["Anatomy", 17], ["Physiology", 17], ["Biochemistry", 17], ["Pathology", 13], ["Microbiology", 13], ["Pharmacology", 13], ["Forensic Medicine", 10],
];
const CLIN: [string, string, number][] = [
  ["Medicine and allied", "Medicine", 33], ["Medicine and allied", "Psychiatry", 5], ["Medicine and allied", "Dermatology and STD", 5], ["Medicine and allied", "Radiotherapy", 5],
  ["General Surgery and allied", "General Surgery", 32], ["General Surgery and allied", "Anaesthesiology", 5], ["General Surgery and allied", "Orthopaedics", 5], ["General Surgery and allied", "Radiodiagnosis", 5],
  ["Paediatrics", "Paediatrics", 15], ["Ophthalmology", "Ophthalmology", 15], ["Otorhinolaryngology", "Otorhinolaryngology", 15],
  ["Obstetrics and Gynaecology", "Obstetrics and Gynaecology", 30], ["Community Medicine", "Community Medicine", 30],
];

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "FMGE", path: "/for/fmge" }, { name: "FMGE syllabus and pattern", path }];
  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        kick="FMGE"
        title={<>FMGE syllabus, marks <span className="acc">and pattern.</span></>}
        lead="The FMGE bulletin publishes a subject-wise marks blueprint, so this page can show real numbers. Everything below is from the official NBEMS bulletin."
      >
        <div className="mt-6"><Breadcrumbs trail={trail} /></div>
      </ExamHeader>

      <div className="wrap pb-16">
        <article className="lesson-body" style={{ maxWidth: "46rem" }}>
          <h2>Exam pattern at a glance</h2>
          <FactTable
            rows={[
              ["Papers", "One paper of 300 multiple choice questions, taken on a computer"],
              ["Options per question", "4, in English only"],
              ["Parts", "Two parts in a single day, 150 questions each, 150 minutes each, with a scheduled break between them"],
              ["Part I timing (June 2026 session)", "9:00 AM to 11:30 AM"],
              ["Part II timing (June 2026 session)", "2:00 PM to 4:30 PM"],
              ["Timed sections", "Each part is split into timed sections. The bulletin gives the example of three sections of 50 questions and 50 minutes. Once a section ends you cannot go back to it."],
              ["Negative marking", "None"],
              ["Pass mark", "At least 150 marks out of 300"],
              ["Part-wise marks", "Not published. Only the pass or fail result is shown."],
              ["Attempts", "No limit, but once you qualify you cannot take FMGE again"],
              ["Re-evaluation", "No re-totalling, re-evaluation or grace marks"],
            ]}
          />

          <h2>Subject-wise marks (official blueprint)</h2>
          <p>
            The syllabus is the NMC competency-based MBBS curriculum. The bulletin adds this blueprint, which shows how the 300 marks are
            shared between subjects.
          </p>
          <h3>Pre-clinical and para-clinical subjects: 100 marks</h3>
          <div className="ltable">
            <table>
              <thead><tr><th>Subject</th><th>Marks</th></tr></thead>
              <tbody>
                {PRE.map(([s, m]) => (<tr key={s}><td>{s}</td><td>{m}</td></tr>))}
                <tr><th scope="row">Total</th><td>100</td></tr>
              </tbody>
            </table>
          </div>
          <h3>Clinical subjects: 200 marks</h3>
          <div className="ltable">
            <table>
              <thead><tr><th>Group</th><th>Subject</th><th>Marks</th></tr></thead>
              <tbody>
                {CLIN.map(([g, s, m]) => (<tr key={s}><td>{g}</td><td>{s}</td><td>{m}</td></tr>))}
                <tr><th scope="row" colSpan={2}>Total</th><td>200</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Where to start</h2>
          <p>
            Anatomy, physiology and biochemistry are worth 17 marks each, more than any other pre-clinical subject, and each of them has
            GalenAI lessons mapped to NMC competencies:
          </p>
          <ul>
            <li><Link href="/learn/anatomy">Anatomy lessons</Link></li>
            <li><Link href="/learn/physiology">Physiology lessons</Link></li>
            <li><Link href="/learn/biochemistry">Biochemistry lessons</Link></li>
          </ul>
          <p>
            Test yourself with the <Link href="/exams/neet-pg-mcq-practice">practice questions</Link>, or <Link href="/download">get the app</Link>.
          </p>
        </article>
      </div>

      <section className="wrap pb-20">
        <VerifiedBox
          source="FMGE June 2026 information bulletin, NBEMS"
          href="https://natboard.edu.in/viewnbeexam?exam=fmge"
          pages="section 5, Scheme of FMG Examination, bulletin pages 36 to 38; section 12, Syllabus and Exam Blue Print, page 98"
          verified="15 November 2026"
          note="This is the bulletin for the June 2026 session (exam on 28 June 2026). Timings and details can change between sessions, so read the bulletin for the session you are applying to."
        />
      </section>
    </div>
  );
}
