import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blogFilters";

interface BlogCardProps {
  post: PostMeta;
}

/** One article as a cell in a ruled grid (see .post-grid): cover, category, title, excerpt, date. */
const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <span className="post-cover">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt="" loading="lazy" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/galenai-icon.webp" alt="" className="post-cover-blank" />
        )}
      </span>
      <span className="post-cat">{post.category}</span>
      {post.category === "Case Studies" && post.caseStudyInstitution && (
        <span className="post-case">
          {post.caseStudyInstitution}
          {post.caseStudyOutcome && <b>{post.caseStudyOutcome}</b>}
        </span>
      )}
      <span className="post-title">{post.title}</span>
      <span className="post-excerpt">{post.excerpt}</span>
      <span className="post-foot">
        <span>
          {formatDate(post.date)} · {post.readingTime} min read
        </span>
        <span aria-hidden className="lesson-card-go">
          →
        </span>
      </span>
    </Link>
  );
};

export default BlogCard;
