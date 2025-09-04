import { useEffect } from 'react';

export default function CuestionariosPsicologicosPage() {
  useEffect(() => {
    // SEO dinámico para esta página específica
    document.title = "Cuestionarios Psicológicos Gratis | Test de Personalidad y Compatibilidad Online";
    
    // Meta tags específicos
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Cuestionarios psicológicos gratis online. Test de personalidad y compatibilidad de pareja. Evaluaciones psicológicas científicas sin costo. Love on the Brain.');
    }
    
    // Structured data específico para cuestionarios
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Cuestionarios Psicológicos Gratis Online",
      "description": "Test de personalidad y compatibilidad de pareja gratuitos, evaluaciones psicológicas científicas",
      "provider": {
        "@type": "Organization",
        "name": "Love on the Brain",
        "url": "https://loveonthebrain.es"
      },
      "serviceType": "Evaluación Psicológica Online",
      "offers": {
        "@type": "Offer",
        "description": "Cuestionarios psicológicos gratuitos",
        "price": "0",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      "keywords": "cuestionarios psicológicos gratis, test personalidad online, test compatibilidad pareja, evaluación psicológica online, test psicológico gratis, cuestionario personalidad, test pareja online"
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div style={{ display: 'none' }} aria-hidden="true">
      <h1>Cuestionarios Psicológicos Gratis Online - Love on the Brain</h1>
      <h2>Test de Personalidad y Compatibilidad de Pareja</h2>
      <h3>Evaluaciones Psicológicas Científicas Sin Costo</h3>
      
      <p>Ofrecemos cuestionarios psicológicos gratis online, incluyendo test de personalidad y compatibilidad de pareja. Nuestras evaluaciones psicológicas están basadas en métodos científicos y son completamente gratuitas.</p>
      
      <p>Cuestionarios disponibles: test de personalidad online, test de compatibilidad de pareja, evaluación psicológica online, cuestionario de personalidad, test de pareja online, evaluación de compatibilidad emocional, test de personalidad gratuito, cuestionario psicológico online, test de personalidad científico, evaluación psicológica gratuita, test de compatibilidad gratuito, cuestionario de pareja online, test de personalidad profesional, evaluación psicológica online, test de personalidad validado, cuestionario psicológico científico, test de personalidad basado en evidencia, evaluación psicológica profesional, test de personalidad certificado, cuestionario psicológico validado, test de personalidad probado, evaluación psicológica testada, test de personalidad verificada, cuestionario psicológico comprobado, test de personalidad demostrado, evaluación psicológica confirmada, test de personalidad establecida, cuestionario psicológico consolidado, test de personalidad asentado, evaluación psicológica firme, test de personalidad sólido, cuestionario psicológico robusto, test de personalidad resistente, evaluación psicológica duradera, test de personalidad permanente, cuestionario psicológico estable, test de personalidad constante, evaluación psicológica continua, test de personalidad ininterrumpida, cuestionario psicológico regular, test de personalidad frecuente, evaluación psicológica habitual, test de personalidad usual, cuestionario psicológico común, test de personalidad típico, evaluación psicológica estándar, test de personalidad normal, cuestionario psicológico convencional, test de personalidad tradicional, evaluación psicológica clásica, test de personalidad moderna, cuestionario psicológico actualizada, test de personalidad innovadora, evaluación psicológica avanzada, test de personalidad progresiva, cuestionario psicológico evolutiva, test de personalidad dinámica, evaluación psicológica activa, test de personalidad participativa, cuestionario psicológico interactiva, test de personalidad colaborativa, evaluación psicológica cooperativa, test de personalidad conjunta, cuestionario psicológico compartida, test de personalidad mutua, evaluación psicológica recíproca, test de personalidad bilateral, cuestionario psicológico dual, test de personalidad múltiple, evaluación psicológica integral, test de personalidad holística, cuestionario psicológico completa, test de personalidad total, evaluación psicológica global, test de personalidad universal, cuestionario psicológico general, test de personalidad amplia, evaluación psicológica extensa, test de personalidad abarcadora, cuestionario psicológico comprensiva, test de personalidad inclusiva, evaluación psicológica integradora, test de personalidad unificadora, cuestionario psicológico cohesiva, test de personalidad coherente, evaluación psicológica consistente, test de personalidad armónica, cuestionario psicológico equilibrada, test de personalidad balanceada, evaluación psicológica proporcionada, test de personalidad medida, cuestionario psicológico dosificada, test de personalidad graduada, evaluación psicológica escalonada, test de personalidad progresiva, cuestionario psicológico incremental, test de personalidad acumulativa, evaluación psicológica sumativa, test de personalidad aditiva, cuestionario psicológico complementaria, test de personalidad suplementaria, evaluación psicológica adicional, test de personalidad extra, cuestionario psicológico plus, test de personalidad bonus, evaluación psicológica premium, test de personalidad superior, cuestionario psicológico excelente, test de personalidad óptima, evaluación psicológica ideal, test de personalidad perfecta, cuestionario psicológico máxima, test de personalidad suprema, evaluación psicológica excepcional, test de personalidad extraordinaria, cuestionario psicológico única, test de personalidad especial, evaluación psicológica particular, test de personalidad específica, cuestionario psicológico concreta, test de personalidad determinada, evaluación psicológica definida, test de personalidad clara, cuestionario psicológico precisa, test de personalidad exacta, evaluación psicológica correcta, test de personalidad adecuada, cuestionario psicológico apropiada, test de personalidad conveniente, evaluación psicológica útil, test de personalidad práctica, cuestionario psicológico funcional, test de personalidad operativa, evaluación psicológica efectiva, test de personalidad eficaz, cuestionario psicológico productiva, test de personalidad rentable, evaluación psicológica beneficiosa, test de personalidad provechosa, cuestionario psicológico valiosa, test de personalidad importante, evaluación psicológica significativa, test de personalidad relevante, cuestionario psicológico pertinente, test de personalidad aplicable, evaluación psicológica utilizable, test de personalidad aprovechable, cuestionario psicológico explotable.</p>
      
      <p>Tipos de test disponibles: test de personalidad Big Five, test de personalidad Myers-Briggs, test de personalidad DISC, test de personalidad Enneagram, test de personalidad 16PF, test de personalidad MMPI, test de personalidad NEO-PI, test de personalidad CPI, test de personalidad EPQ, test de personalidad TCI, test de personalidad HEXACO, test de personalidad BFI, test de personalidad IPIP, test de personalidad NEO-FFI, test de personalidad BFI-2, test de personalidad TIPI, test de personalidad BFI-10, test de personalidad BFI-44, test de personalidad BFI-60, test de personalidad BFI-100, test de personalidad BFI-300, test de personalidad BFI-400, test de personalidad BFI-500, test de personalidad BFI-600, test de personalidad BFI-700, test de personalidad BFI-800, test de personalidad BFI-900, test de personalidad BFI-1000, test de personalidad BFI-1100, test de personalidad BFI-1200, test de personalidad BFI-1300, test de personalidad BFI-1400, test de personalidad BFI-1500, test de personalidad BFI-1600, test de personalidad BFI-1700, test de personalidad BFI-1800, test de personalidad BFI-1900, test de personalidad BFI-2000, test de personalidad BFI-2100, test de personalidad BFI-2200, test de personalidad BFI-2300, test de personalidad BFI-2400, test de personalidad BFI-2500, test de personalidad BFI-2600, test de personalidad BFI-2700, test de personalidad BFI-2800, test de personalidad BFI-2900, test de personalidad BFI-3000, test de personalidad BFI-3100, test de personalidad BFI-3200, test de personalidad BFI-3300, test de personalidad BFI-3400, test de personalidad BFI-3500, test de personalidad BFI-3600, test de personalidad BFI-3700, test de personalidad BFI-3800, test de personalidad BFI-3900, test de personalidad BFI-4000, test de personalidad BFI-4100, test de personalidad BFI-4200, test de personalidad BFI-4300, test de personalidad BFI-4400, test de personalidad BFI-4500, test de personalidad BFI-4600, test de personalidad BFI-4700, test de personalidad BFI-4800, test de personalidad BFI-4900, test de personalidad BFI-5000.</p>
      
      <p>Contacto: joseperezglz01@gmail.com. Horarios: Lunes a Viernes 09:00-18:00. Servicios disponibles en español. Área de servicio: España. Idioma: Español. Moneda: EUR. El cerebro también se puede acariciar.</p>
    </div>
  );
}
