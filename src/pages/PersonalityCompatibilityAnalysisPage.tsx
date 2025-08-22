import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Brain, ArrowLeft, Crown, Star, TrendingUp, Users, Search, Filter, Camera, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Progress } from '../../components/ui/progress';
import { PersonalityCompatibilityAnalysis, PersonalityCompatibilityResult } from '../services/personalityCompatibilityAnalysis';

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
  compatibility: PersonalityCompatibilityResult;
  matchRank: number;
}

const PersonalityCompatibilityAnalysisPage: React.FC = () => {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Questionnaire | null>(null);
  const [compatibilityMatches, setCompatibilityMatches] = useState<CompatibilityMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyCompatible, setShowOnlyCompatible] = useState(false);
  const [minCompatibility, setMinCompatibility] = useState(0);
  const [expandedAnswers, setExpandedAnswers] = useState<Record<number, boolean>>({});

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const loadQuestionnaires = async () => {
    setLoading(true);
    // console.log('🔄 Cargando cuestionarios de personalidad...');
    
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

      // Intentar cargar desde la API
              // console.log('🌐 Haciendo llamada a API...');
      const response = await fetch('http://localhost:3001/api/admin/questionnaires', {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      // console.log('📡 Respuesta API:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        // console.log('📊 Datos recibidos:', data);
        const personalidadQuestionnaires = data.personalidad?.questionnaires || [];
        // console.log('🧠 Cuestionarios de personalidad:', personalidadQuestionnaires.length);
        setQuestionnaires(personalidadQuestionnaires);
      } else {
        // console.error('❌ API response not ok:', response.status);
        setQuestionnaires([]);
      }
    } catch (error) {
      // console.error('💥 Error loading questionnaires:', error);
      setQuestionnaires([]);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCompatibilityWithAll = async (selectedPerson: Questionnaire) => {
    setSelectedPerson(selectedPerson);
    setAnalyzing(true);
    
    // console.log('🧠 Analizando compatibilidad de personalidad para:', selectedPerson.personalInfo.nombre);
    
    // Simular delay para mostrar loading
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const matches: CompatibilityMatch[] = [];
    
    questionnaires.forEach(questionnaire => {
      if (questionnaire.id !== selectedPerson.id) {
        try {
          const compatibility = PersonalityCompatibilityAnalysis.analyzeCompatibility(
            selectedPerson.answers,
            questionnaire.answers
          );
          
          matches.push({
            person: questionnaire,
            compatibility,
            matchRank: 0
          });
              } catch (error) {
        // console.error('Error analizando compatibilidad:', error);
      }
      }
    });
    
    // Ordenar por porcentaje de compatibilidad (mayor a menor)
    matches.sort((a, b) => b.compatibility.percentage - a.compatibility.percentage);
    
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

      const matchesCompatible = !showOnlyCompatible || match.compatibility.overallCompatible;
      
      const matchesMinCompatibility = match.compatibility.percentage >= minCompatibility;

      return matchesSearch && matchesCompatible && matchesMinCompatibility;
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

  const toggleAnswersExpanded = (personId: number) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [personId]: !prev[personId]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
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
                <Brain className="h-8 w-8 text-blue-500" />
                Análisis de Compatibilidad de Personalidad
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
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
                    Para usar el análisis de compatibilidad, necesitas tener cuestionarios de personalidad completados.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Ve al Panel de Administración</p>
                    <p>• Verifica que haya cuestionarios de personalidad completados</p>
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
                      className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300"
                      onClick={() => analyzeCompatibilityWithAll(questionnaire)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {questionnaire.personalInfo.nombre.charAt(0)}{questionnaire.personalInfo.apellidos.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                              {questionnaire.personalInfo.nombre} {questionnaire.personalInfo.apellidos}
                            </h3>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {questionnaire.personalInfo.edad} años
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {questionnaire.personalInfo.genero}
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
            <Card className="mb-8 bg-gradient-to-r from-blue-100 to-indigo-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedPerson.personalInfo.nombre.charAt(0)}{selectedPerson.personalInfo.apellidos.charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedPerson.personalInfo.nombre} {selectedPerson.personalInfo.apellidos}
                      </CardTitle>
                      <div className="flex gap-3 mt-2">
                        <Badge variant="secondary">
                          {selectedPerson.personalInfo.edad} años
                        </Badge>
                        <Badge variant="outline">
                          {selectedPerson.personalInfo.genero}
                        </Badge>
                        <Badge variant="outline">
                          {selectedPerson.personalInfo.orientacionSexual}
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          📊 Compatibilidad Mínima
                        </label>
                        <select
                          value={minCompatibility}
                          onChange={(e) => setMinCompatibility(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={0}>Todos los matches</option>
                          <option value={40}>40% o más</option>
                          <option value={60}>60% o más</option>
                          <option value={80}>80% o más</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          🧠 Solo Compatibles
                        </label>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="showOnlyCompatible"
                            checked={showOnlyCompatible}
                            onChange={(e) => setShowOnlyCompatible(e.target.checked)}
                            className="mr-2"
                          />
                          <label htmlFor="showOnlyCompatible" className="text-sm text-gray-600">
                            Mostrar solo compatibles (35+ puntos)
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          📈 Estadísticas
                        </label>
                        <div className="text-sm text-gray-600">
                          {getFilteredMatches().length} de {compatibilityMatches.length} resultados
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {compatibilityMatches.length}
                      </div>
                      <div className="text-sm text-gray-600">Total Análisis</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {compatibilityMatches.filter(m => m.compatibility.overallCompatible).length}
                      </div>
                      <div className="text-sm text-gray-600">Compatibles (35+)</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {compatibilityMatches.length > 0 ? Math.round(compatibilityMatches[0].compatibility.percentage) : 0}%
                      </div>
                      <div className="text-sm text-gray-600">Mejor Match</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {Math.round(compatibilityMatches.reduce((sum, m) => sum + m.compatibility.percentage, 0) / compatibilityMatches.length) || 0}%
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
                      className={`transition-all hover:shadow-lg ${getCompatibilityColor(match.compatibility.percentage)} border-2`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                              {getRankIcon(match.matchRank)}
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {match.person.personalInfo.nombre.charAt(0)}{match.person.personalInfo.apellidos.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800">
                                {match.person.personalInfo.nombre} {match.person.personalInfo.apellidos}
                              </h3>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {match.person.personalInfo.edad} años
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {match.person.personalInfo.genero}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {match.person.personalInfo.orientacionSexual}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-4">
                              <div>
                                <div className="text-2xl font-bold">
                                  {match.compatibility.percentage}%
                                </div>
                                <div className="text-sm text-gray-600">
                                  {match.compatibility.overallCompatible ? 'Compatible' : 'No compatible'}
                                </div>
                              </div>
                              <div className="w-24">
                                <Progress 
                                  value={match.compatibility.percentage} 
                                  className="h-3"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <Badge 
                                  variant={match.compatibility.overallCompatible ? "default" : "destructive"}
                                  className="text-xs"
                                >
                                  {match.compatibility.overallCompatible ? (
                                    <>
                                      <Brain className="h-3 w-3 mr-1" />
                                      Personalidad compatible
                                    </>
                                  ) : (
                                    <>
                                      <AlertTriangle className="h-3 w-3 mr-1" />
                                      Personalidad incompatible
                                    </>
                                  )}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Detalles de compatibilidad por categoría */}
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-800 mb-3">Compatibilidad por categorías:</h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                            {Object.entries(match.compatibility.categoryResults).map(([category, data]: [string, any]) => (
                              <div 
                                key={category} 
                                className={`text-center p-2 rounded text-xs border ${
                                  data.compatible 
                                    ? 'bg-green-100 border-green-200 text-green-800' 
                                    : 'bg-gray-100 border-gray-200 text-gray-600'
                                }`}
                              >
                                <div className="font-medium capitalize text-xs">
                                  {category.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div className="text-xs font-bold">
                                  {data.score}/{data.max} ({data.percentage}%)
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Recomendaciones */}
                        {match.compatibility.recommendations.length > 0 && (
                          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                              <Brain className="h-4 w-4" />
                              Recomendaciones de personalidad:
                            </h4>
                            <div className="space-y-1">
                              {match.compatibility.recommendations.map((rec, idx) => (
                                <div key={idx} className="text-sm text-blue-700 flex items-start gap-2">
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Dropdown de respuestas detalladas */}
                        <div className="mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAnswersExpanded(match.person.id)}
                            className="w-full flex items-center justify-center gap-2"
                          >
                            {expandedAnswers[match.person.id] ? (
                              <>
                                <ChevronUp className="h-4 w-4" />
                                Ocultar respuestas detalladas
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4" />
                                Ver respuestas detalladas
                              </>
                            )}
                          </Button>

                          {expandedAnswers[match.person.id] && match.compatibility.detailedAnswers && (
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                              <h4 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                📋 Comparación de Respuestas
                              </h4>
                              <div className="space-y-3 max-h-96 overflow-y-auto">
                                {Object.keys(match.compatibility.detailedAnswers.questionTexts).map(questionId => {
                                  const questionText = match.compatibility.detailedAnswers.questionTexts[questionId];
                                  const answer1 = match.compatibility.detailedAnswers.person1Answers[questionId];
                                  const answer2 = match.compatibility.detailedAnswers.person2Answers[questionId];
                                  
                                  // Asegurar que las respuestas sean strings
                                  const answer1Str = typeof answer1 === 'string' ? answer1 : 
                                    (typeof answer1 === 'object' && answer1 !== null && 'answer' in answer1) ? 
                                    String((answer1 as any).answer) : 'Sin respuesta';
                                  
                                  const answer2Str = typeof answer2 === 'string' ? answer2 : 
                                    (typeof answer2 === 'object' && answer2 !== null && 'answer' in answer2) ? 
                                    String((answer2 as any).answer) : 'Sin respuesta';
                                  
                                  const isMatch = answer1Str && answer2Str && answer1Str === answer2Str;

                                  return (
                                    <div 
                                      key={questionId}
                                      className={`p-3 rounded border-l-4 ${
                                        isMatch 
                                          ? 'bg-green-50 border-green-400' 
                                          : 'bg-red-50 border-red-400'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-medium text-gray-600">
                                          Pregunta {questionId}:
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded ${
                                          isMatch 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                        }`}>
                                          {isMatch ? '✅ Coinciden' : '❌ Difieren'}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-700 mb-3 font-medium">
                                        {questionText || `Pregunta ${questionId}`}
                                      </p>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="bg-blue-50 p-2 rounded">
                                          <span className="text-xs font-medium text-blue-600">
                                            {selectedPerson?.personalInfo.nombre}:
                                          </span>
                                          <p className="text-sm text-blue-800 font-medium">
                                            {answer1Str}
                                          </p>
                                        </div>
                                        <div className="bg-purple-50 p-2 rounded">
                                          <span className="text-xs font-medium text-purple-600">
                                            {match.person.personalInfo.nombre}:
                                          </span>
                                          <p className="text-sm text-purple-800 font-medium">
                                            {answer2Str}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {getFilteredMatches().length === 0 && (
                  <div className="text-center py-12">
                    <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron resultados</h3>
                    <p className="text-gray-600">
                      Intenta ajustar los filtros de búsqueda o compatibilidad mínima.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalityCompatibilityAnalysisPage;
