import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const days = [
  { key: 'new', label: 'New', sub: 'Updated' },
  { key: 'mon', label: 'Mon', sub: 'Monday' },
  { key: 'tue', label: 'Tue', sub: 'Tuesday' },
  { key: 'wed', label: 'Wed', sub: 'Wednesday' },
  { key: 'thu', label: 'Thu', sub: 'Thursday' },
  { key: 'fri', label: 'Fri', sub: 'Friday' },
  { key: 'sat', label: 'Sat', sub: 'Saturday' },
  { key: 'sun', label: 'Sun', sub: 'Sunday' },
];

const WeekTabs = ({ onChange }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState('new');

  const handleClick = (key) => {
    setActive(key);
    if (onChange) onChange(key);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-8">
      <div
        className="flex justify-center gap-3 px-2 py-3 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {days.map((d) => (
          <button
            key={d.key}
            onClick={() => handleClick(d.key)}
            className={`flex-shrink-0 flex flex-col items-center justify-center min-w-[110px] w-32 h-20 rounded-xl font-semibold transition-all duration-300 shadow-md text-center
              ${
                active === d.key
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }
            `}
            style={{ fontSize: 18 }}
          >
            <span className="text-lg font-bold">{t(`weektabs.${d.key}.label`, d.label)}</span>
            <span className="text-base font-normal opacity-80">
              {t(`weektabs.${d.key}.sub`, d.sub)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekTabs;