import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Info, X, CheckCircle } from 'lucide-react';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import PersonalInfoForm from '../components/PersonalInfoForm';
import { getQuestions, Question } from '../config/questionnaireQuestions';

interface QuestionnairePageProps {
  type: 'pareja' | 'personalidad';
}

const QuestionnairePage: React.FC<QuestionnairePageProps> = ({ type }) => {
  // Obtener las preguntas desde la configuración centralizada
  const questions = useMemo(() => getQuestions(type), [type]);

  const {
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
    isSaving,
    lastSaved,
    handlePersonalInfoSubmit,
    handleAnswer,
    handleNext,
    handlePrevious,
    handleSubmit,
    resetQuestionnaire
  } = useQuestionnaire({ type, questions });

  const showInfo = (info: string) => {
    // Mostrar información en un modal o tooltip
    alert(info);
  };

  // Si está completado, mostrar pantalla de éxito
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Cuestionario Completado!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Gracias por completar el {type === 'pareja' ? 'cuestionario de compatibilidad de pareja' : 'cuestionario de personalidad dinámica social'}. 
            Tus respuestas han sido guardadas exitosamente en nuestra base de datos.
          </p>
          
          <div className="space-y-3 text-sm text-gray-500">
            <p><strong>Nombre:</strong> {personalInfo?.nombre} {personalInfo?.apellidos}</p>
            <p><strong>Email:</strong> {personalInfo?.correo}</p>
            <p><strong>Preguntas respondidas:</strong> {questions.length}</p>
          </div>
          
          <button
            onClick={resetQuestionnaire}
            className="mt-8 w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Realizar Otro Cuestionario
          </button>
        </motion.div>
      </div>
    );
  }

  // Si no se ha enviado la información personal, mostrar el formulario
  if (showPersonalInfoForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center p-4">
        <PersonalInfoForm
          type={type}
          onSubmit={handlePersonalInfoSubmit}
          onBack={() => window.history.back()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Botón Volver - Responsive */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto sm:px-4 sm:py-2 text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md rounded-full sm:rounded-lg transition-all duration-200 border border-gray-200"
          >
            <ChevronLeft className="w-5 h-5 sm:mr-2" />
            <span className="hidden sm:inline">Volver</span>
          </button>
        </div>

        {/* Header del Cuestionario */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Heart className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Cuestionario de Compatibilidad de Pareja
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre tu compatibilidad en las relaciones
          </p>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Pregunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% completado
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Pregunta Actual */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
        >
          {/* Número de Pregunta */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-red-600">
                  {currentQuestionIndex + 1}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </span>
            </div>
            
            {/* Botón de Información */}
            {currentQuestion.info && (
              <button
                onClick={() => showInfo(currentQuestion.info!)}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Ver información adicional"
              >
                <Info className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Texto de la Pregunta */}
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.text}
          </h2>

          {/* Opciones de Respuesta */}
          <div className="space-y-4">
            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      formData[currentQuestionIndex] === option
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      value={option}
                      checked={formData[currentQuestionIndex] === option}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 ${
                      formData[currentQuestionIndex] === option
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                    }`}>
                      {formData[currentQuestionIndex] === option && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <input
                type="text"
                value={formData[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors"
              />
            )}

            {currentQuestion.type === 'textarea' && (
              <textarea
                value={formData[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                rows={4}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none transition-colors resize-none"
              />
            )}
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </motion.div>

        {/* Navegación */}
        <div className="flex justify-between items-center">
          {/* Botón Anterior */}
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md border border-gray-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Anterior
          </button>

          {/* Botón Siguiente/Enviar */}
          <button
            onClick={isLastQuestion ? handleSubmit : handleNext}
            disabled={!canProceed || isSubmitting}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              !canProceed || isSubmitting
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Enviando...
              </>
            ) : isLastQuestion ? (
              <>
                Enviar Cuestionario
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Siguiente
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionnairePage;
