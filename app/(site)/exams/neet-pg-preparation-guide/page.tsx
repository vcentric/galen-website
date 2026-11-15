import Link from "next/link";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs } from "@/app/components/v2/ui";
import { ExamHeader, FactTable, VerifiedBox, StatusBanner } from "@/app/components/v2/ExamFacts";
import { EXAM_PAGES_LIVE, NEET_PG_LAST_CHECKED } from "@/lib/exams";

const path = "/exams/neet-pg-preparation-guide";
export const metadata = buildMetadata({
  title: "How to Start NEET PG Preparation: A Plan by Months Left",
  description:
    "Where to start NEET PG preparation: set up around the real exam format, a plan for 12, 9, 6, 3 and 1 months left, a study loop for each topic, a sample week, mock test routine and common mistakes.",
  path,
  noindex: !EXAM_PAGES_LIVE,
});

export default function Page() {
  const trail = [{ name: "Home", path: "/" }, { name: "NEET PG guide", path: "/exams/neet-pg" }, { name: "Preparation guide", path }];
  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd(trail)} />
      <ExamHeader
        kick="NEET PG"
        title={<>How to start NEET PG <span className="acc">preparation.</span></>}
        lead="A practical plan for where to begin, what to do at each stage, and how to study each topic. The exam facts come from the NBEMS bulletin. The study advice is general guidance, not an official recommendation."
      >
        <div className="mt-6"><Breadcrumbs trail={trail} /></div>
        <StatusBanner checked={NEET_PG_LAST_CHECKED} />
      </ExamHeader>

      <div className="wrap pb-16">
        <article className="lesson-body" style={{ maxWidth: "46rem" }}>
          <h2>Step 0: set up around the real exam</h2>
          <p>Plan your preparation around what the exam actually is. The 2026 bulletin sets these rules:</p>
          <FactTable
            rows={[
              ["Questions", "180 multiple choice questions, 4 options each, English only"],
              ["Time", "3 hours 30 minutes, in five timed sections of 36 questions and 42 minutes"],
              ["Marking", "+4 for a right answer, -1 for a wrong answer, 0 if you skip"],
              ["Syllabus", "The NMC MBBS curriculum. There is no separate topic list and no official subject-wise weightage."],
            ]}
          />
          <p>Three things follow from this:</p>
          <ul>
            <li><b>Any MBBS topic can come up</b>, so breadth matters. Do not skip a subject because it seems small.</li>
            <li><b>You need speed.</b> About 70 seconds per question means you must recognise a topic quickly, which comes from practice questions, not only reading.</li>
            <li><b>Wrong answers cost marks</b>, so learn to tell &quot;I know this&quot; from &quot;I half know this&quot; and keep a record of which one each question was.</li>
          </ul>
          <p>
            Read <Link href="/exams/neet-pg-exam-pattern-and-syllabus">the full exam pattern</Link> and{" "}
            <Link href="/exams/neet-pg-eligibility-and-application">eligibility and application</Link> once, early. Then you will not meet a surprise in
            the application month.
          </p>

          <h2>Step 1: pick your timeline</h2>
          <p>
            NBEMS has not announced the 2027 exam date. Plan backwards from the month you think is most likely, and keep a few weeks of slack. The
            2026 exam was on 30 August, with applications in July.
          </p>
          <div className="ltable">
            <table>
              <thead>
                <tr><th>Months left</th><th>What to focus on</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>12 or more</td>
                  <td>Build understanding. One careful pass through every subject, starting with the ones that explain others (physiology, biochemistry, pathology, pharmacology, microbiology). Make short notes only for things you keep forgetting. Start 10 to 20 practice questions a day from the first week.</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Finish the first pass of the clinical subjects. Do subject-wise question sets right after each subject. Keep an error log. Revise the first subjects you studied.</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Second pass at higher speed. Questions become most of your day. Start full-length mock tests every two weeks, in the real format (five blocks of 36 questions, 42 minutes each).</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Mocks every week. After each mock, spend as long on the analysis as on the test. Revise from your error log and flashcards. Stop starting new resources.</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Revision only. Two or three full mocks, light daily revision of weak areas, and sleep. Check your admit card, ID and test centre.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Step 2: use a study loop for every topic</h2>
          <ol>
            <li><b>Learn it once</b> from a single good source. For basic subjects, a GalenAI <Link href="/learn">lesson</Link> gives you the topic, its NMC competency and a clear explanation.</li>
            <li><b>Close it and recall.</b> Say or write the key points from memory. Flashcards are for this.</li>
            <li><b>Test yourself the same day</b> with questions on that topic. Read the explanation for every question, including the ones you got right.</li>
            <li><b>Log your errors.</b> For each wrong or guessed question, write one line: the fact you missed and why (did not know, misread, careless, ran out of time).</li>
            <li><b>Come back</b> after about a day, a week and a month. Repeated recall spaced over time holds up better than rereading the same text.</li>
          </ol>

          <h2>A sample week</h2>
          <p>A starting template for a day of 8 to 9 study hours. Adjust it around your duty hours if you are still an intern.</p>
          <div className="ltable">
            <table>
              <thead>
                <tr><th>Block</th><th>Mon to Fri</th><th>Saturday</th><th>Sunday</th></tr>
              </thead>
              <tbody>
                <tr><td>Morning (3 hrs)</td><td>New topics, one subject</td><td>New topics</td><td>Mock test, 3.5 hrs</td></tr>
                <tr><td>Afternoon (2.5 hrs)</td><td>Questions on the same topics, error log</td><td>Questions on the week&apos;s topics</td><td>Analyse the mock</td></tr>
                <tr><td>Evening (2 hrs)</td><td>Revise earlier topics, flashcards</td><td>Weak-area revision</td><td>Light revision, rest</td></tr>
              </tbody>
            </table>
          </div>

          <h2>Step 3: mock tests that teach you something</h2>
          <ul>
            <li>Sit the whole paper in one go: 180 questions, 3.5 hours, no phone, no breaks except as the exam allows.</li>
            <li>Respect the section timing. When 42 minutes are up, move on, as you will on exam day.</li>
            <li>Afterwards sort every wrong or skipped question into one of four groups: did not know, forgot, misread, ran out of time. The fix for each is different.</li>
            <li>Track the guesses too. A guess that was right is still a gap.</li>
            <li>Do not judge yourself by one score. Look at the trend over four or five mocks.</li>
          </ul>

          <h2>Using GalenAI with this plan</h2>
          <ul>
            <li>Browse <Link href="/learn">lessons</Link> by subject. Each one maps to an NMC competency and ends with 6 MCQs, viva questions and flashcards. More subjects are being added.</li>
            <li>Use the <Link href="/exams/neet-pg-mcq-practice">free practice questions</Link> for quick sets by subject.</li>
            <li>In the <Link href="/download">GalenAI app</Link>, practise the full question bank by competency, and use the AI tutor to go through the questions you got wrong.</li>
          </ul>

          <h2>Mistakes to avoid</h2>
          <ul>
            <li><b>Too many resources.</b> Pick one main source per subject and finish it before adding another.</li>
            <li><b>Only reading.</b> If you have not tested yourself on a topic, you do not know whether you know it.</li>
            <li><b>Leaving practice questions for later.</b> Start them in the first month.</li>
            <li><b>Starting mocks too late.</b> Time pressure is a skill. Practise it for months, not weeks.</li>
            <li><b>Skipping the error log.</b> The same mistakes come back otherwise.</li>
            <li><b>Ignoring sleep and breaks.</b> Memory depends on both. A plan you can sustain beats a heroic one you drop in week three.</li>
          </ul>

          <h2>What to do this week</h2>
          <ol>
            <li>Read the <Link href="/exams/neet-pg-exam-pattern-and-syllabus">exam pattern</Link> and write your own month-by-month plan from the table above.</li>
            <li>Choose your first subject and do one lesson from <Link href="/learn">the lesson hub</Link> with the loop above.</li>
            <li>Start your error log. A simple note on your phone is enough.</li>
          </ol>
        </article>
      </div>

      <section className="wrap pb-20">
        <VerifiedBox
          source="NEET PG 2026 information bulletin, NBEMS"
          href="https://natboard.edu.in/viewnbeexam?exam=neetpg"
          pages="exam pattern facts in Step 0 are from the Scheme of NEET-PG 2026, pages 32 and 33"
          verified={NEET_PG_LAST_CHECKED}
          note="The study plan itself is general guidance written by GalenAI, not an NBEMS recommendation."
        />
      </section>
    </div>
  );
}
