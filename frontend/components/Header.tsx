import { useState, useEffect } from 'react';
import { Menu, X, Shield, Linkedin } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled((window.scrollY || window.pageYOffset) > 10);
    
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // ← sincroniza el estado al montar (por si entras ya scrolleado)
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToAdmin = () => {
    window.location.hash = '#/admin-secret';
  };

  // Debug: mostrar el estado actual en el header
      // console.log('Header render - isScrolled:', isScrolled);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'scrolled' : ''
      }`}
      style={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: isScrolled ? '1px solid #e5e7eb' : 'none'
      }}
    >

      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl lg:text-2xl font-bold text-blue-600">
              Love on the Brain
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('packs')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Packs
            </button>
            <button
              onClick={() => scrollToSection('cuestionarios')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Cuestionarios
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              Contacto
            </button>
            
            {/* Botón Admin discreto en escritorio */}
            <button
              onClick={navigateToAdmin}
              className="text-gray-400 hover:text-purple-600 transition-colors duration-300 opacity-60 hover:opacity-100"
              title="Acceso Administrativo"
            >
              <Shield className="w-5 h-5" />
            </button>

            {/* Marca de agua del desarrollador */}
            <a
              href="https://www.linkedin.com/in/jose-juan-perez-gonzalez/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-300 opacity-60 hover:opacity-100 flex items-center"
              title="Desarrollado por José Juan Pérez González"
            >
              <Linkedin className="w-4 h-4 mr-1" />
              <span className="text-xs">@josewalke</span>
            </a>

          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg shadow-lg mt-2 p-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('packs')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Packs
              </button>
              <button
                onClick={() => scrollToSection('cuestionarios')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Cuestionarios
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Contacto
              </button>
              
              {/* Marca de agua del desarrollador en móvil */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <a
                  href="https://www.linkedin.com/in/jose-juan-perez-gonzalez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-600 transition-colors flex items-center text-sm"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  Desarrollado por José Juan Pérez González
                </a>
              </div>

            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
