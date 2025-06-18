import { useCallback, useEffect, useRef } from 'react';

export const usePerformance = (componentName) => {
  const startTime = useRef(performance.now());
  const renderCount = useRef(0);

  // Track render count
  useEffect(() => {
    renderCount.current += 1;
  });

  // Measure render time
  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render #${renderCount.current}: ${renderTime.toFixed(2)}ms`);
    }

    startTime.current = performance.now();
  });

  // Track memory usage (if available)
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = performance.memory;
      return {
        used: Math.round((memory.usedJSHeapSize / 1048576) * 100) / 100,
        total: Math.round((memory.totalJSHeapSize / 1048576) * 100) / 100,
        limit: Math.round((memory.jsHeapSizeLimit / 1048576) * 100) / 100,
      };
    }
    return null;
  }, []);

  // Track long tasks
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Tasks longer than 50ms
            console.warn('Long task detected:', {
              duration: entry.duration,
              startTime: entry.startTime,
              name: entry.name,
            });
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
      return () => observer.disconnect();
    }
  }, []);

  return {
    renderCount: renderCount.current,
    getMemoryUsage,
  };
};
