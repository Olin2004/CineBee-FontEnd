import React, { useState } from 'react';

const tabs = [
  { label: 'New', sub: 'Update' },
  { label: 'Mon', sub: 'Monday' },
  { label: 'Tue', sub: 'Tuesday' },
  { label: 'Wed', sub: 'Wednesday' },
  { label: 'Thu', sub: 'Thursday' },
  { label: 'Fri', sub: 'Friday' },
  { label: 'Sat', sub: 'Saturday' },
  { label: 'Sun', sub: 'Sunday' },
];

const WeekdayTabs = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex w-full gap-2 justify-center mt-6 mb-8">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActive(idx)}
            className={`flex-1 flex flex-col items-center justify-center px-2 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none
              ${
                active === idx
                  ? 'bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-lg'
                  : 'bg-[#23232b] text-white hover:bg-[#2d2d36]'
              }
            `}
          >
            <span className={`text-base ${active === idx ? 'font-bold' : 'font-semibold'}`}>
              {tab.label}
            </span>
            <span
              className={`text-xs ${
                active === idx ? 'font-medium' : 'font-normal'
              } opacity-90 mt-0.5`}
            >
              {tab.sub}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdayTabs;
