import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Heart, Users, UserCheck, TrendingUp, Info, Users2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
// Pack de Parejas
import coupleImage1 from '../src/assets/images/packs/Pack de parejas/WhatsApp Image 2025-08-07 at 21.32.39.jpeg';
import coupleImage2 from '../src/assets/images/packs/Pack de parejas/WhatsApp Image 2025-08-07 at 21.32.39 (1).jpeg';

// Pack de Parejas Establecidas
import establishedCouple1 from '../src/assets/images/packs/Pack parejas formadas/WhatsApp Image 2025-08-07 at 21.40.10.jpeg';
import establishedCouple2 from '../src/assets/images/packs/Pack parejas formadas/WhatsApp Image 2025-08-07 at 21.40.10 (1).jpeg';
import establishedCouple3 from '../src/assets/images/packs/Pack parejas formadas/WhatsApp Image 2025-08-07 at 21.40.10 (2).jpeg';

// Pack de Amistades
import friendsImage1 from '../src/assets/images/packs/Pack amistades/WhatsApp Image 2025-08-07 at 21.34.26.jpeg';
import friendsImage2 from '../src/assets/images/packs/Pack amistades/WhatsApp Image 2025-08-07 at 21.34.26 (1).jpeg';

// Pack de Crecimiento Personal (Inteligencia Emocional)
import personalGrowthImage1 from '../src/assets/images/packs/Inteligencia emocional/WhatsApp Image 2025-08-07 at 21.37.59.jpeg';
import personalGrowthImage2 from '../src/assets/images/packs/Inteligencia emocional/WhatsApp Image 2025-08-07 at 21.38.00.jpeg';

// Componente para imágenes con animación de fadeIn/fadeOut (Parejas)
function AnimatedCoupleImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const images = [coupleImage1, coupleImage2];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt="Pareja feliz"
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

// Componente para imágenes con animación de fadeIn/fadeOut (Parejas ya Formadas)
function AnimatedEstablishedCoupleImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const images = [establishedCouple1, establishedCouple2, establishedCouple3];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt="Pareja establecida"
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

// Componente para imágenes con animación de fadeIn/fadeOut (Amistades)
function AnimatedFriendsImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const images = [friendsImage1, friendsImage2];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt="Grupo de amigos"
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

// Componente para imágenes con animación de fadeIn/fadeOut (Crecimiento Personal)
function AnimatedPersonalGrowthImages() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const images = [personalGrowthImage1, personalGrowthImage2];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsVisible(true);
      }, 1000);
    }, 12000);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={images[currentImageIndex]}
        alt="Crecimiento personal"
        className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

interface PacksSectionProps {
  onNavigateToQuestionnaire?: (type: 'pareja' | 'personalidad') => void;
}

