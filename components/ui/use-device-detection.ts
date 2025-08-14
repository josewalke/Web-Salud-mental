import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  shouldReduceAnimations: boolean;
  shouldLoadHeavyContent: boolean;
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1024,
        shouldReduceAnimations: false,
        shouldLoadHeavyContent: true
      };
    }

    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    
    return {
      isMobile,
      isTablet,
      isDesktop,
      width,
      shouldReduceAnimations: isMobile || isTablet || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      shouldLoadHeavyContent: isDesktop && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    };
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;
        
        setDeviceInfo({
          isMobile,
          isTablet,
          isDesktop,
          width,
          shouldReduceAnimations: isMobile || isTablet || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          shouldLoadHeavyContent: isDesktop && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        });
      }, 250); // Debounced para evitar demasiados re-renders
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return deviceInfo;
}