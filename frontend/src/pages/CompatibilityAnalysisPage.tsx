import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { buildApiUrl } from '../config/api';
import { 
  Heart, 
  Users, 
  ArrowLeft, 
  Star,
  TrendingUp,
  Search,
  Filter,
  Camera,
  AlertTriangle,
  Crown,
  GitCompare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CompatibilityAnalysisService, CompatibilityResult } from '../services/compatibilityAnalysis';
import ResponseComparisonModal from '../components/ResponseComparisonModal';
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

interface CompatibilityMatch {
  person: Questionnaire;
  compatibility: CompatibilityResult;
  matchRank: number;
}

const CompatibilityAnalysisPage: React.FC = () => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Questionnaire | null>(null);
  const [compatibilityMatches, setCompatibilityMatches] = useState<CompatibilityMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyPhotosAllowed, setShowOnlyPhotosAllowed] = useState(false);
  const [minCompatibility, setMinCompatibility] = useState(0);
  const [comparisonModal, setComparisonModal] = useState<{
    isOpen: boolean;
    person1: Questionnaire | null;
    compatibilityPercentage: number;
  }>({
    isOpen: false,
    person1: null,
    compatibilityPercentage: 0
  });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = async () => {
    setLoading(true);
    // console.log('🔄 Cargando cuestionarios...');
    
    try {
      // Verificar si hay token de admin
      const adminToken = localStorage.getItem('adminToken');
      // console.log('🔑 Token admin:', adminToken ? 'Presente' : 'Ausente');
      
      if (!adminToken) {
        // console.error('❌ No hay token de administrador');
        setQuestionnaires([]);
        setLoading(false);
        return;
      }

      // Intentar cargar desde la API (misma URL que AdminDashboard)
      // console.log('🌐 Haciendo llamada a API...');
      const response = await fetch(buildApiUrl('/api/admin/questionnaires'), {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      // console.log('📡 Respuesta API:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        // console.log('📊 Datos recibidos:', data);
        const parejaQuestionnaires = data.pareja?.questionnaires || [];
        // console.log('💕 Cuestionarios de pareja:', parejaQuestionnaires.length);
        setQuestionnaires(parejaQuestionnaires);
      } else {
        // Si la API falla, mostrar mensaje de error
        console.error('❌ API response not ok:', response.status);
        setQuestionnaires([]);
      }
    } catch (error) {
      // console.error('💥 Error loading questionnaires:', error);
      setQuestionnaires([]);
    } finally {
      setLoading(false);
      // console.log('✅ Carga completada. Cuestionarios:', questionnaires.length);
    }
  };

  const analyzeCompatibilityWithAll = async (selectedPerson: Questionnaire) => {
    setAnalyzing(true);
    setSelectedPerson(selectedPerson);
    
    const matches: CompatibilityMatch[] = [];
    const otherPeople = questionnaires.filter(q => q.id !== selectedPerson.id);

    for (const person of otherPeople) {
      try {
        // Convertir respuestas al formato esperado
        const selectedAnswers = Object.values(selectedPerson.answers).map((answer, index) => ({
          questionId: index + 1,
          answer: typeof answer === 'string' ? answer : (answer as any).answer || '',
          score: 3,
          category: 'General'
        }));

        const personAnswers = Object.values(person.answers).map((answer, index) => ({
          questionId: index + 1,
          answer: typeof answer === 'string' ? answer : (answer as any).answer || '',
          score: 3,
          category: 'General'
        }));

        const compatibility = CompatibilityAnalysisService.analyzeCompatibility(
          selectedAnswers,
          personAnswers
        );

        matches.push({
          person,
          compatibility,
          matchRank: 0 // Se calculará después del ordenamiento
        });
      } catch (error) {
        // console.error(`Error analyzing compatibility with ${person.personalInfo.nombre}:`, error);
      }
    }

    // Ordenar por puntuación de compatibilidad (mayor a menor)
    matches.sort((a, b) => b.compatibility.totalScore - a.compatibility.totalScore);
    
    // Asignar ranking
    matches.forEach((match, index) => {
      match.matchRank = index + 1;
    });

    setCompatibilityMatches(matches);
    setAnalyzing(false);
  };

  const getFilteredMatches = () => {
    return compatibilityMatches.filter(match => {
      const matchesSearch = searchTerm === '' || 
        `${match.person.personalInfo.nombre} ${match.person.personalInfo.apellidos}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesPhotos = !showOnlyPhotosAllowed || match.compatibility.canShowPhotos;
      
      const matchesMinCompatibility = match.compatibility.compatibilityPercentage >= minCompatibility;

      return matchesSearch && matchesPhotos && matchesMinCompatibility;
    });
  };

  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 70) return "text-purple-600 bg-purple-50 border-purple-200";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Star className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Star className="h-5 w-5 text-orange-400" />;
    return <span className="text-gray-500 font-bold">#{rank}</span>;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const toggleCardExpansion = (personId: number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(personId)) {
        newSet.delete(personId);
      } else {
        newSet.add(personId);
      }
      return newSet;
    });
  };

  const isCardExpanded = (personId: number) => {
    return expandedCards.has(personId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => window.location.hash = '#/admin-dashboard'}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Heart className="h-8 w-8 text-pink-500" />
                Análisis de Compatibilidad Masivo
              </h1>
              <p className="text-gray-600">Selecciona una persona y encuentra sus mejores matches</p>
            </div>
          </div>
        </div>

        {/* Selección de persona principal */}
        {!selectedPerson ? (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  Selecciona la Persona Principal
                </CardTitle>
                <Button 
                  onClick={loadQuestionnaires}
                  variant="outline"
                  size="sm"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
                  ) : (
                    <div className="w-4 h-4 mr-2">🔄</div>
                  )}
                  Recargar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Cargando cuestionarios...
                  </h3>
                  <p className="text-gray-500">
                    Conectando con la base de datos...
                  </p>
                </div>
              ) : questionnaires.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No hay cuestionarios disponibles
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Para usar el análisis de compatibilidad, necesitas tener cuestionarios de pareja completados.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Ve al Panel de Administración</p>
                    <p>• Verifica que haya cuestionarios de pareja completados</p>
                    <p>• Asegúrate de estar logueado como administrador</p>
                  </div>
                  <Button 
                    onClick={() => window.location.hash = '#/admin-dashboard'}
                    variant="outline"
                    className="mt-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Ir al Panel de Administración
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {questionnaires.map(questionnaire => (
                    <Card 
                      key={questionnaire.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-pink-300"
                      onClick={() => analyzeCompatibilityWithAll(questionnaire)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {(questionnaire.personalInfo?.nombre || 'U').charAt(0)}{(questionnaire.personalInfo?.apellidos || 'D').charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                              {questionnaire.personalInfo?.nombre || 'Usuario'} {questionnaire.personalInfo?.apellidos || 'Desconocido'}
                            </h3>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {questionnaire.personalInfo?.edad || 'N/A'} años
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {questionnaire.personalInfo?.genero || 'N/A'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Persona seleccionada y filtros */}
            <Card className="mb-8 bg-gradient-to-r from-pink-100 to-purple-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {(selectedPerson.personalInfo?.nombre || 'U').charAt(0)}{(selectedPerson.personalInfo?.apellidos || 'D').charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedPerson.personalInfo?.nombre || 'Usuario'} {selectedPerson.personalInfo?.apellidos || 'Desconocido'}
                      </CardTitle>
                      <div className="flex gap-3 mt-2">
                        <Badge variant="secondary">
                          {selectedPerson.personalInfo?.edad || 'N/A'} años
                        </Badge>
                        <Badge variant="outline">
                          {selectedPerson.personalInfo?.genero || 'N/A'}
                        </Badge>
                        <Badge variant="outline">
                          {selectedPerson.personalInfo?.orientacionSexual || 'N/A'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedPerson(null);
                      setCompatibilityMatches([]);
                    }}
                    variant="outline"
                  >
                    Cambiar Persona
                  </Button>
                </div>
              </CardHeader>
            </Card>

            {analyzing ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold mb-2">Analizando Compatibilidad...</h3>
                  <p className="text-gray-600">
                    Comparando con {questionnaires.length - 1} personas. Esto puede tomar unos segundos.
                  </p>
                </CardContent>
              </Card>
            ) : compatibilityMatches.length > 0 && (
              <>
                {/* Filtros de resultados */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-gray-600" />
                      Filtrar Resultados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          🔍 Buscar
                        </label>
                        <input
                          type="text"
                          placeholder="Nombre..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          📊 Compatibilidad Mínima
                        </label>
                        <select
                          value={minCompatibility}
                          onChange={(e) => setMinCompatibility(parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value={0}>Todas (0%+)</option>
                          <option value={50}>Media (50%+)</option>
                          <option value={60}>Buena (60%+)</option>
                          <option value={70}>Muy Buena (70%+)</option>
                          <option value={80}>Excelente (80%+)</option>
                          <option value={90}>Perfecta (90%+)</option>
                        </select>
                      </div>

                      <div className="flex items-end">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={showOnlyPhotosAllowed}
                            onChange={(e) => setShowOnlyPhotosAllowed(e.target.checked)}
                            className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            📸 Solo pueden ver fotos (60%+)
                          </span>
                        </label>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600">
                          <strong>{getFilteredMatches().length}</strong> de {compatibilityMatches.length} matches
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {compatibilityMatches.filter(m => m.compatibility.compatibilityPercentage >= 80).length}
                      </div>
                      <div className="text-sm text-gray-600">Matches Excelentes (80%+)</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {compatibilityMatches.filter(m => m.compatibility.canShowPhotos).length}
                      </div>
                      <div className="text-sm text-gray-600">Pueden Ver Fotos (60%+)</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {compatibilityMatches.length > 0 ? Math.round(compatibilityMatches[0].compatibility.compatibilityPercentage) : 0}%
                      </div>
                      <div className="text-sm text-gray-600">Mejor Match</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {Math.round(compatibilityMatches.reduce((sum, m) => sum + m.compatibility.compatibilityPercentage, 0) / compatibilityMatches.length) || 0}%
                      </div>
                      <div className="text-sm text-gray-600">Promedio General</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de matches */}
                <div className="space-y-4">
                  {getFilteredMatches().map((match, index) => (
                    <Card 
                      key={match.person.id} 
                      className={`transition-all hover:shadow-lg ${getCompatibilityColor(match.compatibility.compatibilityPercentage)} border-2`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              {getRankIcon(match.matchRank)}
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {(match.person.personalInfo?.nombre || 'U').charAt(0)}{(match.person.personalInfo?.apellidos || 'D').charAt(0)}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                {match.person.personalInfo?.nombre || 'Usuario'} {match.person.personalInfo?.apellidos || 'Desconocido'}
                              </h3>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {match.person.personalInfo?.edad || 'N/A'} años
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {match.person.personalInfo?.genero || 'N/A'}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {match.person.personalInfo?.orientacionSexual || 'N/A'}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-4">
                              <div>
                                <div className="text-2xl font-bold">
                                  {match.compatibility.compatibilityPercentage}%
                                </div>
                                <div className="text-sm text-gray-600">
                                  {match.compatibility.compatibilityLevel.split(' - ')[1] || match.compatibility.compatibilityLevel}
                                </div>
                              </div>
                              <div className="w-24">
                                <Progress 
                                  value={match.compatibility.compatibilityPercentage} 
                                  className="h-3"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <Badge 
                                  variant={match.compatibility.canShowPhotos ? "default" : "destructive"}
                                  className="text-xs"
                                >
                                  {match.compatibility.canShowPhotos ? (
                                    <>
                                      <Camera className="h-3 w-3 mr-1" />
                                      Puede ver fotos
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      No puede ver fotos
                                    </>
                                  )}
                                </Badge>
                                {match.compatibility.shouldStopAnalysis && (
                                  <Badge variant="destructive" className="text-xs">
                                    ⚠️ Requiere atención
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detalles adicionales */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <strong>Email:</strong> {match.person.personalInfo?.correo || 'N/A'}
                            </div>
                            <div>
                              <strong>Puntuación:</strong> {match.compatibility.totalScore}/{match.compatibility.maxScore} puntos
                            </div>
                            <div>
                              <strong>Completado:</strong> {formatDate(match.person.completedAt)}
                            </div>
                          </div>
                          
                          {match.compatibility.recommendations.length > 0 && (
                            <div className="mt-3">
                              <strong className="text-sm">Recomendaciones:</strong>
                              <ul className="text-sm text-gray-600 mt-1">
                                {match.compatibility.recommendations.slice(0, 2).map((rec, idx) => (
                                  <li key={idx} className="truncate">• {rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Botón para expandir/contraer respuestas */}
                          <div className="mt-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleCardExpansion(match.person.id)}
                              className="w-full flex items-center justify-between"
                            >
                              <span>📋 Ver Respuestas del Cuestionario</span>
                              {isCardExpanded(match.person.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            
                            {/* Dropdown expandible con respuestas */}
                            {isCardExpanded(match.person.id) && (
                              <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                                  <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                    {(match.person.personalInfo?.nombre || 'U').charAt(0)}
                                  </div>
                                  Respuestas de {match.person.personalInfo?.nombre || 'Usuario'}
                                </h4>
                                
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                  {getQuestions('pareja').map((question, index) => {
                                    const answer = match.person.answers[index.toString()] || 'Sin respuesta';
                                    return (
                                      <div key={question.id} className="flex gap-3 p-2 bg-white rounded border">
                                        <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                          {question.id + 1}
                                        </div>
                                        <div className="flex-1">
                                          <div className="text-sm font-medium text-gray-700 mb-1">
                                            {question.text}
                                          </div>
                                          <Badge variant="outline" className="text-xs">
                                            {answer}
                                          </Badge>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                <div className="mt-3 pt-3 border-t">
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => {
                                      setComparisonModal({
                                        isOpen: true,
                                        person1: selectedPerson,
                                        compatibilityPercentage: match.compatibility.compatibilityPercentage
                                      });
                                    }}
                                    className="w-full"
                                  >
                                    <GitCompare className="h-4 w-4 mr-2" />
                                    Comparar con {selectedPerson?.personalInfo?.nombre || 'Usuario'}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Modal de comparación de respuestas */}
      <ResponseComparisonModal
        isOpen={comparisonModal.isOpen}
        onClose={() => setComparisonModal(prev => ({ ...prev, isOpen: false }))}
        person1={comparisonModal.person1!}
        allPersons={questionnaires}
        compatibilityPercentage={comparisonModal.compatibilityPercentage}
      />
    </div>
  );
};

export default CompatibilityAnalysisPage;
