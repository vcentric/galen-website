import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { goPages } from "@/content/site";
import type { GoPage as GoSpec } from "@/content/site/go";
import { testimonials } from "@/content/site/demos";
import { FACULTY_STEPS } from "@/content/site/faculty-steps";
import { INSTITUTION_PARTS, INSTITUTION_VIDEO } from "@/content/site/institution-parts";
import { buildMetadata } from "@/lib/seo";
import CtaLink from "@/app/components/v2/CtaLink";
import FacultySteps from "@/app/components/v2/FacultySteps";
import LeadForm from "@/app/components/v2/LeadForm";
import McqDemo from "@/app/components/v2/McqDemo";
import StickyMobileCta from "@/app/components/v2/StickyMobileCta";
import TutorDemo from "@/app/components/v2/TutorDemo";
import VideoLite from "@/app/components/v2/VideoLite";
import { Headline, Kicker } from "@/app/components/v2/ui";

/**
 * Ad landing pages. One claim, one CTA, no navigation, always noindex.
 * Variants are data in content/site/go.ts. See docs/v2/MASTERPLAN.md section 4.
 * Each block kind renders a section the main site already uses, so nothing here is new copy.
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

/** The shared student loop (same wording as the /for pages). */
const LOOP = [
  { t: "Ask", b: "Any doubt, answered with references, in the tutor mode that suits the topic." },
  { t: "Practise", b: "Clinical MCQs with reasoning, and cases you work through one decision at a time." },
  { t: "Revise", b: "Flashcards with spaced revision, and a dashboard that shows your weakest topic." },
];

function Strip({ items }: { items: { t: string; b: string }[] }) {
  return (
    <ol className="strip !mt-0" data-cols={items.length}>
      {items.map((it, i) => (
        <li key={it.t}>
          <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="strip-t">{it.t}</h3>
          <p className="strip-b">{it.b}</p>
        </li>
      ))}
    </ol>
  );
}

function Block({ page, kind, src }: { page: GoSpec; kind: GoSpec["blocks"][number]["kind"]; src: string }) {
  if (kind === "demo") return page.slug === "neet-pg" ? <McqDemo source={`${src}_demo`} /> : <TutorDemo source={`${src}_demo`} />;
  if (kind === "video")
    return (
      <div className="mx-auto max-w-4xl">
        <VideoLite youtubeId={INSTITUTION_VIDEO.youtubeId} title={INSTITUTION_VIDEO.name} />
      </div>
    );
  if (kind === "form")
    return (
      <div className="demo tone-dark !block">
        <Headline as="h2" text="Request a demo" />
        <div className="mt-8">
          <LeadForm source={src} />
        </div>
      </div>
    );
  if (kind === "proof") {
    if (page.slug !== "ask") return null; // the NEET PG stat needs a confirmed number first (see go.ts notes)
    const t = testimonials.find((x) => x.quote.length < 160) ?? testimonials[0];
    return (
      <figure className="go-proof">
        <p className="go-proof-n">
          2,000+ <span>medical students already on it.</span>
        </p>
        <blockquote>“{t.quote}”</blockquote>
        <figcaption>
          <b>{t.name}</b>
          {t.meta}
        </figcaption>
      </figure>
    );
  }
  if (kind === "steps") {
    if (page.slug === "faculty")
      return (
        <div style={{ "--fsteps-bg": "#fffaf4" } as React.CSSProperties}>
          <FacultySteps steps={FACULTY_STEPS} />
        </div>
      );
    if (page.slug === "college") return <Strip items={INSTITUTION_PARTS.map((p) => ({ t: p.who, b: p.body }))} />;
    if (page.slug === "event")
      return (
        <ul className="closing-try">
          <li>
            <div>
              <h3 className="h3 !text-[1.6rem]">
                For <span className="acc">students</span>
              </h3>
              <p className="mt-2" style={{ color: "var(--body)" }}>
                The AI tutor, question bank, flashcards and cases.
              </p>
            </div>
            <CtaLink intent="download" source={`${src}_students`} label="Get the app" />
          </li>
          <li>
            <div>
              <h3 className="h3 !text-[1.6rem]">
                For <span className="acc">faculty</span>
              </h3>
              <p className="mt-2" style={{ color: "var(--body)" }}>
                The AI Workspace, lesson planning and assessments, live.
              </p>
            </div>
            <CtaLink intent="faculty-live" source={`${src}_faculty`} label="Try it live" variant="ghost" />
          </li>
        </ul>
      );
    return <Strip items={LOOP} />;
  }
  return null;
}

export default async function GoPage({ params }: Props) {
  const { slug } = await params;
  const page = goPages.find((p) => p.slug === slug);
  if (!page) notFound();
  const src = `go_${page.slug}`;

  return (
    <main className="v2 min-h-screen">
      <header className="wrap flex items-center justify-between py-5">
        {/* Logo is not a link: nothing on this page leads away from the CTA. */}
        <Image src="/brand/lockup.svg" alt="GalenAI" width={127} height={28} priority className="h-auto w-[116px]" />
        <CtaLink intent={page.cta} source={`${src}_top`} label={page.ctaLabel} className="!min-h-11 !px-5 !text-sm" />
      </header>

      <section className="wrap go-hero">
        <Kicker>{page.kicker}</Kicker>
        <div className="mt-5">
          <Headline text={page.h1} accent={page.h1Accent} />
        </div>
        <p className="lead mt-6">{page.sub}</p>
        <div className="mt-8">
          <CtaLink intent={page.cta} source={`${src}_hero`} label={page.ctaLabel} className="!min-h-14 !px-8 !text-lg" />
        </div>
      </section>

      {page.blocks.map((b, i) => {
        const el = <Block page={page} kind={b.kind} src={src} />;
        if (b.kind === "proof" && page.slug !== "ask") return null;
        return (
          <section key={i} className={`spec-sec ${i % 2 === 1 ? "spec-band" : ""}`}>
            <div className="wrap">{el}</div>
          </section>
        );
      })}

      <section className="tone-dark spec-sec spec-closing-sec">
        <div className="wrap spec-closing">
          <Headline as="h2" text={page.h1} accent={page.h1Accent} />
          <div>
            <CtaLink intent={page.cta} source={`${src}_final`} label={page.ctaLabel} className="!min-h-14 !px-8 !text-lg" />
          </div>
        </div>
      </section>

      <footer className="wrap go-foot">
        <span>© {new Date().getFullYear()} GalenAI Private Limited</span>
        <span>
          <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link>
        </span>
      </footer>

      <StickyMobileCta intent={page.cta} source={src} label={page.ctaLabel} />
    </main>
  );
}
