import React, { useEffect, useState, lazy, Suspense } from 'react';
import WeekTabs from './components/WeekdayTabs/WeekTabs';
const TrendingSection = lazy(() => import('./components/Trending/TrendingBadge').then(m => ({ default: m.TrendingSection })));

const Home = () => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Simulate loading, you can replace with actual fetch logic
    const timer = setTimeout(() => {
      // Add a small delay for smooth content transition
      setTimeout(() => setContentVisible(true), 1);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
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
        {/* Trending Section - fixed like banner, no horizontal scroll */}
        <div className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <Suspense fallback={<div className="w-full flex justify-center py-8">Loading trending...</div>}>
            <TrendingSection />
          </Suspense>
        </div>

        {/* Week tabs with enhanced styling */}
        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <WeekTabs />
        </div>

        {/* Additional content sections can be added here */}
        <div className="animate-fade-in-up" style={{ animationDelay: '450ms' }}>
          {/* ...other parts of the home page... */}
        </div>
      </div>
    </div>
  );
};

export default Home;