export default function PacksSection({ onNavigateToQuestionnaire }: PacksSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const packs = [
    {
      id: 'crecimiento-personal',
      title: 'Crecimiento Personal',
      description: 'Centrarse en uno mismo y subir la autoestima. Trabajamos contigo para que te conozcas y tomes mejores decisiones en tu vida.',
      image: '',
      features: [
        'Autoestima',
        'Autoconocimiento', 
        'Desarrollo personal',
        'Mejores decisiones'
      ],
      buttonColor: 'bg-pink-500 hover:bg-pink-600 text-white',
      icon: TrendingUp,
      iconBg: 'bg-pink-100',
      iconColor: 'text-pink-600',
      bulletColor: 'bg-pink-500',
      useAnimatedImages: true,
      animationType: 'personal-growth',
      delay: 0.1,
      hasQuestionnaire: true,
      questionnaireType: 'personalidad' as const
    },
    {
      id: 'parejas',
      title: 'Parejas',
      description: 'Conectar a alguien especial y compatible contigo. ¿Le echamos una mano a Cupido? Evitamos relaciones tóxicas a través de dinámicas y cuestionarios.',
      image: '',
      features: [
        'Compatibilidad',
        'Prevención tóxicas',
        'Dinámicas',
        'Cuestionarios'
      ],
      buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
      icon: Heart,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      bulletColor: 'bg-red-500',
      useAnimatedImages: true,
      animationType: 'couples',
      delay: 0.2,
      hasQuestionnaire: true,
      questionnaireType: 'pareja' as const
    },
    {
      id: 'amistades',
      title: 'Amistades',
      description: 'Ampliar tu círculo social con personas compatibles contigo. Aventuras y conexiones auténticas para enriquecer tu vida.',
      image: '',
      features: [
        'Círculo social',
        'Compatibilidad',
        'Aventuras',
        'Conexiones'
      ],
      buttonColor: 'bg-blue-500 hover:bg-blue-600 text-white',
      icon: Users,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      bulletColor: 'bg-blue-500',
      useAnimatedImages: true,
      animationType: 'friends',
      delay: 0.3,
      hasQuestionnaire: false,
      questionnaireType: null
    },
    {
      id: 'parejas-formadas',
      title: 'Parejas ya Formadas',
      description: 'Salir del bucle y volver a conectar. Reavivamos la chispa y fortalecemos los lazos existentes.',
      image: '',
      features: [
        'Reconexión',
        'Fortaleza',
        'Renovación',
        'Lazos'
      ],
      buttonColor: 'bg-green-500 hover:bg-green-600 text-white',
      icon: Users2,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      bulletColor: 'bg-green-500',
      useAnimatedImages: true,
      animationType: 'established',
      delay: 0.4,
      hasQuestionnaire: false,
      questionnaireType: null
    }
  ];

  const handleQuestionnaireClick = (pack: typeof packs[0]) => {
    if (pack.hasQuestionnaire && pack.questionnaireType && onNavigateToQuestionnaire) {
      onNavigateToQuestionnaire(pack.questionnaireType);
    } else {
      scrollToSection('#cuestionarios');
    }
  };

  return (
    <section id="packs" className="py-16 sm:py-20 lg:py-24" ref={ref}>
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
            Nuestros Packs de <span className="text-blue-600">Bienestar</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Cada pack incluye una salida sorpresa con chofer y está diseñado para trabajar 
            aspectos específicos de tu bienestar emocional y social.
          </motion.p>
        </motion.div>

        {/* Packs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packs.map((pack) => {
            const IconComponent = pack.icon;
            return (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: pack.delay }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 group">
                    <motion.div 
                      className="relative h-64 overflow-hidden"
                      whileHover={{ scale: 1.01 }}
                    >
                      {pack.useAnimatedImages ? (
                        pack.animationType === 'couples' ? (
                          <AnimatedCoupleImages />
                        ) : pack.animationType === 'established' ? (
                          <AnimatedEstablishedCoupleImages />
                        ) : pack.animationType === 'friends' ? (
                          <AnimatedFriendsImages />
                        ) : pack.animationType === 'personal-growth' ? (
                          <AnimatedPersonalGrowthImages />
                        ) : null
                      ) : (
                        <ImageWithFallback
                          src={pack.image}
                          alt={pack.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                      
                      <motion.div 
                        className="absolute top-4 left-4"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0] 
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className={`${pack.iconBg} p-3 rounded-full shadow-lg`}>
                          <IconComponent className={`h-6 w-6 ${pack.iconColor}`} />
                        </div>
                      </motion.div>
                      
                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
                        initial={false}
                      />
                    </motion.div>
                    
                    <CardContent className="p-8">
                      <motion.h3 
                        className="text-2xl text-gray-900 mb-4"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {pack.title}
                      </motion.h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {pack.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {pack.features.map((feature, index) => (
                          <motion.li 
                            key={index} 
                            className="flex items-center group/item"
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ duration: 0.4, delay: pack.delay + (index * 0.05) + 0.3 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div 
                              className={`w-2 h-2 ${pack.bulletColor} rounded-full mr-3 flex-shrink-0`}
                              whileHover={{ scale: 1.5 }}
                              transition={{ duration: 0.2 }}
                            />
                            <span className="text-gray-700 text-sm group-hover/item:text-gray-900 transition-colors duration-200">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      <div className="space-y-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            className={`w-full ${pack.buttonColor} shadow-lg hover:shadow-xl transition-all duration-300`}
                            onClick={() => scrollToSection('#contacto')}
                          >
                            Consultar pack →
                          </Button>
                        </motion.div>
                        
                        {pack.hasQuestionnaire ? (
                          <motion.button 
                            className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group/btn"
                            whileHover={{ y: -2 }}
                            onClick={() => handleQuestionnaireClick(pack)}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Heart className="h-4 w-4" />
                            </motion.div>
                            <span className="text-sm">Hacer Cuestionario</span>
                          </motion.button>
                        ) : (
                          <motion.button 
                            className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors group/btn"
                            whileHover={{ y: -2 }}
                            onClick={() => scrollToSection('#contacto')}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Info className="h-4 w-4" />
                            </motion.div>
                            <span className="text-sm">Más información</span>
                          </motion.button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}