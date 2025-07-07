import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import {
  Autoplay as AutoplayModules,
  EffectFade as EffectFadeModules,
  Pagination as PaginationModules,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getBannerActive } from '../../../services/bannerAPI';

SwiperCore.use([AutoplayModules, PaginationModules, EffectFadeModules]);

const variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.4, ease: 'easeIn' } },
};

const Banner = () => {
  const { t } = useTranslation();
  const [banners, setBanners] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBannerActive();
        // Dữ liệu trả về là mảng các banner, lọc active === true
        const data = Array.isArray(res.data) ? res.data : [];
        const filtered = data.filter((b) => b.active === true);
        setBanners(filtered);
      } catch (e) {
        setBanners([]);
      }
    };
    fetchBanners();
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };
  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto pt-4 pb-8 relative" data-aos="fade-up">
      {/* Nút prev/next */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 shadow-lg focus:outline-none"
        style={{ fontSize: 28 }}
        aria-label="Previous banner"
      >
        {/* SVG chevron left */}
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 shadow-lg focus:outline-none"
        style={{ fontSize: 28 }}
        aria-label="Next banner"
      >
        {/* SVG chevron right */}
        <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        className="rounded-3xl shadow-2xl overflow-hidden"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[220px] md:h-[400px]">
              <motion.img
                src={banner.bannerUrl}
                alt={banner.title}
                className="w-full h-full object-cover object-center rounded-3xl shadow-2xl"
                style={{ display: 'block' }}
                loading="lazy"
                initial={{ scale: 1 }}
                animate={activeIndex === i ? { scale: 1.06 } : { scale: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl" />
              {/* Content on banner */}
              <AnimatePresence mode="wait">
                {activeIndex === i && (
                  <motion.div
                    key={banner.title}
                    className="absolute left-0 right-0 bottom-0 px-6 md:px-12 py-6 flex flex-col items-start md:items-start gap-2 z-10"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                  >
                    <h2 className="text-lg md:text-2xl font-extrabold mb-1 drop-shadow-lg bg-gradient-to-r from-yellow-300 via-pink-400 to-red-500 bg-clip-text text-transparent">
                      {banner.title}
                    </h2>
                    <p
                      className="text-sm md:text-base font-medium mb-3"
                      style={{
                        maxWidth: '80%',
                        color: 'rgba(255, 230, 150, 0.97)',
                        textShadow: '0 2px 8px rgba(0,0,0,0.25), 0 0 8px #FFD700',
                      }}
                    >
                      {banner.description}
                    </p>
                    <a
                      href={banner.link || '/booking'}
                      className="inline-block px-7 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-lg shadow-xl hover:from-yellow-500 hover:to-pink-600 transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                      style={{ opacity: 0.97 }}
                    >
                      {t('banner.book_now')}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
