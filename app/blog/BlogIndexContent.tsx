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
    <div className="min-h-screen bg-surface-cream">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] pt-24 pb-16 px-8 text-left max-[768px]:pt-20 max-[768px]:pb-12 max-[768px]:px-6 max-[480px]:pt-16 max-[480px]:pb-10 max-[480px]:px-5">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-sans text-[2.5rem] font-semibold text-foreground mb-6 tracking-[-0.03em] leading-[1.1] inline-block relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[60px] after:h-[3px] after:bg-cta after:rounded-sm max-[768px]:text-[2.5rem] max-[480px]:text-[2rem]">
            {initialCategory !== "All"
              ? `Category: ${initialCategory}`
              : "Blogs & Resources"}
          </h1>
          <p className="font-sans text-[1.25rem] font-normal text-foreground/60 leading-[1.7] mb-10 max-[768px]:text-[1.125rem] max-[480px]:text-base">
            Clinical reasoning, study systems, CBME insights, and medical
            learning science.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-8 py-12 pb-20 max-[768px]:px-6 max-[768px]:py-10 max-[480px]:px-5 max-[480px]:py-8">
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
            <div className="grid grid-cols-3 gap-8 max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1 max-[768px]:gap-6">
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
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 text-foreground/20 mx-auto mb-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3 className="font-sans text-2xl font-bold text-foreground mb-3">
              No articles found
            </h3>
            <p className="font-sans text-base text-foreground/40">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
