import Link from "next/link";
import CtaLink from "@/app/components/v2/CtaLink";
import { Kicker } from "@/app/components/v2/ui";

export const metadata = { title: "Page not found | GalenAI", robots: { index: false, follow: true } };

const LINKS = [
  { label: "Free MBBS lessons", href: "/learn" },
  { label: "NEET PG guide", href: "/exams/neet-pg" },
  { label: "Features", href: "/features" },
  { label: "For medical colleges", href: "/institutions" },
  { label: "Articles", href: "/blog" },
  { label: "How to use GalenAI", href: "/how-to-use" },
];

/** 404 with real ways forward, so a mistyped or retired URL still lands somewhere useful. */
export default function NotFound() {
  return (
    <div className="v2">
      <section className="wrap pt-28 pb-24 md:pt-36">
        <Kicker>404</Kicker>
        <h1 className="h1 mt-5">
          This page is not <span className="acc">here.</span>
        </h1>
        <p className="lead mt-6">The link may be old or mistyped. These are the pages people usually want.</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-block rounded-full border-2 border-[#2e2e2e]/15 bg-white/60 px-4 py-2 font-bold hover:border-[#eb602d]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Go to the home page
          </Link>
          <CtaLink intent="download" source="not_found" variant="ghost" />
        </div>
      </section>
    </div>
  );
}
