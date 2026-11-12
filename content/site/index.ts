import type { PageSpec } from "./types";
import { features } from "./features";
import { audiences, comparisons } from "./audiences";
import { institutionPages, institutionResources } from "./institutions";
import { howToRoles, howToRoleKeys } from "./howto";

export * from "./types";
export { features, audiences, comparisons, institutionPages, institutionResources };
export { goPages } from "./go";
export { howToRoles, howToRoleKeys } from "./howto";

export const specPages: PageSpec[] = [
  ...features,
  ...audiences,
  ...comparisons,
  ...institutionPages,
  ...institutionResources,
];

export const findSpec = (list: PageSpec[], slug: string) => list.find((p) => p.slug === slug);

/**
 * Bespoke routes (not spec-driven). `live` controls sitemap inclusion.
 * Flip to true as each page passes its checklist in docs/v2/EXECUTION.md.
 */
export const staticRoutes: { path: string; live: boolean; priority: number }[] = [
  { path: "", live: true, priority: 1 },
  { path: "/institutions", live: true, priority: 0.9 },
  { path: "/blog", live: true, priority: 0.8 },
  { path: "/team", live: true, priority: 0.5 },
  { path: "/download", live: true, priority: 0.6 },
  { path: "/privacy", live: true, priority: 0.2 },
  { path: "/terms", live: true, priority: 0.2 },
  { path: "/features", live: false, priority: 0.8 },
  { path: "/how-to-use", live: true, priority: 0.7 },
  { path: "/contact", live: false, priority: 0.4 },
  // /qr and /go/* are deliberately absent: noindex.
];

/** How-to routes go live together, once the port from the source page is checked. */
export const HOW_TO_LIVE = true;

const BESPOKE_LABELS: Record<string, string> = {
  "/": "GalenAI for students",
  "/institutions": "GalenAI for medical colleges",
  "/features": "All features",
  "/how-to-use": "How to use GalenAI",
  "/download": "Download the app",
};

/** Human label for an internal path, for related-link lists. */
export function pageLabel(path: string): string {
  if (BESPOKE_LABELS[path]) return BESPOKE_LABELS[path];
  const spec = specPages.find((p) => p.path === path);
  if (spec) return spec.kicker.replace(/ · Coming soon$/, "");
  const m = path.match(/^\/how-to-use\/(\w+)(?:\/([\w-]+))?$/);
  if (m) {
    const role = howToRoles[m[1] as keyof typeof howToRoles];
    const guide = role?.guides.find((g) => g.slug === m[2]);
    if (role) return guide ? `${role.label} guide: ${guide.title}` : `${role.label} guide`;
  }
  return path;
}

export const howToPaths = () =>
  howToRoleKeys.flatMap((role) => [
    `/how-to-use/${role}`,
    ...howToRoles[role].guides.map((g) => `/how-to-use/${role}/${g.slug}`),
  ]);
