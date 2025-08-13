import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, Heart, Brain, Users, Home, ArrowLeft, Send, Info, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { SEOHead } from "../components/SEOHead";

interface Question {
  id: number;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'email';
  options?: string[];
  required: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Cuáles son los tres valores fundamentales que rigen tu vida?",
    type: 'textarea',
    required: true
  },
  {
    id: 2,
    text: "¿Qué importancia le das a la religión o espiritualidad en tu día a día?",
    type: 'radio',
    options: ["Muy importante", "Importante", "Poco importante", "No importante", "No aplica"],
    required: true
  },
  {
    id: 3,
    text: "¿Cómo visualizas tu vida dentro de 10 años? (profesión, lugar, estilo de vida)",
    type: 'textarea',
    required: true
  },
  {
    id: 4,
    text: "¿Qué opinas sobre el matrimonio? ¿Es algo esencial para ti?",
    type: 'textarea',
    required: true
  },
  {
    id: 5,
    text: "¿Qué tan importante es para ti tener hijos?",
    type: 'radio',
    options: ["Muy importante", "Importante", "Poco importante", "No importante", "No quiero hijos"],
    required: true
  },
  {
    id: 6,
    text: "¿Cómo sueles reaccionar cuando estás muy molesto o herido por alguien cercano?",
    type: 'textarea',
    required: true
  },
  {
    id: 7,
    text: "¿Te resulta fácil hablar sobre tus emociones en una relación?",
    type: 'radio',
    options: ["Muy fácil", "Fácil", "Difícil", "Muy difícil", "Depende de la situación"],
    required: true
  },
  {
    id: 8,
    text: "¿Sientes ansiedad o inseguridad cuando tu pareja no está disponible emocionalmente?",
    type: 'radio',
    options: ["Siempre", "Frecuentemente", "A veces", "Raramente", "Nunca"],
    required: true
  },
  {
    id: 9,
    text: "¿Cómo actúas cuando hay un conflicto en la relación?",
    type: 'textarea',
    required: true
  },
  {
    id: 10,
    text: "¿Prefieres resolver los problemas en el momento o tomar espacio antes de hablar?",
    type: 'radio',
    options: ["En el momento", "Tomar espacio primero", "Depende del problema", "No tengo preferencia"],
    required: true
  },
  {
    id: 11,
    text: "¿Qué tan cómodo te sientes expresando tus necesidades y deseos en una relación?",
    type: 'radio',
    options: ["Muy cómodo", "Cómodo", "Poco cómodo", "Muy incómodo", "Depende del tema"],
    required: true
  },
  {
    id: 12,
    text: "¿Cómo manejas las críticas en una relación de pareja?",
    type: 'textarea',
    required: true
  },
  {
    id: 13,
    text: "¿Qué tan importante es para ti la independencia en una relación?",
    type: 'radio',
    options: ["Muy importante", "Importante", "Poco importante", "No importante", "Prefiero dependencia"],
    required: true
  },
  {
    id: 14,
    text: "¿Cómo te ves en 5 años en términos de relación de pareja?",
    type: 'textarea',
    required: true
  },
  {
    id: 15,
    text: "¿Qué tan importante es para ti la compatibilidad intelectual?",
    type: 'radio',
    options: ["Muy importante", "Importante", "Poco importante", "No importante", "No me importa"],
    required: true
  },
  {
    id: 16,
    text: "¿Cómo manejas la distancia en una relación?",
    type: 'textarea',
    required: true
  },
  {
    id: 17,
    text: "¿Qué tan importante es para ti la compatibilidad en valores familiares?",
    type: 'radio',
    options: ["Muy importante", "Importante", "Poco importante", "No importante", "No tengo preferencia"],
    required: true
  },
  {
    id: 18,
    text: "¿Cuál es tu dirección de correo electrónico para recibir los resultados?",
    type: 'email',
    required: true
  }
];

