import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Smartphone, 
  Monitor, 
  Tablet, 
  TrendingUp, 
  Clock, 
  Activity,
  RefreshCw,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useBackendMetrics } from '../hooks/useBackendMetrics';

// Tipos para las métricas
interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
  domContentLoaded?: number;
  loadComplete?: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
  resourceCount?: number;
  totalResourceSize?: number;
  slowResources?: Array<{
    name: string;
    duration: number;
    size: number;
  }>;
}

interface PageInfo {
  url?: string;
  title?: string;
  loadTime?: number;
  renderTime?: number;
  interactiveTime?: number;
}

interface DeviceInfo {
  type: string;
  userAgent?: string;
  screenResolution?: {
    width: number;
    height: number;
  };
  viewport?: {
    width: number;
    height: number;
  };
  pixelRatio?: number;
  orientation?: string;
  language?: string;
  timezone?: string;
}

interface SystemInfo {
  memoryUsage?: number;
  cpuUsage?: number;
  batteryLevel?: number;
  networkType?: string;
  connectionSpeed?: string;
}

interface Interaction {
  type: string;
  element: string;
  timestamp: number;
  duration?: number;
}

interface ErrorInfo {
  type: string;
  message: string;
  stack: string;
  timestamp: number;
}

interface SessionInfo {
  startTime?: Date;
  endTime?: Date;
  duration?: number;
  pageViews?: number;
  uniquePages?: string[];
}

interface MetricData {
  _id: string;
  device: DeviceInfo;
  user: {
    ip?: string;
    country?: string;
    city?: string;
    browser?: string;
    browserVersion?: string;
    os?: string;
    osVersion?: string;
  };
  performance?: PerformanceMetrics;
  page?: PageInfo;
  system?: SystemInfo;
  interactions?: Interaction[];
  errors?: ErrorInfo[];
  session?: SessionInfo;
  createdAt: string;
  updatedAt: string;
}

interface DeviceStats {
  _id: string;
  count: number;
  avgLoadTime?: number;
  avgLCP?: number;
  avgFID?: number;
  avgCLS?: number;
}

interface StatsData {
  total: number;
  devices: DeviceStats[];
  performance: {
    avgLCP: number;
    avgFID: number;
    avgCLS: number;
    avgLoadTime: number;
  };
}

