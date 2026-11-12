import Link from "next/link";
import type { PageSpec } from "@/content/site/types";
import { pageLabel } from "@/content/site";
import { breadcrumbLd, faqLd, softwareAppLd } from "@/lib/seo";
import JsonLd from "./JsonLd";
import CtaLink from "./CtaLink";
import StickyMobileCta from "./StickyMobileCta";
import { Blueprint, Breadcrumbs, FaqBlock, Headline, Kicker, Section } from "./ui";
import { resolveSection } from "./sections";

/**
 * Renders any PageSpec. The frame (breadcrumbs, H1, answer-first paragraph, CTAs,
 * FAQ, related links, structured data, sticky phone CTA) is final. Body sections
 * render real components when registered, otherwise a Blueprint placeholder.
 */
export default function SpecPage({
  spec,
  trail,
}: {
  spec: PageSpec;
  trail: { name: string; path: string }[];
}) {
  const fullTrail = [{ name: "Home", path: "/" }, ...trail, { name: spec.kicker, path: spec.path }];
  const tone = spec.audience === "student" || spec.audience === "all" ? undefined : "neutral";
  const realFaqs = spec.faqs?.filter((f) => !f.a.startsWith("TODO")) ?? [];
  const ld: object[] = [breadcrumbLd(fullTrail)];
  if (realFaqs.length) ld.push(faqLd(realFaqs));
  if (spec.path.startsWith("/features/")) {
    ld.push(softwareAppLd({ name: `GalenAI ${spec.kicker}`, description: spec.description, path: spec.path }));
  }
  const src = spec.path.replace(/\//g, "_").slice(1);

  return (
    <div className="v2" data-tone={tone}>
      <JsonLd data={ld} />

      <header className="wrap pt-32 md:pt-40 pb-10">
        <Breadcrumbs trail={fullTrail} />
        <Kicker>{spec.kicker}</Kicker>
        <div className="mt-5">
          <Headline text={spec.h1} accent={spec.h1Accent} />
        </div>
        {/* Answer-first paragraph: the 40 to 60 words an AI engine or snippet will quote. */}
        <p className="lead mt-6">{spec.answer}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink intent={spec.primaryCta} source={`${src}_hero`} />
          {spec.secondaryCta && (
            <CtaLink intent={spec.secondaryCta} source={`${src}_hero`} variant="ghost" />
          )}
        </div>
      </header>

      {spec.sections.map((s) => {
        const Cmp = resolveSection(spec, s);
        return (
          <Section key={s.id} id={s.id}>
            {Cmp ? (
              <Cmp spec={spec} section={s} />
            ) : (
              <>
                <Headline as="h2" text={s.heading} />
                <div className="mt-6">
                  <Blueprint kind={s.kind} notes={s.notes} />
                </div>
              </>
            )}
          </Section>
        );
      })}

      {spec.faqs?.length ? (
        <Section id="faq">
          <Headline as="h2" text="Questions, answered" />
          <div className="mt-6">
            <FaqBlock faqs={spec.faqs} />
          </div>
        </Section>
      ) : null}

      {spec.related?.length ? (
        <Section id="related">
          <h2 className="h3">Keep exploring</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {spec.related.map((p) => (
              <li key={p}>
                <Link href={p} className="btn btn-ghost !min-h-10 !text-sm !whitespace-normal text-center">
                  {pageLabel(p)}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {spec.status === "skeleton" && spec.flags?.length ? (
        <Section id="flags">
          <Blueprint kind="open questions for Varun" notes={spec.flags.join(" · ")} />
        </Section>
      ) : null}

      {/* No sticky bar on form pages: it would cover the fields while typing. */}
      {!spec.sections.some((s) => s.kind === "form") && <StickyMobileCta intent={spec.primaryCta} source={src} />}
    </div>
  );
}
