import Link from "next/link";
import type { LessonMeta } from "@/lib/learn";

export default function LessonCard({ lesson: l }: { lesson: LessonMeta }) {
  return (
    <Link href={l.path} className="lesson-card">
      <span className="lesson-card-top">
        {l.cbmeCodes[0] && <span className="lesson-chip lesson-chip-code">NMC {l.cbmeCodes[0]}</span>}
        {!l.isPublished && <span className="pill-soon">Draft</span>}
      </span>
      <span className="h3 block mt-4">{l.title}</span>
      <span className="block mt-3 text-[0.95rem] leading-relaxed" style={{ color: "var(--body)" }}>
        {l.subtitle}
      </span>
      <span className="lesson-card-go">Read the lesson →</span>
    </Link>
  );
}
