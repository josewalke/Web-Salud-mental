import React, { useState, Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Heart, Brain } from 'lucide-react';
import { SplineBackground } from './components/SplineBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { initializePerformanceOptimizations, logPerformanceMetrics } from './utils/performanceOptimizations';
import userTrackingSystem from './utils/userTrackingSystem';
import { QuestionnairePage } from './pages/QuestionnairePage';
import { PersonalityQuestionnairePage } from './pages/PersonalityQuestionnairePage';
import UserActionsDashboard from './components/UserActionsDashboard';

// Lazy load non-critical components for better performance
const ProblemSection = lazy(() => import('./components/ProblemSection').then(module => ({ default: module.ProblemSection })));
const ServicesSection = lazy(() => import('./components/ServicesSection').then(module => ({ default: module.ServicesSection })));
const QuestionnaireSection = lazy(() => import('./components/QuestionnaireSection').then(module => ({ default: module.QuestionnaireSection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

// Loading component for lazy-loaded sections
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

// Componente de la página principal
function HomePage() {
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);

  // Initialize performance optimizations and user tracking
  useEffect(() => {
    initializePerformanceOptimizations();
    
    // Initialize user tracking system
    userTrackingSystem.init();

    // Log performance metrics after a delay
    const timer = setTimeout(() => {
      logPerformanceMetrics();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Spline 3D Background - Fixed position behind everything */}
      <SplineBackground />

      {/* Main content - Positioned above the background */}
      <div className="relative z-20">
        <Header />
        <main>
          <HeroSection />

          {/* Lazy-loaded sections with Suspense */}
          <Suspense fallback={<SectionLoader />}>
            <ProblemSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>

          <Suspense fallback={<SectionLoader />}>
            <QuestionnaireSection />
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-20 bg-gray-50"></div>}>
          <Footer />
        </Suspense>
      </div>

      {/* Performance Monitor Toggle Button */}
      <button
        onClick={() => setShowPerformanceMonitor(!showPerformanceMonitor)}
        className="fixed bottom-4 left-4 z-50 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        title="Monitor de Performance"
      >
        📊
      </button>

      {/* Caja Elegante con Botones de Cuestionarios */}
      <motion.div 
        className="fixed bottom-4 right-4 z-50 bg-white rounded-2xl p-3 shadow-2xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex space-x-3">
          {/* Botón Cuestionario de Compatibilidad */}
          <motion.button
            onClick={() => window.location.href = '/cuestionario'}
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
            title="Hacer Cuestionario de Compatibilidad"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-6 h-6" />
          </motion.button>

          {/* Botón Cuestionario de Personalidad */}
          <motion.button
            onClick={() => window.location.href = '/cuestionario-personalidad'}
            className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
            title="Hacer Test de Personalidad"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Brain className="w-6 h-6" />
          </motion.button>

          {/* Botón Dashboard de Tracking */}
          <motion.button
            onClick={() => window.location.href = '/user-tracking'}
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300"
            title="Dashboard de Tracking de Usuario"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            📊
          </motion.button>
        </div>
      </motion.div>

      {/* Performance Monitor Component - Updated with Fase 2 optimizations */}
      {showPerformanceMonitor && (
        <div className="fixed top-4 right-4 w-96 max-h-[80vh] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">📊 Monitor de Performance</h3>
              <button
                onClick={() => setShowPerformanceMonitor(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600">Monitor de performance optimizado - Fase 2 implementada</p>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">✅ Optimizaciones Implementadas:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Spline timeout reducido a 5s</li>
                <li>• Lazy loading de componentes</li>
                <li>• CSS optimizado</li>
                <li>• Resource hints implementados</li>
                <li>• Bundle size optimizado</li>
                <li>• <strong>Fase 2:</strong> Image optimization avanzada</li>
                <li>• <strong>Fase 2:</strong> Code splitting avanzado</li>
                <li>• <strong>Fase 2:</strong> Service worker para caching</li>
                <li>• <strong>Fase 2:</strong> Performance monitoring real-time</li>
                <li>• <strong>Empresa:</strong> Love on the Brain - El cerebro también se puede acariciar</li>
              </ul>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🚀 Nuevas Funcionalidades:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• WebP support automático</li>
                <li>• Lazy loading nativo de imágenes</li>
                <li>• Route-based code splitting</li>
                <li>• Vendor chunk optimization</li>
                <li>• Offline support con service worker</li>
                <li>• Real-time performance monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<HomePage />} />

                            {/* Ruta del cuestionario de compatibilidad */}
                  <Route path="/cuestionario" element={<QuestionnairePage />} />
                  
                  {/* Ruta del cuestionario de personalidad */}
                  <Route path="/cuestionario-personalidad" element={<PersonalityQuestionnairePage />} />
                  
                  {/* Ruta del dashboard de acciones del usuario */}
                  <Route path="/user-tracking" element={<UserActionsDashboard />} />

          {/* Redirección por defecto */}
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
