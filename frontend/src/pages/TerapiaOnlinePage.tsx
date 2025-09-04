import { useEffect } from 'react';

export default function TerapiaOnlinePage() {
  useEffect(() => {
    // SEO dinámico para esta página específica
    document.title = "Terapia Online Barata España | Love on the Brain - Psicólogo Económico";
    
    // Meta tags específicos
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Terapia online barata en España. Psicólogo económico con presupuestos amigables. Sesiones de apoyo emocional online sin juicios. El cerebro también se puede acariciar.');
    }
    
    // Structured data específico para terapia online
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Terapia Online Barata España",
      "description": "Servicios de terapia psicológica online con presupuestos amigables en España",
      "provider": {
        "@type": "Organization",
        "name": "Love on the Brain",
        "url": "https://loveonthebrain.es"
      },
      "areaServed": {
        "@type": "Country",
        "name": "España"
      },
      "serviceType": "Terapia Psicológica Online",
      "offers": {
        "@type": "Offer",
        "description": "Terapia online económica y accesible",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock"
      },
      "keywords": "terapia online barata España, psicólogo económico, terapia psicológica online, sesiones online, apoyo emocional online, terapia accesible, psicólogo barato, terapia sin juicios"
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
      <h1>Terapia Online Barata España - Love on the Brain</h1>
      <h2>Psicólogo Económico con Presupuestos Amigables</h2>
      <h3>Servicios de Terapia Psicológica Online Accesibles</h3>
      
      <p>Ofrecemos terapia online barata en España con psicólogos económicos y presupuestos amigables. Nuestros servicios de terapia psicológica online están diseñados para ser accesibles para todos, sin comprometer la calidad del servicio.</p>
      
      <p>Servicios de terapia online disponibles: terapia individual online, terapia de pareja online, terapia familiar online, terapia grupal online, terapia para adolescentes online, terapia para adultos online, terapia para tercera edad online, terapia LGBTQ+ online, terapia inclusiva online, terapia sin juicios online, terapia accesible online, terapia económica online, terapia de calidad online, terapia profesional online, terapia certificada online, terapia especializada online, terapia personalizada online, terapia adaptada online, terapia flexible online, terapia cómoda online, terapia segura online, terapia confidencial online, terapia privada online, terapia discreta online, terapia respetuosa online, terapia empática online, terapia comprensiva online, terapia humana online, terapia cercana online, terapia cálida online, terapia acogedora online, terapia amigable online, terapia familiar online, terapia cercana online, terapia de confianza online, terapia de calidad online, terapia efectiva online, terapia exitosa online, terapia probada online, terapia validada online, terapia científica online, terapia basada evidencia online, terapia profesional online, terapia especializada online, terapia experta online, terapia cualificada online, terapia titulada online, terapia licenciada online, terapia colegiada online, terapia regulada online, terapia oficial online, terapia reconocida online, terapia acreditada online, terapia certificada online.</p>
      
      <p>Palabras clave: terapia online barata España, psicólogo económico, terapia psicológica online, sesiones online, apoyo emocional online, terapia accesible, psicólogo barato, terapia sin juicios, terapia online Madrid, terapia online Barcelona, terapia online Valencia, terapia online Sevilla, terapia online Zaragoza, terapia online Málaga, terapia online Murcia, terapia online Palma, terapia online Las Palmas, terapia online Bilbao, terapia online Alicante, terapia online Córdoba, terapia online Valladolid, terapia online Vigo, terapia online Gijón, terapia online Hospitalet, terapia online Vitoria, terapia online A Coruña, terapia online Granada, terapia online Elche, terapia online Oviedo, terapia online Santa Cruz, terapia online Badalona, terapia online Cartagena, terapia online Terrassa, terapia online Jerez, terapia online Sabadell, terapia online Móstoles, terapia online Alcalá, terapia online Fuenlabrada, terapia online Leganés, terapia online Getafe, terapia online Alcorcón, terapia online Torrejón, terapia online Parla, terapia online Alcobendas, terapia online Alcalá de Henares, terapia online Coslada, terapia online San Sebastián de los Reyes, terapia online Pozuelo de Alarcón, terapia online Rivas-Vaciamadrid, terapia online Las Rozas, terapia online Majadahonda, terapia online Boadilla del Monte, terapia online Villaviciosa de Odón, terapia online Pinto, terapia online Valdemoro, terapia online Aranjuez, terapia online Arganda del Rey, terapia online Mejorada del Campo, terapia online San Fernando de Henares, terapia online Torrejón de Ardoz, terapia online Algete, terapia online Ciempozuelos, terapia online Chinchón, terapia online Colmenar Viejo, terapia online Daganzo, terapia online Fresno de Torote, terapia online Fuente el Saz, terapia online Loeches, terapia online Los Santos de la Humosa, terapia online Paracuellos de Jarama, terapia online Perales de Tajuña, terapia online Rivas-Vaciamadrid, terapia online San Martín de la Vega, terapia online Serranillos del Valle, terapia online Tielmes, terapia online Torres de la Alameda, terapia online Valdilecha, terapia online Valverde de Alcalá, terapia online Velilla de San Antonio, terapia online Villalbilla, terapia online Villamanrique de Tajo, terapia online Villar del Olmo, terapia online Villarejo de Salvanés, terapia online Villaviciosa de Odón.</p>
      
      <p>Contacto: joseperezglz01@gmail.com. Horarios: Lunes a Viernes 09:00-18:00. Servicios disponibles en español. Área de servicio: España. Idioma: Español. Moneda: EUR. El cerebro también se puede acariciar.</p>
    </div>
  );
}
