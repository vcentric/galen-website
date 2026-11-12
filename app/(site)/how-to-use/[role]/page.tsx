import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import type { HowToRole } from "@/content/site/howto";
import { startSection } from "@/content/howto";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import HowToShell from "@/app/components/v2/HowToShell";

type Props = { params: Promise<{ role: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => howToRoleKeys.map((role) => ({ role }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role } = await params;
  const r = howToRoles[role as HowToRole];
  if (!r) return {};
  return buildMetadata({ title: r.title, description: r.description, path: `/how-to-use/${role}`, noindex: !HOW_TO_LIVE });
}

/** Role landing: the approved "Start here" flow, then every guide for the role. */
export default async function HowToRolePage({ params }: Props) {
  const { role } = await params;
  const r = howToRoles[role as HowToRole];
  if (!r) notFound();
  const start = startSection(role as HowToRole);
  const trail = [
    { name: "Home", path: "/" },
    { name: "How to use", path: "/how-to-use" },
    { name: r.label, path: `/how-to-use/${role}` },
  ];
  return (
    <HowToShell
      role={role as HowToRole}
      current=""
      trail={trail}
      footer={
        <section className="mt-14">
          <h2 className="h2">
            All {r.label.toLowerCase()} <span className="acc">guides.</span>
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {r.guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/how-to-use/${role}/${g.slug}`} className="card block h-full p-6">
                  <h3 className="h3">{g.title}</h3>
                  <p className="mt-2 text-sm" style={{ color: "var(--body)" }}>
                    {g.description}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      }
    >
      <JsonLd data={breadcrumbLd(trail)} />
      <div dangerouslySetInnerHTML={{ __html: start.html }} />
    </HowToShell>
  );
}
