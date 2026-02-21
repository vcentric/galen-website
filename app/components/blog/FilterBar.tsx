"use client";

import { getAllCategories } from "@/lib/blogUtils";

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
  const categories = ["All", ...getAllCategories()];

  return (
    <div className="flex justify-between items-center gap-8 mb-10 p-6 bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-5 max-[768px]:p-5">
      <div className="flex flex-wrap gap-3 flex-1 max-[768px]:justify-start">
        {categories.map((category) => (
          <button
            key={category}
            className={`font-sans text-[0.9rem] font-medium rounded-full px-5 py-[0.625rem] cursor-pointer transition-all duration-200 border max-[480px]:text-[0.85rem] max-[480px]:px-4 max-[480px]:py-2 ${
              selectedCategory === category
                ? "bg-cta text-white border-cta"
                : "bg-surface text-foreground/60 border-transparent hover:bg-[#ffe8d6] hover:text-cta"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex gap-2 bg-surface p-[0.375rem] rounded-[0.625rem] max-[768px]:w-full max-[768px]:justify-center">
        {["latest", "oldest"].map((order) => (
          <button
            key={order}
            className={`font-sans text-[0.875rem] font-medium border-none rounded-lg px-4 py-2 cursor-pointer transition-all duration-200 max-[480px]:text-[0.8rem] max-[480px]:px-[0.875rem] ${
              sortOrder === order
                ? "bg-white text-foreground shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                : "bg-transparent text-foreground/60 hover:text-foreground"
            }`}
            onClick={() => onSortChange(order)}
          >
            {order.charAt(0).toUpperCase() + order.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
