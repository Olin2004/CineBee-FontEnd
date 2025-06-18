import React from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/mousewheel';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import FullScreenLoader from '../../../../components/Loader/FullScreenLoader';
import useTrendingMovies from '../../../../features/movies/trendingMovies';

const TrendingBadge = ({ index, rating }) => (
  <div className="flex items-center gap-2">
    {/* Large order number, yellow, shadow */}
    <span
      className="text-4xl font-extrabold text-yellow-500 dark:text-yellow-300 drop-shadow-lg select-none"
      style={{ minWidth: 32 }}
    >
      {index}
    </span>
    {/* Badge rating */}
    <span className="inline-flex items-center px-2 py-1 rounded-full bg-black/90 dark:bg-white/90 text-yellow-400 dark:text-yellow-700 font-bold text-sm shadow ml-1">
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

const clipPathStyles = [
  'polygon(94.239% 100%,5.761% 100%,5.761% 100%,4.826% 99.95%,3.94% 99.803%,3.113% 99.569%,2.358% 99.256%,1.687% 98.87%,1.111% 98.421%,.643% 97.915%,.294% 97.362%,.075% 96.768%,0 96.142%,0 3.858%,0 3.858%,.087% 3.185%,.338% 2.552%,.737% 1.968%,1.269% 1.442%,1.92% .984%,2.672% .602%,3.512% .306%,4.423% .105%,5.391% .008%,6.4% .024%,94.879% 6.625%,94.879% 6.625%,95.731% 6.732%,96.532% 6.919%,97.272% 7.178%,97.942% 7.503%,98.533% 7.887%,99.038% 8.323%,99.445% 8.805%,99.747% 9.326%,99.935% 9.88%,100% 10.459%,100% 96.142%,100% 96.142%,99.925% 96.768%,99.706% 97.362%,99.357% 97.915%,98.889% 98.421%,98.313% 98.87%,97.642% 99.256%,96.887% 99.569%,96.06% 99.803%,95.174% 99.95%,94.239% 100%)',
  'polygon(5.761% 100%,94.239% 100%,94.239% 100%,95.174% 99.95%,96.06% 99.803%,96.887% 99.569%,97.642% 99.256%,98.313% 98.87%,98.889% 98.421%,99.357% 97.915%,99.706% 97.362%,99.925% 96.768%,100% 96.142%,100% 3.858%,100% 3.858%,99.913% 3.185%,99.662% 2.552%,99.263% 1.968%,98.731% 1.442%,98.08% .984%,97.328% .602%,96.488% .306%,95.577% .105%,94.609% .008%,93.6% .024%,5.121% 6.625%,5.121% 6.625%,4.269% 6.732%,3.468% 6.919%,2.728% 7.178%,2.058% 7.503%,1.467% 7.887%,.962% 8.323%,.555% 8.805%,.253% 9.326%,.065% 9.88%,0 10.459%,0 96.142%,0 96.142%,.075% 96.768%,.294% 97.362%,.643% 97.915%,1.111% 98.421%,1.687% 98.87%,2.358% 99.256%,3.113% 99.569%,3.94% 99.803%,4.826% 99.95%,5.761% 100%)',
];

export const TrendingSection = () => {
  const { movies, loading, error } = useTrendingMovies();

  if (loading) return <FullScreenLoader />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative mb-4">
        {/* Full width faded line - background */}
        <div className="absolute left-0 right-0 bottom-0 h-[2px] bg-gray-500 dark:bg-gray-300 opacity-20"></div>

        {/* Trending text + colored underline */}
        <div className="flex items-center gap-2 relative z-10 inline-block">
          <span className="text-xl">🔥</span>
          <h2 className="text-[20px] font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text uppercase dark:from-yellow-300 dark:to-pink-400">
            Trending
          </h2>

          {/* Orange-pink gradient underline under text */}
          <div className="absolute left-[1px] bottom-0 w-[140px] h-[3px] bg-gradient-to-r from-orange-400 to-pink-500 dark:from-yellow-300 dark:to-pink-400 rounded-full"></div>
        </div>
      </div>

      {/* Swiper phần dưới giữ nguyên */}
      <Swiper
        modules={[FreeMode, Mousewheel]}
        slidesPerView={5}
        spaceBetween={40}
        freeMode={true}
        mousewheel={true}
        className="mySwiper"
        style={{ width: '100%', paddingBottom: 24 }}
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={movie.rank} className="group">
            <div className="flex flex-col items-start w-[210px] md:w-[240px]">
              <div
                className="relative w-full h-[320px] md:h-[360px] overflow-hidden bg-[#f3f4f6] dark:bg-[#23232b] flex items-end shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-yellow-300 group-hover:shadow-lg group-hover:brightness-110"
                style={{ borderRadius: 28, clipPath: clipPathStyles[idx % clipPathStyles.length] }}
              >
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-full h-full object-cover block"
                  style={{
                    borderRadius: 28,
                    clipPath: clipPathStyles[idx % clipPathStyles.length],
                  }}
                />
                <span className="absolute bottom-3 right-3 bg-black/90 dark:bg-white/90 text-yellow-300 dark:text-yellow-700 font-bold text-lg rounded-full px-4 py-2 shadow flex items-center gap-1">
                  {movie.rating?.toFixed(1)}
                </span>
              </div>
              <div className="flex flex-row items-end w-full mt-5 pl-2 gap-3">
                <span
                  className="text-5xl md:text-6xl font-extrabold italic text-yellow-400 dark:text-yellow-200 select-none leading-none"
                  style={{ fontFamily: 'inherit' }}
                >
                  {idx + 1}
                </span>
                <div className="flex flex-col justify-end min-w-0">
                  <span className="font-bold text-gray-900 dark:text-white text-xl md:text-2xl leading-tight truncate max-w-[150px]">
                    {movie.title}
                  </span>
                  <span className="text-base md:text-lg text-gray-400 dark:text-gray-300 truncate max-w-[150px]">
                    {movie.othernames || movie.subtitle || ''}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrendingBadge;
