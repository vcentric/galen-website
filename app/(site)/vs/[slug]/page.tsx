import { comparisons } from "@/content/site";
import { makeSpecRoute } from "@/lib/specRoute";

const route = makeSpecRoute(comparisons, []);

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
