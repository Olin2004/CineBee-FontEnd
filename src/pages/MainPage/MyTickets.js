import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaTicketAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCouch,
  FaStar,
  FaSearch,
  FaFilter,
  FaDownload,
  FaQrcode,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

// Mock data for tickets
const mockTickets = [
  {
    id: 'TK001',
    movieTitle: 'Dune: Hành Tinh Cát',
    moviePoster: 'https://image.tmdb.org/t/p/w500/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg',
    cinema: 'CGV Vincom Bà Triệu',
    cinemaAddress: 'Tầng 12, Vincom Center, Ba Đình, Hà Nội',
    date: '2025-07-15',
    time: '19:30',
    room: 'Phòng IMAX 1',
    seats: ['A5', 'A6'],
    totalPrice: 320000,
    status: 'confirmed',
    bookingDate: '2025-07-10',
    qrCode: 'QR123456789',
    genre: 'Khoa học viễn tưởng',
    duration: 155,
    rating: 8.2,
  },
  {
    id: 'TK002',
    movieTitle: 'Spider-Man: No Way Home',
    moviePoster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    cinema: 'Lotte Cinema Landmark 81',
    cinemaAddress: 'Tầng 5, Landmark 81, Bình Thạnh, TP.HCM',
    date: '2025-07-12',
    time: '16:00',
    room: 'Phòng Premium A',
    seats: ['D8'],
    totalPrice: 180000,
    status: 'used',
    bookingDate: '2025-07-08',
    qrCode: 'QR987654321',
    genre: 'Hành động',
    duration: 148,
    rating: 8.7,
  },
  {
    id: 'TK003',
    movieTitle: 'Black Widow',
    moviePoster: 'https://image.tmdb.org/t/p/w500/qAZ0pzat24kLdO3o8ejmbLxyOac.jpg',
    cinema: 'Galaxy Cinema Nguyễn Du',
    cinemaAddress: '116 Nguyễn Du, Hai Bà Trưng, Hà Nội',
    date: '2025-07-20',
    time: '21:00',
    room: 'Phòng Gold Class',
    seats: ['B3', 'B4', 'B5'],
    totalPrice: 375000,
    status: 'cancelled',
    bookingDate: '2025-07-05',
    qrCode: 'QR555666777',
    genre: 'Hành động',
    duration: 134,
    rating: 7.8,
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const MyTickets = () => {
  const [tickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter tickets based on search and status
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.cinema.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return {
          label: 'Đã xác nhận',
          icon: FaCheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
        };
      case 'used':
        return {
          label: 'Đã sử dụng',
          icon: FaTicketAlt,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-200',
        };
      case 'cancelled':
        return {
          label: 'Đã hủy',
          icon: FaTimesCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
        };
      default:
        return {
          label: 'Chưa xác định',
          icon: FaExclamationTriangle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200',
        };
    }
  };

  const downloadTicket = (ticket) => {
    // Simulate download
    alert(`Đang tải vé ${ticket.id}...`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang tải lịch sử vé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Vé của tôi
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Quản lý và theo dõi lịch sử đặt vé của bạn
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên phim, rạp hoặc mã vé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="used">Đã sử dụng</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Tickets List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {filteredTickets.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <FaTicketAlt className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Không tìm thấy vé nào
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                {searchTerm || filterStatus !== 'all'
                  ? 'Thử thay đổi tiêu chí tìm kiếm hoặc bộ lọc'
                  : 'Bạn chưa đặt vé nào. Hãy đặt vé ngay!'}
              </p>
            </motion.div>
          ) : (
            filteredTickets.map((ticket) => {
              const statusConfig = getStatusConfig(ticket.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={ticket.id}
                  variants={itemVariants}
                  className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl border-2 ${statusConfig.borderColor} overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]`}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Movie Poster */}
                    <div className="lg:w-48 h-64 lg:h-auto relative overflow-hidden">
                      <img
                        src={ticket.moviePoster}
                        alt={ticket.movieTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Status Badge */}
                      <div
                        className={`absolute top-4 right-4 ${statusConfig.bgColor} ${statusConfig.color} px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2`}
                      >
                        <StatusIcon />
                        {statusConfig.label}
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="text-white font-bold text-sm">{ticket.rating}</span>
                      </div>
                    </div>

                    {/* Ticket Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between h-full">
                        <div className="flex-1 mb-4 lg:mb-0">
                          {/* Movie Title */}
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {ticket.movieTitle}
                          </h3>

                          {/* Movie Info */}
                          <div className="flex items-center gap-4 mb-4">
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {ticket.genre}
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {ticket.duration} phút
                            </span>
                          </div>

                          {/* Cinema and Location */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-3">
                              <FaMapMarkerAlt className="text-blue-500 flex-shrink-0" />
                              <div>
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {ticket.cinema}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {ticket.cinemaAddress}
                                </div>
                              </div>
                            </div>

                            {/* Date and Time */}
                            <div className="flex items-center gap-6">
                              <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-green-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {new Date(ticket.date).toLocaleDateString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaClock className="text-orange-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  {ticket.time}
                                </span>
                              </div>
                            </div>

                            {/* Room and Seats */}
                            <div className="flex items-center gap-6">
                              <div className="text-gray-700 dark:text-gray-300">
                                <span className="font-semibold">Phòng:</span> {ticket.room}
                              </div>
                              <div className="flex items-center gap-2">
                                <FaCouch className="text-indigo-500" />
                                <span className="text-gray-700 dark:text-gray-300">
                                  Ghế: {ticket.seats.join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Booking Info */}
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Mã vé: <span className="font-semibold">{ticket.id}</span> • Đặt ngày:{' '}
                            {new Date(ticket.bookingDate).toLocaleDateString('vi-VN')}
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="lg:text-right">
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              Tổng tiền
                            </div>
                            <div className="text-3xl font-bold text-red-600">
                              {ticket.totalPrice.toLocaleString()}đ
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {ticket.seats.length} vé
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex lg:flex-col gap-2">
                            <motion.button
                              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => downloadTicket(ticket)}
                            >
                              <FaDownload className="text-sm" />
                              Tải vé
                            </motion.button>
                            <motion.button
                              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaQrcode className="text-sm" />
                              QR Code
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Summary */}
        {filteredTickets.length > 0 && (
          <motion.div
            className="mt-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Tổng quan
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hiển thị {filteredTickets.length} vé • Tổng giá trị:{' '}
                {filteredTickets
                  .reduce((sum, ticket) => sum + ticket.totalPrice, 0)
                  .toLocaleString()}
                đ
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
