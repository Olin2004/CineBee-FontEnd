import React, { useEffect, useRef, useState } from 'react';
import {
  FaBars,
  FaCalendarAlt,
  FaCrown,
  FaFilm,
  FaHome,
  FaListOl,
  FaStar,
  FaThLarge,
  FaTicketAlt,
  FaTimes,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/Image/logo/CineBee.png';
import { logout } from '../../store/authSlice';
import { SearchBar } from '../Search/Search';
import ThemeSwitcherButton from '../ThemeSwitcher/ThemeSwitcher';

const navItems = [
  { icon: <FaHome />, label: 'Home', to: '/' },
  { icon: <FaThLarge />, label: 'Genres', to: '#', dropdown: true },
  { icon: <FaFilm />, label: 'Movies', to: '/phim-le' },
  { icon: <FaListOl />, label: 'Now Showing', to: '/dang-chieu' },
  { icon: <FaCalendarAlt />, label: 'Showtimes', to: '/lich-chieu' },
  { icon: <FaTicketAlt />, label: 'Paid', to: '/hoan-thanh' },
  { icon: <FaCrown />, label: 'Top 10 3D', to: '/top-10' },
  { icon: <FaStar />, label: 'Highly Rated', to: '/danh-gia-cao' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef();
  const dispatch = useDispatch();
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  // Đóng menu profile khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen]);

  return (
    <header className="bg-black w-full shadow flex flex-col z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-2">
        <div className="flex items-center gap-4">
          <img src={logo} alt="CineBee" className="h-10 w-auto" />
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent select-none tracking-wide">
            CineBee
          </span>
        </div>
        <div className="flex-1 flex justify-center"></div>
        <div className="flex gap-2 sm:hidden">
          <button className="p-2 hover:bg-[#23272f] rounded" onClick={() => setMenuOpen(true)}>
            <FaBars className="text-2xl text-gray-300" />
          </button>
        </div>
        <div className="hidden sm:flex gap-2">
          {/* <button className="p-2 hover:bg-[#23272f] rounded">
            <FaSyncAlt className="text-xl text-gray-300" />
          </button> */}
          <ThemeSwitcherButton />
          <button className="p-2 hover:bg-[#23272f] rounded">
            <i className="fas fa-bookmark text-xl text-gray-300" />
          </button>
          <button className="p-2 hover:bg-[#23272f] rounded">
            <i className="fas fa-sign-out-alt text-xl text-gray-300" />
          </button>
        </div>
      </div>
      {/* Banner/notice */}
      <div className="bg-black text-center text-sm py-1 h-7 overflow-x-hidden flex justify-center">
        <div className="max-w-xl w-full mx-auto animate-marquee whitespace-nowrap">
          <span className="text-gray-200">
            Chúng tôi không chỉ chiếu phim, chúng tôi mở ra cả thế giới –{' '}
            <span className="text-yellow-400 font-bold">
              nơi mọi câu chuyện bắt đầu và không bao giờ kết thúc cập sẽ tự chuyển đến tên miền mới
              khi nhà mạng chặn
            </span>
          </span>
        </div>
      </div>
      {/* Navigation - Desktop */}
      <nav className="w-full bg-black border-b border-black items-center px-2 sm:px-8 hidden sm:flex">
        {navItems.map((item, idx) => (
          <Link
            key={item.label}
            to={item.to}
            className={`inline-flex items-center px-4 h-12 text-white font-medium hover:bg-[#333] transition rounded-full mr-2
              ${idx === 0 ? 'font-bold text-white bg-[#23272f]' : 'text-gray-200'}
            `}
            style={{ minWidth: 120 }}
          >
            {item.icon && <span className="mr-2 text-lg">{item.icon}</span>}
            {item.label}
            {item.dropdown && <span className="ml-1 text-xs">&#9660;</span>}
          </Link>
        ))}
        <div className="inline-flex items-center ml-2">
          <SearchBar />
        </div>
        {isAuthenticated && profile ? (
          <div className="relative inline-flex items-center ml-4">
            <button
              className="focus:outline-none group relative"
              onClick={() => setProfileMenuOpen((v) => !v)}
            >
              <span className="relative block">
                <img
                  src={profile.avatarUrl || '/default-avatar.png'}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-green-500 shadow-md group-hover:ring-2 group-hover:ring-green-400 transition"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="#4ade80" />
                    <path
                      d="M3 6.5l2 2 4-4"
                      stroke="#fff"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </button>
            {/* Dropdown menu */}
            {profileMenuOpen && (
              <div
                ref={profileMenuRef}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl z-50 p-4 border border-gray-100 origin-top-right animate-profile-fade-slide"
              >
                <div className="flex flex-col items-center mb-3">
                  <img
                    src={profile.avatarUrl || '/default-avatar.png'}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border-2 border-green-500 object-cover mb-2 shadow"
                  />
                  <div className="font-bold text-lg text-gray-800">{profile.fullName}</div>
                  <div className="text-xs font-semibold flex items-center gap-1 mt-1">
                    {/* Hiển thị trạng thái tài khoản với màu và icon theo status */}
                    {(() => {
                      const status = profile.status;
                      if (status === 'ACTIVE') {
                        return (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-600">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8" fill="#4ade80" />
                              <path
                                d="M5 8.5l2 2 4-4"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Đang hoạt động
                          </span>
                        );
                      } else if (status === 'BANNED') {
                        return (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8" fill="#f87171" />
                              <path
                                d="M5 5l6 6M11 5l-6 6"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            Bị khóa
                          </span>
                        );
                      } else {
                        return (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 16 16">
                              <circle cx="8" cy="8" r="8" fill="#a3a3a3" />
                              <path
                                d="M8 5v3m0 3h.01"
                                stroke="#fff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {status || 'Không xác định'}
                          </span>
                        );
                      }
                    })()}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    ID {profile.id} | {profile.email}
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-green-50 rounded transition flex items-center gap-2">
                    <span className="material-icons text-green-500">Person</span> Quản lý tài khoản
                  </button>
                  <button className="w-full text-left py-2 px-3 text-gray-700 hover:bg-green-50 rounded transition flex items-center gap-2">
                    <span className="material-icons text-green-500">Settings</span> Cài đặt
                  </button>
                  <button
                    className="w-full text-left py-2 px-3 text-gray-700 hover:bg-green-50 rounded transition flex items-center gap-2"
                    onClick={() => {
                      localStorage.removeItem('accessToken');
                      localStorage.removeItem('user');
                      dispatch(logout());
                      window.location.reload();
                    }}
                  >
                    <span className="material-icons text-green-500">Logout</span> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/register"
              className="inline-flex items-center ml-2 px-4 py-2 rounded-full border-2 border-green-500 text-green-600 font-semibold bg-transparent hover:bg-green-50 transition-all duration-200"
            >
              Đăng ký
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center ml-2 px-4 py-2 rounded-full bg-green-500 text-white font-semibold border-2 border-green-500 hover:bg-green-600 transition-all duration-200"
            >
              Đăng nhập
            </Link>
          </>
        )}
      </nav>
      {/* Navigation - Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex">
          <div className="w-4/5 max-w-xs bg-[#18181c] h-full p-6 flex flex-col gap-4 animate-slideInLeft">
            <button className="self-end mb-4" onClick={() => setMenuOpen(false)}>
              <FaTimes className="text-2xl text-gray-300" />
            </button>
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex items-center px-4 py-3 text-white font-medium hover:bg-[#333] transition rounded
                  ${idx === 0 ? 'font-bold text-white bg-[#23272f]' : 'text-gray-200'}
                `}
                onClick={() => setMenuOpen(false)}
              >
                {item.icon && <span className="mr-2 text-lg">{item.icon}</span>}
                {item.label}
                {item.dropdown && <span className="ml-1 text-xs">&#9660;</span>}
              </Link>
            ))}
            <div className="my-2">
              <SearchBar />
            </div>
            <Link
              to="/register"
              className="block w-full text-center px-4 py-2 rounded-full border-2 border-green-500 text-green-600 font-semibold bg-transparent hover:bg-green-50 transition-all duration-200 mb-2"
              onClick={() => setMenuOpen(false)}
            >
              Đăng ký
            </Link>
            <Link
              to="/login"
              className="block w-full text-center px-4 py-2 rounded-full bg-green-500 text-white font-semibold border-2 border-green-500 hover:bg-green-600 transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Đăng nhập
            </Link>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
