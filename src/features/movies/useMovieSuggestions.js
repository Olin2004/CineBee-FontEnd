import { useState } from 'react';
import { searchMovies } from '../../services/moviesAPI';

const CACHE_DURATION = 10 * 60 * 1000; // 10 phút
const CACHE_PREFIX = 'movieSuggestions_';

export function useMovieSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (keyword) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }
    const cacheKey = `${CACHE_PREFIX}${keyword}`;
    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setSuggestions(data);
        return;
      }
    }
    setLoading(true);
    try {
      const results = await searchMovies(keyword);
      const data = Array.isArray(results) ? results : [];
      setSuggestions(data);
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
    } catch (err) {
      setSuggestions([]);
    }
    setLoading(false);
  };

  return { suggestions, loading, fetchSuggestions, setSuggestions };
}
