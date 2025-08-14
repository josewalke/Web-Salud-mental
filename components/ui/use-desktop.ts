import { useState, useEffect } from 'react';

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkIsDesktop = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent || '';
      
      // Criterios para desktop
      const isLargeScreen = width >= 1024 && height >= 600;
      const isNotMobileUA = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      
      setIsDesktop(isLargeScreen && isNotMobileUA && hasHover && hasPointer);
    };

    checkIsDesktop();
    
    const resizeHandler = () => {
      setTimeout(checkIsDesktop, 100); // Debounce
    };
    
    window.addEventListener('resize', resizeHandler);
    
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return isDesktop;
}