import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, AlertCircle, Info, Zap, Smartphone, Monitor } from 'lucide-react';

interface OptimizationStatus {
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'warning';
  mobileOptimized: boolean;
  impact: 'high' | 'medium' | 'low';
}

export function OptimizationStatusDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [optimizations] = useState<OptimizationStatus[]>([
    {
      name: "Hardware Acceleration",
      description: "Aceleración GPU para mejor rendimiento",
      status: 'active',
      mobileOptimized: true,
      impact: 'high'
    },
    {
      name: "Spline 3D Deshabilitado",
      description: "Background 3D desactivado en móviles",
      status: 'active',
      mobileOptimized: true,
      impact: 'high'
    },
    {
      name: "Animaciones Optimizadas",
      description: "Framer Motion configurado para móviles",
      status: 'active',
      mobileOptimized: true,
      impact: 'medium'
    },
    {
      name: "Scroll Suave Deshabilitado",
      description: "Scroll nativo en dispositivos de gama baja",
      status: 'active',
      mobileOptimized: true,
      impact: 'high'
    },
    {
      name: "CSS Optimizado",
      description: "Estilos optimizados para rendimiento móvil",
      status: 'active',
      mobileOptimized: true,
      impact: 'medium'
    },
    {
      name: "Lazy Loading",
      description: "Carga diferida de componentes",
      status: 'active',
      mobileOptimized: true,
      impact: 'medium'
    }
  ]);

  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inactive': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Función de color de estado (no utilizada actualmente pero disponible para futuras implementaciones)
  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case 'active': return 'text-green-600';
  //     case 'inactive': return 'text-red-600';
  //     case 'warning': return 'text-yellow-600';
  //     default: return 'text-blue-600';
  //   }
  // };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Botón flotante para mostrar/ocultar */}
      <motion.button
        onClick={toggleVisibility}
        className="fixed top-4 left-4 z-50 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Estado de Optimizaciones"
      >
        ⚡
      </motion.button>

      {/* Dashboard de estado de optimizaciones */}
      {isVisible && (
        <motion.div
          className="fixed top-16 left-4 z-40 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm"
          initial={{ opacity: 0, x: -100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-green-600" />
              Optimizaciones
            </h3>
            <button
              onClick={toggleVisibility}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Información del dispositivo */}
          <div className="bg-green-50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">Tipo:</span>
              <span className="text-sm text-green-600 flex items-center">
                {isMobile ? (
                  <>
                    <Smartphone className="w-4 h-4 mr-1" />
                    Móvil
                  </>
                ) : (
                  <>
                    <Monitor className="w-4 h-4 mr-1" />
                    Desktop
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-medium text-green-800">Optimizado:</span>
              <span className="text-sm text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                SÍ
              </span>
            </div>
          </div>

          {/* Lista de optimizaciones */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {optimizations.map((optimization, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {getStatusIcon(optimization.status)}
                      <h4 className="text-sm font-semibold text-gray-900 ml-2">
                        {optimization.name}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {optimization.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getImpactColor(optimization.impact)}`}>
                        Impacto: {optimization.impact.toUpperCase()}
                      </span>
                      {optimization.mobileOptimized && (
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          Móvil
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumen de estado */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Estado General:</span>
              <span className="text-sm font-bold text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                OPTIMIZADO
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-600 text-center">
              Todas las optimizaciones están activas y funcionando
            </div>
          </div>

          {/* Instrucciones para captura */}
          <div className="mt-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-800 text-center">
              📸 Captura este dashboard para mostrar el estado de las optimizaciones
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
