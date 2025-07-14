// Staff Dashboard - Overview page for cinema staff
import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaUsers, FaDollarSign, FaClock, FaFilm, FaCalendarDay } from 'react-icons/fa';

const StaffDashboard = () => {
  const [todayStats, setTodayStats] = useState({
    ticketsSold: 0,
    revenue: 0,
    customers: 0,
    currentShift: 'Morning',
    moviesShowing: 0,
    nextShowtime: '14:30',
  });

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayStats((prev) => ({
        ...prev,
        ticketsSold: prev.ticketsSold + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 3) * 120000,
        customers: prev.customers + Math.floor(Math.random() * 2),
      }));
    }, 10000);

    // Initial data
    setTodayStats({
      ticketsSold: 45,
      revenue: 5400000,
      customers: 38,
      currentShift: 'Afternoon',
      moviesShowing: 8,
      nextShowtime: '14:30',
    });

    return () => clearInterval(interval);
  }, []);

  const recentSales = [
    {
      id: 1,
      movie: 'Điều Ước Cuối Cùng',
      customer: 'Nguyễn Văn A',
      seats: 'A1, A2',
      amount: 240000,
      time: '13:45',
    },
    {
      id: 2,
      movie: 'Siêu Sao Nguyên Thúy',
      customer: 'Trần Thị B',
      seats: 'B5',
      amount: 120000,
      time: '13:30',
    },
    {
      id: 3,
      movie: 'Điều Ước Cuối Cùng',
      customer: 'Lê Văn C',
      seats: 'C3, C4, C5',
      amount: 360000,
      time: '13:15',
    },
    {
      id: 4,
      movie: 'Robot Revolution',
      customer: 'Phạm Thị D',
      seats: 'D1',
      amount: 120000,
      time: '13:00',
    },
    {
      id: 5,
      movie: 'Siêu Sao Nguyên Thúy',
      customer: 'Hoàng Văn E',
      seats: 'E2, E3',
      amount: 240000,
      time: '12:45',
    },
  ];

  const upcomingShows = [
    { id: 1, movie: 'Điều Ước Cuối Cùng', time: '14:30', theater: 'Theater 1', seats: '45/120' },
    { id: 2, movie: 'Siêu Sao Nguyên Thúy', time: '15:00', theater: 'Theater 2', seats: '32/100' },
    { id: 3, movie: 'Robot Revolution', time: '15:30', theater: 'Theater 3', seats: '67/150' },
    { id: 4, movie: 'Điều Ước Cuối Cùng', time: '16:00', theater: 'Theater 1', seats: '12/120' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Staff Dashboard</h1>
        <p className="text-gray-600">
          Chào mừng bạn quay trở lại! Dưới đây là tổng quan hoạt động hôm nay.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Vé đã bán hôm nay</p>
              <p className="text-3xl font-bold">{todayStats.ticketsSold}</p>
            </div>
            <FaTicketAlt className="text-4xl text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Doanh thu hôm nay</p>
              <p className="text-2xl font-bold">{todayStats.revenue.toLocaleString()}đ</p>
            </div>
            <FaDollarSign className="text-4xl text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Khách hàng</p>
              <p className="text-3xl font-bold">{todayStats.customers}</p>
            </div>
            <FaUsers className="text-4xl text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Ca làm việc</p>
              <p className="text-2xl font-bold">{todayStats.currentShift}</p>
            </div>
            <FaClock className="text-4xl text-orange-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">Phim đang chiếu</p>
              <p className="text-3xl font-bold">{todayStats.moviesShowing}</p>
            </div>
            <FaFilm className="text-4xl text-pink-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">Suất chiếu tiếp theo</p>
              <p className="text-2xl font-bold">{todayStats.nextShowtime}</p>
            </div>
            <FaCalendarDay className="text-4xl text-indigo-200" />
          </div>
        </div>
      </div>

      {/* Recent Sales & Upcoming Shows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Giao dịch gần đây</h2>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{sale.movie}</p>
                  <p className="text-sm text-gray-600">
                    {sale.customer} - Ghế: {sale.seats}
                  </p>
                  <p className="text-xs text-gray-500">{sale.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">{sale.amount.toLocaleString()}đ</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Shows */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Suất chiếu sắp tới</h2>
          <div className="space-y-3">
            {upcomingShows.map((show) => (
              <div
                key={show.id}
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-gray-800">{show.movie}</p>
                  <p className="text-sm text-gray-600">{show.theater}</p>
                  <p className="text-xs text-gray-500">Ghế đã đặt: {show.seats}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600 text-lg">{show.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg transition-colors font-medium">
            Bán vé mới
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg transition-colors font-medium">
            Tra cứu vé
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg transition-colors font-medium">
            Hoàn vé
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg transition-colors font-medium">
            Báo cáo ca
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
