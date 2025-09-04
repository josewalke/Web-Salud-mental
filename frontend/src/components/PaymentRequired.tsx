import React from 'react';

interface PaymentInfo {
  amount: number;
  dueDate: string;
  projectName: string;
  developer: string;
  email: string;
  linkedin: string;
  github: string;
}

interface PaymentRequiredProps {
  paymentInfo: PaymentInfo;
}

const PaymentRequired: React.FC<PaymentRequiredProps> = ({ paymentInfo }) => {
  // Prevenir cualquier interacción con el modal
  const handleModalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  // Prevenir escape key y otras teclas
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Bloquear todas las teclas
    document.addEventListener('keydown', handleKeyDown, true);
    // Bloquear clic derecho
    document.addEventListener('contextmenu', handleContextMenu, true);
    // Bloquear selección de texto
    document.body.style.userSelect = 'none';
    // Bloquear scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.body.style.userSelect = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {/* Overlay que cubre toda la pantalla */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center"
        onClick={handleModalClick}
        onMouseDown={handleModalClick}
        onMouseUp={handleModalClick}
        onTouchStart={handleModalClick}
        onTouchEnd={handleModalClick}
      >
        {/* Modal principal */}
        <div 
          className="bg-white rounded-2xl p-6 max-w-5xl w-full mx-4 shadow-2xl border-4 border-red-500"
          onClick={handleModalClick}
          onMouseDown={handleModalClick}
          onMouseUp={handleModalClick}
        >
          {/* Header del modal */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/logo192.png" 
                alt="Love on the Brain Logo" 
                className="h-12 w-auto mr-3"
              />
              <div className="text-6xl">🔒</div>
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">ACCESO BLOQUEADO</h1>
            <h2 className="text-xl text-gray-700 font-semibold">PAGO PENDIENTE</h2>
            <div className="mt-3 p-3 bg-red-100 rounded-lg border-2 border-red-300">
              <p className="text-red-800 font-bold text-base">
                ⚠️ ESTA PÁGINA ESTÁ BLOQUEADA HASTA QUE SE COMPLETE EL PAGO
              </p>
            </div>
          </div>
          
          {/* Contenido en filas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detalles del proyecto */}
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
              <h3 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
                📋 DETALLES DEL PROYECTO
              </h3>
              <div className="space-y-3">
                <p className="text-base">
                  <strong className="text-blue-600">Proyecto:</strong> 
                  <span className="ml-2 font-semibold">{paymentInfo.projectName}</span>
                </p>
                <p className="text-base">
                  <strong className="text-green-600">Monto:</strong> 
                  <span className="ml-2 font-bold text-green-700 text-lg">€{paymentInfo.amount.toLocaleString()}</span>
                </p>
                <p className="text-base">
                  <strong className="text-orange-600">Vencimiento:</strong> 
                  <span className="ml-2 font-semibold">{paymentInfo.dueDate}</span>
                </p>
                <p className="text-base">
                  <strong className="text-red-600">Estado:</strong> 
                  <span className="ml-2 font-bold text-red-700 text-lg">PENDIENTE DE PAGO</span>
                </p>
              </div>
            </div>
            
            {/* Información de contacto */}
            <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
              <h3 className="text-lg font-bold mb-3 text-blue-800 flex items-center">
                📞 CONTACTO PARA PAGO
              </h3>
              <div className="space-y-3">
                <p className="text-base">
                  <strong>Desarrollador:</strong> 
                  <span className="ml-2 font-semibold">{paymentInfo.developer}</span>
                </p>
                <p className="text-base">
                  <strong>Email:</strong> 
                  <a 
                    href={`mailto:${paymentInfo.email}`} 
                    className="ml-2 text-blue-600 hover:text-blue-800 font-semibold underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {paymentInfo.email}
                  </a>
                </p>
                <p className="text-base">
                  <strong>LinkedIn:</strong> 
                  <a 
                    href={paymentInfo.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-blue-600 hover:text-blue-800 font-semibold underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    José Juan Pérez González
                  </a>
                </p>
                <p className="text-base">
                  <strong>GitHub:</strong> 
                  <a 
                    href={paymentInfo.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-blue-600 hover:text-blue-800 font-semibold underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    josewalke
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          {/* Advertencia final */}
          <div className="bg-yellow-50 rounded-xl p-4 border-4 border-yellow-400 mt-6">
            <div className="flex items-start">
              <span className="text-3xl mr-3">⚠️</span>
              <div>
                <h4 className="text-lg font-bold text-yellow-800 mb-2">
                  ACCESO PERMANENTEMENTE BLOQUEADO
                </h4>
                <p className="text-yellow-800 font-medium text-base leading-relaxed">
                  Esta página web permanecerá <strong>completamente bloqueada</strong> hasta que se complete el pago del proyecto. 
                  No se puede cerrar este modal ni acceder a ninguna funcionalidad. 
                  Contacte inmediatamente con el desarrollador para proceder con el pago.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay adicional para mayor seguridad */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
        onClick={handleModalClick}
        onMouseDown={handleModalClick}
        onMouseUp={handleModalClick}
      />
    </>
  );
};

export default PaymentRequired;
