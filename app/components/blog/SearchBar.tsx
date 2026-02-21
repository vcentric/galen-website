"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  onSearch,
  placeholder = "Search articles...",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto mb-10">
      <svg
        className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 pointer-events-none max-[768px]:w-[18px] max-[768px]:h-[18px] max-[768px]:left-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        className="w-full font-sans text-base text-foreground bg-white border-2 border-[#e5e5e5] rounded-full py-4 px-14 outline-none transition-all duration-300 placeholder:text-foreground/40 focus:border-cta focus:shadow-[0_0_0_4px_rgba(235,96,45,0.1)] max-[768px]:text-[0.95rem] max-[768px]:py-[0.875rem] max-[768px]:px-12"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-surface border-none rounded-full cursor-pointer transition-all duration-200 hover:bg-cta group max-[768px]:w-7 max-[768px]:h-7 max-[768px]:right-[0.875rem]"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg
            className="w-4 h-4 text-foreground/60 transition-colors duration-200 group-hover:text-white max-[768px]:w-[14px] max-[768px]:h-[14px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
