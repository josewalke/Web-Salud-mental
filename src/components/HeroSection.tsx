import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Shield, Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingElement } from "./FloatingElement";
import { useCallback } from "react";
import { useDeviceOptimization } from "../hooks/useDeviceOptimization";

export function HeroSection() {
  const { optimizationLevel, getAnimationConfig, isMobile, isLowEnd } = useDeviceOptimization();
  const animationConfig = getAnimationConfig();
  

  
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
    { icon: Shield, text: "Seguro y confidencial" },
    { icon: Brain, text: "Respaldado por expertos" },
    { icon: Sparkles, text: "Científicamente probado" }
  ];

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen py-20 overflow-hidden lazy-section stable-layout"
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
                      <motion.div
              className="space-y-8 animate-optimized"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
            <div className="space-y-6">
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-gray-900 leading-tight break-words"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.28, ease: "easeOut" }}
                style={{ textShadow: '0 2px 4px rgba(255, 255, 255, 0.5)' }}
              >
                El cerebro también se puede
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  {" "}acariciar
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed break-words"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.28, ease: "easeOut" }}
                style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' }}
              >
                Estamos encantados de que quieras trabajar en tu crecimiento personal. 
                ¡Aquí no hay juicio porque ayudamos de corazón! Love on the Brain es una 
                empresa psico-social novedosa con presupuestos amigables.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
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
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
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
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-blue-600 text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
                  onClick={scrollToContact}
                >
                  Contactar
                </Button>
              </motion.div>
            </motion.div>
            


            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 w-full sm:w-auto"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <item.icon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  </motion.div>
                  <span className="text-sm text-gray-700 break-words" style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' }}>
                    {item.text}
                  </span>
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
                {/* Sombra 3D más sutil */}
                <div className="absolute inset-0 bg-blue-200/20 rounded-3xl transform rotate-3 scale-105 blur-xl opacity-40" />

                {/* Contenedor principal con más transparencia */}
                <div className="relative bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-blue-100/50">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-100/10 to-blue-300/10"
                    animate={{
                      background: [
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%)",
                        "linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)",
                        "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%)",
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1634585605949-8f1e029af923?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwd2VsbG5lc3MlMjBtZWRpdGF0aW9ufGVufDF8fHx8MTc1NDQ5NzI5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Persona meditando con dispositivos digitales"
                    className="w-full h-96 object-cover relative z-10 opacity-90"
                  />

                  {/* Overlay con efecto holográfico más sutil */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-400/5 to-transparent"
                    animate={{
                      background: [
                        "linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
                        "linear-gradient(225deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
                        "linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            </FloatingElement>

            {/* Elementos decorativos flotantes más sutiles */}
            <FloatingElement delay={1} duration={5} y={10} className="absolute -top-4 -right-4">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-blue-400/60 to-blue-600/60 rounded-2xl shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.1, rotateZ: 15 }}
                style={{ transformStyle: "preserve-3d" }}
              />
            </FloatingElement>

            <FloatingElement delay={2} duration={6} y={8} className="absolute -bottom-6 -left-6">
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-blue-300/60 to-blue-500/60 rounded-full shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.2 }}
                style={{ transformStyle: "preserve-3d" }}
              />
            </FloatingElement>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 