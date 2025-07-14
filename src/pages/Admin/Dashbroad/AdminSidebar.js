import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaFilm,
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaBuilding,
  FaTags,
  FaStar,
  FaChartBar,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
  FaChevronDown,
  FaChevronUp,
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

function AdminSidebar({ onCollapseChange }) {
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
      } bg-white text-gray-900 h-screen fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out flex flex-col shadow-lg border-r border-gray-200`}
    >
      {/* Header Clean */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <img src={logo} alt="CineBee" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-900">CineBee</span>
                <div className="text-xs text-gray-500">Admin Portal</div>
              </div>
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <FaChevronRight className="text-gray-600 w-4 h-4" />
            ) : (
              <FaChevronLeft className="text-gray-600 w-4 h-4" />
            )}
          </button>
        </div>

        {/* Admin Profile Clean */}
        {!isCollapsed && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <div className="text-gray-900 font-medium text-sm">Admin Bee</div>
                <div className="text-gray-500 text-xs">Administrator</div>
              </div>
            </div>
          </div>
        )}
      </div>{' '}
      {/* Navigation Basic */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {/* Home Link Basic */}
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-orange-600 transition-colors duration-200 mb-4 border border-gray-100"
        >
          <FaHome className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Về trang chủ</span>}
        </Link>{' '}
        {/* Menu Groups Basic */}
        {menuGroups.map((group, groupIndex) => {
          const isExpanded = expandedGroups.includes(group.id);
          const GroupIcon = group.icon;

          return (
            <div key={group.id} className="mb-2">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                  isExpanded
                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <GroupIcon className="w-5 h-5" />
                  {!isCollapsed && (
                    <div className="text-left">
                      <div className="font-medium text-sm">{group.title}</div>
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
                  className={`mt-2 space-y-1 transition-all duration-300 overflow-hidden ${
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
                        className={`relative flex items-center space-x-3 p-3.5 rounded-xl transition-all duration-300 group overflow-hidden ${
                          active
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl shadow-blue-500/25 border border-blue-400/50 transform translate-x-1'
                            : 'hover:bg-slate-700/40 text-slate-300 hover:text-white border border-transparent hover:border-slate-600/40 hover:shadow-lg hover:translate-x-1'
                        }`}
                        style={{
                          animationDelay: `${itemIndex * 50}ms`,
                        }}
                      >
                        {/* Active Background Effect */}
                        {active && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
                        )}

                        {/* Icon Container */}
                        <div
                          className={`relative p-2 rounded-lg transition-all duration-300 ${
                            active
                              ? 'bg-white/20 shadow-md'
                              : 'bg-slate-600/20 group-hover:bg-blue-500/20'
                          }`}
                        >
                          <Icon
                            className={`w-4 h-4 transition-all duration-300 ${
                              active
                                ? 'text-white drop-shadow-sm'
                                : 'text-slate-400 group-hover:text-blue-300 group-hover:scale-110'
                            }`}
                          />
                        </div>

                        {!isCollapsed && (
                          <div className="flex-1 flex items-center justify-between">
                            <span
                              className={`font-medium transition-all duration-300 ${
                                active ? 'text-white drop-shadow-sm' : 'group-hover:text-white'
                              }`}
                            >
                              {item.label}
                            </span>

                            {/* Badge */}
                            {item.badge && (
                              <span
                                className={`px-2 py-1 text-xs font-bold rounded-full transition-all duration-300 ${
                                  item.badge === 'HOT'
                                    ? 'bg-red-500 text-white animate-pulse'
                                    : item.badge === 'NEW'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Active Indicator */}
                        {active && (
                          <div className="absolute right-3 w-2 h-2 bg-white rounded-full shadow-lg animate-ping"></div>
                        )}

                        {/* Border Effect */}
                        {active && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/60 to-white/20 rounded-r-full"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>{' '}
      {/* Footer với hiệu ứng đẹp */}
      <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-red-600/10 to-rose-600/10 border border-red-500/20 hover:from-red-600/20 hover:to-rose-600/20 hover:border-red-400/40 transition-all duration-300 group"
        >
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg group-hover:shadow-red-500/25">
            <FaSignOutAlt className="text-white w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left">
              <span className="text-red-300 group-hover:text-white font-semibold transition-colors">
                Đăng xuất
              </span>
              <div className="text-xs text-red-500/70 group-hover:text-red-200/70">
                Thoát khỏi hệ thống
              </div>
            </div>
          )}
        </button>

        {/* Version Info */}
        {!isCollapsed && (
          <div className="mt-4 pt-3 border-t border-slate-700/30">
            <div className="text-center">
              <div className="text-xs text-slate-500">CineBee Admin v2.1.0</div>
              <div className="text-xs text-slate-600 mt-1">© 2025 Cinema Management</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;
