"use client";

import { useParams } from "next/navigation";
import { getCategoryFromSlug } from "@/lib/blogUtils";
import BlogIndexContent from "../../BlogIndexContent";

export default function BlogCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const categoryName = getCategoryFromSlug(categorySlug);

  return <BlogIndexContent initialCategory={categoryName || "All"} />;
}
