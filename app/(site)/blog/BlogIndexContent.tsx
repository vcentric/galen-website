"use client";

import { useState, useCallback } from "react";
import FeaturedPost from "@/app/components/blog/FeaturedPost";
import BlogCard from "@/app/components/blog/BlogCard";
import FilterBar from "@/app/components/blog/FilterBar";
import SearchBar from "@/app/components/blog/SearchBar";
import Pagination from "@/app/components/blog/Pagination";
import { searchPosts, paginatePosts, type PostMeta } from "@/lib/blogFilters";
import { trackEvent } from "@/lib/analytics";

interface BlogIndexContentProps {
  posts: PostMeta[];
  editorsChoice?: PostMeta[];
  initialCategory?: string;
}

export default function BlogIndexContent({
  posts,
  editorsChoice = [],
  initialCategory = "All",
}: BlogIndexContentProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getFilteredPosts = useCallback(() => {
    let result = searchQuery
      ? searchPosts(posts, searchQuery)
      : selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

    if (sortOrder === "oldest") {
      result = [...result].reverse();
    }

    return result.filter((post) => !post.isEditorsChoice);
  }, [posts, selectedCategory, sortOrder, searchQuery]);

  const filteredPosts = getFilteredPosts();
  const paginatedData = paginatePosts(filteredPosts, currentPage, 12);

  const handleCategoryChange = (category: string) => {
    trackEvent("content_filter", { where: "articles", choice: category });
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSearch = useCallback((query: string) => {
    const term = query.trim();
    if (term.length >= 2) trackEvent("site_search", { where: "articles", search_term: term.slice(0, 80), results: searchPosts(posts, term).length });
    setSearchQuery(query);
    setCurrentPage(1);
    if (query) {
      setSelectedCategory("All");
    }
  }, [posts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="v2 lesson">
      <header className="wrap exam-head !pb-8">
        <p className="kick">Articles</p>
        <h1 className="h1 mt-5">
          {selectedCategory !== "All" ? (
            <span className="acc">{selectedCategory}.</span>
          ) : (
            <>
              Articles<span className="acc">.</span>
            </>
          )}
        </h1>
        <p className="lead mt-6">Clinical reasoning, study systems, CBME insights, and medical learning science.</p>
      </header>

      <div className="wrap">
        <div className="post-bar">
          <SearchBar onSearch={handleSearch} />
          <FilterBar selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} sortOrder={sortOrder} onSortChange={handleSortChange} />
        </div>
      </div>

      <div className="wrap post-main">
        {/* Editor's Choice (up to 2) */}
        {editorsChoice.length > 0 && !searchQuery && selectedCategory === "All" && (
          <div className="post-leads">
            {editorsChoice.map((post) => (
              <FeaturedPost key={post.slug} post={post} />
            ))}
          </div>
        )}

        {paginatedData.posts.length > 0 ? (
          <>
            <div className="post-grid">
              {paginatedData.posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <Pagination currentPage={paginatedData.currentPage} totalPages={paginatedData.totalPages} onPageChange={handlePageChange} />
          </>
        ) : (
          <div className="lidx-empty">
            <p className="h3">No articles found.</p>
            <p className="mt-2" style={{ color: "var(--body)" }}>
              Try adjusting your search or filter to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
