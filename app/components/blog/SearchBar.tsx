"use client";

import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search articles", initialValue = "" }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="lidx-search post-search">
      <label htmlFor="post-q" className="sr-only">
        Search articles
      </label>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input id="post-q" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} autoComplete="off" />
    </div>
  );
};

export default SearchBar;
