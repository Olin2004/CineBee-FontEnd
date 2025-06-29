import React, { useEffect, useRef, useState } from 'react';

const CounterUp = ({ end, duration = 1200, className = '', prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    function update() {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        ref.current = requestAnimationFrame(update);
      } else {
        setCount(end);
        cancelAnimationFrame(ref.current);
      }
    }
    ref.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(ref.current);
  }, [end, duration]);

  return (
    <span className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default CounterUp;
