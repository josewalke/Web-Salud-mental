import { Brain, Shield, Sparkles, Car } from "lucide-react";
import { motion } from "motion/react";
import { useState, useMemo } from "react";

export function ProblemSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = useMemo(() => [
    {
      icon: <Brain className="w-6 h-6 text-blue-600" />,
      stat: "100",
      unit: "%",
      description: "Sin juicios, ayudamos de corazón",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      stat: "100",
      unit: "%",
      description: "Espacio seguro para gestión emocional",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      stat: "100",
      unit: "%",
      description: "Presupuestos amigables y accesibles",
      color: "from-blue-500 to-blue-700"
    },
    {
      icon: <Car className="w-6 h-6 text-blue-600" />,
      stat: "4",
      unit: "packs",
      description: "Cada uno incluye salida sorpresa con chofer",
      color: "from-blue-500 to-blue-700"
    }
  ], []);

  const symptoms = useMemo(() => [
    "Quieres trabajar en tu crecimiento personal",
    "Buscas conocerte mejor para tomar mejores decisiones",
    "Necesitas un espacio seguro sin juicios",
    "Quieres mejorar tus relaciones personales",
    "Buscas ampliar tu círculo social",
    "Necesitas reconectar con tu pareja"
  ], []);

  return (
    <section id="problemas" className="py-20 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-tl from-pink-200/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-100/5 to-pink-100/5 rounded-full blur-3xl" />
      </div>


      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Brain className="w-10 h-10 text-blue-600 mr-1 md:mr-4" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl text-gray-900">
              Nuestra
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> Filosofía</span>
            </h2>
          </motion.div>

          <motion.p
            className="text-xl text-gray-700 mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
                        >
            Estamos completamente seguros de que las personas que realmente se conocen en todos los aspectos, 
            toman mejores decisiones en su vida. La vida es un 10% las cartas que nos ha tocado, 
            un 10% la suerte y un 80% la actitud.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -10,
                  rotateY: 10,
                  scale: 1.05
                }}
                style={{ transformStyle: "preserve-3d" }}
                onHoverStart={() => setHoveredStat(index)}
                onHoverEnd={() => setHoveredStat(null)}
              >
                <div className="rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 border border-blue-100/50 group relative overflow-hidden bg-white">
                  {/* Contenido de la carta */}
                  <div className="relative z-10">
                    <motion.div
                      className="flex items-center justify-center mb-6"
                      animate={{
                        rotateY: hoveredStat === index ? [0, 360] : 0,
                      }}
                      transition={{ duration: 1 }}
                    >
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-400/60 to-blue-600/60 backdrop-blur-sm shadow-lg border border-blue-200/30">
                        {item.icon}
                      </div>
                    </motion.div>

                    <motion.div
                      className="text-3xl font-medium mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, type: "spring", stiffness: 200 }}
                    >
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
                        {item.stat}
                      </span>
                      <span className="text-blue-600 text-lg ml-1">{item.unit}</span>
                    </motion.div>

                    <motion.p
                      className="text-sm text-gray-600"
                      animate={{
                        x: hoveredStat === index ? [0, 2, 0] : 0,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-3xl p-10 shadow-2xl border border-blue-100/50 relative overflow-hidden bg-white"
            initial={{ opacity: 0, y: 30, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ rotateX: 2, rotateY: 2 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Contenido */}
            <div className="relative z-10">
              <motion.h3
                className="text-2xl text-gray-900 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                ¿Te identificas con alguno de estos aspectos?
              </motion.h3>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                {symptoms.map((symptom, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center text-gray-600 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <motion.div
                      className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mr-4 flex-shrink-0"
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.4)",
                          "0 0 0 10px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                    <span className="group-hover:text-blue-700 transition-colors duration-300">
                      {symptom}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 