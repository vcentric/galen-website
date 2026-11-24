import Image from "next/image";
import QuizChatDemo from "../QuizChatDemo";
import { Headline } from "../ui";
import type { SectionProps } from "./index";

/** Bespoke sections for /features/ai-quiz-generator. Copy comes from the page spec; only the layout is custom. */

/** Students: the three steps as a ruled list, beside a quiz you can answer, drawn as it arrives in the chat. */
export function QuizStudentsSection({ spec, section }: SectionProps) {
  const items = section.content?.items ?? [];
  return (
    <div className="qz">
      <div>
        <Headline as="h2" text={section.heading} />
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
      <QuizChatDemo source={`${spec.path.replace(/\//g, "_").slice(1)}_demo`} ask="Give me 5 questions on heart sounds" />
    </div>
  );
}

/** Faculty: the text beside the Generate assessment screen, which runs off the edge on wide screens. */
export function QuizFacultySection({ section }: SectionProps) {
  return (
    <div className="qzf">
      <div>
        <Headline as="h2" text={section.heading} />
        {section.content?.intro && <p className="lead mt-4">{section.content.intro}</p>}
      </div>
      <div className="qzf-stage">
        <div className="fsteps-window">
          <div className="inst-hero-bar" aria-hidden>
            <i />
            <i />
            <i />
            <span>faculty.galenai.io</span>
          </div>
          <Image
            src="/brand/ui/desktop_generate_assessment.webp"
            alt="Generate assessment panel in the AI Workspace: how students take it, which sources to write from, competencies and number of questions"
            width={1800}
            height={1125}
            sizes="(min-width: 1024px) 800px, 92vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
