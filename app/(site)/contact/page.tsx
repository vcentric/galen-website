import { buildMetadata } from "@/lib/seo";
import { CONTACT, LINKS } from "@/lib/site";
import CtaLink from "@/app/components/v2/CtaLink";
import { Headline, Kicker, Section } from "@/app/components/v2/ui";

export const metadata = buildMetadata({
  title: "Contact GalenAI",
  description:
    "Get in touch with GalenAI. Student support, college and faculty enquiries, and partnerships. Bengaluru, India.",
  path: "/contact",
  noindex: true, // TODO(exec): remove when built and staticRoutes "/contact" is live
});

/** Contact block must match lib/site.ts exactly (design system section 8). */
export default function ContactPage() {
  return (
    <div className="v2" data-tone="neutral">
      <header className="wrap pt-32 md:pt-40 pb-6">
        <Kicker>Contact</Kicker>
        <div className="mt-5">
          <Headline text="Talk to" accent="us." />
        </div>
      </header>
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="h3">Colleges and faculty</h2>
            <p className="mt-3">
              <a href={`mailto:${CONTACT.corporate}`}>{CONTACT.corporate}</a>
              <br />
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>
            <div className="mt-5">
              <CtaLink intent="demo" source="contact" />
            </div>
          </div>
          <div className="card p-6">
            <h2 className="h3">Students</h2>
            <p className="mt-3">
              <a href={`mailto:${CONTACT.support}`}>{CONTACT.support}</a>
              <br />
              <a href={LINKS.instagram} rel="noopener">Instagram @galen_ai</a>
            </p>
            <div className="mt-5">
              <CtaLink intent="whatsapp" source="contact" variant="ghost" />
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm opacity-70">{CONTACT.address}</p>
      </Section>
    </div>
  );
}
