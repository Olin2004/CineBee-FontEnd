import React, { useCallback, useMemo, useState } from 'react';

const OptimizedImage = React.memo(
  ({
    src,
    alt = '',
    className = '',
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1lcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TG9hZGluZy4uLjwvdGV4dD48L3N2Zz4=',
    fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWY0NDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1lcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg==',
    loading = 'lazy',
    onLoad,
    onError,
    ...props
  }) => {
    const [imageState, setImageState] = useState('loading');
    const [currentSrc, setCurrentSrc] = useState(placeholder);

    const handleLoad = useCallback(() => {
      setImageState('loaded');
      setCurrentSrc(src);
      onLoad?.();
    }, [src, onLoad]);

    const handleError = useCallback(() => {
      setImageState('error');
      setCurrentSrc(fallback);
      onError?.();
    }, [fallback, onError]);

    const imageClasses = useMemo(() => {
      const baseClasses = 'transition-opacity duration-300';
      const stateClasses = {
        loading: 'opacity-50',
        loaded: 'opacity-100',
        error: 'opacity-75',
      };
      return `${baseClasses} ${stateClasses[imageState]} ${className}`;
    }, [imageState, className]);

    const imageProps = useMemo(
      () => ({
        src: currentSrc,
        alt: alt || '',
        loading,
        className: imageClasses,
        onLoad: handleLoad,
        onError: handleError,
        ...props,
      }),
      [currentSrc, alt, loading, imageClasses, handleLoad, handleError, props]
    );

    return <img {...imageProps} alt={alt || ''} />;
  }
);

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
