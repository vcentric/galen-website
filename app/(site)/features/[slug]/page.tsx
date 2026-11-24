import { features } from "@/content/site";
import { makeSpecRoute } from "@/lib/specRoute";

const route = makeSpecRoute(features, [{ name: "Features", path: "/features" }]);

export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
