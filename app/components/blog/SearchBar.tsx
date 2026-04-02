"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search articles...",
  initialValue = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full font-secondary text-[1rem] bg-white text-dark border border-black/5 rounded-2xl pl-12 pr-12 py-4 outline-none focus:border-orange/30 focus:shadow-[0_8px_24px_rgba(235,96,45,0.08)] transition-all placeholder:text-text-muted"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-orange transition-colors duration-300">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-dark transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};




export default SearchBar;
