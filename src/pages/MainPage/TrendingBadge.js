// TrendingBadge.js
// Badge displaying trending status, beautiful, reusable
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFire } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import TrailerModal from '../../components/TrailerModal';
import useTrendingMovies from '../../features/movies/trendingMovies';

const clipPathStyles = [
  'polygon(94.239% 100%,5.761% 100%,5.761% 100%,4.826% 99.95%,3.94% 99.803%,3.113% 99.569%,2.358% 99.256%,1.687% 98.87%,1.111% 98.421%,.643% 97.915%,.294% 97.362%,.075% 96.768%,0 96.142%,0 3.858%,0 3.858%,.087% 3.185%,.338% 2.552%,.737% 1.968%,1.269% 1.442%,1.92% .984%,2.672% .602%,3.512% .306%,4.423% .105%,5.391% .008%,6.4% .024%,94.879% 6.625%,94.879% 6.625%,95.731% 6.732%,96.532% 6.919%,97.272% 7.178%,97.942% 7.503%,98.533% 7.887%,99.038% 8.323%,99.445% 8.805%,99.747% 9.326%,99.935% 9.88%,100% 10.459%,100% 96.142%,100% 96.142%,99.925% 96.768%,99.706% 97.362%,99.357% 97.915%,98.889% 98.421%,98.313% 98.87%,97.642% 99.256%,96.887% 99.569%,96.06% 99.803%,95.174% 99.95%,94.239% 100%)',
  'polygon(5.761% 100%,94.239% 100%,94.239% 100%,95.174% 99.95%,96.06% 99.803%,96.887% 99.569%,97.642% 99.256%,98.313% 98.87%,98.889% 98.421%,99.357% 97.915%,99.706% 97.362%,99.925% 96.768%,100% 96.142%,100% 3.858%,100% 3.858%,99.913% 3.185%,99.662% 2.552%,99.263% 1.968%,98.731% 1.442%,98.08% .984%,97.328% .602%,96.488% .306%,95.577% .105%,94.609% .008%,93.6% .024%,5.121% 6.625%,5.121% 6.625%,4.269% 6.732%,3.468% 6.919%,2.728% 7.178%,2.058% 7.503%,1.467% 7.887%,.962% 8.323%,.555% 8.805%,.253% 9.326%,.065% 9.88%,0 10.459%,0 96.142%,0 96.142%,.075% 96.768%,.294% 97.362%,.643% 97.915%,1.111% 98.421%,1.687% 98.87%,2.358% 99.256%,3.113% 99.569%,3.94% 99.803%,4.826% 99.95%,5.761% 100%)',
];

const TrendingBadge = ({ index, rating }) => (
  <div className="flex items-center gap-2">
    <span
      className="text-4xl font-extrabold text-yellow-500 dark:text-yellow-400 drop-shadow-lg select-none"
      style={{ minWidth: 32 }}
    >
      {index}
    </span>
    <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-800 dark:bg-black/90 text-yellow-500 dark:text-yellow-400 font-bold text-sm shadow ml-1">
      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8" fill="#facc15" />
        <path
          d="M8 4v4l2.5 2.5"
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {rating}
    </span>
  </div>
);

// Danh sách 2 trailer mẫu
const sampleTrailers = [
  'https://www.youtube.com/watch?v=Pf6V-7GvdUQ&t=1s',
  'https://www.youtube.com/watch?v=8X-UrrWL7g8',
];

export default TrendingBadge;

