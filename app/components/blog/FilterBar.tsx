"use client";

import { useState, useRef, useEffect } from "react";
import { BLOG_CATEGORIES } from "@/content/categories";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
}

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  align?: "left" | "right";
}

// A single glass dropdown: pill trigger + frosted panel. Closes on outside
// click, Escape, or selection. Shared by the Category and Sort controls.
function FilterDropdown({
  label,
  value,
  options,
  onSelect,
  align = "left",
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2.5 bg-[#fbf7f2]/70 backdrop-blur-md border border-orange/10 rounded-full pl-5 pr-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-orange/30 hover:bg-[#fbf7f2] transition-all duration-300 cursor-pointer"
      >
        <span className="font-primary text-[0.7rem] font-bold uppercase tracking-widest text-text-muted">
          {label}
        </span>
        <span className="font-primary text-[0.85rem] font-semibold text-dark whitespace-nowrap">
          {value}
        </span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        role="listbox"
        className={`absolute z-50 mt-2 min-w-[240px] max-h-[min(70vh,420px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none] bg-[#faf6f1]/90 backdrop-blur-xl border border-orange/10 rounded-2xl shadow-[0_20px_44px_rgba(0,0,0,0.12)] p-2 origin-top transition-all duration-200 ${
          align === "right" ? "right-0" : "left-0"
        } ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {options.map((option) => {
          const isActive = option === value;
          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={isActive}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left font-primary text-[0.9rem] transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "text-orange font-semibold bg-orange/[0.06]"
                  : "text-text-secondary font-medium hover:text-dark hover:bg-orange/[0.04]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isActive ? "bg-orange" : "bg-transparent"
                }`}
              />
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const FilterBar = ({
  selectedCategory,
  onCategoryChange,
  sortOrder,
  onSortChange,
}: FilterBarProps) => {
  const categories = ["All", ...BLOG_CATEGORIES];
  const sortValue = sortOrder === "oldest" ? "Oldest" : "Latest";

  return (
    <div className="mb-10 flex items-center justify-between gap-4">
      <FilterDropdown
        label="Category"
        value={selectedCategory}
        options={categories}
        onSelect={onCategoryChange}
        align="left"
      />
      <FilterDropdown
        label="Sort"
        value={sortValue}
        options={["Latest", "Oldest"]}
        onSelect={(v) => onSortChange(v === "Oldest" ? "oldest" : "latest")}
        align="right"
      />
    </div>
  );
};

export default FilterBar;
