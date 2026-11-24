import Image from "next/image";

/**
 * A real GalenAI app screen, captured from the mobile UI kit (dark theme) with its
 * own phone frame and notch. Files: public/app/*.webp, 600 x 1245, transparent
 * corners. Capture recipe and content rules: docs/v2/APP_SCREENS.md.
 * Render as is: never wrap in PhoneFrame (that would add a second notch).
 */
export type AppScreenName =
  | "home"
  | "tutor-isovolumetric"
  | "tutor-s2"
  | "tutor-troponin"
  | "chat-history"
  | "tutor-modes"
  | "mode-explain"
  | "mode-socratic"
  | "mode-case-based"
  | "mode-quick-qa"
  | "question-bank"
  | "question-bank-answer"
  | "flashcards"
  | "flashcard-front"
  | "flashcard-back"
  | "dashboard"
  | "clinical-case-list"
  | "clinical-case-intro"
  | "clinical-case-step"
  | "guided-lesson-picker"
  | "viva";

export default function AppScreen({
  name,
  alt,
  width = 260,
  priority = false,
  className = "",
}: {
  name: AppScreenName;
  alt: string;
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={`/app/${name}.webp`}
      alt={alt}
      width={600}
      height={1245}
      priority={priority}
      sizes={`${width}px`}
      style={{ width, height: "auto" }}
      className={`drop-shadow-[0_24px_40px_rgba(46,46,46,0.22)] ${className}`}
    />
  );
}
