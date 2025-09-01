// 🌐 Configuración de entorno para Vite
const env = {
  // Backend URL
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'https://back-websaludmental-1.onrender.com',
  
  // Entorno
  NODE_ENV: import.meta.env.MODE || 'development',
  
  // Configuración adicional
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',
  
  // Endpoints del backend
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://back-websaludmental-1.onrender.com'
};

export default env;
