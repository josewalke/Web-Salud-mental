import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    console.log('Spline cargado exitosamente');
    setIsLoaded(true);
  };

  const handleError = (error: any) => {
    console.error('Error cargando Spline:', error);
    setError('Error cargando el fondo 3D');
  };

  // Preload del Spline para mejor rendimiento
  useEffect(() => {
    const preloadSpline = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = 'https://prod.spline.design/Qi1xNMPOy3Jd6AVi/scene.splinecode';
      document.head.appendChild(link);
    };

    preloadSpline();
  }, []);

  if (error) {
    return null; // No mostrar nada si hay error, mantener la página funcional
  }

  return (
    <div className="spline-container">
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
    </div>
  );
}