import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, Users, Heart, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getQuestions } from '../config/questionnaireQuestions';

interface PersonalInfo {
  nombre: string;
  apellidos: string;
  edad: string;
  genero: string;
  correo: string;
  orientacionSexual: string;
}

interface Questionnaire {
  id: number;
  type: string;
  personalInfo: PersonalInfo;
  answers: Record<string, string>;
  completed: boolean;
  completedAt: string;
  createdAt: string;
}

interface ResponseComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  person1: Questionnaire;
  person2: Questionnaire;
  compatibilityPercentage?: number;
}

const ResponseComparisonModal: React.FC<ResponseComparisonModalProps> = ({
  isOpen,
  onClose,
  person1,
  person2,
  compatibilityPercentage = 0
}) => {
  const questions = getQuestions('pareja');
  
  const getCompatibilityIcon = (answer1: string, answer2: string) => {
    if (answer1 === answer2) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    
    // Lógica para determinar compatibilidad basada en respuestas específicas
    const compatibleAnswers = {
      '0': { // ¿Qué buscas principalmente en una relación?
        'AMOR': ['AMOR', 'COMPAÑÍA'],
        'COMPAÑÍA': ['COMPAÑÍA', 'AMOR'],
        'AMISTAD': ['AMISTAD', 'COMPAÑÍA']
      },
      '1': { // ¿Cómo prefieres pasar tiempo con tu pareja?
        'ACTIVIDADES': ['ACTIVIDADES', 'AMBAS'],
        'CONVERSACIONES': ['CONVERSACIONES', 'AMBAS'],
        'AMBAS': ['AMBAS', 'ACTIVIDADES', 'CONVERSACIONES']
      },
      '2': { // ¿Qué valoras más en una persona?
        'INTELIGENCIA': ['INTELIGENCIA', 'EQUILIBRIO'],
        'SENTIMENTAL': ['SENTIMENTAL', 'EQUILIBRIO'],
        'EQUILIBRIO': ['EQUILIBRIO', 'INTELIGENCIA', 'SENTIMENTAL']
      },
      '3': { // ¿Cómo manejas los conflictos en una relación?
        'DIÁLOGO': ['DIÁLOGO', 'DEPENDE'],
        'ESPACIO': ['ESPACIO', 'DEPENDE'],
        'DEPENDE': ['DEPENDE', 'DIÁLOGO', 'ESPACIO']
      },
      '5': { // ¿Qué tan importante es la comunicación?
        'MUY IMPORTANTE': ['MUY IMPORTANTE', 'IMPORTANTE'],
        'IMPORTANTE': ['IMPORTANTE', 'MUY IMPORTANTE'],
        'POCO IMPORTANTE': ['POCO IMPORTANTE']
      },
      '7': { // ¿Qué tan importante es la confianza?
        'FUNDAMENTAL': ['FUNDAMENTAL', 'IMPORTANTE'],
        'IMPORTANTE': ['IMPORTANTE', 'FUNDAMENTAL'],
        'NO ES PRIORITARIO': ['NO ES PRIORITARIO']
      },
      '9': { // ¿Qué tan importante es la compatibilidad sexual?
        'MUY IMPORTANTE': ['MUY IMPORTANTE', 'IMPORTANTE'],
        'IMPORTANTE': ['IMPORTANTE', 'MUY IMPORTANTE'],
        'POCO IMPORTANTE': ['POCO IMPORTANTE']
      },
      '11': { // ¿Qué tan importante es compartir valores?
        'FUNDAMENTAL': ['FUNDAMENTAL', 'IMPORTANTE'],
        'IMPORTANTE': ['IMPORTANTE', 'FUNDAMENTAL'],
        'NO ES PRIORITARIO': ['NO ES PRIORITARIO']
      }
    };

    const compatibleForQuestion = compatibleAnswers[question1.id.toString() as keyof typeof compatibleAnswers];
    if (compatibleForQuestion && compatibleForQuestion[answer1 as keyof typeof compatibleForQuestion]?.includes(answer2)) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    }
    
    return <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getCompatibilityColor = (answer1: string, answer2: string) => {
    if (answer1 === answer2) {
      return "bg-green-50 border-green-200";
    }
    
    // Lógica similar para colores
    const compatibleAnswers = {
      '0': { 'AMOR': ['AMOR', 'COMPAÑÍA'], 'COMPAÑÍA': ['COMPAÑÍA', 'AMOR'], 'AMISTAD': ['AMISTAD', 'COMPAÑÍA'] },
      '1': { 'ACTIVIDADES': ['ACTIVIDADES', 'AMBAS'], 'CONVERSACIONES': ['CONVERSACIONES', 'AMBAS'], 'AMBAS': ['AMBAS', 'ACTIVIDADES', 'CONVERSACIONES'] },
      '2': { 'INTELIGENCIA': ['INTELIGENCIA', 'EQUILIBRIO'], 'SENTIMENTAL': ['SENTIMENTAL', 'EQUILIBRIO'], 'EQUILIBRIO': ['EQUILIBRIO', 'INTELIGENCIA', 'SENTIMENTAL'] },
      '3': { 'DIÁLOGO': ['DIÁLOGO', 'DEPENDE'], 'ESPACIO': ['ESPACIO', 'DEPENDE'], 'DEPENDE': ['DEPENDE', 'DIÁLOGO', 'ESPACIO'] },
      '5': { 'MUY IMPORTANTE': ['MUY IMPORTANTE', 'IMPORTANTE'], 'IMPORTANTE': ['IMPORTANTE', 'MUY IMPORTANTE'], 'POCO IMPORTANTE': ['POCO IMPORTANTE'] },
      '7': { 'FUNDAMENTAL': ['FUNDAMENTAL', 'IMPORTANTE'], 'IMPORTANTE': ['IMPORTANTE', 'FUNDAMENTAL'], 'NO ES PRIORITARIO': ['NO ES PRIORITARIO'] },
      '9': { 'MUY IMPORTANTE': ['MUY IMPORTANTE', 'IMPORTANTE'], 'IMPORTANTE': ['IMPORTANTE', 'MUY IMPORTANTE'], 'POCO IMPORTANTE': ['POCO IMPORTANTE'] },
      '11': { 'FUNDAMENTAL': ['FUNDAMENTAL', 'IMPORTANTE'], 'IMPORTANTE': ['IMPORTANTE', 'FUNDAMENTAL'], 'NO ES PRIORITARIO': ['NO ES PRIORITARIO'] }
    };

    const compatibleForQuestion = compatibleAnswers[question1.id.toString() as keyof typeof compatibleAnswers];
    if (compatibleForQuestion && compatibleForQuestion[answer1 as keyof typeof compatibleAnswers]?.includes(answer2)) {
      return "bg-green-50 border-green-200";
    }
    
    return "bg-red-50 border-red-200";
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-500" />
            Comparación de Respuestas
            {compatibilityPercentage > 0 && (
              <Badge variant="outline" className="ml-2">
                {compatibilityPercentage}% Compatibilidad
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Información de las personas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {(person1.personalInfo?.nombre || 'U').charAt(0)}{(person1.personalInfo?.apellidos || 'D').charAt(0)}
                </div>
                {person1.personalInfo?.nombre || 'Usuario'} {person1.personalInfo?.apellidos || 'Desconocido'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-sm">
                <div><strong>Edad:</strong> {person1.personalInfo?.edad || 'N/A'} años</div>
                <div><strong>Género:</strong> {person1.personalInfo?.genero || 'N/A'}</div>
                <div><strong>Orientación:</strong> {person1.personalInfo?.orientacionSexual || 'N/A'}</div>
                <div><strong>Email:</strong> {person1.personalInfo?.correo || 'N/A'}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {(person2.personalInfo?.nombre || 'U').charAt(0)}{(person2.personalInfo?.apellidos || 'D').charAt(0)}
                </div>
                {person2.personalInfo?.nombre || 'Usuario'} {person2.personalInfo?.apellidos || 'Desconocido'}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 text-sm">
                <div><strong>Edad:</strong> {person2.personalInfo?.edad || 'N/A'} años</div>
                <div><strong>Género:</strong> {person2.personalInfo?.genero || 'N/A'}</div>
                <div><strong>Orientación:</strong> {person2.personalInfo?.orientacionSexual || 'N/A'}</div>
                <div><strong>Email:</strong> {person2.personalInfo?.correo || 'N/A'}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparación de respuestas */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            Comparación Detallada de Respuestas
          </h3>
          
          {questions.map((question, index) => {
            const answer1 = person1.answers[index.toString()] || 'Sin respuesta';
            const answer2 = person2.answers[index.toString()] || 'Sin respuesta';
            const isCompatible = answer1 === answer2;
            
            return (
              <Card key={question.id} className={`${getCompatibilityColor(answer1, answer2)} border-2`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                      {question.id + 1}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 mb-3">
                        {question.text}
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {(person1.personalInfo?.nombre || 'U').charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {person1.personalInfo?.nombre || 'Usuario'}
                            </span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border">
                            <Badge variant="outline" className="text-sm">
                              {answer1}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                              {(person2.personalInfo?.nombre || 'U').charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {person2.personalInfo?.nombre || 'Usuario'}
                            </span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border">
                            <Badge variant="outline" className="text-sm">
                              {answer2}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center gap-2">
                        {getCompatibilityIcon(answer1, answer2)}
                        <span className="text-sm text-gray-600">
                          {isCompatible ? 'Respuestas idénticas' : 'Respuestas diferentes'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Botón de cerrar */}
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            <X className="h-4 w-4 mr-2" />
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResponseComparisonModal;
