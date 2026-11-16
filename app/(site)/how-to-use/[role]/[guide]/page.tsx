import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import type { HowToRole } from "@/content/site/howto";
import { faqsFromHtml, guideSection } from "@/content/howto";
import { buildMetadata, breadcrumbLd, faqLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import HowToShell from "@/app/components/v2/HowToShell";

type Props = { params: Promise<{ role: string; guide: string }> };

const find = (role: string, guide: string) => {
  const r = howToRoles[role as HowToRole];
  const idx = r?.guides.findIndex((g) => g.slug === guide) ?? -1;
  return r && idx >= 0 ? { r, idx, g: r.guides[idx] } : null;
};

export const dynamicParams = false;
export const generateStaticParams = () =>
  howToRoleKeys.flatMap((role) => howToRoles[role].guides.map((g) => ({ role, guide: g.slug })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { role, guide } = await params;
  const hit = find(role, guide);
  if (!hit) return {};
  return buildMetadata({
    title: `${hit.g.title}: GalenAI ${hit.r.label === "Administration" ? "Admin" : hit.r.label} Guide`,
    description: `${hit.g.description} A step-by-step GalenAI guide for ${hit.r.label.toLowerCase()}, with screenshots of every screen.`.slice(0, 160),
    path: `/how-to-use/${role}/${guide}`,
    noindex: !HOW_TO_LIVE,
  });
}

/** One guide, ported verbatim from the approved How to Use page (scripts/build-howto.py). */
export default async function HowToGuidePage({ params }: Props) {
  const { role, guide } = await params;
  const hit = find(role, guide);
  const section = guideSection(role as HowToRole, guide);
  if (!hit || !section) notFound();
  const { r, idx, g } = hit;
  const prev = r.guides[idx - 1];
  const next = r.guides[idx + 1];
  const trail = [
    { name: "Home", path: "/" },
    { name: "How to use", path: "/how-to-use" },
    { name: r.label, path: `/how-to-use/${role}` },
    { name: g.title, path: `/how-to-use/${role}/${guide}` },
  ];
  const faqs = faqsFromHtml(section.html);
  const ld: object[] = [breadcrumbLd(trail)];
  if (faqs.length) ld.push(faqLd(faqs));

  return (
    <HowToShell
      role={role as HowToRole}
      current={guide}
      toc={section.toc}
      trail={trail}
      footer={
        <div className="mt-14 border-t border-[#e7dfd6] pt-8">
          <nav className="flex flex-wrap justify-between gap-4" aria-label="More guides">
            {prev ? (
              <Link className="btn btn-ghost" href={`/how-to-use/${role}/${prev.slug}`}>
                ← {prev.title}
              </Link>
            ) : (
              <Link className="btn btn-ghost" href={`/how-to-use/${role}`}>
                ← Start here
              </Link>
            )}
            {next ? (
              <Link className="btn btn-ghost" href={`/how-to-use/${role}/${next.slug}`}>
                {next.title} →
              </Link>
            ) : null}
          </nav>
          <p className="mt-8">
            <a className="btn btn-primary" href={r.appUrl} rel="noopener">
              Open GalenAI {role === "students" ? "" : "for faculty"}
            </a>
          </p>
        </div>
      }
    >
      <JsonLd data={ld} />
      <div dangerouslySetInnerHTML={{ __html: section.html }} />
    </HowToShell>
  );
}
