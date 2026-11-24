import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CONTACT, LINKS } from "@/lib/site";
import CtaLink from "@/app/components/v2/CtaLink";
import { Headline, Kicker } from "@/app/components/v2/ui";

export const metadata = buildMetadata({
  title: "Contact GalenAI",
  description:
    "Get in touch with GalenAI: student support, medical college and faculty enquiries, demos and partnerships. Email, phone and WhatsApp. Bengaluru, India.",
  path: "/contact",
});

type Way = { label: string; value: string; href: string; external?: boolean };

const COLLEGES: Way[] = [
  { label: "Email", value: CONTACT.corporate, href: `mailto:${CONTACT.corporate}` },
  { label: "Phone", value: CONTACT.phone, href: CONTACT.phoneHref },
  { label: "LinkedIn", value: "galenai-india", href: LINKS.linkedin, external: true },
];
const STUDENTS: Way[] = [
  { label: "Email", value: CONTACT.support, href: `mailto:${CONTACT.support}` },
  { label: "Instagram", value: "@galen_ai", href: LINKS.instagram, external: true },
];

function Ways({ ways }: { ways: Way[] }) {
  return (
    <ul className="contact-ways">
      {ways.map((w) => (
        <li key={w.label}>
          <a href={w.href} rel={w.external ? "noopener" : undefined}>
            <span className="contact-label">{w.label}</span>
            <span className="contact-value">{w.value}</span>
            <span aria-hidden className="fout-go">
              {w.external ? "↗" : "→"}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Contact details must match lib/site.ts exactly (design system section 8). */
export default function ContactPage() {
  return (
    <div className="v2 contact-page">
      <header className="wrap exam-head">
        <Kicker>Contact</Kicker>
        <div className="mt-5">
          <Headline text="Talk to" accent="us." />
        </div>
        <p className="lead mt-6">Student support, college and faculty enquiries, demos and partnerships.</p>
      </header>

      <section className="wrap contact-wrap">
        <div className="contact">
        <div className="contact-col">
          <span className="happening-n">01</span>
          <h2 className="lidx-name">Colleges and faculty</h2>
          <Ways ways={COLLEGES} />
          <div className="mt-7">
            <CtaLink intent="demo" source="contact" />
          </div>
        </div>
        <div className="contact-col">
          <span className="happening-n">02</span>
          <h2 className="lidx-name">Students</h2>
          <Ways ways={STUDENTS} />
          <div className="mt-7">
            <CtaLink intent="whatsapp" source="contact" variant="ghost" />
          </div>
        </div>
        </div>
      </section>

      <div className="tone-dark contact-foot">
        <div className="wrap contact-address">
          <address>
            <span className="vs-label">Registered office</span>
            <span>{CONTACT.address}</span>
          </address>
          <p>
            <span className="vs-label">Looking for help with the app?</span>
            <Link href="/how-to-use" className="vs-link">
              How to use GalenAI <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
