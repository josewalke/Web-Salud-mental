interface PerformanceMetrics {
  timestamp: number;
  url: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  performance: {
    navigationStart: number;
    loadEventEnd: number;
    domContentLoadedEventEnd: number;
    firstPaint: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
    timeToInteractive: number;
    totalBlockingTime: number;
  };
  resources: {
    totalSize: number;
    totalRequests: number;
    byType: {
      [key: string]: {
        count: number;
        size: number;
      };
    };
    // Métricas adicionales de consumo
    domNodes: number;
    eventListeners: number;
    scripts: number;
    stylesheets: number;
    images: number;
    fonts: number;
  };
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
    // Métricas adicionales de memoria
    memoryUsage: number; // Porcentaje de uso
    availableMemory: number;
  };
  cpu: {
    cores: number;
    usage: number; // Estimación basada en performance
    loadTime: number;
  };
  battery?: {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
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
  pageVisibility: {
    isVisible: boolean;
    timeVisible: number;
    timeHidden: number;
  };
  network: {
    effectiveType: string;
    downlink: number;
    rtt: number;
    // Métricas adicionales de red
    connectionType: string;
    saveData: boolean;
  };
  // Métricas de consumo específicas
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
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics;
  private startTime: number;
  private isMonitoring: boolean = false;
  private errorListener?: (event: ErrorEvent) => void;
  private visibilityListener?: () => void;
  private interactionListener?: (event: Event) => void;

  constructor() {
    this.startTime = performance.now();
    this.metrics = this.initializeMetrics();
  }

  private initializeMetrics(): PerformanceMetrics {
    return {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      performance: {
        navigationStart: 0,
        loadEventEnd: 0,
        domContentLoadedEventEnd: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
        firstInputDelay: 0,
        cumulativeLayoutShift: 0,
        timeToInteractive: 0,
        totalBlockingTime: 0,
      },
      resources: {
        totalSize: 0,
        totalRequests: 0,
        byType: {},
        domNodes: 0,
        eventListeners: 0,
        scripts: 0,
        stylesheets: 0,
        images: 0,
        fonts: 0,
      },
      memory: {
        usedJSHeapSize: 0,
        totalJSHeapSize: 0,
        jsHeapSizeLimit: 0,
        memoryUsage: 0,
        availableMemory: 0,
      },
      cpu: {
        cores: 0,
        usage: 0,
        loadTime: 0,
      },
      battery: undefined,
      errors: [],
      userInteractions: [],
      pageVisibility: {
        isVisible: !document.hidden,
        timeVisible: 0,
        timeHidden: 0,
      },
      network: {
        effectiveType: 'unknown',
        downlink: 0,
        rtt: 0,
        connectionType: 'unknown',
        saveData: false,
      },
      consumption: {
        totalLoadTime: 0,
        timeToFirstByte: 0,
        domContentLoaded: 0,
        windowLoad: 0,
        resourceLoadTime: 0,
        scriptExecutionTime: 0,
        styleCalculationTime: 0,
        layoutTime: 0,
        paintTime: 0,
        compositeTime: 0,
      },
    };
  }

  public startMonitoring(): void {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.startTime = performance.now();
    
    // Capturar métricas de performance
    this.capturePerformanceMetrics();
    
    // Capturar métricas de recursos
    this.captureResourceMetrics();
    
    // Capturar métricas de memoria
    this.captureMemoryMetrics();
    
    // Capturar métricas de CPU
    this.captureCPUMetrics();
    
    // Capturar métricas de batería
    this.captureBatteryMetrics();
    
    // Capturar métricas de consumo
    this.captureConsumptionMetrics();
    
    // Capturar métricas de red
    this.captureNetworkMetrics();
    
    // Configurar listeners
    this.setupErrorListener();
    this.setupVisibilityListener();
    this.setupInteractionListener();
    
    // Web Vitals
    this.captureWebVitals();
    
    // console.log('🚀 Performance monitoring started');
  }

  private capturePerformanceMetrics(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.performance.navigationStart = navigation.startTime;
      this.metrics.performance.loadEventEnd = navigation.loadEventEnd;
      this.metrics.performance.domContentLoadedEventEnd = navigation.domContentLoadedEventEnd;
    }

    // First Paint y First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach(entry => {
      if (entry.name === 'first-paint') {
        this.metrics.performance.firstPaint = entry.startTime;
      }
      if (entry.name === 'first-contentful-paint') {
        this.metrics.performance.firstContentfulPaint = entry.startTime;
      }
    });
  }

  private captureResourceMetrics(): void {
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    const byType: { [key: string]: { count: number; size: number } } = {};

    resources.forEach(resource => {
      const resourceEntry = resource as PerformanceResourceTiming;
      const size = resourceEntry.transferSize || 0;
      totalSize += size;

      const type = this.getResourceType(resourceEntry.name);
      if (!byType[type]) {
        byType[type] = { count: 0, size: 0 };
      }
      byType[type].count++;
      byType[type].size += size;
    });

    this.metrics.resources.totalSize = totalSize;
    this.metrics.resources.totalRequests = resources.length;
    this.metrics.resources.byType = byType;

    // Capturar métricas adicionales de recursos
    this.captureDetailedResourceMetrics();
  }

  private captureDetailedResourceMetrics(): void {
    // Contar nodos DOM
    this.metrics.resources.domNodes = document.querySelectorAll('*').length;
    
    // Contar scripts
    this.metrics.resources.scripts = document.querySelectorAll('script').length;
    
    // Contar stylesheets
    this.metrics.resources.stylesheets = document.querySelectorAll('link[rel="stylesheet"], style').length;
    
    // Contar imágenes
    this.metrics.resources.images = document.querySelectorAll('img').length;
    
    // Contar fuentes
    this.metrics.resources.fonts = document.querySelectorAll('link[rel="preload"][as="font"], link[rel="stylesheet"][href*="font"]').length;
    
    // Estimación de event listeners (aproximación)
    this.metrics.resources.eventListeners = this.estimateEventListeners();
  }

  private estimateEventListeners(): number {
    // Estimación basada en elementos interactivos
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [onclick], [onmouseover], [onmouseenter]');
    return interactiveElements.length;
  }

  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'css':
        return 'stylesheet';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'webp':
      case 'svg':
        return 'image';
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'eot':
        return 'font';
      default:
        return 'other';
    }
  }

  private captureMemoryMetrics(): void {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      this.metrics.memory.usedJSHeapSize = memory.usedJSHeapSize;
      this.metrics.memory.totalJSHeapSize = memory.totalJSHeapSize;
      this.metrics.memory.jsHeapSizeLimit = memory.jsHeapSizeLimit;
      
      // Calcular porcentaje de uso de memoria
      this.metrics.memory.memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      this.metrics.memory.availableMemory = memory.jsHeapSizeLimit - memory.usedJSHeapSize;
    }
  }

  private captureCPUMetrics(): void {
    // Estimación de CPU basada en performance
    this.metrics.cpu.cores = navigator.hardwareConcurrency || 0;
    
    // Estimación de uso de CPU basada en tiempo de carga
    const loadTime = performance.now() - this.startTime;
    this.metrics.cpu.loadTime = loadTime;
    
    // Estimación simple de uso de CPU
    this.metrics.cpu.usage = Math.min(100, (loadTime / 1000) * 10); // Estimación basada en tiempo de carga
  }

  private async captureBatteryMetrics(): Promise<void> {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        this.metrics.battery = {
          level: battery.level * 100,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        };
      } catch (error) {
        console.warn('Battery API not available:', error);
      }
    }
  }

  private captureConsumptionMetrics(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      this.metrics.consumption.totalLoadTime = navigation.loadEventEnd - navigation.startTime;
      this.metrics.consumption.timeToFirstByte = navigation.responseStart - navigation.requestStart;
      this.metrics.consumption.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.startTime;
      this.metrics.consumption.windowLoad = navigation.loadEventEnd - navigation.startTime;
    }

    // Capturar métricas de recursos
    const resources = performance.getEntriesByType('resource');
    let totalResourceLoadTime = 0;
    resources.forEach(resource => {
      const resourceEntry = resource as PerformanceResourceTiming;
      totalResourceLoadTime += resourceEntry.duration || 0;
    });
    this.metrics.consumption.resourceLoadTime = totalResourceLoadTime;

    // Estimaciones de tiempo de renderizado
    this.metrics.consumption.scriptExecutionTime = this.estimateScriptExecutionTime();
    this.metrics.consumption.styleCalculationTime = this.estimateStyleCalculationTime();
    this.metrics.consumption.layoutTime = this.estimateLayoutTime();
    this.metrics.consumption.paintTime = this.estimatePaintTime();
    this.metrics.consumption.compositeTime = this.estimateCompositeTime();
  }

  private estimateScriptExecutionTime(): number {
    // Estimación basada en scripts cargados
    const scripts = document.querySelectorAll('script');
    return scripts.length * 50; // Estimación de 50ms por script
  }

  private estimateStyleCalculationTime(): number {
    // Estimación basada en estilos
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    return styles.length * 30; // Estimación de 30ms por stylesheet
  }

  private estimateLayoutTime(): number {
    // Estimación basada en elementos DOM
    const elements = document.querySelectorAll('*');
    return elements.length * 0.1; // Estimación de 0.1ms por elemento
  }

  private estimatePaintTime(): number {
    // Estimación basada en área de viewport
    const area = window.innerWidth * window.innerHeight;
    return area / 10000; // Estimación basada en área
  }

  private estimateCompositeTime(): number {
    // Estimación basada en elementos con transformaciones
    const transformedElements = document.querySelectorAll('[style*="transform"], [style*="animation"]');
    return transformedElements.length * 5; // Estimación de 5ms por elemento transformado
  }

  private captureNetworkMetrics(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        this.metrics.network.effectiveType = connection.effectiveType || 'unknown';
        this.metrics.network.downlink = connection.downlink || 0;
        this.metrics.network.rtt = connection.rtt || 0;
        this.metrics.network.connectionType = connection.type || 'unknown';
        this.metrics.network.saveData = (connection as any).saveData || false;
      }
    }
  }

  private setupErrorListener(): void {
    this.errorListener = (event: ErrorEvent) => {
      this.metrics.errors.push({
        message: event.message,
        filename: event.filename || 'unknown',
        lineno: event.lineno || 0,
        colno: event.colno || 0,
        timestamp: Date.now(),
      });
    };
    window.addEventListener('error', this.errorListener);
  }

  private setupVisibilityListener(): void {
    this.visibilityListener = () => {
      this.metrics.pageVisibility.isVisible = !document.hidden;
      if (document.hidden) {
        this.metrics.pageVisibility.timeHidden = Date.now();
      } else {
        this.metrics.pageVisibility.timeVisible = Date.now();
      }
    };
    document.addEventListener('visibilitychange', this.visibilityListener);
  }

  private setupInteractionListener(): void {
    this.interactionListener = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target) {
        this.metrics.userInteractions.push({
          type: event.type,
          target: target.tagName.toLowerCase() + (target.id ? `#${target.id}` : '') + (target.className ? `.${target.className.split(' ')[0]}` : ''),
          timestamp: Date.now(),
        });
      }
    };
    
    // Capturar interacciones principales
    const eventTypes = ['click', 'scroll', 'input', 'focus', 'blur'] as const;
    eventTypes.forEach(eventType => {
      if (this.interactionListener) {
        document.addEventListener(eventType, this.interactionListener as EventListener, true);
      }
    });
  }

  private async captureWebVitals(): Promise<void> {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      
      getCLS((metric) => {
        this.metrics.performance.cumulativeLayoutShift = metric.value;
      });
      
      getFID((metric) => {
        this.metrics.performance.firstInputDelay = metric.value;
      });
      
      getFCP((metric) => {
        this.metrics.performance.firstContentfulPaint = metric.value;
      });
      
      getLCP((metric) => {
        this.metrics.performance.largestContentfulPaint = metric.value;
      });
      
      getTTFB((metric) => {
        this.metrics.performance.timeToInteractive = metric.value;
      });
    } catch (error) {
      console.warn('Web Vitals not available:', error);
    }
  }

  public stopMonitoring(): void {
    if (!this.isMonitoring) return;
    
    this.isMonitoring = false;
    
    // Remover listeners
    if (this.errorListener) {
      window.removeEventListener('error', this.errorListener);
    }
    if (this.visibilityListener) {
      document.removeEventListener('visibilitychange', this.visibilityListener);
    }
    if (this.interactionListener) {
      const eventTypes = ['click', 'scroll', 'input', 'focus', 'blur'] as const;
      eventTypes.forEach(eventType => {
        document.removeEventListener(eventType, this.interactionListener as EventListener, true);
      });
    }
    
    // console.log('🛑 Performance monitoring stopped');
  }

  public getMetrics(): PerformanceMetrics {
    // Actualizar timestamp
    this.metrics.timestamp = Date.now();
    
    // Actualizar métricas de performance
    this.capturePerformanceMetrics();
    this.captureResourceMetrics();
    this.captureMemoryMetrics();
    this.captureCPUMetrics();
    this.captureConsumptionMetrics();
    this.captureNetworkMetrics();
    
    return { ...this.metrics };
  }

  public exportToJSON(): string {
    const metrics = this.getMetrics();
    return JSON.stringify(metrics, null, 2);
  }

  public downloadMetrics(filename: string = 'performance-metrics.json'): void {
    const json = this.exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public logMetrics(): void {
    const metrics = this.getMetrics();
    // console.log('📊 Performance Metrics:', metrics);
  }
}

// Instancia global
export const performanceMonitor = new PerformanceMonitor();

// Función de utilidad para iniciar el monitoreo automáticamente
export const startPerformanceMonitoring = (): void => {
  performanceMonitor.startMonitoring();
};

// Función de utilidad para obtener métricas
export const getPerformanceMetrics = (): PerformanceMetrics => {
  return performanceMonitor.getMetrics();
};

// Función de utilidad para exportar a JSON
export const exportPerformanceMetrics = (): string => {
  return performanceMonitor.exportToJSON();
};

// Función de utilidad para descargar métricas
export const downloadPerformanceMetrics = (filename?: string): void => {
  performanceMonitor.downloadMetrics(filename);
};

export type { PerformanceMetrics }; 