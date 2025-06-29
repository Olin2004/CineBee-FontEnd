'use client';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieSuggestions } from '../../features/movies/useMovieSuggestions';

function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export default function GrowingSearchVariant1() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-8 text-gray-500 dark:text-gray-400 tracking-tighter">
        Press enter to see all the effects
      </p>
      <SearchBar />
    </div>
  );
}

export const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const { fetchSuggestions } = useMovieSuggestions();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    fetchSuggestions(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (searchValue.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <label
        className={cn(
          'relative inline-flex origin-center rounded-full text-gray-500 dark:text-gray-400',
          'group transform-gpu transition-all ease-in-out',
          ' relative'
        )}
        htmlFor="search"
      >
        <input
          className={cn(
            'peer max-w-10 transform-gpu rounded-full p-2 pl-10 transition-all ease-in-out focus:max-w-40',
            'bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800',
            'border-2 border-transparent focus:border-purple-500 focus:ring-2 focus:ring-purple-200',
            'shadow-md',
            'placeholder-gray-400/0 focus:placeholder-gray-400/100 dark:placeholder-gray-500/0 dark:focus:placeholder-gray-500/100'
          )}
          id="search"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          type="search"
          value={searchValue}
          autoComplete="off"
        />
        <SearchIcon
          className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3.5 size-5 text-gray-400 dark:text-gray-500 transition-colors peer-focus:text-gray-600 dark:peer-focus:text-gray-300"
          onClick={handleSearchClick}
        />
      </label>
    </div>
  );
};
