import React, { useCallback, useMemo } from 'react';
import { withOptimizedAnimation } from './withOptimizedAnimation';

const Header = React.memo(({ title, onMenuClick, onSearchClick, loading, ...props }) => {
  // Memoize handlers
  const handleMenuClick = useCallback(() => {
    if (onMenuClick) {
      onMenuClick();
    }
  }, [onMenuClick]);

  const handleSearchClick = useCallback(() => {
    if (onSearchClick) {
      onSearchClick();
    }
  }, [onSearchClick]);

  // Memoize computed values
  const headerStyle = useMemo(
    () => ({
      height: '64px',
      padding: '0 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...props.style,
    }),
    [props.style]
  );

  if (loading) return null;

  return (
    <header style={headerStyle} className="bg-background shadow-sm">
      <button onClick={handleMenuClick} className="p-2 hover:bg-gray-100 rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <h1 className="text-xl font-semibold">{title}</h1>

      <button onClick={handleSearchClick} className="p-2 hover:bg-gray-100 rounded-full">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </header>
  );
});

Header.displayName = 'Header';

// Animation config
const animationConfig = {
  variants: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  transition: {
    duration: 0.3,
    ease: 'easeOut',
  },
};

export default withOptimizedAnimation(Header, animationConfig);
