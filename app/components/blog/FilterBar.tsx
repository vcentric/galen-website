"use client";

import React from "react";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}

const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) => {
  const categories = ["All", "Clinical Reasoning", "Exam Strategy", "Medical Learning", "CBME Guide", "Study Systems"];

  return (
    <div className="flex flex-col gap-6 mb-12">
      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`font-primary text-[0.8rem] font-bold px-5 py-2.5 rounded-full transition-all duration-300 border backdrop-blur-md cursor-pointer uppercase tracking-wider ${
                selectedCategory === category
                  ? "bg-orange text-white border-orange shadow-md scale-105"
                  : "bg-white/70 text-orange border-orange/20 hover:border-orange/40 hover:bg-white"
              }`}
              style={selectedCategory !== category ? { 
                boxShadow: 'inset 0 1.5px 3px rgba(235, 96, 45, 0.2), 0 1px 2px rgba(0, 0, 0, 0.03)'
              } : {}}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-primary text-[0.7rem] font-bold text-text-muted uppercase tracking-widest">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value)}
            className="font-primary text-[0.85rem] font-bold text-dark bg-white border border-black/5 rounded-xl px-4 py-2.5 outline-none focus:border-orange/40 transition-all cursor-pointer shadow-sm"
          >
            <option value="latest">Latest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
