import { useEffect, useState } from 'react';

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
        // const response = await moviesAllByLikesPaged(currentPage, ITEMS_PER_PAGE);
        const responseData = {
          pages: [[]],
          totalPages: 1,
          content: [],
        };

        if (responseData && responseData.pages && responseData.pages.length > 0) {
          // Luôn lấy trang hiện tại ở vị trí 0 vì API trả về mỗi lần 1 trang
          setMovies(responseData.pages[0] || []);
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
