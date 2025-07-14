// Staff Layout - Simple and clean interface for cinema staff
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaTicketAlt,
  FaUsers,
  FaClipboardList,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaClock,
} from 'react-icons/fa';

const StaffLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useSelector((state) => state.auth);

  const navItems = [
    { icon: <FaHome />, label: 'Tổng quan', path: '/staff/dashboard' },
    { icon: <FaTicketAlt />, label: 'Bán vé', path: '/staff/ticket-sales' },
    { icon: <FaClipboardList />, label: 'Đơn hàng', path: '/staff/orders' },
    { icon: <FaUsers />, label: 'Khách hàng', path: '/staff/customers' },
    { icon: <FaClock />, label: 'Ca làm việc', path: '/staff/shifts' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-lg px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src="/CineBee.png" alt="CineBee" className="h-8 w-8" />
          <span className="font-bold text-xl text-blue-600">Staff Panel</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 lg:transition-none`}
        >
          {/* Logo */}
          <div className="hidden lg:flex items-center space-x-3 p-6 border-b border-gray-200">
            <img src="/CineBee.png" alt="CineBee" className="h-10 w-10" />
            <div>
              <span className="font-bold text-xl text-blue-600">Staff Panel</span>
              <p className="text-xs text-gray-500">Nhân viên rạp chiếu</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <FaUserCircle className="text-white text-lg" />
              </div>
              <div>
                <p className="font-medium text-gray-800">{profile?.fullName || 'Staff'}</p>
                <p className="text-xs text-gray-500">Nhân viên</p>
              </div>
            </div>{' '}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
              <FaSignOutAlt />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default StaffLayout;
