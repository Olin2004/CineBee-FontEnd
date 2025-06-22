import React from 'react';
import { FaEye, FaThumbsUp } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useHighlyRatedMovies } from '../../features/highlyRated/useHighlyRatedMovies';

const HighlyRatedPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const currentPage = Number(page) || 1;
  const { movies, totalPages, loading, error } = useHighlyRatedMovies(currentPage);

  const handlePageChange = (page) => {
    navigate(`/movies/highly-rated/page/${page}`);
  };

  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    let pages = [];
    if (totalPages <= 5) {
      pages = pageNumbers;
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, '...', totalPages];
      } else if (currentPage > totalPages - 3) {
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    }

    // Simplified pagination for this example
    if (totalPages > 5) {
      if (currentPage <= 3) {
        pages = [1, 2, 3, '...', totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
      }
    } else {
      pages = pageNumbers;
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-4 py-2 text-gray-400">
              {page}
            </span>
          )
        )}
        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            &#x3E;
          </button>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center h-96 text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/20 rounded-lg">
          <p className="text-xl font-semibold">Oops! Something went wrong.</p>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie, idx) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 relative animate-fade-in-up"
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="relative w-full h-96 group">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full object-cover block rounded-t-xl shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                  style={{ display: 'block' }}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-t-xl opacity-0 group-hover:opacity-90 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(circle at 60% 40%, #fffbe680 0%, #fde04780 40%, transparent 80%)',
                    mixBlendMode: 'screen',
                    transition: 'background 0.3s',
                  }}
                ></div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{movie.title}</h3>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaThumbsUp className="text-blue-500" />
                    <span>{movie.likes || 0}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEye className="text-gray-500" />
                    <span>{movie.views || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!loading && !error && <Pagination />}
      </>
    );
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-yellow-500">
          HH3D ĐÁNH GIÁ CAO
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default HighlyRatedPage;
