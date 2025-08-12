import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Target, Heart, Users, UserCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo, useEffect } from "react";

// Importar imágenes locales
import crecimientoPersonalImg from "../assets/images/services/crecimiento-personal.jpg";
import parejasImg from "../assets/images/services/parejas.jpg";
import amistadesImg from "../assets/images/services/amistades.jpg";
import parejasFormadasImg from "../assets/images/services/parejas-formadas.jpg";

// Imágenes para el carrusel de cada pack - TODAS las imágenes que me diste
const CARRUSEL_IMAGENES = {
  crecimientoPersonal: [
    crecimientoPersonalImg, // Tu imagen principal
    require("../assets/images/Inteligencia emocional/WhatsApp Image 2025-08-07 at 21.37.59.jpeg"),
    require("../assets/images/Inteligencia emocional/WhatsApp Image 2025-08-07 at 21.38.00.jpeg")
  ],
  parejas: [
    parejasImg, // Tu imagen principal
    require("../assets/images/Pack de parejas/WhatsApp Image 2025-08-07 at 21.32.39.jpeg"),
    require("../assets/images/Pack de parejas/WhatsApp Image 2025-08-07 at 21.32.39 (1).jpeg")
  ],
  amistades: [
    amistadesImg, // Tu imagen principal
    require("../assets/images/Pack amistades/WhatsApp Image 2025-08-07 at 21.34.26.jpeg"),
    require("../assets/images/Pack amistades/WhatsApp Image 2025-08-07 at 21.34.26 (1).jpeg")
  ],
  parejasFormadas: [
    parejasFormadasImg, // Tu imagen principal
    require("../assets/images/Pack parejas formadas/WhatsApp Image 2025-08-07 at 21.40.10.jpeg"),
    require("../assets/images/Pack parejas formadas/WhatsApp Image 2025-08-07 at 21.40.10 (1).jpeg"),
    require("../assets/images/Pack parejas formadas/WhatsApp Image 2025-08-07 at 21.40.10 (2).jpeg")
  ]
};

