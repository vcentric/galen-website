import React from 'react';
import { useParams } from 'react-router-dom';

import BlogIndex from './BlogIndex';
import { getCategoryFromSlug } from '../../lib/blogUtils';

const BlogCategory = () => {
    const { category } = useParams();
    const categoryName = getCategoryFromSlug(category);

    if (!categoryName) {
        return <BlogIndex />;
    }

    return (
        <>
            <title>{categoryName} | GalenAI Blog</title>
            <meta name="description" content={`Browse ${categoryName} articles on GalenAI Blog`} />
            <BlogIndex initialCategory={categoryName} />
        </>
    );
};

export default BlogCategory;
