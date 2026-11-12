import Link from "next/link";
import { howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Headline, Kicker, Section } from "@/app/components/v2/ui";

export const metadata = buildMetadata({
  title: "How to Use GalenAI: Guides for Students, Faculty and Administration",
  description:
    "Step-by-step guides to GalenAI for students, faculty and college administration, with screenshots for every feature.",
  path: "/how-to-use",
  noindex: !HOW_TO_LIVE,
});

/**
 * Help centre hub. Source design: docs/v2/reference/how-to-use-source/index.html
 * (role tabs, search, sticky contents rail). Skeleton lists every guide per role.
 */
export default function HowToHub() {
  return (
    <div className="v2" data-tone="neutral">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "How to use", path: "/how-to-use" }])} />
      <header className="wrap pt-32 md:pt-40 pb-6">
        <Kicker>How to use</Kicker>
        <div className="mt-5">
          <Headline text="How to use" accent="GalenAI." />
        </div>
        <p className="lead mt-6">Pick your role. Every guide is a short list of steps with a screenshot for each one.</p>
        {/* TODO(exec): search box across all guides (port the index from the source page JS). */}
      </header>
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          {howToRoleKeys.map((role) => (
            <div key={role} className="card p-6">
              <h2 className="h3">
                <Link href={`/how-to-use/${role}`}>{howToRoles[role].label}</Link>
              </h2>
              <ul className="mt-4 space-y-2">
                {howToRoles[role].guides.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/how-to-use/${role}/${g.slug}`} className="underline underline-offset-4">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
