import React, { useState } from 'react';
import {
  FaUsers,
  FaFilm,
  FaTicketAlt,
  FaMoneyBillWave,
  FaTheaterMasks,
  FaCalendarAlt,
  FaChartBar,
} from 'react-icons/fa';

const ModernDashboard = () => {
  // Mock data
  const [stats] = useState({
    totalUsers: 1284,
    totalMovies: 467,
    totalTickets: 8902,
    totalRevenue: 15780000,
    revenueGrowth: 12.8,
    ticketGrowth: 8.4,
    userGrowth: 5.2,
  });

  const [mostBookedMovies] = useState([
    {
      id: 1,
      title: 'Robot Revolution',
      bookings: 458,
      revenue: 45800000,
      poster: 'https://image.tmdb.org/t/p/w500/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg',
    },
    {
      id: 2,
      title: 'Pandora Adventure',
      bookings: 389,
      revenue: 38900000,
      poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    },
    {
      id: 3,
      title: 'Mada',
      bookings: 302,
      revenue: 30200000,
      poster: 'https://image.tmdb.org/t/p/w500/4J2QfK1Z8gKTMv1r5zFhQ6FvP1g.jpg',
    },
    {
      id: 4,
      title: 'Survival Race',
      bookings: 275,
      revenue: 27500000,
      poster: 'https://image.tmdb.org/t/p/w500/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg',
    },
  ]);

  const [recentBookings] = useState([
    {
      id: 'B23981',
      user: 'Nguyễn Văn A',
      movie: 'Robot Revolution',
      date: '13/07/2025',
      time: '19:30',
      seats: 'D7, D8',
      amount: 180000,
      status: 'completed',
    },
    {
      id: 'B23982',
      user: 'Trần Thị B',
      movie: 'Pandora Adventure',
      date: '13/07/2025',
      time: '20:00',
      seats: 'F5',
      amount: 90000,
      status: 'pending',
    },
    {
      id: 'B23983',
      user: 'Lê Văn C',
      movie: 'Mada',
      date: '12/07/2025',
      time: '18:15',
      seats: 'C3, C4, C5',
      amount: 270000,
      status: 'completed',
    },
    {
      id: 'B23984',
      user: 'Phạm Thị D',
      movie: 'Survival Race',
      date: '12/07/2025',
      time: '21:30',
      seats: 'H9',
      amount: 90000,
      status: 'cancelled',
    },
    {
      id: 'B23985',
      user: 'Hoàng Văn E',
      movie: 'Robot Revolution',
      date: '11/07/2025',
      time: '15:45',
      seats: 'A10, A11',
      amount: 180000,
      status: 'completed',
    },
  ]);

  const [theaterPerformance] = useState([
    { id: 1, name: 'CGV Vincom Center', bookings: 1240, occupancy: 89 },
    { id: 2, name: 'Beta Cineplex Mỹ Đình', bookings: 980, occupancy: 76 },
    { id: 3, name: 'Lotte Cinema Hà Nội', bookings: 845, occupancy: 72 },
    { id: 4, name: 'Galaxy Cinema Nguyễn Du', bookings: 756, occupancy: 68 },
  ]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const badgeClasses = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };

    const statusLabels = {
      completed: 'Hoàn thành',
      pending: 'Đang xử lý',
      cancelled: 'Đã hủy',
    };

    return (
      <span
        className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeClasses[status]}`}
      >
        {statusLabels[status]}
      </span>
    );
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          icon={<FaUsers className="text-blue-500" />}
          title="Tổng người dùng"
          value={stats.totalUsers.toLocaleString()}
          change={stats.userGrowth}
          iconBg="bg-blue-100"
        />
        <StatsCard
          icon={<FaFilm className="text-purple-500" />}
          title="Tổng phim"
          value={stats.totalMovies.toLocaleString()}
          iconBg="bg-purple-100"
        />
        <StatsCard
          icon={<FaTicketAlt className="text-yellow-500" />}
          title="Vé đã bán"
          value={stats.totalTickets.toLocaleString()}
          change={stats.ticketGrowth}
          iconBg="bg-yellow-100"
        />
        <StatsCard
          icon={<FaMoneyBillWave className="text-green-500" />}
          title="Doanh thu"
          value={formatCurrency(stats.totalRevenue)}
          change={stats.revenueGrowth}
          iconBg="bg-green-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Movies */}
        <div className="bg-white rounded-xl shadow-md p-5 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Phim đặt vé nhiều nhất</h2>
            <button className="text-sm text-yellow-500 hover:text-yellow-600">Xem tất cả</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phim
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lượt đặt
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doanh thu
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mostBookedMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="h-10 w-7 rounded-sm object-cover flex-shrink-0"
                        />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{movie.bookings}</div>
                      <div className="w-32 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-yellow-500 h-1.5 rounded-full"
                          style={{
                            width: `${(movie.bookings / mostBookedMovies[0].bookings) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(movie.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Theater Performance */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Hiệu suất rạp chiếu</h2>
            <FaChartBar className="text-yellow-500" />
          </div>

          <div className="space-y-4">
            {theaterPerformance.map((theater) => (
              <div key={theater.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{theater.name}</span>
                  <span>{theater.occupancy}% ghế</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${theater.occupancy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-6">
        <div className="bg-white rounded-xl shadow-md p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Đặt vé gần đây</h2>
            <button className="text-sm text-yellow-500 hover:text-yellow-600">Xem tất cả</button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đặt
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người đặt
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phim
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày/Giờ
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghế
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thành tiền
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                      {booking.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {booking.user}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {booking.movie}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {booking.date} <span className="text-gray-500">{booking.time}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {booking.seats}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(booking.amount)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <ActionCard
          icon={<FaFilm />}
          title="Thêm phim mới"
          description="Thêm thông tin phim mới vào hệ thống"
          bgColor="bg-blue-500"
          path="/admin/movies/add"
        />
        <ActionCard
          icon={<FaTheaterMasks />}
          title="Quản lý rạp"
          description="Cập nhật thông tin rạp chiếu"
          bgColor="bg-purple-500"
          path="/admin/theaters"
        />
        <ActionCard
          icon={<FaCalendarAlt />}
          title="Lịch chiếu"
          description="Quản lý lịch chiếu phim"
          bgColor="bg-green-500"
          path="/admin/showtimes"
        />
        <ActionCard
          icon={<FaTicketAlt />}
          title="Đặt vé"
          description="Quản lý đặt vé và vé đã bán"
          bgColor="bg-yellow-500"
          path="/admin/bookings"
        />
      </div>
    </>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value, change, iconBg }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-lg">
      <div className="flex items-start">
        <div className={`p-3 rounded-lg ${iconBg}`}>{icon}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-xl font-bold mt-1">{value}</h3>
          {change && (
            <p className={`text-xs mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}
              {change}% so với tháng trước
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// Action Card Component
const ActionCard = ({ icon, title, description, bgColor, path }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={() => (window.location.href = path)}
    >
      <div className={`${bgColor} h-2`}></div>
      <div className="p-5">
        <div
          className={`${bgColor} text-white p-3 w-12 h-12 rounded-lg flex items-center justify-center mb-3`}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-base mb-2">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default ModernDashboard;
