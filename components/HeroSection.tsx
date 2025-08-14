import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Phone, ArrowRight, Shield, Brain, Award } from 'lucide-react';
import { useMobileAnimations } from './ui/use-mobile-animations';
import heroImage from '../src/assets/images/hero/WhatsApp Image 2025-08-14 at 12.33.22 (1).jpeg';

export default function HeroSection() {
  const enableAnimations = useMobileAnimations();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Seguro y confidencial',
      description: 'Tu privacidad es nuestra prioridad',
      delay: 0.6
    },
    {
      icon: Brain,
      title: 'Respaldado por expertos',
      description: 'Profesionales certificados en salud mental',
      delay: 0.8
    },
    {
      icon: Award,
      title: 'Científicamente probado',
      description: 'Métodos basados en evidencia científica',
      delay: 1.0
    }
  ];

  return (
    <section 
      id="inicio" 
      className="hero-section pt-20 sm:pt-24 lg:pt-28 xl:pt-32 pb-4 sm:pb-6 lg:pb-8 overflow-hidden bg-transparent"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-10 items-center">
          {/* Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-enhanced-title mb-2 sm:mb-3 lg:mb-4 leading-tight"
              initial={enableAnimations ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enableAnimations ? { duration: 0.8, delay: 0.1 } : { duration: 0 }}
              itemProp="name"
            >
              El cerebro también se puede
              <motion.span 
                className="text-blue-700 block sm:inline"
                initial={enableAnimations ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={enableAnimations ? { duration: 0.6, delay: 0.4 } : { duration: 0 }}
              >
                {" "}acariciar
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg lg:text-xl text-enhanced-subtitle mb-4 sm:mb-5 lg:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enableAnimations ? { duration: 0.8, delay: 0.3 } : { duration: 0 }}
              itemProp="description"
            >
              Estamos encantados de que quieras trabajar en tu crecimiento personal. ¡Aquí no hay juicio porque ayudamos de corazón! Love on la Brain es una empresa psico-social novedosa con presupuestos amigables especializada en servicios de salud mental y bienestar emocional.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-4 sm:mb-5 lg:mb-6"
              initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={enableAnimations ? { duration: 0.8, delay: 0.5 } : { duration: 0 }}
            >
              <motion.div
                whileHover={enableAnimations ? { scale: 1.05, y: -2 } : {}}
                whileTap={enableAnimations ? { scale: 0.95 } : {}}
                transition={enableAnimations ? { type: "spring", stiffness: 400, damping: 25 } : {}}
              >
                <Button 
                  className="button-enhanced bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  onClick={() => scrollToSection('#contacto')}
                  aria-label="Comenzar mi proceso de crecimiento personal"
                >
                  Comenzar ahora
                  <motion.div
                    className="ml-2"
                    animate={enableAnimations ? { x: [0, 3, 0] } : { x: 0 }}
                    transition={enableAnimations ? { 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : { duration: 0 }}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={enableAnimations ? { scale: 1.05, y: -2 } : {}}
                whileTap={enableAnimations ? { scale: 0.95 } : {}}
                transition={enableAnimations ? { type: "spring", stiffness: 400, damping: 25 } : {}}
              >
                <Button 
                  variant="outline" 
                  className="button-enhanced-outline border-blue-600 text-blue-700 hover:bg-blue-50 px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg rounded-xl border-2 hover:border-blue-700 transition-all duration-300 w-full sm:w-auto"
                  onClick={() => scrollToSection('#contacto')}
                  aria-label="Contactar con profesionales de salud mental"
                >
                  Contactar
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Features Grid - Compactado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-2 sm:gap-3 lg:gap-2 xl:gap-3 max-w-3xl mx-auto lg:mx-0">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="feature-enhanced p-2 sm:p-3 space-y-1 sm:space-y-2 rounded-xl"
                    initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={enableAnimations ? { duration: 0.6, delay: feature.delay } : { duration: 0 }}
                    whileHover={enableAnimations ? { y: -3, scale: 1.02 } : {}}
                    itemScope
                    itemType="https://schema.org/Thing"
                  >
                    <motion.div 
                      className="flex items-center space-x-2 sm:space-x-3"
                      whileHover={enableAnimations ? { x: 5 } : {}}
                      transition={enableAnimations ? { type: "spring", stiffness: 400, damping: 25 } : {}}
                    >
                      <motion.div
                        className="flex-shrink-0"
                        whileHover={enableAnimations ? { 
                          rotate: [0, -10, 10, 0],
                          scale: 1.1 
                        } : {}}
                        transition={enableAnimations ? { duration: 0.4 } : {}}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </motion.div>
                      <h4 className="font-semibold text-enhanced text-xs sm:text-sm flex-1" itemProp="name">
                        {feature.title}
                      </h4>
                    </motion.div>
                    <p className="text-enhanced text-xs leading-relaxed pl-6 sm:pl-8" itemProp="description">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Image - Más compacta */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={enableAnimations ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={enableAnimations ? { duration: 0.8, delay: 0.2 } : { duration: 0 }}
          >
            <motion.div 
              className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl"
              whileHover={enableAnimations ? { 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              } : {}}
              transition={enableAnimations ? { duration: 0.4 } : {}}
            >
              <motion.div
                whileHover={enableAnimations ? { scale: 1.05 } : {}}
                transition={enableAnimations ? { duration: 0.6 } : {}}
                className="overflow-hidden rounded-lg sm:rounded-xl"
              >
                <img
                  src={heroImage}
                  alt="Profesional de salud mental sonriendo - Love on the Brain - Servicios de bienestar emocional con presupuestos amigables - Salud mental sin juicios - El cerebro también se puede acariciar"
                  className="w-full h-auto object-contain"
                  loading="eager"
                  itemProp="image"
                />
              </motion.div>
              
              {/* Floating elements - Más pequeños */}
              <motion.div
                className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white p-1.5 sm:p-2 rounded-full shadow-lg border border-white/20"
                animate={enableAnimations ? { 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                } : { y: 0, rotate: 0 }}
                transition={enableAnimations ? { 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : { duration: 0 }}
                aria-label="Icono cerebro - Salud mental"
              >
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
              </motion.div>
              
              <motion.div
                className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-blue-600 p-1.5 sm:p-2 rounded-full shadow-lg border border-blue-500"
                animate={enableAnimations ? { 
                  scale: [1, 1.1, 1],
                  opacity: [0.9, 1, 0.9]
                } : { scale: 1, opacity: 1 }}
                transition={enableAnimations ? { 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : { duration: 0 }}
                aria-label="Icono escudo - Privacidad garantizada"
              >
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}