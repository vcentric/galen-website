import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { goPages } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import CtaLink from "@/app/components/v2/CtaLink";
import StickyMobileCta from "@/app/components/v2/StickyMobileCta";
import { Blueprint, Headline, Kicker, Section } from "@/app/components/v2/ui";

/**
 * Ad landing pages. One claim, one CTA, no navigation, always noindex.
 * Variants are data in content/site/go.ts. See docs/v2/MASTERPLAN.md section 4.
 */
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => goPages.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = goPages.find((p) => p.slug === slug);
  if (!page) return {};
  return buildMetadata({ title: page.title, description: page.sub, path: `/go/${slug}`, noindex: true });
}

export default async function GoPage({ params }: Props) {
  const { slug } = await params;
  const page = goPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const src = `go_${page.slug}`;
  const dark = page.cta === "demo" || page.cta === "faculty-live";

  return (
    <main className="v2 min-h-screen" data-tone={dark ? "neutral" : undefined}>
      <header className="wrap flex items-center justify-between py-5">
        {/* Logo is not a link: nothing on this page leads away from the CTA. */}
        <Image src="/brand/lockup.svg" alt="GalenAI" width={132} height={36} priority />
        <CtaLink intent={page.cta} source={`${src}_top`} label={page.ctaLabel} className="!min-h-11 !px-5 !text-sm" />
      </header>

      <section className="wrap pt-8 pb-12 md:pt-16">
        <Kicker>{page.kicker}</Kicker>
        <div className="mt-5">
          <Headline text={page.h1} accent={page.h1Accent} />
        </div>
        <p className="lead mt-6">{page.sub}</p>
        <div className="mt-8">
          <CtaLink intent={page.cta} source={`${src}_hero`} label={page.ctaLabel} />
        </div>
      </section>

      {page.blocks.map((b, i) => (
        <Section key={i}>
          <Blueprint kind={b.kind} notes={b.notes} />
        </Section>
      ))}

      <Section tone="dark">
        <Headline as="h2" text={page.h1} accent={page.h1Accent} />
        <div className="mt-8">
          <CtaLink intent={page.cta} source={`${src}_final`} label={page.ctaLabel} />
        </div>
      </Section>

      <footer className="wrap py-8 text-sm opacity-70">
        © {new Date().getFullYear()} GalenAI Private Limited · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
      </footer>

      <StickyMobileCta intent={page.cta} source={src} label={page.ctaLabel} />
    </main>
  );
}