export function ServicesSection() {

  const [carouselIndices, setCarouselIndices] = useState({
    crecimientoPersonal: 0,
    parejas: 0,
    amistades: 0,
    parejasFormadas: 0
  });

  // Estado para rastrear la imagen anterior y evitar repeticiones
  const [previousImages, setPreviousImages] = useState<Record<string, string>>({
    crecimientoPersonal: '',
    parejas: '',
    amistades: '',
    parejasFormadas: ''
  });

  // Carrusel automático con garantía de cambio de imagen
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndices(prev => {
        const getNextIndex = (currentIndex: number, totalImages: number, packType: keyof typeof CARRUSEL_IMAGENES) => {
          // Forzar cambio de imagen - nunca mantener la misma
          let nextIndex = (currentIndex + 1) % totalImages;
          
          // Si solo hay 2 imágenes, alternar forzadamente
          if (totalImages === 2) {
            nextIndex = currentIndex === 0 ? 1 : 0;
          }
          
          // Si hay más de 2 imágenes, asegurar cambio
          if (totalImages > 2) {
            // Si por alguna razón sería la misma, saltar a la siguiente
            if (nextIndex === currentIndex) {
              nextIndex = (nextIndex + 1) % totalImages;
            }
          }
          
          // Verificación final: si aún es la misma, usar índice 0
          if (nextIndex === currentIndex) {
            nextIndex = 0;
          }
          
          return nextIndex;
        };

        const newIndices = {
          crecimientoPersonal: getNextIndex(prev.crecimientoPersonal, CARRUSEL_IMAGENES.crecimientoPersonal.length, 'crecimientoPersonal'),
          parejas: getNextIndex(prev.parejas, CARRUSEL_IMAGENES.parejas.length, 'parejas'),
          amistades: getNextIndex(prev.amistades, CARRUSEL_IMAGENES.amistades.length, 'amistades'),
          parejasFormadas: getNextIndex(prev.parejasFormadas, CARRUSEL_IMAGENES.parejasFormadas.length, 'parejasFormadas')
        };

        // Verificar que realmente haya cambios
        const hasChanges = Object.keys(newIndices).some(key => 
          newIndices[key as keyof typeof newIndices] !== prev[key as keyof typeof prev]
        );

        // Log detallado de verificación (comentado para reducir ruido en consola)
        // if (process.env.NODE_ENV === 'development') {
        //   console.log('🔍 Verificación de cambios:', {
        //     crecimientoPersonal: { prev: prev.crecimientoPersonal, new: newIndices.crecimientoPersonal, changed: newIndices.crecimientoPersonal !== prev.crecimientoPersonal },
        //     parejas: { prev: prev.parejas, new: newIndices.parejas, changed: newIndices.parejas !== prev.parejas },
        //     amistades: { prev: prev.amistades, new: newIndices.amistades, changed: newIndices.amistades !== prev.amistades },
        //     parejasFormadas: { prev: prev.parejasFormadas, new: newIndices.parejasFormadas, changed: newIndices.parejasFormadas !== prev.parejasFormadas }
        //   });
        // }

        // Solo actualizar si hay cambios reales
        if (hasChanges) {
          // Actualizar las imágenes anteriores para transiciones suaves
          setPreviousImages({
            crecimientoPersonal: CARRUSEL_IMAGENES.crecimientoPersonal[prev.crecimientoPersonal],
            parejas: CARRUSEL_IMAGENES.parejas[prev.parejas],
            amistades: CARRUSEL_IMAGENES.amistades[prev.amistades],
            parejasFormadas: CARRUSEL_IMAGENES.parejasFormadas[prev.parejasFormadas]
          });

          // Log para verificar cambios (solo en desarrollo) - comentado para reducir ruido
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('🔄 Carrusel actualizado:', {
          //     crecimientoPersonal: `${prev.crecimientoPersonal} → ${newIndices.crecimientoPersonal}`,
          //     parejas: `${prev.parejas} → ${newIndices.parejas}`,
          //     amistades: `${prev.amistades} → ${newIndices.amistades}`,
          //     parejasFormadas: `${prev.parejasFormadas} → ${newIndices.parejasFormadas}`
          //   });
          // }

          return newIndices;
        } else {
          // Si no hay cambios, forzar un cambio
          // console.log('⚠️ Forzando cambio de imagen...');
          return {
            crecimientoPersonal: (prev.crecimientoPersonal + 1) % CARRUSEL_IMAGENES.crecimientoPersonal.length,
            parejas: (prev.parejas + 1) % CARRUSEL_IMAGENES.parejas.length,
            amistades: (prev.amistades + 1) % CARRUSEL_IMAGENES.amistades.length,
            parejasFormadas: (prev.parejasFormadas + 1) % CARRUSEL_IMAGENES.parejasFormadas.length
          };
        }
      });
    }, 6000); // Cambia cada 6 segundos para que las transiciones de 2 segundos se vean completamente

    return () => clearInterval(interval);
  }, []);

  // Verificación adicional de cambios de imagen
  useEffect(() => {
    const checkImageChanges = () => {
      Object.keys(carouselIndices).forEach(packType => {
        // const currentIndex = carouselIndices[packType as keyof typeof carouselIndices];
        // const currentImage = CARRUSEL_IMAGENES[packType as keyof typeof CARRUSEL_IMAGENES][currentIndex];
        
        // if (process.env.NODE_ENV === 'development') {
        //   console.log(`📸 ${packType}: Imagen actual`);
        // }
      });
    };

    // Verificar cambios cada vez que cambien los índices
    checkImageChanges();
  }, [carouselIndices]);

  // Funciones de navegación del carrusel (mantenidas para funcionalidad futura)
  // const nextImage = (packType: keyof typeof carouselIndices) => {
  //   setCarouselIndices(prev => ({
  //     ...prev,
  //     [packType]: (prev[packType] + 1) % CARRUSEL_IMAGENES[packType].length
  //   }));
  // };

  // const prevImage = (packType: keyof typeof carouselIndices) => {
  //   setCarouselIndices(prev => ({
  //     ...prev,
  //     [packType]: prev[packType] === 0 
  //       ? CARRUSEL_IMAGENES[packType].length - 1 
  //       : prev[packType] - 1
  //     }));
  // };

  const services = useMemo(() => [
    {
      icon: <Target className="w-8 h-8 text-pink-600" />,
      title: "Crecimiento Personal",
      description: "Centrarse en uno mismo y subir la autoestima. Trabajamos contigo para que te conozcas mejor y tomes mejores decisiones en tu vida.",
      image: CARRUSEL_IMAGENES.crecimientoPersonal[carouselIndices.crecimientoPersonal],
      features: ["Autoestima", "Autoconocimiento", "Desarrollo personal", "Mejores decisiones"],
      color: "from-pink-500 to-pink-700",
      packType: 'crecimientoPersonal'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Parejas",
      description: "Conocer a alguien especial y compatible contigo. ¿Le echamos una mano a Cupido? Evitamos relaciones tóxicas a través de dinámicas y cuestionarios.",
      image: CARRUSEL_IMAGENES.parejas[carouselIndices.parejas],
      features: ["Compatibilidad", "Prevención tóxicas", "Dinámicas", "Cuestionarios"],
      color: "from-red-500 to-red-700",
      packType: 'parejas'
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Amistades",
      description: "Ampliar tu círculo social con personas compatibles contigo. Aventuras y conexiones auténticas para enriquecer tu vida.",
      image: CARRUSEL_IMAGENES.amistades[carouselIndices.amistades],
      features: ["Círculo social", "Compatibilidad", "Aventuras", "Conexiones"],
      color: "from-blue-500 to-blue-700",
      packType: 'amistades'
    },
    {
      icon: <UserCheck className="w-8 h-8 text-green-600" />,
      title: "Parejas ya Formadas",
      description: "Salir del bucle y volver a conectar. Reavivamos la chispa y fortalecemos los lazos existentes.",
      image: CARRUSEL_IMAGENES.parejasFormadas[carouselIndices.parejasFormadas],
      features: ["Reconexión", "Fortaleza", "Renovación", "Lazos"],
      color: "from-green-500 to-green-700",
      packType: 'parejasFormadas'
    }
  ], [carouselIndices]);

  return (
    <section id="servicios" className="py-20 relative overflow-hidden">
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


        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl lg:text-5xl text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{ textShadow: '0 2px 4px rgba(255, 255, 255, 0.5)' }}
          >
            Nuestros Packs de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Bienestar</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' }}
          >
            Cada pack incluye una salida sorpresa con chofer y está diseñado para trabajar 
            aspectos específicos de tu bienestar emocional y social.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="transition-all duration-500 ease-out hover:z-10"
            >
              <Card 
                className="group h-full border-blue-100/50 bg-white/70 backdrop-blur-md shadow-lg overflow-hidden transition-all duration-500 ease-out hover:shadow-custom hover:border-blue-200/70 hover:bg-white/90 hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  '--hover-shadow-color': service.color === 'from-pink-500 to-pink-700' ? 'rgba(236, 72, 153, 0.3)' :
                                         service.color === 'from-red-500 to-red-700' ? 'rgba(239, 68, 68, 0.3)' :
                                         service.color === 'from-blue-500 to-blue-700' ? 'rgba(59, 130, 246, 0.3)' :
                                         service.color === 'from-green-500 to-green-700' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.3)',
                  '--hover-text-color': service.color === 'from-pink-500 to-pink-700' ? '#be185d' :
                                       service.color === 'from-red-500 to-red-700' ? '#dc2626' :
                                       service.color === 'from-blue-500 to-blue-700' ? '#1d4ed8' :
                                       service.color === 'from-green-500 to-green-700' ? '#16a34a' : '#1d4ed8',
                  '--hover-accent-color': service.color === 'from-pink-500 to-pink-700' ? '#ec4899' :
                                         service.color === 'from-red-500 to-red-700' ? '#ef4444' :
                                         service.color === 'from-blue-500 to-blue-700' ? '#3b82f6' :
                                         service.color === 'from-green-500 to-green-700' ? '#22c55e' : '#3b82f6'
                } as React.CSSProperties}
              >
                {/* CSS inline para colores personalizados */}
                <style dangerouslySetInnerHTML={{
                  __html: `
                    .group:hover .group-hover\\:text-custom {
                      color: var(--hover-text-color) !important;
                    }
                    .group:hover .group-hover\\:bg-custom {
                      background-color: var(--hover-accent-color) !important;
                    }
                    .group:hover .group-hover\\:shadow-custom {
                      box-shadow: 0 10px 25px -3px var(--hover-shadow-color) !important;
                    }
                  `
                }} />
                <div className="relative overflow-hidden">
                  {/* Carrusel de imágenes - SIN EFECTOS HOVER */}
                  <div className="relative">
                    <div className="w-full h-48 overflow-hidden relative">
                      {/* Imagen actual */}
                      <motion.div
                        key={`${service.packType}-current-${carouselIndices[service.packType as keyof typeof carouselIndices]}-${Date.now()}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          duration: 2.5,
                          ease: [0.4, 0.0, 0.2, 1.0],
                          delay: 0.2
                        }}
                        className="absolute inset-0"
                      >
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      
                      {/* Imagen anterior (para transición suave) */}
                      {previousImages[service.packType as keyof typeof previousImages] && (
                        <motion.div
                          key={`${service.packType}-previous-${previousImages[service.packType as keyof typeof previousImages]}`}
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 0 }}
                          transition={{ 
                            duration: 2.5,
                            ease: [0.4, 0.0, 0.2, 1.0]
                          }}
                          className="absolute inset-0"
                        >
                          <ImageWithFallback
                            src={previousImages[service.packType as keyof typeof previousImages]}
                            alt={service.title}
                            className="w-full h-48 object-cover"
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Icono flotante con hover elegante */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg transition-all duration-300 group-hover:bg-blue-50 group-hover:shadow-xl group-hover:shadow-blue-200/40 group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                </div>

                <CardHeader className="pb-4 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-50/50 group-hover:to-transparent">
                  <div>
                    <CardTitle 
                      className="text-gray-900 text-xl mb-2 transition-all duration-300 group-hover:scale-[1.02] group-hover:text-custom"
                    >
                      {service.title}
                    </CardTitle>
                    <CardDescription 
                      className="text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-custom"
                    >
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-0 transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-transparent group-hover:to-blue-50/30">
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-gray-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-custom"
                      >
                        <div 
                          className="w-2 h-2 rounded-full mr-3 transition-all duration-300 group-hover:scale-125 group-hover:shadow-custom"
                          style={{ 
                            backgroundColor: 'var(--hover-accent-color)'
                          } as React.CSSProperties}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-blue-300/60 mb-3`}
                    >
                      Explorar pack
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    
                    {/* Botón para el cuestionario */}
                                  <Button
                onClick={() => window.location.href = '/cuestionario'}
                variant="outline"
                className="w-full border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-200/40"
              >
                <Heart className="w-4 h-4 mr-2 text-pink-500" />
                Hacer Cuestionario
              </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 