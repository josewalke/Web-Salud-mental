/**
 * Cliente para conectar con el backend de métricas y analytics
 */

import backendConfig from '../config/backend.js';

// Configuración directa para pruebas
const getBackendUrl = () => {
  // Para pruebas: usar localhost
  return backendConfig.backendUrl;
};

const BACKEND_URL = getBackendUrl();

class BackendClient {
  constructor() {
    this.baseURL = BACKEND_URL;
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
  }

  // Generar ID único de sesión
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Método genérico para hacer requests
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        ...options
      };

      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en request al backend:', error);
      return { success: false, error: error.message };
    }
  }

  // Guardar métricas de rendimiento
  async savePerformanceMetrics(metrics) {
    const payload = {
      ...metrics,
      session: {
        sessionId: this.sessionId,
        startTime: new Date(this.sessionStartTime),
        ...metrics.session
      }
    };

    return this.makeRequest('/api/performance/metrics', {
      body: JSON.stringify(payload)
    });
  }

  // Registrar evento de analytics
  async trackEvent(eventType, eventData = {}) {
    const payload = {
      eventType,
      eventData,
      timestamp: new Date(),
      sessionId: this.sessionId
    };

    return this.makeRequest('/api/analytics/event', {
      body: JSON.stringify(payload)
    });
  }

  // Registrar vista de página
  async trackPageView(pageData) {
    const payload = {
      ...pageData,
      sessionId: this.sessionId,
      timestamp: new Date()
    };

    return this.makeRequest('/api/analytics/pageview', {
      body: JSON.stringify(payload)
    });
  }

  // Iniciar sesión
  async startSession(sessionData = {}) {
    const payload = {
      action: 'start',
      sessionId: this.sessionId,
      data: {
        startTime: new Date(this.sessionStartTime),
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...sessionData
      }
    };

    return this.makeRequest('/api/analytics/session', {
      body: JSON.stringify(payload)
    });
  }

  // Finalizar sesión
  async endSession(sessionData = {}) {
    const sessionDuration = Date.now() - this.sessionStartTime;
    
    const payload = {
      action: 'end',
      sessionId: this.sessionId,
      data: {
        endTime: new Date(),
        duration: sessionDuration,
        ...sessionData
      }
    };

    return this.makeRequest('/api/analytics/session', {
      body: JSON.stringify(payload)
    });
  }

  // Obtener estadísticas de rendimiento
  async getPerformanceStats() {
    try {
      const response = await fetch(`${this.baseURL}/api/performance/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener métricas en tiempo real
  async getRealTimeMetrics() {
    try {
      const response = await fetch(`${this.baseURL}/api/performance/real-time`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener métricas en tiempo real:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener métricas por dispositivo
  async getMetricsByDevice(deviceType, page = 1, limit = 50) {
    try {
      const url = `${this.baseURL}/api/performance/device/${deviceType}?page=${page}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener métricas por dispositivo:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener métricas por rango de fechas
  async getMetricsByDateRange(startDate, endDate) {
    try {
      const url = `${this.baseURL}/api/performance/date-range?startDate=${startDate}&endDate=${endDate}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener métricas por rango de fechas:', error);
      return { success: false, error: error.message };
    }
  }

  // Trackear acciones del usuario
  async trackUserActions(userActionsData) {
    const payload = {
      ...userActionsData,
      timestamp: new Date()
    };

    return this.makeRequest('/api/analytics/user-actions', {
      body: JSON.stringify(payload)
    });
  }

  // Verificar estado del backend
  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/api/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al verificar salud del backend:', error);
      return { success: false, error: error.message };
    }
  }

  // Método para recopilar métricas automáticamente
  async collectAutomaticMetrics() {
    const metrics = {
      performance: await this.getPerformanceMetrics(),
      device: await this.getDeviceInfo(),
      page: await this.getPageInfo(),
      system: await this.getSystemInfo()
    };

    return this.savePerformanceMetrics(metrics);
  }

  // Obtener métricas de rendimiento del navegador
  async getPerformanceMetrics() {
    if (!('performance' in window)) {
      return null;
    }

    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    const resource = performance.getEntriesByType('resource');

    return {
      lcp: 0, // Se obtiene del observer
      fid: 0, // Se obtiene del observer
      cls: 0, // Se obtiene del observer
      fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      ttfb: navigation?.responseStart - navigation?.requestStart || 0,
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
      loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      resourceCount: resource.length,
      totalResourceSize: resource.reduce((total, r) => total + (r.transferSize || 0), 0),
      slowResources: resource
        .filter(r => r.duration > 3000)
        .map(r => ({
          name: r.name,
          duration: r.duration,
          size: r.transferSize || 0
        }))
    };
  }

  // Obtener información del dispositivo
  getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);

    let deviceType = 'desktop';
    if (isTablet) deviceType = 'tablet';
    else if (isMobile) deviceType = 'mobile';

    return {
      type: deviceType,
      userAgent: userAgent,
      screenResolution: {
        width: window.screen?.width || 0,
        height: window.screen?.height || 0
      },
      viewport: {
        width: window.innerWidth || 0,
        height: window.innerHeight || 0
      },
      pixelRatio: window.devicePixelRatio || 1,
      orientation: window.screen?.orientation?.type || 'portrait',
      language: navigator.language || 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  }

  // Obtener información de la página
  getPageInfo() {
    return {
      url: window.location.href,
      title: document.title,
      loadTime: performance.now(),
      renderTime: 0, // Se calcula después
      interactiveTime: 0 // Se calcula después
    };
  }

  // Obtener información del sistema
  getSystemInfo() {
    return {
      memoryUsage: 0, // Solo disponible en algunos navegadores
      cpuUsage: 0, // No disponible en navegadores
      batteryLevel: 0, // Solo disponible en algunos navegadores
      networkType: 'unknown', // Solo disponible en algunos navegadores
      connectionSpeed: 'unknown' // Solo disponible en algunos navegadores
    };
  }
}

// Crear instancia singleton
const backendClient = new BackendClient();

// Inicializar sesión automáticamente
backendClient.startSession();

// Finalizar sesión cuando se cierre la página
window.addEventListener('beforeunload', () => {
  backendClient.endSession();
});

export default backendClient;
