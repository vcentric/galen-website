import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { howToRoles, howToRoleKeys, HOW_TO_LIVE } from "@/content/site";
import type { HowToRole } from "@/content/site/howto";
import { buildMetadata, breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Blueprint, Breadcrumbs, Headline, Kicker, Section } from "@/app/components/v2/ui";

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
    title: `${hit.g.title}: GalenAI ${hit.r.label} Guide`,
    description: hit.g.description,
    path: `/how-to-use/${role}/${guide}`,
    noindex: !HOW_TO_LIVE,
  });
}

export default async function HowToGuidePage({ params }: Props) {
  const { role, guide } = await params;
  const hit = find(role, guide);
  if (!hit) notFound();
  const { r, idx, g } = hit;
  const prev = r.guides[idx - 1];
  const next = r.guides[idx + 1];
  const trail = [
    { name: "Home", path: "/" },
    { name: "How to use", path: "/how-to-use" },
    { name: r.label, path: `/how-to-use/${role}` },
    { name: g.title, path: `/how-to-use/${role}/${guide}` },
  ];
  return (
    <div className="v2" data-tone="neutral">
      <JsonLd data={breadcrumbLd(trail)} />
      <header className="wrap pt-32 md:pt-40 pb-6">
        <Breadcrumbs trail={trail} />
        <Kicker>{r.label} guide</Kicker>
        <div className="mt-5">
          <Headline text={g.title} />
        </div>
        <p className="lead mt-6">{g.description}</p>
      </header>
      <Section>
        <Blueprint
          kind="how-to guide"
          notes={`Port <section id="${g.sourceId}"> from docs/v2/reference/how-to-use-source/index.html. Copy is approved: keep it verbatim. Build the step viewer once (numbered steps left, screenshot right, click a step to swap the image from data-img, caption from data-cap) and reuse it for every guide. Screenshots: /how-to-use/img/<name>.webp. Keep Tip / Note / Careful callouts, 'use it when' chips and copyable prompts. FAQ guides also emit faqLd().`}
        />
      </Section>
      <Section>
        <nav className="flex flex-wrap justify-between gap-4" aria-label="More guides">
          {prev ? (
            <Link className="btn btn-ghost" href={`/how-to-use/${role}/${prev.slug}`}>
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="btn btn-ghost" href={`/how-to-use/${role}/${next.slug}`}>
              {next.title} →
            </Link>
          ) : null}
        </nav>
        <p className="mt-8">
          <a className="btn btn-primary" href={r.appUrl} rel="noopener">
            Open GalenAI
          </a>
        </p>
      </Section>
    </div>
  );
}
