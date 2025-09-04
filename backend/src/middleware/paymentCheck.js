/**
 * Middleware de verificación de pago
 * Bloquea el acceso al proyecto si no se ha realizado el pago
 */

const checkPaymentStatus = async () => {
  // Configuración del pago
  const paymentConfig = {
    isPaid: false, // CAMBIAR A TRUE CUANDO PAGUEN
    amount: 25000,
    dueDate: '2024-01-31',
    projectName: 'Love on the Brain',
    developer: 'José Juan Pérez González',
    email: 'joseperezglz01@gmail.com'
  };
  
  return paymentConfig;
};

const paymentCheck = async (req, res, next) => {
  try {
    // Excluir la ruta de verificación de pago
    if (req.path === '/api/payment/status') {
      return next();
    }
    
    // Verificar estado del pago
    const paymentStatus = await checkPaymentStatus();
    
    if (!paymentStatus.isPaid) {
      return res.status(403).json({
        error: 'PAYMENT_REQUIRED',
        message: 'El proyecto requiere pago para funcionar',
        amount: paymentStatus.amount,
        dueDate: paymentStatus.dueDate,
        projectName: paymentStatus.projectName,
        developer: paymentStatus.developer,
        email: paymentStatus.email
      });
    }
    
    // Pago realizado, continuar
    next();
  } catch (error) {
    console.error('Error en verificación de pago:', error);
    res.status(500).json({
      error: 'PAYMENT_CHECK_FAILED',
      message: 'Error verificando pago'
    });
  }
};

module.exports = paymentCheck;
