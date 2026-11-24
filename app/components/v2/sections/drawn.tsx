import AppScreen from "../AppScreen";
import { CalendarScreen, DrawPhone, LessonGoodScreen, LessonMustScreen, LessonQuizScreen } from "../AppDraw";
import { Headline } from "../ui";
import type { SectionProps } from "./index";

/** Bespoke sections that use drawn app screens, and the custom pictures for the shorter pages. */

function Head({ section }: SectionProps) {
  return (
    <>
      <Headline as="h2" text={section.heading} />
      {section.content?.pill && <span className="pill-soon mt-4">{section.content.pill}</span>}
      {section.content?.intro && <p className="lead mt-4">{section.content.intro}</p>}
    </>
  );
}

const Trio = ({ children }: { children: React.ReactNode }) => <div className="trio">{children}</div>;
const Fig = ({ caption, raised, children }: { caption: string; raised?: boolean; children: React.ReactNode }) => (
  <figure className={raised ? "" : "lg:mt-14"}>
    {children}
    <figcaption className="mt-4 text-center text-sm font-bold" style={{ color: "var(--body)" }}>
      {caption}
    </figcaption>
  </figure>
);

/** /features/guided-lessons: the three parts of a lesson, drawn in the app's dark theme. */
export function GuidedLessonScreens(props: SectionProps) {
  return (
    <>
      <Head {...props} />
      <Trio>
        <Fig caption="Must know">
          <DrawPhone width={250} label="Must know section of a lesson: Phases of the cardiac cycle">
            <LessonMustScreen />
          </DrawPhone>
        </Fig>
        <Fig caption="Good to know" raised>
          <DrawPhone width={290} label="Good to know section: The pressure-volume loop, with materials from the class">
            <LessonGoodScreen />
          </DrawPhone>
        </Fig>
        <Fig caption="Quick quiz">
          <DrawPhone width={250} label="End-of-lesson quiz question on the second heart sound">
            <LessonQuizScreen />
          </DrawPhone>
        </Fig>
      </Trio>
    </>
  );
}

/** /institutions/students: dashboard, the college calendar (drawn) and the question bank, all dark. */
export function StudentPhones(props: SectionProps) {
  return (
    <>
      <Head {...props} />
      <Trio>
        <Fig caption="Dashboard">
          <AppScreen name="dashboard" alt="Student dashboard with progress by competency" width={250} />
        </Fig>
        <Fig caption="College calendar" raised>
          <DrawPhone width={290} label="Faculty lessons on the student calendar">
            <CalendarScreen />
          </DrawPhone>
        </Fig>
        <Fig caption="Question bank">
          <AppScreen name="question-bank-answer" alt="Question bank answer with explanation" width={250} />
        </Fig>
      </Trio>
    </>
  );
}

/* Dashboard: the list beside the real screen, then the focus area drawn large (bars carry no numbers). */
const SUBJECTS: [string, string][] = [
  ["Anatomy", "78%"],
  ["Physiology", "64%"],
  ["Biochemistry", "71%"],
  ["Pathology", "58%"],
  ["Pharmacology", "36%"],
  ["Microbiology", "67%"],
];

export function DashboardSection(props: SectionProps) {
  const items = props.section.content?.items ?? [];
  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <Head {...props} />
          <ol className="fout-list">
            {items.map((it, i) => (
              <li key={it.t}>
                <div className="fout-row">
                  <span className="fout-n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="fout-t">{it.t}</span>
                    {it.b && <span className="fout-b">{it.b}</span>}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex justify-center">
          <AppScreen name="dashboard" alt="GalenAI dashboard (sample data)" width={280} />
        </div>
      </div>
      <div className="focus tone-dark" role="img" aria-label="Your focus area: accuracy by subject, with the weakest subject highlighted and a Practise now button">
        <div aria-hidden>
          <p className="vs-label">{items[1]?.t}</p>
          <p className="focus-h">
            Pharmacology <span className="acc">needs you.</span>
          </p>
          <p className="focus-b">{items[1]?.b}</p>
          <span className="focus-btn">Practise now</span>
        </div>
        <ul aria-hidden className="focus-bars">
          {SUBJECTS.map(([name, w]) => (
            <li key={name} data-weak={name === "Pharmacology" ? "" : undefined}>
              <span>{name}</span>
              <i>
                <u style={{ width: w }} />
              </i>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* Voice viva: the preview screen beside a drawn exchange with a live waveform. Always labelled Coming soon. */
export function VivaPreviewSection(props: SectionProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div>
        <Head {...props} />
        <div className="viva tone-dark" role="img" aria-label="Voice viva preview: the examiner asks a question aloud and you answer by speaking. Coming soon.">
          <p aria-hidden className="viva-who">Examiner</p>
          <p aria-hidden className="viva-q">Why does volume stay the same during isovolumetric contraction?</p>
          <p aria-hidden className="viva-who viva-you">You, speaking</p>
          <p aria-hidden className="viva-wave">
            {Array.from({ length: 36 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${(i % 9) * -0.13}s`, height: `${28 + ((i * 37) % 60)}%` }} />
            ))}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <AppScreen name="viva" alt="Voice viva preview (coming soon)" width={280} />
      </div>
    </div>
  );
}

/* Integrations: what moves from the LMS into GalenAI, drawn, above the three steps. */
export function IntegrationsFlowSection(props: SectionProps) {
  const items = props.section.content?.items ?? [];
  return (
    <>
      <Head {...props} />
      <div className="xfer" role="img" aria-label="Lessons, materials and videos in your LMS become sources for the AI tutor and the faculty workspace in GalenAI">
        <div aria-hidden className="xfer-box">
          <p className="exam-nav-h">Your LMS</p>
          <ul>
            <li>Lessons</li>
            <li>Materials</li>
            <li>Videos</li>
          </ul>
        </div>
        <div aria-hidden className="xfer-line">
          <span>Becomes sources</span>
        </div>
        <div aria-hidden className="xfer-box xfer-ours tone-dark">
          <p className="vs-label">GalenAI</p>
          <ul>
            <li>AI tutor</li>
            <li>Faculty workspace</li>
          </ul>
        </div>
      </div>
      <ol className="strip" data-cols={items.length}>
        {items.map((it, i) => (
          <li key={it.t}>
            <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="strip-t">{it.t}</h3>
            {it.b && <p className="strip-b">{it.b}</p>}
          </li>
        ))}
      </ol>
    </>
  );
}
