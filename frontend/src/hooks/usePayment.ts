import { useState, useEffect } from 'react';
import { paymentConfig } from '../config/payment';

interface PaymentStatus {
  isPaid: boolean;
  amount: number;
  dueDate: string;
  projectName: string;
  developer: string;
  email: string;
  linkedin: string;
  github: string;
}

export const usePayment = () => {
  const [paymentValid, setPaymentValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState<PaymentStatus | null>(null);

  useEffect(() => {
    const checkPayment = async () => {
      try {
        // Simular delay de verificación
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Usar configuración local
        const data: PaymentStatus = paymentConfig;
        
        setPaymentInfo(data);
        
        if (!data.isPaid) {
          setPaymentValid(false);
        } else {
          setPaymentValid(true);
        }
      } catch (error) {
        console.error('Error checking payment:', error);
        // En caso de error, bloquear por seguridad
        setPaymentValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkPayment();
    
    // Verificar cada 5 minutos
    const interval = setInterval(checkPayment, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { paymentValid, loading, paymentInfo };
};
