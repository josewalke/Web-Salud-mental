import React, { useState, useEffect, useCallback } from 'react';
import Spline from '@splinetool/react-spline';

export function SplineBackground() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
            // console.log('Spline loaded successfully');
    setIsLoading(false);
  }, []);

  const handleError = useCallback((error: any) => {
    console.error('Spline error:', error);
    setHasError(true);
    setIsLoading(false);
  }, []);

  // Effect to hide Spline branding - Simple approach
  useEffect(() => {
    const hideSplineBranding = () => {
      const selectors = [
        '[data-spline-attribute="spline-branding"]',
        '[data-spline-attribute="spline-controls"]',
        '.spline-branding',
        '.spline-controls',
        '[class*="spline-branding"]',
        '[class*="spline-controls"]',
        '[id*="spline-branding"]',
        '[id*="spline-controls"]'
      ];

      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element) => {
            if (element instanceof HTMLElement) {
              element.style.display = 'none';
              element.style.visibility = 'hidden';
              element.style.opacity = '0';
              element.style.pointerEvents = 'none';
            }
          });
        } catch (error) {
          // Ignore errors for invalid selectors
        }
      });
    };

    // Hide branding immediately and then periodically
    hideSplineBranding();
    const interval = setInterval(hideSplineBranding, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Optimized timeout: reduced from 15s to 5s for faster fallback
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        // console.log('Spline timeout - falling back to gradient (5s)');
        setHasError(true);
        setIsLoading(false);
      }
    }, 5000); // Reduced from 15000 to 5000ms

    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Optimized fallback background when Spline fails
  if (hasError) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-blue-600/10 animate-pulse" />
        {/* Optimized animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-300/20 rounded-full blur-lg animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-100/20 rounded-full blur-2xl animate-pulse" />
        {/* Additional subtle elements for better visual appeal */}
        <div className="absolute top-1/4 right-1/4 w-12 h-12 bg-blue-300/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-blue-200/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Optimized loading overlay with faster transition */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 animate-pulse transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* Spline container - Disabled on mobile for better performance */}
      <div className="w-full h-full relative">
        {/* Show Spline only on desktop for better mobile performance */}
        <div className="hidden md:block">
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
            }}
          />
        </div>
        
        {/* Mobile-optimized background */}
        <div className="md:hidden">
          <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-blue-600/5" />
            {/* Minimal animated elements for mobile */}
            <div className="absolute top-20 left-10 w-16 h-16 bg-blue-200/20 rounded-full blur-lg animate-pulse" />
            <div className="absolute bottom-20 right-10 w-12 h-12 bg-blue-300/15 rounded-full blur-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
} 