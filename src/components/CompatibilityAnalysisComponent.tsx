import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Heart, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Camera, 
  Brain,
  Star,
  TrendingUp,
  Info
} from 'lucide-react';
import { 
  CompatibilityAnalysisService, 
  CompatibilityResult, 
  CompatibilityAnswer 
} from '../services/compatibilityAnalysis';

interface CompatibilityAnalysisProps {
  person1: {
    name: string;
    answers: any[];
    personalInfo: any;
  };
  person2: {
    name: string;
    answers: any[];
    personalInfo: any;
  };
  onClose: () => void;
}

export const CompatibilityAnalysisComponent: React.FC<CompatibilityAnalysisProps> = ({
  person1,
  person2,
  onClose
}) => {
  const [analysisResult, setAnalysisResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performCompatibilityAnalysis();
  }, [person1, person2]);

  const performCompatibilityAnalysis = () => {
    setLoading(true);
    
    try {
      // Convertir respuestas al formato esperado
      const person1Answers: CompatibilityAnswer[] = person1.answers.map((answer, index) => ({
        questionId: index + 1,
        answer: typeof answer === 'string' ? answer : answer.answer || '',
        score: 3, // Puntuación por defecto
        category: 'General'
      }));

      const person2Answers: CompatibilityAnswer[] = person2.answers.map((answer, index) => ({
        questionId: index + 1,
        answer: typeof answer === 'string' ? answer : answer.answer || '',
        score: 3, // Puntuación por defecto
        category: 'General'
      }));

      const result = CompatibilityAnalysisService.analyzeCompatibility(
        person1Answers,
        person2Answers
      );
      
      setAnalysisResult(result);
          } catch (error) {
        // console.error('Error en análisis de compatibilidad:', error);
      } finally {
      setLoading(false);
    }
  };

  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 70) return "text-blue-600 bg-blue-50";
    if (percentage >= 50) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getCompatibilityBadgeColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 70) return "bg-blue-500";
    if (percentage >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mr-4"></div>
            <div className="text-lg">Analizando compatibilidad...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysisResult) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Error al analizar la compatibilidad. Por favor, inténtalo de nuevo.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header con información de las personas */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Heart className="h-8 w-8 text-pink-500" />
              <div>
                <CardTitle className="text-2xl">Análisis de Compatibilidad</CardTitle>
                <p className="text-gray-600">
                  {person1.name} ({person1.personalInfo?.edad || 'N/A'}) ❤️ {person2.name} ({person2.personalInfo?.edad || 'N/A'})
                </p>
              </div>
            </div>
            <Button onClick={onClose} variant="outline">
              Cerrar Análisis
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Alertas importantes */}
      {analysisResult.shouldStopAnalysis && (
        <Alert className="border-red-500 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">
            <strong>⚠️ ANÁLISIS DETENIDO:</strong> Se han detectado indicadores que requieren atención profesional inmediata.
          </AlertDescription>
        </Alert>
      )}

      {analysisResult.recommendTherapy && (
        <Alert className="border-yellow-500 bg-yellow-50">
          <Brain className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            <strong>💡 RECOMENDACIÓN:</strong> Se sugiere buscar ayuda de un terapeuta de parejas.
          </AlertDescription>
        </Alert>
      )}

      {/* Resultado principal */}
      <Card className="border-2 border-pink-200">
        <CardHeader className={`text-center ${getCompatibilityColor(analysisResult.compatibilityPercentage)}`}>
          <div className="flex items-center justify-center gap-4">
            <Star className="h-12 w-12" />
            <div>
              <CardTitle className="text-3xl font-bold">
                {analysisResult.compatibilityPercentage}%
              </CardTitle>
              <p className="text-lg">{analysisResult.compatibilityLevel}</p>
            </div>
          </div>
          
          <div className="mt-4 max-w-md mx-auto">
            <Progress 
              value={analysisResult.compatibilityPercentage} 
              className={`h-4 ${getCompatibilityBadgeColor(analysisResult.compatibilityPercentage)}`}
            />
          </div>
          
          <div className="mt-4 flex justify-center gap-4">
            <Badge variant={analysisResult.canShowPhotos ? "default" : "destructive"} className="text-sm py-2 px-4">
              <Camera className="h-4 w-4 mr-2" />
              {analysisResult.canShowPhotos ? "✅ Puede ver fotos" : "❌ No puede ver fotos"}
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4">
              <TrendingUp className="h-4 w-4 mr-2" />
              {analysisResult.totalScore}/{analysisResult.maxScore} puntos
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Recomendaciones */}
      {analysisResult.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysisResult.recommendations.map((recommendation, index) => (
                <Alert key={index}>
                  <AlertDescription>{recommendation}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Análisis detallado por categorías */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Análisis Detallado por Categorías
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {analysisResult.detailedAnalysis.map((analysis, index) => (
              <AccordionItem key={index} value={`category-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="flex items-center gap-3">
                      {analysis.compatible ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <span className="font-medium">{analysis.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={analysis.compatible ? "default" : "destructive"}
                        className="mr-2"
                      >
                        {analysis.score}/{analysis.maxScore}
                      </Badge>
                      <div className="w-24">
                        <Progress 
                          value={(analysis.score / analysis.maxScore) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4">
                    <div className={`p-4 rounded-lg ${analysis.compatible ? 'bg-green-50' : 'bg-red-50'}`}>
                      <p className={`text-sm ${analysis.compatible ? 'text-green-700' : 'text-red-700'}`}>
                        <strong>Análisis:</strong> {analysis.analysis}
                      </p>
                      {analysis.score === 2 && (
                        <p className="text-red-600 font-semibold mt-2">
                          ⚠️ Esta categoría indica incompatibilidad total
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Comparación de respuestas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-500" />
            Comparación de Respuestas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="responses">
              <AccordionTrigger>
                Ver respuestas individuales ({Math.min(person1.answers.length, person2.answers.length)} preguntas comparadas)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {person1.answers.slice(0, Math.min(person1.answers.length, person2.answers.length)).map((answer1, index) => {
                    const answer2 = person2.answers[index];
                    const questions = CompatibilityAnalysisService.getQuestions();
                    const question = questions[index] || { question: `Pregunta ${index + 1}` };
                    
                    return (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-semibold mb-3 text-gray-800">
                          {index + 1}. {question.question}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                            <strong className="text-blue-700">{person1.name}:</strong>
                            <p className="text-gray-700 mt-1">
                              {typeof answer1 === 'string' ? answer1 : answer1?.answer || 'Sin respuesta'}
                            </p>
                          </div>
                          <div className="bg-pink-50 p-3 rounded border-l-4 border-pink-400">
                            <strong className="text-pink-700">{person2.name}:</strong>
                            <p className="text-gray-700 mt-1">
                              {typeof answer2 === 'string' ? answer2 : answer2?.answer || 'Sin respuesta'}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal Comparada</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">{person1.name}</h4>
              <p><strong>Edad:</strong> {person1.personalInfo?.edad || 'N/A'}</p>
              <p><strong>Género:</strong> {person1.personalInfo?.genero || 'N/A'}</p>
              <p><strong>Email:</strong> {person1.personalInfo?.correo || 'N/A'}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-pink-600">{person2.name}</h4>
              <p><strong>Edad:</strong> {person2.personalInfo?.edad || 'N/A'}</p>
              <p><strong>Género:</strong> {person2.personalInfo?.genero || 'N/A'}</p>
              <p><strong>Email:</strong> {person2.personalInfo?.correo || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
