import React, { useEffect } from 'react';
import {
  FaUsers,
  FaFilm,
  FaTicketAlt,
  FaDollarSign,
  FaEye,
  FaChartLine,
  FaStar,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
  FaFireAlt,
  FaPlay,
} from 'react-icons/fa';

const DashboardModern = () => {
  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      // Update time logic can be added here if needed
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Dữ liệu thống kê
  const statsData = [
    {
      title: 'Tổng người dùng',
      value: '1,284',
      trend: 'up',
      trendValue: '5.2%',
      description: 'So với tháng trước',
      icon: FaUsers,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Tổng phim',
      value: '467',
      trend: 'up',
      trendValue: '2.1%',
      description: 'Phim đang chiếu',
      icon: FaFilm,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Vé đã bán',
      value: '8,902',
      trend: 'up',
      trendValue: '8.4%',
      description: 'Tuần này',
      icon: FaTicketAlt,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Doanh thu',
      value: '15.780.000đ',
      trend: 'up',
      trendValue: '12.8%',
      description: 'Tháng này',
      icon: FaDollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  // Dữ liệu phim hot
  const hotMovies = [
    {
      id: 1,
      title: 'Robot Revolution',
      rating: 4.8,
      views: '12.5K',
      revenue: '2.8M',
      image: '🤖',
    },
    {
      id: 2,
      title: 'Pandora Adventure',
      rating: 4.6,
      views: '9.2K',
      revenue: '2.1M',
      image: '🌟',
    },
    {
      id: 3,
      title: 'Mada',
      rating: 4.4,
      views: '8.1K',
      revenue: '1.9M',
      image: '🎭',
    },
  ];

  // Dữ liệu rạp
  const theaterStats = [
    { name: 'CGV Vincom Center', occupancy: 89, color: 'bg-green-500' },
    { name: 'Beta Cineplex Mỹ Đình', occupancy: 76, color: 'bg-blue-500' },
    { name: 'Lotte Cinema Hà Nội', occupancy: 82, color: 'bg-purple-500' },
    { name: 'Galaxy Cinema Nguyễn Du', occupancy: 68, color: 'bg-orange-500' },
  ];

  // Component StatsCard
  const StatsCard = ({
    title,
    value,
    trend,
    trendValue,
    description,
    icon: Icon,
    color,
    bgColor,
    iconColor,
  }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className={`p-3 rounded-xl ${bgColor}`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center space-x-1">
              {trend === 'up' ? (
                <FaArrowUp className="w-3 h-3 text-green-500" />
              ) : (
                <FaArrowDown className="w-3 h-3 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trendValue}
              </span>
              <span className="text-sm text-gray-500">{description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <FaChartLine className="w-5 h-5 text-white" />
              </div>
              Dashboard Quản Trị
            </h1>
            <p className="text-gray-600 mt-1">Tổng quan hoạt động hệ thống CineBee</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FaCalendarAlt className="w-4 h-4" />
              <span>Hoạt động hôm nay: 1,234 lượt</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Phim mới tuần này: 5 phim</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Đánh giá trung bình: 4.8/5.0</span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <FaPlay className="w-4 h-4" />
                <span>Thêm phim mới</span>
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <FaEye className="w-4 h-4" />
                <span>Xem báo cáo</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Quản lý lịch chiếu
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Phim Hot Nhất */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    <FaFireAlt className="w-6 h-6 mr-2" />
                    Phim Hot Nhất
                  </h2>
                  <p className="text-blue-100 mt-1">Top phim có lượt đặt vé cao nhất</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <FaStar className="w-6 h-6 text-yellow-300" />
                </div>
              </div>
              <div className="space-y-4">
                {hotMovies.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{movie.image}</div>
                        <div>
                          <h3 className="font-semibold">{movie.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-blue-100">
                            <span className="flex items-center">
                              <FaStar className="w-3 h-3 mr-1 text-yellow-300" />
                              {movie.rating}
                            </span>
                            <span className="flex items-center">
                              <FaEye className="w-3 h-3 mr-1" />
                              {movie.views}
                            </span>
                            <span className="flex items-center">
                              <FaDollarSign className="w-3 h-3 mr-1" />
                              {movie.revenue}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">#{index + 1}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hiệu Suất Rạp */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold">Hiệu Suất Rạp</h2>
                  <p className="text-green-100 text-sm">Tỷ lệ lấp đầy ghế</p>
                </div>
                <FaEye className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                {theaterStats.map((theater, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{theater.name}</span>
                      <span className="font-bold">{theater.occupancy}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-white rounded-full h-2 transition-all duration-300"
                        style={{ width: `${theater.occupancy}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group">
              <FaFilm className="w-6 h-6 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-blue-700">Thêm Phim</span>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group">
              <FaCalendarAlt className="w-6 h-6 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-purple-700">Lịch Chiếu</span>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors group">
              <FaTicketAlt className="w-6 h-6 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-orange-700">Quản Lý Vé</span>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group">
              <FaChartLine className="w-6 h-6 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-green-700">Báo Cáo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModern;
