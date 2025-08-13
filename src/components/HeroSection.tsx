import React from 'react';
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Brain, Star } from 'lucide-react';
import { FloatingElement } from "./FloatingElement";
import { useCallback } from "react";

export function HeroSection() {
  const scrollToSection = useCallback(() => {
    const element = document.getElementById('servicios');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToContact = useCallback(() => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
      icon: Star,
      title: "Científicamente probado",
      description: "Métodos basados en evidencia científica"
    }
  ];

  return (
    <section id="hero" className="hero grid items-center min-h-[80vh] relative overflow-hidden">


      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <motion.div
            className="space-y-8 animate-optimized"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="space-y-6">
              <motion.h1
                className="text-4xl lg:text-6xl text-gray-900 leading-tight text-center sm:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.28, ease: "easeOut" }}

              >
                <span className="block">El cerebro también se puede</span>
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 block"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  acariciar
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-700 leading-relaxed text-center sm:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.28, ease: "easeOut" }}

              >
                Estamos encantados de que quieras trabajar en tu crecimiento personal. 
                ¡Aquí no hay juicio porque ayudamos de corazón! Love on the Brain es una 
                empresa psico-social novedosa con presupuestos amigables.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.28, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 backdrop-blur-sm"
                  onClick={scrollToSection}
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
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-solid border-red-500 text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300"
                  onClick={scrollToContact}
                >
                  Contactar
                </Button>
              </motion.div>
            </motion.div>
            


            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-2 sm:space-y-0 sm:space-x-2 p-4 rounded-xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.15 }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.1, 
                    duration: 0.3
                  }}
                >
                  <motion.div
                    className="mb-2 sm:mb-0"
                    whileHover={{
                      rotate: index === 0 ? 360 : index === 1 ? -360 : 180,
                      scale: 1.2,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <item.icon className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {item.description}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
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
                <div className="relative rounded-3xl shadow-2xl overflow-hidden">

                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1634585605949-8f1e029af923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1NDQ5NzI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Persona meditando con dispositivos digitales"
                    className="w-full h-96 object-cover relative z-10"
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