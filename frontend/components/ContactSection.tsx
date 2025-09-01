import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Send, Mail, Phone } from 'lucide-react';
import { useMobileAnimations } from './ui/use-mobile-animations';
import { toast } from 'sonner';
import { buildApiUrl } from '../src/config/api';

export default function ContactSection() {
  const enableAnimations = useMobileAnimations();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'elcerebrotambienseacaricia@gmail.com',
      description: 'Respuesta en 24 horas',
      delay: 0.2
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+34 xxx xxx xxx',
      description: 'Lunes a Viernes, 9:00 - 18:00',
      delay: 0.4
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Por favor completa todos los campos obligatorios');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Enviar mensaje al backend
      const response = await fetch(buildApiUrl('/api/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          asunto: formData.subject || 'Sin asunto',
          mensaje: formData.message
        })
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('¡Mensaje enviado con éxito! Te contactaremos pronto 💙');
        
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else if (response.status === 404) {
        // Si el endpoint no existe, mostrar mensaje alternativo
        toast.info('El formulario de contacto está temporalmente en mantenimiento. Por favor, contáctanos directamente por email: elcerebrotambienseacaricia@gmail.com');
        
        // Limpiar formulario
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || 'Hubo un error al enviar el mensaje'}`);
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      toast.error('Hubo un error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section 
      id="contacto" 
      className="contact-section py-12 sm:py-16 lg:py-20"
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={enableAnimations ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={enableAnimations ? { duration: 0.8 } : { duration: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="mb-4"
            initial={enableAnimations ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={enableAnimations ? { duration: 0.6, delay: 0.1 } : { duration: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-enhanced-title text-center" itemProp="name">
              Contacto
            </h2>
          </motion.div>
          
          <motion.p 
            className="text-lg sm:text-xl text-enhanced-subtitle max-w-3xl mx-auto"
            initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={enableAnimations ? { duration: 0.8, delay: 0.2 } : { duration: 0 }}
            viewport={{ once: true }}
            itemProp="description"
          >
            ¿Tienes alguna pregunta o quieres comenzar tu proceso de crecimiento personal? 
            Estamos aquí para acompañarte en cada paso del camino, sin juicios y con todo nuestro amor.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Información de Contacto */}
          <motion.div
            initial={enableAnimations ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={enableAnimations ? { duration: 0.8, delay: 0.3 } : { duration: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl text-enhanced-title mb-4">
                  Hablemos de tu bienestar
                </h3>
                <p className="text-enhanced-subtitle leading-relaxed">
                  Nuestro equipo de profesionales está listo para escucharte y brindarte 
                  el apoyo que necesitas. Cada conversación es confidencial y libre de juicios.
                </p>
              </div>

              {/* Opciones de Contacto */}
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={enableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={enableAnimations ? { duration: 0.6, delay: info.delay } : { duration: 0 }}
                    viewport={{ once: true }}
                    whileHover={enableAnimations ? { y: -2, scale: 1.02 } : {}}
                    itemScope
                    itemType="https://schema.org/ContactPoint"
                  >
                    <Card className="card-enhanced p-4 sm:p-6 border-l-4 border-l-blue-600">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="flex-shrink-0 bg-blue-100 p-3 rounded-lg"
                          whileHover={enableAnimations ? { 
                            rotate: [0, -5, 5, 0],
                            scale: 1.1 
                          } : {}}
                          transition={enableAnimations ? { duration: 0.4 } : {}}
                        >
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-enhanced mb-1" itemProp="contactType">
                            {info.title}
                          </h4>
                          <p className="text-enhanced mb-1" itemProp={info.title === 'Email' ? 'email' : 'telephone'}>
                            {info.content}
                          </p>
                          <p className="text-sm text-enhanced-subtitle">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}


            </div>
          </motion.div>

          {/* Formulario de Contacto */}
          <motion.div
            initial={enableAnimations ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={enableAnimations ? { duration: 0.8, delay: 0.4 } : { duration: 0 }}
            viewport={{ once: true }}
          >
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-2xl text-enhanced-title text-center">
                  Envíanos un mensaje
                </CardTitle>
                <p className="text-enhanced-subtitle text-center">
                  Completa el formulario y te responderemos lo antes posible
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div
                      whileFocus={enableAnimations ? { scale: 1.02 } : {}}
                      transition={enableAnimations ? { duration: 0.2 } : {}}
                    >
                      <label htmlFor="name" className="block text-sm text-enhanced mb-2">
                        Nombre *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                        className="input-enhanced"
                        required
                      />
                    </motion.div>

                    <motion.div
                      whileFocus={enableAnimations ? { scale: 1.02 } : {}}
                      transition={enableAnimations ? { duration: 0.2 } : {}}
                    >
                      <label htmlFor="email" className="block text-sm text-enhanced mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="input-enhanced"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileFocus={enableAnimations ? { scale: 1.02 } : {}}
                    transition={enableAnimations ? { duration: 0.2 } : {}}
                  >
                    <label htmlFor="subject" className="block text-sm text-enhanced mb-2">
                      Asunto
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="¿En qué podemos ayudarte?"
                      className="input-enhanced"
                    />
                  </motion.div>

                  <motion.div
                    whileFocus={enableAnimations ? { scale: 1.02 } : {}}
                    transition={enableAnimations ? { duration: 0.2 } : {}}
                  >
                    <label htmlFor="message" className="block text-sm text-enhanced mb-2">
                      Mensaje *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos cómo podemos acompañarte en tu proceso de crecimiento personal..."
                      className="input-enhanced min-h-32 resize-none"
                      required
                    />
                  </motion.div>

                  <motion.div
                    whileHover={enableAnimations ? { scale: 1.02 } : {}}
                    whileTap={enableAnimations ? { scale: 0.98 } : {}}
                    transition={enableAnimations ? { duration: 0.2 } : {}}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="button-enhanced w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                          Enviando...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-5 h-5 mr-2" />
                          Enviar mensaje
                        </div>
                      )}
                    </Button>
                  </motion.div>
                </form>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center leading-relaxed">
                    Al enviar este formulario, aceptas que nos pongamos en contacto contigo para brindarte 
                    información sobre nuestros servicios. Tu privacidad es importante para nosotros y 
                    nunca compartiremos tu información con terceros.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}