// Trending section component
export const TrendingSection = ({ showBookButton }) => {
  const { t } = useTranslation();
  const { movies, loading, error } = useTrendingMovies();
  const [trailer, setTrailer] = useState({ open: false, url: '', title: '', movie: null });

  if (loading) {
    // Skeleton loader for a better UX
    return (
      <section className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-start w-full mb-6 relative max-w-[1200px] mx-auto pr-2">
          <div className="inline-block w-full">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 dark:text-orange-400 text-2xl">
                <FaFire />
              </span>
              <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 tracking-wider">
                TRENDING
              </span>
            </div>
            <div className="flex items-center w-full mt-2 gap-2">
              <span className="h-[3px] w-[140px] bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 rounded-full"></span>
              <span className="h-[2px] flex-1 bg-gray-300 dark:bg-gray-600 opacity-60 rounded-full"></span>
            </div>
          </div>
        </div>
        {/* Skeleton cards */}
        <div className="w-full max-w-[1200px] mx-auto overflow-hidden">
          <div className="flex space-x-6 animate-pulse">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="flex-shrink-0" style={{ width: 'calc(20% - 20px)' }}>
                <div className="w-full h-[340px] bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
                <div className="mt-4 flex flex-col items-center">
                  <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
                  <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="flex flex-col items-start w-full mb-6 relative max-w-[1200px] mx-auto pr-2">
          <div className="inline-block w-full">
            <div className="flex items-center gap-2">
              <span className="text-orange-500 dark:text-orange-400 text-2xl">
                <FaFire />
              </span>
              <span
                className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 tracking-wider"
                style={{ letterSpacing: 1 }}
              >
                TRENDING
              </span>
            </div>
            <div className="flex items-center w-full mt-2 gap-2">
              <span className="h-[3px] w-[140px] bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 rounded-full"></span>
              <span className="h-[2px] flex-1 bg-gray-300 dark:bg-gray-600 opacity-60 rounded-full"></span>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1200px] mx-auto flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Không thể tải dữ liệu trending</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="flex flex-col items-start w-full mb-6 relative max-w-[1200px] mx-auto pr-2">
        <div className="inline-block w-full">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 dark:text-orange-400 text-2xl">
              <FaFire />
            </span>
            <span
              className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 tracking-wider"
              style={{ letterSpacing: 1 }}
            >
              TRENDING
            </span>
          </div>
          <div className="flex items-center w-full mt-2 gap-2">
            <span className="h-[3px] w-[140px] bg-gradient-to-r from-orange-500 to-pink-500 dark:from-orange-400 dark:to-pink-400 rounded-full"></span>
            <span className="h-[2px] flex-1 bg-gray-300 dark:bg-gray-600 opacity-60 rounded-full"></span>
          </div>
        </div>
      </div>
      {/* Movie list horizontal scroll */}
      <div className="w-full max-w-[1200px] mx-auto overflow-hidden">
        <Swiper
          modules={[FreeMode, Mousewheel]}
          spaceBetween={16}
          slidesPerView={1.5}
          mousewheel={true}
          grabCursor={true}
          style={{ paddingBottom: 16, paddingLeft: 4, paddingRight: 4 }}
          breakpoints={{
            640: { slidesPerView: 2.5, spaceBetween: 20 },
            768: { slidesPerView: 3.5, spaceBetween: 24 },
            1024: { slidesPerView: 5, spaceBetween: 24 },
          }}
        >
          {movies.map((movie, idx) => (
            <SwiperSlide key={movie.rank}>
              <div className="group flex flex-col items-center w-full relative">
                {/* Image */}
                <div
                  className="relative w-full h-[320px] md:h-[370px] overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  style={{
                    borderRadius: 22,
                    clipPath: clipPathStyles[idx % clipPathStyles.length],
                  }}
                >
                  <img
                    src={movie.img || movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover block transition-all duration-300 group-hover:scale-105"
                    style={{
                      borderRadius: 22,
                      clipPath: clipPathStyles[idx % clipPathStyles.length],
                    }}
                  />
                  {/* Nút play trailer */}
                  <button
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
                    onClick={() =>
                      setTrailer({
                        open: true,
                        url: sampleTrailers[idx % sampleTrailers.length],
                        title: movie.title,
                        movie,
                      })
                    }
                    tabIndex={-1}
                    aria-label="Xem trailer"
                    type="button"
                  >
                    <span
                      className="bg-white/60 rounded-full p-2 text-xl text-pink-600 shadow-md hover:scale-110 transition-transform duration-200 backdrop-blur-sm flex items-center justify-center"
                      style={{
                        boxShadow: '0 2px 8px #0003',
                        width: 40,
                        height: 40,
                        minWidth: 40,
                        minHeight: 40,
                      }}
                    >
                      ▶
                    </span>
                  </button>
                  <span className="absolute bottom-3 right-3 bg-gray-800 dark:bg-black/90 text-yellow-500 dark:text-yellow-300 font-bold text-base rounded-full px-3 py-1 shadow flex items-center gap-1 z-10">
                    {movie.rating?.toFixed(1) || movie.score?.toFixed(1) || 'N/A'}
                  </span>
                  {showBookButton && (
                    <a
                      href={`/booking/${movie.id}`}
                      className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold shadow-lg hover:from-yellow-500 hover:to-red-600 transition-all duration-300 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300 z-20 opacity-0 group-hover:opacity-100 pointer-events-auto"
                      style={{ opacity: 0.95 }}
                    >
                      {t('banner.book_now')}
                    </a>
                  )}
                </div>
                {/* Number + title + othernames */}
                <div className="flex flex-col items-center w-full mt-4">
                  <span className="text-5xl font-extrabold italic text-yellow-500 dark:text-yellow-200">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white text-lg mt-2 whitespace-normal break-words text-center">
                    {movie.title}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-base whitespace-normal break-words text-center">
                    {movie.othernames || movie.alternativeTitle || movie.originalTitle}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Modal trailer */}
      {trailer.open && (
        <TrailerModal
          open={trailer.open}
          url={trailer.url}
          title={trailer.title}
          movie={trailer.movie}
          onClose={() => setTrailer({ open: false, url: '', title: '', movie: null })}
        />
      )}
    </section>
  );
};