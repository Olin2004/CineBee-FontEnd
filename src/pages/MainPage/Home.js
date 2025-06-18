import React, { useState, useEffect } from 'react';
import { TrendingSection } from './components/Trending/TrendingBadge';
import WeekTabs from './components/WeekdayTabs/WeekTabs';
import FullScreenLoader from '../../components/Loader/FullScreenLoader';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập loading, bạn có thể thay bằng logic fetch thực tế
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullScreenLoader />;

  return (
    <div className="min-h-screen bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors duration-300">
      {/* Trending Section - cố định như banner, không cuộn ngang */}
      <TrendingSection />
      <WeekTabs />
      {/* ...các phần khác của trang chủ... */}
    </div>
  );
};

export default Home;
