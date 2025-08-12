/**
 * Sistema Completo de Tracking de Usuario
 * Captura ABSOLUTAMENTE TODO lo que hace el usuario en la página web
 */

import backendClient from './backendClient';

class UserTrackingSystem {
  constructor() {
    this.isActive = false;
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.userActions = [];
    this.mousePath = [];
    this.scrollEvents = [];
    this.keyboardEvents = [];
    this.touchEvents = [];
    this.attentionZones = new Map();
    this.formInteractions = new Map();
    this.pageInteractions = new Map();
    
    // Configuración
    this.config = {
      trackMouse: true,
      trackKeyboard: true,
      trackScroll: true,
      trackTouch: true,
      trackAttention: true,
      trackForms: true,
      trackNavigation: true,
      trackErrors: true,
      trackPerformance: true,
      batchSize: 50, // Enviar datos cada 50 acciones
      flushInterval: 10000, // Enviar datos cada 10 segundos
    };

    this.init();
  }

  // Generar ID único de sesión
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Inicializar el sistema
  init() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.setupEventListeners();
    this.startPeriodicFlush();
    
    console.log('🚀 Sistema de tracking de usuario iniciado');
  }

  // Configurar todos los event listeners
  setupEventListeners() {
    // Mouse events
    if (this.config.trackMouse) {
      this.setupMouseTracking();
    }

    // Keyboard events
    if (this.config.trackKeyboard) {
      this.setupKeyboardTracking();
    }

    // Scroll events
    if (this.config.trackScroll) {
      this.setupScrollTracking();
    }

    // Touch events
    if (this.config.trackTouch) {
      this.setupTouchTracking();
    }

    // Form events
    if (this.config.trackForms) {
      this.setupFormTracking();
    }

    // Navigation events
    if (this.config.trackNavigation) {
      this.setupNavigationTracking();
    }

    // Error events
    if (this.config.trackErrors) {
      this.setupErrorTracking();
    }

    // Performance events
    if (this.config.trackPerformance) {
      this.setupPerformanceTracking();
    }

    // Page visibility
    this.setupPageVisibilityTracking();
  }

  // Tracking del mouse
  setupMouseTracking() {
    let mouseMoveTimeout;
    let lastMousePosition = { x: 0, y: 0 };
    let mousePath = [];
    let isMoving = false;

    // Mouse move (optimizado para no saturar)
    document.addEventListener('mousemove', (e) => {
      if (mouseMoveTimeout) clearTimeout(mouseMoveTimeout);
      
      const currentPos = { x: e.clientX, y: e.clientY, timestamp: Date.now() };
      
      // Solo registrar si se movió significativamente
      if (Math.abs(currentPos.x - lastMousePosition.x) > 5 || 
          Math.abs(currentPos.y - lastMousePosition.y) > 5) {
        
        mousePath.push(currentPos);
        lastMousePosition = currentPos;
        
        if (!isMoving) {
          isMoving = true;
          this.recordAction('mouse_start_moving', { position: currentPos });
        }
      }

      // Limpiar path cada 100 puntos para no saturar memoria
      if (mousePath.length > 100) {
        mousePath = mousePath.slice(-50);
      }

      mouseMoveTimeout = setTimeout(() => {
        if (isMoving) {
          isMoving = false;
          this.recordAction('mouse_stop_moving', { 
            path: mousePath,
            duration: Date.now() - mousePath[0]?.timestamp || 0
          });
          mousePath = [];
        }
      }, 1000);
    });

    // Clics
    document.addEventListener('click', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'click',
        element: this.getElementInfo(target),
        position: { x: e.clientX, y: e.clientY },
        timestamp: Date.now(),
        button: e.button, // 0: izquierdo, 1: medio, 2: derecho
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey
      };

      this.recordAction('click', action);
    });

    // Doble clic
    document.addEventListener('dblclick', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'double_click',
        element: this.getElementInfo(target),
        position: { x: e.clientX, y: e.clientY },
        timestamp: Date.now()
      };

      this.recordAction('double_click', action);
    });

    // Clic derecho
    document.addEventListener('contextmenu', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'right_click',
        element: this.getElementInfo(target),
        position: { x: e.clientX, y: e.clientY },
        timestamp: Date.now()
      };

      this.recordAction('right_click', action);
    });

    // Hover
    document.addEventListener('mouseenter', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'mouse_enter',
        element: this.getElementInfo(target),
        timestamp: Date.now()
      };

      this.recordAction('mouse_enter', action);
    });

    document.addEventListener('mouseleave', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'mouse_leave',
        element: this.getElementInfo(target),
        timestamp: Date.now()
      };

      this.recordAction('mouse_leave', action);
    });
  }

  // Tracking del teclado
  setupKeyboardTracking() {
    let keyBuffer = '';
    let lastKeyTime = Date.now();

    // Keydown
    document.addEventListener('keydown', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'keydown',
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        timestamp: Date.now(),
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
        repeat: e.repeat,
        element: this.getElementInfo(target)
      };

      this.recordAction('keydown', action);

      // Buffer de teclas para detectar palabras
      if (e.key.length === 1 && !e.ctrlKey && !e.altKey) {
        keyBuffer += e.key;
        
        // Enviar buffer cada 2 segundos o cuando sea muy largo
        if (Date.now() - lastKeyTime > 2000 || keyBuffer.length > 50) {
          if (keyBuffer.length > 3) {
            this.recordAction('key_buffer', { 
              buffer: keyBuffer,
              length: keyBuffer.length,
              timestamp: Date.now()
            });
          }
          keyBuffer = '';
          lastKeyTime = Date.now();
        }
      }
    });

    // Keyup
    document.addEventListener('keyup', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'keyup',
        key: e.key,
        code: e.code,
        timestamp: Date.now(),
        element: this.getElementInfo(target)
      };

      this.recordAction('keyup', action);
    });

    // Input events
    document.addEventListener('input', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'input',
        element: this.getElementInfo(target),
        value: target.value,
        valueLength: target.value.length,
        timestamp: Date.now(),
        inputType: target.type || 'text'
      };

      this.recordAction('input', action);
    });

    // Change events
    document.addEventListener('change', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'change',
        element: this.getElementInfo(target),
        oldValue: target.defaultValue,
        newValue: target.value,
        timestamp: Date.now()
      };

      this.recordAction('change', action);
    });
  }

  // Tracking del scroll
  setupScrollTracking() {
    let scrollTimeout;
    let scrollStartTime = Date.now();
    let scrollStartPosition = { x: window.pageXOffset, y: window.pageYOffset };
    let isScrolling = false;

    // Scroll event
    window.addEventListener('scroll', (e) => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      const currentPosition = { 
        x: window.pageXOffset, 
        y: window.pageYOffset 
      };

      if (!isScrolling) {
        isScrolling = true;
        scrollStartTime = Date.now();
        scrollStartPosition = { ...currentPosition };
      }

      // Detectar dirección y velocidad
      const deltaX = currentPosition.x - scrollStartPosition.x;
      const deltaY = currentPosition.y - scrollStartPosition.y;
      const direction = {
        x: deltaX > 0 ? 'right' : deltaX < 0 ? 'left' : 'none',
        y: deltaY > 0 ? 'down' : deltaY < 0 ? 'up' : 'none'
      };

      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'scroll',
        position: currentPosition,
        direction: direction,
        delta: { x: deltaX, y: deltaY },
        timestamp: Date.now(),
        element: this.getElementInfo(target)
      };

      this.recordAction('scroll', action);

      // Detectar cuando se detiene el scroll
      scrollTimeout = setTimeout(() => {
        if (isScrolling) {
          isScrolling = false;
          const scrollDuration = Date.now() - scrollStartTime;
          
          this.recordAction('scroll_stop', {
            duration: scrollDuration,
            startPosition: scrollStartPosition,
            endPosition: currentPosition,
            totalDelta: { x: deltaX, y: deltaY },
            timestamp: Date.now()
          });
        }
      }, 150);
    });

    // Scroll en elementos específicos
    document.addEventListener('scroll', (e) => {
      if (e.target !== document && e.target !== window) {
        const target = e.target;
        
        // Verificar que el target sea un elemento DOM válido
        if (!target || !target.tagName) {
          return;
        }
        
        const action = {
          type: 'element_scroll',
          element: this.getElementInfo(target),
          scrollTop: target.scrollTop,
          scrollLeft: target.scrollLeft,
          scrollHeight: target.scrollHeight,
          scrollWidth: target.scrollWidth,
          timestamp: Date.now()
        };

        this.recordAction('element_scroll', action);
      }
    }, true);
  }

  // Tracking de touch (móviles/tablets)
  setupTouchTracking() {
    // Touch start
    document.addEventListener('touchstart', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const touches = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      }));

      const action = {
        type: 'touch_start',
        touches: touches,
        touchCount: e.touches.length,
        timestamp: Date.now(),
        element: this.getElementInfo(target)
      };

      this.recordAction('touch_start', action);
    });

    // Touch move
    document.addEventListener('touchmove', (e) => {
      const touches = Array.from(e.touches).map(touch => ({
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now()
      }));

      const action = {
        type: 'touch_move',
        touches: touches,
        touchCount: e.touches.length,
        timestamp: Date.now()
      };

      this.recordAction('touch_move', action);
    });

    // Touch end
    document.addEventListener('touchend', (e) => {
      const action = {
        type: 'touch_end',
        touchCount: e.changedTouches.length,
        timestamp: Date.now()
      };

      this.recordAction('touch_end', action);
    });

    // Gestos específicos
    let touchStartTime = 0;
    let touchStartPosition = { x: 0, y: 0 };

    document.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      touchStartPosition = { 
        x: e.touches[0].clientX, 
        y: e.touches[0].clientY 
      };
    });

    document.addEventListener('touchend', (e) => {
      const touchEndTime = Date.now();
      const touchEndPosition = { 
        x: e.changedTouches[0].clientX, 
        y: e.changedTouches[0].clientY 
      };

      const duration = touchEndTime - touchStartTime;
      const distance = Math.sqrt(
        Math.pow(touchEndPosition.x - touchStartPosition.x, 2) +
        Math.pow(touchEndPosition.y - touchStartPosition.y, 2)
      );

      // Detectar tipo de gesto
      let gestureType = 'tap';
      if (duration > 500) gestureType = 'long_press';
      if (distance > 50) gestureType = 'swipe';
      if (e.touches.length > 1) gestureType = 'multi_touch';

      const action = {
        type: 'gesture',
        gestureType: gestureType,
        duration: duration,
        distance: distance,
        startPosition: touchStartPosition,
        endPosition: touchEndPosition,
        timestamp: Date.now()
      };

      this.recordAction('gesture', action);
    });
  }

  // Tracking de formularios
  setupFormTracking() {
    // Focus en campos
    document.addEventListener('focusin', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const action = {
          type: 'field_focus',
          element: this.getElementInfo(target),
          timestamp: Date.now()
        };

        this.recordAction('field_focus', action);
        this.startFieldTracking(target);
      }
    });

    // Blur en campos
    document.addEventListener('focusout', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const action = {
          type: 'field_blur',
          element: this.getElementInfo(target),
          timestamp: Date.now()
        };

        this.recordAction('field_blur', action);
        this.stopFieldTracking(target);
      }
    });

    // Submit de formularios
    document.addEventListener('submit', (e) => {
      const form = e.target;
      const formData = new FormData(form);
      const fields = Array.from(formData.entries()).map(([key, value]) => ({
        name: key,
        value: typeof value === 'string' ? value.substring(0, 100) : 'file', // Limitar longitud
        type: form.elements[key]?.type || 'text'
      }));

      const action = {
        type: 'form_submit',
        form: this.getElementInfo(form),
        fields: fields,
        fieldCount: fields.length,
        timestamp: Date.now()
      };

      this.recordAction('form_submit', action);
    });

    // Validación de formularios
    document.addEventListener('invalid', (e) => {
      const target = e.target;
      
      // Verificar que el target sea un elemento DOM válido
      if (!target || !target.tagName) {
        return;
      }
      
      const action = {
        type: 'validation_error',
        element: this.getElementInfo(target),
        validationMessage: target.validationMessage,
        timestamp: Date.now()
      };

      this.recordAction('validation_error', action);
    });
  }

  // Tracking de navegación
  setupNavigationTracking() {
    // Cambios de ruta (SPA)
    let currentUrl = window.location.href;
    
    const checkUrlChange = () => {
      if (window.location.href !== currentUrl) {
        const oldUrl = currentUrl;
        currentUrl = window.location.href;
        
        const action = {
          type: 'navigation',
          from: oldUrl,
          to: currentUrl,
          timestamp: Date.now()
        };

        this.recordAction('navigation', action);
      }
    };

    // Verificar cambios de URL cada 100ms
    setInterval(checkUrlChange, 100);

    // Popstate (navegación con botones del navegador)
    window.addEventListener('popstate', (e) => {
      const action = {
        type: 'popstate',
        url: window.location.href,
        state: e.state,
        timestamp: Date.now()
      };

      this.recordAction('popstate', action);
    });

    // Beforeunload (antes de cerrar la página)
    window.addEventListener('beforeunload', (e) => {
      const action = {
        type: 'page_exit',
        url: window.location.href,
        timestamp: Date.now()
      };

      this.recordAction('page_exit', action);
      this.flushData(); // Enviar datos antes de cerrar
    });
  }

  // Tracking de errores
  setupErrorTracking() {
    // JavaScript errors
    window.addEventListener('error', (e) => {
      const action = {
        type: 'javascript_error',
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error?.stack || 'No stack trace',
        timestamp: Date.now()
      };

      this.recordAction('javascript_error', action);
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      const action = {
        type: 'promise_rejection',
        reason: e.reason?.toString() || 'Unknown reason',
        timestamp: Date.now()
      };

      this.recordAction('promise_rejection', action);
    });

    // Resource loading errors
    window.addEventListener('error', (e) => {
      if (e.target !== window) {
        const target = e.target;
        
        // Verificar que el target sea un elemento DOM válido
        if (!target || !target.tagName) {
          return;
        }
        
        const action = {
          type: 'resource_error',
          element: this.getElementInfo(target),
          url: target.src || target.href,
          timestamp: Date.now()
        };

        this.recordAction('resource_error', action);
      }
    }, true);
  }

  // Tracking de rendimiento
  setupPerformanceTracking() {
    // Performance marks
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const action = {
            type: 'performance_mark',
            name: entry.name,
            startTime: entry.startTime,
            duration: entry.duration,
            timestamp: Date.now()
          };

          this.recordAction('performance_mark', action);
        }
      });

      observer.observe({ entryTypes: ['measure'] });
    }

    // Long tasks
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) { // Solo tareas largas
            const action = {
              type: 'long_task',
              duration: entry.duration,
              startTime: entry.startTime,
              timestamp: Date.now()
            };

            this.recordAction('long_task', action);
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });
    }
  }

  // Tracking de visibilidad de página
  setupPageVisibilityTracking() {
    let isVisible = true;
    let lastVisibilityChange = Date.now();

    document.addEventListener('visibilitychange', () => {
      const now = Date.now();
      const wasVisible = isVisible;
      isVisible = !document.hidden;

      if (wasVisible !== isVisible) {
        const action = {
          type: 'visibility_change',
          from: wasVisible ? 'visible' : 'hidden',
          to: isVisible ? 'visible' : 'hidden',
          duration: now - lastVisibilityChange,
          timestamp: now
        };

        this.recordAction('visibility_change', action);
        lastVisibilityChange = now;
      }
    });
  }

  // Tracking de campos específicos
  startFieldTracking(field) {
    // Verificar que el campo sea un elemento DOM válido
    if (!field || !field.tagName) {
      return;
    }
    
    const fieldInfo = this.getElementInfo(field);
    const fieldId = fieldInfo.id || fieldInfo.tagName;
    
    if (!this.formInteractions.has(fieldId)) {
      this.formInteractions.set(fieldId, {
        focusTime: Date.now(),
        keystrokes: 0,
        corrections: 0,
        valueChanges: 0
      });
    }
  }

  stopFieldTracking(field) {
    // Verificar que el campo sea un elemento DOM válido
    if (!field || !field.tagName) {
      return;
    }
    
    const fieldInfo = this.getElementInfo(field);
    const fieldId = fieldInfo.id || fieldInfo.tagName;
    const interaction = this.formInteractions.get(fieldId);
    
    if (interaction) {
      const duration = Date.now() - interaction.focusTime;
      
      const action = {
        type: 'field_interaction_summary',
        element: fieldInfo,
        duration: duration,
        keystrokes: interaction.keystrokes,
        corrections: interaction.corrections,
        valueChanges: interaction.valueChanges,
        timestamp: Date.now()
      };

      this.recordAction('field_interaction_summary', action);
      this.formInteractions.delete(fieldId);
    }
  }

  // Obtener información detallada de un elemento
  getElementInfo(element) {
    if (!element) return null;
    
    // Verificar si es un elemento DOM válido
    if (!element.getAttribute || typeof element.getAttribute !== 'function') {
      // Si no es un elemento DOM válido, devolver información básica
      return {
        tagName: 'unknown',
        id: null,
        className: null,
        type: null,
        name: null,
        value: null,
        textContent: null,
        href: null,
        src: null,
        role: null,
        ariaLabel: null,
        dataAttributes: {},
        position: { x: 0, y: 0, width: 0, height: 0 },
        size: { width: 0, height: 0 }
      };
    }

    return {
      tagName: element.tagName?.toLowerCase(),
      id: element.id || null,
      className: element.className || null,
      type: element.type || null,
      name: element.name || null,
      value: element.value || null,
      textContent: element.textContent?.substring(0, 100) || null, // Limitar longitud
      href: element.href || null,
      src: element.src || null,
      role: element.getAttribute('role') || null,
      ariaLabel: element.getAttribute('aria-label') || null,
      dataAttributes: this.getDataAttributes(element),
      position: this.getElementPosition(element),
      size: this.getElementSize(element)
    };
  }

  // Obtener atributos data-*
  getDataAttributes(element) {
    try {
      if (!element || !element.attributes || !element.attributes.length) {
        return {};
      }
      
      const dataAttrs = {};
      for (let attr of element.attributes) {
        if (attr.name && attr.name.startsWith('data-')) {
          dataAttrs[attr.name] = attr.value;
        }
      }
      return dataAttrs;
    } catch (error) {
      console.warn('Error al obtener atributos data del elemento:', error);
      return {};
    }
  }

  // Obtener posición del elemento
  getElementPosition(element) {
    try {
      if (!element || !element.getBoundingClientRect || typeof element.getBoundingClientRect !== 'function') {
        return { x: 0, y: 0, width: 0, height: 0 };
      }
      
      const rect = element.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      };
    } catch (error) {
      console.warn('Error al obtener posición del elemento:', error);
      return { x: 0, y: 0, width: 0, height: 0 };
    }
  }

  // Obtener tamaño del elemento
  getElementSize(element) {
    try {
      if (!element || !element.getBoundingClientRect || typeof element.getBoundingClientRect !== 'function') {
        return { width: 0, height: 0 };
      }
      
      const rect = element.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height
      };
    } catch (error) {
      console.warn('Error al obtener tamaño del elemento:', error);
      return { width: 0, height: 0 };
    }
  }

  // Registrar una acción
  recordAction(actionType, actionData) {
    const action = {
      id: this.generateActionId(),
      type: actionType,
      data: actionData,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      pageUrl: window.location.href,
      pageTitle: document.title,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };

    this.userActions.push(action);

    // Enviar datos cuando se alcance el límite
    if (this.userActions.length >= this.config.batchSize) {
      this.flushData();
    }

    // Debug en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 User Action:', action);
    }
  }

  // Generar ID único para acción
  generateActionId() {
    return 'action_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Enviar datos al backend
  async flushData() {
    if (this.userActions.length === 0) return;

    try {
      const actionsToSend = [...this.userActions];
      this.userActions = [];

      // Enviar al backend
      await backendClient.trackUserActions({
        sessionId: this.sessionId,
        actions: actionsToSend,
        summary: this.generateSessionSummary(),
        timestamp: Date.now()
      });

      console.log(`📤 Enviadas ${actionsToSend.length} acciones al backend`);
    } catch (error) {
      console.error('❌ Error al enviar acciones:', error);
      // Reintroducir las acciones para el próximo intento
      this.userActions.unshift(...this.userActions);
    }
  }

  // Generar resumen de la sesión
  generateSessionSummary() {
    const now = Date.now();
    const sessionDuration = now - this.startTime;
    
    const actionCounts = {};
    this.userActions.forEach(action => {
      actionCounts[action.type] = (actionCounts[action.type] || 0) + 1;
    });

    return {
      sessionDuration,
      totalActions: this.userActions.length,
      actionBreakdown: actionCounts,
      startTime: this.startTime,
      endTime: now
    };
  }

  // Iniciar envío periódico
  startPeriodicFlush() {
    setInterval(() => {
      this.flushData();
    }, this.config.flushInterval);
  }

  // Detener el tracking
  stop() {
    this.isActive = false;
    this.flushData();
    console.log('🛑 Sistema de tracking detenido');
  }

  // Obtener estadísticas en tiempo real
  getStats() {
    return {
      isActive: this.isActive,
      sessionId: this.sessionId,
      sessionDuration: Date.now() - this.startTime,
      totalActions: this.userActions.length,
      pendingActions: this.userActions.length
    };
  }
}

// Crear instancia singleton
const userTrackingSystem = new UserTrackingSystem();

export default userTrackingSystem;
