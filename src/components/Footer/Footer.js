// Footer.js - UI component for beautiful, modern, responsive footer
import React from 'react';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
} from 'react-icons/fa';
import logo from '../../assets/Image/logo/CineBee.png'; // Đổi đường dẫn logo nếu cần

const Footer = () => (
  <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#18181c] transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#23243a] flex flex-col md:flex-row gap-10 md:gap-20">
        {/* Logo + Slogan */}
        <div className="flex-1 flex flex-col gap-3 min-w-[220px]">
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="CineBee" className="h-12 w-auto drop-shadow-xl" />
            <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent select-none tracking-wide drop-shadow-lg">
              CineBee
            </span>
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-base font-semibold italic max-w-xs">
            Đặt vé xem phim trực tuyến nhanh chóng, tiện lợi, nhiều ưu đãi hấp dẫn tại CineBee!
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
            Trải nghiệm điện ảnh đỉnh cao - Đặt vé chỉ với một chạm!
          </p>
          <div className="flex gap-3 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <span className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full shadow-lg transition">
                <FaFacebookF size={18} className="text-white" />
              </span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <span className="bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-lg transition">
                <FaYoutube size={20} className="text-white" />
              </span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:scale-110"
            >
              <span className="bg-gradient-to-br from-pink-500 to-yellow-400 p-2 rounded-full shadow-lg transition">
                <FaInstagram size={18} className="text-white" />
              </span>
            </a>
          </div>
        </div>

        {/* Liên kết nhanh */}
        <div className="flex-1 min-w-[180px]">
          <h4 className="text-lg font-bold mb-4 text-yellow-500 tracking-wide">Liên kết nhanh</h4>
          <ul className="space-y-2 text-base font-medium">
            <li>
              <a
                href="/home-cinebee"
                className="hover:text-yellow-500 transition text-gray-800 dark:text-gray-200"
              >
                Trang chủ
              </a>
            </li>
            <li>
              <a
                href="/showtimes"
                className="hover:text-yellow-500 transition text-gray-800 dark:text-gray-200"
              >
                Lịch chiếu
              </a>
            </li>
            <li>
              <a
                href="/movies"
                className="hover:text-yellow-500 transition text-gray-800 dark:text-gray-200"
              >
                Phim
              </a>
            </li>
            <li>
              <a
                href="/cinemas"
                className="hover:text-yellow-500 transition text-gray-800 dark:text-gray-200"
              >
                Rạp
              </a>
            </li>
            <li>
              <a
                href="/promotions"
                className="hover:text-yellow-500 transition text-gray-800 dark:text-gray-200"
              >
                Ưu đãi
              </a>
            </li>
            <li>
              <a
                href="/my-tickets"
                className="hover:text-yellow-500 transition text-gray-800 dark:text-gray-200"
              >
                Vé của tôi
              </a>
            </li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div className="flex-1 min-w-[220px]">
          <h4 className="text-lg font-bold mb-4 text-yellow-500 tracking-wide">Liên hệ</h4>
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-3">
              <span className="text-yellow-500">
                <FaMapMarkerAlt />
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                123 Đường Phim, Quận 1, TP.HCM
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-yellow-500">
                <FaPhoneAlt />
              </span>
              <a
                href="tel:19001234"
                className="hover:text-yellow-500 transition font-semibold text-gray-800 dark:text-gray-200"
              >
                1900 1234
              </a>
              <span className="text-xs text-gray-500 dark:text-gray-400">(Hotline)</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-yellow-500">
                <FaEnvelope />
              </span>
              <a
                href="mailto:support@cinebee.vn"
                className="hover:text-yellow-500 transition font-semibold text-gray-800 dark:text-gray-200"
              >
                support@cinebee.vn
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright + Sitemap */}
      <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 bg-transparent">
        <span>
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-yellow-500">CineBee</span>. All rights reserved.
        </span>
        <a href="/sitemap" className="ml-2 text-green-500 hover:underline">
          Sitemap
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
