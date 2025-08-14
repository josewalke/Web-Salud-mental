import { motion } from 'framer-motion';

export default function FAQSection() {
  const faqs = [
    {
      question: "¿Qué es Love on the Brain y cómo puede ayudarme?",
      answer: "Love on the Brain es una empresa psico-social innovadora que ofrece servicios de salud mental y crecimiento personal con presupuestos amigables. Ayudamos en tu desarrollo emocional sin juicio, con profesionales certificados que trabajan de corazón para tu bienestar mental."
    },
    {
      question: "¿Cuáles son los beneficios del apoyo emocional personalizado?",
      answer: "El apoyo emocional personalizado ofrece flexibilidad horaria, comodidad desde tu hogar, acceso a profesionales especializados sin limitaciones geográficas, mayor privacidad y confidencialidad, y tarifas más accesibles que los servicios tradicionales."
    },
    {
      question: "¿Cómo funcionan los cuestionarios de evaluación de bienestar?",
      answer: "Nuestros cuestionarios están diseñados por profesionales para evaluar diferentes aspectos de tu bienestar mental y emocional. Incluyen preguntas sobre relaciones de pareja, crecimiento personal y personalidad, ayudándote a identificar áreas de mejora y el tipo de apoyo más adecuado."
    },
    {
      question: "¿Qué tipos de apoyo ofrecen para parejas?",
      answer: "Ofrecemos servicios especializados para parejas enfocados en mejorar la comunicación, resolver conflictos, fortalecer la intimidad emocional, trabajar problemas de confianza y desarrollar habilidades de resolución de problemas en conjunto."
    },
    {
      question: "¿Cuánto cuestan los servicios de salud mental en Love on the Brain?",
      answer: "Nos especializamos en ofrecer servicios de salud mental con presupuestos amigables. Tenemos diferentes packs adaptados a distintas necesidades económicas, desde apoyo individual hasta servicios para parejas, con opciones flexibles de pago."
    },
    {
      question: "¿Es confidencial el apoyo emocional que ofrecen?",
      answer: "Sí, mantenemos estrictos protocolos de confidencialidad. Todas las sesiones y comunicaciones están protegidas bajo el secreto profesional. Utilizamos plataformas seguras y cumplimos con todas las normativas de privacidad de datos personales."
    },
    {
      question: "¿Qué diferencia a Love on the Brain de otros servicios de bienestar?",
      answer: "Nuestro enfoque único combina profesionalismo con calidez humana. Trabajamos sin juicios, con presupuestos accesibles, métodos basados en evidencia científica y un equipo de profesionales certificados que realmente se preocupan por tu crecimiento personal."
    },
    {
      question: "¿Cómo puedo saber qué tipo de apoyo necesito?",
      answer: "Ofrecemos cuestionarios especializados que te ayudan a identificar tus necesidades específicas de bienestar. También puedes contactarnos directamente para una consulta inicial donde evaluaremos tu situación y recomendaremos el mejor plan de apoyo."
    },
    {
      question: "¿Cuánto tiempo dura un proceso de crecimiento personal?",
      answer: "La duración varía según cada persona y sus objetivos. Puede ir desde algunas sesiones para situaciones específicas hasta procesos más largos para desarrollo personal profundo. Siempre trabajamos a tu ritmo y según tus necesidades."
    },
    {
      question: "¿Ofrecen apoyo para problemas de ansiedad y bienestar emocional?",
      answer: "Sí, nuestros profesionales están especializados en apoyar diversos desafíos de salud mental incluyendo ansiedad, estrés, problemas de autoestima y otros retos emocionales utilizando técnicas de bienestar comprobadas científicamente."
    }
  ];

  return (
    <section 
      className="sr-only" 
      aria-hidden="true"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Preguntas Frecuentes sobre Salud Mental y Crecimiento Personal
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              itemScope 
              itemType="https://schema.org/Question"
              className="border-b border-gray-200 pb-6"
            >
              <h3 
                itemProp="name"
                className="text-xl font-semibold text-gray-900 mb-3"
              >
                {faq.question}
              </h3>
              <div 
                itemScope 
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
              >
                <p 
                  itemProp="text"
                  className="text-gray-600 leading-relaxed"
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}