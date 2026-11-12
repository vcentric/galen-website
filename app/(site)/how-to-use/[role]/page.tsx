import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import type { HowToRole } from "@/content/site/howto";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Breadcrumbs, Headline, Kicker, Section } from "@/app/components/v2/ui";

type Props = { params: Promise<{ role: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => howToRoleKeys.map((role) => ({ role }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const r = howToRoles[role as HowToRole];
  if (!r) return {};
  return buildMetadata({ title: r.title, description: r.description, path: `/how-to-use/${role}`, noindex: !HOW_TO_LIVE });
}

export default async function HowToRolePage({ params }: Props) {
  const { role } = await params;
  const r = howToRoles[role as HowToRole];
  if (!r) notFound();
  const trail = [
    { name: "Home", path: "/" },
    { name: "How to use", path: "/how-to-use" },
    { name: r.label, path: `/how-to-use/${role}` },
  ];
  return (
    <div className="v2" data-tone="neutral">
      <JsonLd data={breadcrumbLd(trail)} />
      <header className="wrap pt-32 md:pt-40 pb-6">
        <Breadcrumbs trail={trail} />
        <Kicker>{r.label}</Kicker>
        <div className="mt-5">
          <Headline text="GalenAI for" accent={`${r.label.toLowerCase()}.`} />
        </div>
        <p className="lead mt-6">{r.description}</p>
      </header>
      <Section>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/how-to-use/${role}/${g.slug}`} className="card block h-full p-6">
                <h2 className="h3">{g.title}</h2>
                <p className="mt-2 text-sm" style={{ color: "var(--body)" }}>
                  {g.description}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
