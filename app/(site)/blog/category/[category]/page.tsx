import { getAllPostsMeta } from "@/lib/posts";
import { BLOG_CATEGORIES } from "@/content/categories";
import { getCategorySlug, getCategoryFromSlug } from "@/lib/blogFilters";
import BlogIndexContent from "../../BlogIndexContent";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = getCategoryFromSlug(category, BLOG_CATEGORIES) ?? "Articles";
  const posts = (await getAllPostsMeta()).filter((p) => p.category === name);
  return buildMetadata({
    title: `${name}: Articles for Medical Students`,
    description: `GalenAI articles in ${name}: clear, sourced writing for medical students and faculty on exams, the CBME curriculum and AI in medicine.`,
    path: `/blog/category/${category}`,
    noindex: posts.length === 0, // an empty category page is thin: keep it out of the index
  });
}

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
