import { getAllCategories, getCategorySlug, getCategoryFromSlug } from "@/lib/blogUtils";
import BlogIndexContent from "../../BlogIndexContent";

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: getCategorySlug(cat) }));
}

export default function BlogCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryName = getCategoryFromSlug(params.category);
  return <BlogIndexContent initialCategory={categoryName || "All"} />;
}
