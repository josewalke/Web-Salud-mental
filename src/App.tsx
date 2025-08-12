import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LazyMotion, domAnimation, m as motion, MotionConfig } from 'framer-motion';
import { Heart, Brain } from 'lucide-react';
import { SplineBackground } from './components/SplineBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';


import { QuestionnairePage } from './pages/QuestionnairePage';
import { PersonalityQuestionnairePage } from './pages/PersonalityQuestionnairePage';


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


        </div>
      </motion.div>


    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <MotionConfig 
          reducedMotion="user" 
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <BrowserRouter>
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<HomePage />} />

              {/* Ruta del cuestionario de compatibilidad */}
              <Route path="/cuestionario" element={<QuestionnairePage />} />
              
              {/* Ruta del cuestionario de personalidad */}
              <Route path="/cuestionario-personalidad" element={<PersonalityQuestionnairePage />} />
              


              {/* Redirección por defecto */}
              <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
          </BrowserRouter>
        </MotionConfig>
      </LazyMotion>
    </HelmetProvider>
  );
}

export default App;
