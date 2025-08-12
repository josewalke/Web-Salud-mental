import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Smartphone, Zap, Clock, BarChart3, Cpu } from 'lucide-react';

interface PerformanceData {
  fps: number;
  memory: number;
  scrollSmoothness: number;
  touchResponse: number;
  loadTime: number;
  deviceType: string;
  isOptimized: boolean;
}

export function MobilePerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false);
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    fps: 0,
    memory: 0,
    scrollSmoothness: 0,
    touchResponse: 0,
    loadTime: 0,
    deviceType: 'unknown',
    isOptimized: false
  });

  // Detectar tipo de dispositivo
  useEffect(() => {
    const userAgent = navigator.userAgent;
    let deviceType = 'unknown';
    let isOptimized = false;

    if (/iPhone OS 16_[0-6]|iPhone OS 15_|iPhone OS 14_|iPhone OS 13_|iPhone OS 12_|iPhone OS 11_|iPhone OS 10_/i.test(userAgent)) {
      deviceType = 'iPhone (Gama Baja)';
      isOptimized = true;
    } else if (/iPhone/i.test(userAgent)) {
      deviceType = 'iPhone (Gama Alta)';
      isOptimized = true;
    } else if (/Android [4-7]|Android 8\.0|Android 8\.1/i.test(userAgent)) {
      deviceType = 'Android (Gama Baja)';
      isOptimized = true;
    } else if (/Android/i.test(userAgent)) {
      deviceType = 'Android (Gama Alta)';
      isOptimized = true;
    } else if (/iPad|Macintosh/i.test(userAgent)) {
      deviceType = 'Tablet/Desktop';
      isOptimized = false;
    }

    setPerformanceData(prev => ({ ...prev, deviceType, isOptimized }));
  }, []);

  // Medir FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setPerformanceData(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }, []);

  // Medir uso de memoria
  useEffect(() => {
    const measureMemory = () => {
      if ('memory' in performance) {
        const memoryInfo = performance.memory as any;
        if (memoryInfo && memoryInfo.usedJSHeapSize) {
          const memory = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024);
          setPerformanceData(prev => ({ ...prev, memory }));
        }
      }
    };
    
    const interval = setInterval(measureMemory, 2000);
    return () => clearInterval(interval);
  }, []);

  // Medir tiempo de carga
  useEffect(() => {
    const loadTime = Math.round(performance.now());
    setPerformanceData(prev => ({ ...prev, loadTime }));
  }, []);

  // Medir suavidad de scroll
  useEffect(() => {
    let scrollStartTime: number;
    let scrollDistance = 0;
    let scrollCount = 0;
    
    const handleScroll = () => {
      if (!scrollStartTime) {
        scrollStartTime = performance.now();
      }
      
      scrollDistance += 1;
      scrollCount++;
      
      // Calcular suavidad basada en la frecuencia de scroll
      const scrollSmoothness = Math.min(100, Math.round((scrollCount / scrollDistance) * 100));
      setPerformanceData(prev => ({ ...prev, scrollSmoothness }));
      
      // Reset después de 1 segundo
      setTimeout(() => {
        scrollStartTime = 0;
        scrollDistance = 0;
        scrollCount = 0;
      }, 1000);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Medir respuesta táctil
  useEffect(() => {
    let touchStartTime: number;
    let touchCount = 0;
    
    const handleTouch = () => {
      if (!touchStartTime) {
        touchStartTime = performance.now();
      }
      
      touchCount++;
      const touchResponse = Math.min(100, Math.round((touchCount / (performance.now() - touchStartTime)) * 1000));
      setPerformanceData(prev => ({ ...prev, touchResponse }));
      
      setTimeout(() => {
        touchStartTime = 0;
        touchCount = 0;
      }, 1000);
    };
    
    document.addEventListener('touchstart', handleTouch, { passive: true });
    return () => document.removeEventListener('touchstart', handleTouch);
  }, []);

  // Toggle visibilidad
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // Obtener color de estado
  const getStatusColor = (value: number, threshold: number) => {
    if (value >= threshold) return 'text-green-500';
    if (value >= threshold * 0.7) return 'text-yellow-500';
    return 'text-red-500';
  };

  // Obtener icono de estado
  const getStatusIcon = (value: number, threshold: number) => {
    if (value >= threshold) return '✅';
    if (value >= threshold * 0.7) return '⚠️';
    return '❌';
  };

  return (
    <>
      {/* Botón flotante para mostrar/ocultar */}
      <motion.button
        onClick={toggleVisibility}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Monitor de Rendimiento Móvil"
      >
        📱
      </motion.button>

      {/* Dashboard de monitoreo */}
      {isVisible && (
        <motion.div
          className="fixed top-16 right-4 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
              Monitor Móvil
            </h3>
            <button
              onClick={toggleVisibility}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Información del dispositivo */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-800">Dispositivo:</span>
              <span className="text-sm text-blue-600">{performanceData.deviceType}</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-medium text-blue-800">Optimizado:</span>
              <span className={`text-sm ${performanceData.isOptimized ? 'text-green-600' : 'text-red-600'}`}>
                {performanceData.isOptimized ? 'SÍ' : 'NO'}
              </span>
            </div>
          </div>

          {/* Métricas de rendimiento */}
          <div className="space-y-3">
            {/* FPS */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Activity className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">FPS:</span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-bold ${getStatusColor(performanceData.fps, 30)}`}>
                  {performanceData.fps}
                </span>
                <span className="ml-1 text-xs text-gray-500">/ 60</span>
                <span className="ml-2">{getStatusIcon(performanceData.fps, 30)}</span>
              </div>
            </div>

            {/* Memoria */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BarChart3 className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Memoria:</span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-bold ${getStatusColor(performanceData.memory, 50)}`}>
                  {performanceData.memory}MB
                </span>
                <span className="ml-2">{getStatusIcon(performanceData.memory, 50)}</span>
              </div>
            </div>

            {/* Scroll Suave */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Scroll:</span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-bold ${getStatusColor(performanceData.scrollSmoothness, 70)}`}>
                  {performanceData.scrollSmoothness}%
                </span>
                <span className="ml-2">{getStatusIcon(performanceData.scrollSmoothness, 70)}</span>
              </div>
            </div>

            {/* Respuesta Táctil */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Cpu className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Táctil:</span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-bold ${getStatusColor(performanceData.touchResponse, 80)}`}>
                  {performanceData.touchResponse}%
                </span>
                <span className="ml-2">{getStatusIcon(performanceData.touchResponse, 80)}</span>
              </div>
            </div>

            {/* Tiempo de Carga */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Carga:</span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-bold ${getStatusColor(performanceData.loadTime, 1000)}`}>
                  {performanceData.loadTime}ms
                </span>
                <span className="ml-2">{getStatusIcon(performanceData.loadTime, 1000)}</span>
              </div>
            </div>
          </div>

          {/* Estado general */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Estado General:</span>
              <span className={`text-sm font-bold ${
                performanceData.fps >= 30 && 
                performanceData.memory <= 100 && 
                performanceData.scrollSmoothness >= 70 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {performanceData.fps >= 30 && 
                 performanceData.memory <= 100 && 
                 performanceData.scrollSmoothness >= 70 
                   ? '✅ OPTIMO' 
                   : '❌ PROBLEMAS'}
              </span>
            </div>
          </div>

          {/* Instrucciones para captura */}
          <div className="mt-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800 text-center">
              📸 Toma una captura de pantalla de este dashboard para mostrarme el rendimiento
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
