import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Info, X } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: 'radio' | 'text' | 'textarea';
  options?: string[];
  required: boolean;
  info?: string;
}

const QuestionnairePage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<Record<number, string>>({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentInfo, setCurrentInfo] = useState('');

  const questions: Question[] = [
    {
      id: 1,
      text: "¿Qué buscas principalmente en una relación?",
      type: 'radio',
      options: ['1 = COMPAÑÍA', '2 = AMOR', '3 = AMISTAD'],
      required: true,
      info: "Esta pregunta evalúa tus expectativas principales en una relación romántica."
    },
    {
      id: 2,
      text: "¿Cómo prefieres pasar tiempo con tu pareja?",
      type: 'radio',
      options: ['1 = ACTIVIDADES', '2 = CONVERSACIONES', '3 = AMBAS'],
      required: true,
      info: "Esta pregunta evalúa tu estilo preferido de interacción en pareja."
    },
    {
      id: 3,
      text: "¿Qué valoras más en una persona?",
      type: 'radio',
      options: ['1 = INTELIGENCIA', '2 = SENTIMENTAL', '3 = EQUILIBRIO'],
      required: true,
      info: "Esta pregunta evalúa los atributos que más te atraen en una persona."
    },
    {
      id: 4,
      text: "¿Cómo manejas los conflictos en una relación?",
      type: 'radio',
      options: ['1 = DIÁLOGO', '2 = ESPACIO', '3 = DEPENDE'],
      required: true,
      info: "Esta pregunta evalúa tu estilo de resolución de conflictos."
    },
    {
      id: 5,
      text: "¿Qué te gustaría mejorar en ti mismo para una relación?",
      type: 'textarea',
      required: false,
      info: "Esta pregunta te permite reflexionar sobre tu crecimiento personal."
    }
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswer = (answer: string) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Respuestas del cuestionario:', formData);
    // Aquí iría la lógica para enviar las respuestas
    alert('¡Cuestionario de compatibilidad completado!');
  };

  const showInfo = (info: string) => {
    setCurrentInfo(info);
    setShowInfoModal(true);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnswer = formData[currentQuestionIndex];
  const canProceed = hasAnswer || !currentQuestion.required;

  return (
    <div className="cuestionario-rediseñado">
      <div className="container">
        {/* Header del Cuestionario */}
        <motion.div
          className="cuestionario-header-rediseñado"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="icono-principal">
            <Heart />
          </div>
          
          <h1>Cuestionario de Compatibilidad</h1>
          
          <p>
            Descubre tu <strong>compatibilidad ideal</strong> con nuestro test psicológico especializado. 
            Este cuestionario de {totalQuestions} preguntas te ayudará a encontrar la conexión perfecta 
            basada en personalidad, valores y expectativas.
          </p>

          {/* Barra de Progreso */}
          <div className="progress-container-rediseñado">
            <div className="progress-bar-rediseñado">
              <div 
                className="progress-fill-rediseñado" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-text-rediseñado">
              Pregunta {currentQuestionIndex + 1} de {totalQuestions}
            </div>
          </div>
        </motion.div>

        {/* Card Principal del Cuestionario */}
        <motion.div
          className="cuestionario-card-rediseñado"
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header de la Card */}
          <div className="cuestionario-card-header-rediseñado">
            <h2 className="cuestionario-card-title-rediseñado">
              {currentQuestion.text}
            </h2>
            
            {currentQuestion.required && (
              <div className="cuestionario-card-subtitle-rediseñado">
                Esta pregunta es obligatoria
              </div>
            )}
          </div>

          {/* Contenido de la Card */}
          <div className="cuestionario-card-content-rediseñado">
            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <div className="radio-options-container-rediseñado">
                {currentQuestion.options.map((option, index) => {
                  const isLastOdd = index === (currentQuestion.options?.length || 0) - 1 && (currentQuestion.options?.length || 0) % 2 === 1;
                  return (
                    <div
                      key={index}
                      className={`radio-option-card-rediseñado ${isLastOdd ? 'option-odd-last' : ''} ${
                        formData[currentQuestionIndex] === option ? 'selected' : ''
                      }`}
                      onClick={() => handleAnswer(option)}
                    >
                      <input
                        type="radio"
                        id={`option-${index}`}
                        name={`question-${currentQuestion.id}`}
                        value={option}
                        checked={formData[currentQuestionIndex] === option}
                        onChange={() => handleAnswer(option)}
                      />
                      <label htmlFor={`option-${index}`}>
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <div className="input-group-rediseñado">
                <label className="input-label-rediseñado">
                  Tu respuesta:
                </label>
                <input
                  type="text"
                  className="input-field-rediseñado"
                  placeholder="Escribe tu respuesta aquí..."
                  value={formData[currentQuestionIndex] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              </div>
            )}

            {currentQuestion.type === 'textarea' && (
              <div className="input-group-rediseñado">
                <label className="input-label-rediseñado">
                  Tu respuesta:
                </label>
                <textarea
                  className="input-field-rediseñado textarea-field-rediseñado"
                  placeholder="Escribe tu respuesta detallada aquí..."
                  value={formData[currentQuestionIndex] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                />
              </div>
            )}

            {/* Botones de Navegación */}
            <div className="botones-container-rediseñado">
              <button
                className="btn-rediseñado btn-anterior-rediseñado"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft size={16} />
                Anterior
              </button>

              {currentQuestionIndex === totalQuestions - 1 ? (
                <button
                  className="btn-rediseñado btn-enviar-rediseñado"
                  onClick={handleSubmit}
                  disabled={!canProceed}
                >
                  Enviar
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  className="btn-rediseñado btn-siguiente-rediseñado"
                  onClick={handleNext}
                  disabled={!canProceed}
                >
                  Siguiente
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Botón de Información */}
        <button
          className="info-button-rediseñado"
          onClick={() => showInfo(currentQuestion.info || 'Información no disponible')}
        >
          <Info size={16} />
          Información sobre el cuestionario
        </button>
      </div>

      {/* Modal de Información */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            className="modal-overlay-rediseñado"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              className="modal-content-rediseñado"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header-rediseñado">
                <h3 className="modal-title-rediseñado">
                  Información de la Pregunta
                </h3>
                <button
                  className="modal-close-rediseñado"
                  onClick={() => setShowInfoModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="modal-body-rediseñado">
                {currentInfo}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionnairePage;
