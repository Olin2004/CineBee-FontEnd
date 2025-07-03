import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useRef, useState } from 'react';

const OptimizedSlider = React.memo(
  ({
    items = [],
    renderItem,
    loading,
    className = '',
    autoPlay = false,
    interval = 5000,
    showDots = true,
    showArrows = true,
    ...props
  }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const autoplayRef = useRef(null);

    // Memoize handlers
    const handleNext = useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const handlePrev = useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    const handleDotClick = useCallback((index) => {
      setCurrentIndex(index);
    }, []);

    const handleDragStart = useCallback(() => {
      setIsDragging(true);
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    }, []);

    const handleDragEnd = useCallback(() => {
      setIsDragging(false);
      if (autoPlay) {
        startAutoplay();
      }
    }, [autoPlay]);

    // Memoize autoplay function
    const startAutoplay = useCallback(() => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
      if (autoPlay) {
        autoplayRef.current = setInterval(handleNext, interval);
      }
    }, [autoPlay, interval, handleNext]);

    // Start autoplay on mount
    React.useEffect(() => {
      startAutoplay();
      return () => {
        if (autoplayRef.current) {
          clearInterval(autoplayRef.current);
        }
      };
    }, [startAutoplay]);

    if (loading || !items.length) return null;

    return (
      <div ref={sliderRef} className={`relative overflow-hidden ${className}`} {...props}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={sliderRef}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="w-full"
          >
            {renderItem(items[currentIndex], currentIndex)}
          </motion.div>
        </AnimatePresence>

        {showArrows && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        {showDots && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

OptimizedSlider.displayName = 'OptimizedSlider';

export default OptimizedSlider;
