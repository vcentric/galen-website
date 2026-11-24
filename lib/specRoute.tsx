import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PageSpec } from "@/content/site/types";
import SpecPage from "@/app/components/v2/SpecPage";
import { buildMetadata } from "./seo";

/**
 * Builds the three exports a spec-driven [slug] route needs.
 * Usage in a page.tsx:
 *
 *   const route = makeSpecRoute(features, [{ name: "Features", path: "/features" }]);
 *   export const dynamicParams = false;
 *   export const generateStaticParams = route.generateStaticParams;
 *   export const generateMetadata = route.generateMetadata;
 *   export default route.Page;
 *
 * Skeleton pages are noindex. Flipping `status` to "live" in the registry makes the
 * page indexable and adds it to the sitemap in one move.
 */
export function makeSpecRoute(list: PageSpec[], trail: { name: string; path: string }[]) {
  type Props = { params: Promise<{ slug: string }> };
  const get = async (params: Props["params"]) => {
    const { slug } = await params;
    return list.find((p) => p.slug === slug);
  };
  return {
    generateStaticParams: () => list.map((p) => ({ slug: p.slug })),
    generateMetadata: async ({ params }: Props): Promise<Metadata> => {
      const spec = await get(params);
      if (!spec) return {};
      return buildMetadata({
        title: spec.title,
        description: spec.description,
        path: spec.path,
        noindex: spec.status !== "live",
      });
    },
    Page: async ({ params }: Props) => {
      const spec = await get(params);
      if (!spec) notFound();
      return <SpecPage spec={spec} trail={trail} />;
    },
  };
}
