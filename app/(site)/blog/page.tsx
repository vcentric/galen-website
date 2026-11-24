import { getAllPostsMeta } from "@/lib/posts";
import BlogIndexContent from "./BlogIndexContent";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Articles: NEET PG, CBME and AI in Medicine",
  description:
    "Articles for medical students and faculty: NEET PG and exam preparation, competency-based medical education (CBME) explained, and how AI is changing medicine.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPostsMeta();
  const editorsChoice = posts.filter((post) => post.isEditorsChoice).slice(0, 2);
  return <BlogIndexContent posts={posts} editorsChoice={editorsChoice} />;
}
