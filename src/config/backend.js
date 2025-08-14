/**
 * Configuración del backend para el frontend
 */

const config = {
  // URL del backend
  backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001',
  
  // Endpoints de la API
  endpoints: {
    // Performance
    performance: {
      metrics: '/api/performance/metrics',
      stats: '/api/performance/stats',
      realTime: '/api/performance/real-time',
      byDevice: '/api/performance/device',
      byDateRange: '/api/performance/date-range'
    },
    
    // Analytics
    analytics: {
      event: '/api/analytics/event',
      pageview: '/api/analytics/pageview',
      session: '/api/analytics/session'
    },
    
    // Health
    health: {
      basic: '/api/health',
      detailed: '/api/health/detailed',
      ready: '/api/health/ready'
    }
  },
  
  // Configuración de requests
  request: {
    timeout: 10000, // 10 segundos
    retries: 3,
    retryDelay: 1000 // 1 segundo
  },
  
  // Configuración de métricas
  metrics: {
    // Intervalo de recopilación automática (ms)
    collectionInterval: 30000, // 30 segundos
    
    // Intervalo de actualización del dashboard (ms)
    dashboardUpdateInterval: 30000, // 30 segundos
    
    // Tiempo de espera para métricas de página (ms)
    pageLoadWaitTime: 1000, // 1 segundo
    
    // Tiempo de espera para métricas de ruta (ms)
    routeChangeWaitTime: 500 // 0.5 segundos
  },
  
  // Configuración de tracking
  tracking: {
    // Habilitar tracking automático
    enabled: true,
    
    // Trackear eventos de usuario
    userEvents: true,
    
    // Trackear métricas de rendimiento
    performance: true,
    
    // Trackear vistas de página
    pageViews: true,
    
    // Trackear sesiones
    sessions: true,
    
    // Trackear errores
    errors: true
  },
  
  // Configuración de dispositivos
  devices: {
    // Tipos de dispositivos soportados
    types: ['desktop', 'mobile', 'tablet'],
    
    // Detección automática
    autoDetect: true,
    
    // Fallback si no se puede detectar
    fallback: 'desktop'
  },
  
  // Configuración de debug
  debug: {
    // Habilitar logs de debug
    enabled: process.env.NODE_ENV === 'development',
    
    // Nivel de detalle de logs
    level: 'info', // 'error', 'warn', 'info', 'debug'
    
    // Mostrar métricas en consola
    showMetrics: false,
    
    // Mostrar requests en consola
    showRequests: false
  }
};

export default config;
