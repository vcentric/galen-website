"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackCTAClick } from "@/lib/analytics";

/**
 * A button-style link that reports cta_click. For buttons that are not one of the CtaLink intents:
 * internal ones ("Show your college") and a lesson's own link into the app.
 */
export default function TrackedLink({
  href,
  source,
  label,
  primary = true,
  className,
  children,
}: {
  href: string;
  source: string; // <page>_<placement>, same convention as CtaLink
  label: string; // the button text, as reported
  primary?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const onClick = () => trackCTAClick(href, { source, button_type: primary ? "primary" : "secondary", button_text: label });
  return href.startsWith("/") ? (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <a href={href} rel="noopener" className={className} onClick={onClick}>
      {children}
    </a>
  );
}
