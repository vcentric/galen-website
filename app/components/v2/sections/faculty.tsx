import Image from "next/image";
import Link from "next/link";
import { FACULTY_STEPS } from "@/content/site/faculty-steps";
import FacultySteps from "../FacultySteps";
import { Headline } from "../ui";
import type { SectionProps } from "./index";

/** Bespoke sections for /institutions/faculty. Copy comes from the page spec; only the layout is custom. */

function Head({ section }: SectionProps) {
  return (
    <>
      <Headline as="h2" text={section.heading} />
      {section.content?.intro && <p className="lead mt-4">{section.content.intro}</p>}
    </>
  );
}

export function WindowFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="fsteps-window">
      <div className="inst-hero-bar" aria-hidden>
        <i />
        <i />
        <i />
        <span>faculty.galenai.io</span>
      </div>
      {children}
    </div>
  );
}

/** The three panes of the workspace, named under the place they sit in the screenshot. */
const PANES = [
  ["Sources", "Your own references"],
  ["Chat", "Answers that cite them"],
  ["Studio", "Teaching material from them"],
];

export function FacultyWorkspaceSection(props: SectionProps) {
  const screen = props.section.content!.screens![0];
  return (
    <>
      <Head {...props} />
      <figure className="fws">
        <WindowFrame>
          <Image src={screen.src} alt={screen.alt} width={1800} height={1125} sizes="(min-width: 1180px) 1100px, 92vw" className="h-auto w-full" />
        </WindowFrame>
        <figcaption className="fws-panes" aria-hidden>
          {PANES.map(([name, what]) => (
            <p key={name}>
              <b>{name}</b>
              <span>{what}</span>
            </p>
          ))}
        </figcaption>
      </figure>
    </>
  );
}

/** One framed desktop screen under its heading (these captures have no browser bar of their own). */
export function FacultyScreenSection(props: SectionProps) {
  const screen = props.section.content!.screens![0];
  return (
    <>
      <Head {...props} />
      <div className="mt-10">
        <WindowFrame>
          <Image src={screen.src} alt={screen.alt} width={1800} height={1125} sizes="(min-width: 1180px) 1100px, 92vw" className="h-auto w-full" />
        </WindowFrame>
      </div>
    </>
  );
}

export function FacultyStepsSection(props: SectionProps) {
  return (
    <>
      <Head {...props} />
      {/* This section sits on the lighter band, so the pinned screen on phones takes that band's colour. */}
      <div style={{ "--fsteps-bg": "#fffaf4" } as React.CSSProperties}>
        <FacultySteps steps={FACULTY_STEPS} />
      </div>
    </>
  );
}

export function FacultyOutputsSection(props: SectionProps) {
  const items = props.section.content!.items ?? [];
  return (
    <div className="fout">
      <div>
        <Head {...props} />
        <ol className="fout-list">
          {items.map((it, i) => {
            const inner = (
              <>
                <span className="fout-n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="fout-t">{it.t}</span>
                  <span className="fout-b">{it.b}</span>
                </span>
                {it.href && (
                  <span aria-hidden className="fout-go">
                    →
                  </span>
                )}
              </>
            );
            return (
              <li key={it.t}>
                {it.href ? (
                  <Link href={it.href} className="fout-row">
                    {inner}
                  </Link>
                ) : (
                  <div className="fout-row">{inner}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      <div className="fout-art">
        <Image
          src="/brand/ui/panel_studio.webp"
          alt="The Studio panel: Assessment, Slides, Mind map and Flashcards, with the material already generated listed below"
          width={600}
          height={1050}
          sizes="320px"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
