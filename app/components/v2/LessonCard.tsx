import Link from "next/link";
import type { LessonMeta } from "@/lib/learn";

/**
 * One lesson as a cell in a ruled grid (see .lesson-cards): competency code and region on top,
 * the topic as the headline, what the lesson covers, and what comes with it. The whole cell is the link.
 */
export default function LessonCard({ lesson: l }: { lesson: LessonMeta }) {
  return (
    <Link href={l.path} className="lesson-card">
      <span className="lesson-card-top">
        {l.cbmeCodes[0] && <span className="lesson-card-code">NMC {l.cbmeCodes[0]}</span>}
        {!l.isPublished ? <span className="pill-soon">Draft</span> : l.region && <span className="lesson-card-region">{l.region}</span>}
      </span>
      <span className="lesson-card-title">{l.title}</span>
      <span className="lesson-card-sub">{l.subtitle}</span>
      <span className="lesson-card-foot">
        <span>6 MCQs · viva · flashcards</span>
        <span className="lesson-card-go">
          <span className="sr-only">Read the lesson</span>
          <span aria-hidden>→</span>
        </span>
      </span>
    </Link>
  );
}
