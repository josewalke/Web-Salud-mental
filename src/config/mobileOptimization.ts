// Configuración de optimizaciones para móviles
export const mobileOptimizationConfig = {
  // Configuración para dispositivos de gama baja
  lowEndDevices: {
    // iPhone 8 Plus y dispositivos más antiguos
    userAgentPatterns: [
      /iPhone OS 16_[0-6]/,
      /iPhone OS 15_/,
      /iPhone OS 14_/,
      /iPhone OS 13_/,
      /iPhone OS 12_/,
      /iPhone OS 11_/,
      /iPhone OS 10_/,
      /Android [4-7]/,
      /Android 8\.0/,
      /Android 8\.1/
    ],
    
    // Configuraciones de animación
    animations: {
      disabled: true,
      duration: 0,
      ease: "linear",
      type: "tween"
    },
    
    // Configuraciones de scroll
    scroll: {
      smoothScroll: false,
      momentum: false,
      hardwareAcceleration: false
    },
    
    // Configuraciones de renderizado
    rendering: {
      reduceMotion: true,
      reduceTransparency: true,
      reduceAnimations: true
    }
  },
  
  // Configuración para dispositivos móviles en general
  mobile: {
    // Configuraciones de animación
    animations: {
      duration: 0.4,
      ease: "easeOut",
      type: "tween"
    },
    
    // Configuraciones de scroll
    scroll: {
      smoothScroll: true,
      momentum: true,
      hardwareAcceleration: true
    },
    
    // Configuraciones de renderizado
    rendering: {
      reduceMotion: false,
      reduceTransparency: false,
      reduceAnimations: false
    }
  },
  
  // Configuración para dispositivos de escritorio
  desktop: {
    // Configuraciones de animación
    animations: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring"
    },
    
    // Configuraciones de scroll
    scroll: {
      smoothScroll: true,
      momentum: true,
      hardwareAcceleration: true
    },
    
    // Configuraciones de renderizado
    rendering: {
      reduceMotion: false,
      reduceTransparency: false,
      reduceAnimations: false
    }
  }
};

export default mobileOptimizationConfig;
