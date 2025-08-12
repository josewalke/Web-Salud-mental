import { useEffect, useCallback, useState } from 'react';
import backendClient from '../utils/backendClient';

/**
 * Hook personalizado para usar el backend de métricas
 */
export const useBackendMetrics = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMetrics, setLastMetrics] = useState(null);
  const [error, setError] = useState(null);

  // Verificar conexión con el backend
  const checkConnection = useCallback(async () => {
    try {
      const health = await backendClient.checkHealth();
      setIsConnected(health.success);
      setError(null);
    } catch (err) {
      setIsConnected(false);
      setError(err.message);
    }
  }, []);

  // Recopilar métricas automáticamente
  const collectMetrics = useCallback(async () => {
    try {
      const metrics = await backendClient.collectAutomaticMetrics();
      if (metrics.success) {
        setLastMetrics(metrics.data);
        setError(null);
      } else {
        setError(metrics.error);
      }
      return metrics;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Registrar evento
  const trackEvent = useCallback(async (eventType, eventData) => {
    try {
      const result = await backendClient.trackEvent(eventType, eventData);
      if (!result.success) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Registrar vista de página
  const trackPageView = useCallback(async (pageData) => {
    try {
      const result = await backendClient.trackPageView(pageData);
      if (!result.success) {
        setError(result.error);
      }
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Obtener estadísticas
  const getStats = useCallback(async () => {
    try {
      const stats = await backendClient.getPerformanceStats();
      if (!stats.success) {
        setError(stats.error);
      }
      return stats;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Obtener métricas en tiempo real
  const getRealTimeMetrics = useCallback(async () => {
    try {
      const metrics = await backendClient.getRealTimeMetrics();
      if (!metrics.success) {
        setError(metrics.error);
      }
      return metrics;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Obtener métricas por dispositivo
  const getMetricsByDevice = useCallback(async (deviceType, page = 1, limit = 50) => {
    try {
      const metrics = await backendClient.getMetricsByDevice(deviceType, page, limit);
      if (!metrics.success) {
        setError(metrics.error);
      }
      return metrics;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Obtener métricas por rango de fechas
  const getMetricsByDateRange = useCallback(async (startDate, endDate) => {
    try {
      const metrics = await backendClient.getMetricsByDateRange(startDate, endDate);
      if (!metrics.success) {
        setError(metrics.error);
      }
      return metrics;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  }, []);

  // Verificar conexión al montar el componente
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Recopilar métricas iniciales
  useEffect(() => {
    if (isConnected) {
      collectMetrics();
    }
  }, [isConnected, collectMetrics]);

  return {
    // Estado
    isConnected,
    lastMetrics,
    error,
    
    // Métodos
    checkConnection,
    collectMetrics,
    trackEvent,
    trackPageView,
    getStats,
    getRealTimeMetrics,
    getMetricsByDevice,
    getMetricsByDateRange,
    
    // Cliente directo (para casos avanzados)
    client: backendClient
  };
};

/**
 * Hook para tracking automático de eventos de usuario
 */
export const useUserTracking = () => {
  const { trackEvent, trackPageView } = useBackendMetrics();

  // Trackear clics
  const trackClick = useCallback((element, data = {}) => {
    trackEvent('click', {
      element,
      timestamp: Date.now(),
      ...data
    });
  }, [trackEvent]);

  // Trackear scroll
  const trackScroll = useCallback((data = {}) => {
    trackEvent('scroll', {
      timestamp: Date.now(),
      ...data
    });
  }, [trackEvent]);

  // Trackear input
  const trackInput = useCallback((element, data = {}) => {
    trackEvent('input', {
      element,
      timestamp: Date.now(),
      ...data
    });
  }, [trackEvent]);

  // Trackear navegación
  const trackNavigation = useCallback((from, to, data = {}) => {
    trackEvent('navigation', {
      from,
      to,
      timestamp: Date.now(),
      ...data
    });
  }, [trackEvent]);

  // Trackear formulario
  const trackForm = useCallback((formName, action, data = {}) => {
    trackEvent('form', {
      formName,
      action,
      timestamp: Date.now(),
      ...data
    });
  }, [trackEvent]);

  // Trackear error
  const trackError = useCallback((errorType, errorMessage, data = {}) => {
    trackEvent('error', {
      errorType,
      errorMessage,
      timestamp: Date.now(),
      ...data
    });
  }, [trackEvent]);

  return {
    trackClick,
    trackScroll,
    trackInput,
    trackNavigation,
    trackForm,
    trackError,
    trackPageView
  };
};

/**
 * Hook para métricas de rendimiento automáticas
 */
export const usePerformanceTracking = () => {
  const { collectMetrics, lastMetrics } = useBackendMetrics();

  // Recopilar métricas cuando cambie la página
  useEffect(() => {
    const handlePageLoad = () => {
      // Esperar un poco para que se carguen todas las métricas
      setTimeout(() => {
        collectMetrics();
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, [collectMetrics]);

  // Trackear cambios de ruta (para SPA)
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        collectMetrics();
      }, 500);
    };

    // Para React Router, podrías usar useLocation aquí
    // Por ahora, usamos un listener global
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [collectMetrics]);

  return {
    lastMetrics,
    collectMetrics
  };
};
