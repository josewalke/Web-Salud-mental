import { Brain } from "lucide-react";
import './Navigation.css';

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="navigation-container">
      <div className="navigation-content">
        {/* Navegación visible en móvil - Solo logo */}
        <div className="navigation-mobile-section">
          {/* Logo y título para móvil */}
          <div className="navigation-mobile-logo">
            <div className="navigation-mobile-icon">
              <Brain className="navigation-brain-icon" />
            </div>
            <span className="navigation-mobile-text">Love on the Brain</span>
          </div>
        </div>
        

        
        {/* Navegación para tablet/desktop - Logo con clases CSS puras */}
        <div className="navigation-desktop-section">
          {/* Logo específico para desktop - Clases CSS puras */}
          <div className="navigation-logo-desktop">
            <div className="navigation-logo-desktop-icon">
              <Brain className="navigation-brain-icon" />
            </div>
            <span className="navigation-logo-desktop-text">Love on the Brain</span>
          </div>
          
          {/* Enlaces de navegación desktop */}
          <div className="navigation-desktop-links">
            <button 
              onClick={() => scrollToSection('hero')}
              className="navigation-desktop-link"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection('problem')}
              className="navigation-desktop-link"
            >
              Problemas
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="navigation-desktop-link"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="navigation-desktop-link"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
