import Link from "next/link";
import { formatDate } from "@/lib/blogUtils";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { BlogPost } from "@/content/blogPosts";

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  if (!post) return null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden no-underline mb-16 shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-black/5 hover:shadow-[0_24px_48px_rgba(235,96,45,0.12)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
    >
      <div className="w-full lg:w-1/2 relative aspect-video lg:aspect-auto overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <span className="absolute top-6 left-6 bg-orange text-white font-primary text-[0.7rem] font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg z-10">
          Editor&apos;s Choice
        </span>

      </div>
      <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
        <div className="mb-6">
          <span className="text-orange font-primary text-[0.75rem] font-bold uppercase tracking-widest block mb-4">
            {post.category}
          </span>
          <h2 className="font-primary text-[clamp(1.75rem,3vw,2.5rem)] font-medium text-dark leading-[1.1] mb-6 tracking-[-0.03em] group-hover:text-orange transition-colors duration-300">
            {post.title}
          </h2>
          <p className="font-secondary text-[clamp(1rem,1.5vw,1.15rem)] text-text-secondary leading-relaxed mb-8 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-primary text-[0.9rem] font-bold text-dark">
                {post.author}
              </span>
              <div className="flex items-center gap-2 text-text-muted text-[0.8rem] font-medium font-secondary">
                <span>{formatDate(post.date)}</span>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange/10 flex items-center justify-center group-hover:bg-orange group-hover:text-white transition-all duration-500">
            <ArrowUpRightIcon 
              className="w-5 h-5 transform transition-transform duration-500 group-hover:rotate-45" 
              strokeWidth={2.5}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedPost;
