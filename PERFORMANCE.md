# Performance Optimization Guide

This document outlines the performance optimizations implemented in the VERZA TV application.

## Lazy Loading Implementation

### Component-Level Lazy Loading

Below-the-fold components are lazily loaded using React's `lazy()` and `Suspense` to reduce initial bundle size:

**Lazily Loaded Components:**
- `Opportunity` - Market opportunity section
- `Solution` - Why we win section  
- `Content` - Content strategy section
- `Founder` - Founder bio section

**Eagerly Loaded Components:**
- `Header` - Navigation (above fold)
- `Hero` - Hero section (above fold)
- `Contact` - Contact form
- `Footer` - Footer section

### Image Lazy Loading

All images below the fold use native lazy loading:
- Header logo in mobile menu: `loading="lazy"`
- Footer logo: `loading="lazy"`
- Hero logo: `loading="eager"` + `fetchPriority="high"` (critical above-fold content)

### Custom Lazy Loading Utilities

**`useLazyImage` Hook:**
Uses Intersection Observer API to load images when they enter the viewport with configurable root margin.

**`LazyImage` Component:**
Wrapper component for images with fade-in transitions when loaded.

**`LazySection` Component:**
Generic lazy loading wrapper for any content sections with Intersection Observer.

## Code Splitting

### Manual Chunks (vite.config.ts)

Optimized bundle splitting strategy:
- `react-vendor`: Core React libraries (react, react-dom, react-router-dom)
- `ui-components`: Heavy Radix UI components

This ensures:
- Better caching (vendor code changes less frequently)
- Faster initial load (smaller main bundle)
- Improved Time to Interactive (TTI)

## Build Optimizations

### Vite Configuration
- SWC for faster builds and HMR
- Manual chunk splitting for optimal caching
- Chunk size warning limit: 1000kb

## Resource Hints

### Preload Critical Assets
```html
<link rel="preload" as="image" href="/src/assets/verza-logo.png" fetchpriority="high">
```

### Preconnect to External Resources
- Google Fonts (preconnect + dns-prefetch)

## Mobile Optimizations

### Touch Performance
- `touch-action: manipulation` - Removes 300ms tap delay
- `-webkit-tap-highlight-color: transparent` - Removes tap flash on iOS

### Viewport Configuration
- `viewport-fit=cover` - Safe area support for notched devices
- `maximum-scale=5.0` - Allows zoom for accessibility

## Performance Metrics to Monitor

**Core Web Vitals:**
- LCP (Largest Contentful Paint): Target < 2.5s
- FID (First Input Delay): Target < 100ms  
- CLS (Cumulative Layout Shift): Target < 0.1

**Loading Performance:**
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Time to Interactive (TTI)

## Best Practices

1. **Above the Fold**: Keep critical content (Hero, Header) eager loaded
2. **Progressive Enhancement**: Use skeleton loaders for lazy content
3. **Image Optimization**: Always specify width/height to prevent CLS
4. **Font Loading**: Use `font-display: swap` in Google Fonts
5. **Code Splitting**: Lazy load routes and heavy components

## Future Optimizations

- [ ] Implement service worker for offline support
- [ ] Add image CDN with automatic WebP conversion
- [ ] Implement route-based code splitting
- [ ] Add performance monitoring (Web Vitals API)
- [ ] Implement resource prefetching for predictive loading
