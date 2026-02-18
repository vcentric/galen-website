import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

import { getPostBySlug, getRelatedPosts, formatDate } from '../../lib/blogUtils';
import BlogCard from '../../components/blog/BlogCard';
import './BlogPost.css';

const BlogPost = () => {
    const { slug } = useParams();
    const [activeHeading, setActiveHeading] = useState('');
    const post = getPostBySlug(slug);

    useEffect(() => {
        // Add IDs to headings for TOC linking
        if (post) {
            const content = document.querySelector('.blog-post-body');
            if (content) {
                const headings = content.querySelectorAll('h2, h3');
                headings.forEach((heading, index) => {
                    heading.id = `heading-${index}`;
                });
            }
        }

        // Scroll spy for TOC
        const handleScroll = () => {
            const headings = document.querySelectorAll('.blog-post-body h2, .blog-post-body h3');
            let current = '';

            headings.forEach(heading => {
                const rect = heading.getBoundingClientRect();
                if (rect.top <= 100) {
                    current = heading.id;
                }
            });

            setActiveHeading(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [post]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const relatedPosts = getRelatedPosts(post, 3);

    const handleShare = (platform) => {
        const url = window.location.href;
        const title = post.title;

        switch (platform) {
            case 'copy':
                navigator.clipboard.writeText(url);
                alert('Link copied to clipboard!');
                break;
            case 'linkedin':
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
                break;
            default:
                break;
        }
    };

    // Generate TOC from content
    const generateTOC = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(post.content, 'text/html');
        const headings = doc.querySelectorAll('h2, h3');

        return Array.from(headings).map((heading, index) => ({
            id: `heading-${index}`,
            text: heading.textContent,
            level: heading.tagName.toLowerCase()
        }));
    };

    const toc = generateTOC();

    return (
        <>
            <title>{post.title} | GalenAI Blog</title>
            <meta name="description" content={post.excerpt} />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:image" content={post.coverImage} />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />

            <div className="blog-post-page">
                {/* Breadcrumb */}
                <div className="blog-post-breadcrumb">
                    <div className="breadcrumb-container">
                        <Link to="/blog">Blog</Link>
                        <span className="breadcrumb-separator">→</span>
                        <Link to={`/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}>
                            {post.category}
                        </Link>
                        <span className="breadcrumb-separator">→</span>
                        <span>{post.title}</span>
                    </div>
                </div>

                <div className="blog-post-container">
                    <article className="blog-post-article">
                        {/* Article Header */}
                        <header className="blog-post-header">
                            <span className="blog-post-category">{post.category}</span>
                            <h1 className="blog-post-title">{post.title}</h1>
                            <p className="blog-post-excerpt">{post.excerpt}</p>
                            <div className="blog-post-meta">
                                <span className="post-author">{post.author}</span>
                                <span className="meta-separator">•</span>
                                <span className="post-date">{formatDate(post.date)}</span>
                                <span className="meta-separator">•</span>
                                <span className="post-reading-time">{post.readingTime} min read</span>
                            </div>
                        </header>

                        {/* Cover Image */}
                        <div className="blog-post-cover">
                            <img src={post.coverImage} alt={post.title} />
                        </div>

                        {/* Content Body */}
                        <div
                            className="blog-post-body"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Share Buttons */}
                        <div className="blog-post-share">
                            <h4>Share this article</h4>
                            <div className="share-buttons">
                                <button onClick={() => handleShare('copy')} className="share-btn">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                    </svg>
                                    Copy Link
                                </button>
                                <button onClick={() => handleShare('linkedin')} className="share-btn">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                                    </svg>
                                    LinkedIn
                                </button>
                                <button onClick={() => handleShare('twitter')} className="share-btn">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                    Twitter
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="blog-post-sidebar">
                        {/* Table of Contents */}
                        {toc.length > 0 && (
                            <div className="sidebar-toc">
                                <h4>Table of Contents</h4>
                                <nav className="toc-nav">
                                    {toc.map((item) => (
                                        <a
                                            key={item.id}
                                            href={`#${item.id}`}
                                            className={`toc-link toc-${item.level} ${activeHeading === item.id ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const element = document.getElementById(item.id);
                                                if (element) {
                                                    const yOffset = -120; // Offset for navbar and spacing
                                                    const y = element.offsetTop + yOffset;
                                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                                }
                                            }}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* CTA Card */}
                        <div className="sidebar-cta">
                            <h4>Try GalenAI</h4>
                            <p>Master medicine with AI-powered learning tailored to your needs.</p>
                            <Link to="/" className="cta-button">Get Started</Link>
                        </div>
                    </aside>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="blog-post-related">
                        <div className="related-container">
                            <h3>Related Articles</h3>
                            <div className="related-grid">
                                {relatedPosts.map(relatedPost => (
                                    <BlogCard key={relatedPost.id} post={relatedPost} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BlogPost;
