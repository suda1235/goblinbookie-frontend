/**
 * SearchBar.tsx – Goblin Bookie
 *
 * Title:        Search Bar Component
 * Purpose:      Reusable text search bar for entering card names and triggering a search action.
 * Design Notes:
 *   - Props allow customization of initial value, placeholder, button text, and custom classes.
 *   - Fully controlled input. Parent provides search handler via `onSearch`.
 *   - Keyboard and accessibility ready (role="search", aria-label).
 */

import React, { useState } from 'react';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  buttonText?: string;
  className?: string; // Optional: allow parent to add classes
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialValue = '',
  onSearch,
  placeholder = 'Search…',
  buttonText = 'Search',
  className = '',
}) => {
  const [value, setValue] = useState(initialValue);

  // Handles form submit (Enter or button)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className={`homepage-searchbar ${className}`} onSubmit={handleSubmit} role="search">
      <input
        className="form-control"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search"
      />
      <button className="btn btn-success px-4 homepage-search-btn" type="submit">
        {buttonText}
      </button>
    </form>
  );
};

export default SearchBar;
