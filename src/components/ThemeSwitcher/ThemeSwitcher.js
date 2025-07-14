'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Remove or fix cn import if utils/cn.js file doesn't exist
// import cn from '@/cuicui/utils/cn';
// If you need cn function (classNames), you can use a simple function like this:
const cn = (...args) => args.filter(Boolean).join(' ');

export const ThemeSwitcherButton = () => {
  const { t } = useTranslation();
  // Use useState correctly for theme
  const [theme, setTheme] = useState('light');

  // Theme change function: set 'dark' class for <html> and save to localStorage (applies to entire system)
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  // When app mounts, always sync 'dark' class on <html> with localStorage (applies to entire system)
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  return (
    <button
      className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-purple-500/20 bg-white px-3 py-2 font-medium text-neutral-600 tracking-tight hover:bg-purple-50 hover:border-purple-400/40 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-purple-900/20 dark:border-purple-400/30 transition-all duration-300"
      onClick={toggleTheme}
      type="button"
    >
      {theme === 'dark' ? (
        // Custom moon SVG with animation effect
        <span className="inline-block w-6 h-6 mr-1 align-middle transition-transform duration-500 group-hover:scale-110 group-active:rotate-12">
          <svg viewBox="-2 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.68 20.0771C15.3295 18.7641 13.0869 15.5674 13.0869 11.9568C13.0869 8.34728 15.3297 5.1507 18.68 3.83774C18.8676 3.76728 19.0359 3.6399 19.1565 3.46112C19.4654 3.00329 19.3447 2.38174 18.8868 2.07286C16.8964 0.72996 14.5451 0 12.0869 0C5.41353 0 0 5.35064 0 11.958C0 18.5644 5.41374 23.9149 12.0869 23.9149C14.5451 23.9149 16.8964 23.1849 18.8868 21.842C19.3447 21.5331 19.4654 20.9116 19.1565 20.4538C19.0359 20.275 18.8676 20.1476 18.68 20.0771z"
              fill="#758CA3"
            ></path>
          </svg>
        </span>
      ) : (
        // Custom sun SVG with animation effect
        <span className="inline-block w-6 h-6 mr-1 align-middle transition-transform duration-500 group-hover:scale-110 group-active:rotate-12">
          <svg
            viewBox="0 0 13.546667 13.546667"
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <rect
                style={{ fill: '#ff4d4f', fillOpacity: 1, stroke: 'none' }}
                height="11.853333"
                rx="5.9266667"
                y="0.84666681"
                x="0.84666669"
                width="11.853333"
              />
              <g transform="matrix(1.3076923,0,0,1.2613202,13.481049,12.376839)">
                <path
                  d="m -0.53033066,30.94105 c 0,6.88299 -5.38190214,12.462757 -12.02081534,12.462757 -6.638912,0 -12.020814,-5.579767 -12.020814,-12.462757 0,-6.882991 5.381902,-12.462758 12.020814,-12.462758 6.6389132,0 12.02081534,5.579767 12.02081534,12.462758 z"
                  style={{ fill: '#fae75d', fillOpacity: 1, stroke: 'none' }}
                />
              </g>
            </g>
          </svg>
        </span>
      )}
      <span className="relative h-6 w-12">
        <span
          className={cn(
            'absolute top-0 left-0 transition-all duration-1000',
            theme === 'light'
              ? '-translate-y-4 opacity-0 blur-lg'
              : 'translate-y-0 opacity-100 blur-0'
          )}
        >
          {t('theme.dark', 'Dark')}
        </span>
        <span
          className={cn(
            'absolute top-0 left-0 transition-all duration-1000',
            theme === 'dark'
              ? 'translate-y-4 opacity-0 blur-lg'
              : 'translate-y-0 opacity-100 blur-0'
          )}
        >
          {t('theme.light', 'Light')}
        </span>
      </span>
    </button>
  );
};

export default ThemeSwitcherButton;
