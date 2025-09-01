import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Save, AlertCircle } from 'lucide-react';

interface AutoSaveMessageProps {
  isSaving: boolean;
  lastSaved: Date | null;
  hasError: boolean;
  errorMessage?: string;
}

const AutoSaveMessage: React.FC<AutoSaveMessageProps> = ({
  isSaving,
  lastSaved,
  hasError,
  errorMessage
}) => {
  return (
    <AnimatePresence>
      {/* Mensaje de guardando */}
      {isSaving && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Save className="w-4 h-4" />
          </motion.div>
          <span className="text-sm font-medium">Guardando respuestas...</span>
        </motion.div>
      )}

      {/* Mensaje de guardado exitoso */}
      {!isSaving && lastSaved && !hasError && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-medium">
            Respuestas guardadas {lastSaved.toLocaleTimeString()}
          </span>
        </motion.div>
      )}

      {/* Mensaje de error */}
      {hasError && errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">{errorMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AutoSaveMessage;
