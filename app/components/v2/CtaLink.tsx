"use client";

import { useEffect, useState } from "react";
import { CTA, type CtaIntent } from "@/lib/cta";
import { trackCTAClick } from "@/lib/analytics";
import { decorateUrl } from "@/lib/utm";

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
  const [href, setHref] = useState<string>(cta.href);
  useEffect(() => setHref(decorateUrl(cta.href)), [cta.href]);
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
