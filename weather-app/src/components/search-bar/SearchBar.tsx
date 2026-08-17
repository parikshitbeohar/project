import { useState, useRef, useId } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocationSearch } from '../../hooks/useLocationSearch';
import { isPostcode } from '../../utils/postcodeDetector';
import type { LocationResult } from '../../types/location.types';

interface SearchBarProps {
  onLocationSelect: (location: LocationResult) => void;
  }

export const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(inputValue, 400);
  const queryType = isPostcode(debouncedValue) ? 'postcode' : 'city';

  const { suggestions, isLoading, error } = useLocationSearch(debouncedValue, queryType);

  const handleSelect = (location: LocationResult) => {
    setInputValue(location.name);
    onLocationSelect(location);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) handleSelect(suggestions[activeIndex]);
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
        aria-autocomplete="list"
        aria-label="Search for a city or postcode"
        placeholder="Search city or postcode..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsOpen(false);
          setActiveIndex(-1);
        }}
        className="w-full rounded-lg border bg-white/90 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {isOpen && debouncedValue && (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
        >
          {isLoading && <li className="px-4 py-2 text-sm text-gray-500">Searching...</li>}

          {!isLoading && Boolean(error) && (
            <li className="px-4 py-2 text-sm text-red-600">
              Couldn't load results. Please try again.
            </li>
          )}

          {!isLoading && !Boolean(error) && suggestions.length === 0 && (
            <li className="px-4 py-2 text-sm text-gray-500">No results found</li>
          )}

          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.name}-${suggestion.latitude}-${suggestion.longitude}`}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={index === activeIndex}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`cursor-pointer px-4 py-2 text-sm ${
                index === activeIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
