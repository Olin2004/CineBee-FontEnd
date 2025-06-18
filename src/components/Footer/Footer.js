// Footer.js - UI component cho footer đẹp, hiện đại, responsive
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#18181c] text-gray-300 border-t border-gray-700 py-6 px-4 w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo và tên */}
        <div className="flex items-center gap-2">
          <img
            src={require('../../assets/Image/logo/CineBee.png')}
            alt="CineBee"
            className="h-8 w-auto"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent select-none tracking-wide">
            CineBee
          </span>
        </div>
        {/* Liên kết mạng xã hội */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a href="mailto:support@cinebee.vn" className="hover:text-green-400 transition">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        {/* Bản quyền và sitemap */}
        <div className="flex flex-col md:flex-row items-center gap-2 text-sm">
          <span>
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-yellow-400">CineBee</span>. All rights reserved.
          </span>
          <a href="/sitemap" className="ml-2 text-green-400 hover:underline">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
