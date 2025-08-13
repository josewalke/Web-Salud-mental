# 📊 Sistema de Monitoreo de Performance

## 🎯 Descripción

Este sistema de monitoreo captura métricas de rendimiento en tiempo real de la aplicación web de salud mental, permitiendo analizar el consumo de recursos, comportamiento del usuario y métricas de performance.

## 🚀 Características

### 📈 Métricas Capturadas

#### Performance
- **First Paint (FP)**: Tiempo hasta el primer pixel visible
- **First Contentful Paint (FCP)**: Tiempo hasta el primer contenido visible
- **Largest Contentful Paint (LCP)**: Tiempo hasta el elemento más grande visible
- **First Input Delay (FID)**: Tiempo de respuesta a la primera interacción
- **Cumulative Layout Shift (CLS)**: Estabilidad visual de la página
- **Time to Interactive (TTI)**: Tiempo hasta que la página es interactiva

#### Recursos
- **Total Size**: Tamaño total de recursos cargados
- **Total Requests**: Número total de peticiones
- **By Type**: Desglose por tipo (JS, CSS, imágenes, fuentes, etc.)

#### Memoria
- **Used JS Heap Size**: Memoria JavaScript utilizada
- **Total JS Heap Size**: Memoria JavaScript total
- **JS Heap Size Limit**: Límite de memoria JavaScript
- **Usage Percentage**: Porcentaje de uso de memoria

#### Red
- **Effective Type**: Tipo de conexión efectiva
- **Downlink**: Velocidad de descarga
- **RTT**: Tiempo de ida y vuelta

#### Usuario
- **Interacciones**: Clicks, scrolls, inputs, focus, blur
- **Visibilidad**: Tiempo visible/oculto de la página
- **Errores**: Errores JavaScript capturados

## 🛠️ Uso

### Activación del Monitor

1. **Botón Flotante**: Haz clic en el botón 📊 en la esquina inferior izquierda
2. **Interfaz Visual**: Se abrirá un panel con todas las métricas
3. **Modo Automático**: Activa la actualización automática cada 5 segundos
4. **Exportación**: Descarga las métricas en formato JSON

### API Programática

```typescript
import { 
  startPerformanceMonitoring, 
  getPerformanceMetrics, 
  exportPerformanceMetrics,
  downloadPerformanceMetrics 
} from './utils/performanceMonitor';

// Iniciar monitoreo
startPerformanceMonitoring();

// Obtener métricas actuales
const metrics = getPerformanceMetrics();

// Exportar a JSON
const json = exportPerformanceMetrics();

// Descargar métricas
downloadPerformanceMetrics('mi-metrica.json');
```

## 📊 Estructura del JSON

```json
{
  "timestamp": 1703123456789,
  "url": "https://mi-app.com",
  "userAgent": "Mozilla/5.0...",
  "viewport": {
    "width": 1920,
    "height": 1080
  },
  "performance": {
    "navigationStart": 0,
    "loadEventEnd": 2500,
    "domContentLoadedEventEnd": 1800,
    "firstPaint": 1200,
    "firstContentfulPaint": 1500,
    "largestContentfulPaint": 2800,
    "firstInputDelay": 45,
    "cumulativeLayoutShift": 0.05,
    "timeToInteractive": 3200,
    "totalBlockingTime": 150
  },
  "resources": {
    "totalSize": 1456789,
    "totalRequests": 25,
    "byType": {
      "javascript": {
        "count": 8,
        "size": 789456
      },
      "stylesheet": {
        "count": 3,
        "size": 123456
      },
      "image": {
        "count": 12,
        "size": 456789
      }
    }
  },
  "memory": {
    "usedJSHeapSize": 45678912,
    "totalJSHeapSize": 67890123,
    "jsHeapSizeLimit": 2147483648
  },
  "errors": [
    {
      "message": "Error en componente",
      "filename": "app.js",
      "lineno": 123,
      "colno": 45,
      "timestamp": 1703123456789
    }
  ],
  "userInteractions": [
    {
      "type": "click",
      "target": "button.primary",
      "timestamp": 1703123456789
    }
  ],
  "pageVisibility": {
    "isVisible": true,
    "timeVisible": 1703123456789,
    "timeHidden": 0
  },
  "network": {
    "effectiveType": "4g",
    "downlink": 10.5,
    "rtt": 50
  }
}
```

## 🎯 Casos de Uso

### 1. Análisis de Performance
```typescript
// Verificar si la página cumple con Core Web Vitals
const metrics = getPerformanceMetrics();
const isGoodPerformance = 
  metrics.performance.largestContentfulPaint < 2500 &&
  metrics.performance.firstInputDelay < 100 &&
  metrics.performance.cumulativeLayoutShift < 0.1;
```

### 2. Monitoreo de Recursos
```typescript
// Verificar el tamaño total de recursos
const metrics = getPerformanceMetrics();
const totalSizeMB = metrics.resources.totalSize / (1024 * 1024);
console.log(`Tamaño total: ${totalSizeMB.toFixed(2)} MB`);
```

