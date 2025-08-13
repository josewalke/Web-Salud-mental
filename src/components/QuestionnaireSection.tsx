import React from 'react';
import { motion } from 'motion/react';
import { Brain, Heart, Users, ArrowRight, CheckCircle, Star } from 'lucide-react';

export function QuestionnaireSection() {
  return (
    <section id="cuestionario" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* ===== SECCIÓN 1: CUESTIONARIO DE COMPATIBILIDAD ===== */}
          <div className="mb-24">
            {/* Header de compatibilidad */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Descubre tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Compatibilidad</span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Nuestro cuestionario científico, diseñado por psicólogos expertos, te ayudará a encontrar 
                la conexión perfecta y construir relaciones más saludables y duraderas.
              </p>
            </motion.div>

            {/* Características del cuestionario de compatibilidad */}
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 text-center relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Científicamente Probado</h3>
                <p className="text-gray-600">
                  Basado en investigaciones psicológicas y validado por expertos en relaciones de pareja.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 text-center relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Resultados Personalizados</h3>
                <p className="text-gray-600">
                  Análisis detallado de tu perfil y recomendaciones específicas para mejorar tus relaciones.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 text-center relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compatible con Parejas</h3>
                <p className="text-gray-600">
                  Ideal para parejas que quieren fortalecer su relación o personas buscando su media naranja.
                </p>
              </motion.div>
            </motion.div>

            {/* Información adicional de compatibilidad */}
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 md:p-8 text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    ¿Por qué elegir nuestro cuestionario?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                      <span>17 preguntas cuidadosamente seleccionadas por psicólogos</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                      <span>Análisis de compatibilidad en múltiples dimensiones</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                      <span>Resultados instantáneos y confidenciales</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-blue-50 text-base">
                    "El amor es la mejor terapia para el alma"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Botón de compatibilidad */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => window.location.href = '/cuestionario'}
                className="group bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-3"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6" />
                <span>¡Comenzar Cuestionario de Compatibilidad!</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
              
              <p className="text-gray-500 mt-6 text-lg">
                Solo toma 5-10 minutos • 100% gratuito • Resultados inmediatos
              </p>
            </motion.div>
          </div>

          {/* Separador visual */}
          <motion.div 
            className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-24"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          />

          {/* ===== SECCIÓN 2: CUESTIONARIO DE PERSONALIDAD ===== */}
          <div>
            {/* Header de personalidad */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
                          <motion.div 
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Conoce tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Personalidad</span>
            </h2>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Descubre los secretos de tu mente con nuestro cuestionario basado en la teoría de Carl Jung. 
                Explora tus dinámicas sociales y comprende mejor quién eres realmente.
              </p>
            </motion.div>

            {/* Características del cuestionario de personalidad */}
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 text-center relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Basado en Carl Jung</h3>
                <p className="text-gray-600">
                  Utiliza la teoría psicológica más respetada para analizar tu personalidad y comportamiento.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 text-center relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">66 Preguntas Profundas</h3>
                <p className="text-gray-600">
                  Cuestionario completo que cubre todos los aspectos de tu personalidad y dinámicas sociales.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg border border-purple-100 text-center relative overflow-hidden"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Análisis Social</h3>
                <p className="text-gray-600">
                  Comprende cómo te relacionas con los demás y mejora tus habilidades sociales.
                </p>
              </motion.div>
            </motion.div>

            {/* Información adicional de personalidad */}
            <motion.div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-6 md:p-8 text-white mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    ¿Por qué hacer el test de personalidad?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                      <span>66 preguntas basadas en la teoría de Carl Jung</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                      <span>Análisis de dinámicas sociales y personalidad</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                      <span>Descubre tus fortalezas y áreas de crecimiento</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-blue-50 text-base">
                    "Conócete a ti mismo para crecer"
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Botón de personalidad */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                onClick={() => window.location.href = '/cuestionario-personalidad'}
                className="group bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-12 py-6 rounded-2xl text-xl font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-3"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="w-6 h-6" />
                <span>¡Comenzar Test de Personalidad!</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
              
              <p className="text-gray-500 mt-6 text-lg">
                Solo toma 10-15 minutos • 100% gratuito • Resultados detallados
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
