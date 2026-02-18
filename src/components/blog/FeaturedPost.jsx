import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/blogUtils';
import './FeaturedPost.css';

const FeaturedPost = ({ post }) => {
    if (!post) return null;

    return (
        <div className="featured-post">
            <div className="featured-post-badge">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
                Editor's Pick
            </div>
            <div className="featured-post-content">
                <div className="featured-post-text">
                    <span className="featured-post-category">{post.category}</span>
                    <h2 className="featured-post-title">{post.title}</h2>
                    <p className="featured-post-excerpt">{post.excerpt}</p>
                    <div className="featured-post-meta">
                        <span>{post.author}</span>
                        <span className="meta-separator">•</span>
                        <span>{formatDate(post.date)}</span>
                        <span className="meta-separator">•</span>
                        <span>{post.readingTime} min read</span>
                    </div>
                    <Link to={`/blog/${post.slug}`} className="featured-post-cta">
                        Read article
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
                <div className="featured-post-image">
                    <img src={post.coverImage} alt={post.title} loading="eager" />
                </div>
            </div>
        </div>
    );
};

export default FeaturedPost;
