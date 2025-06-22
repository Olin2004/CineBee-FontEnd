import { useEffect, useState } from 'react';
import { moviesAllByLikesPaged } from '../../services/moviesAPI';

const ITEMS_PER_PAGE = 20;

export const useHighlyRatedMovies = (currentPage) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await moviesAllByLikesPaged(currentPage - 1, ITEMS_PER_PAGE);
        const responseData = response.data;

        if (responseData && responseData.pages && responseData.pages.length > 0) {
          // Lấy đúng page hiện tại
          setMovies(responseData.pages[currentPage - 1] || []);
          setTotalPages(responseData.totalPages);
        } else if (responseData && responseData.content) {
          // This is a fallback for a more standard paged response.
          setMovies(responseData.content);
          setTotalPages(responseData.totalPages);
        }
      } catch (error) {
        console.error('Failed to fetch highly rated movies:', error);
        setError('Could not fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return { movies, totalPages, loading, error };
};
