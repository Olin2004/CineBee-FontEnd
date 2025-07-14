import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFilm,
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaBuilding,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaChevronDown,
  FaPlay,
  FaClock,
  FaMapMarkerAlt,
  FaTheaterMasks,
  FaGift,
  FaPercentage,
  FaUserTie,
  FaComments,
  FaChartLine,
  FaFileAlt,
  FaCog,
  FaBell,
  FaShieldAlt,
} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/authSlice';
import logo from '../../../assets/Image/logo/CineBee.png';

function ImprovedAdminSidebar({ onCollapseChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(['dashboard', 'movies']); // Mở sẵn một số menu
  const location = useLocation();
  const dispatch = useDispatch();

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    if (onCollapseChange) {
      onCollapseChange(newCollapsed);
    }
  };

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const menuGroups = [
    {
      id: 'dashboard',
      title: 'TỔNG QUAN',
      icon: FaTachometerAlt,
      hasSubmenu: true,
      items: [
        {
          id: 'dashboard-main',
          label: 'Dashboard Chính',
          icon: FaTachometerAlt,
          path: '/admin/dashboard',
        },
        {
          id: 'analytics',
          label: 'Phân tích dữ liệu',
          icon: FaChartLine,
          path: '/admin/analytics',
        },
        {
          id: 'reports',
          label: 'Báo cáo',
          icon: FaFileAlt,
          path: '/admin/reports',
        },
      ],
    },
    {
      id: 'movies',
      title: 'QUẢN LÝ PHIM',
      icon: FaFilm,
      hasSubmenu: true,
      items: [
        {
          id: 'movies-list',
          label: 'Danh sách Phim',
          icon: FaFilm,
          path: '/admin/movies',
        },
        {
          id: 'movies-add',
          label: 'Thêm Phim mới',
          icon: FaPlay,
          path: '/admin/movies/add',
        },
        {
          id: 'categories',
          label: 'Thể loại',
          icon: FaTheaterMasks,
          path: '/admin/categories',
        },
      ],
    },
    {
      id: 'showtimes',
      title: 'LỊCH CHIẾU',
      icon: FaCalendarAlt,
      hasSubmenu: true,
      items: [
        {
          id: 'showtimes-list',
          label: 'Lịch chiếu',
          icon: FaClock,
          path: '/admin/showtimes',
        },
        {
          id: 'theaters',
          label: 'Rạp chiếu',
          icon: FaMapMarkerAlt,
          path: '/admin/theaters',
        },
        {
          id: 'rooms',
          label: 'Phòng chiếu',
          icon: FaBuilding,
          path: '/admin/rooms',
        },
      ],
    },
    {
      id: 'bookings',
      title: 'ĐẶT VÉ & GIAO DỊCH',
      icon: FaTicketAlt,
      hasSubmenu: true,
      items: [
        {
          id: 'bookings-list',
          label: 'Quản lý Đặt vé',
          icon: FaTicketAlt,
          path: '/admin/bookings',
        },
        {
          id: 'promotions',
          label: 'Khuyến mãi',
          icon: FaGift,
          path: '/admin/promotions',
        },
        {
          id: 'coupons',
          label: 'Mã giảm giá',
          icon: FaPercentage,
          path: '/admin/coupons',
        },
      ],
    },
    {
      id: 'users',
      title: 'NGƯỜI DÙNG',
      icon: FaUsers,
      hasSubmenu: true,
      items: [
        {
          id: 'users-list',
          label: 'Danh sách Users',
          icon: FaUsers,
          path: '/admin/users',
        },
        {
          id: 'admins',
          label: 'Quản trị viên',
          icon: FaUserTie,
          path: '/admin/admins',
        },
        {
          id: 'reviews',
          label: 'Đánh giá',
          icon: FaComments,
          path: '/admin/reviews',
        },
      ],
    },
    {
      id: 'system',
      title: 'HỆ THỐNG',
      icon: FaCog,
      hasSubmenu: true,
      items: [
        {
          id: 'settings',
          label: 'Cài đặt',
          icon: FaCog,
          path: '/admin/settings',
        },
        {
          id: 'notifications',
          label: 'Thông báo',
          icon: FaBell,
          path: '/admin/notifications',
        },
        {
          id: 'security',
          label: 'Bảo mật',
          icon: FaShieldAlt,
          path: '/admin/security',
        },
      ],
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-gray-900 text-white h-screen fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-800`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <img src={logo} alt="CineBee" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-semibold text-white">CineBee</span>
                <div className="text-xs text-gray-400">Admin Portal</div>
              </div>
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? (
              <FaChevronRight className="text-gray-400 w-4 h-4" />
            ) : (
              <FaChevronLeft className="text-gray-400 w-4 h-4" />
            )}
          </button>
        </div>

        {/* Admin Profile */}
        {!isCollapsed && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">Admin Bee</div>
                <div className="text-gray-400 text-xs">Administrator</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Home Link */}
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200 mb-4"
        >
          <FaHome className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Về trang chủ</span>}
        </Link>

        {/* Menu Groups */}
        {menuGroups.map((group, groupIndex) => {
          const isExpanded = expandedGroups.includes(group.id);
          const GroupIcon = group.icon;

          return (
            <div key={group.id} className="mb-2">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
              >
                <div className="flex items-center space-x-3">
                  <GroupIcon className="w-5 h-5" />
                  {!isCollapsed && (
                    <div className="text-left">
                      <div className="font-medium text-xs tracking-wide">{group.title}</div>
                    </div>
                  )}
                </div>
                {!isCollapsed && (
                  <div
                    className={`transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    <FaChevronDown className="w-4 h-4" />
                  </div>
                )}
              </button>

              {/* Submenu Items */}
              {(!isCollapsed || isExpanded) && (
                <div
                  className={`mt-1 space-y-1 transition-all duration-300 overflow-hidden ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  } ${isCollapsed ? 'ml-0' : 'ml-4'}`}
                >
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);

                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                          active
                            ? 'bg-white text-gray-900'
                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {!isCollapsed && (
                          <div className="flex-1 flex items-center justify-between">
                            <span className="font-medium text-sm">{item.label}</span>

                            {/* Badge */}
                            {item.badge && (
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  item.badge === 'HOT'
                                    ? 'bg-red-500 text-white'
                                    : item.badge === 'NEW'
                                    ? 'bg-green-500 text-white'
                                    : active
                                    ? 'bg-gray-700 text-white'
                                    : 'bg-gray-700 text-gray-300'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
        >
          <FaSignOutAlt className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Đăng xuất</span>}
        </button>

        {/* Version Info */}
        {!isCollapsed && (
          <div className="mt-4 text-center">
            <div className="text-xs text-gray-500">CineBee Admin v2.1.0</div>
            <div className="text-xs text-gray-600 mt-1">© 2025 Cinema Management</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImprovedAdminSidebar;
