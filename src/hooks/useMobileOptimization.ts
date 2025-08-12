import { useEffect, useState } from 'react';

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      setIsMobile(isMobileDevice);
      
      // Detect low-end devices
      if (isMobileDevice) {
        // iPhone 8 Plus and older devices
        const isIPhone8Plus = /iPhone OS 16_6|iPhone OS 16_5|iPhone OS 16_4|iPhone OS 16_3|iPhone OS 16_2|iPhone OS 16_1|iPhone OS 16_0|iPhone OS 15_|iPhone OS 14_|iPhone OS 13_|iPhone OS 12_|iPhone OS 11_|iPhone OS 10_/i.test(userAgent);
        
        // Check for older Android devices
        const isOldAndroid = /Android [4-7]|Android 8\.0|Android 8\.1/i.test(userAgent);
        
        setIsLowEndDevice(isIPhone8Plus || isOldAndroid);
      }
    };

    checkDevice();
    
    // Listen for orientation changes
    const handleOrientationChange = () => {
      checkDevice();
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Optimized animation settings for mobile
  const getMobileAnimationSettings = () => {
    if (!isMobile) return {};
    
    return {
      // Reduce animation complexity on mobile
      reducedMotion: {
        duration: 0.4, // Faster animations
        ease: "easeOut",
        type: "tween" // Use tween instead of spring for better performance
      },
      
      // Disable complex animations on low-end devices
      disabled: isLowEndDevice ? {
        whileHover: false,
        whileTap: false,
        animate: { opacity: 1, y: 0 }, // Static state
        transition: { duration: 0 }
      } : {}
    };
  };

  // Check if we should disable smooth scrolling
  const shouldDisableSmoothScroll = isMobile && isLowEndDevice;

  return {
    isMobile,
    isLowEndDevice,
    getMobileAnimationSettings,
    shouldDisableSmoothScroll
  };
}
