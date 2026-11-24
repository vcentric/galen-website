import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/blogFilters";

interface FeaturedPostProps {
  post: PostMeta;
}

/** The editor's choice: cover on one side, the story on the other, no box around it. */
const FeaturedPost = ({ post }: FeaturedPostProps) => {
  if (!post) return null;

  return (
    <Link href={`/blog/${post.slug}`} className="post-lead">
      <span className="post-lead-cover">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImage} alt="" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/galenai-icon.webp" alt="" className="post-cover-blank" />
        )}
      </span>
      <span className="post-lead-text">
        <span className="post-cat">
          Editor&apos;s choice <i>·</i> {post.category}
        </span>
        <span className="post-lead-title">{post.title}</span>
        <span className="post-lead-excerpt">{post.excerpt}</span>
        <span className="post-foot">
          <span>
            By {post.authorName}
            {post.authorRole ? `, ${post.authorRole}` : ""} · {formatDate(post.date)} · {post.readingTime} min read
          </span>
          <span aria-hidden className="lesson-card-go">
            →
          </span>
        </span>
      </span>
    </Link>
  );
};

export default FeaturedPost;
