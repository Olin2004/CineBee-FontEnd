import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useSearchParams } from 'react-router-dom';
import { redirectToMomoPayment } from '../../services/paymentAPI';
import {
  FaFilm,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCouch,
  FaCheckCircle,
  FaStar,
  FaTicketAlt,
  FaGlobeAsia,
  FaMapPin,
  FaCreditCard,
  FaArrowLeft,
  FaArrowRight,
  FaPlay,
  FaUsers,
  FaFire,
  FaMobile,
  FaSpinner,
  FaWallet,
  FaQrcode,
  FaShieldAlt,
  FaBolt,
  FaHeart,
  FaGift,
} from 'react-icons/fa';

// Enhanced movie data with more details
const movies = [
  {
    id: 1,
    title: 'Dune: Hành Tinh Cát',
    genre: 'Khoa học viễn tưởng',
    duration: 155,
    rating: 8.2,
    ageRating: 'T13',
    description:
      'Cuộc chiến sinh tồn trên hành tinh sa mạc Arrakis. Paul Atreides dẫn dắt một cuộc chiến chống lại những kẻ chiếm đoạt hành tinh quê hương của mình.',
    price: 160000,
    poster: 'https://image.tmdb.org/t/p/w500/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg',
    trailer: 'https://www.youtube.com/watch?v=8g18jFHCLXk',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac'],
    isHot: true,
    isNew: false,
  },
  {
    id: 2,
    title: 'Spider-Man: No Way Home',
    genre: 'Hành động',
    duration: 148,
    rating: 8.7,
    ageRating: 'T13',
    description:
      'Peter Parker đối mặt đa vũ trụ. Khi danh tính Spider-Man của anh được tiết lộ, Peter cầu cứu Doctor Strange để giúp đỡ, nhưng phép thuật trở nên nguy hiểm.',
    price: 150000,
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    trailer: 'https://www.youtube.com/watch?v=JfVOs4VSpmA',
    director: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
    isHot: false,
    isNew: false,
  },
  {
    id: 3,
    title: 'Thanh Gươm Diệt Quỷ',
    genre: 'Anime',
    duration: 120,
    rating: 8.5,
    ageRating: 'T16',
    description:
      'Cuộc chiến chống lại quỷ dữ của Tanjiro. Một câu chuyện về anh em tình thương và sự hy sinh để bảo vệ những người thân yêu.',
    price: 140000,
    poster: 'https://image.tmdb.org/t/p/w500/4J2QfK1Z8gKTMv1r5zFhQ6FvP1g.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    director: 'Haruo Sotozaki',
    cast: ['Natsuki Hanae', 'Satomi Sato', 'Hiro Shimono'],
    isHot: true,
    isNew: false,
  },
  {
    id: 4,
    title: 'Fast & Furious 9',
    genre: 'Hành động',
    duration: 143,
    rating: 7.9,
    ageRating: 'T16',
    description:
      'Đua xe, hành động, gia đình và tốc độ. Dom Toretto và gia đình đối mặt với mối đe dọa lớn nhất từ trước đến nay.',
    price: 130000,
    poster: 'https://image.tmdb.org/t/p/w500/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg',
    trailer: 'https://www.youtube.com/watch?v=example2',
    director: 'Justin Lin',
    cast: ['Vin Diesel', 'Michelle Rodriguez', 'Tyrese Gibson'],
    isHot: false,
    isNew: true,
  },
  {
    id: 3,
    title: 'Thanh Gươm Diệt Quỷ',
    genre: 'Anime',
    duration: 120,
    rating: 7.5,
    ageRating: 'T16',
    description:
      'Một câu chuyện tình yêu đầy cảm động về hai người trẻ phải đối mặt với những thử thách cuộc sống. Họ tìm thấy hy vọng và tình yêu trong những khoảnh khắc cuối cùng.',
    price: 130000,
    poster: 'https://image.tmdb.org/t/p/w500/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg',
    trailer: 'https://www.youtube.com/watch?v=example',
    director: 'Nguyễn Quang Dũng',
    cast: ['Thuận Nguyễn', 'Thúy Ngân', 'Lãnh Thanh'],
    isHot: false,
    isNew: true,
  },
  {
    id: 5,
    title: 'Black Widow',
    genre: 'Hành động',
    duration: 134,
    rating: 7.8,
    ageRating: 'T13',
    description:
      'Hành trình riêng của Natasha Romanoff. Một câu chuyện về quá khứ đen tối và cuộc đối đầu với những bí mật từ lịch sử của cô.',
    price: 125000,
    poster: 'https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    trailer: 'https://www.youtube.com/watch?v=example3',
    director: 'Cate Shortland',
    cast: ['Scarlett Johansson', 'Florence Pugh', 'David Harbour'],
    isHot: false,
    isNew: false,
  },
];

