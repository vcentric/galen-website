import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { ExamBody, ExamHeader, FactTable, VerifiedBox, StatusBanner } from "@/app/components/v2/ExamFacts";
import { EXAM_PAGES_LIVE, NEET_PG_LAST_CHECKED } from "@/lib/exams";

const path = "/exams/neet-pg-result-and-counselling";
export const metadata = buildMetadata({
  title: "NEET PG Result, Percentile Cut-off and Counselling",
  description:
    "How NEET PG scores become rank and percentile, the qualifying percentile by category, tie-breakers, and who runs counselling, from the official NBEMS bulletin.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path: "/exams/neet-pg" }, { name: "Result and counselling", path }];
  return (
    <div className="v2 lesson exam">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        trail={trail}
        kick="NEET PG"
        title={<>NEET PG result, percentile <span className="acc">and counselling.</span></>}
        lead="Your score becomes a rank and a percentile. Then a different body takes over. This page explains both, using only what the NBEMS bulletin says."
      >
        <StatusBanner checked={NEET_PG_LAST_CHECKED} />
      </ExamHeader>

      <ExamBody
        path={path}
        source={
          <VerifiedBox
            source="NEET PG 2026 information bulletin, NBEMS"
            href="https://natboard.edu.in/viewnbeexam?exam=neetpg"
            pages="Introduction, pages 5 to 8; Result, pages 89 to 98; Counseling and reservation, pages 99 to 105"
            verified={NEET_PG_LAST_CHECKED}
            note="This is the 2026 bulletin. Cut-offs and policies can change; the 2027 bulletin and the MCC bulletin govern the next cycle."
          />
        }
      >
          <h2>What you get after the exam</h2>
          <ul>
            <li>A score card, which you can download from your login for six months after the result.</li>
            <li>Your NEET PG rank, the merit position among all candidates who appeared.</li>
            <li>Your percentile.</li>
          </ul>
          <p>
            The result is announced on natboard.edu.in. In 2026 the bulletin said by 30 September 2026. The answer key and each candidate&apos;s marked
            responses are published on the NBEMS website, following a Supreme Court order of 29 April 2025. There is no re-evaluation, rechecking or
            re-totalling.
          </p>

          <h2>How the percentile is worked out</h2>
          <p>
            Percentile = 100 × (number of candidates whose total score is less than or equal to yours) ÷ (total number of candidates who appeared).
          </p>

          <h2>Qualifying percentile</h2>
          <FactTable
            rows={[
              ["General and EWS", "50th percentile"],
              ["General PwBD", "45th percentile"],
              ["SC, ST and OBC (including their PwBD)", "40th percentile"],
            ]}
          />
          <p>
            Qualifying does not by itself give you a seat. The bulletin says that states and MCC set their own eligibility for All India 50% quota
            and state seats.
          </p>

          <h2>If two candidates have the same score</h2>
          <ol>
            <li>Fewer wrong answers across the whole paper.</li>
            <li>Fewer wrong answers in Section A, then Section B, then C, then D, then E.</li>
            <li>A higher aggregate percentage across all MBBS professional examinations (the FMGE percentage for foreign graduates).</li>
            <li>The older date of birth.</li>
          </ol>

          <h2>Who runs counselling</h2>
          <p>
            NBEMS hands the result to the counselling authority and has no role in counselling or seat allotment.
          </p>
          <FactTable
            rows={[
              ["MCC (DGHS, Ministry of Health)", "50% All India Quota seats, 100% of deemed and central university seats, and 100% of all-India open DNB seats. Website: mcc.nic.in"],
              ["State counselling authorities", "State quota and in-service seats, with state ranks, category ranks and local benefits decided by the state"],
              ["Armed Forces Medical Services", "Ten institutions listed in the bulletin. You must register with MCC to be considered, and there is no SC, ST, OBC or PwBD reservation in these seats."],
            ]}
          />
          <p>
            Keep your score card and admit card for counselling. Use the same email ID and mobile number you gave NBEMS, because they carry over to the
            counselling forms. The category and PwBD status in your NBEMS form is not changed by MCC at counselling.
          </p>

          <h2>Institutes outside NEET PG</h2>
          <p>
            The bulletin says centralised MD and MS admission through NEET PG does not cover AIIMS New Delhi and the other AIIMS, PGIMER Chandigarh,
            JIPMER Puducherry, NIMHANS Bengaluru and Sree Chitra Tirunal Institute. Those institutes admit through their own entrance exam.
          </p>

          <h2>Reservation notes</h2>
          <ul>
            <li>OBC reservation is for the OBC non-creamy layer, as per the central list.</li>
            <li>Candidates claiming NRI, OCI or PIO status are treated as unreserved and are not eligible for SC, ST, OBC or EWS reservation.</li>
            <li>PwBD candidates get 5% reservation in the 50% All India Quota and central universities.</li>
            <li>The full All India Quota reservation policy is in the MCC bulletin, not the NBEMS one.</li>
            <li>The bulletin does not give a seat matrix. Look for it on the MCC and state websites.</li>
          </ul>
      </ExamBody>
    </div>
  );
}
