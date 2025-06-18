import React, { useState } from 'react';

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
  const [active, setActive] = useState('new');

  const handleClick = (key) => {
    setActive(key);
    if (onChange) onChange(key);
  };

  return (
    <div className="flex gap-3 w-full max-w-[1200px] mx-auto mt-8">
      {days.map((d) => (
        <button
          key={d.key}
          onClick={() => handleClick(d.key)}
          className={`flex flex-col items-center justify-center px-8 py-3 rounded-md font-semibold transition-all duration-200 shadow-md
            ${
              active === d.key
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                : 'bg-[#23232b] text-white hover:bg-[#333]'
            }
          `}
          style={{ minWidth: 140, fontSize: 17 }}
        >
          <span className="text-base font-bold">{d.label}</span>
          <span className="text-sm font-normal">{d.sub}</span>
        </button>
      ))}
    </div>
  );
};

export default WeekTabs;