// Enhanced cinema data
const cinemas = [
  {
    id: 1,
    name: 'CGV Vincom Bà Triệu',
    location: 'Tầng 12, Vincom Center, Ba Đình, Hà Nội',
    brand: 'CGV',
    facilities: ['IMAX', '4DX', 'Dolby Atmos'],
    rating: 4.5,
    image:
      'https://images.unsplash.com/photo-1489599649716-11d8b2c1d11d?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Beta Mỹ Đình',
    location: '2 Phạm Hùng, Nam Từ Liêm, Hà Nội',
    brand: 'Beta',
    facilities: ['Premium', 'Couple Seat'],
    rating: 4.3,
    image:
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Galaxy Cinema Nguyễn Du',
    location: '116 Nguyễn Du, Hai Bà Trưng, Hà Nội',
    brand: 'Galaxy',
    facilities: ['VIP', 'Gold Class'],
    rating: 4.6,
    image:
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=500&q=80',
  },
];

// Enhanced showtime data
const showtimes = [
  // Avatar: The Way of Water
  {
    id: 1,
    movieId: 1,
    cinemaId: 1,
    date: '2025-07-15',
    time: '09:30',
    room: 'Phòng IMAX 1',
    available: 45,
    type: 'IMAX',
    price: 200000,
  },
  {
    id: 2,
    movieId: 1,
    cinemaId: 1,
    date: '2025-07-15',
    time: '19:30',
    room: 'Phòng 4DX',
    available: 8,
    type: '4DX',
    price: 250000,
  },
  {
    id: 3,
    movieId: 1,
    cinemaId: 2,
    date: '2025-07-16',
    time: '20:00',
    room: 'Phòng Premium A',
    available: 12,
    type: 'Premium',
    price: 180000,
  },

  // Top Gun: Maverick
  {
    id: 4,
    movieId: 2,
    cinemaId: 1,
    date: '2025-07-15',
    time: '13:45',
    room: 'Phòng Dolby 3',
    available: 25,
    type: 'Dolby Atmos',
    price: 170000,
  },
  {
    id: 5,
    movieId: 2,
    cinemaId: 2,
    date: '2025-07-16',
    time: '21:00',
    room: 'Phòng Standard B',
    available: 20,
    type: 'Standard',
    price: 150000,
  },

  // Spider-Man: No Way Home
  {
    id: 6,
    movieId: 3,
    cinemaId: 1,
    date: '2025-07-15',
    time: '11:00',
    room: 'Phòng Standard 1',
    available: 50,
    type: 'Standard',
    price: 140000,
  },
  {
    id: 7,
    movieId: 3,
    cinemaId: 3,
    date: '2025-07-16',
    time: '14:30',
    room: 'Galaxy VIP 2',
    available: 35,
    type: 'VIP',
    price: 190000,
  },

  // Điều Ước Cuối Cùng
  {
    id: 8,
    movieId: 4,
    cinemaId: 2,
    date: '2025-07-15',
    time: '19:00',
    room: 'Phòng Couple C',
    available: 18,
    type: 'Couple',
    price: 160000,
  },
  {
    id: 9,
    movieId: 4,
    cinemaId: 3,
    date: '2025-07-16',
    time: '21:45',
    room: 'Galaxy Gold 1',
    available: 28,
    type: 'Gold Class',
    price: 220000,
  },

  // Black Widow
  {
    id: 10,
    movieId: 5,
    cinemaId: 1,
    date: '2025-07-15',
    time: '12:00',
    room: 'Phòng Standard 2',
    available: 45,
    type: 'Standard',
    price: 125000,
  },
  {
    id: 11,
    movieId: 5,
    cinemaId: 2,
    date: '2025-07-16',
    time: '17:00',
    room: 'Phòng Premium D',
    available: 30,
    type: 'Premium',
    price: 145000,
  },
  {
    id: 12,
    movieId: 5,
    cinemaId: 3,
    date: '2025-07-16',
    time: '20:30',
    room: 'Galaxy VIP 3',
    available: 25,
    type: 'VIP',
    price: 175000,
  },
];

