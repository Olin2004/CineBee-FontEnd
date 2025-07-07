import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaChartBar,
  FaChevronRight,
  FaCog,
  FaCommentDots,
  FaDollarSign,
  FaDoorOpen,
  FaFilm,
  FaPlus,
  FaPowerOff,
  FaRegClock,
  FaTachometerAlt,
  FaTags,
  FaTicketAlt,
  FaUserFriends,
  FaUsers,
  FaUserShield,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import BarHorizontalChart from '../../../components/BarHorizontalChart';
import CounterUp from '../../../components/CounterUp';
import DoughnutChart from '../../../components/DoughnutChart';
import StatisticsLineChart from '../../../components/StatisticsLineChart';
import { logoutUser } from '../../../services/authAPI';
import AdminMovies from './AdminMovies';

// Cấu hình menu động
const sidebarMenus = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <FaTachometerAlt size={22} />,
    path: '/admin/dashboard',
    isActive: true,
  },
  {
    key: 'business',
    label: 'Business',
    type: 'group',
    items: [
      {
        key: 'users',
        label: 'User Management',
        icon: <FaUsers size={22} />,
        path: '/admin/users',
      },
      {
        key: 'movieManagement',
        label: 'Movie Management',
        icon: <FaFilm size={22} />,
        type: 'submenu',
        items: [
          {
            key: 'movieList',
            label: 'Danh sách phim',
            icon: <FaFilm size={18} />,
            path: '#',
            action: 'movie-list',
          },
          {
            key: 'addMovie',
            label: 'Thêm phim mới',
            icon: <FaPlus size={18} />,
            path: '/admin/movies/create',
          },
        ],
      },
      {
        key: 'showtime',
        label: 'Showtime Management',
        icon: <FaRegClock size={22} />,
        path: '/admin/showtimes',
      },
      {
        key: 'theater',
        label: 'Theater Management',
        icon: <FaDoorOpen size={22} />,
        path: '/admin/theaters',
      },
      {
        key: 'booking',
        label: 'Booking Management',
        icon: <FaTicketAlt size={22} />,
        path: '/admin/bookings',
      },
      {
        key: 'review',
        label: 'Review Management',
        icon: <FaCommentDots size={22} />,
        path: '/admin/reviews',
      },
      {
        key: 'promotionManagement',
        label: 'Promotion Management',
        icon: <FaTags size={22} />,
        type: 'submenu',
        items: [
          {
            key: 'promotionList',
            label: 'Danh sách khuyến mãi',
            icon: <FaTags size={18} />,
            path: '/admin/promotions/list',
          },
          {
            key: 'createPromotion',
            label: 'Tạo khuyến mãi',
            icon: <FaPlus size={18} />,
            path: '/admin/promotions/create',
          },
        ],
      },
      {
        key: 'role',
        label: 'Role Management',
        icon: <FaUserShield size={22} />,
        path: '/admin/roles',
      },
    ],
  },
  {
    key: 'system',
    label: 'System',
    type: 'group',
    items: [
      {
        key: 'statistics',
        label: 'Statistics',
        icon: <FaChartBar size={22} />,
        path: '/admin/statistics',
      },
      {
        key: 'settings',
        label: 'Settings',
        icon: <FaCog size={22} />,
        path: '/admin/settings',
      },
    ],
  },
];

const SidebarLink = ({
  icon,
  text,
  to,
  active,
  danger,
  onClick,
  isSelected,
  isSubmenu = false,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to || active;

  return (
    <Link
      to={to}
      onClick={onClick}
      style={{ textDecoration: 'none' }}
      className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 w-full mb-1 group relative overflow-hidden
        ${
          isActive || isSelected
            ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white shadow-2xl border-l-4 border-yellow-400 scale-110 ring-2 ring-yellow-400'
            : 'text-gray-800 hover:bg-yellow-50 hover:scale-102 hover:shadow-md'
        }
        ${danger ? 'text-red-500 hover:bg-red-50' : ''}
        ${isSubmenu ? 'ml-6 text-base' : ''}
      `}
    >
      {/* Highlight effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 transition-opacity duration-300 ${
          isActive || isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
        }`}
      />
      <span
        className={`w-7 h-7 flex items-center justify-center relative z-10 transition-transform duration-300 ${
          isActive || isSelected
            ? 'scale-110 drop-shadow-[0_0_8px_rgba(255,200,0,0.7)]'
            : 'group-hover:scale-110'
        } ${isSubmenu ? 'bg-yellow-50 group-hover:bg-yellow-100 rounded-lg text-yellow-600' : ''}`}
        style={{ fontSize: isSubmenu ? 18 : 22 }}
      >
        {icon}
      </span>
      <span className={`relative z-10 ${isSubmenu ? 'text-sm min-w-[120px]' : 'text-base'}`}>
        {text}
      </span>
      {/* Active indicator */}
      {(isActive || isSelected) && (
        <div className="absolute right-2 w-2 h-2 bg-white rounded-full shadow-lg" />
      )}
    </Link>
  );
};

