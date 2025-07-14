import { useEffect, useState } from 'react';
import { trendingMovies } from '../../services/moviesAPI';

const CACHE_KEY = 'trendingMoviesCache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút

const useTrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const cache = localStorage.getItem(CACHE_KEY);
        if (cache) {
          const { data, timestamp } = JSON.parse(cache);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setMovies(data);
            setLoading(false);
            return;
          }
        }
        const response = await trendingMovies();
        setMovies(response.data);
        setLoading(false);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: response.data, timestamp: Date.now() })
        );
      } catch (err) {
        setError('Failed to fetch trending movies');
        setLoading(false);
        console.error('Error fetching trending movies:', err);
      }
    };

    fetchTrendingMovies();
  }, []);

  return { movies, loading, error };
};

export default useTrendingMovies;
