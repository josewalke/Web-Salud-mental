/**
 * useDeviceOptimization.ts
 * 
 * Hook personalizado para optimización automática basada en el dispositivo.
 * Detecta el tipo de dispositivo y aplica optimizaciones de rendimiento.
 * 
 * Características:
 * - Detección automática de móvil, tablet y dispositivos de gama baja
 * - Configuración de animaciones según el dispositivo
 * - Optimización de CSS para dispositivos de gama baja
 * - Configuración de Framer Motion adaptativa
 * - Aplicación automática de estilos optimizados
 * 
 * @author Sistema de Salud Mental
 * @version 1.0.0
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para optimización automática basada en el dispositivo
 * 
 * @returns Objeto con información del dispositivo y configuraciones optimizadas
 */
export function useDeviceOptimization() {
  // ===== ESTADOS DEL DISPOSITIVO =====
  
  /** Indica si el dispositivo es móvil */
  const [isMobile, setIsMobile] = useState(false);
  
  /** Indica si el dispositivo es tablet */
  const [isTablet, setIsTablet] = useState(false);
  
  /** Indica si el dispositivo es de gama baja */
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  /** Nivel de optimización aplicado */
  const [optimizationLevel, setOptimizationLevel] = useState<'full' | 'mobile' | 'ultra-light'>('full');

  // ===== DETECCIÓN DE DISPOSITIVO =====
  
  /**
   * Efecto que detecta el tipo de dispositivo y aplica optimizaciones
   * Se ejecuta al montar el componente y en cambios de orientación
   */
  useEffect(() => {
    /**
     * Función que detecta el tipo de dispositivo basado en el user agent
     */
    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      
      // Detectar dispositivos móviles
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      
      // Detectar tablets
      const tablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);
      
      setIsMobile(mobile);
      setIsTablet(tablet);

      // Detectar dispositivos de gama baja basado en versiones de OS
      const isLowEndDevice = /iPhone OS 1[0-6]|Android [4-8]|Android 9\.0/i.test(userAgent);
      setIsLowEnd(isLowEndDevice);

      // Determinar nivel de optimización según el dispositivo
      if (isLowEndDevice) {
        setOptimizationLevel('ultra-light');
      } else if (mobile || tablet) {
        setOptimizationLevel('mobile');
      } else {
        setOptimizationLevel('full');
      }
    };

    // Detectar dispositivo inicial
    checkDevice();
    
    /**
     * Handler para cambios de orientación
     * Re-detecta el dispositivo en caso de cambios
     */
    const handleOrientationChange = () => {
      checkDevice();
    };
    
    // Agregar listeners para cambios de orientación y tamaño
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', checkDevice);
    
    // Cleanup de listeners
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  // ===== CONFIGURACIONES DE ANIMACIÓN =====
  
  /**
   * Obtiene la configuración de animaciones según el nivel de optimización
   * @returns Objeto con configuración de animaciones optimizada
   */
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

  /**
   * Obtiene la configuración optimizada para Framer Motion
   * @returns Objeto con configuración de Framer Motion adaptada al dispositivo
   */
  const getFramerMotionConfig = () => {
    const config = getAnimationConfig();
    
    // Para dispositivos de gama baja, desactivar animaciones complejas
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

  // ===== OPTIMIZACIÓN DE CSS =====
  
  /**
   * Aplica CSS optimizado para dispositivos de gama baja
   * Mejora el rendimiento desactivando animaciones complejas
   */
  const applyOptimizedCSS = useCallback(() => {
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
  }, [optimizationLevel]);

  /**
   * Efecto que aplica las optimizaciones de CSS
   * Se ejecuta cuando cambia el nivel de optimización
   */
  useEffect(() => {
    applyOptimizedCSS();
  }, [applyOptimizedCSS]);

  // ===== RETORNO DEL HOOK =====
  
  /**
   * Retorna el objeto con toda la información del dispositivo y configuraciones
   */
  return {
    // Información del dispositivo
    isMobile,
    isTablet,
    isLowEnd,
    optimizationLevel,
    
    // Funciones de configuración
    getAnimationConfig,
    getFramerMotionConfig,
    
    // Flags de optimización para uso directo
    shouldDisableSpline: getAnimationConfig().disableSpline,
    shouldDisableComplexAnimations: getAnimationConfig().disableComplexAnimations,
    shouldUseBasicCSS: getAnimationConfig().useBasicCSS
  };
}
