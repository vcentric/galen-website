import Link from "next/link";
import { howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import { searchIndex } from "@/content/howto";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import HowToSearch from "@/app/components/v2/HowToSearch";
import { Headline, Kicker, Section } from "@/app/components/v2/ui";

export const metadata = buildMetadata({
  title: "How to Use GalenAI: Guides for Students, Faculty and Administration",
  description:
    "Step-by-step guides to GalenAI for students, faculty and college administration, with screenshots for every feature.",
  path: "/how-to-use",
  noindex: !HOW_TO_LIVE,
});

const BLURB: Record<string, string> = {
  students: "The AI tutor, tutor modes, question bank, flashcards, clinical cases and your dashboard.",
  faculty: "Your calendar, lesson planning, the AI Workspace, Content Bank, assessments and analytics.",
  administration: "Roles, courses and batches, people, the CBME timetable and institute analytics.",
};

/** Help centre hub: search plus a card per role. */
export default function HowToHub() {
  return (
    <div className="v2" data-tone="neutral">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "How to use", path: "/how-to-use" }])} />
      <header className="wrap pt-32 pb-6 md:pt-40">
        <Kicker>Help centre</Kicker>
        <div className="mt-5">
          <Headline text="How to use" accent="GalenAI." />
        </div>
        <p className="lead mt-6">Pick your role. Every guide is a short list of steps with a screenshot for each one.</p>
        <div className="mt-8">
          <HowToSearch index={searchIndex()} />
        </div>
      </header>
      <Section>
        <div className="grid gap-4 lg:grid-cols-3">
          {howToRoleKeys.map((role) => (
            <div key={role} className="card flex flex-col p-7">
              <h2 className="h2 !text-[2rem]">
                <Link href={`/how-to-use/${role}`}>
                  For <span className="acc">{howToRoles[role].label.toLowerCase()}</span>
                </Link>
              </h2>
              <p className="mt-3" style={{ color: "var(--body)" }}>
                {BLURB[role]}
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {howToRoles[role].guides.slice(0, 6).map((g) => (
                  <li key={g.slug}>
                    <Link href={`/how-to-use/${role}/${g.slug}`} className="underline decoration-[#eb602d]/40 underline-offset-4 hover:decoration-[#eb602d]">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/how-to-use/${role}`} className="btn btn-ghost mt-6 self-start">
                All {howToRoles[role].guides.length} guides
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
