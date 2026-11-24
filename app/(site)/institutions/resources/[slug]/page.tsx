import { institutionResources } from "@/content/site";
import { makeSpecRoute } from "@/lib/specRoute";

const route = makeSpecRoute(institutionResources, [{ name: "Institutions", path: "/institutions" }]);

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
