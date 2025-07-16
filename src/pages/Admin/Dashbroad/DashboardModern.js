import React, { useEffect, useState } from 'react';
import {
  FaUsers,
  FaFilm,
  FaTicketAlt,
  FaDollarSign,
  FaEye,
  FaChartLine,
  FaStar,
  FaArrowUp,
  FaArrowDown,
  FaFireAlt,
  FaCrown,
  FaClock,
  FaHeart,
  FaMapMarkerAlt,
  FaPlay,
  FaGlobeAmericas,
  FaUserCheck,
  FaTrophy,
} from 'react-icons/fa';

const DashboardModern = () => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Trigger animation on mount
    setTimeout(() => setAnimationClass('animate-fadeIn'), 100);
  }, []);

  // Dữ liệu thống kê chính
  const mainStats = [
    {
      title: 'Tổng người dùng',
      value: '1,284',
      trend: 'up',
      trendValue: '↗ 5.2%',
      description: 'So với tháng trước',
      icon: FaUsers,
      gradient: 'from-blue-500 via-blue-600 to-indigo-600',
      shadowColor: 'shadow-blue-500/25',
      progress: 85,
      change: '+67 người mới',
    },
    {
      title: 'Tổng phim',
      value: '467',
      trend: 'up',
      trendValue: '↗ 2.1%',
      description: 'Phim đang chiếu',
      icon: FaFilm,
      gradient: 'from-purple-500 via-purple-600 to-pink-600',
      shadowColor: 'shadow-purple-500/25',
      progress: 78,
      change: '+12 phim mới',
    },
    {
      title: 'Vé đã bán',
      value: '8,902',
      trend: 'up',
      trendValue: '↗ 8.4%',
      description: 'Tuần này',
      icon: FaTicketAlt,
      gradient: 'from-orange-500 via-red-500 to-red-600',
      shadowColor: 'shadow-orange-500/25',
      progress: 92,
      change: '+742 vé hôm nay',
    },
    {
      title: 'Doanh thu',
      value: '15.780.000đ',
      trend: 'up',
      trendValue: '↗ 12.8%',
      description: 'Tháng này',
      icon: FaDollarSign,
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      shadowColor: 'shadow-green-500/25',
      progress: 95,
      change: '+2.1M hôm nay',
    },
  ];

  // Top phim
  const topMovies = [
    {
      rank: 1,
      title: 'Robot Revolution',
      rating: 4.8,
      views: '12.5K',
      revenue: '2.8M',
      image: '🤖',
      trend: 'hot',
      bookings: 892,
      growth: '+15%',
      genre: 'Sci-Fi',
      duration: '128 phút',
    },
    {
      rank: 2,
      title: 'Pandora Adventure',
      rating: 4.6,
      views: '9.2K',
      revenue: '2.1M',
      image: '🌟',
      trend: 'rising',
      bookings: 745,
      growth: '+8%',
      genre: 'Adventure',
      duration: '105 phút',
    },
    {
      rank: 3,
      title: 'Mystic Chronicles',
      rating: 4.4,
      views: '8.1K',
      revenue: '1.9M',
      image: '🎭',
      trend: 'stable',
      bookings: 612,
      growth: '+3%',
      genre: 'Fantasy',
      duration: '142 phút',
    },
    {
      rank: 4,
      title: 'Ocean Depths',
      rating: 4.2,
      views: '7.3K',
      revenue: '1.6M',
      image: '🌊',
      trend: 'rising',
      bookings: 578,
      growth: '+12%',
      genre: 'Drama',
      duration: '115 phút',
    },
  ];

  // Thống kê rạp chiếu
  const theaterPerformance = [
    {
      name: 'CGV Vincom Center',
      occupancy: 89,
      sessions: 24,
      revenue: '4.2M',
      trend: 'up',
      capacity: 320,
      location: 'Hà Nội',
    },
    {
      name: 'Beta Cineplex Mỹ Đình',
      occupancy: 76,
      sessions: 18,
      revenue: '3.1M',
      trend: 'up',
      capacity: 280,
      location: 'Hà Nội',
    },
    {
      name: 'Lotte Cinema Hà Nội',
      occupancy: 82,
      sessions: 20,
      revenue: '3.6M',
      trend: 'down',
      capacity: 300,
      location: 'Hà Nội',
    },
    {
      name: 'Galaxy Cinema Nguyễn Du',
      occupancy: 68,
      sessions: 15,
      revenue: '2.8M',
      trend: 'stable',
      capacity: 250,
      location: 'Hà Nội',
    },
  ];

  // Hoạt động gần đây
  const recentActivities = [
    {
      type: 'booking',
      message: 'Đặt vé mới cho phim "Robot Revolution"',
      time: '2 phút trước',
      icon: FaTicketAlt,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      user: 'Nguyễn Văn A',
      amount: '180,000 VNĐ',
    },
    {
      type: 'review',
      message: 'Đánh giá 5 sao cho "Pandora Adventure"',
      time: '5 phút trước',
      icon: FaStar,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      user: 'Trần Thị B',
      amount: null,
    },
    {
      type: 'user',
      message: 'Người dùng mới đăng ký',
      time: '8 phút trước',
      icon: FaUsers,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      user: 'Lê Văn C',
      amount: null,
    },
    {
      type: 'payment',
      message: 'Thanh toán thành công',
      time: '12 phút trước',
      icon: FaDollarSign,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      user: 'Phạm Thị D',
      amount: '270,000 VNĐ',
    },
    {
      type: 'show',
      message: 'Suất chiếu mới được thêm',
      time: '15 phút trước',
      icon: FaPlay,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      user: 'Admin',
      amount: null,
    },
  ];
  // Component thẻ thống kê
  const StatsCard = ({
    title,
    value,
    trend,
    trendValue,
    description,
    icon: Icon,
    gradient,
    shadowColor,
    progress,
    change,
  }) => (
    <div
      className={`group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl ${shadowColor} transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden ${animationClass}`}
    >
      {/* Background gradient effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-300"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-white/5 to-transparent rounded-full -ml-6 -mb-6"></div>

      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-md group-hover:scale-105 transition-transform duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className={`text-right ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            <div className="text-xs font-bold">{trendValue}</div>
            <div className="text-xs text-gray-500">{description}</div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <h3 className="text-xs font-medium text-gray-600 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
              {value}
            </p>
            <p className="text-xs text-gray-500 mt-1">{change}</p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Mục tiêu</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-1000 ease-out group-hover:animate-pulse`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      {' '}
      <div className="p-6 space-y-6">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mainStats.map((stat, index) => (
            <div key={index} style={{ animationDelay: `${index * 150}ms` }}>
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Movies - Enhanced */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
            {/* Header with gradient */}{' '}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
              </div>
              <div className="relative flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <FaFireAlt className="w-7 h-7 mr-3 text-yellow-300" />
                    Phim Hot Nhất Tuần
                  </h2>
                  <p className="text-blue-100 mt-2">
                    Top phim có lượt đặt vé và doanh thu cao nhất
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 shadow-lg">
                    <FaTrophy className="w-8 h-8 text-yellow-300" />
                  </div>
                  <div className="text-white/80 text-sm">
                    <div className="font-bold">Top {topMovies.length}</div>
                    <div>Bảng xếp hạng</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Movies list */}
            <div className="p-8 space-y-6">
              {topMovies.map((movie, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-r from-gray-50 via-white to-blue-50/30 rounded-2xl p-6 border border-gray-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {/* Rank badge */}
                      <div
                        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg ${
                          movie.rank === 1
                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                            : movie.rank === 2
                            ? 'bg-gradient-to-br from-gray-400 to-gray-600'
                            : movie.rank === 3
                            ? 'bg-gradient-to-br from-amber-600 to-amber-800'
                            : 'bg-gradient-to-br from-blue-500 to-blue-600'
                        }`}
                      >
                        <span>#{movie.rank}</span>
                        {movie.rank === 1 && (
                          <FaCrown className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300" />
                        )}
                      </div>

                      {/* Movie info */}
                      <div className="space-y-3 flex-1">
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {movie.title}
                            </h3>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {movie.genre}
                            </span>
                            <span className="text-xs text-gray-500">{movie.duration}</span>
                          </div>
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-lg">
                              <FaStar className="w-4 h-4 text-yellow-500" />
                              <span className="text-yellow-700 font-medium">{movie.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-lg">
                              <FaEye className="w-4 h-4 text-blue-500" />
                              <span className="text-blue-700 font-medium">{movie.views}</span>
                            </div>
                            <div className="flex items-center space-x-1 bg-green-50 px-3 py-1 rounded-lg">
                              <FaDollarSign className="w-4 h-4 text-green-500" />
                              <span className="text-green-700 font-medium">{movie.revenue}</span>
                            </div>{' '}
                            <div className="flex items-center space-x-1 bg-purple-50 px-3 py-1 rounded-lg">
                              <FaChartLine className="w-4 h-4 text-purple-500" />
                              <span className="text-purple-700 font-medium">{movie.growth}</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress bar for bookings */}
                        <div className="w-full">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>{movie.bookings} lượt đặt vé</span>
                            <span>{Math.round((movie.bookings / 1000) * 100)}% mục tiêu</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                              style={{ width: `${(movie.bookings / 1000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Movie emoji/image */}
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {movie.image}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Theater Performance */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {' '}
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 p-6 relative">
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]"></div>
                </div>
                <div className="relative">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <FaMapMarkerAlt className="w-6 h-6 mr-3" />
                    Hiệu Suất Rạp Chiếu
                  </h2>
                  <p className="text-green-100 text-sm mt-1">Tỷ lệ lấp đầy ghế theo từng rạp</p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {theaterPerformance.map((theater, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-green-50/30 rounded-xl p-4 border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-semibold text-gray-900 text-sm">{theater.name}</span>
                        <div className="text-xs text-gray-500">
                          {theater.location} • {theater.capacity} ghế
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {theater.trend === 'up' ? (
                          <FaArrowUp className="w-3 h-3 text-green-500" />
                        ) : theater.trend === 'down' ? (
                          <FaArrowDown className="w-3 h-3 text-red-500" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                        <span className="text-lg font-bold text-green-600">
                          {theater.occupancy}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 shadow-sm ${
                          theater.occupancy >= 80
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                            : theater.occupancy >= 60
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                            : 'bg-gradient-to-r from-red-400 to-red-500'
                        }`}
                        style={{ width: `${theater.occupancy}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{theater.sessions} suất chiếu</span>
                      <span className="font-medium">{theater.revenue} VNĐ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 p-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <FaClock className="w-6 h-6 mr-3" />
                  Hoạt động gần đây
                </h2>
                <p className="text-indigo-100 text-sm mt-1">Các sự kiện mới nhất trong hệ thống</p>
              </div>

              <div className="p-6 space-y-3 max-h-80 overflow-y-auto">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div
                      className={`w-10 h-10 ${activity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <activity.icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium truncate">
                        {activity.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                        <span>{activity.time}</span>
                        <div className="flex items-center space-x-2">
                          <span>{activity.user}</span>
                          {activity.amount && (
                            <span className="font-medium text-green-600">{activity.amount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              label: 'Đánh giá trung bình',
              value: '4.8/5.0',
              icon: FaStar,
              color: 'from-yellow-400 to-orange-500',
              description: 'Từ 2,847 đánh giá',
            },
            {
              label: 'Tỷ lệ đặt vé thành công',
              value: '96.8%',
              icon: FaUserCheck,
              color: 'from-green-400 to-emerald-500',
              description: 'Tháng này',
            },
            {
              label: 'Khách hàng quay lại',
              value: '78.5%',
              icon: FaHeart,
              color: 'from-pink-400 to-red-500',
              description: 'Trong 30 ngày',
            },
            {
              label: 'Phạm vi phủ sóng',
              value: '24 tỉnh',
              icon: FaGlobeAmericas,
              color: 'from-blue-400 to-indigo-500',
              description: 'Toàn quốc',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:scale-105 transition-transform">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 font-medium">{item.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardModern;
