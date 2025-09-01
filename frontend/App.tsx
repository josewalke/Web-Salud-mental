/**
 * App.tsx
 * 
 * Componente principal de la aplicación de Salud Mental.
 * Maneja el enrutamiento, lazy loading y la estructura general de la aplicación.
 * 
 * Características:
 * - Router basado en hash para SPA
 * - Lazy loading de componentes para optimización
 * - Detección de dispositivos móviles
 * - Gestión de estado global de la aplicación
 * - Navegación entre diferentes páginas y secciones
 * 
 * @author Sistema de Salud Mental
 * @version 1.0.0
 */

import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';

// ===== LAZY LOADING DE COMPONENTES =====
// Componentes cargados bajo demanda para optimizar el first paint

/** Sección de servicios de la página principal */
const ServicesSection = lazy(() => import('./components/ServicesSection'));

/** Sección de paquetes de la página principal */
const PacksSection = lazy(() => import('./components/PacksSection'));

/** Sección de cuestionarios de la página principal */
const QuestionnaireSection = lazy(() => import('./components/QuestionnaireSection'));

/** Página del cuestionario de pareja */
const QuestionnairePage = lazy(() => import('./src/pages/QuestionnairePage'));

/** Página del cuestionario de personalidad */
const PersonalityQuestionnairePage = lazy(() => import('./src/pages/PersonalityQuestionnairePage'));

/** Página de login de administrador */
const AdminLogin = lazy(() => import('./src/components/AdminLogin'));

/** Dashboard de administración */
const AdminDashboard = lazy(() => import('./src/components/AdminDashboard'));

/** Página de análisis de compatibilidad de parejas */
const CompatibilityAnalysisPage = lazy(() => import('./src/pages/CompatibilityAnalysisPage'));

/** Página de análisis de compatibilidad de personalidad */
const PersonalityCompatibilityAnalysisPage = lazy(() => import('./src/pages/PersonalityCompatibilityAnalysisPage'));

/** Componentes inline para SEO - Evitar problemas de importación */
const BlogPage = () => (
  <div style={{ display: 'none' }} aria-hidden="true">
    <h1>Blog de Salud Mental y Crecimiento Personal</h1>
    <p>Artículos sobre salud mental, bienestar emocional, terapia online, crecimiento personal y relaciones de pareja.</p>
  </div>
);

const BlogPostPage = () => (
  <div style={{ display: 'none' }} aria-hidden="true">
    <h1>Artículo del Blog - Love on the Brain</h1>
    <p>Contenido detallado sobre salud mental, bienestar emocional y crecimiento personal.</p>
  </div>
);

const TerapiaOnlinePage = () => (
  <div style={{ display: 'none' }} aria-hidden="true">
    <h1>Terapia Online Barata y Accesible en España</h1>
    <p>Encuentra terapia online económica y de calidad en España. Apoyo psicológico virtual para ansiedad, depresión, estrés y crecimiento personal.</p>
  </div>
);

const CuestionariosPsicologicosPage = () => (
  <div style={{ display: 'none' }} aria-hidden="true">
    <h1>Cuestionarios Psicológicos Gratis y de Compatibilidad de Pareja</h1>
    <p>Realiza cuestionarios psicológicos gratis, test de personalidad y evaluaciones de compatibilidad de pareja.</p>
  </div>
);

/** Sección de preguntas frecuentes */
const FAQSection = lazy(() => import('./components/FAQSection'));

/** Sección de contacto */
const ContactSection = lazy(() => import('./components/ContactSection'));

/** Footer de la aplicación */
const Footer = lazy(() => import('./components/Footer'));

/** Fondo animado con Spline */
const SplineBackground = lazy(() => import('./components/SplineBackground'));

// ===== TIPOS DE LA APLICACIÓN =====

/** Tipos de páginas disponibles en la aplicación */
type Page = 'home' | 'questionnaire-pareja' | 'questionnaire-personalidad' | 'admin-login' | 'admin-dashboard' | 'compatibility-analysis' | 'personality-compatibility-analysis' | 'blog' | 'blog-post' | 'terapia-online' | 'cuestionarios-psicologicos';

