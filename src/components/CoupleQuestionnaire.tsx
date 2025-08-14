import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Brain, Heart, Users, CheckCircle, Send } from "lucide-react";

interface Question {
  id: number;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
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
    type: 'select',
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
    type: 'select',
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
    type: 'select',
    options: ["Muy fácil", "Fácil", "Difícil", "Muy difícil", "Depende de la situación"],
    required: true
  },
  {
    id: 8,
    text: "¿Sientes ansiedad o inseguridad cuando tu pareja no está disponible emocionalmente?",
    type: 'select',
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
    type: 'select',
    options: ["En el momento", "Tomar espacio primero", "Depende del problema", "No tengo preferencia"],
    required: true
  },
  {
    id: 11,
    text: "¿Qué tan cómodo te sientes expresando tus necesidades y deseos en una relación?",
    type: 'select',
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
    text: "¿Puedes dar un ejemplo de un conflicto que resolviste exitosamente con una expareja?",
    type: 'textarea',
    required: false
  },
  {
    id: 14,
    text: "¿Qué tan importante es para ti la sinceridad, incluso si duele?",
    type: 'select',
    options: ["Muy importante", "Importante", "Poco importante", "No importante", "Prefiero la diplomacia"],
    required: true
  },
  {
    id: 15,
    text: "¿Tiendes a perdonar fácilmente o a guardar resentimiento?",
    type: 'select',
    options: ["Perdono fácilmente", "Perdono con tiempo", "Guardo algo de resentimiento", "Guardo mucho resentimiento", "Depende de la situación"],
    required: true
  },
  {
    id: 16,
    text: "¿Cómo sería tu pareja ideal?",
    type: 'textarea',
    required: true
  },
  {
    id: 17,
    text: "¿Tienes alguna preferencia con el físico?",
    type: 'textarea',
    required: false
  }
];

export function CoupleQuestionnaire() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Aquí puedes enviar los datos a tu backend
    console.log('Datos del cuestionario:', formData);
  };

  const renderQuestion = (question: Question) => {
    const value = formData[question.id.toString()] || '';

    switch (question.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleInputChange(question.id.toString(), e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            className="min-h-[100px] resize-none"
            required={question.required}
          />
        );
      
      case 'select':
        return (
          <Select value={value} onValueChange={(selectedValue: string) => handleInputChange(question.id.toString(), selectedValue)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(question.id.toString(), e.target.value)}
            placeholder="Escribe tu respuesta aquí..."
            required={question.required}
          />
        );
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  if (isSubmitted) {
    return (
      <section id="cuestionario" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-2xl shadow-blue-200/30 border border-blue-100/50">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                ¡Cuestionario Enviado!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Gracias por completar nuestro cuestionario de compatibilidad. 
                Nuestros psicólogos analizarán tus respuestas para encontrar 
                la pareja perfecta para ti.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-6 border border-blue-100/30">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  ¿Qué sigue?
                </h3>
                <ul className="text-left text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                    Recibirás un análisis personalizado en 24-48 horas
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-3" />
                    Te contactaremos para programar una sesión de orientación
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    Comenzaremos a buscar tu pareja ideal
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="cuestionario" className="py-20 relative overflow-hidden">
      {/* Background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/40 to-white/60"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
            "linear-gradient(225deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
            "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.6) 50%, rgba(255, 255, 255, 0.6) 100%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-6 shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Heart className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2
            className="text-4xl lg:text-5xl text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Cuestionario de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600"> Pareja</span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Realizado por psicólogos expertos para encontrar tu pareja ideal
          </motion.p>

          {/* Progress bar */}
          <div className="w-full max-w-2xl mx-auto bg-gray-200 rounded-full h-3 mb-8">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-red-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <p className="text-lg text-gray-600">
            Pregunta {currentStep + 1} de {questions.length}
          </p>
        </motion.div>

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-white/80 backdrop-blur-md shadow-2xl shadow-blue-200/30 border border-blue-100/50">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl lg:text-3xl text-gray-900 mb-4">
                {questions[currentStep].text}
              </CardTitle>
              {questions[currentStep].required && (
                <CardDescription className="text-red-500 font-medium">
                  * Esta pregunta es obligatoria
                </CardDescription>
              )}
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="min-h-[120px]">
                {renderQuestion(questions[currentStep])}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-6">
                <Button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="px-8 py-3 disabled:opacity-50"
                >
                  Anterior
                </Button>

                {currentStep === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 px-8 py-3"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Cuestionario
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-3"
                  >
                    Siguiente
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional info */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-2xl p-8 border border-blue-100/30 inline-block">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              ¿Por qué este cuestionario?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <Brain className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Científicamente Probado</h4>
                  <p className="text-sm text-gray-600">Metodología avalada por psicólogos expertos</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Compatibilidad Real</h4>
                  <p className="text-sm text-gray-600">Encuentra a alguien que realmente te entienda</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800">Resultados Garantizados</h4>
                  <p className="text-sm text-gray-600">O tu dinero de vuelta en 30 días</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
