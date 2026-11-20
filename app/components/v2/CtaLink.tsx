"use client";

import { CTA, ctaHref, type CtaIntent } from "@/lib/cta";
import { trackCTAClick } from "@/lib/analytics";
import { decorateUrl, getUtmParams } from "@/lib/utm";
import { useHydrated } from "@/lib/useHydrated";

/**
 * href for an intent: website UTM on the server render; on the client, a visitor who arrived with their
 * own UTM keeps theirs (nothing is overridden) and gets them on the bare link instead.
 */
export function useCtaHref(intent: CtaIntent, source: string): string {
  const tagged = ctaHref(intent, source);
  const hydrated = useHydrated();
  if (!hydrated) return tagged;
  return Object.keys(getUtmParams()).length ? decorateUrl(CTA[intent].href) : decorateUrl(tagged);
}

/** A text link (not a button) to an app intent, with the same UTM and click tracking as CtaLink. */
export function AppLink({
  intent,
  source,
  children,
  className,
}: {
  intent: CtaIntent;
  source: string;
  children: React.ReactNode;
  className?: string;
}) {
  const href = useCtaHref(intent, source);
  return (
    <a
      href={href}
      className={className}
      data-cta={intent}
      rel="noopener"
      onClick={() => trackCTAClick(CTA[intent].href, { source, button_type: "link", button_text: String(children), intent })}
    >
      {children}
    </a>
  );
}

/**
 * The only way a v2 page links to an app, a store or the demo form.
 * Renders a plain <a> on the server (works with JS off, no layout shift),
 * then adds UTM carry-over and GA4 cta_click tracking on the client.
 */
export default function CtaLink({
  intent,
  source,
  variant = "primary",
  label,
  className = "",
}: {
  intent: CtaIntent;
  source: string; // where on the page: "hero", "final", "go_ask_hero" ...
  variant?: "primary" | "ghost";
  label?: string;
  className?: string;
}) {
  const cta = CTA[intent];
  const href = useCtaHref(intent, source);
  const text = label ?? cta.label;
  const external = cta.href.startsWith("http");
  return (
    <a
      href={href}
      className={`btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} ${className}`}
      data-cta={intent}
      {...(external ? { rel: "noopener" } : {})}
      onClick={() =>
        trackCTAClick(cta.href, {
          source,
          button_type: variant === "primary" ? "primary" : "secondary",
          button_text: text,
          intent,
        })
      }
    >
      {text}
    </a>
  );
}
