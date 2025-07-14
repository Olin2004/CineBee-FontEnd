import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies } from '../../services/moviesAPI';
import SEO from '../../components/SEO/SEO';

const CACHE_PREFIX = 'searchResult_';
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResultPage() {
  const query = useQuery();
  const keyword = query.get('keyword') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) return;
    const cacheKey = `${CACHE_PREFIX}${keyword}`;
    const cache = localStorage.getItem(cacheKey);
    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setMovies(data);
        setLoading(false);
        return;
      }
    }
    setLoading(true);
    searchMovies(keyword).then((data) => {
      const result = Array.isArray(data) ? data : [];
      setMovies(result);
      setLoading(false);
      localStorage.setItem(cacheKey, JSON.stringify({ data: result, timestamp: Date.now() }));
    });
  }, [keyword]);

  return (
    <div className="container mx-auto p-4 min-h-[60vh]">
      <SEO
        title={`Kết quả tìm kiếm cho "${keyword}" | CineBee`}
        description={`Tìm kiếm phim "${keyword}" tại CineBee. Khám phá các bộ phim phù hợp nhất với bạn.`}
        name="CineBee"
        type="website"
      />
      <h2 className="text-2xl font-bold mb-6 text-green-500 animate-fade-in">
        Search results for "{keyword}"
      </h2>
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-400 animate-fade-in">
          <svg
            className="w-12 h-12 mb-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M9 17v-2a4 4 0 018 0v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          No results found.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-fade-in">
          {movies.map((movie, idx) => (
            <div
              key={movie.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 relative group hover:scale-105 hover:shadow-2xl cursor-pointer border border-gray-100 dark:border-gray-700 animate-fade-in-up"
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="relative w-full h-60 overflow-hidden">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-base truncate text-gray-900 dark:text-white mb-1">
                  {movie.title}
                </h3>
                {/* Thêm info khác nếu muốn */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Thêm animation CSS vào global hoặc tailwind.config.js:
// .animate-fade-in { animation: fadeIn 0.6s both; }
// .animate-fade-in-up { animation: fadeInUp 0.7s both; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
