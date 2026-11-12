import Link from "next/link";
import { features } from "@/content/site";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import CtaLink from "@/app/components/v2/CtaLink";
import { Headline, Kicker, Section } from "@/app/components/v2/ui";

export const metadata = buildMetadata({
  title: "Features: AI Tutor, Question Bank, Flashcards, Clinical Cases",
  description:
    "Everything in GalenAI: an AI tutor with five teaching modes, question bank, flashcards, clinical cases, guided lessons and a dashboard that shows your weak topics.",
  path: "/features",
  noindex: true, // TODO(exec): remove when the hub is built and staticRoutes "/features" is live
});

/** Features hub. Skeleton: links every feature page so nothing is orphaned. */
export default function FeaturesHub() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
  ];
  return (
    <div className="v2">
      <JsonLd data={breadcrumbLd(trail)} />
      <header className="wrap pt-32 md:pt-40 pb-6">
        <Kicker>Features</Kicker>
        <div className="mt-5">
          <Headline text="Ask. Practise." accent="Revise." />
        </div>
        <p className="lead mt-6">
          One app for MBBS: a tutor that explains, practice that shows your gaps, and revision that sticks.
        </p>
        <div className="mt-8">
          <CtaLink intent="download" source="features_hub_hero" />
        </div>
      </header>
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.slug}>
              <Link href={f.path} className="card block h-full p-6">
                <h2 className="h3">{f.kicker}</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--body)" }}>
                  {f.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        {/* TODO(exec): group as Ask / Practise / Revise / For faculty, with a screen per card. */}
      </Section>
    </div>
  );
}
