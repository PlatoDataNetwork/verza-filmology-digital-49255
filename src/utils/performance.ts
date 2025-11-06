/**
 * Performance monitoring utilities for tracking Web Vitals and page metrics
 */

export const logPerformanceMetrics = () => {
  if (typeof window === 'undefined') return;

  // Log navigation timing
  if (window.performance && window.performance.timing) {
    const timing = window.performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    const firstPaintTime = timing.responseStart - timing.navigationStart;

    console.log('Performance Metrics:', {
      'Page Load Time': `${loadTime}ms`,
      'DOM Ready Time': `${domReadyTime}ms`,
      'First Paint': `${firstPaintTime}ms`,
    });
  }

  // Monitor resource loading
  if (window.performance && window.performance.getEntriesByType) {
    const resources = window.performance.getEntriesByType('resource');
    const images = resources.filter((r: PerformanceEntry) => 
      (r as PerformanceResourceTiming).initiatorType === 'img'
    );
    
    console.log('Resource Loading:', {
      'Total Resources': resources.length,
      'Images Loaded': images.length,
    });
  }
};

/**
 * Report Web Vitals metrics
 */
export const reportWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry);
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    // Not supported in all browsers
  }
};

/**
 * Prefetch resources for faster navigation
 */
export const prefetchResources = (urls: string[]) => {
  if (typeof window === 'undefined') return;

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Detect connection speed
 */
export const getConnectionSpeed = (): string => {
  if (typeof navigator === 'undefined' || !(navigator as any).connection) {
    return 'unknown';
  }
  
  const connection = (navigator as any).connection;
  return connection.effectiveType || 'unknown';
};
