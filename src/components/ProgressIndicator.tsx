import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Save } from 'lucide-react';

interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
  isSaving?: boolean;
  lastSaved?: Date;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  isSaving = false,
  lastSaved
}) => {
  const progress = ((currentQuestion - 1) / totalQuestions) * 100;
  const answeredProgress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      {/* Barra de progreso principal */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Progreso del cuestionario
          </span>
          <span className="text-sm text-gray-500">
            {currentQuestion} de {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Barra de respuestas */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Preguntas respondidas
          </span>
          <span className="text-sm text-gray-500">
            {answeredQuestions} de {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            initial={{ width: 0 }}
            animate={{ width: `${answeredProgress}%` }}
          />
        </div>
      </div>

      {/* Estado de guardado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Save className="w-4 h-4 text-blue-500" />
              </motion.div>
              <span className="text-sm text-blue-600">Guardando...</span>
            </>
          ) : lastSaved ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">
                Guardado {lastSaved.toLocaleTimeString()}
              </span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">No guardado</span>
            </>
          )}
        </div>

        {/* Porcentaje de completado */}
        <div className="text-right">
          <span className="text-lg font-bold text-gray-900">
            {Math.round(progress)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">completado</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
