import React, { useState, useCallback } from 'react';

import FeaturedPost from '../../components/blog/FeaturedPost';
import BlogCard from '../../components/blog/BlogCard';
import FilterBar from '../../components/blog/FilterBar';
import SearchBar from '../../components/blog/SearchBar';
import Pagination from '../../components/blog/Pagination';
import {
    getAllPosts,
    getPostsByCategory,
    getFeaturedPost,
    searchPosts,
    paginatePosts
} from '../../lib/blogUtils';
import './BlogIndex.css';

const BlogIndex = ({ initialCategory = 'All' }) => {
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortOrder, setSortOrder] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const featuredPost = getFeaturedPost();

    // Get filtered and sorted posts
    const getFilteredPosts = useCallback(() => {
        let posts = searchQuery
            ? searchPosts(searchQuery)
            : selectedCategory === 'All'
                ? getAllPosts()
                : getPostsByCategory(selectedCategory);

        // Sort
        if (sortOrder === 'oldest') {
            posts = [...posts].reverse();
        }

        // Exclude featured post from grid
        return posts.filter(post => !post.featured);
    }, [selectedCategory, sortOrder, searchQuery]);

    const filteredPosts = getFilteredPosts();
    const paginatedData = paginatePosts(filteredPosts, currentPage, 12);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setSearchQuery('');
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
        setCurrentPage(1);
    };

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
        if (query) {
            setSelectedCategory('All');
        }
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <title>GalenAI Blog - Clinical reasoning, study systems & medical learning</title>
            <meta
                name="description"
                content="Explore clinical reasoning frameworks, CBME insights, study systems, and evidence-based medical learning strategies from GalenAI."
            />
            <meta property="og:title" content="GalenAI Blog" />
            <meta property="og:description" content="Clinical reasoning, study systems, CBME insights, and medical learning science." />
            <meta property="og:type" content="website" />

            <div className="blog-index">
                {/* Hero Section */}
                <div className="blog-hero">
                    <div className="blog-hero-content">
                        <h1 className="blog-hero-title">Blogs & Resources</h1>
                        <p className="blog-hero-subtitle">
                            Clinical reasoning, study systems, CBME insights, and medical learning science.
                        </p>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="blog-container">
                    {/* Featured Post */}
                    {featuredPost && !searchQuery && selectedCategory === 'All' && (
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
                            <div className="blog-grid">
                                {paginatedData.posts.map(post => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <Pagination
                                currentPage={paginatedData.currentPage}
                                totalPages={paginatedData.totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="blog-empty">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <h3>No articles found</h3>
                            <p>Try adjusting your search or filter to find what you're looking for.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogIndex;
