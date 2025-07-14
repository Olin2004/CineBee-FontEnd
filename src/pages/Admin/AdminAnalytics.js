// Admin Analytics Dashboard - Comprehensive business analytics for cinema administrators
import React, { useState } from 'react';
import {
  FaChartLine,
  FaChartBar,
  FaDownload,
  FaUsers,
  FaTicketAlt,
  FaMoneyBillWave,
  FaFilm,
} from 'react-icons/fa';

const AdminAnalytics = () => {
  const [dateRange, setDateRange] = useState('7days');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 125400000,
      totalTickets: 8450,
      totalCustomers: 3200,
      totalMovies: 24,
    },
    revenueChart: [
      { date: '2024-01-09', revenue: 15200000 },
      { date: '2024-01-10', revenue: 18500000 },
      { date: '2024-01-11', revenue: 22100000 },
      { date: '2024-01-12', revenue: 19800000 },
      { date: '2024-01-13', revenue: 16700000 },
      { date: '2024-01-14', revenue: 21400000 },
      { date: '2024-01-15', revenue: 23800000 },
    ],
    topMovies: [
      { title: 'Spider-Man: No Way Home', revenue: 35400000, tickets: 2140, percentage: 28.2 },
      { title: 'Avatar: The Way of Water', revenue: 28700000, tickets: 1680, percentage: 22.9 },
      { title: 'Top Gun: Maverick', revenue: 22500000, tickets: 1320, percentage: 17.9 },
      { title: 'Jurassic World Dominion', revenue: 18200000, tickets: 1150, percentage: 14.5 },
      { title: 'Doctor Strange 2', revenue: 20600000, tickets: 1160, percentage: 16.5 },
    ],
    hourlyData: [
      { hour: '08:00', tickets: 45 },
      { hour: '10:00', tickets: 120 },
      { hour: '12:00', tickets: 280 },
      { hour: '14:00', tickets: 340 },
      { hour: '16:00', tickets: 420 },
      { hour: '18:00', tickets: 580 },
      { hour: '20:00', tickets: 780 },
      { hour: '22:00', tickets: 650 },
    ],
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-green-100">
              Comprehensive business insights and performance metrics
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 3 months</option>
              <option value="1year">Last year</option>
            </select>
            <button className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg px-4 py-2 flex items-center space-x-2 transition-all duration-200">
              <FaDownload />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaMoneyBillWave className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(analyticsData.overview.totalRevenue)}
              </h3>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-xs text-green-600 font-medium">+12.5% from last period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaTicketAlt className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalTickets.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600">Tickets Sold</p>
              <p className="text-xs text-blue-600 font-medium">+8.3% from last period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaUsers className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalCustomers.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600">Customers</p>
              <p className="text-xs text-purple-600 font-medium">+15.7% from last period</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FaFilm className="text-orange-600 text-xl" />
            </div>
            <div className="ml-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {analyticsData.overview.totalMovies}
              </h3>
              <p className="text-sm text-gray-600">Active Movies</p>
              <p className="text-xs text-orange-600 font-medium">4 new releases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Revenue Trend</h2>
            <div className="flex items-center space-x-2">
              <FaChartLine className="text-green-600" />
              <span className="text-sm text-gray-600">Daily Revenue</span>
            </div>
          </div>

          <div className="space-y-4">
            {analyticsData.revenueChart.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="text-sm text-gray-600 w-20">
                  {new Date(item.date).toLocaleDateString('vi-VN', {
                    weekday: 'short',
                    day: '2-digit',
                  })}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
                      style={{ width: `${(item.revenue / 25000000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 w-24 text-right">
                  {formatCurrency(item.revenue)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Movies */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Top Performing Movies</h2>
            <FaChartBar className="text-blue-600" />
          </div>

          <div className="space-y-4">
            {analyticsData.topMovies.map((movie, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{movie.title}</h3>
                  <span className="text-sm font-bold text-green-600">{movie.percentage}%</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>{formatCurrency(movie.revenue)}</span>
                  <span>{movie.tickets.toLocaleString()} tickets</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                    style={{ width: `${movie.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Sales Pattern */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Hourly Sales Pattern</h2>
          <div className="flex items-center space-x-2">
            <FaChartBar className="text-purple-600" />
            <span className="text-sm text-gray-600">Average tickets per hour</span>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-4">
          {analyticsData.hourlyData.map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-gray-100 rounded-lg h-32 flex items-end p-2 mb-2">
                <div
                  className="bg-gradient-to-t from-purple-500 to-purple-300 rounded w-full"
                  style={{ height: `${(item.tickets / 800) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-600 mb-1">{item.hour}</div>
              <div className="text-sm font-medium text-gray-900">{item.tickets}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Peak Hours</h3>
          <p className="text-blue-700 text-sm mb-3">Highest sales between 18:00 - 22:00</p>
          <div className="text-2xl font-bold text-blue-900">20:00</div>
          <div className="text-sm text-blue-600">Best performing hour</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-bold text-green-900 mb-2">Best Movie Genre</h3>
          <p className="text-green-700 text-sm mb-3">Action movies generate 45% of total revenue</p>
          <div className="text-2xl font-bold text-green-900">Action</div>
          <div className="text-sm text-green-600">Top performing genre</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-bold text-purple-900 mb-2">Customer Satisfaction</h3>
          <p className="text-purple-700 text-sm mb-3">Average rating from customer reviews</p>
          <div className="text-2xl font-bold text-purple-900">4.7/5</div>
          <div className="text-sm text-purple-600">⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
