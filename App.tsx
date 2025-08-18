import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';

// Lazy loading de componentes no críticos para el first paint
const ServicesSection = lazy(() => import('./components/ServicesSection'));
const PacksSection = lazy(() => import('./components/PacksSection'));
const QuestionnaireSection = lazy(() => import('./components/QuestionnaireSection'));
const QuestionairePage = lazy(() => import('./components/QuestionairePage'));
const FAQSection = lazy(() => import('./components/FAQSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));
const SplineBackground = lazy(() => import('./components/SplineBackground'));

type Page = 'home' | 'questionnaire-pareja' | 'questionnaire-personalidad';
type QuestionnaireType = 'pareja' | 'personalidad';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [questionnaireType, setQuestionnaireType] = useState<QuestionnaireType>('pareja');
  const [returnToSection, setReturnToSection] = useState<string | null>(null);
  
  // Detectar dispositivo móvil una sola vez
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024;
  }, []);

  // Router mínimo basado en hash para persistir ruta tras recargar
  const applyRouteFromHash = () => {
    const hash = window.location.hash.replace(/^#/, ''); // ej: /cuestionario/pareja
    if (hash.startsWith('/cuestionario/')) {
      const type = hash.split('/')[2] as QuestionnaireType | undefined;
      if (type === 'pareja' || type === 'personalidad') {
        setQuestionnaireType(type);
        setCurrentPage(`questionnaire-${type}`);
        return;
      }
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

  // Navegación optimizada con memoización
  const navigateToQuestionnaire = useMemo(() => (type: QuestionnaireType) => {
    setQuestionnaireType(type);
    setCurrentPage(`questionnaire-${type}` as Page);
    // Actualizar hash para persistir ruta al recargar
    window.location.hash = `#/cuestionario/${type}`;
  }, []);

  const navigateToHome = useMemo(() => (targetSection?: string) => {
    setCurrentPage('home');
    // Resetear hash a home
    window.location.hash = '#/';
    if (targetSection) {
      setReturnToSection(targetSection);
    }
  }, []);

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

  // Loading fallback optimizado - sin spinner para carga más rápida
  const LoadingFallback = useMemo(() => (
    <div className="min-h-[200px]"></div>
  ), []);

  // Render de páginas de cuestionarios
  if (currentPage === 'questionnaire-pareja' || currentPage === 'questionnaire-personalidad') {
    return (
      <div className="min-h-screen bg-white">
        <Suspense fallback={LoadingFallback}>
          <QuestionairePage 
            type={questionnaireType}
            onBack={navigateToHomeFromQuestionnaire}
          />
        </Suspense>
      </div>
    );
  }

  // Home page optimizada
  return (
    <div className="min-h-screen relative bg-transparent">
      {/* Fondo 3D Spline */}
      <SplineBackground />
      
      
      
      {/* Contenido principal */}
      <div className="relative min-h-screen bg-transparent content-above-spline">
        <Header />
        <main role="main">
          <HeroSection />
          
          {/* Secciones con lazy loading y suspense */}
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
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}