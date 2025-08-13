import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { CheckCircle, Heart, Brain, Users, Home, ArrowLeft, Send, Info, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
// ELIMINADO: import { DynamicBackground } from "../components/DynamicBackground";
import { SEOHead } from "../components/SEOHead";

interface Question {
  id: number;
  text: string;
  type: 'radio' | 'text' | 'textarea';
  options?: string[];
  required: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Conectas fácilmente con gente nueva?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 2,
    text: "¿Te resulta fácil establecer conversación con un desconocido?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 3,
    text: "¿Te sientes más cómodo estando solo que en grupo?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 4,
    text: "¿Socializar puede agotar tu energía rápidamente?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 5,
    text: "¿Prefieres las llamadas telefónicas a los mensajes de texto cuando te comunicas con otras personas?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 6,
    text: "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 7,
    text: "¿Prefieres las actividades en solitario a las interacciones en grupo?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 8,
    text: "¿Debatir y analizar obras creativas te apasiona?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 9,
    text: "¿Te gustan las películas con conclusiones abiertas que permitan la interpretación?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 10,
    text: "¿Siempre te han intrigado los misterios de la vida después de la muerte?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 11,
    text: "¿Te encanta debatir conceptos teóricos y puedes pasarte horas conversando sobre ellos?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 12,
    text: "¿A menudo reflexionas sobre el significado de las cosas en lugar de aceptarlas sin más?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 13,
    text: "¿Te atraen las nuevas experiencias y te gusta explorar lugares desconocidos?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 14,
    text: "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 15,
    text: "¿Reflexionar sobre experiencias pasadas te ayuda a comprender tus creencias y valores actuales?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 16,
    text: "¿Disfrutas aprendiendo nuevas ideas y conceptos, buscando constantemente el conocimiento?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 17,
    text: "¿Te gustan los debates animados en los que puedes compartir e intercambiar ideas con los demás?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 18,
    text: "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 19,
    text: "¿Puedes pasarte horas profundizando en los temas que despiertan tu curiosidad?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 20,
    text: "¿Eres paciente con las personas que no son tan rápidas o eficientes como tú?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 21,
    text: "¿Cuándo alguien a tu alrededor está disgustado tiendes a sentir también sus emociones?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 22,
    text: "¿Te cuesta empatizar con personas de orígenes muy diferentes?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 23,
    text: "¿Cuándo alguien piensa de forma diferente a ti, intentas comprender de verdad a la otra parte?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 24,
    text: "¿Valoras la honestidad por encima del tacto, aunque sea duro?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 25,
    text: "¿Empatizas con los sentimientos de los demás, aunque no hayas compartido sus experiencias?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 26,
    text: "¿Alcanzar metas personales te produce más satisfacción que ayudar a los demás?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 27,
    text: "¿A veces te cuesta entender las emociones de los demás?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 28,
    text: "¿Sueles hacer planes de emergencia?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 29,
    text: "¿Mantienes la compostura incluso bajo presión?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 30,
    text: "¿Los entornos dinámicos y de ritmo rápido te dan energía y te desenvuelves bien bajo presión?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 31,
    text: "¿Te gustan los retos, especialmente en entornos de alta presión?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 32,
    text: "¿En situaciones sociales prefieres quedarte con caras conocidas antes que conocer a otras nuevas?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 33,
    text: "¿Un pequeño error a veces puede hacer dudar de tus conocimientos generales sobre un tema?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 34,
    text: "¿Conocer gente nueva te hace preocuparte por la impresión que has causado?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 35,
    text: "¿Con frecuencia te preocupa el peor escenario posible en cualquier situación?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 36,
    text: "¿A menudo consideras las decisiones que has tomado?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 37,
    text: "¿La inseguridad es algo con lo que lidias a menudo?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 38,
    text: "¿Los errores de tu pasado suelen perdurar en la memoria?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 39,
    text: "¿A menudo te preocupa por incertidumbres futuras, incluso en situaciones tranquilas?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 40,
    text: "¿Eres una persona que aprecia los recuerdos y los objetos sentimentales?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 41,
    text: "¿Crees que el mundo mejoraría si la gente tomara decisiones más basadas en las emociones?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 42,
    text: "¿Te molesta que los demás discutan delante de ti?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 43,
    text: "¿Te gusta organizar tu día con listas y horarios?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 44,
    text: "¿Prefieres seguir una rutina a ser espontáneo?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 45,
    text: "¿Te sientes más a gusto cuando tu entorno está ordenado y organizado?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 46,
    text: "¿A menudo sigues tus sentimientos más que tu lógica?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 47,
    text: "¿Cuándo tienes que elegir sigues a tu corazón y eliges lo que te parece correcto?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 48,
    text: "¿Te identificas mucho con ser una persona artística?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 49,
    text: "¿Te gusta pasar tiempo en museos de arte?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 50,
    text: "¿Te gusta mantener conversaciones profundas que inviten a la reflexión?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 51,
    text: "¿La curiosidad te impulsa a explorar nuevas ideas y temas en profundidad?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 52,
    text: "¿Te gusta ser el centro de atención?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 53,
    text: "¿Prefieres una rutina diaria bien estructurada y te sientes más cómodo cuando las cosas son predecibles?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 54,
    text: "¿Prefieres relajarte antes de ocuparte de las tareas domésticas?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 55,
    text: "¿Prefieres tomar decisiones rápidamente en lugar de pensar en ellas?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 56,
    text: "¿Confías más en tu instinto que en horarios o planes escritos?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 57,
    text: "¿Te adaptas fácilmente a los cambios inesperados de planes?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 58,
    text: "¿A la hora de tomar decisiones, priorizas la lógica y la objetividad sobre las emociones?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 59,
    text: "¿Tomas las riendas de forma natural en situaciones de grupo guiando a los demás hacia objetivos comunes?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 60,
    text: "¿Te gusta asumir funciones de liderazgo?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 61,
    text: "¿Tiendes a ser autocrítico, a reflexionar constantemente sobre tus acciones y a esforzarte por mejorar?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 62,
    text: "¿Para ti es importante tener objetivos claros y trabajar diligentemente para alcanzarlos?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 63,
    text: "¿Pasar tiempo a solas es algo que aprecias y encuentras paz en las actividades solitarias?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 64,
    text: "¿Eres tu mejor amigo?",
    type: 'radio',
    options: ["1 = SI", "2 = NO", "3 = A VECES"],
    required: true
  },
  {
    id: 65,
    text: "¿Cómo te gusta pasar tu tiempo libre? (Hobbies)",
    type: 'textarea',
    required: false
  },
  {
    id: 66,
    text: "¿Tienes alguna alergia, fobia o algo que deberíamos tener en cuenta para la cita?",
    type: 'textarea',
    required: false
  },
  {
    id: 67,
    text: "¿Cuál es tu correo electrónico?",
    type: 'text',
    required: true
  }
];

