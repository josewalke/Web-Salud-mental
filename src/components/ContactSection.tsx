import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Aquí iría la lógica real de envío
    console.log("Formulario enviado:", formData);
    
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
    
    // Mostrar mensaje de éxito
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contacto" className="py-20 relative overflow-hidden">


      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
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
                <MessageCircle className="w-10 h-10 text-blue-600 mr-4" />
              </motion.div>
              <h2 className="text-4xl lg:text-5xl text-gray-900" style={{ textShadow: '0 2px 4px rgba(255, 255, 255, 0.5)' }}>
                ¿Listo para
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800"> empezar?</span>
              </h2>
            </motion.div>

            <motion.p
              className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)' }}
            >
              Contáctanos para comenzar tu viaje de crecimiento personal. 
              Nuestro equipo está aquí para ayudarte a encontrar el pack perfecto.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Información de contacto */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Información de Contacto
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Estamos aquí para ayudarte. No dudes en contactarnos por cualquier medio que prefieras.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-blue-200">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@loveonthebrain.com</p>
                    <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-blue-200">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Teléfono</h4>
                    <p className="text-gray-600">+34 600 000 000</p>
                    <p className="text-sm text-gray-500">Lun-Vie 9:00-18:00</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-blue-200">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Ubicación</h4>
                    <p className="text-gray-600">Madrid, España</p>
                    <p className="text-sm text-gray-500">Sesiones presenciales y online</p>
                  </div>
                </motion.div>
              </div>

              {/* Información adicional */}
                              <div className="rounded-2xl p-6 border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-3">¿Por qué elegirnos?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Primera sesión gratuita</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Psicólogos certificados</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Presupuestos flexibles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Confidencialidad garantizada</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Formulario */}
            <motion.div
              className="rounded-3xl p-8 shadow-2xl border border-white/30"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Envíanos un mensaje
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[120px]"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full border-2 border-blue-500 text-blue-600 hover:text-blue-700 hover:border-blue-600 py-3 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Enviar mensaje</span>
                    </div>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos.
                </p>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
