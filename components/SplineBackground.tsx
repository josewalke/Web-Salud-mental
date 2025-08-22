import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoad = () => {
    // console.log('Spline cargado exitosamente');
    setIsLoaded(true);
  };

  const handleError = (error: any) => {
    // console.error('Error cargando Spline:', error);
    setError('Error cargando el fondo 3D');
  };

  // Cargar Spline solo cuando sea visible y necesario
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect(); // Solo cargar una vez
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (error) {
    return null; // No mostrar nada si hay error, mantener la página funcional
  }

  return (
    <div ref={containerRef} className="spline-container">
      {shouldLoad && (
        <Spline 
          scene="https://prod.spline.design/Qi1xNMPOy3Jd6AVi/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}