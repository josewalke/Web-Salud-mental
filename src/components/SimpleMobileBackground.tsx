import React from 'react';

export function SimpleMobileBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Elementos simples y ligeros para móvil */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-200"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-blue-200"></div>
      
      {/* Puntos simples en lugar de elementos complejos */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-100 rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-100 rounded-full"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-100 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
      
      {/* Líneas simples */}
      <div className="absolute top-1/4 right-1/4 w-12 h-0.5 bg-blue-200"></div>
      <div className="absolute bottom-1/4 left-1/4 w-8 h-0.5 bg-blue-200"></div>
    </div>
  );
}
