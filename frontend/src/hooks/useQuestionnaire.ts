/**
 * useQuestionnaire.ts
 * 
 * Hook personalizado para manejar el estado y lógica de los cuestionarios.
 * Incluye persistencia automática, validación y envío al backend.
 * 
 * Características:
 * - Gestión completa del estado del cuestionario
 * - Auto-guardado con debounce
 * - Persistencia en localStorage
 * - Validación de respuestas requeridas
 * - Envío al backend con limpieza de datos
 * - Manejo de errores robusto
 * 
 * @author Sistema de Salud Mental
 * @version 1.0.0
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { QuestionnaireService } from "../services/questionnaireService";

/**
 * Interfaz que define la información personal del usuario
 */
interface PersonalInfo {
  nombre: string;
  apellidos: string;
  edad: string;
  genero: string;
  correo: string;
  orientacionSexual: string;
}

/**
 * Interfaz que define la estructura de una pregunta
 */
interface Question {
  id: number;
  text: string;
  type: 'radio' | 'text' | 'textarea';
  options?: string[];
  required: boolean;
  info?: string;
}

/**
 * Props del hook useQuestionnaire
 */
interface UseQuestionnaireProps {
  type: 'pareja' | 'personalidad';
  questions: Question[];
}

/**
 * Hook principal para manejar cuestionarios
 * 
 * @param props - Props del hook con tipo de cuestionario y preguntas
 * @returns Objeto con estado y funciones del cuestionario
 */
