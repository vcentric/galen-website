import { getAllPostsMeta } from "@/lib/posts";
import { BLOG_CATEGORIES } from "@/content/categories";
import { getCategorySlug, getCategoryFromSlug } from "@/lib/blogFilters";
import BlogIndexContent from "../../BlogIndexContent";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({ category: getCategorySlug(cat) }));
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName = getCategoryFromSlug(category, BLOG_CATEGORIES);
  const posts = await getAllPostsMeta();
  const editorsChoice = posts.filter((post) => post.isEditorsChoice).slice(0, 2);

  return (
    <BlogIndexContent
      posts={posts}
      editorsChoice={editorsChoice}
      initialCategory={categoryName || "All"}
    />
  );
}
