import { useEffect, useState } from 'react';
import { trendingMovies } from '../../services/moviesAPI';

const useTrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await trendingMovies();
        setMovies(response.data);
        setLoading(false);
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
