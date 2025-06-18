import { motion } from 'framer-motion';
import React, { useCallback, useMemo } from 'react';

export const withOptimizedAnimation = (WrappedComponent, animationConfig = {}) => {
  const OptimizedComponent = React.memo(({ loading, ...props }) => {
    // Memoize animation variants
    const variants = useMemo(
      () => ({
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        ...animationConfig.variants,
      }),
      [animationConfig.variants]
    );

    // Memoize transition
    const transition = useMemo(
      () => ({
        duration: 0.3,
        ease: 'easeOut',
        ...animationConfig.transition,
      }),
      [animationConfig.transition]
    );

    // Memoize handlers
    const handleAnimationStart = useCallback(() => {
      if (props.onAnimationStart) {
        props.onAnimationStart();
      }
    }, [props.onAnimationStart]);

    const handleAnimationComplete = useCallback(() => {
      if (props.onAnimationComplete) {
        props.onAnimationComplete();
      }
    }, [props.onAnimationComplete]);

    if (loading) return null;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={transition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
        className={`animate-gpu ${props.className || ''}`}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  });

  OptimizedComponent.displayName = `WithOptimizedAnimation(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return OptimizedComponent;
};

export default withOptimizedAnimation;
