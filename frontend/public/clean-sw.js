// Script agresivo para deshabilitar Service Workers
console.log('🧹 Deshabilitando Service Workers de forma agresiva...');

// Función para limpiar Service Workers
function disableServiceWorkers() {
  if ('serviceWorker' in navigator) {
    // Desregistrar todos los Service Workers
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      console.log('📋 Service Workers encontrados:', registrations.length);
      
      registrations.forEach(function(registration) {
        registration.unregister();
        console.log('🗑️ Service Worker desregistrado:', registration);
      });
    });
    
    // Limpiar cache
    if ('caches' in window) {
      caches.keys().then(function(cacheNames) {
        console.log('📋 Caches encontrados:', cacheNames.length);
        
        cacheNames.forEach(function(cacheName) {
          caches.delete(cacheName);
          console.log('🗑️ Cache eliminado:', cacheName);
        });
      });
    }
    
    // Interceptar y bloquear futuros registros
    const originalRegister = navigator.serviceWorker.register;
    navigator.serviceWorker.register = function() {
      console.log('🚫 Intento de registro de Service Worker bloqueado');
      return Promise.reject(new Error('Service Worker deshabilitado'));
    };
    
    // Prevenir activación
    navigator.serviceWorker.addEventListener('message', function(event) {
      console.log('🚫 Mensaje del Service Worker bloqueado:', event);
      event.preventDefault();
      return false;
    });
  }
}

// Ejecutar limpieza inmediatamente
disableServiceWorkers();

// Ejecutar limpieza cada 2 segundos para asegurar
setInterval(disableServiceWorkers, 2000);

// Ejecutar limpieza cuando la página esté completamente cargada
window.addEventListener('load', disableServiceWorkers);

// Ejecutar limpieza cuando la página esté lista
document.addEventListener('DOMContentLoaded', disableServiceWorkers);

console.log('✅ Sistema de deshabilitación activado');
