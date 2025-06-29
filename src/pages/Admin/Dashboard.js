import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from 'react';
import {
  FaChartBar,
  FaCog,
  FaCommentDots,
  FaDollarSign,
  FaDoorOpen,
  FaFilm,
  FaPowerOff,
  FaRegClock,
  FaTachometerAlt,
  FaTags,
  FaTicketAlt,
  FaUserFriends,
  FaUsers,
  FaUserShield,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import BarHorizontalChart from '../../components/BarHorizontalChart';
import CounterUp from '../../components/CounterUp';
import DoughnutChart from '../../components/DoughnutChart';
import StatisticsLineChart from '../../components/StatisticsLineChart';
import { logoutUser } from '../../services/authAPI';
import { logout } from '../../store/authSlice';
import AdminMovies from './AdminMovies';

const SidebarLink = ({ icon, text, to, active, danger, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 rounded-2xl font-semibold text-lg transition-all duration-200 w-full mb-1
        ${
          isActive || active
            ? 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white shadow-lg scale-105'
            : 'text-gray-800 hover:bg-yellow-50'
        }
        ${danger ? 'text-red-500 hover:bg-red-50' : ''}
      `}
    >
      <span className="w-8 h-8 flex items-center justify-center">{icon}</span>
      <span>{text}</span>
    </Link>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const logoutBtnRef = useRef();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profile = useSelector((state) => state.auth?.profile) || {
    fullName: 'Admin',
    avatarUrl: '',
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    localStorage.clear();
    dispatch(logout());
    window.location.href = '/login';
  };

  const genreStats = [
    { genre: 'Action', count: 12 },
    { genre: 'Drama', count: 8 },
    { genre: 'Sci-fi', count: 5 },
  ];

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
      <div className="h-screen w-64 flex flex-col bg-gray-100">
        <aside className="flex flex-col h-full bg-white shadow-2xl rounded-tr-3xl rounded-br-3xl py-8 px-4 w-64">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={require('../../assets/Image/logo/CineBee.png')}
              alt="CineBee"
              className="h-14 w-auto mb-2 drop-shadow-xl"
            />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent tracking-wide drop-shadow-lg">
              CineBee
            </span>
          </div>
          {/* Menu tổng hợp, chia nhóm bằng heading nhỏ */}
          <nav className="flex flex-col gap-1 flex-1 overflow-y-auto hide-scrollbar">
            <div className="mb-2 text-xs font-bold text-gray-400 px-3">Business</div>
            <SidebarLink icon={<FaUsers size={22} />} text="User Management" to="/admin/users" />
            <SidebarLink icon={<FaFilm size={22} />} text="Movie Management" to="/admin/movies" />
            <SidebarLink
              icon={<FaRegClock size={22} />}
              text="Showtime Management"
              to="/admin/showtimes"
            />
            <SidebarLink
              icon={<FaDoorOpen size={22} />}
              text="Theater Management"
              to="/admin/theaters"
            />
            <SidebarLink
              icon={<FaTicketAlt size={22} />}
              text="Booking Management"
              to="/admin/bookings"
            />
            <SidebarLink
              icon={<FaCommentDots size={22} />}
              text="Review Management"
              to="/admin/reviews"
            />
            <SidebarLink
              icon={<FaTags size={22} />}
              text="Promotion Management"
              to="/admin/promotions"
            />
            <SidebarLink
              icon={<FaUserShield size={22} />}
              text="Role Management"
              to="/admin/roles"
            />
            <div className="mt-4 mb-2 text-xs font-bold text-gray-400 px-3">System</div>
            <SidebarLink
              icon={<FaTachometerAlt size={22} />}
              text="Dashboard"
              to="/admin/dashboard"
              active
            />
            <SidebarLink icon={<FaChartBar size={22} />} text="Statistics" to="/admin/statistics" />
            <SidebarLink icon={<FaCog size={22} />} text="Settings" to="/admin/settings" />
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8 relative">
        {/* Avatar/Profile góc phải trên */}
        <div className="absolute top-2 right-9 z-20 flex flex-col items-end">
          <button
            onClick={() => setShowProfileMenu((v) => !v)}
            className="rounded-full border-2 border-white shadow-lg w-8 h-8 flex items-center justify-center bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            title="Profile"
          >
            <FaPowerOff size={16} className="text-white" />
          </button>
          {/* Popover profile menu */}
          {showProfileMenu && (
            <div className="mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[120px] flex flex-col items-start animate-fade-in">
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 px-3 py-2 text-red-500 font-semibold hover:bg-red-50 w-full rounded-lg transition-all duration-200 text-sm"
              >
                <FaPowerOff size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
        {/* Header gradient */}
        <div className="w-full bg-gradient-to-r from-cyan-100 via-white to-blue-100 rounded-2xl mb-8 p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-0 tracking-tight">
            Welcome to Cinema Admin Dashboard!
          </h1>
        </div>
        {/* Stat Cards đẹp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 flex flex-col items-center justify-center gap-1 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[100px]">
            <div className="bg-cyan-100 text-cyan-600 rounded-full p-1 mb-1 group-hover:scale-110 transition-transform">
              <FaUserFriends size={18} />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300">Total Users</h3>
            <CounterUp
              end={1234}
              className="text-lg font-extrabold text-gray-900 dark:text-white"
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 flex flex-col items-center justify-center gap-1 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[100px]">
            <div className="bg-yellow-100 text-yellow-600 rounded-full p-1 mb-1 group-hover:scale-110 transition-transform">
              <FaFilm size={18} />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300">Total Movies</h3>
            <CounterUp end={567} className="text-lg font-extrabold text-gray-900 dark:text-white" />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 flex flex-col items-center justify-center gap-1 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[100px]">
            <div className="bg-green-100 text-green-600 rounded-full p-1 mb-1 group-hover:scale-110 transition-transform">
              <FaDollarSign size={18} />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300">
              Monthly Revenue
            </h3>
            <CounterUp
              end={15000}
              className="text-lg font-extrabold text-gray-900 dark:text-white"
              prefix="$"
            />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 flex flex-col items-center justify-center gap-1 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-fade-in min-h-[100px]">
            <div className="bg-pink-100 text-pink-600 rounded-full p-1 mb-1 group-hover:scale-110 transition-transform">
              <FaTicketAlt size={18} />
            </div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300">
              Today's Tickets
            </h3>
            <CounterUp
              end={8901}
              className="text-lg font-extrabold text-gray-900 dark:text-white"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <DoughnutChart data={deviceData} labels={deviceLabels} title="Device Usage" />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between min-h-[220px]">
            <h3 className="text-base font-semibold mb-4 text-gray-500 dark:text-gray-300">
              Quick Settings
            </h3>
            <ul className="space-y-2">
              {quickSettings.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <span className="w-2 h-2 bg-blue-400 rounded-full inline-block"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between min-h-[220px]">
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

        {/* Movie Management */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Movie Management
          </h3>
          <AdminMovies />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
