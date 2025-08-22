/**
 * Servicio para sincronizar cuestionarios entre localStorage y backend
 * Solo sincroniza cuando el cuestionario esté COMPLETADO
 */

import { buildApiUrl } from '../config/api';

const API_BASE_URL = buildApiUrl('/api');
const STORAGE_PREFIX = "questionnaire:";

type Persisted = {
  personalInfo: any;
  answers: Record<string, any>;
  completed: boolean;
  currentQuestionIndex: number;
  timestamp: number;
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const key = (type: string) => `${STORAGE_PREFIX}${type}`;

// ✅ objeto servicio único
const QuestionnaireService = {
  /**
   * Sincronizar cuestionario COMPLETADO con el backend
   * Solo se llama cuando el usuario termina el cuestionario
   */
  async syncCompletedQuestionnaire(type: string, personalInfo: any, answers: Record<string, any>, questions: any[]) {
    try {
      console.log(`📡 ENVIANDO CUESTIONARIO COMPLETADO AL BACKEND:`);
      console.log(`   URL: ${API_BASE_URL}/questionnaires/sync`);
      console.log(`   Tipo: ${type}`);
      console.log(`   Usuario: ${personalInfo.nombre} ${personalInfo.apellidos}`);
      console.log(`   Email: ${personalInfo.correo}`);
      console.log(`   Preguntas respondidas: ${Object.keys(answers).length}`);
      console.log(`   Completado: true`);
      console.log(`   📊 ---`);
      
      // ✅ LIMPIEZA AGRESIVA: Asegurar que TODAS las respuestas sean strings
      const simplifiedAnswers: Record<string, string> = {};
      Object.entries(answers).forEach(([questionId, answer]) => {
        let answerText = '';
        
        // Log para debug
        console.log(`🔍 Procesando respuesta para pregunta ${questionId}:`, {
          originalAnswer: answer,
          type: typeof answer,
          isObject: answer && typeof answer === 'object',
          hasText: answer && typeof answer === 'object' && 'text' in answer,
          hasAnswer: answer && typeof answer === 'object' && 'answer' in answer,
          hasValue: answer && typeof answer === 'object' && 'value' in answer
        });
        
        if (typeof answer === 'string') {
          answerText = answer;
        } else if (answer && typeof answer === 'object') {
          // Si es un objeto, extraer el texto de la respuesta
          if (answer.text && typeof answer.text === 'string') {
            answerText = answer.text;
          } else if (answer.answer && typeof answer.answer === 'string') {
            answerText = answer.answer;
          } else if (answer.value && typeof answer.value === 'string') {
            answerText = answer.value;
          } else if (answer.label && typeof answer.label === 'string') {
            answerText = answer.label;
          } else if (answer.name && typeof answer.name === 'string') {
            answerText = answer.name;
          } else {
            // Último recurso: convertir a string
            answerText = String(answer);
            console.warn(`⚠️ Respuesta convertida a string para pregunta ${questionId}:`, answerText);
          }
        } else {
          // Convertir cualquier otro tipo a string
          answerText = String(answer);
          console.warn(`⚠️ Respuesta convertida a string para pregunta ${questionId}:`, answerText);
        }
        
        // ✅ VALIDACIÓN FINAL: Asegurar que sea string válido
        if (typeof answerText !== 'string') {
          answerText = String(answerText);
        }
        
        // ✅ VERIFICAR QUE NO CONTENGA [object Object]
        if (answerText.includes('[object Object]')) {
          console.error(`❌ ERROR: Respuesta contiene [object Object] para pregunta ${questionId}:`, answerText);
          answerText = 'Respuesta no válida';
        }
        
        simplifiedAnswers[questionId] = answerText;
        
        console.log(`✅ Respuesta procesada para pregunta ${questionId}:`, {
          original: answer,
          processed: answerText,
          finalType: typeof answerText
        });
      });
      
      console.log('🧹 RESPUESTAS FINALES LIMPIAS:', simplifiedAnswers);
      
      const response = await fetch(`${API_BASE_URL}/questionnaires/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          personalInfo,
          answers: simplifiedAnswers,
          completed: true, // Solo cuestionarios completados
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`Error de sincronización: ${response.status}`);
      }

      const result = await response.json();
      console.log(`📥 RESPUESTA DEL BACKEND RECIBIDA:`);
      console.log(`   Status: ${response.status}`);
      console.log(`   Success: ${result.success}`);
      console.log(`   Message: ${result.message}`);
      console.log(`   📊 ---`);
      return result;
    } catch (error) {
      console.error('❌ Error sincronizando cuestionario completado:', error);
      throw error; // Lanzar error para que el frontend lo maneje
    }
  },

  /**
   * Guardar progreso SOLO en localStorage
   * NO se sincroniza con backend hasta que esté completado
   */
  saveProgressToLocalStorage(type: string, personalInfo: any, answers: Record<string, any>, completed = false, currentQuestionIndex = 0) {
    try {
      const payload: Persisted = {
        personalInfo,
        answers,
        completed,
        currentQuestionIndex, // ✅ Usar el índice actual de la pregunta
        timestamp: Date.now()
      };
      
      localStorage.setItem(key(type), JSON.stringify(payload));
      // console.log('💾 Progreso guardado en localStorage:', {
      //   type,
      //   personalInfo: payload.personalInfo ? '✅ Presente' : '❌ Ausente',
      //   answers: Object.keys(payload.answers).length,
      //   completed: payload.completed,
      //   key: key(type)
      // });
      return true;
    } catch (error) {
      // console.error('Error guardando en localStorage:', error);
      return false;
    }
  },

  /**
   * Cargar progreso SOLO desde localStorage
   * NO se restaura desde backend si expira
   */
  loadProgressFromLocalStorage(type: string) {
    try {
      const raw = localStorage.getItem(key(type));
      if (!raw) return null;
      
      const data = safeParse<Persisted | null>(raw, null);
      if (!data) return null;
      
      // Verificar si los datos han expirado (3 horas)
      const EXPIRATION_TIME = 3 * 60 * 60 * 1000;
      if (data.timestamp && (Date.now() - data.timestamp > EXPIRATION_TIME)) {
        // Datos expirados - eliminar y NO restaurar desde backend
        localStorage.removeItem(key(type));
        // console.log('Datos expirados eliminados. No se restaura desde backend.');
        return null;
      }
      
      // console.log('Progreso cargado desde localStorage');
      return data;
    } catch (error) {
      // console.error('Error cargando desde localStorage:', error);
      return null;
    }
  },

  /**
   * Limpiar progreso del localStorage
   */
  clearProgress(type: string) {
    try {
      localStorage.removeItem(key(type));
      // console.log('Progreso limpiado del localStorage');
      return true;
    } catch (error) {
      // console.error('Error limpiando progreso:', error);
      return false;
    }
  },

  /**
   * Verificar si hay progreso válido en localStorage
   */
  hasValidProgress(type: string) {
    try {
      const raw = localStorage.getItem(key(type));
      if (!raw) return false;
      
      const data = safeParse<Persisted | null>(raw, null);
      if (!data) return false;
      
      const EXPIRATION_TIME = 3 * 60 * 60 * 1000;
      
      // Verificar expiración
      if (data.timestamp && (Date.now() - data.timestamp > EXPIRATION_TIME)) {
        localStorage.removeItem(key(type));
        return false;
      }
      
      return true;
    } catch (error) {
      localStorage.removeItem(key(type));
      return false;
    }
  },

  /**
   * Marcar cuestionario como completado y sincronizar con backend
   * Esta es la ÚNICA función que envía datos al backend
   */
  async completeQuestionnaire(type: string, personalInfo: any, answers: Record<string, any>, questions: any[] = []) {
    try {
      // 1. Marcar como completado en localStorage
      this.saveProgressToLocalStorage(type, personalInfo, answers, true);
      
      // 2. Sincronizar con backend (solo cuestionarios completados)
      const result = await this.syncCompletedQuestionnaire(type, personalInfo, answers, questions);
      
      // 3. Limpiar localStorage después de sincronizar exitosamente
      this.clearProgress(type);
      
      return result;
          } catch (error) {
        // console.error('Error completando cuestionario:', error);
        throw error;
      }
  },

  /**
   * Obtener estadísticas del usuario desde el backend
   * Solo cuestionarios completados
   */
  async getUserStats(email: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/questionnaires/user/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        throw new Error(`Error obteniendo estadísticas: ${response.status}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      // console.warn('Error obteniendo estadísticas:', error);
      return null;
    }
  }
};

// ✅ exporta ambos estilos para máxima compatibilidad
export { QuestionnaireService };
export default QuestionnaireService;
