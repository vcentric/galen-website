import { testimonials } from "@/content/site/demos";

/**
 * Auto-scrolling testimonial row. CSS only (styles in app/v2.css, .marquee):
 * the list is rendered twice and the track slides by half its width, so the loop
 * is seamless. Pauses on hover or keyboard focus. With reduced motion it becomes a
 * normal swipeable row and the duplicate is hidden. The duplicate is aria-hidden,
 * so screen readers hear each quote once.
 */
function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="card flex w-[300px] shrink-0 flex-col p-6 sm:w-[360px] sm:p-7">
      <span aria-hidden className="font-[family-name:var(--font-space-var)] text-4xl leading-none text-[#eb602d]">
        &ldquo;
      </span>
      <blockquote className="mt-2 flex-1 text-[1rem] leading-relaxed">{t.quote}</blockquote>
      <figcaption className="mt-5">
        <span className="block font-bold">{t.name}</span>
        <span className="block text-sm" style={{ color: "var(--body)" }}>
          {t.meta}
        </span>
      </figcaption>
    </figure>
  );
}

export default function TestimonialMarquee() {
  return (
    <div className="marquee" tabIndex={0} aria-label="Student testimonials">
      <div className="marquee-track">
        <ul className="marquee-group">
          {testimonials.map((t) => (
            <li key={t.name} className="flex">
              <Card t={t} />
            </li>
          ))}
        </ul>
        <ul className="marquee-group marquee-dupe" aria-hidden>
          {testimonials.map((t) => (
            <li key={t.name} className="flex">
              <Card t={t} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
