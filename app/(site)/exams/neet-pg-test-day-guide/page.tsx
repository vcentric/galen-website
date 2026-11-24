import Link from "next/link";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { ExamBody, ExamHeader, FactTable, VerifiedBox, StatusBanner } from "@/app/components/v2/ExamFacts";
import { EXAM_PAGES_LIVE, NEET_PG_LAST_CHECKED } from "@/lib/exams";

const path = "/exams/neet-pg-test-day-guide";
export const metadata = buildMetadata({
  title: "NEET PG Test Day: Reporting Time, Documents, Rules",
  description:
    "What to carry, when to reach the centre and what is not allowed on NEET PG test day, from the NBEMS bulletin, plus how to use the 42 minutes in each section.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path: "/exams/neet-pg" }, { name: "Test day guide", path }];
  return (
    <div className="v2 lesson exam">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        trail={trail}
        kick="NEET PG"
        title={<>NEET PG test day, <span className="acc">step by step.</span></>}
        lead="The rules that catch candidates out are about documents, reporting time and what you cannot carry. They come from the official bulletin. The last section covers how to spend your time inside the exam."
      >
        <StatusBanner checked={NEET_PG_LAST_CHECKED} />
      </ExamHeader>

      <ExamBody
        path={path}
        source={
          <VerifiedBox
            source="NEET PG 2026 information bulletin, NBEMS"
            href="https://natboard.edu.in/viewnbeexam?exam=neetpg"
            pages="Scheme of NEET-PG 2026, pages 32 to 34; admit card and test day procedures, pages 36 to 50; challenge window, page 90"
            verified={NEET_PG_LAST_CHECKED}
            note="This is the 2026 bulletin. Timings and rules can change, so read the admit card and the bulletin for the cycle you are in."
          />
        }
      >
          <h2>The day, by the clock (2026 schedule)</h2>
          <FactTable
            rows={[
              ["Entry and registration open", "7:00 AM"],
              ["Entry closes at the centre", "8:30 AM"],
              ["Login access", "8:45 AM"],
              ["Login to read instructions", "8:50 AM"],
              ["Exam", "9:00 AM to 12:30 PM"],
            ]}
          />
          <p>
            The reporting counter closes 30 minutes before the test starts, and late candidates are not allowed in under any circumstances. No extra
            time is given for delays in attendance or identity checks.
          </p>

          <h2>What to carry</h2>
          <ul>
            <li>A printed <b>colour</b> copy of your barcoded admit card.</li>
            <li>One <b>original</b> photo ID with your photograph: PAN card, driving licence, voter ID, passport or Aadhaar card. The name must match your admit card. Photocopies and DigiLocker copies are not accepted.</li>
            <li>A photocopy of your permanent or provisional NMC, MCI or State Medical Council registration. The centre keeps it.</li>
            <li>If you claim a scribe or extra time: your disability certificate, and prior NBEMS approval.</li>
            <li>Foreign medical graduates: the original FMGE pass certificate. Foreign nationals: the original passport and proof of medical registration in their country.</li>
          </ul>
          <p>Keep your Aadhaar biometric authentication unlocked on exam day.</p>

          <h2>What you cannot carry</h2>
          <p>
            Stationery, calculators, pens, notes, phones, earphones, smartwatches and health bands, ornaments, wallets, handbags, belts, caps, eatables
            and water bottles are not allowed. There is no storage for belongings, so leave them at home. No rough paper or pen is given.
            Friends and relatives are not allowed inside the premises.
          </p>

          <h2>Security and identity checks</h2>
          <p>
            Expect a metal detector, frisking and an ear inspection. Your finger biometrics, Face ID and photograph are captured at registration, at
            each bio-break and during the exam.
          </p>

          <h2>If something goes wrong in the exam</h2>
          <ul>
            <li>If there is a technical disruption, the timer stops and resumes, so you do not lose allotted time.</li>
            <li>You can challenge a question only for technical errors, within two calendar days of the exam.</li>
            <li>Questions found technically incorrect or ambiguous in the review give full marks to all candidates who appeared.</li>
          </ul>

          <h2>Using your time inside the exam</h2>
          <p>
            The paper has five timed sections of 36 questions and 42 minutes each. That is about 70 seconds a question. This is arithmetic from the
            bulletin, not advice from NBEMS. Some practical points follow from the rules:
          </p>
          <ul>
            <li>When a section ends you cannot return to it, so decide in the section whether a question is worth more time.</li>
            <li>Use mark for review within the section. It only helps inside the same section.</li>
            <li>A right answer earns 4 marks and a wrong one costs 1, so a guess pays off on average whenever your chance of being right is above 20% (4 × p − 1 × (1 − p) is positive when p is above 0.2). If you can rule out two options, your chance is 50% and a guess is clearly worth it. A blind guess among four options (25%) is only slightly positive on average and swings a lot, so leave a question you cannot narrow down at all.</li>
          </ul>
          <p>
            Practise under these conditions with the <Link href="/exams/neet-pg-mcq-practice">practice questions</Link>, and read the{" "}
            <Link href="/exams/neet-pg-preparation-guide">preparation guide</Link> for a plan.
          </p>
      </ExamBody>
    </div>
  );
}
