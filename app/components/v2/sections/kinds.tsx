import Image from "next/image";
import Link from "next/link";
import type { Screen } from "@/content/site/types";
import CtaLink from "../CtaLink";
import McqDemo from "../McqDemo";
import ModeExplorer from "../ModeExplorer";
import PhoneFrame from "../PhoneFrame";
import AppScreen, { type AppScreenName } from "../AppScreen";
import TutorDemo from "../TutorDemo";
import { Headline } from "../ui";
import type { SectionProps } from "./index";

/**
 * Shared section components, one per SectionKind. Each renders `section.content`.
 * resolveSection only uses these when content exists (except "cta", which needs none).
 */

const src = (p: string) => p.replace(/\//g, "_").slice(1);

function Head({ section }: SectionProps) {
  return (
    <>
      <Headline as="h2" text={section.heading} />
      {section.content?.pill && <span className="pill-soon mt-4">{section.content.pill}</span>}
      {section.content?.intro && <p className="lead mt-4">{section.content.intro}</p>}
    </>
  );
}

function ScreenView({ s, width = 240 }: { s: Screen; width?: number }) {
  if (s.frame === "app") return <AppScreen name={s.src as AppScreenName} alt={s.alt} width={width} />;
  if (s.frame === "phone") return <PhoneFrame src={s.src} alt={s.alt} width={width} />;
  return (
    <Image
      src={s.src}
      alt={s.alt}
      width={1800}
      height={1125}
      sizes="(min-width: 1024px) 900px, 92vw"
      className={`h-auto w-full ${s.frame === "desk" ? "rounded-[22px] shadow-[0_30px_80px_rgba(46,46,46,0.22)] outline outline-2 outline-black/5" : ""}`}
    />
  );
}

export function StepsSection(props: SectionProps) {
  const items = props.section.content?.items ?? [];
  return (
    <>
      <Head {...props} />
      <ol className={`mt-10 grid gap-x-12 gap-y-8 ${items.length > 3 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {items.map((it, i) => (
          <li key={it.t} className="flex gap-5">
            <span className="font-[family-name:var(--font-space-var)] text-3xl font-bold text-[#eb602d]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="h3">{it.t}</h3>
              {it.b && (
                <p className="mt-1" style={{ color: "var(--body)" }}>
                  {it.b}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

export function FeaturesSection(props: SectionProps) {
  const c = props.section.content!;
  const screen = c.screens?.[0];
  const side = screen?.frame === "phone" || screen?.frame === "app";
  return (
    <div className={side ? "grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16" : ""}>
      <div>
        <Head {...props} />
        <ul className="mt-8 space-y-5">
          {(c.items ?? []).map((it) => (
            <li key={it.t} className="flex gap-4">
              <span aria-hidden className="mt-2 h-3 w-3 shrink-0 rounded-full bg-[#eb602d]" />
              <div>
                <h3 className="h3 !text-lg">
                  {it.href ? (
                    <Link href={it.href} className="underline decoration-[#eb602d] decoration-2 underline-offset-4">
                      {it.t}
                    </Link>
                  ) : (
                    it.t
                  )}
                </h3>
                {it.b && (
                  <p className="mt-1" style={{ color: "var(--body)" }}>
                    {it.b}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {screen && (
        <div className={side ? "flex justify-center" : "mt-10 max-w-4xl"}>
          <ScreenView s={screen} width={260} />
        </div>
      )}
    </div>
  );
}

export function ScreensSection(props: SectionProps) {
  const screens = props.section.content?.screens ?? [];
  const phones = screens.every((s) => s.frame === "phone" || s.frame === "app");
  return (
    <>
      <Head {...props} />
      <div className={`mt-10 ${phones ? "flex flex-wrap justify-center gap-8 md:justify-start" : "grid gap-8"}`}>
        {screens.map((s) => (
          <figure key={s.src} className={phones ? "" : "max-w-4xl"}>
            <ScreenView s={s} width={screens.length > 3 ? 200 : 240} />
            {s.caption && (
              <figcaption className="mt-3 text-center text-sm font-semibold" style={{ color: "var(--body)" }}>
                {s.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </>
  );
}

export function CompareSection(props: SectionProps) {
  const t = props.section.content!.table!;
  return (
    <>
      <Head {...props} />
      {/* Phone: one card per row so the GalenAI column is never off-screen. */}
      <ul className="mt-8 space-y-3 md:hidden">
        {t.rows.map(([a, b, c]) => (
          <li key={a} className="card p-5">
            {a && <p className="h3 !text-lg">{a}</p>}
            <p className="mt-3 text-xs font-bold uppercase tracking-wider opacity-60">{t.head[1]}</p>
            <p className="mt-1" style={{ color: "var(--body)" }}>
              {b}
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#c94d20]">{t.head[2]}</p>
            <p className="mt-1 font-semibold">{c}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="text-sm uppercase tracking-wider">
              <th className="py-3 pr-6 font-semibold opacity-70">{t.head[0]}</th>
              <th className="py-3 pr-6 font-semibold opacity-70">{t.head[1]}</th>
              <th className="py-3 font-semibold text-[#c94d20]">{t.head[2]}</th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map(([a, b, c]) => (
              <tr key={a} className="border-t border-black/10 align-top">
                <th scope="row" className="py-5 pr-6 font-bold">
                  {a}
                </th>
                <td className="py-5 pr-6" style={{ color: "var(--body)" }}>
                  {b}
                </td>
                <td className="py-5 font-semibold">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {t.note && (
        <p className="mt-4 text-sm" style={{ color: "var(--body)" }}>
          {t.note}
        </p>
      )}
    </>
  );
}

export function ExplainSection(props: SectionProps) {
  const c = props.section.content!;
  return (
    <div className="max-w-[68ch]">
      <Head {...props} />
      <div className="mt-5 space-y-4 text-[1.05rem] leading-relaxed" style={{ color: "var(--body)" }}>
        {(c.paragraphs ?? []).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      {c.items && (
        <ul className="mt-6 flex flex-wrap gap-3">
          {c.items.map((it) =>
            it.href ? (
              <li key={it.t}>
                <Link href={it.href} className="btn btn-ghost !min-h-10 !text-sm">
                  {it.t}
                </Link>
              </li>
            ) : null,
          )}
        </ul>
      )}
    </div>
  );
}

export function LinksSection(props: SectionProps) {
  const items = props.section.content?.items ?? [];
  return (
    <>
      <Head {...props} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <li key={it.t}>
            <Link href={it.href ?? "#"} className="card block h-full p-6">
              <h3 className="h3">{it.t}</h3>
              {it.b && (
                <p className="mt-2 text-sm" style={{ color: "var(--body)" }}>
                  {it.b}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function DemoSection(props: SectionProps) {
  const { spec, section } = props;
  const c = section.content!;
  if (c.demo === "tutor") return <TutorDemo source={`${src(spec.path)}_demo`} />;
  if (c.demo === "modes")
    return (
      <>
        <Head {...props} />
        <div className="mt-10">
          <ModeExplorer />
        </div>
      </>
    );
  if (c.demo === "mcq")
    return (
      <>
        <Head {...props} />
        <div className="mt-10">
          <McqDemo source={`${src(spec.path)}_demo`} />
        </div>
      </>
    );
  return <ScreensSection {...props} />;
}

/** Closing band: dark, the section heading, the page's own CTAs. Needs no content. */
export function CtaBandSection({ spec, section }: SectionProps) {
  return (
    <div className="tone-dark rounded-[28px] px-6 py-12 md:px-12">
      <Headline as="h2" text={section.heading} />
      {section.content?.intro && <p className="lead mt-4">{section.content.intro}</p>}
      <div className="mt-8 flex flex-wrap gap-3">
        <CtaLink intent={spec.primaryCta} source={`${src(spec.path)}_final`} />
        {spec.secondaryCta && <CtaLink intent={spec.secondaryCta} source={`${src(spec.path)}_final`} variant="ghost" />}
      </div>
    </div>
  );
}
