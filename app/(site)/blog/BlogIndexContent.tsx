"use client";

import { useState, useCallback, useEffect } from "react";
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

  // Fire once per blog-page load — "number of visits to the blog page".
  // Covers /blog (category "All") and /blog/category/* (the category name).
  useEffect(() => {
    trackEvent("blog_index_view", { category: initialCategory });
  }, [initialCategory]);

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
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    if (query) {
      setSelectedCategory("All");
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="v2 min-h-screen">
      {/* Hero Section */}
      <div className="pt-40 pb-8 px-8 text-center border-b border-black/5 relative md:pt-44">
        <div className="max-w-[800px] mx-auto relative z-10 flex flex-col items-center">
          <p className="kick mb-5">Articles</p>
          <h1 className="h1 !text-[clamp(2.4rem,6vw,4rem)] mb-6">
            {selectedCategory !== "All" ? (
              <>
                Category: <span className="acc">{selectedCategory}</span>
              </>
            ) : (
              <>
                Blogs &amp; <span className="acc">Resources</span>
              </>
            )}
          </h1>

          <p className="lead mx-auto mb-10 max-w-[600px]">
            Clinical reasoning, study systems, CBME insights, and medical
            learning science.
          </p>
          <div className="w-full max-w-[500px]">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-[clamp(1.5rem,5vw,3rem)] pt-6 pb-32">

        {/* Editor's Choice strip (up to 2) */}
        {editorsChoice.length > 0 && !searchQuery && selectedCategory === "All" && (
          <div
            className={
              editorsChoice.length > 1
                ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
                : ""
            }
          >
            {editorsChoice.map((post) => (
              <FeaturedPost key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Filter Bar */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />

        {/* Blog Grid */}
        {paginatedData.posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedData.posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={paginatedData.currentPage}
              totalPages={paginatedData.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-24 bg-white/50 rounded-3xl border border-black/5 backdrop-blur-sm">
            <svg
              className="w-20 h-20 text-text-muted/20 mx-auto mb-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3 className="font-primary text-2xl font-bold text-dark mb-3">
              No articles found
            </h3>
            <p className="font-secondary text-base text-text-muted">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

