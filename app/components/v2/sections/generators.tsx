import Image from "next/image";
import type { ComponentType } from "react";
import { FACULTY_STEPS } from "@/content/site/faculty-steps";
import FacultySteps from "../FacultySteps";
import FlipPhone from "../FlipPhone";
import { Headline } from "../ui";
import { WindowFrame } from "./faculty";
import type { SectionProps } from "./index";

/**
 * Bespoke sections for the AI generator pages (flashcards, mind map, lesson plan).
 * Copy comes from each page spec; these supply the layout and the current-design screens.
 */

const UI = "/brand/ui";
type Shot = { src: string; alt: string };

function Head({ section }: SectionProps) {
  return (
    <>
      <Headline as="h2" text={section.heading} />
      {section.content?.intro && <p className="lead mt-4">{section.content.intro}</p>}
    </>
  );
}

function Steps({ section }: SectionProps) {
  return (
    <ol className="fout-list">
      {(section.content?.items ?? []).map((it, i) => (
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
  );
}

const Window = ({ shot, sizes }: { shot: Shot; sizes: string }) => (
  <WindowFrame>
    <Image src={shot.src} alt={shot.alt} width={1800} height={1125} sizes={sizes} className="h-auto w-full" />
  </WindowFrame>
);

/** Heading, then one large framed screen. */
const framed = (shot: Shot): ComponentType<SectionProps> =>
  function FramedScreen(props) {
    return (
      <>
        <Head {...props} />
        <div className="mt-10">
          <Window shot={shot} sizes="(min-width: 1180px) 1100px, 92vw" />
        </div>
      </>
    );
  };

/** Heading and the steps as a ruled list on one side, the screen where it happens on the other. */
const stepsBeside = (shot: Shot): ComponentType<SectionProps> =>
  function StepsBesideScreen(props) {
    return (
      <div className="qzf">
        <div>
          <Head {...props} />
          <Steps {...props} />
        </div>
        <div className="qzf-stage">
          <Window shot={shot} sizes="(min-width: 1024px) 800px, 92vw" />
        </div>
      </div>
    );
  };

/* Flashcards */
export function FlashStudentsSection(props: SectionProps) {
  return (
    <div className="qz qz-phone">
      <div>
        <Head {...props} />
        <Steps {...props} />
      </div>
      <FlipPhone source={`${props.spec.path.replace(/\//g, "_").slice(1)}_demo`} />
    </div>
  );
}
export const FlashDeckSection = framed({
  src: `${UI}/desktop_flashcard_deck.webp`,
  alt: "A published flashcard deck in the Content Bank: card 1 of 10 in Study view, with To review and Got it",
});
export const FlashHowSection = stepsBeside({
  src: `${UI}/desktop_generate_flashcards.webp`,
  alt: "Generate flashcards panel in the AI Workspace: competencies, an optional focus, number of cards and the sources to use",
});

/* Mind map */
export const MindMapSection = framed({
  src: `${UI}/desktop_mind_map.webp`,
  alt: "A generated mind map of the cardiac cycle with branches for phases, valve events, pressures, volumes and heart sounds",
});
export const MindMapHowSection = stepsBeside({
  src: `${UI}/desktop_generate_mind_map.webp`,
  alt: "Generate mind map panel in the AI Workspace: competencies, an optional focus and the sources to use",
});

/* Lesson plan */
export const LessonFormSection = framed({
  src: `${UI}/desktop_new_lesson.webp`,
  alt: "New lesson form: topic, lesson format, what to prepare and the references it is based on",
});

/** The page's own six steps (its wording), each with the screen that shows it. */
const LESSON_SHOTS: Shot[] = [
  FACULTY_STEPS[0],
  FACULTY_STEPS[1],
  { src: `${UI}/desktop_lessons_list.webp`, alt: "First-year lessons list with what each lesson covers and its materials" },
  { src: `${UI}/desktop_lesson_page.webp`, alt: "A drafted lesson with Must know, Good to know and Nice to know sections, ready to review" },
  { src: `${UI}/desktop_lesson_published.webp`, alt: "A published lesson with its slides, assessment and flashcards marked Published" },
  FACULTY_STEPS[5],
];
export function LessonStepsSection(props: SectionProps) {
  const steps = (props.section.content?.items ?? []).map((it, i) => ({ title: it.t, body: it.b ?? "", ...LESSON_SHOTS[i] }));
  return (
    <>
      <Head {...props} />
      <div style={{ "--fsteps-bg": "#fffaf4" } as React.CSSProperties}>
        <FacultySteps steps={steps} />
      </div>
    </>
  );
}
