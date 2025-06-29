import { useState } from 'react';
import { searchMovies } from '../../services/moviesAPI';

export function useMovieSuggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (keyword) => {
    if (!keyword.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const results = await searchMovies(keyword);
      setSuggestions(Array.isArray(results) ? results : []);
    } catch (err) {
      setSuggestions([]);
    }
    setLoading(false);
  };

  return { suggestions, loading, fetchSuggestions, setSuggestions };
}
