import env from './env';

// 🌐 Configuración central de la API
const API_CONFIG = {
  // URL base del backend
  BASE_URL: env.BACKEND_URL,
  
  // Endpoints de la API
  ENDPOINTS: {
    // Admin
    ADMIN_LOGIN: '/api/admin/login',
    ADMIN_QUESTIONNAIRES: '/api/admin/questionnaires',
    ADMIN_QUESTIONNAIRE: (id: string | number) => `/api/admin/questionnaires/${id}`,
    
    // Auth
    AUTH_LOGIN: '/api/auth/login',
    AUTH_REGISTER: '/api/auth/register',
    
    // Questionnaires
    QUESTIONNAIRES: '/api/questionnaires',
    QUESTIONNAIRE: (id: string | number) => `/api/questionnaires/${id}`,
    
    // Health
    HEALTH: '/health',
    SYSTEM_INFO: '/system/info'
  },
  
  // Configuración de requests
  REQUEST_CONFIG: {
    timeout: env.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Función helper para hacer requests a la API
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

export default API_CONFIG;
