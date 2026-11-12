import CtaLink from "./CtaLink";
import QrBlock from "./QrBlock";
import StoreBadges from "./StoreBadges";
import { Headline, Kicker } from "./ui";

/**
 * Body of /download and /qr. Server-rendered: store links are plain anchors, so the
 * page works with JavaScript off and crawlers can see where it leads.
 */
export default function DownloadPanel({ source }: { source: string }) {
  return (
    <section className="wrap pt-40 pb-20 md:pt-48">
      <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Kicker>Get the app</Kicker>
          <div className="mt-5">
            <Headline text="Get GalenAI on your" accent="phone." />
          </div>
          <p className="lead mt-6">
            The AI tutor, question bank, flashcards and clinical cases for MBBS, on iPhone and Android.
          </p>
          <div className="mt-8">
            <StoreBadges />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="font-semibold" style={{ color: "var(--body)" }}>
              On a laptop?
            </span>
            <CtaLink intent="try-web" source={source} variant="ghost" />
          </div>
        </div>
        <div className="hidden md:flex justify-center lg:justify-end">
          <QrBlock size={168} />
        </div>
      </div>
    </section>
  );
}
