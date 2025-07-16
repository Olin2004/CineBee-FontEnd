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
import { getBannerActive } from '../../services/bannerAPI';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBannerActive();
        const data = Array.isArray(res.data) ? res.data : [];
        const filtered = data.filter((b) => b.active === true);
        setBanners(filtered);
        setTimeout(() => setIsLoading(false), 300);
      } catch (e) {
        setBanners([]);
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-7xl mx-auto pt-4 pb-8 relative"
      >
        <Skeleton height={400} borderRadius={24} count={1} />
      </motion.div>
    );
  }

  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="banner-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-7xl mx-auto pt-4 pb-8 relative"
        data-aos="fade-up"
      >
        {/* Navigation buttons wrapped in React Fragment */}
        <>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 shadow-lg focus:outline-none transition-all duration-300"
            style={{ fontSize: 28 }}
            aria-label="Previous banner"
          >
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.7)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 shadow-lg focus:outline-none transition-all duration-300"
            style={{ fontSize: 28 }}
            aria-label="Next banner"
          >
            <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </motion.button>
        </>

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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-3xl" />
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
                      <h2 className="text-lg md:text-2xl font-extrabold mb-1 drop-shadow-lg bg-gradient-to-r from-purple-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
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
                      <motion.a
                        href={banner.link || '/booking'}
                        whileHover={{ scale: 1.05, boxShadow: '0 4px 20px rgba(255,152,0,0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block px-7 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white font-bold text-lg shadow-xl hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 transition-all duration-300 border-0 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        style={{ opacity: 0.97 }}
                      >
                        {t('banner.book_now')}
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </AnimatePresence>
  );
};

export default Banner;