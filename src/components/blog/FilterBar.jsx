import React from 'react';
import { getAllCategories } from '../../lib/blogUtils';
import './FilterBar.css';

const FilterBar = ({ selectedCategory, onCategoryChange, sortOrder, onSortChange }) => {
    const categories = ['All', ...getAllCategories()];

    return (
        <div className="filter-bar">
            <div className="filter-categories">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`filter-category-btn ${selectedCategory === category ? 'active' : ''}`}
                        onClick={() => onCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <div className="filter-sort">
                <button
                    className={`sort-btn ${sortOrder === 'latest' ? 'active' : ''}`}
                    onClick={() => onSortChange('latest')}
                >
                    Latest
                </button>
                <button
                    className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
                    onClick={() => onSortChange('oldest')}
                >
                    Oldest
                </button>
            </div>
        </div>
    );
};

export default FilterBar;
