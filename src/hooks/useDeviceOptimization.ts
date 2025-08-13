import { useState, useEffect } from 'react';

export function useDeviceOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [optimizationLevel, setOptimizationLevel] = useState<'full' | 'mobile' | 'ultra-light'>('full');

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const tablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);
      
      setIsMobile(mobile);
      setIsTablet(tablet);

      // Detectar dispositivos de gama baja
      const isLowEndDevice = /iPhone OS 1[0-6]|Android [4-8]|Android 9\.0/i.test(userAgent);
      setIsLowEnd(isLowEndDevice);

      // Determinar nivel de optimización
      if (isLowEndDevice) {
        setOptimizationLevel('ultra-light');
      } else if (mobile || tablet) {
        setOptimizationLevel('mobile');
      } else {
        setOptimizationLevel('full');
      }
    };

    checkDevice();
    
    // Re-check en cambio de orientación
    const handleOrientationChange = () => {
      checkDevice();
    };
    
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // Configuraciones de animación según dispositivo
  const getAnimationConfig = () => {
    switch (optimizationLevel) {
      case 'ultra-light':
        return {
          duration: 0.1,
          ease: "linear",
          disableSpline: true,
          disableComplexAnimations: true,
          useBasicCSS: true
        };
      case 'mobile':
        return {
          duration: 0.2,
          ease: "easeOut",
          disableSpline: true,
          disableComplexAnimations: false,
          useBasicCSS: false
        };
      case 'full':
      default:
        return {
          duration: 0.8,
          ease: "easeOut",
          disableSpline: false,
          disableComplexAnimations: false,
          useBasicCSS: false
        };
    }
  };

  // Configuración de Framer Motion optimizada
  const getFramerMotionConfig = () => {
    const config = getAnimationConfig();
    
    if (config.disableComplexAnimations) {
      return {
        disabled: true,
        fallback: {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
          transition: { duration: 0 }
        }
      };
    }

    return {
      disabled: false,
      config: {
        duration: config.duration,
        ease: config.ease
      }
    };
  };

  // Aplicar CSS optimizado para dispositivos de gama baja
  const applyOptimizedCSS = () => {
    if (optimizationLevel === 'ultra-light') {
      const style = document.createElement('style');
      style.textContent = `
        /* OPTIMIZACIONES ULTRA-LIGERAS PARA DISPOSITIVOS DE GAMA BAJA */
        * {
          -webkit-transform: translateZ(0) !important;
          transform: translateZ(0) !important;
          will-change: auto !important;
        }
        
        /* Desactivar animaciones complejas */
        .heavy-animation, .complex-effect {
          animation: none !important;
          transition: none !important;
          transform: none !important;
        }
        
        /* Solo propiedades baratas */
        .animate-optimized {
          transition: opacity 0.1s ease-out, transform 0.1s ease-out !important;
        }
        
        /* Scroll nativo */
        html {
          scroll-behavior: auto !important;
          -webkit-overflow-scrolling: touch !important;
        }
      `;
      document.head.appendChild(style);
    }
  };

  useEffect(() => {
    applyOptimizedCSS();
  }, [optimizationLevel]);

  return {
    isMobile,
    isTablet,
    isLowEnd,
    optimizationLevel,
    getAnimationConfig,
    getFramerMotionConfig,
    shouldDisableSpline: getAnimationConfig().disableSpline,
    shouldDisableComplexAnimations: getAnimationConfig().disableComplexAnimations,
    shouldUseBasicCSS: getAnimationConfig().useBasicCSS
  };
}