interface DeviceMetricsData {
  metrics: MetricData[];
  pagination: {
    current: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface RealTimeMetricsData {
  totalSessions: number;
  deviceBreakdown: Array<{
    _id: string;
    count: number;
  }>;
  lastUpdate: string;
  performance: {
    avgLCP: number;
    avgFID: number;
    avgCLS: number;
  };
}

interface LastMetricsData {
  deviceType: string;
  device?: DeviceInfo;
  page?: PageInfo;
  performance?: PerformanceMetrics;
}

const MetricsDashboard = () => {
  const { 
    isConnected, 
    lastMetrics, 
    error, 
    getStats, 
    getRealTimeMetrics,
    getMetricsByDevice 
  } = useBackendMetrics();

  const [stats, setStats] = useState<StatsData | null>(null);
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetricsData | null>(null);
  const [deviceMetrics, setDeviceMetrics] = useState<Record<string, DeviceMetricsData>>({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Cargar estadísticas generales
  const loadStats = async () => {
    setLoading(true);
    try {
      const result = await getStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar métricas en tiempo real
  const loadRealTimeMetrics = async () => {
    try {
      const result = await getRealTimeMetrics();
      if (result.success) {
        setRealTimeMetrics(result.data);
      }
    } catch (err) {
      console.error('Error al cargar métricas en tiempo real:', err);
    }
  };

  // Cargar métricas por dispositivo
  const loadDeviceMetrics = async (deviceType: string) => {
    try {
      const result = await getMetricsByDevice(deviceType, 1, 10);
      if (result.success) {
        setDeviceMetrics(prev => ({
          ...prev,
          [deviceType]: result.data
        }));
      }
    } catch (err) {
      console.error(`Error al cargar métricas de ${deviceType}:`, err);
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    if (isConnected) {
      loadStats();
      loadRealTimeMetrics();
    }
  }, [isConnected]);

  // Actualizar métricas en tiempo real cada 30 segundos
  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      loadRealTimeMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, [isConnected]);

  // Cargar métricas por dispositivo cuando se cambie de tab
  useEffect(() => {
    if (activeTab === 'devices' && isConnected) {
      loadDeviceMetrics('desktop');
      loadDeviceMetrics('mobile');
      loadDeviceMetrics('tablet');
    }
  }, [activeTab, isConnected]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Backend no conectado
          </h2>
          <p className="text-gray-600 mb-4">
            No se puede conectar con el servidor de métricas
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'devices', label: 'Dispositivos', icon: Smartphone },
    { id: 'realtime', label: 'Tiempo Real', icon: Activity },
    { id: 'performance', label: 'Rendimiento', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📊 Dashboard de Métricas
          </h1>
          <p className="text-xl text-gray-600">
            Monitoreo en tiempo real del rendimiento y uso de la aplicación
          </p>
        </motion.div>

        {/* Status Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isConnected ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <span className={`font-medium ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">
                Última actualización: {new Date().toLocaleTimeString()}
              </span>
            </div>
            <button
              onClick={() => {
                loadStats();
                loadRealTimeMetrics();
              }}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <OverviewTab stats={stats} loading={loading} />
          )}
          
          {activeTab === 'devices' && (
            <DevicesTab deviceMetrics={deviceMetrics} />
          )}
          
          {activeTab === 'realtime' && (
            <RealTimeTab realTimeMetrics={realTimeMetrics} />
          )}
          
          {activeTab === 'performance' && (
            <PerformanceTab lastMetrics={lastMetrics} />
          )}
        </motion.div>
      </div>
    </div>
  );
};

// Tab de Resumen
const OverviewTab = ({ stats, loading }: { stats: StatsData | null; loading: boolean }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const metrics = [
    {
      title: 'Total de Sesiones',
      value: stats.total || 0,
      icon: Activity,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Promedio LCP',
      value: `${Math.round(stats.performance?.avgLCP || 0)}ms`,
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Promedio FID',
      value: `${Math.round(stats.performance?.avgFID || 0)}ms`,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Promedio CLS',
      value: (stats.performance?.avgCLS || 0).toFixed(3),
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-2">{metric.title}</h3>
              <p className="text-3xl font-bold text-gray-800">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Distribución por dispositivos */}
      {stats.devices && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Distribución por Dispositivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.devices.map((device: DeviceStats, index: number) => (
              <motion.div
                key={device._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  {device._id === 'desktop' && <Monitor className="w-8 h-8 text-blue-600" />}
                  {device._id === 'mobile' && <Smartphone className="w-8 h-8 text-blue-600" />}
                  {device._id === 'tablet' && <Tablet className="w-8 h-8 text-blue-600" />}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 capitalize mb-2">
                  {device._id}
                </h4>
                <p className="text-3xl font-bold text-blue-600 mb-2">{device.count}</p>
                <p className="text-sm text-gray-600">
                  {((device.count / stats.total) * 100).toFixed(1)}% del total
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Tab de Dispositivos
const DevicesTab = ({ deviceMetrics }: { deviceMetrics: Record<string, DeviceMetricsData> }) => {
  const deviceTypes = ['desktop', 'mobile', 'tablet'];
  const deviceIcons = {
    desktop: Monitor,
    mobile: Smartphone,
    tablet: Tablet
  };

  return (
    <div className="space-y-6">
      {deviceTypes.map((deviceType: string) => {
        const Icon = deviceIcons[deviceType as keyof typeof deviceIcons];
        const metrics = deviceMetrics[deviceType];
        
        if (!metrics) return null;

        return (
          <div key={deviceType} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Icon className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800 capitalize">
                {deviceType}
              </h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {metrics.metrics?.length || 0} sesiones
              </span>
            </div>

            {metrics.metrics && metrics.metrics.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Fecha</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">LCP</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">FID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">CLS</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Tiempo Carga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.metrics.slice(0, 5).map((metric: MetricData, index: number) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(metric.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {metric.performance?.lcp ? `${Math.round(metric.performance.lcp)}ms` : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {metric.performance?.fid ? `${Math.round(metric.performance.fid)}ms` : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {metric.performance?.cls ? metric.performance.cls.toFixed(3) : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800">
                          {metric.page?.loadTime ? `${Math.round(metric.page.loadTime)}ms` : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No hay métricas disponibles para este dispositivo</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Tab de Tiempo Real
const RealTimeTab = ({ realTimeMetrics }: { realTimeMetrics: RealTimeMetricsData | null }) => {
  if (!realTimeMetrics) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-gray-500">Cargando métricas en tiempo real...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Métricas de las Últimas 24 Horas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{realTimeMetrics.totalSessions}</p>
            <p className="text-sm text-gray-600">Total de Sesiones</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {Math.round(realTimeMetrics.performance?.avgLCP || 0)}ms
            </p>
            <p className="text-sm text-gray-600">Promedio LCP</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {Math.round(realTimeMetrics.performance?.avgFID || 0)}ms
            </p>
            <p className="text-sm text-gray-600">Promedio FID</p>
          </div>
          
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {(realTimeMetrics.performance?.avgCLS || 0).toFixed(3)}
            </p>
            <p className="text-sm text-gray-600">Promedio CLS</p>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Distribución por Dispositivos</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {realTimeMetrics.deviceBreakdown?.map((device: { _id: string; count: number }) => (
              <div key={device._id} className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-lg font-semibold text-gray-800 capitalize mb-1">{device._id}</p>
                <p className="text-2xl font-bold text-blue-600">{device.count}</p>
                <p className="text-sm text-gray-600">
                  {((device.count / realTimeMetrics.totalSessions) * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tab de Rendimiento
const PerformanceTab = ({ lastMetrics }: { lastMetrics: LastMetricsData | null }) => {
  if (!lastMetrics) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <p className="text-gray-500">No hay métricas de rendimiento disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Últimas Métricas de Rendimiento</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Información del Dispositivo</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className="font-medium capitalize">{lastMetrics.deviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Resolución:</span>
                <span className="font-medium">
                  {lastMetrics.device?.screenResolution?.width} x {lastMetrics.device?.screenResolution?.height}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Viewport:</span>
                <span className="font-medium">
                  {lastMetrics.device?.viewport?.width} x {lastMetrics.device?.viewport?.height}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pixel Ratio:</span>
                <span className="font-medium">{lastMetrics.device?.pixelRatio}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Métricas de Página</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">URL:</span>
                <span className="font-medium truncate max-w-xs">{lastMetrics.page?.url}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Título:</span>
                <span className="font-medium truncate max-w-xs">{lastMetrics.page?.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tiempo de Carga:</span>
                <span className="font-medium">{Math.round(lastMetrics.page?.loadTime || 0)}ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
