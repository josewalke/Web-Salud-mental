// Performance optimizations for the web application

import { initializeImageOptimization } from './imageOptimization';
import { initializeAdvancedCodeSplitting } from './advancedCodeSplitting';

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);

  // Preload critical images if any
  const criticalImages: string[] = [
    // Add critical image URLs here
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

/**
 * Optimize images with lazy loading
 */
export function optimizeImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Defer non-critical JavaScript
 */
export function deferNonCriticalJS() {
  const scripts = document.querySelectorAll('script[data-defer]');
  
  scripts.forEach(script => {
    if (script instanceof HTMLScriptElement) {
      script.defer = true;
    }
  });
}

/**
 * Optimize CSS delivery
 */
export function optimizeCSSDelivery() {
  // Inline critical CSS
  const criticalCSS = `
    /* Critical CSS for above-the-fold content */
    .hero-section { opacity: 1; }
    .header { position: fixed; top: 0; }
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
}

/**
 * Implement resource hints
 */
export function addResourceHints() {
  // DNS prefetch for external domains
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://prod.spline.design'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

/**
 * Optimize Spline background loading
 */
export function optimizeSplineLoading() {
  // Preconnect to Spline domain
  const splineLink = document.createElement('link');
  splineLink.rel = 'preconnect';
  splineLink.href = 'https://prod.spline.design';
  document.head.appendChild(splineLink);
}

/**
 * Initialize service worker
 */
export function initializeServiceWorker() {
  // Service Worker deshabilitado temporalmente para evitar errores de fetch
      // console.log('[SW] Service Worker deshabilitado para desarrollo');
  
  /*
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          // console.log('[SW] Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.error('[SW] Service Worker registration failed:', error);
        });
    });
  }
  */
}

/**
 * Optimize bundle loading
 */
export function optimizeBundleLoading() {
  // Preload deshabilitado temporalmente para evitar errores de recursos
      // console.log('[Bundle] Preload de chunks deshabilitado para desarrollo');
  
  /*
  // Preload critical chunks with proper timing
  const criticalChunks = [
    { href: '/static/js/main.7a4d2a98.js', as: 'script' },
    { href: '/static/css/main.a18845a6.css', as: 'style' }
  ];

  // Delay preload to avoid warnings
  setTimeout(() => {
    criticalChunks.forEach(chunk => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = chunk.href;
      link.as = chunk.as;
      document.head.appendChild(link);
    });
  }, 1000); // Delay 1 second to avoid immediate preload warnings
  */
}

/**
 * Implement performance monitoring
 */
export function initializePerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          // console.log('LCP:', entry.startTime);
        } else if (entry.entryType === 'first-input') {
          // const firstInputEntry = entry as PerformanceEventTiming;
          // console.log('FID:', entry.processingStart - entry.startTime);
        } else if (entry.entryType === 'layout-shift') {
          // const layoutShiftEntry = entry as any;
          // console.log('CLS:', entry.value);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  }

  // Monitor resource loading
  if ('PerformanceObserver' in window) {
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.duration > 3000) {
            console.warn('Slow resource:', resourceEntry.name, resourceEntry.duration);
          }
        }
      }
    });

    resourceObserver.observe({ entryTypes: ['resource'] });
  }
}

/**
 * Optimize memory usage
 */
export function optimizeMemoryUsage() {
  // Clean up event listeners
  const cleanupEventListeners = () => {
    // Remove unused event listeners
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      // This is a simplified approach - in production you'd want more sophisticated cleanup
      if (element.hasAttribute('data-cleanup')) {
        element.removeEventListener('scroll', null as any);
        element.removeEventListener('resize', null as any);
      }
    });
  };

  // Run cleanup periodically
  setInterval(cleanupEventListeners, 30000);
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations() {
  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      optimizeImages();
      deferNonCriticalJS();
      optimizeCSSDelivery();
      addResourceHints();
      optimizeSplineLoading();
      optimizeBundleLoading();
      initializePerformanceMonitoring();
      optimizeMemoryUsage();
      
      // Initialize Fase 2 optimizations
      initializeImageOptimization();
      initializeAdvancedCodeSplitting();
      initializeServiceWorker();
    });
  } else {
    preloadCriticalResources();
    optimizeImages();
    deferNonCriticalJS();
    optimizeCSSDelivery();
    addResourceHints();
    optimizeSplineLoading();
    optimizeBundleLoading();
    initializePerformanceMonitoring();
    optimizeMemoryUsage();
    
    // Initialize Fase 2 optimizations
    initializeImageOptimization();
    initializeAdvancedCodeSplitting();
    initializeServiceWorker();
  }
}

/**
 * Monitor and log performance metrics
 */
export function logPerformanceMetrics() {
  if ('performance' in window) {
    // const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    // const paint = performance.getEntriesByType('paint');
    
    // console.log('🚀 Performance Metrics:', {
    //   'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    //   'First Paint': paint.find(p => p.name === 'first-paint')?.startTime,
    //   'First Contentful Paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime,
    //   'Load Complete': navigation.loadEventEnd - navigation.loadEventStart,
    // });
  }
} 