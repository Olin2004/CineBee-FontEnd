import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dropdown, Badge, Avatar, Tooltip } from 'antd';
import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUser,
  FaQuestion,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaFilm,
  FaStar,
} from 'react-icons/fa';
import AdminSidebar from '../pages/Admin/Dashbroad/AdminSidebar';
import { useSelector, useDispatch } from 'react-redux';
import SEO from '../components/SEO/SEO';
import { logoutUser } from '../services/authAPI';

const ImprovedAdminDashboardLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: 'Có 5 đặt vé mới',
      time: '5 phút trước',
      unread: true,
      icon: <FaTicketAlt className="text-blue-500" />,
    },
    {
      id: 2,
      text: 'Phim "Robot Revolution" vừa được thêm',
      time: '30 phút trước',
      unread: true,
      icon: <FaFilm className="text-purple-500" />,
    },
    {
      id: 3,
      text: 'Báo cáo doanh thu tháng đã sẵn sàng',
      time: '2 giờ trước',
      unread: false,
      icon: <FaCalendarAlt className="text-green-500" />,
    },
    {
      id: 4,
      text: 'Có 3 đánh giá mới cần duyệt',
      time: '3 giờ trước',
      unread: false,
      icon: <FaStar className="text-yellow-500" />,
    },
    {
      id: 5,
      text: 'Đặt vé B28475 đã bị hủy',
      time: '5 giờ trước',
      unread: false,
      icon: <FaTicketAlt className="text-red-500" />,
    },
  ]);

  const { profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load sidebar state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('adminSidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save sidebar state to localStorage when changed
  useEffect(() => {
    localStorage.setItem('adminSidebarCollapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const notificationCount = notifications.filter((n) => n.unread).length;

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      handleLogout();
    } else if (key === 'profile') {
      navigate('/admin/profile');
    } else if (key === 'settings') {
      navigate('/admin/settings');
    }
  };

  // User dropdown menu
  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <div className="flex items-center px-1">
          <FaUser className="mr-2 text-gray-500" />
          <span>Hồ sơ</span>
        </div>
      ),
    },
    {
      key: 'settings',
      label: (
        <div className="flex items-center px-1">
          <FaCog className="mr-2 text-gray-500" />
          <span>Cài đặt tài khoản</span>
        </div>
      ),
    },
    { type: 'divider' },
    {
      key: 'logout',
      label: (
        <div className="flex items-center px-1 text-red-500">
          <FaSignOutAlt className="mr-2" />
          <span>Đăng xuất</span>
        </div>
      ),
      danger: true,
    },
  ];

  // Notification dropdown content
  const notificationMenu = (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-80">
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-gray-700">Thông báo</h3>
        <button
          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          onClick={markAllNotificationsAsRead}
        >
          Đánh dấu tất cả là đã đọc
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-6 px-4 text-center text-gray-500">Không có thông báo nào</div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  notification.unread ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="mt-1 mr-3">{notification.icon}</div>
                  <div className="flex-1">
                    <p className={`text-sm ${notification.unread ? 'font-medium' : ''}`}>
                      {notification.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </div>
            ))}
            <div className="p-2 text-center border-t border-gray-100">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem tất cả thông báo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <SEO title="Quản trị CineBee" description="Quản lý hệ thống bán vé xem phim CineBee" />

      {/* Sidebar */}
      <AdminSidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center z-30 sticky top-0">
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Left: Search */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            {/* Right: Quick actions */}
            <div className="flex items-center space-x-4">
              {/* Help */}
              <Tooltip title="Trợ giúp">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <FaQuestion />
                </button>
              </Tooltip>

              {/* Notifications */}
              <Dropdown
                overlay={notificationMenu}
                trigger={['click']}
                placement="bottomRight"
                overlayClassName="notification-dropdown"
              >
                <div className="relative">
                  <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                    <FaBell />
                    {notificationCount > 0 && (
                      <Badge
                        count={notificationCount}
                        size="small"
                        className="absolute -top-1 -right-1"
                        style={{ backgroundColor: '#1890ff' }}
                      />
                    )}
                  </button>
                </div>
              </Dropdown>

              {/* Messages */}
              <Tooltip title="Tin nhắn">
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                  <FaEnvelope />
                </button>
              </Tooltip>

              {/* User menu */}
              <Dropdown
                menu={{ items: userMenuItems, onClick: handleMenuClick }}
                trigger={['click']}
                placement="bottomRight"
              >
                <div className="flex items-center cursor-pointer pl-4">
                  <Avatar
                    className="bg-blue-500 cursor-pointer"
                    src={profile?.avatar}
                    size="default"
                    icon={!profile?.avatar && <FaUser />}
                  />
                  <div className="ml-2 hidden md:block">
                    <div className="text-sm font-medium text-gray-700">
                      {profile?.fullName || 'Admin User'}
                    </div>
                    <div className="text-xs text-gray-500">{profile?.role || 'Administrator'}</div>
                  </div>
                </div>
              </Dropdown>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} CineBee. Hệ thống quản lý rạp chiếu phim</p>
        </footer>
      </div>
    </div>
  );
};

export default ImprovedAdminDashboardLayout;
