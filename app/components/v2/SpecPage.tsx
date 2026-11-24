import Link from "next/link";
import type { PageSpec } from "@/content/site/types";
import { pageLabel } from "@/content/site";
import { breadcrumbLd, faqLd, softwareAppLd } from "@/lib/seo";
import JsonLd from "./JsonLd";
import CtaLink from "./CtaLink";
import StickyMobileCta from "./StickyMobileCta";
import { Blueprint, Breadcrumbs, FaqBlock, Headline, Kicker, Section } from "./ui";
import { byPage, resolveSection } from "./sections";

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
  const realFaqs = spec.faqs?.filter((f) => !f.a.startsWith("TODO")) ?? [];
  const ld: object[] = [breadcrumbLd(fullTrail)];
  if (realFaqs.length) ld.push(faqLd(realFaqs));
  if (spec.path.startsWith("/features/")) {
    ld.push(softwareAppLd({ name: `GalenAI ${spec.kicker}`, description: spec.description, path: spec.path }));
  }
  const src = spec.path.replace(/\//g, "_").slice(1);
  // The shared closing band moves to the end; a page's own bespoke "cta" section stays where the page put it.
  const isClosing = (s: PageSpec["sections"][number]) => s.kind === "cta" && !byPage[`${spec.path}#${s.id}`];
  const body = spec.sections.filter((s) => !isClosing(s));
  const closing = spec.sections.filter(isClosing);

  return (
    <div className="v2">
      <JsonLd data={ld} />

      <header className="wrap pt-24 md:pt-32 pb-10">
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

      {/* Tighter than the home page sections, and every other one sits on a lighter band so the page has a rhythm. */}
      {body.map((s, i) => {
        const Cmp = resolveSection(spec, s);
        return (
          <section key={s.id} id={s.id} className={`spec-sec ${i % 2 === 1 ? "spec-band" : ""}`}>
            <div className="wrap">
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
            </div>
          </section>
        );
      })}

      {spec.faqs?.length ? (
        <section id="faq" className="spec-sec">
          <div className="wrap grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <Headline as="h2" text="Questions, answered" />
            <FaqBlock faqs={spec.faqs} />
          </div>
        </section>
      ) : null}

      {spec.related?.length ? (
        <section id="related" className="spec-sec !pt-0">
          <div className="wrap spec-related">
            <h2 className="exam-nav-h !mb-0">Keep exploring</h2>
            <ul>
              {spec.related.map((p) => (
                <li key={p}>
                  <Link href={p} className="vs-link">
                    {pageLabel(p)} <span aria-hidden>→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* The closing call to action is the last thing on the page: full width and dark, like the home pages. */}
      {closing.map((s) => {
        const Cmp = resolveSection(spec, s)!;
        return (
          <section key={s.id} id={s.id} className="tone-dark spec-sec spec-closing-sec">
            <div className="wrap">
              <Cmp spec={spec} section={s} />
            </div>
          </section>
        );
      })}

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
