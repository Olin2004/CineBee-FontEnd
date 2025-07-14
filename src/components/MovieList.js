import React from 'react';
import { FaTicketAlt, FaFire } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const mockMovies = [
  {
    id: 1,
    title: 'Dune: Hành Tinh Cát',
    description: 'Cuộc chiến sinh tồn trên hành tinh sa mạc Arrakis.',
    poster: 'https://image.tmdb.org/t/p/w500/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg',
    hoverPoster:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    rating: 8.2,
    genre: 'Khoa học viễn tưởng',
    duration: 155,
    release: '2024-06-01',
    showtimes: ['14:00', '17:30', '20:00'],
    isHot: true,
  },
  {
    id: 2,
    title: 'Spider-Man: No Way Home',
    description: 'Peter Parker đối mặt đa vũ trụ.',
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    hoverPoster:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    rating: 8.7,
    genre: 'Hành động',
    duration: 148,
    release: '2024-05-25',
    showtimes: ['13:00', '16:00', '19:00'],
    isHot: false,
  },
  {
    id: 3,
    title: 'Thanh Gươm Diệt Quỷ',
    description: 'Cuộc chiến chống lại quỷ dữ của Tanjiro.',
    poster: 'https://image.tmdb.org/t/p/w500/4J2QfK1Z8gKTMv1r5zFhQ6FvP1g.jpg',
    hoverPoster:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    rating: 8.5,
    genre: 'Anime',
    duration: 120,
    release: '2024-06-10',
    showtimes: ['10:00', '15:00', '18:30'],
    isHot: true,
  },
  {
    id: 4,
    title: 'Fast & Furious 9',
    description: 'Đua xe, hành động, gia đình và tốc độ.',
    poster: 'https://image.tmdb.org/t/p/w500/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg',
    hoverPoster:
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    rating: 7.9,
    genre: 'Hành động',
    duration: 143,
    release: '2024-05-20',
    showtimes: ['11:00', '14:30', '21:00'],
    isHot: false,
  },
  {
    id: 5,
    title: 'Black Widow',
    description: 'Hành trình riêng của Natasha Romanoff.',
    poster: 'https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    hoverPoster:
      'https://images.unsplash.com/photo-1468071174046-657d9d351a40?auto=format&fit=crop&w=400&q=80',
    rating: 7.8,
    genre: 'Hành động',
    duration: 134,
    release: '2024-06-05',
    showtimes: ['12:00', '17:00', '20:30'],
    isHot: false,
  },
];

const formatDuration = (min) => `${Math.floor(min / 60)}h ${min % 60}m`;
const formatDate = (date) => new Date(date).toLocaleDateString('vi-VN');

const MovieList = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[1300px] mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 px-2">
      {mockMovies.map((movie, index) => (
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
          whileHover={{
            scale: 1.04,
            boxShadow: '0 8px 32px rgba(255,193,7,0.15)',
          }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden group flex flex-col border border-yellow-400/20"
          style={{ minHeight: 340 }}
        >
          {/* Badge Hot */}
          {movie.isHot && (
            <span className="absolute top-3 left-3 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
              <FaFire className="text-orange-600" /> Hot
            </span>
          )}
          {/* Ảnh poster + hover */}
          <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-48 object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
            />
            <img
              src={movie.hoverPoster}
              alt={movie.title + ' hover'}
              className="w-full h-48 object-cover absolute inset-0 opacity-0 scale-100 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            {/* Overlay gradient tối */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />
            {/* Nút Đặt vé */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.08, boxShadow: '0 4px 16px #ff9800' }}
                whileTap={{ scale: 0.97 }}
                className="pointer-events-auto flex items-center gap-2 bg-gradient-to-r from-pink-500 via-yellow-400 to-orange-500 text-white py-1.5 px-6 rounded-full font-bold text-sm shadow-lg transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 hover:shadow-pink-200/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 border-2 border-white/30"
                onClick={() => navigate(`/booking?movieId=${movie.id}`)}
              >
                <FaTicketAlt className="text-lg animate-bounce" /> Đặt vé
              </motion.button>
            </div>
          </div>
          {/* Info phim */}
          <div className="flex-1 flex flex-col justify-between items-start p-2 md:p-3 gap-1 min-h-[90px] w-full">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap w-full">
              {/* Bỏ IMDb rating */}
              <span className="text-[10px] bg-yellow-100 text-yellow-800 rounded-full px-1.5 py-0.5 font-semibold whitespace-nowrap">
                {movie.genre}
              </span>
              <span className="text-[10px] bg-gray-700 text-yellow-200 rounded-full px-1.5 py-0.5 font-semibold whitespace-nowrap">
                {formatDuration(movie.duration)}
              </span>
            </div>
            <h3 className="font-extrabold text-sm md:text-base text-white mb-0.5 line-clamp-2 leading-tight min-h-[28px] w-full">
              {movie.title}
            </h3>
            <p className="text-gray-300 text-xs line-clamp-1 mb-1 min-h-[14px] w-full">
              {movie.description}
            </p>
            <div className="flex flex-wrap gap-1 mt-1 w-full">
              {movie.showtimes.map((time) => (
                <span
                  key={time}
                  className="bg-yellow-400/90 text-gray-900 font-bold px-2 py-0.5 rounded-lg text-xs shadow-sm whitespace-nowrap"
                >
                  {time}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-1 w-full">
              <span className="text-[10px] text-yellow-200">
                Khởi chiếu: {formatDate(movie.release)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MovieList;
