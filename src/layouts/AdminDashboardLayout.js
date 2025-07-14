import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FaBell, FaSearch, FaUser, FaCog, FaExpand } from 'react-icons/fa';
import AdminSidebar from '../pages/Admin/Dashbroad/ImprovedAdminSidebar';

const AdminDashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Lấy tên trang hiện tại từ path
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/admin/dashboard': 'Thống kê tổng quan',
      '/admin/analytics': 'Phân tích dữ liệu',
      '/admin/movies': 'Quản lý Phim',
      '/admin/showtimes': 'Lịch chiếu Phim',
      '/admin/theaters': 'Quản lý Rạp',
      '/admin/bookings': 'Quản lý Đặt vé',
      '/admin/promotions': 'Khuyến mãi',
      '/admin/users': 'Quản lý Người dùng',
      '/admin/reviews': 'Đánh giá Phim',
    };
    return titles[path] || 'Admin Dashboard';
  };
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Admin Sidebar */}
      <div className="shrink-0 z-50">
        <AdminSidebar onCollapseChange={setSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ${
          sidebarCollapsed ? 'ml-20' : 'ml-72'
        }`}
      >
        {/* Header hiện đại */}
        <header className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-slate-200/50 px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            {/* Left side - Page title */}
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  {getPageTitle()}
                </h1>
                <p className="text-sm text-slate-500 mt-1">Quản lý hệ thống CineBee</p>
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="pl-10 pr-4 py-2 bg-slate-100/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-sm w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-3 bg-slate-100/50 hover:bg-slate-200/50 rounded-xl transition-all duration-300 group border border-slate-200/50 hover:border-slate-300">
                <FaBell className="text-slate-600 group-hover:text-blue-600 transition-colors" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Settings */}
              <button className="p-3 bg-slate-100/50 hover:bg-slate-200/50 rounded-xl transition-all duration-300 group border border-slate-200/50 hover:border-slate-300">
                <FaCog className="text-slate-600 group-hover:text-blue-600 transition-colors group-hover:rotate-90" />
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-3 bg-slate-100/50 hover:bg-slate-200/50 rounded-xl transition-all duration-300 group border border-slate-200/50 hover:border-slate-300"
              >
                <FaExpand className="text-slate-600 group-hover:text-blue-600 transition-colors" />
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-xl border border-blue-200/50">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-semibold text-slate-700">Admin Bee</div>
                  <div className="text-xs text-slate-500">Administrator</div>
                </div>
              </div>
            </div>
          </div>
        </header>{' '}
        {/* Page Content với hiệu ứng */}
        <main className="flex-1 overflow-auto p-6 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Content wrapper */}
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
