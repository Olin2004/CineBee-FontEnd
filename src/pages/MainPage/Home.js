import React from 'react';
import { TrendingSection } from '../../components/ui/TrendingBadge';
import WeekTabs from '../../components/ui/WeekTabs';

const Home = () => (
  <div className="min-h-screen bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark transition-colors duration-300">
    {/* Trending Section - cố định như banner, không cuộn ngang */}
    <TrendingSection />
    <WeekTabs />
    {/* ...các phần khác của trang chủ... */}
  </div>
);

export default Home;
