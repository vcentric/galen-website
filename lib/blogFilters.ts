// Client-safe blog helpers. These are pure functions over already-loaded post
// arrays and the shared PostMeta type. NO Keystatic reader import lives here, so
// this module is safe to import from client components. Data loading itself
// happens server-side in lib/posts.ts.

export interface PostMeta {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  coverImage: string;
  heroCaption: string;
  heroSource: string;
  category: string;
  tags: string[];
  authorName: string;
  authorRole: string;
  authorType: string;
  date: string;
  readingTime: number;
  isEditorsChoice: boolean;
  isPublished: boolean;
  isPressRelease: boolean;
  isB2B: boolean;
  caseStudyInstitution: string;
  caseStudyOutcome: string;
  partnerName: string;
  sources: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface PaginatedPosts {
  posts: PostMeta[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const searchPosts = (posts: PostMeta[], query: string): PostMeta[] => {
  if (!query || query.trim() === "") return posts;
  const q = query.toLowerCase();
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
  );
};

export const paginatePosts = (
  posts: PostMeta[],
  page: number = 1,
  postsPerPage: number = 12
): PaginatedPosts => {
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  return {
    posts: posts.slice(startIndex, endIndex),
    currentPage: page,
    totalPages: Math.ceil(posts.length / postsPerPage),
    totalPosts: posts.length,
    hasNextPage: endIndex < posts.length,
    hasPrevPage: page > 1,
  };
};

export const getCategorySlug = (category: string): string =>
  category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const getCategoryFromSlug = (
  slug: string,
  categories: readonly string[]
): string | undefined =>
  categories.find((cat) => getCategorySlug(cat) === slug);
