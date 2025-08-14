// ========================================
// 🚨 SCRIPT DE EMERGENCIA PARA DESHABILITAR SERVICE WORKERS
// ========================================
// 
// INSTRUCCIONES:
// 1. Abre DevTools (F12)
// 2. Ve a la pestaña Console
// 3. Copia y pega TODO este código
// 4. Presiona Enter
// 5. Recarga la página
//
// ========================================

console.log('🚨 INICIANDO DESHABILITACIÓN DE EMERGENCIA...');

// Función principal de deshabilitación
function emergencyDisable() {
  console.log('🔧 Ejecutando deshabilitación de emergencia...');
  
  if ('serviceWorker' in navigator) {
    console.log('📱 Navegador soporta Service Workers');
    
    // PASO 1: Desregistrar todos los Service Workers existentes
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      console.log(`📋 Encontrados ${registrations.length} Service Workers activos`);
      
      if (registrations.length > 0) {
        registrations.forEach(function(registration, index) {
          console.log(`🗑️ Desregistrando Service Worker ${index + 1}...`);
          registration.unregister();
        });
        console.log('✅ Todos los Service Workers desregistrados');
      } else {
        console.log('✅ No hay Service Workers activos');
      }
    }).catch(function(error) {
      console.log('❌ Error al desregistrar:', error);
    });
    
    // PASO 2: Limpiar todos los caches
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        console.log(`📋 Encontrados ${cacheNames.length} caches`);
        
        cacheNames.forEach(function(cacheName) {
          console.log(`🗑️ Eliminando cache: ${cacheName}`);
          caches.delete(cacheName);
        });
        console.log('✅ Todos los caches eliminados');
      }).catch(function(error) {
        console.log('❌ Error al limpiar caches:', error);
      });
    }
    
    // PASO 3: Bloquear futuros registros de Service Workers
    const originalRegister = navigator.serviceWorker.register;
    navigator.serviceWorker.register = function() {
      console.log('🚫 INTENTO DE REGISTRO BLOQUEADO');
      return Promise.reject(new Error('Service Worker deshabilitado por emergencia'));
    };
    console.log('✅ Registros futuros bloqueados');
    
    // PASO 4: Interceptar y bloquear mensajes
    navigator.serviceWorker.addEventListener('message', function(event) {
      console.log('🚫 Mensaje del Service Worker bloqueado:', event);
      event.preventDefault();
      event.stopPropagation();
      return false;
    });
    console.log('✅ Mensajes del Service Worker bloqueados');
    
    // PASO 5: Interceptar y bloquear fetch events
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'TERMINATE',
        message: 'Service Worker terminado por emergencia'
      });
      console.log('✅ Controlador del Service Worker terminado');
    }
    
  } else {
    console.log('✅ Este navegador no soporta Service Workers');
  }
}

// PASO 6: Ejecutar deshabilitación inmediatamente
emergencyDisable();

// PASO 7: Ejecutar cada 1 segundo para asegurar
const emergencyInterval = setInterval(emergencyDisable, 1000);

// PASO 8: Detener después de 10 segundos
setTimeout(function() {
  clearInterval(emergencyInterval);
  console.log('⏰ Intervalo de emergencia detenido');
}, 10000);

// PASO 9: Ejecutar en eventos importantes
window.addEventListener('load', emergencyDisable);
document.addEventListener('DOMContentLoaded', emergencyDisable);

console.log('🚨 SISTEMA DE EMERGENCIA ACTIVADO');
console.log('📝 Ahora recarga la página (Ctrl+Shift+R)');
console.log('🔍 Verifica en DevTools → Application → Service Workers que no haya ninguno activo');
