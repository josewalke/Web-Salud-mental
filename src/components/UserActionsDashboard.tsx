import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MousePointer, 
  Keyboard, 
  Scroll, 
  FileText, 
  Navigation, 
  AlertTriangle, 
  Activity,
  Eye,
  BarChart3,
  Play,
  Pause,
  RefreshCw,
  Download,
  Trash2
} from 'lucide-react';
import { useUserTrackingSystem } from '../hooks/useUserTrackingSystem';

interface UserAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  sessionId: string;
  pageUrl: string;
  pageTitle: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
}

interface ActionStats {
  [key: string]: number;
}

const UserActionsDashboard: React.FC = () => {
  const { 
    isActive, 
    stats, 
    startTracking, 
    stopTracking, 
    getStats,
    configureTracking 
  } = useUserTrackingSystem();

  const [actions, setActions] = useState<UserAction[]>([]);
  const [actionStats, setActionStats] = useState<ActionStats>({});
  const [filteredActions, setFilteredActions] = useState<UserAction[]>([]);
  const [selectedActionType, setSelectedActionType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Configuración del tracking
  const [trackingConfig, setTrackingConfig] = useState({
    trackMouse: true,
    trackKeyboard: true,
    trackScroll: true,
    trackTouch: true,
    trackForms: true,
    trackNavigation: true,
    trackErrors: true,
    trackPerformance: true,
    batchSize: 50,
    flushInterval: 10000
  });

  // Simular acciones del usuario (en un caso real vendrían del backend)
  useEffect(() => {
    if (!isActive) return;

    const simulateActions = () => {
      const actionTypes = [
        'click', 'scroll', 'keydown', 'mouse_move', 'form_focus',
        'navigation', 'page_view', 'touch_start', 'gesture'
      ];

      const newAction: UserAction = {
        id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: actionTypes[Math.floor(Math.random() * actionTypes.length)],
        data: {
          element: 'button',
          position: { x: Math.random() * 1000, y: Math.random() * 800 }
        },
        timestamp: Date.now(),
        sessionId: stats?.sessionId || 'unknown',
        pageUrl: window.location.href,
        pageTitle: document.title,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };

      setActions(prev => [newAction, ...prev.slice(0, 999)]); // Mantener solo las últimas 1000
    };

    const interval = setInterval(simulateActions, 2000);
    return () => clearInterval(interval);
  }, [isActive, stats]);

  // Calcular estadísticas
  useEffect(() => {
    const actionStatsData: ActionStats = {};
    actions.forEach(action => {
      actionStatsData[action.type] = (actionStatsData[action.type] || 0) + 1;
    });
    setActionStats(actionStatsData);
  }, [actions]);

  // Filtrar acciones
  useEffect(() => {
    let filtered = actions;

    if (selectedActionType !== 'all') {
      filtered = filtered.filter(action => action.type === selectedActionType);
    }

    if (searchTerm) {
      filtered = filtered.filter(action => 
        action.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.pageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        action.pageUrl.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActions(filtered);
  }, [actions, selectedActionType, searchTerm]);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Actualizar estadísticas en tiempo real
      getStats();
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh, getStats]);

  // Configurar tracking
  const updateTrackingConfig = (key: string, value: any) => {
    const newConfig = { ...trackingConfig, [key]: value };
    setTrackingConfig(newConfig);
    configureTracking(newConfig);
  };

  // Exportar datos
  const exportData = () => {
    const dataStr = JSON.stringify({
      actions: filteredActions,
      stats: actionStats,
      config: trackingConfig,
      exportTime: new Date().toISOString()
    }, null, 2);

    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `user-actions-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Limpiar datos
  const clearData = () => {
    setActions([]);
    setActionStats({});
  };

  // Obtener icono para tipo de acción
  const getActionIcon = (actionType: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      click: <MousePointer className="w-4 h-4" />,
      scroll: <Scroll className="w-4 h-4" />,
      keydown: <Keyboard className="w-4 h-4" />,
      mouse_move: <MousePointer className="w-4 h-4" />,
      form_focus: <FileText className="w-4 h-4" />,
      navigation: <Navigation className="w-4 h-4" />,
      page_view: <Eye className="w-4 h-4" />,
      touch_start: <Activity className="w-4 h-4" />,
      gesture: <Activity className="w-4 h-4" />,
      error: <AlertTriangle className="w-4 h-4" />,
      performance: <Activity className="w-4 h-4" />
    };

    return iconMap[actionType] || <Activity className="w-4 h-4" />;
  };

  // Obtener color para tipo de acción
  const getActionColor = (actionType: string) => {
    const colorMap: { [key: string]: string } = {
      click: 'bg-blue-500',
      scroll: 'bg-green-500',
      keydown: 'bg-purple-500',
      mouse_move: 'bg-gray-500',
      form_focus: 'bg-yellow-500',
      navigation: 'bg-indigo-500',
      page_view: 'bg-pink-500',
      touch_start: 'bg-orange-500',
      gesture: 'bg-red-500',
      error: 'bg-red-600',
      performance: 'bg-cyan-500'
    };

    return colorMap[actionType] || 'bg-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          🎯 Dashboard de Acciones del Usuario
        </h1>
        <p className="text-gray-300 text-lg">
          Tracking completo y en tiempo real de todas las interacciones del usuario
        </p>
      </motion.div>

      {/* Controles principales */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      >
        {/* Estado del sistema */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Estado del Sistema</h3>
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400' : 'bg-red-400'}`} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Sesión ID:</span>
              <span className="font-mono text-sm">{stats?.sessionId?.substring(0, 20)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Duración:</span>
              <span>{stats ? Math.round(stats.sessionDuration / 1000) : 0}s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Acciones:</span>
              <span>{stats?.totalActions || 0}</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={isActive ? stopTracking : startTracking}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 inline mr-2" />
                  Detener Tracking
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 inline mr-2" />
                  Iniciar Tracking
                </>
              )}
            </button>
          </div>
        </div>

        {/* Configuración rápida */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Configuración Rápida</h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Auto-refresh</span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={showAdvanced}
                onChange={(e) => setShowAdvanced(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Mostrar avanzado</span>
            </label>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={exportData}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Exportar Datos
            </button>
            
            <button
              onClick={clearData}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-all"
            >
              <Trash2 className="w-4 h-4 inline mr-2" />
              Limpiar
            </button>
          </div>
        </div>

        {/* Estadísticas generales */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Estadísticas Generales</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Total Acciones:</span>
              <span className="font-bold text-2xl">{actions.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Tipos Únicos:</span>
              <span className="font-bold">{Object.keys(actionStats).length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Última Acción:</span>
              <span className="text-sm">
                {actions[0] ? new Date(actions[0].timestamp).toLocaleTimeString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtros y búsqueda */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por tipo */}
          <div>
            <label className="block text-sm font-medium mb-2">Tipo de Acción</label>
            <select
              value={selectedActionType}
              onChange={(e) => setSelectedActionType(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
            >
              <option value="all">Todas las acciones</option>
              {Object.keys(actionStats).map(type => (
                <option key={type} value={type}>
                  {type} ({actionStats[type]})
                </option>
              ))}
            </select>
          </div>

          {/* Búsqueda */}
          <div>
            <label className="block text-sm font-medium mb-2">Buscar</label>
            <input
              type="text"
              placeholder="Buscar en acciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-gray-400"
            />
          </div>

          {/* Botón refresh */}
          <div className="flex items-end">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-all"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Actualizar
            </button>
          </div>
        </div>
      </motion.div>

      {/* Gráfico de estadísticas */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Distribución de Acciones
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(actionStats).map(([type, count]) => (
            <div key={type} className="text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2 ${getActionColor(type)}`}>
                {getActionIcon(type)}
              </div>
              <div className="text-sm font-medium">{type}</div>
              <div className="text-2xl font-bold text-blue-400">{count}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lista de acciones en tiempo real */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
      >
        <div className="p-6 border-b border-white/20">
          <h3 className="text-xl font-semibold flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Acciones en Tiempo Real
          </h3>
          <p className="text-gray-300 text-sm mt-1">
            Mostrando {filteredActions.length} de {actions.length} acciones
          </p>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No hay acciones para mostrar</p>
              <p className="text-sm">Inicia el tracking para ver las acciones del usuario</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionColor(action.type)}`}>
                      {getActionIcon(action.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-blue-400">{action.type}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(action.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-300 mt-1">
                        <span className="font-mono">{action.pageTitle}</span>
                        {action.data?.element && (
                          <span className="ml-2 text-gray-400">
                            → {action.data.element}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right text-xs text-gray-400">
                      <div>ID: {action.id.substring(0, 8)}...</div>
                      <div>{action.viewport.width}×{action.viewport.height}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Configuración avanzada */}
      {showAdvanced && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mt-8"
        >
          <h3 className="text-xl font-semibold mb-4">Configuración Avanzada</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opciones de tracking */}
            <div>
              <h4 className="font-medium mb-3">Opciones de Tracking</h4>
              <div className="space-y-2">
                {Object.entries(trackingConfig).slice(0, 8).map(([key, value]) => (
                  <label key={key} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={typeof value === 'boolean' ? value : false}
                      onChange={(e) => updateTrackingConfig(key, e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{key.replace('track', '')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Configuración de rendimiento */}
            <div>
              <h4 className="font-medium mb-3">Configuración de Rendimiento</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1">Tamaño del lote</label>
                  <input
                    type="number"
                    value={trackingConfig.batchSize}
                    onChange={(e) => updateTrackingConfig('batchSize', parseInt(e.target.value))}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
                    min="10"
                    max="200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Intervalo de envío (ms)</label>
                  <input
                    type="number"
                    value={trackingConfig.flushInterval}
                    onChange={(e) => updateTrackingConfig('flushInterval', parseInt(e.target.value))}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
                    min="1000"
                    max="60000"
                    step="1000"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserActionsDashboard;
