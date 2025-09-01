import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BookOpen, Video, Download, Users, Clock, Star } from 'lucide-react';

const resources = [
  {
    type: 'Artículo',
    icon: BookOpen,
    title: 'Técnicas de Respiración para la Ansiedad',
    description: 'Aprende ejercicios simples de respiración que puedes usar en cualquier momento para reducir la ansiedad.',
    readTime: '5 min',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzU1MTY2NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    type: 'Video',
    icon: Video,
    title: 'Meditación Guiada para Principiantes',
    description: 'Una sesión de meditación de 10 minutos perfecta para comenzar tu práctica de mindfulness.',
    readTime: '10 min',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1645652367526-a0ecb717650a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwd2VsbG5lc3N8ZW58MXx8fHwxNzU1MTY2NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    type: 'Guía PDF',
    icon: Download,
    title: 'Manual de Autocuidado Diario',
    description: 'Una guía completa con actividades y ejercicios para incorporar el autocuidado en tu rutina diaria.',
    readTime: '15 min',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522973717924-b10fe4e185cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwb3J0JTIwZ3JvdXAlMjB0aGVyYXB5fGVufDF8fHx8MTc1NTE2NjUwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const tools = [
  {
    name: 'Diario de Emociones',
    description: 'Registra y analiza tus emociones diarias para identificar patrones.',
    icon: '📝'
  },
  {
    name: 'Test de Ansiedad',
    description: 'Evaluación rápida para medir tu nivel actual de ansiedad.',
    icon: '📊'
  },
  {
    name: 'Ejercicios de Relajación',
    description: 'Técnicas guiadas para reducir el estrés y la tensión.',
    icon: '🧘'
  },
  {
    name: 'Recordatorios de Bienestar',
    description: 'Notificaciones personalizadas para mantener hábitos saludables.',
    icon: '⏰'
  }
];

export default function ResourcesSection() {
  return (
    <section id="recursos" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Recursos y Herramientas
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Accede a una biblioteca completa de recursos gratuitos y herramientas 
            interactivas diseñadas para apoyar tu bienestar mental.
          </p>
        </div>

        {/* Featured Resources */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl text-gray-900 mb-8 text-center">
            Recursos Destacados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                      {resource.type}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.readTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{resource.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                      Acceder al recurso
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Interactive Tools */}
        <div>
          <h3 className="text-2xl sm:text-3xl text-gray-900 mb-8 text-center">
            Herramientas Interactivas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                <CardHeader>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 w-full">
                    Usar herramienta
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 bg-blue-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl sm:text-3xl mb-4">
            Mantente actualizado
          </h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Recibe los últimos recursos, consejos y herramientas de salud mental 
            directamente en tu correo electrónico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-blue-300"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3">
              Suscribirse
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}