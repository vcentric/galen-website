import Image from "next/image";
import Link from "next/link";
import { SiLinkedin } from "react-icons/si";
import { founders, advisors, timelineItems } from "@/app/data/team";
import { breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Kicker, Section } from "@/app/components/v2/ui";

/**
 * Team page. Metadata comes from team/layout.tsx; people and story are data in app/data/team.ts.
 * Founders and advisors share one layout (two people side by side under a rule, photo beside the text),
 * the founders larger and led by their quote. Photos are shown in full colour, in one fixed 3:4 frame.
 */

const LinkedIn = ({ href, name }: { href: string; name: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="team-in">
    <SiLinkedin className="h-4 w-4" aria-hidden />
    LinkedIn<span className="sr-only">: {name}</span>
  </a>
);

/** "A | B" in the data becomes separate lines. */
const lines = (s: string) => s.split("|").map((t) => t.trim());

export default function TeamPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
  ];
  return (
    <div className="v2">
      <JsonLd data={breadcrumbLd(trail)} />

      <header className="wrap exam-head">
        <Kicker>The people</Kicker>
        <h1 className="h1 mt-5 max-w-[14ch]">
          Meet the minds behind <span className="acc">GalenAI.</span>
        </h1>
        <p className="lead mt-6">Built by medicos, engineers, and industry veterans.</p>
      </header>

      {/* Founders: the quote leads, the portrait and credentials sit beside it. */}
      <section id="founders" className="wrap team-founders">
        <p className="exam-nav-h">Founders</p>
        <ul className="team-pair">
          {founders.map((p, i) => (
            <li key={p.name} className="founder">
              <div className="team-photo founder-photo">
                <Image src={p.photo} alt={p.name} fill sizes="(min-width: 768px) 260px, 60vw" priority className="object-cover object-top" />
              </div>
              <div>
                <div className="founder-q">
                  <span className="happening-n">{String(i + 1).padStart(2, "0")}</span>
                  <blockquote className="founder-quote">“{p.quote.replace(/^"|"$/g, "")}”</blockquote>
                </div>
                <div className="founder-who">
                  <h2 className="founder-name">{p.name}</h2>
                  <p className="founder-title">{p.title}</p>
                  <ul className="founder-creds">
                    {lines(p.subTitle).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <LinkedIn href={p.linkedin} name={p.name} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Advisors: the same two-up layout on the paper tone, with the name leading in place of a quote. */}
      <div className="exam-band">
        <section id="advisors" className="wrap team-advisors">
          <Kicker>Guidance</Kicker>
          <h2 className="h2 mt-5">
            Strategic <span className="acc">advisors.</span>
          </h2>
          <ul className="team-pair">
            {advisors.map((p) => (
              <li key={p.name} className="founder advisor">
                <div className="team-photo founder-photo">
                  <Image src={p.photo} alt={p.name} fill sizes="(min-width: 768px) 200px, 50vw" className="object-cover object-top" />
                </div>
                <div>
                  <h3 className="advisor-name">{p.name}</h3>
                  <p className="founder-title">{p.title}</p>
                  <ul className="founder-creds advisor-creds">
                    {lines(p.bio).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <LinkedIn href={p.linkedin} name={p.name} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Story: a timeline along one line. */}
      <Section id="story" tone="dark">
        <Kicker>Our story</Kicker>
        <h2 className="h2 mt-5">
          How it all <span className="acc">started.</span>
        </h2>
        <p className="lead mt-5">
          From a simple realization that medical training wasn&apos;t evolving, to a fast-growing platform serving students nationwide. Here is our
          journey so far.
        </p>
        <ol className="team-line">
          {timelineItems.map((item) => (
            <li key={item.title}>
              <p className="team-line-date">{item.date}</p>
              <h3 className="team-line-t">{item.title.replace(/"([^"]*)"/, "“$1”")}</h3>
              <p className="team-line-b">{item.description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/contact" className="btn btn-primary">
            Talk to us
          </Link>
          <Link href="/institutions" className="vs-link">
            GalenAI for medical colleges <span aria-hidden>→</span>
          </Link>
        </div>
      </Section>
    </div>
  );
}
