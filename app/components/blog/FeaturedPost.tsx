import Link from "next/link";
import { formatDate } from "@/lib/blogUtils";
import type { BlogPost } from "@/content/blogPosts";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  if (!post) return null;

  return (
    <div className="bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] rounded-3xl p-10 mb-12 relative overflow-hidden max-[768px]:p-8 max-[768px]:p-6 max-[480px]:p-5">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-[12px] text-cta font-sans text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-[0.05em] mb-6 border border-cta/20 shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
        </svg>
        Editor&apos;s Pick
      </div>

      <div className="grid grid-cols-[1.2fr_1fr] gap-12 items-center max-[1024px]:grid-cols-1 max-[1024px]:gap-8">
        {/* Text */}
        <div>
          <span className="inline-block text-cta font-sans text-[0.875rem] font-semibold uppercase tracking-[0.05em] mb-4">
            {post.category}
          </span>
          <h2 className="font-sans text-[2.25rem] font-semibold text-foreground leading-[1.3] mb-4 tracking-[-0.02em] max-[1024px]:text-[2rem] max-[768px]:text-[1.75rem] max-[480px]:text-2xl">
            {post.title}
          </h2>
          <p className="font-sans text-[1.05rem] text-[#555] leading-[1.7] mb-6 max-[768px]:text-base">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 font-sans text-[0.9rem] text-[#777] mb-6 max-[480px]:flex-wrap max-[480px]:text-[0.85rem]">
            <span>{post.author}</span>
            <span className="text-[#ccc]">•</span>
            <span>{formatDate(post.date)}</span>
            <span className="text-[#ccc]">•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 bg-cta text-white font-sans text-base font-semibold px-7 py-[0.875rem] rounded-xl no-underline transition-all duration-300 hover:bg-cta-hover hover:translate-x-[2px] group"
          >
            Read article
            <svg
              className="w-[18px] h-[18px] transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
          <img
            src={post.coverImage}
            alt={post.title}
            loading="eager"
            className="w-full h-full object-cover block"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
