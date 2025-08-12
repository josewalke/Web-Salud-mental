import { useEffect, useCallback, useState } from 'react';
import userTrackingSystem from '../utils/userTrackingSystem';

interface SystemStats {
  isActive: boolean;
  sessionId: string;
  sessionDuration: number;
  totalActions: number;
  pendingActions: number;
}

/**
 * Hook para usar el sistema completo de tracking de usuario
 * Captura ABSOLUTAMENTE TODO lo que hace el usuario
 */
export const useUserTrackingSystem = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [stats, setStats] = useState<SystemStats | null>(null);

  // Verificar estado del sistema
  useEffect(() => {
    const checkStatus = () => {
      const systemStats = userTrackingSystem.getStats();
      setIsActive(systemStats.isActive);
      setStats(systemStats);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  // Iniciar tracking
  const startTracking = useCallback(() => {
    userTrackingSystem.init();
    setIsActive(true);
  }, []);

  // Detener tracking
  const stopTracking = useCallback(() => {
    userTrackingSystem.stop();
    setIsActive(false);
  }, []);

  // Obtener estadísticas en tiempo real
  const getStats = useCallback((): SystemStats => {
    const stats = userTrackingSystem.getStats();
    return {
      isActive: stats.isActive,
      sessionId: stats.sessionId,
      sessionDuration: stats.sessionDuration,
      totalActions: stats.totalActions,
      pendingActions: stats.pendingActions
    };
  }, []);

  // Configurar opciones de tracking
  const configureTracking = useCallback((options: Partial<typeof userTrackingSystem.config>) => {
    Object.assign(userTrackingSystem.config, options);
  }, []);

  // Trackear evento personalizado
  const trackCustomEvent = useCallback((eventType: string, eventData: any) => {
    userTrackingSystem.recordAction(eventType, eventData);
  }, []);

  return {
    // Estado
    isActive,
    stats,
    
    // Métodos
    startTracking,
    stopTracking,
    getStats,
    configureTracking,
    trackCustomEvent,
    
    // Sistema directo (para casos avanzados)
    system: userTrackingSystem
  };
};

/**
 * Hook para tracking automático en componentes
 */
export const useAutoTracking = (componentName: string, options: any = {}) => {
  const { trackCustomEvent } = useUserTrackingSystem();

  // Tracking automático de montaje/desmontaje
  useEffect(() => {
    trackCustomEvent('component_mount', {
      component: componentName,
      timestamp: Date.now(),
      ...options
    });

    return () => {
      trackCustomEvent('component_unmount', {
        component: componentName,
        timestamp: Date.now(),
        ...options
      });
    };
  }, [componentName, trackCustomEvent, options]);

  // Tracking de props cambiantes
  useEffect(() => {
    if (options.trackPropsChanges) {
      trackCustomEvent('component_props_change', {
        component: componentName,
        props: options.trackPropsChanges,
        timestamp: Date.now()
      });
    }
  }, [componentName, trackCustomEvent, options.trackPropsChanges]);

  return { trackCustomEvent };
};

/**
 * Hook para tracking de formularios avanzado
 */
export const useFormTracking = (formName: string, options: { trackValues?: boolean } = {}) => {
  const { trackCustomEvent } = useUserTrackingSystem();

  const trackFieldFocus = useCallback((fieldName: string, fieldType: string) => {
    trackCustomEvent('form_field_focus', {
      formName,
      fieldName,
      fieldType,
      timestamp: Date.now()
    });
  }, [formName, trackCustomEvent]);

  const trackFieldBlur = useCallback((fieldName: string, fieldType: string, value?: any) => {
    trackCustomEvent('form_field_blur', {
      formName,
      fieldName,
      fieldType,
      value: options.trackValues ? value : null,
      timestamp: Date.now()
    });
  }, [formName, trackCustomEvent, options.trackValues]);

  const trackFieldChange = useCallback((fieldName: string, fieldType: string, oldValue?: any, newValue?: any) => {
    trackCustomEvent('form_field_change', {
      formName,
      fieldName,
      fieldType,
      oldValue: options.trackValues ? oldValue : null,
      newValue: options.trackValues ? newValue : null,
      timestamp: Date.now()
    });
  }, [formName, trackCustomEvent, options.trackValues]);

  const trackFormSubmit = useCallback((formData: any, success: boolean = true) => {
    trackCustomEvent('form_submit', {
      formName,
      success,
      fieldCount: Object.keys(formData).length,
      timestamp: Date.now()
    });
  }, [formName, trackCustomEvent]);

  const trackFormError = useCallback((fieldName: string, errorMessage: string) => {
    trackCustomEvent('form_error', {
      formName,
      fieldName,
      errorMessage,
      timestamp: Date.now()
    });
  }, [formName, trackCustomEvent]);

  return {
    trackFieldFocus,
    trackFieldBlur,
    trackFieldChange,
    trackFormSubmit,
    trackFormError
  };
};

/**
 * Hook para tracking de navegación
 */
export const useNavigationTracking = () => {
  const { trackCustomEvent } = useUserTrackingSystem();

  const trackPageView = useCallback((pageName: string, pageData: any = {}) => {
    trackCustomEvent('page_view', {
      pageName,
      pageData,
      timestamp: Date.now()
    });
  }, [trackCustomEvent]);

  const trackNavigation = useCallback((from: string, to: string, method: string = 'click') => {
    trackCustomEvent('navigation', {
      from,
      to,
      method,
      timestamp: Date.now()
    });
  }, [trackCustomEvent]);

  const trackExternalLink = useCallback((url: string, linkText: string) => {
    trackCustomEvent('external_link', {
      url,
      linkText,
      timestamp: Date.now()
    });
  }, [trackCustomEvent]);

  return {
    trackPageView,
    trackNavigation,
    trackExternalLink
  };
};

/**
 * Hook para tracking de engagement
 */
export const useEngagementTracking = () => {
  const { trackCustomEvent } = useUserTrackingSystem();

  const trackTimeOnPage = useCallback((pageName: string, timeSpent: number) => {
    trackCustomEvent('time_on_page', {
      pageName,
      timeSpent,
      timestamp: Date.now()
    });
  }, [trackCustomEvent]);

  const trackScrollDepth = useCallback((pageName: string, depth: number) => {
    trackCustomEvent('scroll_depth', {
      pageName,
      depth,
      timestamp: Date.now()
    });
  }, [trackCustomEvent]);

  const trackElementVisibility = useCallback((elementName: string, timeVisible: number) => {
    trackCustomEvent('element_visibility', {
      elementName,
      timeVisible,
      timestamp: Date.now()
    });
  }, [trackCustomEvent]);

  const trackUserInterest = useCallback((interestType: string, interestData: any) => {
    trackCustomEvent('user_interest', {
      interestType,
      interestData,
      timestamp: Date.now()
    });
  }, [trackCustomEvent]);

  return {
    trackTimeOnPage,
    trackScrollDepth,
    trackElementVisibility,
    trackUserInterest
  };
};

export default useUserTrackingSystem;
