"use client";

import { BLOG_CATEGORIES } from "@/content/categories";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}

/** Categories as a row of text tabs (scrolls sideways on phones), with the sort order at the end. */
export default function FilterBar({ selectedCategory, onCategoryChange, sortOrder, onSortChange }: FilterBarProps) {
  const categories = ["All", ...BLOG_CATEGORIES];
  return (
    <div className="post-filter">
      <div className="post-tabs" role="group" aria-label="Category">
        {categories.map((c) => (
          <button key={c} type="button" aria-pressed={selectedCategory === c} onClick={() => onCategoryChange(c)}>
            {c}
          </button>
        ))}
      </div>
      <button type="button" className="post-sort" onClick={() => onSortChange(sortOrder === "oldest" ? "latest" : "oldest")}>
        <span>Sort</span>
        {sortOrder === "oldest" ? "Oldest first" : "Latest first"}
      </button>
    </div>
  );
}