const SidebarMenu = ({ icon, text, children, isOpen, onToggle, isSelected, hasActiveChild }) => {
  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-lg w-full transition-all duration-300 group relative overflow-hidden
          ${
            isSelected || hasActiveChild
              ? 'bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-500/20 text-yellow-600 border-l-4 border-yellow-400'
              : 'text-gray-800 hover:bg-yellow-50 hover:scale-102'
          }
        `}
        style={{
          textDecoration: 'none',
          background: 'none',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          className={`w-8 h-8 flex items-center justify-center transition-transform duration-300 ${
            isSelected || hasActiveChild ? 'scale-110 text-yellow-600' : 'group-hover:scale-110'
          }`}
        >
          {icon}
        </span>
        <span className="flex-1 text-left">{text}</span>
        <span
          className={`ml-auto flex items-center transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
        >
          <FaChevronRight size={16} className="text-gray-600 group-hover:text-yellow-600" />
        </span>
      </button>

      {/* Submenu with animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-75'
        }`}
        style={{ transformOrigin: 'top' }}
      >
        <div className="pl-6 pt-2 space-y-1">{children}</div>
      </div>
    </div>
  );
};

const handleLogout = async () => {
  try {
    await logoutUser();
  } catch (e) {}
  localStorage.clear();

  window.location.href = '/';
};

const Dashboard = () => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [openMenus, setOpenMenus] = useState(new Set());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Lưu trạng thái sidebar vào localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState) {
      const {
        openMenus: savedOpenMenus,
        selectedMenu: savedSelectedMenu,
        displayContent: savedDisplayContent,
      } = JSON.parse(savedState);
      setOpenMenus(new Set(savedOpenMenus));

      // Khôi phục trạng thái hiển thị nội dung
      if (savedDisplayContent) {
        setSelectedMenu(savedDisplayContent);

        // Tự động mở submenu nếu menu con được chọn
        const findParentMenu = (menus, targetKey) => {
          for (const menu of menus) {
            if (menu.type === 'submenu' && menu.items) {
              if (menu.items.some((item) => item.key === targetKey)) {
                return menu.key;
              }
            }
            if (menu.type === 'group' && menu.items) {
              for (const subMenu of menu.items) {
                if (subMenu.type === 'submenu' && subMenu.items) {
                  if (subMenu.items.some((item) => item.key === targetKey)) {
                    return subMenu.key;
                  }
                }
              }
            }
          }
          return null;
        };

        const parentMenuKey = findParentMenu(sidebarMenus, savedDisplayContent);
        if (parentMenuKey) {
          setOpenMenus((prev) => new Set([...prev, parentMenuKey]));
        }
      } else {
        setSelectedMenu(savedSelectedMenu);
      }
    }
  }, []);

  // Lưu trạng thái khi thay đổi
  useEffect(() => {
    localStorage.setItem(
      'sidebarState',
      JSON.stringify({
        openMenus: Array.from(openMenus),
        selectedMenu,
        displayContent: selectedMenu, // Lưu cả trạng thái hiển thị nội dung
      })
    );
  }, [openMenus, selectedMenu]);

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(menuKey)) {
        newSet.delete(menuKey);
      } else {
        newSet.add(menuKey);
      }
      return newSet;
    });
  };

  const handleMenuClick = (menuKey, action) => {
    setSelectedMenu(menuKey);

    // Tự động mở submenu nếu menu con được chọn
    const findParentMenu = (menus, targetKey) => {
      for (const menu of menus) {
        if (menu.type === 'submenu' && menu.items) {
          if (menu.items.some((item) => item.key === targetKey)) {
            return menu.key;
          }
        }
        if (menu.type === 'group' && menu.items) {
          for (const subMenu of menu.items) {
            if (subMenu.type === 'submenu' && subMenu.items) {
              if (subMenu.items.some((item) => item.key === targetKey)) {
                return subMenu.key;
              }
            }
          }
        }
      }
      return null;
    };

    const parentMenuKey = findParentMenu(sidebarMenus, menuKey);
    if (parentMenuKey && !openMenus.has(parentMenuKey)) {
      setOpenMenus((prev) => new Set([...prev, parentMenuKey]));
    }

    if (action) {
      // Xử lý action đặc biệt
      if (action === 'movie-list') {
        setSelectedMenu('movie-list');
      }
    }
  };

  // Kiểm tra menu có con đang active không
  const hasActiveChild = (menu) => {
    if (!menu.items) return false;
    return menu.items.some(
      (item) => item.path === location.pathname || (item.items && hasActiveChild(item))
    );
  };

  // Render menu item
  const renderMenuItem = (item) => {
    if (item.type === 'group') {
      return (
        <div key={item.key}>
          <div className="mb-2 text-xs font-bold text-gray-400 px-3 uppercase tracking-wider">
            {item.label}
          </div>
          <div className="space-y-1">{item.items.map(renderMenuItem)}</div>
        </div>
      );
    }

    if (item.type === 'submenu') {
      const isOpen = openMenus.has(item.key);
      const isSelected = selectedMenu === item.key;
      const hasActive = hasActiveChild(item);

      return (
        <SidebarMenu
          key={item.key}
          icon={item.icon}
          text={item.label}
          isOpen={isOpen}
          onToggle={() => toggleMenu(item.key)}
          isSelected={isSelected}
          hasActiveChild={hasActive}
        >
          {item.items.map((subItem) => (
            <SidebarLink
              key={subItem.key}
              icon={subItem.icon}
              text={subItem.label}
              to={subItem.path}
              onClick={() => handleMenuClick(subItem.key, subItem.action)}
              isSelected={selectedMenu === subItem.key}
              isSubmenu={true}
            />
          ))}
        </SidebarMenu>
      );
    }

    return (
      <SidebarLink
        key={item.key}
        icon={item.icon}
        text={item.label}
        to={item.path}
        onClick={() => handleMenuClick(item.key, item.action)}
        isSelected={selectedMenu === item.key}
        active={item.isActive}
      />
    );
  };

  const lineLabels = ['Jan 01', 'Jan 02', 'Jan 03', 'Jan 04', 'Jan 05', 'Jan 06'];
  const lineData = [120, 200, 150, 220, 180, 250];

  const recentActivities = [
    { time: '09:00', activity: 'Added new movie', user: 'Admin' },
    { time: '10:15', activity: 'Updated user info', user: 'Admin' },
    { time: '11:30', activity: 'Ticket booked successfully', user: 'User1' },
  ];

  const quickSettings = ['Settings', 'Auto Renew', 'User Management', 'Movie Management'];

  const appVersionLabels = ['v1.2.0', 'v1.1.0', 'v1.0.5', 'v1.0.2', 'v1.0.0'];
  const appVersionData = [123, 53, 23, 3, 1];
  const deviceLabels = ['iOS', 'Android', 'Web', 'Smart TV', 'Others'];
  const deviceData = [30, 40, 20, 5, 5];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`min-h-[100vh] flex flex-col bg-gray-100 transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-80'
        }`}
      >
        <aside
          className={`relative flex flex-col min-h-[100vh] bg-white/70 backdrop-blur-lg shadow-2xl rounded-tr-3xl rounded-br-3xl py-8 px-4 transition-all duration-300 border border-white/30 overflow-y-auto ${
            sidebarCollapsed ? 'w-16' : 'w-80'
          }`}
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
        >
          {/* Logo & Brand */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={require('../../../assets/Image/logo/CineBee.png')}
              alt="CineBee"
              className={`${
                sidebarCollapsed ? 'h-8' : 'h-14'
              } w-auto mb-2 drop-shadow-xl transition-all duration-300`}
            />
            {!sidebarCollapsed && (
              <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
                CineBee
              </span>
            )}
            {/* Toggle button - moved here, no absolute */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="mt-2 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <FaBars size={16} className="text-gray-600" />
            </button>
          </div>

          {/* Menu Navigation */}
          <nav className="flex flex-col gap-1 flex-1 overflow-y-auto hide-scrollbar">
            {sidebarMenus.map(renderMenuItem)}
          </nav>

          {/* User Profile Section */}
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div
              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer group relative transition-all duration-300 hover:bg-gradient-to-r hover:from-red-100 hover:to-yellow-100 hover:shadow-lg hover:scale-105"
              style={{ overflow: 'hidden' }}
            >
              <div className="relative w-10 h-10">
                <img
                  src={require('../../../assets/Image/logo/CineBee.png')}
                  alt="Admin Avatar"
                  className="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <div className="text-base font-bold text-gray-800 group-hover:text-red-500 transition-colors duration-200">
                    Admin
                  </div>
                  <div className="text-xs text-gray-500">Online</div>
                </div>
              )}
              <span className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-60 group-hover:shadow-[0_0_16px_4px_rgba(255,200,0,0.3)] transition-all duration-300" />
            </div>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        {selectedMenu === 'movie-list' ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Movie Management
            </h3>
            <AdminMovies />
          </div>
        ) : (
          <>
            {/* Avatar/Profile góc phải trên */}
            <div className="absolute top-2 right-9 z-20 flex flex-col items-end">
              <button
                onClick={() => setShowProfileMenu((v) => !v)}
                className="rounded-full border-2 border-white shadow-lg w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                title="Profile"
              >
                <FaPowerOff size={20} className="text-white" />
              </button>
              {/* Popover profile menu */}
              {showProfileMenu && (
                <div className="mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 min-w-[120px] flex flex-col items-start animate-fade-in">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-red-500 font-semibold hover:bg-red-50 w-full rounded-lg transition-all duration-200 text-base"
                  >
                    <FaPowerOff size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>
            {/* Header gradient */}
            <div className="w-full bg-gradient-to-r from-cyan-100 via-white to-blue-100 rounded-3xl mb-6 p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-2xl animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-0 tracking-tight drop-shadow-lg">
                Welcome to Cinema Admin Dashboard!
              </h1>
            </div>
            {/* Stat Cards đẹp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[110px]">
                <div className="bg-cyan-100 text-cyan-600 rounded-full p-2 mb-1 group-hover:scale-110 transition-transform shadow-md">
                  <FaUserFriends size={22} />
                </div>
                <h3 className="text-base font-semibold text-gray-500 dark:text-gray-300">
                  Total Users
                </h3>
                <CounterUp
                  end={1234}
                  className="text-xl font-extrabold text-gray-900 dark:text-white"
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[110px]">
                <div className="bg-yellow-100 text-yellow-600 rounded-full p-2 mb-1 group-hover:scale-110 transition-transform shadow-md">
                  <FaFilm size={22} />
                </div>
                <h3 className="text-base font-semibold text-gray-500 dark:text-gray-300">
                  Total Movies
                </h3>
                <CounterUp
                  end={567}
                  className="text-xl font-extrabold text-gray-900 dark:text-white"
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[110px]">
                <div className="bg-green-100 text-green-600 rounded-full p-2 mb-1 group-hover:scale-110 transition-transform shadow-md">
                  <FaDollarSign size={22} />
                </div>
                <h3 className="text-base font-semibold text-gray-500 dark:text-gray-300">
                  Monthly Revenue
                </h3>
                <CounterUp
                  end={15000}
                  className="text-xl font-extrabold text-gray-900 dark:text-white"
                  prefix="$"
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 flex flex-col items-center justify-center gap-2 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[110px]">
                <div className="bg-pink-100 text-pink-600 rounded-full p-2 mb-1 group-hover:scale-110 transition-transform shadow-md">
                  <FaTicketAlt size={22} />
                </div>
                <h3 className="text-base font-semibold text-gray-500 dark:text-gray-300">
                  Today's Tickets
                </h3>
                <CounterUp
                  end={8901}
                  className="text-xl font-extrabold text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Grid hàng 1: Line chart + Bar chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <StatisticsLineChart data={lineData} labels={lineLabels} />
              </div>
              <BarHorizontalChart
                data={appVersionData}
                labels={appVersionLabels}
                title="App Usage by Version"
              />
            </div>
            {/* Grid hàng 2: Device Usage + Quick Settings + Recent Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 items-stretch">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col justify-between min-h-[100px] max-w-xs">
                <DoughnutChart data={deviceData} labels={deviceLabels} title="Device Usage" />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col justify-between min-h-[100px] max-w-xs">
                <h3 className="text-base font-semibold mb-4 text-gray-500 dark:text-gray-300">
                  Quick Settings
                </h3>
                <ul className="space-y-2">
                  {quickSettings.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-700 dark:text-gray-200 text-sm"
                    >
                      <span className="w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-3 flex flex-col justify-between min-h-[100px] max-w-xs">
                <h3 className="text-base font-semibold mb-4 text-gray-500 dark:text-gray-300">
                  Recent Activities
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-gray-400 dark:text-gray-400">
                      <th className="text-left py-1">Time</th>
                      <th className="text-left py-1">Activity</th>
                      <th className="text-left py-1">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((item, idx) => (
                      <tr key={idx} className="border-t border-gray-100 dark:border-gray-700">
                        <td className="py-1">{item.time}</td>
                        <td className="py-1">{item.activity}</td>
                        <td className="py-1">{item.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
