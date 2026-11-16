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
    <div className="v2" data-tone="neutral">
      <div className="wrap pt-24 md:pt-28">
        <Breadcrumbs trail={trail} />
        <nav aria-label="Choose your role" className="-mx-1 flex gap-1.5 overflow-x-auto pb-1">
          {howToRoleKeys.map((k) => (
            <Link
              key={k}
              href={`/how-to-use/${k}`}
              aria-current={k === role ? "page" : undefined}
              className={`shrink-0 rounded-xl border px-4 py-2 font-[family-name:var(--font-space-var)] font-semibold ${
                k === role ? "border-[#f6d7c2] bg-[#fff0e4] text-[#2e2e2e]" : "border-transparent text-[#6e655e] hover:text-[#2e2e2e]"
              }`}
            >
              {howToRoles[k].label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="wrap grid gap-10 pb-20 pt-8 lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto pr-2 text-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6e655e]">{r.label} guides</p>
            <ol className="mt-3 border-l border-[#e7dfd6]">
              <li>
                <Link
                  href={`/how-to-use/${role}`}
                  className={`-ml-px block border-l-2 py-1.5 pl-3.5 ${current === "" ? "border-[#eb602d] font-semibold text-[#c24a1c]" : "border-transparent text-[#6e655e] hover:text-[#2e2e2e]"}`}
                >
                  Start here
                </Link>
              </li>
              {r.guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/how-to-use/${role}/${g.slug}`}
                    aria-current={g.slug === current ? "page" : undefined}
                    className={`-ml-px block border-l-2 py-1.5 pl-3.5 ${g.slug === current ? "border-[#eb602d] font-semibold text-[#c24a1c]" : "border-transparent text-[#6e655e] hover:text-[#2e2e2e]"}`}
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ol>
            {toc.length > 0 && (
              <>
                <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.14em] text-[#6e655e]">On this page</p>
                <ol className="mt-3 space-y-1.5">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="text-[#6e655e] hover:text-[#2e2e2e]">
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </>
            )}
            <div className="mt-7 rounded-2xl border border-[#e7dfd6] bg-white p-4 text-[13px] leading-relaxed text-[#6e655e]">
              <b className="mb-1 block font-[family-name:var(--font-space-var)] text-[15px] text-[#2e2e2e]">Need help?</b>
              <a href={`mailto:${CONTACT.support}`} className="underline">{CONTACT.support}</a>
              <br />
              <a href={LINKS.whatsapp} rel="noopener" className="underline">WhatsApp us</a>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Phone: guide picker in place of the rail */}
          <details className="mb-6 rounded-2xl border border-[#e7dfd6] bg-white p-4 lg:hidden">
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
