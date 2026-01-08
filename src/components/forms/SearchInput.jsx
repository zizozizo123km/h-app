import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchInput Component
 * A controlled input component optimized for search functionality in e-commerce.
 * Features include debouncing for performance and a clear button for enhanced UX.
 *
 * @param {function(string): void} onSearch - Callback function executed after the debounce delay.
 * @param {string} [placeholder='ابحث عن المنتجات...'] - Placeholder text for the input.
 * @param {number} [debounceDelay=400] - Time in milliseconds to wait before calling onSearch.
 */
const SearchInput = ({
  onSearch,
  placeholder = 'ابحث عن المنتجات...',
  debounceDelay = 400,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  // Cleanup effect for the debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Handles input change, updates local state, and sets up the debounce timer.
   */
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout
    debounceTimeoutRef.current = setTimeout(() => {
      onSearch(newValue);
    }, debounceDelay);
  }, [onSearch, debounceDelay]);

  /**
   * Clears the input field and immediately triggers an empty search.
   */
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    // Focus the input after clearing for better UX
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative flex items-center w-full max-w-xl mx-auto">
      {/* Search Icon */}
      <Search className="absolute right-3 h-5 w-5 text-gray-400 pointer-events-none" />

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full py-2 pr-10 pl-4 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-right placeholder:text-right"
        dir="rtl" // Set direction to RTL for Arabic context
      />

      {/* Clear Button (Conditional Rendering) */}
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="مسح البحث"
          className="absolute left-3 p-1 text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out rounded-full hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;