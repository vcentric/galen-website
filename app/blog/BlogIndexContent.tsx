"use client";

import { useState, useCallback } from "react";
import FeaturedPost from "../components/blog/FeaturedPost";
import BlogCard from "../components/blog/BlogCard";
import FilterBar from "../components/blog/FilterBar";
import SearchBar from "../components/blog/SearchBar";
import Pagination from "../components/blog/Pagination";
import {
  getAllPosts,
  getPostsByCategory,
  getFeaturedPost,
  searchPosts,
  paginatePosts,
} from "@/lib/blogUtils";

interface BlogIndexContentProps {
  initialCategory?: string;
}

export default function BlogIndexContent({
  initialCategory = "All",
}: BlogIndexContentProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortOrder, setSortOrder] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const featuredPost = getFeaturedPost();

  const getFilteredPosts = useCallback(() => {
    let posts = searchQuery
      ? searchPosts(searchQuery)
      : selectedCategory === "All"
      ? getAllPosts()
      : getPostsByCategory(selectedCategory);

    if (sortOrder === "oldest") {
      posts = [...posts].reverse();
    }

    return posts.filter((post) => !post.featured);
  }, [selectedCategory, sortOrder, searchQuery]);

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
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-8 text-center border-b border-black/5 relative">
        <div className="max-w-[800px] mx-auto relative z-10 flex flex-col items-center">
          <h1 className="font-primary text-[clamp(2.2rem,6vw,3.5rem)] font-semibold text-dark mb-6 tracking-[-0.03em] leading-[1.1] inline-block relative pb-5">
            {selectedCategory !== "All"
              ? `Category: ${selectedCategory}`
              : "Blogs & Resources"}
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-orange rounded-full opacity-90"></span>
          </h1>

          <p className="font-secondary text-[clamp(1rem,2.5vw,1.2rem)] font-normal text-text-secondary leading-[1.6] mb-10 max-w-[600px] opacity-80">
            Clinical reasoning, study systems, CBME insights, and medical
            learning science.
          </p>
          <div className="w-full max-w-[500px]">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1240px] mx-auto px-[clamp(1.5rem,5vw,3rem)] py-20 pb-32">

        {/* Featured Post */}
        {featuredPost && !searchQuery && selectedCategory === "All" && (
          <FeaturedPost post={featuredPost} />
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
                <BlogCard key={post.id} post={post} />
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
            <h3 className="font-primary text-2xl font-medium text-dark mb-3">
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

