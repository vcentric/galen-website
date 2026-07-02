import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blogFilters";

interface BlogCardProps {
  post: PostMeta;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white rounded-3xl overflow-hidden no-underline flex flex-col transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(235,96,45,0.12)] border border-black/5 group"
    >
      <div className="relative w-full pt-[56.25%] bg-beige overflow-hidden">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-beige">
            <img src="/galenai-icon.webp" alt="" className="w-14 h-14 opacity-20" />
          </div>
        )}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-orange font-primary text-[0.65rem] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-orange/10 shadow-sm">
          {post.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        {post.category === "Case Studies" && post.caseStudyInstitution && (
          <div className="mb-3 flex flex-col items-start gap-2">
            <span className="font-primary text-[0.68rem] font-bold uppercase tracking-wider text-dark/50">
              {post.caseStudyInstitution}
            </span>
            {post.caseStudyOutcome && (
              <span className="bg-orange/10 text-orange font-primary text-[0.72rem] font-bold px-3 py-1.5 rounded-full leading-snug">
                {post.caseStudyOutcome}
              </span>
            )}
          </div>
        )}
        <h3 className="font-primary text-[1.35rem] font-medium text-dark mb-3 leading-[1.3] line-clamp-2 transition-colors duration-300 group-hover:text-orange">
          {post.title}
        </h3>
        <p className="font-secondary text-[0.95rem] text-text-secondary leading-relaxed mb-6 line-clamp-2 flex-1">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-4 border-t border-black/5 group-hover:border-orange/20 transition-colors duration-300 flex flex-col gap-1.5">
          <span className="font-secondary text-[0.8rem] font-semibold text-dark/70">
            By {post.authorName}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-secondary text-[0.8rem] font-medium text-text-muted">
              {formatDate(post.date)}
            </span>
            <span className="text-black/10 text-[0.8rem]">•</span>
            <span className="font-secondary text-[0.8rem] font-medium text-text-muted">
              {post.readingTime} min read
            </span>
          </div>
        </div>
      </div>
    </Link>

  );
};

export default BlogCard;
