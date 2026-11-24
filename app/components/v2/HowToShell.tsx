import Link from "next/link";
import type { ReactNode } from "react";
import { howToRoles, howToRoleKeys, type HowToRole } from "@/content/site/howto";
import { CONTACT, LINKS } from "@/lib/site";
import HowToEnhancer from "./HowToEnhancer";
import { Breadcrumbs } from "./ui";

/**
 * Layout for /how-to-use/{role} and /how-to-use/{role}/{guide}: role tabs on top,
 * a sticky rail with the role's guides and "On this page", the guide in the middle.
 * Mirrors the approved How to Use page (role tabs + contents rail).
 */
export default function HowToShell({
  role,
  current,
  toc = [],
  trail,
  children,
  footer,
}: {
  role: HowToRole;
  current: string; // guide slug, or "" for the role landing
  toc?: { id: string; label: string }[];
  trail: { name: string; path: string }[];
  children: ReactNode;
  footer?: ReactNode;
}) {
  const r = howToRoles[role];
  return (
    <div className="v2 howto-page">
      <div className="wrap pt-24 md:pt-28">
        <Breadcrumbs trail={trail} />
        <nav aria-label="Choose your role" className="howto-roles">
          {howToRoleKeys.map((k) => (
            <Link key={k} href={`/how-to-use/${k}`} aria-current={k === role ? "page" : undefined}>
              {howToRoles[k].label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="wrap grid gap-10 pb-20 pt-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-14">
        <aside className="hidden lg:block">
          <div className="howto-rail">
            <p className="exam-nav-h">{r.label} guides</p>
            <ol>
              <li>
                <Link href={`/how-to-use/${role}`} aria-current={current === "" ? "page" : undefined} className="howto-rail-a">
                  Start here
                </Link>
              </li>
              {r.guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/how-to-use/${role}/${g.slug}`} aria-current={g.slug === current ? "page" : undefined} className="howto-rail-a">
                    {g.title}
                  </Link>
                  {g.slug === current && toc.length > 0 && (
                    <ol className="exam-nav-secs !ml-0">
                      {toc.map((t) => (
                        <li key={t.id}>
                          <a href={`#${t.id}`}>{t.label}</a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
            <div className="howto-help">
              <p className="exam-nav-h">Need help?</p>
              <a href={`mailto:${CONTACT.support}`}>{CONTACT.support}</a>
              <a href={LINKS.whatsapp} rel="noopener">
                WhatsApp us
              </a>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Phone: guide picker in place of the rail */}
          <details className="howto-fold lg:hidden">
            <summary className="cursor-pointer font-[family-name:var(--font-space-var)] font-bold">All {r.label.toLowerCase()} guides</summary>
            <ol className="mt-3 space-y-2 text-[15px]">
              <li>
                <Link href={`/how-to-use/${role}`}>Start here</Link>
              </li>
              {r.guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/how-to-use/${role}/${g.slug}`} className={g.slug === current ? "font-bold text-[#c24a1c]" : ""}>
                    {g.title}
                  </Link>
                </li>
              ))}
            </ol>
          </details>

          <HowToEnhancer>{children}</HowToEnhancer>
          {footer}
        </div>
      </div>
    </div>
  );
}
