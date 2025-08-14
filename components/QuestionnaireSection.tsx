import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, User, ArrowRight } from 'lucide-react';

interface QuestionnaireSectionProps {
  onNavigateToQuestionnaire: (type: 'pareja' | 'personalidad') => void;
}

export default function QuestionnaireSection({ onNavigateToQuestionnaire }: QuestionnaireSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const questionnaires = [
    {
      id: 'couple',
      type: 'pareja' as const,
      title: 'Cuestionario de Pareja',
      description: 'Encuentra a tu pareja ideal. Evaluamos tus preferencias, valores y personalidad para conectarte con alguien verdaderamente compatible.',
      icon: Heart,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonColor: 'bg-red-500 hover:bg-red-600',
      gradientFrom: 'from-red-50',
      gradientTo: 'to-pink-50',
      features: [
        'Preferencias románticas',
        'Valores y creencias',
        'Estilo de vida ideal',
        'Compatibilidad emocional'
      ],
      delay: 0.2
    },
    {
      id: 'personality',
      type: 'personalidad' as const,
      title: 'Cuestionario de Personalidad',
      description: 'Conoce mejor tu personalidad y descubre cómo puedes crecer en tu desarrollo personal y bienestar emocional.',
      icon: User,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      gradientFrom: 'from-blue-50',
      gradientTo: 'to-indigo-50',
      features: [
        'Fortalezas personales',
        'Áreas de mejora',
        'Estilo de comunicación',
        'Patrones de comportamiento'
      ],
      delay: 0.4
    }
  ];

  return (
    <section id="cuestionarios" className="py-16 sm:py-20 lg:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cuestionarios de <span className="text-blue-600">Autoconocimiento</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Comienza tu viaje de crecimiento personal respondiendo nuestros cuestionarios especializados. 
            Cada uno está diseñado para ayudarte a entender mejor aspectos importantes de tu vida.
          </motion.p>
        </motion.div>

        {/* Questionnaires Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          {questionnaires.map((questionnaire) => {
            const IconComponent = questionnaire.icon;
            return (
              <motion.div
                key={questionnaire.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: questionnaire.delay }}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className={`overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 group bg-gradient-to-br ${questionnaire.gradientFrom} ${questionnaire.gradientTo} h-full`}>
                    <CardContent className="p-8 lg:p-10 h-full flex flex-col">
                      {/* Icon */}
                      <motion.div 
                        className="flex justify-center mb-6"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                        transition={{ duration: 0.6, delay: questionnaire.delay + 0.3 }}
                      >
                        <motion.div 
                          className={`${questionnaire.iconBg} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                          whileHover={{ 
                            rotate: [0, -10, 10, 0],
                            scale: 1.15 
                          }}
                          transition={{ duration: 0.4 }}
                        >
                          <IconComponent className={`h-8 w-8 ${questionnaire.iconColor}`} />
                        </motion.div>
                      </motion.div>

                      {/* Content */}
                      <div className="text-center flex-1 flex flex-col">
                        <motion.h3 
                          className="text-2xl lg:text-3xl text-gray-900 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, delay: questionnaire.delay + 0.4 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          {questionnaire.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-gray-600 mb-8 leading-relaxed text-lg flex-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, delay: questionnaire.delay + 0.5 }}
                        >
                          {questionnaire.description}
                        </motion.p>

                        {/* Features */}
                        <motion.div 
                          className="mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, delay: questionnaire.delay + 0.6 }}
                        >
                          <h4 className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                            Lo que evaluamos:
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {questionnaire.features.map((feature, index) => (
                              <motion.div 
                                key={index} 
                                className="flex items-center text-sm text-gray-700 group/feature"
                                initial={{ opacity: 0, x: -10 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                transition={{ 
                                  duration: 0.4, 
                                  delay: questionnaire.delay + 0.7 + (index * 0.05) 
                                }}
                                whileHover={{ x: 5 }}
                              >
                                <motion.div 
                                  className={`w-1.5 h-1.5 rounded-full mr-2 ${questionnaire.iconColor === 'text-red-600' ? 'bg-red-500' : 'bg-blue-500'}`}
                                  whileHover={{ scale: 1.5 }}
                                  transition={{ duration: 0.2 }}
                                />
                                <span className="group-hover/feature:text-gray-900 transition-colors duration-200">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.6, delay: questionnaire.delay + 0.8 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            className={`${questionnaire.buttonColor} text-white w-full group-hover:scale-105 transition-all duration-300 text-lg py-6 shadow-lg hover:shadow-xl`}
                            onClick={() => onNavigateToQuestionnaire(questionnaire.type)}
                          >
                            <span>Comenzar Cuestionario</span>
                            <motion.div
                              className="ml-2"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ 
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <ArrowRight className="h-5 w-5" />
                            </motion.div>
                          </Button>
                        </motion.div>

                        {/* Additional info */}
                        <motion.p 
                          className="text-xs text-gray-500 mt-4"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.6, delay: questionnaire.delay + 1.0 }}
                        >
                          ⏱️ Tiempo estimado: 10-15 minutos
                        </motion.p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full shadow-lg border border-gray-100"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="h-5 w-5 text-blue-600" />
            </motion.div>
            <span className="text-gray-700">¿No sabes cuál elegir? Puedes hacer ambos cuestionarios</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}