export const useQuestionnaire = ({ type, questions }: UseQuestionnaireProps) => {
  // ===== ESTADOS PRINCIPALES =====
  
  /** Índice de la pregunta actual */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  /** Datos del formulario (respuestas) */
  const [formData, setFormData] = useState<Record<number, string>>({});
  
  /** Información personal del usuario */
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  
  /** Si el cuestionario está completado */
  const [isCompleted, setIsCompleted] = useState(false);
  
  /** Si se está enviando al backend */
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /** Mensaje de error si algo falla */
  const [error, setError] = useState<string | null>(null);
  
  /** Si mostrar el formulario de información personal */
  const [showPersonalInfoForm, setShowPersonalInfoForm] = useState(false);
  
  // ===== ESTADOS DE GUARDADO =====
  
  /** Si se está guardando automáticamente */
  const [isSaving, setIsSaving] = useState(false);
  
  /** Fecha del último guardado */
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // ===== REFS PARA CONTROL DE PERSISTENCIA =====
  
  /** Control para evitar cargas múltiples */
  const hasLoaded = useRef<string | false>(false);
  
  /** Clave del último guardado para evitar bucles */
  const lastSavedKey = useRef<string | null>(null);
  
  /** Timeout para debounce del guardado */
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  /** Flag para habilitar/deshabilitar auto-guardado */
  const autoSaveEnabled = useRef(true);

  // ===== FUNCIONES DE AUTO-GUARDADO =====
  
  /**
   * Función para guardar progreso automáticamente con debounce
   * Se ejecuta cuando cambian los datos del formulario
   */
  const autoSaveProgress = useCallback(async () => {
    if (!personalInfo || !autoSaveEnabled.current) return;
    
    try {
      // Limpiar timeout anterior
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
      
      // Guardar después de 500ms de inactividad (debounce)
      saveTimeout.current = setTimeout(async () => {
        // DEBUG: Auto-guardando progreso del cuestionario
        // console.log('💾 Auto-guardando progreso...');
        setIsSaving(true);
        
        try {
          await QuestionnaireService.saveProgressToLocalStorage(
            type,
            personalInfo,
            formData,
            isCompleted,
            currentQuestionIndex
          );
          
          // DEBUG: Progreso auto-guardado exitosamente
          // console.log('✅ Progreso auto-guardado exitosamente');
          setLastSaved(new Date());
        } catch (error) {
          // console.error('❌ Error en auto-guardado:', error);
        } finally {
          setIsSaving(false);
        }
      }, 500);
    } catch (error) {
      // console.error('❌ Error en auto-guardado:', error);
      setIsSaving(false);
    }
  }, [type, personalInfo, formData, isCompleted, currentQuestionIndex]);

  // ✅ Cargar progreso al inicializar
  useEffect(() => {
    const loadKey = `${type}-${questions.length}`;
    if (hasLoaded.current === loadKey) {
      // DEBUG: Evitar carga duplicada del progreso
      // console.log('🔍 Hook: Ya cargado para', loadKey, 'saltando...');
      return;
    }
    
      // DEBUG: Iniciando carga del progreso guardado
      // console.log('🔍 Hook: INICIANDO CARGA para', loadKey);
    
    try {
      const restored = QuestionnaireService.loadProgressFromLocalStorage(type);
      // DEBUG: Mostrar progreso guardado encontrado
      // console.log('🔍 Hook: Progreso guardado:', restored);
      
      if (restored && restored.personalInfo) {
        // DEBUG: Restaurando progreso encontrado
        // console.log('🔍 Hook: Progreso encontrado, restaurando...');
        setPersonalInfo(restored.personalInfo);
        
        // ✅ Restaurar respuestas con validación mejorada
        if (restored.answers) {
          const convertedAnswers: Record<number, string> = {};
          Object.entries(restored.answers).forEach(([key, value]) => {
            const questionId = parseInt(key);
            const question = questions.find(q => q.id === questionId);
            if (question && value && String(value).trim() !== '') {
              convertedAnswers[question.id] = String(value);
            }
          });
          setFormData(convertedAnswers);
        }
        
        // ✅ Restaurar posición de pregunta
        if (restored.currentQuestionIndex !== undefined) {
          setCurrentQuestionIndex(restored.currentQuestionIndex);
        }
        
        setShowPersonalInfoForm(false);
        
        if (restored.completed) {
          setIsCompleted(true);
        }
        
        // DEBUG: Progreso restaurado exitosamente
        // console.log('✅ Progreso restaurado exitosamente');
      } else {
        // DEBUG: No hay progreso guardado, mostrar formulario inicial
        // console.log('🔍 Hook: No hay progreso, mostrando formulario');
        setShowPersonalInfoForm(true);
      }
    } catch (error) {
      console.error('❌ Error cargando progreso:', error);
      setShowPersonalInfoForm(true);
    } finally {
      hasLoaded.current = loadKey;
      // DEBUG: Carga del progreso completada
      // console.log('🔍 Hook: Carga completada, hasLoaded =', loadKey);
    }
  }, [type, questions]);

  // ✅ Auto-guardar cuando cambien los datos
  useEffect(() => {
    if (personalInfo) {
      autoSaveProgress();
    }
  }, [formData, currentQuestionIndex, isCompleted, autoSaveProgress]);

  // ✅ Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, []);

  // Snapshot estable de lo que queremos persistir
  const dataKey = useMemo(
    () =>
      JSON.stringify({
        personalInfo,
        formData,
        isCompleted,
        currentQuestionIndex,
      }),
    [personalInfo, formData, isCompleted, currentQuestionIndex]
  );

  const persist = useCallback(() => {
    if (!hasLoaded.current) return; // no guardes hasta terminar la carga
    
    // ✅ Guardar SIEMPRE que haya información personal, aunque no haya respuestas
    if (personalInfo) {
      // DEBUG: Guardando progreso del cuestionario
      // console.log('💾 Guardando progreso:', { 
      //   personalInfo: personalInfo ? '✅ Presente' : '❌ Ausente',
      //   formDataKeys: Object.keys(formData).length,
      //   isCompleted 
      // });
      
      try {
        QuestionnaireService.saveProgressToLocalStorage(
          type,
          personalInfo,
          formData,
          isCompleted
        );
      } catch (error) {
        console.error('❌ Error guardando progreso:', error);
      }
    }
  }, [type, personalInfo, formData, isCompleted]);

  // 2) Guardar SOLO cuando cambie algo de verdad, con debounce
  // ❌ TEMPORALMENTE DESACTIVADO para romper el bucle infinito
  /*
  useEffect(() => {
    if (!hasLoaded.current) return;
    if (lastSavedKey.current === dataKey) return;

    // DEBUG: useEffect de guardado ejecutándose
    console.log('🔄 useEffect de guardado ejecutándose...');
    console.log('   dataKey:', dataKey);
    console.log('   lastSavedKey:', lastSavedKey.current);

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      // DEBUG: Ejecutando función persist
      console.log('⏰ Ejecutando persist()...');
      persist();
      lastSavedKey.current = dataKey;
    }, 120);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [dataKey, persist]);
  */

  const handlePersonalInfoSubmit = useCallback((info: PersonalInfo) => {
    setPersonalInfo(info);
    setShowPersonalInfoForm(false);
    setError(null);
    
    // DEBUG: Log informativo cuando se envía información personal
    // console.log(`👤 ENVIANDO INFORMACIÓN PERSONAL:`);
    // console.log(`   Tipo de cuestionario: ${type}`);
    // console.log(`   Nombre: ${info.nombre} ${info.apellidos}`);
    // console.log(`   Email: ${info.correo}`);
    // console.log(`   Edad: ${info.edad}`);
    // console.log(`   Género: ${info.genero}`);
    // console.log(`   Orientación: ${info.orientacionSexual}`);
    // console.log(`   Timestamp: ${new Date().toLocaleString()}`);
    // console.log(`   📊 ---`);
    
    // DEBUG: Guardando información personal inicial
    // console.log('💾 Guardando información personal inicial...');
    try {
      QuestionnaireService.saveProgressToLocalStorage(
        type,
        info,
        {}, // formData vacío al inicio
        false, // isCompleted = false
        0 // currentQuestionIndex = 0
      );
      // DEBUG: Información personal guardada exitosamente
      // console.log('✅ Información personal guardada exitosamente');
    } catch (error) {
      console.error('❌ Error guardando información personal:', error);
    }
  }, [type]);

  const handleAnswer = useCallback((answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [currentQuestion.id]: answer
      };
      
      // DEBUG: Log informativo de la respuesta registrada
      // console.log('💾 Respuesta registrada:', { 
      //   questionId: currentQuestion.id, 
      //   answer,
      //   totalRespuestas: Object.keys(newFormData).length,
      //   pregunta: currentQuestion.text.substring(0, 50) + '...'
      // });
      
      return newFormData;
    });
    setError(null);
    
    // ✅ El auto-guardado se ejecutará automáticamente por el useEffect
    
    // Si es una pregunta de opciones (radio) y no es la última, avanzar automáticamente
    if (currentQuestion.type === 'radio' && currentQuestionIndex < questions.length - 1) {
      // Pequeño delay para que el usuario vea su selección
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 300);
    }
  }, [currentQuestionIndex, questions]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      
      // DEBUG: Log informativo del avance a la siguiente pregunta
      // console.log('➡️ Avanzando a pregunta:', currentQuestionIndex + 1);
      
      // ✅ El auto-guardado se ejecutará automáticamente por el useEffect
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      
      // DEBUG: Log informativo del retroceso a la pregunta anterior
      // console.log('⬅️ Retrocediendo a pregunta:', currentQuestionIndex - 1);
      
      // ✅ El auto-guardado se ejecutará automáticamente por el useEffect
    }
  }, [currentQuestionIndex]);

  const handleSubmit = useCallback(async () => {
    if (!personalInfo) {
      setError('Información personal requerida');
      return;
    }

    // DEBUG: Logs de debugging para la validación del envío
    // console.log('🔍 VALIDANDO ENVÍO DEL CUESTIONARIO:');
    // console.log('   Total preguntas:', questions.length);
    // console.log('   Preguntas requeridas:', questions.filter(q => q.required).length);
    // console.log('   Respuestas guardadas:', Object.keys(formData).length);
    // console.log('   formData completo:', formData);
    
    // Validar que todas las preguntas requeridas estén respondidas
    const requiredQuestions = questions.filter(q => q.required);
    const unansweredRequired = requiredQuestions.filter(q => {
      const hasAnswer = formData[q.id];
      const isValidAnswer = hasAnswer && String(hasAnswer).trim() !== '';
      return !isValidAnswer;
    });
    
    // DEBUG: Mostrar detalles de preguntas requeridas y sin responder
    // console.log('   Preguntas requeridas:', requiredQuestions.map(q => ({ id: q.id, text: q.text.substring(0, 30) + '...' })));
    // console.log('   Preguntas sin responder:', unansweredRequired.map(q => ({ id: q.id, text: q.text.substring(0, 30) + '...' })));
    
    if (unansweredRequired.length > 0) {
      // DEBUG: Validación fallida - preguntas sin responder
      // console.log('❌ VALIDACIÓN FALLIDA - Preguntas sin responder:', unansweredRequired.length);
      setError('Por favor responde todas las preguntas requeridas');
      return;
    }
    
    // DEBUG: Validación exitosa - todas las preguntas respondidas
    // console.log('✅ VALIDACIÓN EXITOSA - Todas las preguntas respondidas');

    setIsSubmitting(true);
    setError(null);

    try {
      // ✅ Desactivar auto-guardado durante el envío
      autoSaveEnabled.current = false;
      
      // DEBUG: Guardando progreso final antes del envío
      // console.log('💾 Guardando progreso final antes del envío...');
      try {
        QuestionnaireService.saveProgressToLocalStorage(
          type,
          personalInfo,
          formData,
          true, // isCompleted = true
          currentQuestionIndex
        );
        // DEBUG: Progreso final guardado exitosamente
        // console.log('✅ Progreso final guardado exitosamente');
      } catch (error) {
        console.error('❌ Error guardando progreso final:', error);
      }
      
      // DEBUG: Log detallado del cuestionario completado
      // console.log(`🎯 CUESTIONARIO COMPLETADO - ENVIANDO AL BACKEND:`);
      // console.log(`📋 DATOS DEL USUARIO:`);
      // console.log(JSON.stringify({
      //   tipo: type,
      //   usuario: {
      //     nombre: personalInfo.nombre,
      //     apellidos: personalInfo.apellidos,
      //     edad: personalInfo.edad,
      //     genero: personalInfo.genero,
      //     correo: personalInfo.correo,
      //     orientacionSexual: personalInfo.orientacionSexual
      //   },
      //   cuestionario: {
      //     totalPreguntas: questions.length,
      //     preguntasRespondidas: Object.keys(formData).length,
      //     progreso: `${Math.round(((Object.keys(formData).length) / questions.length) * 100)}%`
      //   },
      //   timestamp: new Date().toISOString(),
      //   frontend: 'useQuestionnaire'
      // }, null, 2));
      
      // DEBUG: Mostrar respuestas detalladas del cuestionario
      // console.log(`📝 RESPUESTAS DETALLADAS:`);
      // Object.entries(formData).forEach(([questionId, answer]) => {
      //   const question = questions.find(q => q.id === parseInt(questionId));
      //   console.log(`   Pregunta ${questionId}: ${question?.text || 'Texto no disponible'}`);
      //   console.log(`   Respuesta: ${answer}`);
      //   console.log(`   Tipo: ${question?.type || 'No especificado'}`);
      //   console.log(`   ---`);
      // });
      // console.log(`📊 ---`);
      
      // DEBUG: Enviando cuestionario al backend
      // console.log('📡 Enviando cuestionario al backend...');
      
      // ✅ LIMPIEZA AGRESIVA: Asegurar que solo se envíen strings como respuestas
      const cleanFormData: Record<string, string> = {};
      Object.entries(formData).forEach(([questionId, answer]) => {
        let answerText = '';
        
        // DEBUG: Log para debug de limpieza de respuestas
        // console.log(`🔍 Limpiando respuesta para pregunta ${questionId}:`, {
        //   originalAnswer: answer,
        //   type: typeof answer,
        //   isObject: answer && typeof answer === 'object'
        // });
        
        // Convertir cualquier respuesta a string
        if (typeof answer === 'string') {
          answerText = answer;
        } else if (answer && typeof answer === 'object') {
          // Si es un objeto, extraer el texto de la respuesta
          const answerObj = answer as any; // Cast to any to access properties dynamically
          if (answerObj.text && typeof answerObj.text === 'string') {
            answerText = answerObj.text;
          } else if (answerObj.answer && typeof answerObj.answer === 'string') {
            answerText = answerObj.answer;
          } else if (answerObj.value && typeof answerObj.value === 'string') {
            answerText = answerObj.value;
          } else if (answerObj.label && typeof answerObj.label === 'string') {
            answerText = answerObj.label;
          } else if (answerObj.name && typeof answerObj.name === 'string') {
            answerText = answerObj.name;
          } else {
            // Último recurso: convertir a string
            answerText = String(answer);
            console.warn(`⚠️ Respuesta convertida a string para pregunta ${questionId}:`, answerText);
          }
        } else {
          answerText = String(answer);
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
        
        cleanFormData[questionId] = answerText;
        
        // DEBUG: Respuesta limpiada exitosamente
        // console.log(`✅ Respuesta limpiada para pregunta ${questionId}:`, {
        //   original: answer,
        //   cleaned: answerText,
        //   finalType: typeof answerText
        // });
      });
      
      // DEBUG: FormData limpiado y listo para envío
      // console.log('🧹 FormData limpiado:', cleanFormData);
      
      const result = await QuestionnaireService.syncCompletedQuestionnaire(type, personalInfo, cleanFormData, questions);
      
      // DEBUG: Log de éxito del envío
      // console.log(`✅ CUESTIONARIO ENVIADO EXITOSAMENTE:`);
      // console.log(`   Tipo: ${type}`);
      // console.log(`   Usuario: ${personalInfo.nombre} ${personalInfo.apellidos}`);
      // console.log(`   Respuestas: ${Object.keys(formData).length}`);
      // console.log(`   📊 ---`);
      
      // ✅ Marcar como completado
      setIsCompleted(true);
      
      // ✅ Limpiar localStorage después del envío exitoso
      try {
        QuestionnaireService.clearProgress(type);
        // DEBUG: Progreso limpiado del localStorage después del envío exitoso
        // console.log('✅ Progreso limpiado del localStorage después del envío exitoso');
      } catch (error) {
        console.error('❌ Error limpiando progreso:', error);
      }
      
      // DEBUG: Cuestionario completado y guardado exitosamente
      // console.log('Cuestionario completado y guardado exitosamente');
    } catch (err) {
      console.error('❌ ERROR AL ENVIAR CUESTIONARIO:', err);
      setError('Error al guardar el cuestionario. Por favor intenta de nuevo.');
      
      // ✅ Reactivar auto-guardado en caso de error
      autoSaveEnabled.current = true;
    } finally {
      setIsSubmitting(false);
    }
  }, [type, personalInfo, formData, questions]);

  const resetQuestionnaire = useCallback(() => {
    setCurrentQuestionIndex(0);
    setFormData({});
    setPersonalInfo(null);
    setIsCompleted(false);
    setError(null);
    setShowPersonalInfoForm(true);
    QuestionnaireService.clearProgress(type);
  }, [type]);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];
  
  // ✅ Función robusta para verificar si se puede continuar
  const hasAnswer = currentQuestion ? (() => {
    const answer = formData[currentQuestion.id];
    return answer && String(answer).trim() !== '';
  })() : false;
  
  const canProceed = currentQuestion ? (currentQuestion.required ? hasAnswer : true) : false;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return {
    // Estado
    currentQuestionIndex,
    formData,
    personalInfo,
    isCompleted,
    isSubmitting,
    error,
    showPersonalInfoForm,
    progress,
    currentQuestion,
    hasAnswer,
    canProceed,
    isLastQuestion,
    
    // ✅ Estados de guardado
    isSaving,
    lastSaved,
    
    // Acciones
    handlePersonalInfoSubmit,
    handleAnswer,
    handleNext,
    handlePrevious,
    handleSubmit,
    resetQuestionnaire,
    setShowPersonalInfoForm
  };
};
