import Link from "next/link";
import CtaLink from "@/app/components/v2/CtaLink";

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
      <section className="wrap nf">
        <div>
          <p className="nf-code" aria-hidden>
            4<span>0</span>4
          </p>
          <h1 className="h1 !text-[clamp(2.2rem,5vw,3.6rem)]">
            This page is not <span className="acc">here.</span>
          </h1>
          <p className="lead mt-5">The link may be old or mistyped. These are the pages people usually want.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              Go to the home page
            </Link>
            <CtaLink intent="download" source="not_found" variant="ghost" />
          </div>
        </div>
        <ul className="exam-hub-list nf-list">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="exam-hub-row exam-hub-row-plain">
                <span className="fout-t">{l.label}</span>
                <span aria-hidden className="fout-go">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
