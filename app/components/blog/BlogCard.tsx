import Link from "next/link";
import { formatDate } from "@/lib/blogUtils";
import type { BlogPost } from "@/content/blogPosts";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white rounded-[1.25rem] overflow-hidden no-underline flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_16px_rgba(0,0,0,0.06)] h-full hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12),0_0_0_1px_rgba(235,96,45,0.1)] group"
    >
      <div className="relative w-full pt-[56.25%] bg-surface overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-white/85 backdrop-blur-[12px] text-cta font-sans text-[0.7rem] font-semibold px-[0.875rem] py-[0.375rem] rounded-full uppercase tracking-[0.05em] border border-cta/15 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1 max-[768px]:p-5">
        <h3 className="font-sans text-xl font-semibold text-foreground mb-3 leading-[1.4] line-clamp-2">
          {post.title}
        </h3>
        <p className="font-sans text-[0.95rem] text-foreground/60 leading-relaxed mb-4 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-auto">
          <span className="font-sans text-[0.85rem] text-foreground/40">
            {formatDate(post.date)}
          </span>
          <span className="text-foreground/20 text-[0.85rem]">•</span>
          <span className="font-sans text-[0.85rem] text-foreground/40">
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
