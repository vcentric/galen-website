import { howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import { searchIndex } from "@/content/howto";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import HowToIndex from "@/app/components/v2/HowToIndex";
import { Headline, Kicker } from "@/app/components/v2/ui";
import { CONTACT, LINKS } from "@/lib/site";

export const metadata = buildMetadata({
  title: "How to Use GalenAI: Student and Faculty Guides",
  description:
    "Step-by-step guides to GalenAI for students, faculty and college administration, with screenshots for every feature, from the AI tutor to CBME analytics.",
  path: "/how-to-use",
  noindex: !HOW_TO_LIVE,
});

const BLURB: Record<string, string> = {
  students: "The AI tutor, tutor modes, question bank, flashcards, clinical cases and your dashboard.",
  faculty: "Your calendar, lesson planning, the AI Workspace, Content Bank, assessments and analytics.",
  administration: "Roles, courses and batches, people, the CBME timetable and institute analytics.",
};

/** Help centre hub: a search that filters every guide, then each role's guides as a ruled list. */
export default function HowToHub() {
  const index = searchIndex();
  const textOf = (href: string) => index.find((r) => r.href === href)?.text ?? "";
  return (
    <div className="v2 lesson">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "How to use", path: "/how-to-use" }])} />
      <header className="wrap exam-head !pb-8">
        <Kicker>Help centre</Kicker>
        <div className="mt-5">
          <Headline text="How to use" accent="GalenAI." />
        </div>
        <p className="lead mt-6">Pick your role. Every guide is a short list of steps with a screenshot for each one.</p>
      </header>
      <HowToIndex
        roles={howToRoleKeys.map((role) => ({
          id: role,
          label: howToRoles[role].label,
          blurb: BLURB[role],
          where: howToRoles[role].appUrl.replace("https://", ""),
          whereHref: howToRoles[role].appUrl,
          guides: howToRoles[role].guides.map((g) => {
            const href = `/how-to-use/${role}/${g.slug}`;
            return { href, title: g.title, description: g.description, text: textOf(href) };
          }),
        }))}
      />
      <section className="wrap help-contact">
        <h2 className="h3 !text-[1.6rem]">Need help?</h2>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${CONTACT.support}`} className="btn btn-ghost">
            {CONTACT.support}
          </a>
          <a href={LINKS.whatsapp} rel="noopener" className="btn btn-ghost">
            WhatsApp us
          </a>
        </div>
      </section>
    </div>
  );
}
