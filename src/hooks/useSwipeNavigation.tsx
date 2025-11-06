import { useEffect, useRef, useState } from 'react';

interface UseSwipeNavigationOptions {
  threshold?: number;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export const useSwipeNavigation = (options: UseSwipeNavigationOptions = {}) => {
  const { threshold = 50, onSwipeUp, onSwipeDown } = options;
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const deltaY = touchStartY.current - touchEndY.current;

      // Swipe up (scroll down to next section)
      if (deltaY > threshold && onSwipeUp) {
        onSwipeUp();
      }

      // Swipe down (scroll up to previous section)
      if (deltaY < -threshold && onSwipeDown) {
        onSwipeDown();
      }

      // Reset
      touchStartY.current = 0;
      touchEndY.current = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [threshold, onSwipeUp, onSwipeDown]);
};
