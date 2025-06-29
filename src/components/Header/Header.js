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
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Image/logo/CineBee.png';
import { logout } from '../../store/authSlice';
import { SearchBar } from '../Search/Search';
import ThemeSwitcherButton from '../ThemeSwitcher/ThemeSwitcher';

const navItems = [
  { icon: <FaHome />, label: 'Home', to: '/home-cinebee' },
  { icon: <FaThLarge />, label: 'Genres', to: '#', dropdown: true },
  { icon: <FaFilm />, label: 'Movies', to: '/movies/standalone-movie' },
  { icon: <FaListOl />, label: 'Now Showing', to: '/movies/now-showing' },
  { icon: <FaCalendarAlt />, label: 'Showtimes', to: '/movies/showtimes' },
  { icon: <FaTicketAlt />, label: 'Paid', to: '/movies/completed' },
  { icon: <FaCrown />, label: 'Top 10 3D', to: '/movies/top-10-3d' },
  { icon: <FaStar />, label: 'Highly Rated', to: '/movies/highly-rated/page/1' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const profileMenuRef = useRef();
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated, profile } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  // Close profile menu when clicking outside
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    dispatch(logout());
    window.location.reload();
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full flex flex-col z-50 transition-all duration-300 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${
          scrolled ? 'fixed top-0 left-0 shadow-2xl' : 'relative shadow-lg'
        }`}
      >
        {/* Top bar with enhanced styling */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3">
          <div className="flex items-center gap-4 group">
            <div className="transform group-hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="CineBee" className="h-10 w-auto drop-shadow-lg" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent select-none tracking-wide drop-shadow-sm">
              CineBee
            </span>
          </div>

          <div className="flex-1 flex justify-center"></div>

          {/* Mobile menu button with enhanced styling */}
          <div className="flex gap-2 sm:hidden">
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
            </button>
          </div>

          {/* Desktop action buttons with enhanced styling */}
          <div className="hidden sm:flex gap-2">
            <ThemeSwitcherButton />
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group">
              <i className="fas fa-bookmark text-xl text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group">
              <i className="fas fa-sign-out-alt text-xl text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Enhanced navigation - Desktop */}
        <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center max-w-7xl mx-auto px-4 hidden sm:flex">
          <div className="flex-1 flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`
                  flex items-center gap-2 px-4 py-2
                  rounded-xl border border-gray-700/20 dark:border-gray-200/10
                  bg-gray-900/80 dark:bg-gray-800/80
                  text-white dark:text-gray-200 font-medium
                  hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600
                  hover:text-white hover:shadow-xl hover:shadow-purple-400/30
                  hover:scale-105 active:scale-98
                  transition-all duration-300
                  max-w-[160px] min-w-[100px] text-center
                  group
                  ${
                    location.pathname === item.to
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg scale-105'
                      : ''
                  }
                `}
                style={{ width: '100%' }}
                title={item.label}
              >
                <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
                {item.dropdown && <span className="ml-1 text-xs">&#9660;</span>}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <SearchBar />
            {/* Enhanced profile section */}
            {isAuthenticated && profile ? (
              <div className="relative inline-flex items-center ml-2">
                <button
                  className="focus:outline-none group relative transform hover:scale-105 transition-all duration-300"
                  onClick={() => setProfileMenuOpen((v) => !v)}
                >
                  <span className="relative block w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={profile.avatarUrl || '/default-avatar.png'}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover border-2 border-green-500 shadow-lg group-hover:ring-2 group-hover:ring-green-400 transition-all duration-300"
                    />
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
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

                {/* Enhanced dropdown menu */}
                {profileMenuOpen && (
                  <div
                    ref={profileMenuRef}
                    className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6 border border-gray-200 dark:border-gray-600 origin-top-right animate-profile-fade-slide"
                  >
                    <div className="flex flex-col items-center mb-4">
                      <div className="relative group/avatar">
                        <img
                          src={profile.avatarUrl || '/default-avatar.png'}
                          alt="avatar"
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-500 mb-3 shadow-lg group-hover/avatar:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                        {profile.fullName}
                      </div>
                      <div className="text-xs font-semibold flex items-center gap-1 mb-2">
                        {/* Display account status with color and icon according to status */}
                        {(() => {
                          const status = profile.userStatus;
                          if (status === 'ACTIVE') {
                            return (
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 shadow-sm">
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
                                Active now
                              </span>
                            );
                          } else if (status === 'BANNED') {
                            return (
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 shadow-sm">
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
                                Banned
                              </span>
                            );
                          } else {
                            return (
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 shadow-sm">
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
                                {status || 'Undefined'}
                              </span>
                            );
                          }
                        })()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
                        ID {profile.id} | {profile.email}
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-600">
                      <button className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 flex items-center gap-3 group">
                        <span className="material-icons text-green-500 group-hover:scale-110 transition-transform duration-300">
                          Person
                        </span>
                        <span className="font-medium">Account management</span>
                      </button>
                      <button className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl transition-all duration-300 flex items-center gap-3 group">
                        <span className="material-icons text-green-500 group-hover:scale-110 transition-transform duration-300">
                          Settings
                        </span>
                        <span className="font-medium">Settings</span>
                      </button>
                      <button
                        className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 flex items-center gap-3 group"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        <span className="material-icons text-red-500 group-hover:scale-110 transition-transform duration-300">
                          Logout
                        </span>
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center ml-2 h-10 px-5 text-sm rounded-2xl border-2 border-green-400 text-green-600 dark:text-green-300 font-medium bg-white/80 dark:bg-gray-900/80 hover:bg-green-50 dark:hover:bg-green-900/40 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 whitespace-nowrap"
                >
                  <i className="fas fa-user-plus mr-2 text-green-400"></i>
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center ml-2 h-10 px-5 text-sm rounded-2xl bg-gradient-to-r from-green-400 to-green-600 text-white font-medium border-2 border-green-400 hover:from-green-500 hover:to-green-700 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 whitespace-nowrap"
                >
                  <i className="fas fa-sign-in-alt mr-2 text-white"></i>
                  Sign in
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Enhanced mobile drawer */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex animate-fade-in">
            <div className="w-4/5 max-w-xs bg-white dark:bg-gray-900 h-full p-6 flex flex-col gap-4 animate-slideInLeft shadow-2xl">
              <button
                className="self-end mb-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes className="text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300" />
              </button>
              {navItems.map((item, idx) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 rounded-xl group
                    ${
                      idx === 0
                        ? 'font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg'
                        : 'hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.icon && (
                    <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                  {item.dropdown && (
                    <span className="ml-auto text-xs group-hover:rotate-180 transition-transform duration-300">
                      &#9660;
                    </span>
                  )}
                </Link>
              ))}
              <div className="my-4">
                <SearchBar />
              </div>
              <Link
                to="/register"
                className="block w-full text-center px-4 py-3 rounded-xl border-2 border-green-500 text-green-600 dark:text-green-400 font-semibold bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 mb-3 transform hover:scale-105"
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold border-2 border-green-500 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </Link>
            </div>
            <div className="flex-1" onClick={() => setMenuOpen(false)} />
          </div>
        )}
      </header>
      {scrolled && <div style={{ height: headerHeight }} />}
    </>
  );
};

export default Header;
