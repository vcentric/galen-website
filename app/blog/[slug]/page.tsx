import { getAllPosts } from "@/lib/blogUtils";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
