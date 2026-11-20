import Image from "next/image";
import { SiLinkedin } from "react-icons/si";
import { founders, advisors, timelineItems } from "@/app/data/team";
import { breadcrumbLd } from "@/lib/seo";
import JsonLd from "@/app/components/v2/JsonLd";
import { Kicker, Section } from "@/app/components/v2/ui";

/** Team page. Metadata comes from team/layout.tsx; people and story are data in app/data/team.ts. */

type Person = { name: string; title: string; photo: string; linkedin?: string; subTitle?: string; quote?: string; bio?: string };

function PersonCard({ p, priority = false }: { p: Person; priority?: boolean }) {
  return (
    <li className="card flex flex-col gap-6 p-6 sm:flex-row sm:p-7">
      {/* 3:4 portrait. The frame is fixed, so a new photo of any size drops in without shifting the layout. */}
      <div className="relative aspect-[3/4] w-36 shrink-0 self-start overflow-hidden rounded-[18px] bg-[#2e2e2e]/5 sm:w-[200px]">
        <Image src={p.photo} alt={p.name} fill sizes="(min-width: 640px) 200px, 144px" priority={priority} className="object-cover object-top" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="h3 !text-[1.5rem]">{p.name}</h3>
        <p className="mt-2 font-bold text-[#c94d20]">{p.title}</p>
        {p.subTitle && (
          <p className="mt-2 text-sm font-semibold" style={{ color: "var(--body)" }}>
            {p.subTitle}
          </p>
        )}
        {p.quote && <blockquote className="mt-4 flex-1 border-l-[3px] border-[#eb602d] pl-4 font-semibold leading-snug">{p.quote}</blockquote>}
        {p.bio && (
          <p className="mt-4 flex-1 leading-relaxed" style={{ color: "var(--body)" }}>
            {p.bio}
          </p>
        )}
        {p.linkedin && (
          <a
            href={p.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 self-start text-sm font-bold underline decoration-[#eb602d] decoration-2 underline-offset-4"
          >
            <SiLinkedin className="h-4 w-4" aria-hidden />
            LinkedIn<span className="sr-only">: {p.name}</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function TeamPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
  ];
  return (
    <div className="v2" data-tone="neutral">
      <JsonLd data={breadcrumbLd(trail)} />

      <header className="wrap pt-24 pb-6 md:pt-32">
        <Kicker>The people</Kicker>
        <h1 className="h1 mt-5">
          Meet the minds behind <span className="acc">GalenAI.</span>
        </h1>
        <p className="lead mt-6">Built by medicos, engineers, and industry veterans.</p>
      </header>

      <Section id="founders">
        <Kicker>Founders</Kicker>
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {founders.map((p) => (
            <PersonCard key={p.name} p={p} priority />
          ))}
        </ul>
      </Section>

      <Section id="advisors">
        <Kicker>Guidance</Kicker>
        <h2 className="h2 mt-5">
          Strategic <span className="acc">advisors.</span>
        </h2>
        <ul className="mt-10 grid gap-4 lg:grid-cols-2">
          {advisors.map((p) => (
            <PersonCard key={p.name} p={p} />
          ))}
        </ul>
      </Section>

      <Section id="story" tone="dark">
        <Kicker>Our story</Kicker>
        <h2 className="h2 mt-5">
          How it all <span className="acc">started.</span>
        </h2>
        <p className="lead mt-5">
          From a simple realization that medical training wasn&apos;t evolving, to a fast-growing platform serving students nationwide. Here is our
          journey so far.
        </p>
        <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {timelineItems.map((item, i) => (
            <li key={item.title} className="border-t-[3px] pt-5" style={{ borderColor: "var(--rule)" }}>
              <div className="flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-space-var)] text-3xl font-bold text-[#eb602d]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: "var(--body)" }}>
                  {item.date}
                </span>
              </div>
              <h3 className="h3 mt-3 !text-[1.35rem]">{item.title}</h3>
              <p className="mt-2 leading-relaxed" style={{ color: "var(--body)" }}>
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}
