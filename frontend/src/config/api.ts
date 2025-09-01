/**
 * api.ts
 * 
 * Configuración central de la API del frontend.
 * Define URLs base, endpoints y funciones helper para hacer requests.
 * 
 * Características:
 * - Configuración centralizada de URLs
 * - Endpoints organizados por categorías
 * - Funciones helper para construir URLs y hacer requests
 * - Manejo de errores centralizado
 * 
 * @author Sistema de Salud Mental
 * @version 1.0.0
 */

import env from './env';

/**
 * Configuración central de la API
 * Contiene todas las URLs base, endpoints y configuración de requests
 */
const API_CONFIG = {
  /** URL base del backend obtenida de las variables de entorno */
  BASE_URL: env.BACKEND_URL,
  
  /** Endpoints de la API organizados por categorías */
  ENDPOINTS: {
    // Endpoints de administración
    ADMIN_LOGIN: '/api/admin/login',
    ADMIN_QUESTIONNAIRES: '/api/admin/questionnaires',
    ADMIN_QUESTIONNAIRE: (id: string | number) => `/api/admin/questionnaires/${id}`,
    
    // Endpoints de autenticación
    AUTH_LOGIN: '/api/auth/login',
    AUTH_REGISTER: '/api/auth/register',
    
    // Endpoints de cuestionarios
    QUESTIONNAIRES: '/api/questionnaires',
    QUESTIONNAIRE: (id: string | number) => `/api/questionnaires/${id}`,
    
    // Endpoints de salud del sistema
    HEALTH: '/health',
    SYSTEM_INFO: '/system/info'
  },
  
  /** Configuración por defecto para las requests HTTP */
  REQUEST_CONFIG: {
    timeout: env.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

/**
 * Construye una URL completa combinando la URL base con el endpoint
 * @param endpoint - Endpoint relativo (ej: '/api/questionnaires')
 * @returns URL completa (ej: 'https://api.example.com/api/questionnaires')
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

/**
 * Función helper para hacer requests HTTP a la API
 * Incluye configuración por defecto y manejo de errores
 * @param endpoint - Endpoint relativo de la API
 * @param options - Opciones adicionales para el request (headers, method, body, etc.)
 * @returns Promise con la respuesta JSON de la API
 * @throws Error si el request falla
 */
export const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const url = buildApiUrl(endpoint);
  const config: RequestInit = {
    ...API_CONFIG.REQUEST_CONFIG,
    ...options,
    headers: {
      ...API_CONFIG.REQUEST_CONFIG.headers,
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Exportación de la configuración de la API
 * Permite acceso a la configuración desde otros módulos
 */
export default API_CONFIG;
