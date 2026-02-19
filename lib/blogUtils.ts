import {
  blogPosts,
  getAllCategories,
  getAllTags,
  type BlogPost,
} from "../content/blogPosts";

export const getAllPosts = (): BlogPost[] => {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts
    .filter((post) => post.category === category)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

export const getFeaturedPost = (): BlogPost | undefined => {
  return blogPosts.find((post) => post.featured === true);
};

export const searchPosts = (query: string): BlogPost[] => {
  if (!query || query.trim() === "") {
    return getAllPosts();
  }

  const lowerQuery = query.toLowerCase();
  return blogPosts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    )
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
};

export const getRelatedPosts = (
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] => {
  return blogPosts
    .filter(
      (post) =>
        post.id !== currentPost.id && post.category === currentPost.category
    )
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, limit);
};

export interface PaginatedPosts {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const paginatePosts = (
  posts: BlogPost[],
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

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const generateTOC = (
  htmlContent: string
): { id: string; text: string; level: string }[] => {
  if (typeof window === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");
  const headings = doc.querySelectorAll("h2, h3");

  return Array.from(headings).map((heading, index) => ({
    id: `heading-${index}`,
    text: heading.textContent || "",
    level: heading.tagName.toLowerCase(),
  }));
};

export const getCategoriesWithCounts = (): {
  name: string;
  count: number;
}[] => {
  const categories = getAllCategories();
  return categories.map((category) => ({
    name: category,
    count: blogPosts.filter((post) => post.category === category).length,
  }));
};

export const getCategorySlug = (category: string): string => {
  return category.toLowerCase().replace(/\s+/g, "-");
};

export const getCategoryFromSlug = (slug: string): string | undefined => {
  const categories = getAllCategories();
  return categories.find((cat) => getCategorySlug(cat) === slug);
};

export { getAllCategories, getAllTags };
export type { BlogPost };
