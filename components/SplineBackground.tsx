import { useState } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineBackground() {
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    console.log('Spline cargado exitosamente');
  };

  const handleError = (error: any) => {
    console.error('Error cargando Spline:', error);
    setError('Error cargando el fondo 3D');
  };



  return (
    <div className="spline-container">
      <Spline 
        scene="https://prod.spline.design/Qi1xNMPOy3Jd6AVi/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
        }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}