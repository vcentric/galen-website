import type { ComponentType } from "react";
import type { PageSpec, SectionSpec } from "@/content/site/types";
import { DemoContactSection, DemoFormSection, DemoTrySection, DemoWhySection } from "./bookDemo";
import {
  CompareSection,
  CtaBandSection,
  DemoSection,
  ExplainSection,
  FeaturesSection,
  LinksSection,
  ScreensSection,
  StepsSection,
} from "./kinds";

/**
 * Section registry. SpecPage looks up a component for each section in this order:
 *   1. byPage["<path>#<section id>"]   a bespoke section for one page
 *   2. byKind[<section kind>]          shared component, used when `content` is filled
 *                                      (the "cta" kind needs no content)
 *   3. <Blueprint>                     dashed placeholder with build notes
 *
 * To finish a section: fill its `content` in content/site/*.ts. To give one page a
 * custom section, add a byPage entry.
 */
export type SectionProps = { spec: PageSpec; section: SectionSpec };

export const byKind: Partial<Record<SectionSpec["kind"], ComponentType<SectionProps>>> = {
  steps: StepsSection,
  features: FeaturesSection,
  screens: ScreensSection,
  compare: CompareSection,
  explain: ExplainSection,
  links: LinksSection,
  demo: DemoSection,
  cta: CtaBandSection,
};

export const byPage: Record<string, ComponentType<SectionProps>> = {
  "/institutions/book-demo#form": DemoFormSection,
  "/institutions/book-demo#why": DemoWhySection,
  "/institutions/book-demo#try": DemoTrySection,
  "/institutions/book-demo#contact": DemoContactSection,
};

export const resolveSection = (spec: PageSpec, section: SectionSpec) => {
  const bespoke = byPage[`${spec.path}#${section.id}`];
  if (bespoke) return bespoke;
  if (section.kind === "cta" || section.content) return byKind[section.kind] ?? null;
  return null;
};
