import React, { useEffect, useState } from 'react';

const SloganBar = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY < 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`w-full bg-white dark:bg-gray-900 py-2 transition-all duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ zIndex: 40 }}
    >
      <div className="max-w-3xl mx-auto w-full overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap text-center">
          <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
            We don't just show movies, we open up a whole world –{' '}
            <span className="text-orange-600 dark:text-orange-400 font-semibold bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 bg-clip-text text-transparent">
              where every story begins and never ends, will automatically redirect to the new domain
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SloganBar;
