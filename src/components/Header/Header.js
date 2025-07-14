import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBars, FaCalendarAlt, FaFilm, FaHome, FaStar, FaThLarge, FaTimes } from 'react-icons/fa';
import LazyLoad from 'react-lazyload';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Image/logo/CineBee.png';
import { useProfile } from '../../features/auth/useProfile';
import { logoutUser } from '../../services/authAPI';
import { logout } from '../../store/authSlice';
import { SearchBar } from '../Search/Search';
import ThemeSwitcherButton from '../ThemeSwitcher/ThemeSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'vi');
  const profileMenuRef = useRef();
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const { profile, isLoading } = useProfile();

  const navItems = [
    { icon: <FaHome />, label: t('header.home'), to: '/home-cinebee' },
    { icon: <FaCalendarAlt />, label: t('header.showtimes'), to: '/showtimes' },
    { icon: <FaFilm />, label: t('header.movies', 'Phim'), to: '/movies' },
    { icon: <FaThLarge />, label: t('header.cinemas', 'Rạp'), to: '/cinemas' },
    { icon: <FaStar />, label: t('header.promotions', 'Ưu đãi'), to: '/promotions' },
  ];

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

  // Handle scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {}
    dispatch(logout());
    window.location.reload();
  };

  const handleChangeLanguage = () => {
    const newLang = language === 'vi' ? 'en' : 'vi';
    setLanguage(newLang);
    if (typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(newLang);
    } else {
      console.error('i18n.changeLanguage is not a function', i18n);
    }
  };

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full flex flex-col z-50 transition-all duration-300 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 ${
          scrolled
            ? 'fixed top-0 left-0 shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-gray-900/95'
            : 'relative shadow-lg'
        }`}
      >
        {/* Top bar with enhanced styling */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3">
          <motion.div
            className="flex items-center gap-4 group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="transform group-hover:scale-105 transition-transform duration-300">
              <img
                src={logo}
                alt="CineBee"
                className="h-10 w-auto drop-shadow-lg"
                loading="eager"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500 bg-clip-text text-transparent select-none tracking-wide drop-shadow-sm">
              CineBee
            </span>
          </motion.div>
          <div className="flex-1 flex justify-center"></div>
          {/* Mobile menu button with enhanced styling */}
          <div className="flex gap-2 sm:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group"
              onClick={() => setMenuOpen(true)}
            >
              <FaBars className="text-2xl text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
            </motion.button>
          </div>
          {/* Desktop action buttons with enhanced styling */}
          <div className="hidden sm:flex gap-2">
            <ThemeSwitcherButton />
            {/* Nút chuyển đổi ngôn ngữ chỉ hiện 1 cờ, click để đổi */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 flex items-center gap-1 group"
              title={t('header.change_language', 'Đổi ngôn ngữ')}
              onClick={handleChangeLanguage}
            >
              {language === 'vi' ? (
                <>
                  <img
                    src="https://flagcdn.com/w20/vn.png"
                    alt="VI"
                    className="w-5 h-5 rounded shadow"
                    loading="lazy"
                  />
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">VI</span>
                </>
              ) : (
                <>
                  <img
                    src="https://flagcdn.com/w20/gb.png"
                    alt="EN"
                    className="w-5 h-5 rounded shadow"
                    loading="lazy"
                  />
                  <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">EN</span>
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 group"
            >
              <i className="fas fa-sign-out-alt text-xl text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
            </motion.button>
          </div>
        </div>
        {/* Enhanced navigation - Desktop */}
        <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center max-w-7xl mx-auto px-4 hidden sm:flex">
          <div className="flex-1 flex items-center gap-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={item.to}
                  className={`
                    flex items-center gap-2 px-4 py-2
                    rounded-xl border border-purple-500/20 dark:border-purple-400/30
                    bg-slate-800/90 dark:bg-slate-800/90
                    text-white dark:text-gray-200 font-medium
                    hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500
                    hover:text-white hover:shadow-xl hover:shadow-purple-500/30
                    hover:scale-105 active:scale-98
                    transition-all duration-300
                    max-w-[160px] min-w-[100px] text-center
                    group
                    ${
                      location.pathname === item.to
                        ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold shadow-lg shadow-purple-500/30 scale-105'
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
                </Link>
              </motion.div>
            ))}
            {/* Nút Đặt vé nổi bật */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Link
                to="/booking"
                className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-red-500 text-white font-bold shadow-lg hover:from-yellow-500 hover:to-red-600 transition-all duration-300 whitespace-nowrap flex items-center justify-center"
              >
                {t('banner.book_now')}
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <SearchBar />
            {/* Enhanced profile section */}
            {isLoading ? (
              <Skeleton circle height={40} width={40} />
            ) : isAuthenticated && profile ? (
              <div className="relative inline-flex items-center ml-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="focus:outline-none group relative transform transition-all duration-300"
                  onClick={() => setProfileMenuOpen((v) => !v)}
                >
                  <span className="relative block w-10 h-10 rounded-full overflow-hidden">
                    <LazyLoad height={40} once offset={20}>
                      <img
                        src={profile.avatarUrl || '/default-avatar.png'}
                        alt="profile"
                        className="w-full h-full rounded-full object-cover border-2 border-purple-500 shadow-lg group-hover:ring-2 group-hover:ring-purple-400 transition-all duration-300"
                        loading="lazy"
                      />
                    </LazyLoad>
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
                </motion.button>

                {/* Enhanced dropdown menu */}
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      ref={profileMenuRef}
                      className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 p-6 border border-gray-200 dark:border-gray-600 origin-top-right"
                    >
                      <div className="flex flex-col items-center mb-4">
                        <div className="relative group/avatar">
                          <img
                            src={profile.avatarUrl || '/default-avatar.png'}
                            alt="avatar"
                            className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 mb-3 shadow-lg group-hover/avatar:scale-105 transition-transform duration-300"
                            loading="lazy"
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
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 shadow-sm">
                                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 16 16">
                                    <circle cx="8" cy="8" r="8" fill="#a855f7" />
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
                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                          className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 flex items-center gap-3 group"
                        >
                          <span className="material-icons text-purple-500 group-hover:scale-110 transition-transform duration-300">
                            Person
                          </span>
                          <span className="font-medium">Account management</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                          className="w-full text-left py-3 px-4 text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300 flex items-center gap-3 group"
                        >
                          <span className="material-icons text-purple-500 group-hover:scale-110 transition-transform duration-300">
                            Settings
                          </span>
                          <span className="font-medium">Settings</span>
                        </motion.button>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Link
                            to="/my-tickets"
                            className="w-full text-left py-3 px-4 my-2 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center gap-3 group no-underline scale-105 hover:scale-110 border-0 focus:outline-none focus:ring-2 focus:ring-purple-300"
                            onClick={() => setProfileMenuOpen(false)}
                            style={{ fontSize: 18 }}
                          >
                            <span className="inline-block align-middle">
                              <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="3"
                                  y="7"
                                  width="18"
                                  height="10"
                                  rx="2"
                                  fill="white"
                                  fillOpacity="0.15"
                                />
                                <rect
                                  x="3"
                                  y="7"
                                  width="18"
                                  height="10"
                                  rx="2"
                                  stroke="white"
                                  strokeWidth="1.5"
                                />
                                <circle cx="7.5" cy="12" r="1.5" fill="white" />
                                <circle cx="12" cy="12" r="1.5" fill="white" />
                                <circle cx="16.5" cy="12" r="1.5" fill="white" />
                              </svg>
                            </span>
                            <span className="font-bold text-lg drop-shadow">
                              {t('header.my_tickets', 'Lịch sử vé')}
                            </span>
                          </Link>
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                          whileTap={{ scale: 0.98 }}
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
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center ml-2 h-10 px-5 text-sm rounded-2xl border-2 border-green-400 text-green-600 dark:text-green-300 font-medium bg-white/80 dark:bg-gray-900/80 hover:bg-green-50 dark:hover:bg-green-900/40 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-300 whitespace-nowrap"
                  >
                    <i className="fas fa-user-plus mr-2 text-green-400"></i>
                    Sign up
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Link
                    to="/login"
                    className="inline-flex items-center ml-2 h-10 px-5 text-sm rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium border-2 border-purple-400 hover:from-purple-600 hover:to-blue-600 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300 whitespace-nowrap"
                  >
                    <i className="fas fa-sign-in-alt mr-2 text-white"></i>
                    Sign in
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </nav>

        {/* Enhanced mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-4/5 max-w-xs bg-white dark:bg-gray-900 h-full p-6 flex flex-col gap-4 shadow-2xl"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="self-end mb-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaTimes className="text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300" />
                </motion.button>
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                  >
                    <Link
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
                    </Link>
                  </motion.div>
                ))}
                <div className="my-4">
                  <SearchBar />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-3 rounded-xl border-2 border-green-500 text-green-600 dark:text-green-400 font-semibold bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 mb-3 transform hover:scale-105"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold border-2 border-green-500 hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                </motion.div>
              </motion.div>
              <div className="flex-1" onClick={() => setMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      {scrolled && <div style={{ height: headerHeight }} />}
    </>
  );
};

export default Header;
