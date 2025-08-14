import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María González',
    role: 'Profesora',
    location: 'Madrid, España',
    rating: 5,
    text: 'El apoyo que recibí fue excepcional. Los profesionales me ayudaron a superar mi ansiedad y ahora me siento mucho más segura en mi día a día. Recomiendo totalmente sus servicios.',
    initial: 'M'
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Ingeniero',
    location: 'Barcelona, España',
    rating: 5,
    text: 'La terapia online fue perfecta para mi horario. Pude acceder a ayuda profesional sin tener que desplazarme, y la calidad del servicio fue excelente.',
    initial: 'C'
  },
  {
    name: 'Ana Martín',
    role: 'Estudiante',
    location: 'Valencia, España',
    rating: 5,
    text: 'Los recursos gratuitos me ayudaron mucho antes de decidirme por la terapia. El equipo es muy comprensivo y profesional. Ha sido una experiencia transformadora.',
    initial: 'A'
  },
  {
    name: 'David López',
    role: 'Empresario',
    location: 'Sevilla, España',
    rating: 5,
    text: 'Después de años lidiando con el estrés laboral, finalmente encontré el apoyo que necesitaba. Las técnicas que aprendí me han cambiado la vida.',
    initial: 'D'
  },
  {
    name: 'Laura Sánchez',
    role: 'Médica',
    location: 'Bilbao, España',
    rating: 5,
    text: 'Como profesional de la salud, puedo decir que la calidad de la atención aquí es excepcional. Me ayudaron durante un período muy difícil de mi carrera.',
    initial: 'L'
  },
  {
    name: 'Miguel Torres',
    role: 'Artista',
    location: 'Granada, España',
    rating: 5,
    text: 'La terapia grupal me ayudó a conectar con otras personas que entendían lo que estaba pasando. Fue un espacio seguro para sanar y crecer.',
    initial: 'M'
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Las historias de transformación y bienestar de quienes han confiado 
            en nosotros para su salud mental nos motivan cada día.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Pacientes atendidos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-blue-600 mb-2">4.9</div>
            <div className="text-gray-600">Calificación promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-blue-600 mb-2">95%</div>
            <div className="text-gray-600">Satisfacción del cliente</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Apoyo disponible</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-blue-100 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-blue-600 opacity-50" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-4">
                    <span className="text-lg">{testimonial.initial}</span>
                  </div>
                  <div>
                    <div className="text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-blue-50 p-8 rounded-2xl">
          <h3 className="text-2xl sm:text-3xl text-gray-900 mb-4">
            ¿Listo para comenzar tu viaje hacia el bienestar?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Únete a cientos de personas que ya han transformado su vida. 
            Da el primer paso hacia una mejor salud mental hoy mismo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors">
              Agenda tu consulta
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg transition-colors">
              Habla con un especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}