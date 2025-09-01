/**
 * CompatibilityAnalysisPage.tsx
 * 
 * Página principal para el análisis de compatibilidad de parejas.
 * Permite seleccionar una persona y ver sus matches de compatibilidad
 * con otras personas que han completado el cuestionario de pareja.
 * 
 * Características:
 * - Selección de persona para análisis
 * - Cálculo de compatibilidad con otros usuarios
 * - Visualización de matches con porcentajes
 * - Comparación lado a lado de respuestas
 * - Filtros por compatibilidad y género
 * 
 * @author Sistema de Salud Mental
 * @version 1.0.0
 */

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
  TrendingDown,
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

/**
 * Interfaz que define la información personal de un usuario
 */
interface PersonalInfo {
  nombre: string;
  apellidos: string;
  edad: string;
  genero: string;
  correo: string;
  orientacionSexual: string;
}

/**
 * Interfaz que define un cuestionario completo
 */
interface Questionnaire {
  id: number;
  type: string;
  personalInfo: PersonalInfo;
  answers: Record<string, string>;
  completed: boolean;
  completedAt: string;
  createdAt: string;
}

/**
 * Interfaz que define un match de compatibilidad
 */
interface CompatibilityMatch {
  person: Questionnaire;
  compatibility: CompatibilityResult;
  matchRank: number;
}

/**
 * Componente principal de análisis de compatibilidad
 * 
 * @returns JSX.Element - La página de análisis de compatibilidad
 */
