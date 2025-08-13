import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Brain } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";

export function Footer() {
  const socialIcons = useMemo(() => [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ], []);

  const serviceLinks = useMemo(() => [
    "Detox Digital",
    "Mindfulness Offline",
    "Reconexión Social",
    "Rutinas de Desconexión"
  ], []);

  const resourceLinks = useMemo(() => [
    "Blog",
    "Investigación",
    "Testimonios",
    "Preguntas Frecuentes"
  ], []);

  const contactInfo = useMemo(() => [
    { icon: Mail, text: "hola@reconecta.com" },
    { icon: Phone, text: "+34 900 123 456" },
    { icon: MapPin, text: "Madrid, España" }
  ], []);

  return (
    <footer id="contacto" className="text-white py-16 relative overflow-hidden bg-blue-900">
      <div className="container mx-auto px-4 relative z-10">
        {/* Sección de contacto principal */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl mb-6 text-white">
            ¿Listo para
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100"> acariciar tu cerebro</span>?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Contáctanos para comenzar tu camino hacia el crecimiento personal y el bienestar emocional
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border-2 border-blue-400 bg-blue-300"
                whileHover={{
                  rotateY: 180,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
                }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Brain className="text-blue-900 w-6 h-6" />
              </motion.div>
              <span className="text-2xl font-medium text-white">Love on the Brain</span>
            </motion.div>

            <motion.p
              className="text-blue-100 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Ayudamos a las personas a trabajar en su crecimiento personal sin juicios, 
              creando espacios seguros para la gestión emocional con presupuestos amigables.
            </motion.p>

            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg border-2 border-blue-700 hover:border-blue-400 transition-all duration-300 group"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 10,
                    boxShadow: "0 5px 15px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Servicios */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="font-medium mb-6 text-lg text-white">Servicios</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <motion.a
                    href="#servicios"
                    className="text-sm text-blue-200 hover:text-white transition-colors duration-300 block"
                    whileHover={{ x: 5, color: "#93c5fd" }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Recursos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h4 className="font-medium mb-6 text-lg text-white">Recursos</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <motion.a
                    href="#"
                    className="text-sm text-blue-200 hover:text-white transition-colors duration-300 block"
                    whileHover={{ x: 5, color: "#93c5fd" }}
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h4 className="font-medium mb-6 text-lg text-white">Contacto</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="w-4 h-4 text-blue-300" />
                  </motion.div>
                  <span className="text-sm text-blue-200">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-blue-700 mt-12 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-blue-200 text-sm">
            © {new Date().getFullYear()} Love on the Brain. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
} 