### 3. Análisis de Errores
```typescript
// Contar errores por tipo
const metrics = getPerformanceMetrics();
const errorCount = metrics.errors.length;
if (errorCount > 0) {
  console.warn(`Se encontraron ${errorCount} errores`);
}
```

### 4. Tracking de Usuario
```typescript
// Analizar interacciones del usuario
const metrics = getPerformanceMetrics();
const clickCount = metrics.userInteractions.filter(i => i.type === 'click').length;
console.log(`Usuario hizo ${clickCount} clicks`);
```

## 🔧 Configuración

### Variables de Entorno

```env
# Habilitar monitoreo detallado
REACT_APP_PERFORMANCE_MONITORING=true

# Intervalo de actualización automática (ms)
REACT_APP_MONITORING_INTERVAL=5000
```

### Personalización

```typescript
// Configurar tipos de recursos personalizados
class CustomPerformanceMonitor extends PerformanceMonitor {
  private getResourceType(url: string): string {
    // Lógica personalizada para clasificar recursos
    if (url.includes('api')) return 'api';
    if (url.includes('cdn')) return 'cdn';
    return super.getResourceType(url);
  }
}
```

## 📈 Métricas de Referencia

### Objetivos de Performance
- **LCP**: < 2.5s (Excelente)
- **FID**: < 100ms (Excelente)
- **CLS**: < 0.1 (Excelente)
- **FCP**: < 1.8s (Excelente)
- **TTI**: < 3.8s (Excelente)

### Objetivos de Recursos
- **Total Size**: < 1MB (Móvil), < 2MB (Desktop)
- **Total Requests**: < 50
- **JS Size**: < 500KB
- **CSS Size**: < 100KB

### Objetivos de Memoria
- **Usage %**: < 80%
- **Heap Growth**: < 10% por minuto

## 🚨 Alertas y Notificaciones

### Alertas Automáticas
```typescript
// Configurar alertas basadas en métricas
const metrics = getPerformanceMetrics();

// Alerta por performance pobre
if (metrics.performance.largestContentfulPaint > 4000) {
  console.warn('⚠️ LCP muy alto:', metrics.performance.largestContentfulPaint);
}

// Alerta por uso de memoria
if (metrics.memory.usedJSHeapSize / metrics.memory.jsHeapSizeLimit > 0.9) {
  console.warn('⚠️ Uso de memoria crítico:', 
    ((metrics.memory.usedJSHeapSize / metrics.memory.jsHeapSizeLimit) * 100).toFixed(1) + '%');
}
```

## 📊 Visualización

### Gráficos Recomendados
1. **Timeline de Performance**: LCP, FCP, FID a lo largo del tiempo
2. **Uso de Recursos**: Tamaño y número de requests por tipo
3. **Uso de Memoria**: Evolución del heap size
4. **Interacciones**: Heatmap de clicks y scrolls
5. **Errores**: Frecuencia y tipos de errores

### Herramientas de Visualización
- **Chart.js**: Para gráficos interactivos
- **D3.js**: Para visualizaciones avanzadas
- **Recharts**: Para gráficos en React
- **Plotly**: Para gráficos científicos

## 🔍 Debugging

### Logs de Desarrollo
```typescript
// Habilitar logs detallados en desarrollo
if (process.env.NODE_ENV === 'development') {
  performanceMonitor.logMetrics();
}
```

### Herramientas de Debug
- **Chrome DevTools**: Performance tab
- **Lighthouse**: Auditoría completa
- **WebPageTest**: Testing externo
- **GTmetrix**: Análisis de velocidad

## 📝 Notas de Implementación

### Consideraciones de Privacidad
- No capturar información personal
- Anonimizar datos de usuario
- Cumplir con GDPR/CCPA
- Obtener consentimiento si es necesario

### Consideraciones de Performance
- Monitoreo no debe afectar la performance
- Usar Web Workers para procesamiento pesado
- Implementar throttling para eventos frecuentes
- Limpiar listeners al desmontar

### Consideraciones de Compatibilidad
- Fallbacks para navegadores antiguos
- Detección de características disponibles
- Graceful degradation
- Testing cross-browser

## 🎯 Próximas Mejoras

### Funcionalidades Planificadas
1. **Real-time Dashboard**: Panel en tiempo real
2. **Alertas Automáticas**: Notificaciones por email/Slack
3. **Historical Data**: Almacenamiento de métricas históricas
4. **A/B Testing**: Comparación de métricas entre versiones
5. **Machine Learning**: Predicción de problemas de performance

### Integraciones
1. **Google Analytics**: Sincronización con GA4
2. **Sentry**: Integración con error tracking
3. **New Relic**: Monitoreo de APM
4. **Datadog**: Logs y métricas
5. **Slack**: Notificaciones automáticas

---

## 📞 Soporte

Para preguntas o problemas con el sistema de monitoreo:

1. **Documentación**: Revisar este archivo
2. **Issues**: Crear issue en GitHub
3. **Discussions**: Usar GitHub Discussions
4. **Email**: Contactar al equipo de desarrollo

---

*Última actualización: Diciembre 2024* 