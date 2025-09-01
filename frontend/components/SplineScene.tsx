import { Suspense, lazy, useState, useEffect, useCallback } from 'react';

// Dynamic import de Spline con mejor error handling
const Spline = lazy(() => {
  // console.log('📦 Loading Spline module...');
  return import('@splinetool/react-spline')
    .then(module => {
      // console.log('✅ Spline module loaded successfully');
      return { default: module.default };
    })
    .catch(error => {
      // console.error('❌ Failed to load Spline module:', error);
      // Return a simple div that shows error
      return { 
        default: () => (
          <div className="absolute inset-0 flex items-center justify-center text-red-500/50 text-sm">
            Error cargando Spline
          </div>
        )
      };
    });
});

// Loading component simple
function SplineLoader() {
  // console.log('🔄 SplineLoader rendering');
  
  return (
    <div className="absolute inset-0 bg-transparent">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-blue-500/40 text-sm animate-pulse">Cargando Spline...</div>
      </div>
    </div>
  );
}

// Error fallback simple
function SplineErrorFallback() {
  // console.log('💥 SplineErrorFallback rendering');
  
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-blue-100/5">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-blue-500/30 text-sm">Spline no disponible</div>
      </div>
    </div>
  );
}

export default function SplineScene() {
  // console.log('🎬 SplineScene component rendering');
  
  // TODOS LOS HOOKS PRIMERO
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Callbacks optimizados
  const handleLoad = useCallback(() => {
    // console.log('🎉 Spline scene loaded successfully!');
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback((error: any) => {
    // console.error('⚠️ Spline scene error:', error);
    setLoadAttempts(prev => {
      const newAttempts = prev + 1;
      // console.log(`🔄 Load attempt ${newAttempts}`);
      
      if (newAttempts >= 2) {
        // console.log('❌ Too many failures, showing error fallback');
        setHasError(true);
      }
      setIsLoading(false);
      return newAttempts;
    });
  }, []);

  // Effect para marcar como mounted
  useEffect(() => {
    // console.log('⚡ SplineScene mounted');
    setMounted(true);
  }, []);

  // Debug del estado
  // console.log('🔍 SplineScene state:', {
  //   mounted,
  //   hasError,
  //   isLoading,
  //   loadAttempts
  // });

  // Early returns después de hooks
  if (!mounted) {
    // console.log('❌ SplineScene not mounted yet');
    return null;
  }

  // Mostrar fallback si hay muchos errores
  if (hasError && loadAttempts >= 2) {
    // console.log('💥 Showing error fallback');
    return <SplineErrorFallback />;
  }

  // console.log('✅ Rendering Spline component');

  return (
    <div className="absolute inset-0 w-full h-full bg-transparent">
      <Suspense fallback={<SplineLoader />}>
        <div className="relative w-full h-full bg-transparent">
          <Spline
            scene="https://prod.spline.design/Qi1xNMPOy3Jd6AVi/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              background: 'transparent'
            }}
            className="spline-canvas bg-transparent"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-transparent flex items-center justify-center">
              <div className="text-blue-500/40 text-xs">Iniciando Spline...</div>
            </div>
          )}
        </div>
      </Suspense>
    </div>
  );
}