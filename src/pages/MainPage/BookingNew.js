import React, { useState } from 'react';
import { FaStar, FaClock, FaCalendarAlt, FaMapMarkerAlt, FaPlay, FaUsers } from 'react-icons/fa';
import SEO from '../../components/SEO/SEO';

const movies = [
  {
    id: 1,
    title: 'Avatar: The Way of Water',
    poster: '/images/avatar2.jpg',
    genre: 'Sci-Fi, Adventure',
    duration: 192,
    rating: 8.5,
    ageRating: 'T13',
    description: 'Jake Sully sống cùng gia đình mới của mình trên hành tinh Pandora.',
    price: 160000,
  },
  {
    id: 2,
    title: 'Top Gun: Maverick',
    poster: '/images/topgun.jpg',
    genre: 'Action, Drama',
    duration: 130,
    rating: 9.1,
    ageRating: 'T16',
    description: 'Sau hơn ba thập kỷ phục vụ, Pete "Maverick" Mitchell trở lại.',
    price: 150000,
  },
  {
    id: 3,
    title: 'Spider-Man: No Way Home',
    poster: '/images/spiderman.jpg',
    genre: 'Action, Adventure',
    duration: 148,
    rating: 8.8,
    ageRating: 'T13',
    description: 'Peter Parker phải đối mặt với thử thách lớn nhất.',
    price: 140000,
  },
  {
    id: 4,
    title: 'Điều Ước Cuối Cùng',
    poster: '/images/vietnamese-movie.jpg',
    genre: 'Romance, Drama',
    duration: 120,
    rating: 7.5,
    ageRating: 'T16',
    description: 'Một câu chuyện tình yêu đầy cảm động về những điều ước cuối cùng.',
    price: 130000,
  },
];

const cinemas = [
  {
    id: 1,
    name: 'CGV Vincom Bà Triệu',
    location: 'Tầng 12, Vincom Center, Ba Đình, Hà Nội',
    facilities: ['IMAX', '4DX', 'Dolby Atmos'],
  },
  {
    id: 2,
    name: 'Beta Mỹ Đình',
    location: '2 Phạm Hùng, Nam Từ Liêm, Hà Nội',
    facilities: ['VIP', 'Couple Seat', 'Dolby 7.1'],
  },
  {
    id: 3,
    name: 'Galaxy Cinema Nguyễn Du',
    location: '116 Nguyễn Du, Hai Bà Trưng, Hà Nội',
    facilities: ['Premium', 'Gold Class', 'IMAX'],
  },
];

const showtimes = [
  // Avatar: The Way of Water
  {
    id: 1,
    movieId: 1,
    cinemaId: 1,
    date: '2025-07-15',
    time: '09:30',
    room: 'Phòng 1',
    type: 'Normal',
    available: 45,
  },
  {
    id: 2,
    movieId: 1,
    cinemaId: 1,
    date: '2025-07-15',
    time: '12:00',
    room: 'Phòng 2',
    type: 'VIP',
    available: 32,
  },
  {
    id: 3,
    movieId: 1,
    cinemaId: 1,
    date: '2025-07-15',
    time: '19:30',
    room: 'Phòng 1',
    type: 'Normal',
    available: 8,
  },
  {
    id: 4,
    movieId: 1,
    cinemaId: 2,
    date: '2025-07-16',
    time: '10:15',
    room: 'Phòng A',
    type: 'Normal',
    available: 38,
  },
  {
    id: 5,
    movieId: 1,
    cinemaId: 2,
    date: '2025-07-16',
    time: '20:00',
    room: 'Phòng C',
    type: 'Couple',
    available: 12,
  },

  // Top Gun: Maverick
  {
    id: 6,
    movieId: 2,
    cinemaId: 1,
    date: '2025-07-15',
    time: '13:45',
    room: 'Phòng 3',
    type: 'VIP',
    available: 25,
  },
  {
    id: 7,
    movieId: 2,
    cinemaId: 2,
    date: '2025-07-15',
    time: '17:15',
    room: 'Phòng B',
    type: 'Normal',
    available: 42,
  },
  {
    id: 8,
    movieId: 2,
    cinemaId: 3,
    date: '2025-07-16',
    time: '21:00',
    room: 'Galaxy 3',
    type: 'VIP',
    available: 20,
  },

  // Spider-Man: No Way Home
  {
    id: 9,
    movieId: 3,
    cinemaId: 1,
    date: '2025-07-15',
    time: '11:00',
    room: 'Phòng 1',
    type: 'Normal',
    available: 50,
  },
  {
    id: 10,
    movieId: 3,
    cinemaId: 2,
    date: '2025-07-15',
    time: '18:00',
    room: 'Phòng A',
    type: 'VIP',
    available: 30,
  },
  {
    id: 11,
    movieId: 3,
    cinemaId: 3,
    date: '2025-07-16',
    time: '14:30',
    room: 'Galaxy 2',
    type: 'Normal',
    available: 35,
  },

  // Điều Ước Cuối Cùng
  {
    id: 12,
    movieId: 4,
    cinemaId: 1,
    date: '2025-07-15',
    time: '09:30',
    room: 'Phòng 2',
    type: 'Normal',
    available: 40,
  },
  {
    id: 13,
    movieId: 4,
    cinemaId: 2,
    date: '2025-07-16',
    time: '19:00',
    room: 'Phòng B',
    type: 'VIP',
    available: 18,
  },
  {
    id: 14,
    movieId: 4,
    cinemaId: 3,
    date: '2025-07-16',
    time: '21:45',
    room: 'Galaxy 1',
    type: 'Normal',
    available: 28,
  },
];

