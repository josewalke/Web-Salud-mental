import { performanceMonitor, getPerformanceMetrics, exportPerformanceMetrics } from './performanceMonitor';

interface ConsumptionReport {
  timestamp: string;
  pageInfo: {
    url: string;
    title: string;
    userAgent: string;
    viewport: {
      width: number;
      height: number;
    };
  };
  performance: {
    totalLoadTime: number;
    timeToFirstByte: number;
    domContentLoaded: number;
    windowLoad: number;
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
  };
  resources: {
    totalSize: number;
    totalRequests: number;
    domNodes: number;
    eventListeners: number;
    scripts: number;
    stylesheets: number;
    images: number;
    fonts: number;
    byType: {
      [key: string]: {
        count: number;
        size: number;
      };
    };
  };
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    memoryUsage: number;
    availableMemory: number;
  };
  cpu: {
    cores: number;
    usage: number;
    loadTime: number;
  };
  battery?: {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
  };
  network: {
    effectiveType: string;
    downlink: number;
    rtt: number;
    connectionType: string;
    saveData: boolean;
  };
  consumption: {
    totalLoadTime: number;
    timeToFirstByte: number;
    domContentLoaded: number;
    windowLoad: number;
    resourceLoadTime: number;
    scriptExecutionTime: number;
    styleCalculationTime: number;
    layoutTime: number;
    paintTime: number;
    compositeTime: number;
  };
  errors: Array<{
    message: string;
    filename: string;
    lineno: number;
    colno: number;
    timestamp: number;
  }>;
  userInteractions: Array<{
    type: string;
    target: string;
    timestamp: number;
    duration?: number;
  }>;
  recommendations: Array<{
    category: string;
    issue: string;
    impact: string;
    suggestion: string;
  }>;
}

export function generateConsumptionReport(): ConsumptionReport {
  const metrics = getPerformanceMetrics();
  
  // Generar recomendaciones basadas en las métricas
  const recommendations = generateRecommendations(metrics);
  
  return {
    timestamp: new Date().toISOString(),
    pageInfo: {
      url: metrics.url,
      title: document.title,
      userAgent: metrics.userAgent,
      viewport: metrics.viewport,
    },
    performance: {
      totalLoadTime: metrics.consumption.totalLoadTime,
      timeToFirstByte: metrics.consumption.timeToFirstByte,
      domContentLoaded: metrics.consumption.domContentLoaded,
      windowLoad: metrics.consumption.windowLoad,
      firstPaint: metrics.performance.firstPaint,
      firstContentfulPaint: metrics.performance.firstContentfulPaint,
      largestContentfulPaint: metrics.performance.largestContentfulPaint,
      firstInputDelay: metrics.performance.firstInputDelay,
      cumulativeLayoutShift: metrics.performance.cumulativeLayoutShift,
    },
    resources: {
      totalSize: metrics.resources.totalSize,
      totalRequests: metrics.resources.totalRequests,
      domNodes: metrics.resources.domNodes,
      eventListeners: metrics.resources.eventListeners,
      scripts: metrics.resources.scripts,
      stylesheets: metrics.resources.stylesheets,
      images: metrics.resources.images,
      fonts: metrics.resources.fonts,
      byType: metrics.resources.byType,
    },
    memory: {
      usedJSHeapSize: metrics.memory.usedJSHeapSize,
      totalJSHeapSize: metrics.memory.totalJSHeapSize,
      jsHeapSizeLimit: metrics.memory.jsHeapSizeLimit,
      memoryUsage: metrics.memory.memoryUsage,
      availableMemory: metrics.memory.availableMemory,
    },
    cpu: {
      cores: metrics.cpu.cores,
      usage: metrics.cpu.usage,
      loadTime: metrics.cpu.loadTime,
    },
    battery: metrics.battery,
    network: {
      effectiveType: metrics.network.effectiveType,
      downlink: metrics.network.downlink,
      rtt: metrics.network.rtt,
      connectionType: metrics.network.connectionType,
      saveData: metrics.network.saveData,
    },
    consumption: metrics.consumption,
    errors: metrics.errors,
    userInteractions: metrics.userInteractions,
    recommendations,
  };
}

function generateRecommendations(metrics: any): Array<{category: string; issue: string; impact: string; suggestion: string}> {
  const recommendations: Array<{category: string; issue: string; impact: string; suggestion: string}> = [];
  
  // Análisis de performance
  if (metrics.consumption.totalLoadTime > 3000) {
    recommendations.push({
      category: 'Performance',
      issue: 'Tiempo de carga lento',
      impact: 'Alto',
      suggestion: 'Optimizar recursos, implementar lazy loading y comprimir assets'
    });
  }
  
  if (metrics.performance.largestContentfulPaint > 2500) {
    recommendations.push({
      category: 'Performance',
      issue: 'LCP (Largest Contentful Paint) lento',
      impact: 'Alto',
      suggestion: 'Optimizar imágenes, reducir CSS crítico y mejorar server response time'
    });
  }
  
  // Análisis de recursos
  if (metrics.resources.totalSize > 2000000) {
    recommendations.push({
      category: 'Recursos',
      issue: 'Tamaño total de recursos muy grande',
      impact: 'Medio',
      suggestion: 'Comprimir imágenes, minificar CSS/JS y usar CDN'
    });
  }
  
  if (metrics.resources.domNodes > 1000) {
    recommendations.push({
      category: 'Recursos',
      issue: 'Demasiados nodos DOM',
      impact: 'Medio',
      suggestion: 'Simplificar estructura HTML y evitar elementos innecesarios'
    });
  }
  
  // Análisis de memoria
  if (metrics.memory.memoryUsage > 50) {
    recommendations.push({
      category: 'Memoria',
      issue: 'Uso de memoria alto',
      impact: 'Alto',
      suggestion: 'Revisar memory leaks, optimizar JavaScript y limpiar event listeners'
    });
  }
  
  // Análisis de errores
  if (metrics.errors.length > 0) {
    recommendations.push({
      category: 'Errores',
      issue: `${metrics.errors.length} errores detectados`,
      impact: 'Alto',
      suggestion: 'Revisar y corregir errores de JavaScript y recursos fallidos'
    });
  }
  
  // Análisis de red
  if (metrics.network.effectiveType === 'slow-2g' || metrics.network.effectiveType === '2g') {
    recommendations.push({
      category: 'Red',
      issue: 'Conexión lenta detectada',
      impact: 'Medio',
      suggestion: 'Implementar optimizaciones para conexiones lentas y offline support'
    });
  }
  
  return recommendations;
}

export function downloadConsumptionReport(filename?: string): void {
  const report = generateConsumptionReport();
  const json = JSON.stringify(report, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || `consumption-report-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function logConsumptionReport(): void {
  const report = generateConsumptionReport();
  // console.log('📊 Consumption Report:', report);
} 