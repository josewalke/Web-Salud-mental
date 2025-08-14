import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Shield, DollarSign, Package } from 'lucide-react';

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      icon: Heart,
      percentage: "100",
      unit: "%",
      title: "Sin juicios, ayudamos de corazón",
      delay: 0.1
    },
    {
      icon: Shield,
      percentage: "100",
      unit: "%", 
      title: "Espacio seguro para gestión emocional",
      delay: 0.2
    },
    {
      icon: DollarSign,
      percentage: "100",
      unit: "%",
      title: "Presupuestos amigables y accesibles",
      delay: 0.3
    },
    {
      icon: Package,
      percentage: "4",
      unit: "packs",
      title: "Cada uno incluye salida sorpresa con chofer",
      delay: 0.4
    }
  ];

  const aspects = [
    "Quieres trabajar en tu crecimiento personal",
    "Necesitas un espacio seguro sin juicios", 
    "Buscas ampliar tu círculo social",
    "Buscas conocerte mejor para tomar mejores decisiones",
    "Quieres mejorar tus relaciones personales",
    "Necesitas reconectar con tu pareja"
  ];

  return (
    <section id="servicios" className="py-16 sm:py-20 lg:py-24 bg-[rgba(255,255,255,0)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ 
                rotate: [0, -10, 10, 0],
                scale: 1.1 
              }}
              transition={{ duration: 0.4 }}
            >
              <Heart className="w-8 h-8 text-blue-600 mr-3" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900">
              Nuestra <span className="text-blue-600">Filosofía</span>
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Estamos completamente seguros de que las personas que realmente se conocen en todos los 
            aspectos, toman mejores decisiones en su vida. La vida es un 10% las cartas que nos ha 
            tocado, un 10% la suerte y un 80% la actitud.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 text-center group"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <motion.div 
                  className="mx-auto mb-4 bg-blue-100 p-3 rounded-full w-fit"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0] 
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <IconComponent className="h-6 w-6 text-blue-600" />
                </motion.div>
                
                <motion.div 
                  className="mb-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="text-4xl font-bold text-blue-600"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: stat.delay + 0.3,
                      type: "spring",
                      stiffness: 200 
                    }}
                  >
                    {stat.percentage}
                  </motion.span>
                  <span className="text-lg text-blue-600 ml-1">{stat.unit}</span>
                </motion.div>
                
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {stat.title}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Identification Section */}
        <motion.div 
          className="bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
        >
          <motion.h3 
            className="text-2xl sm:text-3xl text-gray-900 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            ¿Te identificas con alguno de estos aspectos?
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aspects.map((aspect, index) => (
              <motion.div 
                key={index} 
                className="flex items-center space-x-3 group"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"
                  whileHover={{ 
                    scale: 1.5,
                    backgroundColor: "#1d4ed8"
                  }}
                  transition={{ duration: 0.2 }}
                />
                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {aspect}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}