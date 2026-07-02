import { getAllPostsMeta } from "@/lib/posts";
import BlogIndexContent from "./BlogIndexContent";

export default async function BlogPage() {
  const posts = await getAllPostsMeta();
  const editorsChoice = posts.filter((post) => post.isEditorsChoice).slice(0, 2);
  return <BlogIndexContent posts={posts} editorsChoice={editorsChoice} />;
}
