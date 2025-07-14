// Staff Ticket Sales - Interface for selling tickets at cinema
import React, { useState } from 'react';
import { FaTicketAlt, FaPrint } from 'react-icons/fa';

const TicketSales = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const movies = [
    { id: 1, title: 'Điều Ước Cuối Cùng', duration: '120 phút', genre: 'Drama' },
    { id: 2, title: 'Siêu Sao Nguyên Thúy', duration: '105 phút', genre: 'Comedy' },
    { id: 3, title: 'Robot Revolution', duration: '135 phút', genre: 'Action/Sci-Fi' },
    { id: 4, title: 'Gia Đình Siêu Quậy', duration: '95 phút', genre: 'Family/Comedy' },
  ];

  const showtimes = [
    { id: 1, movieId: 1, time: '14:30', theater: 'Theater 1', price: 120000, available: 45 },
    { id: 2, movieId: 1, time: '17:00', theater: 'Theater 1', price: 150000, available: 32 },
    { id: 3, movieId: 1, time: '19:30', theater: 'Theater 2', price: 150000, available: 67 },
    { id: 4, movieId: 2, time: '15:15', theater: 'Theater 3', price: 120000, available: 78 },
    { id: 5, movieId: 2, time: '18:00', theater: 'Theater 3', price: 150000, available: 23 },
    { id: 6, movieId: 3, time: '16:45', theater: 'Theater 2', price: 180000, available: 89 },
    { id: 7, movieId: 3, time: '20:15', theater: 'Theater 1', price: 180000, available: 12 },
  ];

  const seats = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    label: `${String.fromCharCode(65 + Math.floor(i / 10))}${(i % 10) + 1}`,
    sold: Math.random() < 0.3, // Random sold seats
    vip: i >= 20 && i < 40, // VIP seats in middle
  }));

  const getFilteredShowtimes = () => {
    return selectedMovie ? showtimes.filter((show) => show.movieId === selectedMovie) : [];
  };

  const calculateTotal = () => {
    if (!selectedShowtime) return 0;
    const showtime = showtimes.find((s) => s.id === selectedShowtime);
    const basePrice = showtime?.price || 0;
    const vipCount = selectedSeats.filter((seatId) => {
      const seat = seats.find((s) => s.id === seatId);
      return seat?.vip;
    }).length;
    const regularCount = selectedSeats.length - vipCount;

    return regularCount * basePrice + vipCount * basePrice * 1.5;
  };

  const handleSeatClick = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (seat.sold) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handlePrintTicket = () => {
    if (selectedSeats.length === 0) {
      alert('Vui lòng chọn ít nhất một ghế!');
      return;
    }

    alert(`
Vé đã được in thành công!
Phim: ${movies.find((m) => m.id === selectedMovie)?.title}
Suất chiếu: ${showtimes.find((s) => s.id === selectedShowtime)?.time}
Ghế: ${selectedSeats.map((id) => seats.find((s) => s.id === id)?.label).join(', ')}
Tổng tiền: ${calculateTotal().toLocaleString()}đ
    `);

    // Reset form
    setSelectedSeats([]);
    setCustomerInfo({ name: '', phone: '', email: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
          <FaTicketAlt className="mr-3 text-blue-600" />
          Bán vé xem phim
        </h1>
        <p className="text-gray-600">Chọn phim, suất chiếu và ghế để bán vé cho khách hàng</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Movie Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Movies */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">1. Chọn phim</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movies.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => {
                    setSelectedMovie(movie.id);
                    setSelectedShowtime(null);
                    setSelectedSeats([]);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedMovie === movie.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <h3 className="font-bold text-gray-800">{movie.title}</h3>
                  <p className="text-sm text-gray-600">
                    {movie.duration} • {movie.genre}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Showtimes */}
          {selectedMovie && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">2. Chọn suất chiếu</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFilteredShowtimes().map((show) => (
                  <button
                    key={show.id}
                    onClick={() => {
                      setSelectedShowtime(show.id);
                      setSelectedSeats([]);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedShowtime === show.id
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-800">{show.time}</h3>
                        <p className="text-sm text-gray-600">{show.theater}</p>
                        <p className="text-sm text-green-600 font-medium">
                          {show.price.toLocaleString()}đ
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                          {show.available} ghế trống
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Seat Selection */}
          {selectedShowtime && (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">3. Chọn ghế</h2>

              {/* Screen */}
              <div className="text-center mb-6">
                <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-b-lg">
                  MÀN HÌNH
                </div>
              </div>

              {/* Seats Grid */}
              <div className="grid grid-cols-10 gap-2 mb-4">
                {seats.map((seat) => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.sold}
                    className={`aspect-square text-xs font-bold rounded transition-all ${
                      seat.sold
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : selectedSeats.includes(seat.id)
                        ? 'bg-green-500 text-white shadow-lg'
                        : seat.vip
                        ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300 border-2 border-yellow-400'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-300'
                    }`}
                  >
                    {seat.label}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                  <span>Thường</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-200 border-2 border-yellow-400 rounded"></div>
                  <span>VIP (+50%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Đã chọn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-gray-400 rounded"></div>
                  <span>Đã bán</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Thông tin đơn hàng</h2>

            {/* Customer Info */}
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Tên khách hàng"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email (tùy chọn)"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Order Details */}
            <div className="space-y-3 mb-6">
              <div>
                <span className="font-medium text-gray-700">Phim:</span>
                <p className="text-gray-600">
                  {selectedMovie ? movies.find((m) => m.id === selectedMovie)?.title : 'Chưa chọn'}
                </p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Suất chiếu:</span>
                <p className="text-gray-600">
                  {selectedShowtime
                    ? `${showtimes.find((s) => s.id === selectedShowtime)?.time} - ${
                        showtimes.find((s) => s.id === selectedShowtime)?.theater
                      }`
                    : 'Chưa chọn'}
                </p>
              </div>

              <div>
                <span className="font-medium text-gray-700">Ghế đã chọn:</span>
                <p className="text-gray-600">
                  {selectedSeats.length > 0
                    ? selectedSeats.map((id) => seats.find((s) => s.id === id)?.label).join(', ')
                    : 'Chưa chọn'}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Tổng cộng:</span>
                <span className="text-red-600">{calculateTotal().toLocaleString()}đ</span>
              </div>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrintTicket}
              disabled={selectedSeats.length === 0 || !customerInfo.name || !customerInfo.phone}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              <FaPrint />
              <span>In vé & Thanh toán</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSales;