export function PersonalityQuestionnairePage() {
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
              className="w-full max-w-2xl text-base sm:text-lg p-3 sm:p-4 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
            />
          </div>
        );
      
      case 'textarea':
        return (
          <div className="flex items-center justify-center h-24 sm:h-32">
            <Textarea
              value={formData[question.id.toString()] || ''}
              onChange={(e) => handleInputChange(question.id.toString(), e.target.value)}
              placeholder="Escribe tu respuesta detallada aquí..."
              className="w-full max-w-2xl text-base sm:text-lg p-3 sm:p-4 border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 min-h-[100px] resize-none rounded-xl"
            />
          </div>
        );
      
      case 'radio':
        if (!question.options) return null;
        
        const isOddOptions = question.options.length % 2 !== 0;
        const lastOptionIndex = question.options.length - 1;
        
        return (
          <div className="radio-options-concourse">
            {question.options.map((option, index) => {
              const isLastOption = index === lastOptionIndex;
              const shouldCenter = isOddOptions && isLastOption;
              
              return (
                <motion.div
                  key={index}
                  className={`radio-option-card ${
                    shouldCenter ? 'option-odd-last' : ''
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
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 border-2 border-blue-300 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 flex-shrink-0"
                  />
                  <label className="flex-1 text-sm sm:text-base lg:text-lg text-gray-700 cursor-pointer font-medium leading-tight">
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
          title="Cuestionario de Personalidad Completado | Love on the Brain"
          description="Has completado exitosamente nuestro test de personalidad basado en Carl Jung. Recibirás tus resultados por email pronto."
          keywords={["cuestionario de personalidad", "test de personalidad", "Carl Jung", "resultados", "Love on the Brain"]}
          canonicalUrl="https://loveonthebrain.com/cuestionario-personalidad/completado"
        />
        
        <div className="min-h-screen relative">
          <div className="container mx-auto px-4 py-12 sm:py-20 relative z-10">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 sm:mb-8 shadow-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 sm:mb-6 px-2">
                ¡Cuestionario de Personalidad Completado!
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 px-4">
                Gracias por completar nuestro test de personalidad basado en la teoría de Carl Jung. 
                Hemos recibido tus respuestas y estamos procesando tu perfil de personalidad.
              </p>
              
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/30 shadow-xl mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                  ¿Qué pasa ahora?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm sm:text-base">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Análisis en Proceso</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Nuestros psicólogos están analizando tus respuestas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm sm:text-base">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Resultados Próximamente</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Recibirás un análisis detallado de tu personalidad</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Home className="w-5 h-5 sm:w-5 sm:h-5 mr-2" />
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
        title="Cuestionario de Personalidad | Love on the Brain"
        description="Descubre tu tipo de personalidad con nuestro cuestionario basado en la teoría de Carl Jung. Test de personalidad gratuito y confidencial."
        keywords={[
          "cuestionario de personalidad",
          "test de personalidad",
          "Carl Jung",
          "tipos de personalidad",
          "psicología",
          "psicólogos expertos",
          "Love on the Brain",
          "crecimiento personal",
          "autoconocimiento",
          "psicología analítica"
        ]}
        canonicalUrl="https://loveonthebrain.com/cuestionario-personalidad"
        ogType="website"
        twitterCard="summary_large_image"
      />
      
      <div className="min-h-screen relative questionnaire-container">
        
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
                className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Volver al Inicio</span>
                <span className="sm:hidden">Inicio</span>
              </Button>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
              </div>
            </div>
          </div>
        </motion.header>

        <div className="container mx-auto px-4 py-8 sm:py-12 relative z-10 cuestionario-compacto">
          {/* Header del Cuestionario */}
          <motion.div
            className="text-center mb-8 sm:mb-12 cuestionario-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-6 sm:mb-8 shadow-2xl icono-principal"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-4 sm:mb-6 text-center questionnaire-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Cuestionario de
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700"> Personalidad</span>
            </motion.h1>
            
            <motion.p
              className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8 text-center px-2 questionnaire-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Descubre tu tipo de personalidad con nuestro <strong>test basado en la teoría de Carl Jung</strong>. 
              Este cuestionario de 66 preguntas te ayudará a entender mejor tu personalidad, 
              preferencias y dinámicas sociales.
            </motion.p>

            {/* Progress bar */}
            <div className="w-full max-w-3xl mx-auto bg-gray-200 rounded-full h-3 sm:h-4 mb-4 sm:mb-6 progress-bar">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 sm:h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 progress-text">
              Pregunta {currentStep + 1} de {questions.length}
            </p>
          </motion.div>

          {/* Cuestionario */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white/90 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(59,130,246,0.25),0_0_0_1px_rgba(255,255,255,0.1)] border border-white/30 relative overflow-hidden min-h-[400px] sm:min-h-[450px] questionnaire-card">
                {/* Efecto de brillo en la parte superior */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Borde superior con gradiente */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />
                
                {/* Efecto de sombra interna para profundidad */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5 pointer-events-none" />
                
                <CardHeader className="text-center pb-4 sm:pb-6 card-header">
                  <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-3 sm:mb-4 text-center card-title">
                    {questions[currentStep].text}
                  </CardTitle>
                  {questions[currentStep].required && (
                    <CardDescription className="text-red-500 font-medium text-base sm:text-lg">
                      * Esta pregunta es obligatoria
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4 sm:space-y-6 card-content">
                  <div className="min-h-[200px] sm:min-h-[280px] flex flex-col justify-center cuestionario-opciones">
                    {renderQuestion(questions[currentStep])}
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 pt-4 sm:pt-6 cuestionario-botones">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="w-full sm:w-auto order-2 sm:order-1"
                    >
                      <Button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 disabled:opacity-50 border-2 border-blue-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        Anterior
                      </Button>
                    </motion.div>

                    {currentStep === questions.length - 1 ? (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="w-full sm:w-auto order-1 sm:order-2"
                      >
                        <Button
                          onClick={handleSubmit}
                          size="lg"
                          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-2xl hover:shadow-[0_20px_25px_-5px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-1 boton-enviar"
                        >
                          <Send className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                          Enviar Cuestionario
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="w-full sm:w-auto order-1 sm:order-2"
                      >
                        <Button
                          onClick={handleNext}
                          size="lg"
                          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
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
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-300 hover:underline cuestionario-info-button"
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-2xl w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto mx-1 modal-content modal-ultra-estrecho"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-start justify-between p-2 border-b border-gray-200 modal-header">
                <div className="flex items-start space-x-2 flex-1 min-w-0">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <h2 className="text-sm font-bold text-gray-800 leading-tight modal-title">
                    Información del Cuestionario
                  </h2>
                </div>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="w-5 h-5 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ml-1"
                >
                  <X className="w-3 h-3 text-gray-600" />
                </button>
              </div>
              
              {/* Contenido del modal */}
              <div className="p-2 space-y-2">
                <div>
                  <h3 className="text-xs font-semibold text-gray-800 mb-1 text-center sm:text-left">
                    ¿Por qué elegir nuestro Test de Personalidad?
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed text-center sm:text-left">
                    Nuestro <strong>cuestionario de personalidad</strong> está basado en la teoría de Carl Jung, 
                    uno de los psicólogos más influyentes del siglo XX. Utilizamos metodologías científicas probadas 
                    que analizan múltiples dimensiones de tu personalidad.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-1">
                  <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded-md">
                    <Brain className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-800 mb-0.5 text-xs">Basado en Carl Jung</h4>
                      <p className="text-xs text-gray-600">Teoría psicológica validada científicamente</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded-md">
                    <Heart className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-800 mb-0.5 text-xs">66 Preguntas Clave</h4>
                      <p className="text-xs text-gray-600">Análisis profundo de tu personalidad</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded-md">
                    <Users className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-800 mb-0.5 text-xs">Resultados Detallados</h4>
                      <p className="text-xs text-gray-600">Perfil completo de personalidad</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-1 bg-gray-50 rounded-md">
                    <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-800 mb-0.5 text-xs">100% Confidencial</h4>
                      <p className="text-xs text-gray-600">Tu privacidad es nuestra prioridad</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-md p-2">
                  <h4 className="font-semibold text-gray-800 mb-1 text-xs text-center sm:text-left">
                    Test de Personalidad: ¿Cómo Funciona?
                  </h4>
                  <div className="space-y-0.5 text-xs text-gray-700">
                    <p><strong>🔍 Análisis Profundo:</strong> Evaluamos 66 aspectos clave de tu personalidad</p>
                    <p><strong>🧠 Base Científica:</strong> Teoría de Carl Jung validada por expertos</p>
                    <p><strong>💝 Resultados Personalizados:</strong> Perfil detallado de tu personalidad</p>
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