// Enhanced seat layout
const createSeatLayout = () => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;
  const seats = [];

  rows.forEach((row, rowIndex) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`,
        label: `${row}${i}`,
        row: row,
        number: i,
        sold: Math.random() < 0.2, // 20% ghế đã bán
        type: i <= 2 || i >= 9 ? 'vip' : 'standard', // ghế VIP ở 2 bên
        price: i <= 2 || i >= 9 ? 50000 : 0, // phụ phí VIP
      });
    }
  });

  return seats;
};

const steps = [
  { id: 0, label: 'Chọn phim', icon: FaFilm, color: 'from-purple-500 to-pink-500' },
  { id: 1, label: 'Chọn rạp', icon: FaMapMarkerAlt, color: 'from-blue-500 to-cyan-500' },
  { id: 2, label: 'Chọn ngày', icon: FaCalendarAlt, color: 'from-green-500 to-emerald-500' },
  { id: 3, label: 'Chọn suất', icon: FaClock, color: 'from-orange-500 to-red-500' },
  { id: 4, label: 'Chọn ghế', icon: FaCouch, color: 'from-indigo-500 to-purple-500' },
  { id: 5, label: 'Thanh toán', icon: FaCreditCard, color: 'from-yellow-500 to-orange-500' },
];

export default function BookingPage() {
  const { id } = useParams(); // Get movieId from URL params like /booking/:id
  const [searchParams] = useSearchParams(); // Get movieId from query params like /booking?movieId=1

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);

  // Payment states
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    setSeats(createSeatLayout());

    // Auto-select movie from URL params
    const movieIdFromParams = id || searchParams.get('movieId');
    if (movieIdFromParams) {
      const movieId = parseInt(movieIdFromParams);
      const movieExists = movies.find((m) => m.id === movieId);
      if (movieExists) {
        setSelectedMovie(movieId);
        setCurrentStep(1); // Skip to cinema selection step
      }
    }
  }, [id, searchParams]);

  // Filter available dates based on selected movie and cinema
  const availableDates = Array.from(
    new Set(
      showtimes
        .filter(
          (s) =>
            (!selectedMovie || s.movieId === selectedMovie) &&
            (!selectedCinema || s.cinemaId === selectedCinema)
        )
        .map((s) => s.date)
    )
  ).sort();

  // Filter available showtimes
  const availableShowtimes = showtimes.filter(
    (s) =>
      (!selectedMovie || s.movieId === selectedMovie) &&
      (!selectedCinema || s.cinemaId === selectedCinema) &&
      (!selectedDate || s.date === selectedDate)
  );

  // Calculate total price
  const calculateTotal = () => {
    const selectedMovieObj = movies.find((m) => m.id === selectedMovie);
    const selectedShowtimeObj = showtimes.find((s) => s.id === selectedShowtime);
    const seatPrice = selectedShowtimeObj?.price || selectedMovieObj?.price || 0;
    const vipSeatCount = selectedSeats.filter((seatId) => {
      const seat = seats.find((s) => s.id === seatId);
      return seat?.type === 'vip';
    }).length;
    const standardSeatCount = selectedSeats.length - vipSeatCount;

    return standardSeatCount * seatPrice + vipSeatCount * (seatPrice + 50000);
  };

  // Handle booking with cash payment
  const handleCashBooking = () => {
    // Simulate booking API call
    alert('🎉 Đặt vé thành công! Vui lòng thanh toán tại quầy trước 30 phút.');
    resetBookingForm();
  };

  // Handle MoMo payment
  const handleMomoPayment = async () => {
    if (selectedSeats.length === 0) {
      setPaymentError('Vui lòng chọn ghế trước khi thanh toán');
      return;
    }

    setIsProcessingPayment(true);
    setPaymentError(null);

    try {
      // In a real app, you would first create a ticket in your backend
      // and get the ticketId, then use that ticketId for payment

      // For demo purposes, we'll generate a mock ticketId as number
      const mockTicketId = Date.now(); // This creates a numeric ID

      // Create mock ticket data for backend simulation
      const ticketData = {
        movieId: selectedMovie,
        cinemaId: selectedCinema,
        showtime: selectedShowtime,
        seats: selectedSeats,
        date: selectedDate,
        total: calculateTotal(),
        userId: 'user_123', // In real app, get from auth context
      };

      console.log('Creating ticket with data:', ticketData, 'TicketID:', mockTicketId);

      // Redirect to MoMo payment with numeric ticketId
      await redirectToMomoPayment(mockTicketId);
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'Đã có lỗi xảy ra khi xử lý thanh toán');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Reset booking form
  const resetBookingForm = () => {
    setCurrentStep(0);
    setSelectedMovie(null);
    setSelectedCinema(null);
    setSelectedDate('');
    setSelectedShowtime(null);
    setSelectedSeats([]);
    setPaymentError(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Progress Stepper Component
  const ProgressStepper = () => (
    <div className="relative mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <motion.div
              key={step.id}
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => index < currentStep && setCurrentStep(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`
                relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 mb-2
                ${
                  isCompleted
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                    : isActive
                    ? `bg-gradient-to-r ${step.color} text-white shadow-2xl ring-4 ring-yellow-300 scale-110`
                    : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
                }
              `}
              >
                <IconComponent />
                {isCompleted && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <FaCheckCircle className="text-white text-xs" />
                  </motion.div>
                )}
              </div>
              <span
                className={`
                text-xs font-semibold text-center transition-colors duration-300 hidden sm:block
                ${
                  isActive
                    ? 'text-yellow-500'
                    : isCompleted
                    ? 'text-gray-700 dark:text-gray-300'
                    : 'text-gray-400'
                }
              `}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Line */}
      <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );

  // Movie Selection Step
  const MovieSelection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Chọn phim yêu thích
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Khám phá những bộ phim hot nhất hiện tại
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            variants={itemVariants}
            className={`
              relative group cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105
              ${
                selectedMovie === movie.id
                  ? 'ring-4 ring-yellow-400 shadow-2xl shadow-yellow-400/50'
                  : 'hover:shadow-2xl hover:shadow-purple-500/20'
              }
            `}
            onClick={() => setSelectedMovie(movie.id)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Movie Poster Background */}
            <div className="relative h-64 bg-gradient-to-br from-gray-900 to-gray-700 overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Movie Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {movie.isHot && (
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <FaFire /> HOT
                  </span>
                )}
                {movie.isNew && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    NEW
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="text-white font-bold text-xs">{movie.rating}</span>
              </div>

              {/* Play Button */}
              <motion.button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPlay className="text-white text-xl ml-1" />
              </motion.button>

              {/* Selection Indicator */}
              {selectedMovie === movie.id && (
                <motion.div
                  className="absolute bottom-4 right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <FaCheckCircle className="text-black text-xl" />
                </motion.div>
              )}
            </div>

            {/* Movie Info */}
            <div className="p-6 bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                {movie.title}
              </h3>

              <div className="flex items-center gap-3 mb-3">
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {movie.genre}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {movie.duration} phút
                </span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                  {movie.ageRating}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 text-sm">
                {movie.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Đạo diễn:</span>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {movie.director}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Giá từ</div>
                  <div className="text-lg font-bold text-red-600">
                    {movie.price.toLocaleString()}đ
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <button
          className={`
            px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3
            ${
              selectedMovie
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-purple-500/50 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          disabled={!selectedMovie}
          onClick={() => selectedMovie && setCurrentStep(1)}
        >
          Tiếp theo: Chọn rạp
          <FaArrowRight />
        </button>
      </motion.div>
    </motion.div>
  );

  // Cinema Selection Step
  const CinemaSelection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
          Chọn rạp chiếu
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base">
          Tìm rạp gần bạn với chất lượng tốt nhất
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cinemas.map((cinema) => (
          <motion.div
            key={cinema.id}
            variants={itemVariants}
            className={`relative group cursor-pointer overflow-hidden rounded-xl transition-all duration-500 border-2
              ${
                selectedCinema === cinema.id
                  ? 'border-blue-400 shadow-2xl shadow-blue-400/50 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-xl bg-white dark:bg-gray-800'
              }`}
            onClick={() => setSelectedCinema(cinema.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center p-4 gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={cinema.image}
                  alt={cinema.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {cinema.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {cinema.brand}
                      </span>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-xs" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {cinema.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedCinema === cinema.id && (
                    <motion.div
                      className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <FaCheckCircle className="text-white text-xs" />
                    </motion.div>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
                  <FaMapPin className="text-blue-500" />
                  {cinema.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cinema.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="flex justify-between">
        <button
          className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 dark:text-gray-300 font-bold hover:border-blue-400 hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
          onClick={() => setCurrentStep(0)}
        >
          <FaArrowLeft />
          Quay lại
        </button>

        <button
          className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3
            ${
              selectedCinema
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          disabled={!selectedCinema}
          onClick={() => selectedCinema && setCurrentStep(2)}
        >
          Tiếp theo: Chọn ngày
          <FaArrowRight />
        </button>
      </motion.div>
    </motion.div>
  );

  // Date Selection Step
  const DateSelection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
          Chọn ngày chiếu
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Lựa chọn ngày phù hợp với lịch trình của bạn
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {availableDates.map((date) => {
          const dateObj = new Date(date);
          const dayName = dateObj.toLocaleDateString('vi-VN', { weekday: 'long' });
          const dayMonth = dateObj.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
          });
          const isToday = date === new Date().toISOString().split('T')[0];

          return (
            <motion.button
              key={date}
              variants={itemVariants}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300 group
                ${
                  selectedDate === date
                    ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-2xl shadow-green-400/50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300 hover:shadow-xl bg-white dark:bg-gray-800'
                }
              `}
              onClick={() => setSelectedDate(date)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isToday && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Hôm nay
                  </span>
                </div>
              )}

              <div className="text-center">
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 capitalize">
                  {dayName}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {dayMonth}
                </div>

                {selectedDate === date && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.div variants={itemVariants} className="flex justify-between">
        <button
          className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 dark:text-gray-300 font-bold hover:border-green-400 hover:text-green-600 transition-all duration-300 flex items-center gap-2"
          onClick={() => setCurrentStep(1)}
        >
          <FaArrowLeft />
          Quay lại
        </button>

        <button
          className={`
            px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3
            ${
              selectedDate
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl hover:shadow-green-500/50 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          disabled={!selectedDate}
          onClick={() => selectedDate && setCurrentStep(3)}
        >
          Tiếp theo: Chọn suất
          <FaArrowRight />
        </button>
      </motion.div>
    </motion.div>
  );

  // Showtime Selection Step
  const ShowtimeSelection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          Chọn suất chiếu
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Lựa chọn khung giờ phù hợp nhất</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableShowtimes.map((showtime) => (
          <motion.button
            key={showtime.id}
            variants={itemVariants}
            className={`
              relative p-6 rounded-2xl border-2 transition-all duration-300 group
              ${
                selectedShowtime === showtime.id
                  ? 'border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 shadow-2xl shadow-orange-400/50'
                  : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 hover:shadow-xl bg-white dark:bg-gray-800'
              }
            `}
            onClick={() => setSelectedShowtime(showtime.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -top-2 left-4">
              <span
                className={`
                px-3 py-1 rounded-full text-xs font-bold text-white
                ${
                  showtime.type === 'IMAX'
                    ? 'bg-purple-500'
                    : showtime.type === '4DX'
                    ? 'bg-blue-500'
                    : showtime.type === 'VIP'
                    ? 'bg-yellow-500'
                    : showtime.type === 'Premium'
                    ? 'bg-green-500'
                    : 'bg-gray-500'
                }
              `}
              >
                {showtime.type}
              </span>
            </div>
            <div className="text-center pt-2">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {showtime.time}
              </div>

              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                {showtime.room}
              </div>

              <div
                className={`
                flex items-center justify-center gap-1 text-sm mb-4
                ${
                  showtime.available > 20
                    ? 'text-green-600'
                    : showtime.available > 10
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }
              `}
              >
                <FaUsers className="text-xs" />
                {showtime.available} ghế trống
              </div>

              <div className="text-lg font-bold text-orange-600 mb-4">
                {showtime.price.toLocaleString()}đ
              </div>

              {selectedShowtime === showtime.id && (
                <motion.div
                  className="flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div variants={itemVariants} className="flex justify-between">
        <button
          className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 dark:text-gray-300 font-bold hover:border-orange-400 hover:text-orange-600 transition-all duration-300 flex items-center gap-2"
          onClick={() => setCurrentStep(2)}
        >
          <FaArrowLeft />
          Quay lại
        </button>
        <button
          className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3
            ${
              selectedShowtime
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl hover:shadow-orange-500/50 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          disabled={!selectedShowtime}
          onClick={() => selectedShowtime && setCurrentStep(4)}
        >
          Tiếp theo: Chọn ghế
          <FaArrowRight />
        </button>
      </motion.div>
    </motion.div>
  );

  // Seat Selection Step
  const SeatSelection = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Chọn ghế ngồi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Chọn vị trí ghế yêu thích của bạn
        </p>
      </div>

      <div className="flex flex-col items-center">
        {/* Screen */}
        <div className="relative w-full max-w-2xl mb-8">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
            🎬 Màn hình chiếu
          </div>
          <div className="w-full h-4 rounded-b-3xl bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 shadow-lg border-2 border-yellow-400/30" />
        </div>

        {/* Seat Layout */}
        <div className="grid grid-cols-10 gap-2 mb-8">
          {seats.map((seat) => (
            <motion.button
              key={seat.id}
              disabled={seat.sold}
              className={`w-10 h-10 rounded-lg text-xs font-bold transition-all duration-300 border-2 relative
                ${
                  seat.sold
                    ? 'bg-gray-400 text-gray-200 border-gray-400 cursor-not-allowed opacity-50'
                    : selectedSeats.includes(seat.id)
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-indigo-400 scale-110 shadow-lg'
                    : seat.type === 'vip'
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 hover:scale-110 hover:shadow-lg'
                    : 'bg-white text-gray-800 border-gray-300 hover:scale-110 hover:border-indigo-300 hover:shadow-lg dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600'
                }`}
              onClick={() => {
                if (!seat.sold) {
                  setSelectedSeats((prev) =>
                    prev.includes(seat.id)
                      ? prev.filter((id) => id !== seat.id)
                      : [...prev, seat.id]
                  );
                }
              }}
              whileHover={!seat.sold ? { scale: 1.1 } : {}}
              whileTap={!seat.sold ? { scale: 0.95 } : {}}
            >
              {seat.label}
              {selectedSeats.includes(seat.id) && (
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <FaCheckCircle className="text-white text-xs" />
                </motion.div>
              )}
              {seat.type === 'vip' && !seat.sold && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                </div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 text-sm bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl shadow-lg mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-indigo-400"></div>
            <span className="font-semibold">Đã chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gray-400 border-2 border-gray-400 opacity-50"></div>
            <span className="font-semibold">Đã bán</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-white border-2 border-gray-300 dark:bg-gray-800 dark:border-gray-600"></div>
            <span className="font-semibold">Thường</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300"></div>
            <span className="font-semibold">VIP (+50k)</span>
          </div>
        </div>

        {/* Selected Seats Info */}
        {selectedSeats.length > 0 && (
          <motion.div
            className="mb-6 p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl border-2 border-indigo-300 dark:border-indigo-700"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <p className="text-sm font-semibold text-indigo-800 dark:text-indigo-200 text-center">
              🎫 Đã chọn {selectedSeats.length} ghế:{' '}
              {seats
                .filter((s) => selectedSeats.includes(s.id))
                .map((s) => s.label)
                .join(', ')}
            </p>
            <p className="text-xs text-indigo-600 dark:text-indigo-300 text-center mt-1">
              Tổng: {calculateTotal().toLocaleString()}đ
            </p>
          </motion.div>
        )}
      </div>

      <motion.div variants={itemVariants} className="flex justify-between">
        <button
          className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 dark:text-gray-300 font-bold hover:border-indigo-400 hover:text-indigo-600 transition-all duration-300 flex items-center gap-2"
          onClick={() => setCurrentStep(3)}
        >
          <FaArrowLeft />
          Quay lại
        </button>
        <button
          className={`px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-3
            ${
              selectedSeats.length > 0
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:shadow-indigo-500/50 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          disabled={selectedSeats.length === 0}
          onClick={() => selectedSeats.length > 0 && setCurrentStep(5)}
        >
          Tiếp theo: Thanh toán
          <FaArrowRight />
        </button>
      </motion.div>
    </motion.div>
  );

  // Payment Step
  const Payment = () => {
    const selectedMovieObj = movies.find((m) => m.id === selectedMovie);
    const selectedCinemaObj = cinemas.find((c) => c.id === selectedCinema);
    const selectedShowtimeObj = showtimes.find((s) => s.id === selectedShowtime);
    const total = calculateTotal();

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header Section với Gradient */}
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-2xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                <FaTicketAlt className="text-3xl text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Xác nhận đặt vé
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Chọn phương thức thanh toán phù hợp
                </p>
              </div>
            </motion.div>

            {/* Quick Summary Icons */}
            <div className="flex justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FaFilm className="text-purple-500" />
                <span>{selectedMovieObj?.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{selectedCinemaObj?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCouch className="text-green-500" />
                <span>{selectedSeats.length} ghế</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Movie Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <FaFilm className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Thông tin phim
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                    {selectedMovieObj?.title}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaGlobeAsia className="text-purple-500" />
                      <span>{selectedMovieObj?.genre}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-orange-500" />
                      <span>{selectedMovieObj?.duration} phút</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-500" />
                      <span>{selectedMovieObj?.rating}/10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cinema & Schedule */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Lịch chiếu</h3>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedCinemaObj?.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <FaMapPin className="text-xs" />
                        {selectedCinemaObj?.location}
                      </p>
                    </div>
                    <div className="border-t border-blue-200 dark:border-blue-700 pt-3">
                      <p className="font-medium text-blue-600 dark:text-blue-400">
                        {new Date(selectedDate).toLocaleDateString('vi-VN', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                        })}
                      </p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 flex items-center gap-2">
                        <FaClock />
                        {selectedShowtimeObj?.time}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📍 {selectedShowtimeObj?.room}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seats & Total */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <FaCouch className="text-white text-xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Ghế & Thanh toán
                  </h3>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800">
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white mb-2">Ghế đã chọn:</p>
                      <div className="flex flex-wrap gap-2">
                        {seats
                          .filter((s) => selectedSeats.includes(s.id))
                          .map((s) => (
                            <span
                              key={s.id}
                              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                            >
                              {s.label} {s.type === 'vip' ? '✨' : ''}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="border-t border-green-200 dark:border-green-700 pt-4">
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-xl p-4 border-2 border-yellow-300 dark:border-yellow-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FaWallet className="text-2xl text-yellow-600" />
                            <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                              Tổng cộng:
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                              {total.toLocaleString()}đ
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {selectedSeats.length} vé ×{' '}
                              {total > 0
                                ? Math.round(total / selectedSeats.length).toLocaleString()
                                : '0'}
                              đ
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Error */}
        <AnimatePresence>
          {paymentError && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-red-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-white text-2xl">⚠️</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 dark:text-red-400 mb-1">
                      Lỗi thanh toán
                    </h4>
                    <p className="text-red-700 dark:text-red-400">{paymentError}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Payment Methods */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Back Button */}
          <div className="flex justify-center">
            <button
              className="px-8 py-3 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold hover:border-yellow-400 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-all duration-300 flex items-center gap-3 backdrop-blur-xl"
              onClick={() => setCurrentStep(4)}
            >
              <FaArrowLeft />
              <span>Quay lại chọn ghế</span>
            </button>
          </div>

          {/* Payment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cash Payment */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
              onClick={selectedSeats.length > 0 ? handleCashBooking : undefined}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div
                className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-blue-200 dark:border-blue-800 shadow-2xl transition-all duration-500 group-hover:border-blue-400 dark:group-hover:border-blue-600 ${
                  selectedSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-blue-500/50 transition-all duration-500">
                    <FaCreditCard className="text-3xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Thanh toán tại quầy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Đặt chỗ ngay, thanh toán khi nhận vé
                    </p>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-3 justify-center">
                      <FaShieldAlt className="text-blue-500" />
                      <span>Bảo lưu ghế trong 30 phút</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <FaTicketAlt className="text-green-500" />
                      <span>Nhận vé giấy tại quầy</span>
                    </div>
                    <div className="flex items-center gap-3 justify-center">
                      <FaClock className="text-orange-500" />
                      <span>Đến trước 15 phút</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-lg group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300 shadow-lg">
                      <FaGift className="inline mr-2" />
                      ĐẶT VÉ NGAY
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* MoMo Payment */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
              onClick={
                selectedSeats.length > 0 && !isProcessingPayment ? handleMomoPayment : undefined
              }
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 to-purple-600/30 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div
                className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-pink-200 dark:border-pink-800 shadow-2xl transition-all duration-500 group-hover:border-pink-400 dark:group-hover:border-pink-600 ${
                  selectedSeats.length === 0 || isProcessingPayment
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:shadow-pink-500/50 transition-all duration-500">
                    {isProcessingPayment ? (
                      <FaSpinner className="text-3xl text-white animate-spin" />
                    ) : (
                      <FaMobile className="text-3xl text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {isProcessingPayment ? 'Đang xử lý...' : 'Thanh toán MoMo'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {isProcessingPayment
                        ? 'Vui lòng chờ trong giây lát'
                        : 'Thanh toán online nhanh chóng'}
                    </p>
                  </div>

                  {!isProcessingPayment && (
                    <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-3 justify-center">
                        <FaBolt className="text-yellow-500" />
                        <span>Thanh toán tức thì</span>
                      </div>
                      <div className="flex items-center gap-3 justify-center">
                        <FaQrcode className="text-purple-500" />
                        <span>Vé điện tử qua QR Code</span>
                      </div>
                      <div className="flex items-center gap-3 justify-center">
                        <FaHeart className="text-red-500" />
                        <span>An toàn & bảo mật</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <div
                      className={`bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
                        !isProcessingPayment
                          ? 'group-hover:from-pink-600 group-hover:to-purple-700'
                          : ''
                      }`}
                    >
                      {isProcessingPayment ? (
                        <span className="flex items-center justify-center gap-2">
                          <FaSpinner className="animate-spin" />
                          ĐANG XỬ LÝ...
                        </span>
                      ) : (
                        <span>
                          <FaMobile className="inline mr-2" />
                          THANH TOÁN MOMO
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Payment Security Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaShieldAlt className="text-2xl text-emerald-600" />
                <h4 className="text-lg font-bold text-emerald-800 dark:text-emerald-400">
                  Thanh toán an toàn & bảo mật
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-emerald-700 dark:text-emerald-400">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center">
                    <FaCreditCard className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Thanh toán tại quầy</p>
                    <p className="text-xs">Bảo lưu ghế 30 phút • Linh hoạt thời gian</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-800 rounded-lg flex items-center justify-center">
                    <FaMobile className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Thanh toán MoMo</p>
                    <p className="text-xs">Mã hóa SSL • Vé điện tử tức thì</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <MovieSelection />;
      case 1:
        return <CinemaSelection />;
      case 2:
        return <DateSelection />;
      case 3:
        return <ShowtimeSelection />;
      case 4:
        return <SeatSelection />;
      case 5:
        return <Payment />;
      default:
        return <MovieSelection />;
    }
  };

  // Summary Card Component
  const SummaryCard = () => {
    const selectedMovieObj = movies.find((m) => m.id === selectedMovie);
    const selectedCinemaObj = cinemas.find((c) => c.id === selectedCinema);
    const selectedShowtimeObj = showtimes.find((s) => s.id === selectedShowtime);
    const total = calculateTotal();

    return (
      <motion.div
        className="sticky top-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-2rem)] overflow-y-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          <FaTicketAlt />
          Tóm tắt đặt vé
        </h3>

        <div className="space-y-4">
          {/* Movie Info */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <FaFilm className="text-purple-500 mt-1 flex-shrink-0 text-sm" />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Phim</div>
              {selectedMovieObj ? (
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  {selectedMovieObj.title}
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm">Chưa chọn</div>
              )}
            </div>
          </div>

          {/* Cinema Info */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0 text-sm" />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Rạp chiếu</div>
              {selectedCinemaObj ? (
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  {selectedCinemaObj.name}
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm">Chưa chọn</div>
              )}
            </div>
          </div>

          {/* Date Info */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <FaCalendarAlt className="text-green-500 mt-1 flex-shrink-0 text-sm" />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Ngày chiếu</div>
              {selectedDate ? (
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  {new Date(selectedDate).toLocaleDateString('vi-VN')}
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm">Chưa chọn</div>
              )}
            </div>
          </div>

          {/* Showtime Info */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <FaClock className="text-orange-500 mt-1 flex-shrink-0 text-sm" />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Suất chiếu</div>
              {selectedShowtimeObj ? (
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  {selectedShowtimeObj.time}
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm">Chưa chọn</div>
              )}
            </div>
          </div>

          {/* Seats Info */}
          <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <FaCouch className="text-indigo-500 mt-1 flex-shrink-0 text-sm" />
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-1">Ghế ngồi</div>
              {selectedSeats.length > 0 ? (
                <div className="font-bold text-gray-900 dark:text-white text-sm">
                  {seats
                    .filter((s) => selectedSeats.includes(s.id))
                    .map((s) => s.label)
                    .join(', ')}
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm">Chưa chọn</div>
              )}
            </div>
          </div>
        </div>

        {/* Tổng tiền */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="text-base font-bold text-gray-800 dark:text-gray-200">
                Tổng tiền:
              </span>
              <span className="text-2xl font-extrabold text-red-600">
                {total.toLocaleString()}đ
              </span>
            </div>
            {selectedSeats.length > 0 && (
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {selectedSeats.length} vé ×{' '}
                {calculateTotal() / selectedSeats.length
                  ? (calculateTotal() / selectedSeats.length).toLocaleString()
                  : '0'}
                đ
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          className={`w-full mt-4 py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2
            ${
              currentStep === 5 && selectedSeats.length > 0
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl hover:shadow-green-500/50 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          disabled={currentStep !== 5 || selectedSeats.length === 0}
          whileHover={currentStep === 5 && selectedSeats.length > 0 ? { scale: 1.05 } : {}}
          whileTap={currentStep === 5 && selectedSeats.length > 0 ? { scale: 0.95 } : {}}
          onClick={() => {
            if (currentStep === 5 && selectedSeats.length > 0) {
              handleCashBooking();
            }
          }}
        >
          <FaTicketAlt />
          {currentStep === 5 ? 'ĐẶT VÉ NGAY' : 'Hoàn tất thông tin'}
        </motion.button>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProgressStepper />
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  {renderCurrentStep()}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Summary Sidebar */}
          <div className="xl:w-80 2xl:w-96">
            <SummaryCard />
          </div>
        </div>
      </div>
    </div>
  );
}
