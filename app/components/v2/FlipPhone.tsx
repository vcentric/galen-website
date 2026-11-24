"use client";

import Image from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * The app's own flashcard screen as a phone you can flip: the question side and the answer side
 * are the two real captures. One button, so it works by tap, click and keyboard.
 */
export default function FlipPhone({ source }: { source: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="flip">
      <button
        type="button"
        className="flip-phone"
        aria-pressed={flipped}
        aria-label={flipped ? "Showing the answer. Flip back to the question" : "Showing the question. Flip the card to see the answer"}
        onClick={() => {
          setFlipped((f) => !f);
          if (!flipped) trackEvent("demo_interaction", { source, demo: "flashcard_flip" });
        }}
      >
        <span className="flip-inner" data-flipped={flipped ? "" : undefined}>
          <Image src="/app/flashcard-front.webp" alt="" width={600} height={1245} sizes="280px" className="flip-face" />
          <Image src="/app/flashcard-back.webp" alt="" width={600} height={1245} sizes="280px" className="flip-face flip-back" />
        </span>
      </button>
      <p className="flip-hint" aria-hidden>
        {flipped ? "Tap to flip back" : "Tap the phone to flip the card"}
      </p>
    </div>
  );
}
