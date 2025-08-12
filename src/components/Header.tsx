import { Menu, X, Brain } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const navigationItems = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Sobre Nosotros", href: "/#sobre-nosotros" },
  { name: "Contacto", href: "/#contacto" }
];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100/50" 
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{
                rotateY: 180,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)"
              }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Brain className="text-white w-6 h-6" />
            </motion.div>
            <span className="text-2xl font-bold text-gray-900">Love on the Brain</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
            onClick={toggleMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-gray-700" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col space-y-4 pt-4 pb-4 border-t border-blue-100 mt-4 px-4">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors py-2 px-2 w-full text-left"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
} 