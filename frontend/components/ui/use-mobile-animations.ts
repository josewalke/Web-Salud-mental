import { useState, useEffect } from 'react';

export function useMobileAnimations() {
  const [enableAnimations, setEnableAnimations] = useState(true);

  useEffect(() => {
    // Detectar si es móvil
    const isMobile = window.innerWidth < 1024;
    
    // Detectar preferencias de motion reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Deshabilitar animaciones en móvil o si el usuario prefiere motion reducido
    setEnableAnimations(!isMobile && !prefersReducedMotion);
  }, []);

  return enableAnimations;
}