import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {
  Autoplay as AutoplayModules,
  EffectFade as EffectFadeModules,
  Pagination as PaginationModules,
} from 'swiper/modules';
import SEO from '../../components/SEO/SEO';
import Banner from './components/Banner';
import WeekTabs from './components/WeekTabs';
SwiperCore.use([AutoplayModules, PaginationModules, EffectFadeModules]);

const TrendingSection = lazy(() =>
  import('./components/TrendingBadge').then((m) => ({ default: m.TrendingSection }))
);

const Home = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const profile = useSelector((state) => state.auth.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.role === 'ADMIN') {
      navigate('/admin/dashboard', { replace: true });
      return;
    }
    // Simulate loading, you can replace with actual fetch logic
    const timer = setTimeout(() => {
      setTimeout(() => setContentVisible(true), 1);
    }, 600);
    AOS.init({ duration: 800, once: true });
    return () => clearTimeout(timer);
  }, [profile, navigate]);

  return (
    <>
      <SEO
        title="CineBee - Trang chủ | Thế giới điện ảnh trong tầm tay"
        description="Khám phá những bộ phim mới nhất, đang thịnh hành, và được đánh giá cao tại CineBee. Đặt vé và xem lịch chiếu một cách dễ dàng."
        name="CineBee"
        type="website"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Banner lớn - carousel phim hot/ưu đãi */}
        <Banner />

        {/* Background pattern for visual interest */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, currentColor 1px, transparent 1px), radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
            }}
          ></div>
        </div>

        {/* Main content with enhanced animations */}
        <div
          className={`relative z-10 transition-all duration-700 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Trending Section - tối ưu UI */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '150ms' }}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Suspense
              fallback={<div className="w-full flex justify-center py-8">Loading trending...</div>}
            >
              <TrendingSection showBookButton />
            </Suspense>
          </div>

          {/* Week tabs with enhanced styling */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '350ms' }}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <WeekTabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