const CompatibilityAnalysisPage: React.FC = () => {
  // ===== ESTADOS PRINCIPALES =====
  
  /** Lista de todos los cuestionarios de pareja disponibles */
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  
  /** Persona seleccionada para el análisis de compatibilidad */
  const [selectedPerson, setSelectedPerson] = useState<Questionnaire | null>(null);
  
  /** Lista de matches de compatibilidad calculados */
  const [compatibilityMatches, setCompatibilityMatches] = useState<CompatibilityMatch[]>([]);
  
  /** Estado de carga para mostrar spinner */
  const [loading, setLoading] = useState(true);
  
  /** Estado de análisis para mostrar progreso */
  const [analyzing, setAnalyzing] = useState(false);

  // ===== ESTADOS DE FILTROS =====
  
  /** Término de búsqueda para filtrar personas */
  const [searchTerm, setSearchTerm] = useState('');
  
  /** Compatibilidad mínima para filtrar matches */
  const [minCompatibility, setMinCompatibility] = useState(0);

  // ===== ESTADOS DE MODALES Y UI =====
  
  /** Estado del modal de comparación de respuestas */
  const [comparisonModal, setComparisonModal] = useState<{
    isOpen: boolean;
    person1: Questionnaire | null;
    compatibilityPercentage: number;
  }>({
    isOpen: false,
    person1: null,
    compatibilityPercentage: 0
  });
  
  /** Set de IDs de tarjetas expandidas para mostrar comparación de respuestas */
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  // ===== EFECTOS =====
  
  /**
   * Efecto que se ejecuta al montar el componente
   * Carga los cuestionarios de pareja disponibles
   */
  useEffect(() => {
    loadQuestionnaires();
  }, []);

  // ===== FUNCIONES DE CARGA DE DATOS =====
  
  /**
   * Carga los cuestionarios de pareja desde el backend
   * Utiliza el token de administrador para acceder a los datos
   */
  const loadQuestionnaires = async () => {
    setLoading(true);
    // DEBUG: Cargando cuestionarios para análisis de compatibilidad
    // console.log('🔄 Cargando cuestionarios...');
    
    try {
      // Verificar si hay token de admin
      const adminToken = localStorage.getItem('adminToken');
      // DEBUG: Verificar token de administrador
      // console.log('🔑 Token admin:', adminToken ? 'Presente' : 'Ausente');
      
      if (!adminToken) {
        // console.error('❌ No hay token de administrador');
        setQuestionnaires([]);
        setLoading(false);
        return;
      }

      // Intentar cargar desde la API (misma URL que AdminDashboard)
      // DEBUG: Haciendo llamada a la API del backend
      // console.log('🌐 Haciendo llamada a API...');
      const response = await fetch(buildApiUrl('/api/admin/questionnaires'), {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      // DEBUG: Estado de la respuesta de la API
      // console.log('📡 Respuesta API:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        // DEBUG: Datos recibidos del backend
        // console.log('📊 Datos recibidos:', data);
        const parejaQuestionnaires = data.pareja?.questionnaires || [];
        // DEBUG: Cantidad de cuestionarios de pareja
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
      // DEBUG: Carga completada exitosamente
      // console.log('✅ Carga completada. Cuestionarios:', questionnaires.length);
    }
  };

  /**
   * Analiza la compatibilidad de una persona seleccionada con todos los demás usuarios
   * @param selectedPerson - Persona seleccionada para el análisis
   */
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

  // ===== FUNCIONES DE FILTRADO Y UTILIDAD =====
  
  /**
   * Filtra los matches de compatibilidad según los criterios seleccionados
   * @returns Array de matches filtrados
   */
  const getFilteredMatches = () => {
    return compatibilityMatches.filter(match => {
      const matchesSearch = searchTerm === '' || 
        `${match.person.personalInfo.nombre} ${match.person.personalInfo.apellidos}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      
      const matchesMinCompatibility = match.compatibility.compatibilityPercentage >= minCompatibility;

      return matchesSearch && matchesMinCompatibility;
    });
  };

  /**
   * Obtiene las clases CSS para el color de compatibilidad según el porcentaje
   * @param percentage - Porcentaje de compatibilidad
   * @returns String con las clases CSS correspondientes
   */
  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 80) return "text-blue-600 bg-blue-50 border-blue-200";
    if (percentage >= 70) return "text-purple-600 bg-purple-50 border-purple-200";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  /**
   * Obtiene el icono correspondiente al ranking de compatibilidad
   * @param rank - Posición en el ranking
   * @returns JSX.Element con el icono correspondiente
   */
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Star className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Star className="h-5 w-5 text-orange-400" />;
    return <span className="text-gray-500 font-bold">#{rank}</span>;
  };

  /**
   * Formatea una fecha string a formato legible en español
   * @param dateString - String de fecha a formatear
   * @returns String formateado o 'N/A' si no hay fecha
   */
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  /**
   * Alterna el estado de expansión de una tarjeta de match
   * @param personId - ID de la persona para expandir/contraer
   */
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

  /**
   * Verifica si una tarjeta está expandida
   * @param personId - ID de la persona a verificar
   * @returns Boolean indicando si la tarjeta está expandida
   */
  const isCardExpanded = (personId: number) => {
    return expandedCards.has(personId);
  };

  // ===== RENDERIZADO CONDICIONAL =====
  
  /**
   * Estado de carga - muestra spinner mientras se cargan los cuestionarios
   */
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

  // ===== RENDERIZADO PRINCIPAL =====
  
  /**
   * Renderizado principal del componente CompatibilityAnalysisPage
   * Incluye header, selección de persona, filtros y resultados
   */
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      {/* ===== HEADER DE LA PÁGINA ===== */}
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
                              {match.compatibility.shouldStopAnalysis && (
                                <div className="flex flex-col gap-2">
                                  <Badge variant="destructive" className="text-xs">
                                    ⚠️ Requiere atención
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Detalles adicionales */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <strong>Email:</strong> {match.person.personalInfo?.correo || 'N/A'}
                            </div>
                            <div>
                              <strong>Puntuación:</strong> {match.compatibility.totalScore}/{match.compatibility.maxScore} puntos
                            </div>
                          </div>
                          


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
                            
                            {/* Dropdown expandible con comparación de respuestas */}
                            {isCardExpanded(match.person.id) && (
                              <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                                <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                      {(selectedPerson?.personalInfo?.nombre || 'U').charAt(0)}
                                    </div>
                                    <span>VS</span>
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                      {(match.person.personalInfo?.nombre || 'U').charAt(0)}
                                    </div>
                                  </div>
                                  Comparación de Respuestas
                                </h4>
                                
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                  {getQuestions('pareja').map((question, index) => {
                                    const answer1 = selectedPerson?.answers[index.toString()] || 'Sin respuesta';
                                    const answer2 = match.person.answers[index.toString()] || 'Sin respuesta';
                                    const isCompatible = answer1 === answer2;
                                    
                                    return (
                                      <div key={question.id} className={`p-3 bg-white rounded border-2 ${isCompatible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                        <div className="flex gap-3 mb-2">
                                          <div className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                            {question.id + 1}
                                          </div>
                                          <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-700">
                                              {question.text}
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                              <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                {(selectedPerson?.personalInfo?.nombre || 'U').charAt(0)}
                                              </div>
                                              <span className="text-xs font-medium text-gray-600">
                                                {selectedPerson?.personalInfo?.nombre || 'Usuario'}
                                              </span>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                              {answer1}
                                            </Badge>
                                          </div>
                                          
                                          <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                              <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                {(match.person.personalInfo?.nombre || 'U').charAt(0)}
                                              </div>
                                              <span className="text-xs font-medium text-gray-600">
                                                {match.person.personalInfo?.nombre || 'Usuario'}
                                              </span>
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                              {answer2}
                                            </Badge>
                                          </div>
                                        </div>
                                        
                                        <div className="mt-2 flex items-center gap-2">
                                          {isCompatible ? (
                                            <>
                                              <TrendingUp className="h-3 w-3 text-green-500" />
                                              <span className="text-xs text-green-600">Respuestas idénticas</span>
                                            </>
                                          ) : (
                                            <>
                                              <TrendingDown className="h-3 w-3 text-red-500" />
                                              <span className="text-xs text-red-600">Respuestas diferentes</span>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                                
                                <div className="mt-3 pt-3 border-t">
                                  <div className="text-center text-sm text-gray-600 mb-2">
                                    Compatibilidad: <span className="font-bold text-lg">{match.compatibility.compatibilityPercentage}%</span>
                                  </div>
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

/**
 * Exportación del componente CompatibilityAnalysisPage
 * Página principal para el análisis de compatibilidad de parejas
 */
export default CompatibilityAnalysisPage;
