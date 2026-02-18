import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/blogUtils';
import './BlogCard.css';

const BlogCard = ({ post }) => {
    return (
        <Link to={`/blog/${post.slug}`} className="blog-card">
            <div className="blog-card-image">
                <img src={post.coverImage} alt={post.title} loading="lazy" />
                <span className="blog-card-category">{post.category}</span>
            </div>
            <div className="blog-card-content">
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-excerpt">{post.excerpt}</p>
                <div className="blog-card-meta">
                    <span className="blog-card-date">{formatDate(post.date)}</span>
                    <span className="blog-card-separator">•</span>
                    <span className="blog-card-reading-time">{post.readingTime} min read</span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