/** Tipos de cuestionarios disponibles */
type QuestionnaireType = 'pareja' | 'personalidad';

/**
 * Componente principal de la aplicación
 * 
 * @returns JSX.Element - La aplicación completa
 */
export default function App() {
  // ===== ESTADOS PRINCIPALES =====
  
  /** Página actual de la aplicación */
  const [currentPage, setCurrentPage] = useState<Page>('home');
  
  /** Tipo de cuestionario seleccionado */
  const [questionnaireType, setQuestionnaireType] = useState<QuestionnaireType>('pareja');
  
  /** Sección a la que regresar después de completar un cuestionario */
  const [returnToSection, setReturnToSection] = useState<string | null>(null);
  
  // ===== DETECCIÓN DE DISPOSITIVO =====
  
  /**
   * Detecta si el dispositivo es móvil basado en el ancho de pantalla
   * Se calcula una sola vez para optimizar el rendimiento
   */
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
  }, []);

  // ===== SISTEMA DE ENRUTAMIENTO =====
  
  /**
   * Aplica la ruta basada en el hash de la URL
   * Permite persistir la ruta tras recargar la página
   */
  const applyRouteFromHash = () => {
    // Manejar tanto hash routing como pathname routing
    let hash = window.location.hash.replace(/^#/, '');
    
    // Si no hay hash pero hay pathname, convertir pathname a hash
    if (!hash && window.location.pathname !== '/') {
      hash = window.location.pathname;
      // Actualizar la URL para usar hash routing
      window.location.replace(`#${hash}`);
      return;
    }
    if (hash.startsWith('/cuestionario/')) {
      const type = hash.split('/')[2] as QuestionnaireType | undefined;
      if (type === 'pareja' || type === 'personalidad') {
        setQuestionnaireType(type);
        setCurrentPage(`questionnaire-${type}`);
        return;
      }
    }
    
    // Rutas admin
    if (hash === '/admin-secret') {
      setCurrentPage('admin-login');
      return;
    }
    
    if (hash === '/admin-dashboard') {
      setCurrentPage('admin-dashboard');
      return;
    }
    
    if (hash === '/compatibility-analysis') {
      setCurrentPage('compatibility-analysis');
      return;
    }
    
    if (hash === '/personality-compatibility-analysis') {
      setCurrentPage('personality-compatibility-analysis');
      return;
    }
    
    // Rutas del blog
    if (hash === '/blog') {
      setCurrentPage('blog');
      return;
    }
    
    if (hash.startsWith('/blog/')) {
      setCurrentPage('blog-post');
      return;
    }
    
    // Landing pages específicas para SEO
    if (hash === '/terapia-online') {
      setCurrentPage('terapia-online');
      return;
    }
    
    if (hash === '/cuestionarios-psicologicos') {
      setCurrentPage('cuestionarios-psicologicos');
      return;
    }
    
    // Default: home
    setCurrentPage('home');
  };

  // Sincronizar hash en inicialización y en navegación del navegador
  useEffect(() => {
    applyRouteFromHash();
    const onHashChange = () => applyRouteFromHash();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // SEO optimizado - solo ejecuta en mount inicial y cambios de página críticos
  const seoData = useMemo(() => {
    return {
      title: "Love on the Brain - Salud Mental y Crecimiento Personal | Sin Juicios",
      description: "Love on the Brain: Servicios de salud mental y crecimiento personal en España con presupuestos amigables. Apoyo emocional, cuestionarios personalizados y desarrollo personal sin juicios. El cerebro también se puede acariciar - Consulta online disponible.",
      keywords: "salud mental España, crecimiento personal, bienestar emocional, apoyo de pareja online, desarrollo personal, salud emocional, autoconocimiento, cuestionarios psicológicos, love on the brain, sesiones online salud mental, apoyo emocional sin juicios, desarrollo personal España, bienestar mental accesible, crecimiento personal online, orientación sexual inclusiva, salud mental LGBTQ+, apoyo psicológico económico, sesiones personalizadas, evaluación emocional"
    };
  }, []);

  // SEO básico optimizado - solo ejecuta una vez al montar
  useEffect(() => {
    // Solo ejecutar si no se han aplicado ya los meta tags básicos
    if (document.querySelector('meta[data-seo="basic"]')) return;

    document.title = seoData.title;
    
    // Meta tags básicos y esenciales solamente
    const essentialMetas = [
      { name: "description", content: seoData.description },
      { name: "keywords", content: seoData.keywords },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#2563eb" },
      // Open Graph esenciales
      { property: "og:title", content: seoData.title },
      { property: "og:description", content: seoData.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.href }
    ];

    // Crear y aplicar meta tags básicos de una sola vez
    const fragment = document.createDocumentFragment();
    essentialMetas.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.name) meta.name = tag.name;
      if (tag.property) meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      meta.setAttribute('data-seo', 'basic');
      fragment.appendChild(meta);
    });
    document.head.appendChild(fragment);

    // Canonical URL
    if (!document.querySelector('link[rel="canonical"]')) {
      const canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', window.location.href);
      document.head.appendChild(canonical);
    }

  }, []); // Solo ejecutar una vez al montar

  // SEO avanzado solo para desktop y de forma lazy
  useEffect(() => {
    if (isMobile || document.querySelector('script[data-seo="advanced"]')) return;

    // Timeout para no bloquear el render inicial
    const timeoutId = setTimeout(() => {
      // Structured data simplificado para desktop
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Love on the Brain",
        "url": window.location.href,
        "description": "Empresa psico-social española e integradora social especializada en servicios de salud mental y crecimiento personal con presupuestos amigables.",
        "slogan": "El cerebro también se puede acariciar",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "ES"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "elcerebrotambienseacaricia@gmail.com",
          "contactType": "customer service",
          "areaServed": "ES",
          "availableLanguage": "Spanish"
        }
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'advanced');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }, 2000); // Delay para no afectar el first paint

    return () => clearTimeout(timeoutId);
  }, [isMobile]);

  // ===== FUNCIONES DE NAVEGACIÓN =====
  
  /**
   * Navega a un cuestionario específico
   * @param type - Tipo de cuestionario (pareja o personalidad)
   */
  const navigateToQuestionnaire = useMemo(() => (type: QuestionnaireType) => {
    setQuestionnaireType(type);
    setCurrentPage(`questionnaire-${type}` as Page);
    // Actualizar hash para persistir ruta al recargar
    window.location.hash = `#/cuestionario/${type}`;
  }, []);

  /**
   * Navega a la página principal
   * @param targetSection - Sección específica a la que navegar (opcional)
   */
  const navigateToHome = useMemo(() => (targetSection?: string) => {
    setCurrentPage('home');
    // Resetear hash a home
    window.location.hash = '#/';
    if (targetSection) {
      setReturnToSection(targetSection);
    }
  }, []);

  /**
   * Navega a la página principal desde un cuestionario
   * Regresa específicamente a la sección de cuestionarios
   */
  const navigateToHomeFromQuestionnaire = useMemo(() => () => {
    navigateToHome('#cuestionarios');
  }, [navigateToHome]);



  // Scroll effect optimizado con debounce
  useEffect(() => {
    if (currentPage !== 'home' || !returnToSection) return;

    const timeoutId = setTimeout(() => {
      const element = document.querySelector(returnToSection);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      setReturnToSection(null);
    }, 150); // Delay optimizado

    return () => clearTimeout(timeoutId);
  }, [currentPage, returnToSection]);

  // ===== COMPONENTES DE UI =====
  
  /**
   * Componente de fallback para lazy loading
   * Optimizado sin spinner para carga más rápida
   */
  const LoadingFallback = useMemo(() => (
    <div className="min-h-[200px]"></div>
  ), []);

  // ===== RENDERIZADO CONDICIONAL DE PÁGINAS =====
  
  /**
   * Renderiza la página del cuestionario de pareja
   */
  if (currentPage === 'questionnaire-pareja') {
    return (
      <div className="min-h-screen bg-white">
        <Suspense fallback={LoadingFallback}>
          <QuestionnairePage type="pareja" />
        </Suspense>
      </div>
    );
  }
  
  if (currentPage === 'questionnaire-personalidad') {
    return (
      <div className="min-h-screen bg-white">
        <Suspense fallback={LoadingFallback}>
          <PersonalityQuestionnairePage />
        </Suspense>
      </div>
    );
  }

  // Render de páginas admin
  if (currentPage === 'admin-login') {
    return (
      <div className="min-h-screen bg-transparent">
        <Suspense fallback={LoadingFallback}>
          <AdminLogin />
        </Suspense>
      </div>
    );
  }

  if (currentPage === 'admin-dashboard') {
    return (
      <div className="min-h-screen bg-transparent">
        <Suspense fallback={LoadingFallback}>
          <AdminDashboard />
        </Suspense>
      </div>
    );
  }

  if (currentPage === 'compatibility-analysis') {
    return (
      <div className="min-h-screen bg-transparent">
        <Suspense fallback={LoadingFallback}>
          <CompatibilityAnalysisPage />
        </Suspense>
      </div>
    );
  }

  if (currentPage === 'personality-compatibility-analysis') {
    return (
      <div className="min-h-screen bg-transparent">
        <Suspense fallback={LoadingFallback}>
          <PersonalityCompatibilityAnalysisPage />
        </Suspense>
      </div>
    );
  }

  // Render de páginas del blog
  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-white">
        <Suspense fallback={LoadingFallback}>
          <BlogPage />
        </Suspense>
      </div>
    );
  }

  if (currentPage === 'blog-post') {
    return (
      <div className="min-h-screen bg-white">
        <Suspense fallback={LoadingFallback}>
          <BlogPostPage />
        </Suspense>
      </div>
    );
  }

  // Render de landing pages específicas para SEO
  if (currentPage === 'terapia-online') {
    return (
      <div className="min-h-screen bg-white">
        <Suspense fallback={LoadingFallback}>
          <TerapiaOnlinePage />
        </Suspense>
      </div>
    );
  }

  if (currentPage === 'cuestionarios-psicologicos') {
    return (
      <div className="min-h-screen bg-white">
        <Suspense fallback={LoadingFallback}>
          <CuestionariosPsicologicosPage />
        </Suspense>
      </div>
    );
  }



  // ===== PÁGINA PRINCIPAL =====
  
  /**
   * Renderiza la página principal con todas las secciones
   * Incluye fondo 3D Spline y lazy loading optimizado
   */
  return (
    <div className="min-h-screen relative bg-transparent">
      {/* Fondo 3D Spline para experiencia visual inmersiva */}
      <SplineBackground />
      
      {/* Contenido principal con z-index para estar sobre el fondo */}
      <div className="relative min-h-screen bg-transparent content-above-spline">
        {/* Header con navegación */}
        <Header />
        
        {/* Contenido principal con lazy loading optimizado */}
        <main role="main">
          {/* Sección hero - siempre visible para first paint rápido */}
          <HeroSection />
          
          {/* Secciones con lazy loading para optimizar rendimiento */}
          <Suspense fallback={LoadingFallback}>
            <ServicesSection />
          </Suspense>
          
          <Suspense fallback={LoadingFallback}>
            <PacksSection onNavigateToQuestionnaire={navigateToQuestionnaire} />
          </Suspense>
          
          <Suspense fallback={LoadingFallback}>
            <QuestionnaireSection onNavigateToQuestionnaire={navigateToQuestionnaire} />
          </Suspense>
          
          <Suspense fallback={LoadingFallback}>
            <FAQSection />
          </Suspense>
          
          <Suspense fallback={LoadingFallback}>
            <ContactSection />
          </Suspense>
        </main>
        
        {/* Footer con lazy loading */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}