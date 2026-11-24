import Link from "next/link";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { ExamBody, ExamHeader, FactTable, VerifiedBox, StatusBanner } from "@/app/components/v2/ExamFacts";
import { EXAM_PAGES_LIVE, NEET_PG_LAST_CHECKED } from "@/lib/exams";

const path = "/exams/neet-pg-eligibility-and-application";
export const metadata = buildMetadata({
  title: "NEET PG Eligibility, Fee and How to Apply",
  description:
    "Who can apply for NEET PG, the exam fee, the four application steps, document and photo rules, and how test cities are chosen, from the official NBEMS bulletin.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path: "/exams/neet-pg" }, { name: "Eligibility and application", path }];
  return (
    <div className="v2 lesson exam">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        trail={trail}
        kick="NEET PG"
        title={<>NEET PG eligibility, fee <span className="acc">and how to apply.</span></>}
        lead="Who can apply, what it costs, and the steps of the online form, from the official NBEMS bulletin. Most mistakes happen in the form, so read the rules below before you start."
      >
        <StatusBanner checked={NEET_PG_LAST_CHECKED} />
      </ExamHeader>

      <ExamBody
        path={path}
        source={
          <VerifiedBox
            source="NEET PG 2026 information bulletin, NBEMS"
            href="https://natboard.edu.in/viewnbeexam?exam=neetpg"
            pages="Eligibility, pages 27 to 31; Fee, pages 24 to 25; Application instructions, pages 51 to 79 and 110 to 119"
            verified={NEET_PG_LAST_CHECKED}
            note="This is the bulletin for the 2026 exam. Eligibility, fees and dates can change in the 2027 bulletin."
          />
        }
      >
          <h2>Who can apply</h2>
          <h3>Indian MBBS graduates</h3>
          <ul>
            <li>An MBBS degree or provisional MBBS pass certificate recognised under the NMC Act, 2019 and the Postgraduate Medical Education Regulations, 2023.</li>
            <li>Permanent or provisional registration of the MBBS qualification with NMC (or the earlier MCI) or a State Medical Council.</li>
            <li>One year of internship completed, or likely to be completed, on or before 30 September 2026 (the 2026 cut-off). Requests from candidates who finish internship after the cut-off are rejected.</li>
          </ul>
          <h3>Foreign medical graduates (Indian citizens and OCI)</h3>
          <p>
            You must have qualified the Foreign Medical Graduate Examination (screening test), be registered with NMC or a State Medical Council, and
            have completed or be likely to complete internship by the cut-off date. Bring the original FMGE pass certificate on exam day.
          </p>
          <h3>Foreign nationals</h3>
          <p>
            Your basic medical qualification must be recognised by NMC as equivalent to MBBS. Where Ministry of Home Affairs security clearance is
            required, get it before applying. NEET PG is mandatory for foreign nationals seeking admission to medical courses in India.
          </p>
          <p>
            <b>Not stated in the bulletin:</b> a limit on the number of attempts, an age limit and a minimum MBBS mark. Eligibility on the form is
            provisional, and NBEMS does not verify what you enter at the time of application. The counselling authority checks your documents later.
          </p>

          <h2>Fee</h2>
          <FactTable
            rows={[
              ["General, OBC, EWS", "Rs 3,500"],
              ["SC, ST, PwBD", "Rs 2,500"],
              ["How to pay", "Online only, through the payment gateway (UPI or Indian bank cards)"],
              ["Refund", "None, and not carried forward to any later exam. The application cannot be withdrawn."],
              ["Duplicate payment", "The excess is refunded after the window closes, which can take two to three months"],
            ]}
          />
          <p>Your form is complete only when the payment status shows S (successful). Take a printout with the transaction ID.</p>

          <h2>How to apply: four steps</h2>
          <ol>
            <li><b>Register as a new user</b> on natboard.edu.in with your name, email, Aadhaar and mobile number. Your name must match your MBBS certificate. None of these can be changed later. Your email is verified with an OTP.</li>
            <li><b>Fill in the form</b> and upload your photograph, signature, thumb impression and the documents asked for.</li>
            <li><b>Choose three Test States</b> and pay the fee.</li>
            <li><b>Submit</b> after the declaration and save the printout showing payment status S.</li>
          </ol>
          <p>Each candidate can submit only one application. Apply only on the official site, and do not share your login or OTP with anyone.</p>

          <h2>Photo, signature and thumb rules</h2>
          <ul>
            <li><b>Photograph:</b> taken within three months, colour, white background, face filling 70 to 80% of the frame, no spectacles, cap or selfie, under 80 KB, .jpg or .jpeg. The form also takes a live webcam photo.</li>
            <li><b>Signature:</b> your full signature, not initials, in blue or black ink inside a 3.5 cm by 1.5 cm box on blank white paper, under 80 KB, .jpg or .jpeg.</li>
            <li><b>Thumb impression:</b> left thumb, clear and not smudged, under 80 KB.</li>
          </ul>
          <p>Wrong images can get the application rejected. If NBEMS flags a deficient image, there is one selective edit window to fix it and no further chance after that.</p>

          <h2>Edit window</h2>
          <p>
            After the application window closes, a short edit window lets you change most details. Name, nationality, email, mobile number, Aadhaar
            details, correspondence address and Test State preferences cannot be changed. If your category changes to a higher fee, you pay the
            difference. If it changes to a lower fee, there is no refund.
          </p>

          <h2>Choosing your test city</h2>
          <ul>
            <li>You choose three preferred Test States. The first must be the state of your correspondence address.</li>
            <li>Cities are not given first come, first served. NBEMS allots by a computerised random sequence, then by your preference, subject to availability.</li>
            <li>If nothing is available in your states, you can be placed anywhere in India. Requests to change city or centre are not entertained.</li>
            <li>There is no test centre in Chandigarh. Chandigarh addresses are treated as Punjab.</li>
          </ul>

          <p>
            Next: <Link href="/exams/neet-pg-exam-pattern-and-syllabus">exam pattern and syllabus</Link> and the{" "}
            <Link href="/exams/neet-pg-preparation-guide">preparation guide</Link>.
          </p>
      </ExamBody>
    </div>
  );
}
