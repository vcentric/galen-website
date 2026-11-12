import type { ComponentType } from "react";
import type { PageSpec, SectionSpec } from "@/content/site/types";
import { DemoContactSection, DemoFormSection, DemoTrySection, DemoWhySection } from "./bookDemo";

/**
 * Section registry. This is how the skeleton turns into the real site.
 *
 * SpecPage looks up a component for each section in this order:
 *   1. byPage["<path>#<section id>"]   a bespoke section for one page
 *   2. byKind[<section kind>]          the shared component for that kind
 *   3. <Blueprint>                     the dashed placeholder with build notes
 *
 * Executor: build a shared component per kind first (demo, steps, features, screens,
 * compare, proof, explain, video, form, cta, links), register it in byKind, and every
 * spec page upgrades at once. Then add byPage overrides where a page needs its own.
 * Section components are server components unless they need interaction.
 */
export type SectionProps = { spec: PageSpec; section: SectionSpec };

export const byKind: Partial<Record<SectionSpec["kind"], ComponentType<SectionProps>>> = {
  // steps: StepsSection,
};

export const byPage: Record<string, ComponentType<SectionProps>> = {
  "/institutions/book-demo#form": DemoFormSection,
  "/institutions/book-demo#why": DemoWhySection,
  "/institutions/book-demo#try": DemoTrySection,
  "/institutions/book-demo#contact": DemoContactSection,
};

export const resolveSection = (spec: PageSpec, section: SectionSpec) =>
  byPage[`${spec.path}#${section.id}`] ?? byKind[section.kind] ?? null;
