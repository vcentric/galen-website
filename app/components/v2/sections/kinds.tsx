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
import { WindowFrame } from "./faculty";
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
  // Captures from the current institution design have no browser bar of their own, so they get the site's window frame.
  if (s.frame === "desk" && s.src.startsWith("/brand/ui/")) {
    return (
      <WindowFrame>
        <Image src={s.src} alt={s.alt} width={1800} height={1125} sizes="(min-width: 1024px) 900px, 92vw" className="h-auto w-full" />
      </WindowFrame>
    );
  }
  return (
    <Image
      src={s.src}
      alt={s.alt}
      width={1800}
      height={1125}
      sizes="(min-width: 1024px) 900px, 92vw"
      className={`h-auto w-full ${s.frame === "desk" ? "rounded-[14px] shadow-[0_0_0_1px_rgba(46,46,46,0.12),0_30px_70px_rgba(46,46,46,0.2)]" : ""}`}
    />
  );
}

export function StepsSection(props: SectionProps) {
  const items = props.section.content?.items ?? [];
  // One ruled strip: up to four steps in a row, five or six as two rows of three.
  const cols = items.length <= 4 ? items.length : 3;
  return (
    <>
      <Head {...props} />
      <ol className="strip" data-cols={cols}>
        {items.map((it, i) => (
          <li key={it.t}>
            <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="strip-t">{it.t}</h3>
            {it.b && <p className="strip-b">{it.b}</p>}
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
  const items = c.items ?? [];
  return (
    <div className={side ? "grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16" : ""}>
      <div>
        <Head {...props} />
        {/* A numbered ruled list. Beside a phone it is one column; on its own it runs in two. */}
        <ol className={`fout-list ${side || items.length < 4 ? "" : "fout-list-2"}`}>
          {items.map((it, i) => {
            const inner = (
              <>
                <span className="fout-n">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="fout-t">{it.t}</span>
                  {it.b && <span className="fout-b">{it.b}</span>}
                </span>
                {it.href && (
                  <span aria-hidden className="fout-go">
                    →
                  </span>
                )}
              </>
            );
            return (
              <li key={it.t}>
                {it.href ? (
                  <Link href={it.href} className="fout-row">
                    {inner}
                  </Link>
                ) : (
                  <div className="fout-row">{inner}</div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      {screen && (
        <div className={side ? "flex justify-center" : "mt-10"}>
          <ScreenView s={screen} width={280} />
        </div>
      )}
    </div>
  );
}

function Caption({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <figcaption className="mt-4 text-center text-sm font-bold" style={{ color: "var(--body)" }}>
      {text}
    </figcaption>
  );
}

export function ScreensSection(props: SectionProps) {
  const screens = props.section.content?.screens ?? [];
  const phones = screens.length > 0 && screens.every((s) => s.frame === "phone" || s.frame === "app");
  // One phone: heading on the left, phone on the right.
  if (phones && screens.length === 1) {
    return (
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <Head {...props} />
        </div>
        <figure className="mx-auto">
          <ScreenView s={screens[0]} width={290} />
          <Caption text={screens[0].caption} />
        </figure>
      </div>
    );
  }
  // Three phones: spread across the row, the middle one larger and set higher (design system section 6).
  const trio = phones && screens.length === 3;
  return (
    <>
      <Head {...props} />
      <div className={`mt-10 ${phones ? "flex flex-wrap items-start justify-center gap-x-[clamp(1.5rem,5vw,4.5rem)] gap-y-10" : "grid gap-8"}`}>
        {screens.map((s, i) => (
          <figure key={s.src} className={trio && i !== 1 ? "lg:mt-14" : ""}>
            <ScreenView s={s} width={trio ? (i === 1 ? 300 : 250) : screens.length > 3 ? 200 : 260} />
            <Caption text={s.caption} />
          </figure>
        ))}
      </div>
    </>
  );
}

export function CompareSection(props: SectionProps) {
  const t = props.section.content!.table!;
  const ours = (h: string) =>
    h === "GalenAI" ? <Image src="/brand/lockup.svg" alt="GalenAI" width={127} height={28} className="h-auto w-[92px]" /> : h;
  return (
    <>
      <Head {...props} />
      {/* Phones: one block per row, so the GalenAI answer is never off-screen. */}
      <ul className="vs-cards vs-light md:hidden">
        {t.rows.map(([a, b, c]) => (
          <li key={a}>
            {a && <p className="vs-area">{a}</p>}
            <p className="vs-label">{t.head[1]}</p>
            <p className="mt-1" style={{ color: "var(--body)" }}>
              {b}
            </p>
            <div className="vs-ours">
              <p className="vs-label vs-label-ours">{t.head[2]}</p>
              <p className="vs-ours-text">{c}</p>
            </div>
          </li>
        ))}
      </ul>
      {/* Tablet and up: the ledger. The other side is small and quiet, ours is set larger, one orange rule between. */}
      <div className="mt-10 hidden md:block">
        <table className={`vs-table vs-light ${t.rows.length > 7 ? "vs-dense" : ""}`}>
          <thead>
            <tr>
              <th scope="col">{t.head[0] ? t.head[0] : <span className="sr-only">Area</span>}</th>
              <th scope="col">{t.head[1]}</th>
              <th scope="col">{ours(t.head[2])}</th>
            </tr>
          </thead>
          <tbody>
            {t.rows.map(([a, b, c], i) => (
              <tr key={a}>
                <th scope="row">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {a}
                </th>
                <td>{b}</td>
                <td>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {t.note && (
        <p className="mt-5 text-sm" style={{ color: "var(--body)" }}>
          {t.note}
        </p>
      )}
    </>
  );
}

export function ExplainSection(props: SectionProps) {
  const c = props.section.content!;
  // Heading on the left, text on the right, so a prose section uses the full row.
  return (
    <div className="grid gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div>
        <Head {...props} />
      </div>
      <div>
        <div className="space-y-4 text-[1.1rem] leading-relaxed" style={{ color: "var(--body)" }}>
          {(c.paragraphs ?? []).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {c.items && (
          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
            {c.items.map((it) =>
              it.href ? (
                <li key={it.t}>
                  <Link href={it.href} className="vs-link">
                    {it.t} <span aria-hidden>→</span>
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export function LinksSection(props: SectionProps) {
  const items = props.section.content?.items ?? [];
  return (
    <>
      <Head {...props} />
      <ul className="lidx-list mt-8">
        {items.map((it) => (
          <li key={it.t}>
            <Link href={it.href ?? "#"} className="lidx-row">
              <span className="lidx-main">
                <span className="lidx-title">{it.t}</span>
                {it.b && <span className="lidx-sub">{it.b}</span>}
              </span>
              <span />
              <span aria-hidden className="lidx-go">
                →
              </span>
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

/**
 * Closing section: the page's own heading and CTAs, full width and dark, as the last thing before the footer
 * (SpecPage places it after the FAQ and related links). Needs no content.
 */
export function CtaBandSection({ spec, section }: SectionProps) {
  return (
    <div className="spec-closing">
      <div>
        <Headline as="h2" text={section.heading} />
        {section.content?.intro && <p className="lead mt-4">{section.content.intro}</p>}
      </div>
      <div className="flex flex-wrap gap-3">
        <CtaLink intent={spec.primaryCta} source={`${src(spec.path)}_final`} className="!min-h-14 !px-8 !text-lg" />
        {spec.secondaryCta && <CtaLink intent={spec.secondaryCta} source={`${src(spec.path)}_final`} variant="ghost" className="!min-h-14 !px-8 !text-lg" />}
      </div>
    </div>
  );
}
