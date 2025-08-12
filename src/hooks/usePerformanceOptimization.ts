import { useEffect, useRef, useCallback } from 'react';

export function usePerformanceOptimization() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Optimización de scroll con throttling
  const throttleScroll = useCallback((callback: Function, delay: number) => {
    let lastCall = 0;
    return function (this: any, ...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback.apply(this, args);
      }
    };
  }, []);

  // Optimización de resize con debouncing
  const debounceResize = useCallback((callback: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback.apply(this, args), delay);
    };
  }, []);

  // Pausar animaciones cuando la página no está visible
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      // Pausar animaciones pesadas
      document.body.classList.add('page-hidden');
    } else {
      // Reanudar animaciones
      document.body.classList.remove('page-hidden');
    }
  }, []);

  // Optimización de animaciones con requestAnimationFrame
  const optimizedAnimation = useCallback((callback: FrameRequestCallback) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(callback);
  }, []);

  // Intersection Observer para lazy loading
  const useInView = useCallback((callback: (isVisible: boolean) => void, options = {}) => {
    return (element: HTMLElement | null) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          callback(entry.isIntersecting);
        },
        {
          rootMargin: '0px 0px -20% 0px',
          threshold: 0.1,
          ...options
        }
      );

      observer.observe(element);
      observerRef.current = observer;

      return () => {
        observer.disconnect();
      };
    };
  }, []);

  // Optimización de WebGL/Spline
  const optimizeWebGL = useCallback(() => {
    // Reducir pixel ratio para mejor rendimiento
    if (window.devicePixelRatio > 1.5) {
      document.documentElement.style.setProperty('--device-pixel-ratio', '1.5');
    }

    // Deshabilitar sombras en dispositivos de gama baja
    if (window.innerWidth < 768) {
      document.documentElement.style.setProperty('--shadow-quality', 'low');
    }
  }, []);

  // Optimización de imágenes
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      // Lazy loading nativo
      if (!img.loading) {
        img.loading = 'lazy';
      }
      
      // Optimizar para dispositivos de gama baja
      if (window.innerWidth < 768) {
        img.classList.add('mobile-optimized');
      }
    });
  }, []);

  // Aplicar todas las optimizaciones
  const applyOptimizations = useCallback(() => {
    // Optimizar WebGL
    optimizeWebGL();
    
    // Optimizar imágenes
    optimizeImages();
    
    // Agregar clases CSS de optimización
    document.body.classList.add('performance-optimized');
    
    // Optimizar scroll
    const optimizedScrollHandler = throttleScroll(() => {
      // Solo hacer trabajo ligero durante scroll
    }, 16); // 60fps
    
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Optimizar resize
    const optimizedResizeHandler = debounceResize(() => {
      // Recalcular layout solo cuando sea necesario
    }, 250);
    
    window.addEventListener('resize', optimizedResizeHandler, { passive: true });
    
    // Escuchar cambios de visibilidad
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
      window.removeEventListener('resize', optimizedResizeHandler);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [throttleScroll, debounceResize, handleVisibilityChange, optimizeWebGL, optimizeImages]);

  useEffect(() => {
    const cleanup = applyOptimizations();
    return cleanup;
  }, [applyOptimizations]);

  return {
    useInView,
    optimizedAnimation,
    throttleScroll,
    debounceResize
  };
}