export function QuestionnairePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Formulario enviado:', formData);
    setIsSubmitted(true);
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'text':
        return (
          <div className="flex items-center justify-center h-24">
            <Input
              value={formData[question.id.toString()] || ''}
              onChange={(e) => handleInputChange(question.id.toString(), e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="w-full max-w-2xl text-lg p-4 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="flex items-center justify-center h-24">
            <Textarea
              value={formData[question.id.toString()] || ''}
              onChange={(e) => handleInputChange(question.id.toString(), e.target.value)}
              placeholder="Escribe tu respuesta detallada aquí..."
              className="w-full max-w-2xl text-lg p-4 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[100px] resize-none rounded-xl"
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="flex items-center justify-center h-24">
            <Input
              type="email"
              value={formData[question.id.toString()] || ''}
              onChange={(e) => handleInputChange(question.id.toString(), e.target.value)}
              placeholder="tu@email.com"
              className="w-full max-w-2xl text-lg p-4 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
            />
          </div>
        );
      
      case 'radio':
        if (!question.options) return null;
        
        const isOddOptions = question.options.length % 2 !== 0;
        const lastOptionIndex = question.options.length - 1;
        
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isLastOption = index === lastOptionIndex;
              const shouldCenter = isOddOptions && isLastOption;
              
              return (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer h-16 ${
                    shouldCenter ? 'lg:col-span-2 lg:max-w-md lg:mx-auto' : ''
                  }`}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange(question.id.toString(), option)}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={formData[question.id.toString()] === option}
                    onChange={() => handleInputChange(question.id.toString(), option)}
                    className="w-5 h-5 text-blue-600 border-2 border-blue-300 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2"
                  />
                  <label className="flex-1 text-lg text-gray-700 cursor-pointer font-medium">
                    {option}
                  </label>
                </motion.div>
              );
            })}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <>
        <SEOHead
          title="Cuestionario Completado | Love on the Brain"
          description="Has completado exitosamente nuestro test de compatibilidad de pareja. Recibirás tus resultados por email pronto."
          keywords={["cuestionario completado", "test de compatibilidad", "resultados", "Love on the Brain"]}
          canonicalUrl="https://loveonthebrain.com/cuestionario/completado"
        />
        
        <div className="min-h-screen relative">
          <div className="container mx-auto px-4 py-20 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-8 shadow-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl text-gray-900 mb-6">
                ¡Cuestionario Completado!
              </h1>
              
              <p className="text-xl text-gray-700 mb-8">
                Gracias por completar nuestro test de compatibilidad de pareja. 
                Hemos recibido tus respuestas y estamos procesando tu perfil de compatibilidad.
              </p>
              
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  ¿Qué pasa ahora?
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Análisis en Proceso</h3>
                      <p className="text-gray-600 text-sm">Nuestros psicólogos están analizando tus respuestas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Resultados por Email</h3>
                      <p className="text-gray-600 text-sm">Recibirás un análisis detallado en 24-48 horas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Recomendaciones</h3>
                      <p className="text-gray-600 text-sm">Te daremos consejos personalizados para tu búsqueda</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Seguimiento</h3>
                      <p className="text-gray-600 text-sm">Te acompañaremos en tu proceso de búsqueda</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Home className="w-6 h-6 mr-3" />
                  Volver al Inicio
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Cuestionario de Compatibilidad de Pareja | Love on the Brain"
        description="Descubre tu compatibilidad y encuentra a tu pareja ideal con nuestro cuestionario científicamente diseñado por expertos en psicología. Test de compatibilidad gratuito y confidencial."
        keywords={[
          "cuestionario de pareja",
          "test de compatibilidad",
          "encontrar pareja ideal",
          "psicología de parejas",
          "compatibilidad emocional",
          "test psicológico",
          "psicólogos expertos",
          "Love on the Brain",
          "crecimiento personal",
          "relaciones de pareja",
          "compatibilidad amorosa",
          "test de personalidad",
          "psicología del amor",
          "terapia de parejas",
          "evaluación psicológica"
        ]}
        canonicalUrl="https://loveonthebrain.com/cuestionario"
        ogType="website"
        twitterCard="summary_large_image"
      />
      
      <div className="min-h-screen relative">
        
        {/* Header */}
        <motion.header
          className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-100 relative z-20"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Love on the Brain</h1>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-12 relative z-10">
          {/* Header del Cuestionario */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-8 shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              className="text-4xl lg:text-5xl text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Cuestionario de
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700"> Compatibilidad de Pareja</span>
            </motion.h1>
            
            <motion.p
              className="text-lg text-gray-700 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Descubre tu compatibilidad emocional y encuentra a tu pareja ideal con nuestro 
              <strong>test de compatibilidad científicamente diseñado</strong> por expertos en psicología. 
              Este cuestionario de pareja te ayudará a entender mejor tus necesidades emocionales y 
              encontrar a alguien que realmente te complemente.
            </motion.p>

            {/* Progress bar */}
            <div className="w-full max-w-3xl mx-auto bg-gray-200 rounded-full h-4 mb-6">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-700 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <p className="text-xl text-gray-600 font-medium">
              Pregunta {currentStep + 1} de {questions.length}
            </p>
          </motion.div>

          {/* Question Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50, rotateY: -15, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, rotateY: 15, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              className="transform-style-preserve-3d"
              whileHover={{ 
                rotateY: 2, 
                rotateX: 1, 
                scale: 1.02,
                z: 20
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <Card className="bg-white/90 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25),0_0_0_1px_rgba(255,255,255,0.1)] border border-white/30 relative overflow-hidden min-h-[450px]">
                {/* Efecto de brillo en la parte superior */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Borde superior con gradiente */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />
                
                {/* Efecto de sombra interna para profundidad */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl lg:text-3xl text-gray-900 mb-4">
                    {questions[currentStep].text}
                  </CardTitle>
                  {questions[currentStep].required && (
                    <CardDescription className="text-red-500 font-medium text-lg">
                      * Esta pregunta es obligatoria
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-6 px-6">
                  <div className="min-h-[280px] flex flex-col justify-center">
                    {renderQuestion(questions[currentStep])}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex justify-between items-center pt-6">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        variant="outline"
                        size="lg"
                        className="px-10 py-4 disabled:opacity-50 border-2 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Anterior
                      </Button>
                    </motion.div>

                    {currentStep === questions.length - 1 ? (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Button
                          onClick={handleSubmit}
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-[0_20px_25px_-5px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <Send className="w-6 h-6 mr-3" />
                          Enviar Cuestionario
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                          Siguiente
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>

                {/* Botón de información discreto */}
                <div className="text-center pt-4 pb-2">
                  <motion.button
                    onClick={() => setShowInfoModal(true)}
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300 hover:underline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Info className="w-4 h-4" />
                    <span>Información sobre el cuestionario</span>
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          </motion.div>


        </div>
        
        {/* Modal de Información */}
        {showInfoModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Info className="w-6 h-6 text-blue-600 mr-3" />
                  Información del Cuestionario
                </h2>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Contenido del modal */}
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    ¿Por qué elegir nuestro Test de Compatibilidad de Pareja?
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nuestro <strong>cuestionario de compatibilidad</strong> está diseñado por psicólogos expertos 
                    para ayudarte a encontrar a tu pareja ideal. Utilizamos metodologías científicas probadas 
                    que analizan múltiples dimensiones de la personalidad y las relaciones.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Científicamente Probado</h4>
                      <p className="text-sm text-gray-600">Metodología avalada por psicólogos expertos</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Compatibilidad Real</h4>
                      <p className="text-sm text-gray-600">Encuentra a alguien que realmente te entienda</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Resultados Garantizados</h4>
                      <p className="text-sm text-gray-600">Resultados precisos o tu dinero de vuelta</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">100% Confidencial</h4>
                      <p className="text-sm text-gray-600">Tu privacidad es nuestra prioridad</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Test de Compatibilidad: ¿Cómo Funciona?
                  </h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p><strong>🔍 Análisis Profundo:</strong> Evaluamos 18 aspectos clave de tu personalidad</p>
                    <p><strong>🧠 Base Científica:</strong> Metodología validada por expertos</p>
                    <p><strong>💝 Resultados Personalizados:</strong> Análisis detallado de tu perfil</p>
                    <p><strong>🔒 Confidencialidad:</strong> Tus datos están completamente seguros</p>
                  </div>
                </div>
              </div>
              

            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
}
