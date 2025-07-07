import React, { useState } from 'react';

function getYoutubeEmbedUrl(url) {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : url;
}

const StarRating = ({ value, onChange, max = 5 }) => (
  <div className="flex items-center gap-0.5 justify-center py-1">
    {Array.from({ length: max }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onChange(i + 1)}
        className="focus:outline-none"
        aria-label={`Đánh giá ${i + 1} sao`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill={i < value ? '#FFD600' : 'none'}
          stroke="#FFD600"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition"
        >
          <polygon points="10 1.7 12.73 7.1 18.6 7.9 14 12.2 15.1 18 10 15 4.9 18 6 12.2 1.4 7.9 7.27 7.1 10 1.7" />
        </svg>
      </button>
    ))}
  </div>
);

const TrailerModal = ({ open, onClose, url, title, movie }) => {
  const [userRating, setUserRating] = useState(0);
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-all duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-0 max-w-2xl w-full relative shadow-2xl border-2 border-transparent bg-gradient-to-r from-yellow-400 to-red-500 animate-modalShow trailer-modal-glow max-h-[90vh] flex flex-col">
        <div className="bg-white dark:bg-gray-900 rounded-2xl w-full h-full p-0">
          <button
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-yellow-400 dark:border-yellow-300 shadow-lg hover:bg-red-500 hover:border-red-500 transition z-20 group"
            onClick={onClose}
            aria-label="Đóng trailer"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" fill="none" />
              <path
                d="M9 9L19 19M19 9L9 19"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="text-gray-700 dark:text-gray-100 group-hover:text-white transition"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-extrabold text-yellow-600 dark:text-yellow-300 text-center pt-6 pb-2 px-3 tracking-wide">
            TRAILER - <span className="text-gray-800 dark:text-gray-100">{title}</span>
          </h2>
          <div className="w-full px-3 pb-2">
            <iframe
              width="100%"
              height="360"
              src={getYoutubeEmbedUrl(url)}
              title={title}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
            />
          </div>
          <div className="overflow-y-auto px-2 pb-2 text-xs">
            {/* Star rating UI */}
            <div className="flex flex-col items-center pb-1">
              <span className="font-semibold text-gray-700 dark:text-gray-200 text-xs mb-0.5">
                Đánh giá phim này:
              </span>
              <StarRating value={userRating} onChange={setUserRating} />
              {userRating > 0 && (
                <span className="text-yellow-600 dark:text-yellow-300 text-[10px] mt-0.5">
                  Bạn đã đánh giá {userRating} sao
                </span>
              )}
            </div>
            {/* Block thông tin phim */}
            {movie && (
              <div className="w-full px-0 py-2 text-xs text-left text-gray-800 dark:text-gray-100 bg-white/90 dark:bg-gray-900/90 rounded-2xl mt-2 shadow">
                <div className="grid grid-cols-4 md:grid-cols-2 gap-x-2 gap-y-1">
                  <div className="flex items-center">
                    <span className="font-bold">Đang phát:</span>
                    <span className="ml-1 text-red-500 font-semibold">HD Vietsub</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Thể loại:</span>
                    <span className="ml-1 text-gray-600 dark:text-gray-300">
                      {Array.isArray(movie.genre)
                        ? movie.genre.join(', ')
                        : movie.genre || 'Đang cập nhật'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Diễn viên:</span>
                    <span className="ml-1 text-gray-600 dark:text-gray-300">
                      {Array.isArray(movie.actors)
                        ? movie.actors.join(', ')
                        : movie.actors || 'Đang cập nhật'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Năm phát hành:</span>
                    <span className="ml-1">
                      {movie.releaseYear ||
                        (movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '...')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Đạo diễn:</span>
                    <span className="ml-1">{movie.director || '...'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Quốc gia:</span>
                    <span className="ml-1">{movie.country || '...'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Điểm IMDb:</span>
                    <span className="ml-1 bg-yellow-400 text-black dark:bg-yellow-300 dark:text-gray-900 px-3 py-1 rounded-full font-bold shadow min-w-[40px] text-center">
                      {movie.imdb || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold">Thời lượng:</span>
                    <span className="ml-1">{movie.duration || '...'}</span>
                  </div>
                  {movie.rottenTomatoes && (
                    <div className="flex items-center col-span-2">
                      <span className="font-bold">Điểm RottenTomatoes:</span>
                      <span className="ml-1 bg-red-600 text-white dark:bg-red-400 dark:text-gray-900 px-3 py-1 rounded-full font-bold shadow">{`${movie.rottenTomatoes}%`}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
