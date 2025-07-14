// Footer.js - Modern, professional footer component
import React from 'react';
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaPlay,
  FaTicketAlt,
  FaStar,
  FaHeart,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../assets/Image/logo/CineBee.png';

const Footer = () => (
  <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -inset-[10px] opacity-30">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[10%] left-[40%] w-96 h-96 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-8">
      {/* Main footer content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Brand section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img src={logo} alt="CineBee" className="h-12 w-auto drop-shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
            </div>{' '}
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
              CineBee
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            Nền tảng đặt vé xem phim hàng đầu Việt Nam. Trải nghiệm điện ảnh đỉnh cao với công nghệ
            hiện đại và dịch vụ tận tâm.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
              <div className="text-purple-400 text-xl font-bold">500K+</div>
              <div className="text-xs text-gray-300">Khách hàng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
              <div className="text-blue-400 text-xl font-bold">50+</div>
              <div className="text-xs text-gray-300">Rạp chiếu</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
              <div className="text-purple-400 text-xl font-bold">1000+</div>
              <div className="text-xs text-gray-300">Phim hay</div>
            </div>
          </div>

          {/* Social media */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kết nối với chúng tôi</h4>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaFacebookF className="text-white text-lg relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaYoutube className="text-white text-lg relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaInstagram className="text-white text-lg relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-400 to-blue-500 p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaTwitter className="text-white text-lg relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-gray-800 to-black p-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <FaTiktok className="text-white text-lg relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white flex items-center">
            <FaPlay className="text-purple-400 mr-2" />
            Dịch vụ
          </h4>
          <ul className="space-y-3">
            {[
              { name: 'Trang chủ', path: '/', icon: <FaHeart /> },
              { name: 'Phim đang chiếu', path: '/movies', icon: <FaPlay /> },
              { name: 'Lịch chiếu', path: '/showtimes', icon: <FaTicketAlt /> },
              { name: 'Rạp chiếu', path: '/cinemas', icon: <FaMapMarkerAlt /> },
              { name: 'Ưu đãi hot', path: '/promotions', icon: <FaStar /> },
              { name: 'Vé của tôi', path: '/my-tickets', icon: <FaTicketAlt /> },
            ].map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="group flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-all duration-300 py-1"
                >
                  <span className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white flex items-center">
            <FaHeadset className="text-pink-400 mr-2" />
            Hỗ trợ
          </h4>
          <ul className="space-y-3">
            {[
              { name: 'Trung tâm trợ giúp', icon: <FaHeadset /> },
              { name: 'Chính sách bảo mật', icon: <FaShieldAlt /> },
              { name: 'Điều khoản sử dụng', icon: <FaShieldAlt /> },
              { name: 'Phương thức thanh toán', icon: <FaCreditCard /> },
              { name: 'Câu hỏi thường gặp', icon: <FaHeadset /> },
              { name: 'Liên hệ hỗ trợ', icon: <FaEnvelope /> },
            ].map((item, index) => (
              <li key={index}>
                <button
                  type="button"
                  className="group flex items-center space-x-3 text-gray-300 hover:text-pink-400 transition-all duration-300 py-1 bg-transparent border-none cursor-pointer w-full text-left"
                >
                  <span className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold text-white flex items-center">
            <FaMapMarkerAlt className="text-purple-400 mr-2" />
            Liên hệ
          </h4>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white text-sm">Địa chỉ</div>
                  <div className="text-gray-300 text-sm">123 Đường Điện Ảnh, Quận 1, TP.HCM</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start space-x-3">
                <FaPhoneAlt className="text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white text-sm">Hotline 24/7</div>
                  <a
                    href="tel:19001234"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors font-bold"
                  >
                    1900 1234
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start space-x-3">
                <FaEnvelope className="text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white text-sm">Email hỗ trợ</div>
                  <a
                    href="mailto:support@cinebee.vn"
                    className="text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    support@cinebee.vn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-white/20 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()}{' '}
              <span className="font-bold bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                CineBee
              </span>{' '}
              - Nền tảng đặt vé xem phim hàng đầu Việt Nam
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Thiết kế bởi CineBee Team • Mọi quyền được bảo lưu
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FaShieldAlt className="text-green-400" />
              <span className="text-green-400 text-sm font-semibold">Bảo mật SSL</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCreditCard className="text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold">Thanh toán an toàn</span>
            </div>
          </div>
        </div>

        {/* Mobile app download section */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 text-sm mb-4">Tải ứng dụng CineBee để trải nghiệm tốt hơn</p>{' '}
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="bg-black hover:bg-gray-800 transition-colors duration-300 px-6 py-3 rounded-xl flex items-center space-x-3"
            >
              <div className="text-white">
                <div className="text-xs">Tải trên</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </button>
            <button
              type="button"
              className="bg-black hover:bg-gray-800 transition-colors duration-300 px-6 py-3 rounded-xl flex items-center space-x-3"
            >
              <div className="text-white">
                <div className="text-xs">Tải trên</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