const seats = Array.from({ length: 96 }, (_, i) => {
  const row = String.fromCharCode(65 + Math.floor(i / 12)); // A, B, C, D, E, F, G, H
  const number = (i % 12) + 1;
  const isVIP = ['E', 'F'].includes(row) && number >= 4 && number <= 9; // VIP seats in middle
  const isOccupied = Math.random() < 0.15; // 15% chance of being occupied

  return {
    id: i + 1,
    label: `${row}${number}`,
    row,
    number,
    sold: isOccupied,
    vip: isVIP,
    price: isVIP ? 200000 : 160000,
  };
});

const steps = ['Chọn phim', 'Chọn rạp', 'Chọn ngày', 'Chọn suất', 'Chọn ghế', 'Xác nhận'];

export default function BookingPage() {
  const [step, setStep] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Helper functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
    });
  };

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
  );

  const availableShowtimes = showtimes.filter(
    (s) =>
      (!selectedMovie || s.movieId === selectedMovie) &&
      (!selectedCinema || s.cinemaId === selectedCinema) &&
      (!selectedDate || s.date === selectedDate)
  );

  // Stepper UI
  const Stepper = () => (
    <div className="relative mb-8 select-none">
      <div className="flex items-center justify-between">
        {steps.map((label, idx) => (
          <div key={label} className="flex-1 flex flex-col items-center group relative">
            <div
              className={`w-11 h-11 flex items-center justify-center rounded-full font-bold text-lg border-2 transition-all duration-300
                ${
                  idx < step
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 shadow-lg group-hover:border-yellow-500 group-hover:shadow-xl cursor-pointer'
                    : idx === step
                    ? 'bg-gray-900 text-yellow-400 border-yellow-400 scale-110 shadow-2xl ring-2 ring-yellow-300 z-10'
                    : 'bg-gray-700 text-gray-400 border-gray-500 opacity-70'
                }
              `}
              style={{ transition: 'all 0.3s cubic-bezier(.4,2,.6,1)' }}
              onClick={() => idx < step && setStep(idx)}
            >
              {idx + 1}
            </div>
            <span
              className={`mt-2 text-base font-semibold text-center ${
                idx === step ? 'text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="flex absolute left-0 right-0 bottom-0 h-1 mt-3 gap-1 px-2">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-full transition-colors duration-500 ${
              idx < step ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 'bg-gray-600/40'
            }`}
            style={{ minWidth: 12, height: 4 }}
          ></div>
        ))}
      </div>
    </div>
  );

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg flex items-center">
              <FaPlay className="mr-3" />
              Chọn phim yêu thích
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group hover:shadow-xl transform hover:-translate-y-1 ${
                    selectedMovie === movie.id
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-yellow-300 bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => {
                    setSelectedMovie(movie.id);
                    setStep(1);
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Movie Poster */}
                    <div className="w-16 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                      <FaPlay className="text-white text-xl opacity-80" />
                    </div>

                    {/* Movie Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 transition-colors">
                        {movie.title}
                      </h3>

                      <div className="flex items-center space-x-3 mb-2 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          {movie.rating}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-1" />
                          {formatDuration(movie.duration)}
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                          {movie.ageRating}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {movie.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                          {movie.genre}
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          {formatPrice(movie.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg flex items-center">
              <FaMapMarkerAlt className="mr-3" />
              Chọn rạp chiếu
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {cinemas.map((cinema) => (
                <button
                  key={cinema.id}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 text-left group hover:shadow-xl transform hover:-translate-y-1 ${
                    selectedCinema === cinema.id
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-yellow-300 bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => {
                    setSelectedCinema(cinema.id);
                    setStep(2);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 transition-colors">
                        {cinema.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center mb-3">
                        <FaMapMarkerAlt className="mr-2" />
                        {cinema.location}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cinema.facilities.map((facility, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                    <FaMapMarkerAlt className="text-3xl text-gray-400 group-hover:text-yellow-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg flex items-center">
              <FaCalendarAlt className="mr-3" />
              Chọn ngày chiếu
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {availableDates.map((date) => (
                <button
                  key={date}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center group hover:shadow-lg transform hover:-translate-y-1 ${
                    selectedDate === date
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-yellow-300 bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => {
                    setSelectedDate(date);
                    setStep(3);
                  }}
                >
                  <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">
                    {formatDate(date)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {date === '2025-07-15' ? 'Hôm nay' : date === '2025-07-16' ? 'Ngày mai' : ''}
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg flex items-center">
              <FaClock className="mr-3" />
              Chọn suất chiếu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableShowtimes.map((show) => (
                <button
                  key={show.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left group hover:shadow-lg transform hover:-translate-y-1 ${
                    selectedShowtime === show.id
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 shadow-lg'
                      : 'border-gray-300 dark:border-gray-600 hover:border-yellow-300 bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => {
                    setSelectedShowtime(show.id);
                    setStep(4);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors mb-2">
                        {show.time}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {show.room}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            show.type === 'VIP'
                              ? 'bg-purple-100 text-purple-800'
                              : show.type === 'Couple'
                              ? 'bg-pink-100 text-pink-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {show.type}
                        </span>
                        <span className="flex items-center">
                          <FaUsers className="mr-1" />
                          {show.available} chỗ
                        </span>
                      </div>
                    </div>
                    <FaClock className="text-3xl text-gray-400 group-hover:text-yellow-500 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg flex items-center">
              <FaUsers className="mr-3" />
              Chọn ghế ngồi
            </h2>

            {/* Screen */}
            <div className="flex flex-col items-center mb-8">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Màn hình</div>
              <div className="w-3/4 h-4 rounded-b-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 shadow-lg mb-6" />
            </div>

            {/* Seats Grid */}
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-12 gap-2 mb-6">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    disabled={seat.sold}
                    className={`aspect-square rounded-lg border-2 font-semibold transition-all duration-300 text-xs relative ${
                      seat.sold
                        ? 'bg-gray-400 text-gray-200 border-gray-400 cursor-not-allowed opacity-50'
                        : selectedSeats.includes(seat.id)
                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white border-yellow-400 scale-110 shadow-lg ring-2 ring-yellow-300'
                        : seat.vip
                        ? 'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 hover:scale-105'
                        : 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200 hover:scale-105'
                    }`}
                    onClick={() =>
                      setSelectedSeats((prev) =>
                        prev.includes(seat.id)
                          ? prev.filter((id) => id !== seat.id)
                          : [...prev, seat.id]
                      )
                    }
                  >
                    {seat.label}
                    {seat.vip && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full text-xs flex items-center justify-center text-white">
                        ★
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                  <span>Ghế thường - {formatPrice(160000)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded relative">
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-500 rounded-full text-xs flex items-center justify-center text-white">
                      ★
                    </div>
                  </div>
                  <span>Ghế VIP - {formatPrice(200000)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 border border-yellow-400 rounded"></div>
                  <span>Đã chọn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-400 border border-gray-400 rounded opacity-50"></div>
                  <span>Đã bán</span>
                </div>
              </div>

              {selectedSeats.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Ghế đã chọn:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seatId) => {
                      const seat = seats.find((s) => s.id === seatId);
                      return (
                        <span
                          key={seatId}
                          className="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {seat?.label} {seat?.vip ? '(VIP)' : ''}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={selectedSeats.length === 0}
                onClick={() => setStep(5)}
              >
                Tiếp tục ({selectedSeats.length} ghế)
              </button>
            </div>
          </div>
        );

      case 5:
        const movie = movies.find((m) => m.id === selectedMovie);
        const cinema = cinemas.find((c) => c.id === selectedCinema);
        const showtime = showtimes.find((s) => s.id === selectedShowtime);
        const total = selectedSeats.reduce((sum, seatId) => {
          const seat = seats.find((s) => s.id === seatId);
          return sum + (seat?.price || 0);
        }, 0);

        return (
          <div className="animate-fade-in-up">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 text-yellow-400 drop-shadow-lg">
              Xác nhận đặt vé
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Chi tiết đặt vé
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Phim:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {movie?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Rạp:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {cinema?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Ngày:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatDate(selectedDate)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Suất:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {showtime?.time} - {showtime?.room}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Ghế:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedSeats
                      .map((seatId) => {
                        const seat = seats.find((s) => s.id === seatId);
                        return seat?.label;
                      })
                      .join(', ')}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-900 dark:text-white">Tổng cộng:</span>
                  <span className="text-red-500">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="flex-1 py-4 rounded-xl border-2 border-gray-300 text-gray-700 dark:text-gray-300 font-bold text-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                onClick={() => setStep(4)}
              >
                Quay lại
              </button>
              <button
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                onClick={() => {
                  alert('🎉 Đặt vé thành công! Cảm ơn bạn đã sử dụng CineBee!');
                  // Reset form
                  setStep(0);
                  setSelectedMovie(null);
                  setSelectedCinema(null);
                  setSelectedDate('');
                  setSelectedShowtime(null);
                  setSelectedSeats([]);
                }}
              >
                Đặt vé ngay - {formatPrice(total)}
              </button>
            </div>
          </div>
        );

      default:
        return <div>Có lỗi xảy ra</div>;
    }
  };

  // Summary card
  const SummaryCard = () => {
    const movie = movies.find((m) => m.id === selectedMovie);
    const cinema = cinemas.find((c) => c.id === selectedCinema);
    const showtime = showtimes.find((s) => s.id === selectedShowtime);
    const total = selectedSeats.reduce((sum, seatId) => {
      const seat = seats.find((s) => s.id === seatId);
      return sum + (seat?.price || 0);
    }, 0);

    return (
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 border-yellow-200 dark:border-yellow-900 sticky top-6">
        <h3 className="text-2xl font-extrabold mb-6 text-yellow-600 dark:text-yellow-400">
          Thông tin đặt vé
        </h3>

        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-semibold">Phim:</span>
            <div className="text-gray-900 dark:text-white font-bold">
              {movie?.title || <span className="text-gray-400">Chưa chọn</span>}
            </div>
          </div>

          <div>
            <span className="font-semibold">Rạp:</span>
            <div className="text-gray-900 dark:text-white font-bold">
              {cinema?.name || <span className="text-gray-400">Chưa chọn</span>}
            </div>
          </div>

          <div>
            <span className="font-semibold">Ngày:</span>
            <div className="text-gray-900 dark:text-white font-bold">
              {selectedDate ? (
                formatDate(selectedDate)
              ) : (
                <span className="text-gray-400">Chưa chọn</span>
              )}
            </div>
          </div>

          <div>
            <span className="font-semibold">Suất:</span>
            <div className="text-gray-900 dark:text-white font-bold">
              {showtime?.time || <span className="text-gray-400">Chưa chọn</span>}
            </div>
          </div>

          <div>
            <span className="font-semibold">Ghế:</span>
            <div className="text-gray-900 dark:text-white font-bold">
              {selectedSeats.length > 0 ? (
                seats
                  .filter((s) => selectedSeats.includes(s.id))
                  .map((s) => s.label)
                  .join(', ')
              ) : (
                <span className="text-gray-400">Chưa chọn</span>
              )}
            </div>
          </div>
        </div>

        <div className="border-t-2 border-yellow-200 dark:border-yellow-800 my-6"></div>

        <div className="flex justify-between items-center text-xl font-extrabold">
          <span className="text-gray-900 dark:text-white">Tổng:</span>
          <span className="text-red-500">{formatPrice(total)}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEO
        title="Đặt vé xem phim | CineBee"
        description="Đặt vé xem phim, chọn rạp, suất chiếu và ghế ngồi nhanh chóng tại CineBee. Trải nghiệm đặt vé tiện lợi và an toàn."
        name="CineBee"
        type="website"
      />

      <div className="min-h-screen w-full bg-gradient-to-br from-[#232946] via-[#1a1a2e] to-[#ffe29f] dark:from-[#181A20] dark:via-[#23263a] dark:to-[#ffe29f] transition-colors duration-700">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8 min-h-screen">
          {/* Main content */}
          <div className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 border-2 border-yellow-200 dark:border-yellow-900">
            <Stepper />
            {renderStep()}
          </div>

          {/* Summary sidebar */}
          <div className="w-full lg:w-80">
            <SummaryCard />
          </div>
        </div>
      </div>
    </>
  );
}
