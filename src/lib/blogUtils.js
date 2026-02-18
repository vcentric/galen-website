// Blog Utility Functions
import { blogPosts, getAllCategories, getAllTags } from '../content/blogPosts';

/**
 * Get all blog posts sorted by date (newest first)
 */
export const getAllPosts = () => {
    return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get a single post by slug
 */
export const getPostBySlug = (slug) => {
    return blogPosts.find(post => post.slug === slug);
};

/**
 * Get posts by category
 */
export const getPostsByCategory = (category) => {
    return blogPosts
        .filter(post => post.category === category)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get featured post
 */
export const getFeaturedPost = () => {
    return blogPosts.find(post => post.featured === true);
};

/**
 * Search posts by title or excerpt
 */
export const searchPosts = (query) => {
    if (!query || query.trim() === '') {
        return getAllPosts();
    }

    const lowerQuery = query.toLowerCase();
    return blogPosts.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get related posts (same category, excluding current post)
 */
export const getRelatedPosts = (currentPost, limit = 3) => {
    return blogPosts
        .filter(post =>
            post.id !== currentPost.id &&
            post.category === currentPost.category
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
};

/**
 * Paginate posts
 */
export const paginatePosts = (posts, page = 1, postsPerPage = 12) => {
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;

    return {
        posts: posts.slice(startIndex, endIndex),
        currentPage: page,
        totalPages: Math.ceil(posts.length / postsPerPage),
        totalPosts: posts.length,
        hasNextPage: endIndex < posts.length,
        hasPrevPage: page > 1
    };
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

/**
 * Generate table of contents from HTML content
 */
export const generateTOC = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');

    return Array.from(headings).map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.textContent,
        level: heading.tagName.toLowerCase()
    }));
};

/**
 * Get categories with post counts
 */
export const getCategoriesWithCounts = () => {
    const categories = getAllCategories();
    return categories.map(category => ({
        name: category,
        count: blogPosts.filter(post => post.category === category).length
    }));
};

/**
 * Get URL-friendly category slug
 */
export const getCategorySlug = (category) => {
    return category.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Get category name from slug
 */
export const getCategoryFromSlug = (slug) => {
    const categories = getAllCategories();
    return categories.find(cat => getCategorySlug(cat) === slug);
};

export { getAllCategories, getAllTags };
