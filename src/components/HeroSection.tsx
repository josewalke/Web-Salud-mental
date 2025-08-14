import React from 'react';
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Shield, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingElement } from "./FloatingElement";
import { useCallback } from "react";
import { useDeviceOptimization } from "../hooks/useDeviceOptimization";

export function HeroSection() {
  const { isMobile, isLowEnd } = useDeviceOptimization();
  

  
  const scrollToServices = useCallback(() => {
    const element = document.getElementById('servicios');
    if (element) {
      if (isMobile || isLowEnd) {
        element.scrollIntoView();
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isMobile, isLowEnd]);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contacto');
    if (element) {
      if (isMobile || isLowEnd) {
        element.scrollIntoView();
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [isMobile, isLowEnd]);

  const features = [
    {
      icon: Shield,
      title: "Seguro y confidencial",
      description: "Tu privacidad es nuestra prioridad"
    },
    {
      icon: Brain,
      title: "Respaldado por expertos",
      description: "Profesionales certificados en salud mental"
    },
    {
      icon: Sparkles,
      title: "Científicamente probado",
      description: "Métodos basados en evidencia científica"
    }
  ];

  return (
    <section 
      id="inicio" 
      className="section relative min-h-screen py-12 sm:py-16 md:py-20 overflow-visible lazy-section stable-layout safe-area"
      style={{ minHeight: '100svh' }}
    >
      {/* Subtle gradient overlay for better text readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/40 to-white/60"
        animate={isMobile || isLowEnd ? {} : {
          background: [
            "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
            "linear-gradient(225deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
            "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(239, 246, 255, 0.4) 50%, rgba(255, 255, 255, 0.6) 100%)",
          ]
        }}
        transition={isMobile || isLowEnd ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative z-10 px-4 sm:px-6">
        <div className="hero grid items-center min-h-[70vh] sm:min-h-[80vh] gap-6 sm:gap-8 lg:gap-12">
          {/* Contenido de texto arriba */}
          <motion.div
            className="prose space-y-6 sm:space-y-8 animate-optimized w-full text-center sm:text-left order-first"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                className="text-gray-900 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.28, ease: "easeOut" }}
                style={{ 
                  wordBreak: 'keep-all',
                  overflowWrap: 'break-word',
                  hyphens: 'manual',
                  letterSpacing: isMobile ? '-0.01em' : '-0.02em',
                  wordSpacing: isMobile ? '-0.02em' : '-0.05em'
                }}
              >
                <span 
                  className="block break-words" 
                  style={{ 
                    letterSpacing: isMobile ? '-0.015em' : '-0.03em',
                    fontSize: isMobile ? 'clamp(2rem, 6vw, 2.5rem)' : undefined
                  }}
                >
                  El cerebro también se puede
                </span>
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 block break-words"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%",
                    wordBreak: 'keep-all',
                    overflowWrap: 'break-word',
                    hyphens: 'manual',
                    letterSpacing: isMobile ? '-0.02em' : '-0.04em',
                    wordSpacing: isMobile ? '-0.03em' : '-0.08em',
                    fontSize: isMobile ? 'clamp(2.2rem, 7vw, 2.8rem)' : undefined
                  }}
                >
                  acariciar
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-body text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto sm:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.28, ease: "easeOut" }}
                style={{
                  wordBreak: 'keep-all',
                  overflowWrap: 'break-word',
                  fontSize: isMobile ? 'clamp(1rem, 3.5vw, 1.125rem)' : undefined
                }}
              >
                Estamos encantados de que quieras trabajar en tu crecimiento personal. 
                ¡Aquí no hay juicio porque ayudamos de corazón! Love on la Brain es una 
                empresa psico-social novedosa e integradora social con presupuestos amigables.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center sm:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.28, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base py-3 sm:py-4"
                  onClick={scrollToServices}
                >
                  Explorar packs
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base py-3 sm:py-4"
                  onClick={scrollToContact}
                >
                  Contactar
                </Button>
              </motion.div>
            </motion.div>
            


            <motion.div
              className="features flex flex-col items-center sm:items-start gap-3 sm:gap-4 pt-4 sm:pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-start"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1, 
                    duration: 0.3
                  }}
                >
                  <motion.div
                    className="mb-0"
                    whileHover={{
                      rotate: index === 0 ? 360 : index === 1 ? -360 : 180,
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                  </motion.div>
                  <div className="flex flex-col text-center sm:text-left">
                    <span className="text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap">
                      {item.title}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 mt-1">
                      {item.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Imagen abajo */}
          <motion.div
            className="relative w-full order-last"
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <FloatingElement delay={0.5} duration={4} y={15}>
              <motion.div
                className="relative"
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  rotateX: 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Contenedor principal sin background */}
                <div className="relative rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">

                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1634585605949-8f1e029af923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1NDQ5NzI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Persona meditando con dispositivos digitales"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover relative z-10"
                  />


                </div>
              </motion.div>
            </FloatingElement>


          </motion.div>
        </div>
      </div>
    </section>
  );
} 