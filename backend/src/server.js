const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const path = require('path');
require('dotenv').config();

// Importar base de datos
const database = require('./config/database');

// Importar rutas
const authRoutes = require('./routes/auth-simple');
const questionnaireRoutes = require('./routes/questionnaires');
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

// Importar middlewares
// const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth-simple');
// const requestLogger = require('./middleware/requestLogger');

// Crear aplicación Express
const app = express();

// ========================================
// CONFIGURACIÓN DEL SERVIDOR
// ========================================

const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || '0.0.0.0';
const NODE_ENV = process.env.NODE_ENV || 'development';

// ========================================
// MIDDLEWARES DE SEGURIDAD
// ========================================

// Helmet para headers de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configurado
app.use(cors({
  origin: (origin, callback) => {
    const whitelist = [
      'http://localhost:3000',
      'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178',
      'https://reliable-cranachan-d0bee6.netlify.app', // Dominio de Netlify
      'https://*.netlify.app', // Todos los dominios de Netlify
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_ALT
    ].filter(Boolean);
    
    // Permitir requests sin origin (como Postman, curl, etc.)
    if (!origin) {
      return callback(null, true);
    }
    
    // Verificar si el origin está en la whitelist
    const isAllowed = whitelist.some(allowedOrigin => {
      if (allowedOrigin.includes('*')) {
        // Manejar wildcards como *.netlify.app
        const pattern = allowedOrigin.replace(/\*/g, '.*');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(origin);
      }
      return allowedOrigin === origin;
    });
    
    if (isAllowed) {
      return callback(null, true);
    }
    
    console.log(`🚫 CORS bloqueado para origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: process.env.RATE_LIMIT_MAX_REQUESTS || 100, // máximo 100 requests por ventana
  message: {
    error: 'Demasiadas solicitudes desde esta IP',
    message: 'Intenta de nuevo más tarde',
    retryAfter: Math.ceil(15 * 60 / 60) // en minutos
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
  skipFailedRequests: false
});

// Slow down para requests repetitivos
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutos
  delayAfter: 50, // permitir 50 requests por 15 minutos sin delay
  delayMs: () => 500, // agregar 500ms de delay por request después del límite
  maxDelayMs: 20000 // máximo 20 segundos de delay
});

// Aplicar limitadores
app.use('/api/', limiter);
app.use('/api/', speedLimiter);

// ========================================
// MIDDLEWARES DE PROCESAMIENTO
// ========================================

// Compresión gzip
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Logging con Morgan
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined', {
  stream: {
    write: (message) => {
      console.log(message.trim());
    }
  }
}));

// Parsear JSON y URL encoded
app.use(express.json({ 
  limit: process.env.BODY_LIMIT || '10mb',
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: process.env.BODY_LIMIT || '10mb' 
}));

// ========================================
// MIDDLEWARES PERSONALIZADOS
// ========================================

// Logger de requests
// app.use(requestLogger);

// ========================================
// RUTAS DE LA API
// ========================================

// Ruta de salud
app.get('/health', async (req, res) => {
  try {
    // Verificar conexión a la base de datos
    let dbStatus = 'disconnected';
    try {
      await database.query('SELECT 1 as test');
      dbStatus = 'connected';
    } catch (dbError) {
      dbStatus = 'error';
    }
    
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: NODE_ENV,
      version: '1.0.0',
      database: dbStatus,
      memory: process.memoryUsage(),
      platform: process.platform,
      nodeVersion: process.version
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Error checking health status',
      error: error.message
    });
  }
});

// Ruta de información del sistema
app.get('/system/info', async (req, res) => {
  try {
    // Obtener información básica del sistema
    const systemInfo = {
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      },
      database: {
        type: process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite',
        status: 'connected',
        url: process.env.DATABASE_URL ? 'Configurado' : 'No configurado'
      },
      environment: NODE_ENV,
      timestamp: new Date().toISOString()
    };
    
    res.json(systemInfo);
  } catch (error) {
    res.status(500).json({
      error: 'Error obteniendo información del sistema',
      message: error.message
    });
  }
});

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/questionnaires', questionnaireRoutes);
app.use('/api/contact', contactRoutes);
// app.use('/api/analytics', authMiddleware, analyticsRoutes);
// app.use('/api/system', authMiddleware, systemRoutes);

// ========================================
// MANEJO DE ERRORES
// ========================================

// Ruta no encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: 'Ruta no encontrada',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  });
});

// Middleware de manejo de errores
// app.use(errorHandler);

// ========================================
// INICIALIZACIÓN DEL SERVIDOR
// ========================================

let server;

async function startServer() {
  try {
    // Conectar a la base de datos
    console.log('🔌 Conectando a la base de datos...');
    console.log(`🌍 Entorno: ${NODE_ENV}`);
    console.log(`🐘 DATABASE_URL: ${process.env.DATABASE_URL ? 'Configurado' : 'No configurado'}`);
    
    // Para PostgreSQL, no necesitamos connect() explícito
    // Solo conectar si es SQLite (desarrollo)
    if (NODE_ENV === 'development' || !process.env.DATABASE_URL) {
      console.log('🔗 Conectando a SQLite...');
      await database.connect();
      console.log('✅ SQLite conectado exitosamente');
    } else {
      console.log('🐘 Usando PostgreSQL (producción)');
    }
    
    // Iniciar servidor
    server = app.listen(PORT, HOST, () => {
      console.log('🚀 Servidor backend iniciado exitosamente!');
      console.log(`📍 URL: http://${HOST}:${PORT}`);
      console.log(`🌍 Entorno: ${NODE_ENV}`);
      console.log(`⏰ Iniciado: ${new Date().toLocaleString('es-ES')}`);
      console.log(`📊 Health check: http://${HOST}:${PORT}/health`);
      console.log(`🔍 System info: http://${HOST}:${PORT}/system/info`);
    });

    // Manejo de señales de terminación
    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

    // Manejo de errores no capturados
    process.on('uncaughtException', (error) => {
      console.error('💥 Error no capturado:', error);
      gracefulShutdown();
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('💥 Promesa rechazada no manejada:', reason);
      gracefulShutdown();
    });

  } catch (error) {
    console.error('💥 Error iniciando servidor:', error);
    process.exit(1);
  }
}

async function gracefulShutdown() {
  // console.log('🛑 Señal de terminación recibida, cerrando servidor...');
  
  try {
    // Cerrar servidor HTTP
    if (server) {
      await new Promise((resolve) => {
        server.close(resolve);
      });
      // console.log('✅ Servidor HTTP cerrado');
    }

    // Cerrar conexión de base de datos
    if (database.end && typeof database.end === 'function') {
      await database.end();
      console.log('✅ Conexión de base de datos cerrada');
    }

    // console.log('🎉 Servidor cerrado correctamente');
    process.exit(0);
    
  } catch (error) {
    // console.error('💥 Error durante el cierre:', error);
    process.exit(1);
  }
}

// Iniciar servidor si se ejecuta directamente
if (require.main === module) {
  startServer();
}

// Ruta para verificar estado del pago
app.get('/api/payment/status', (req, res) => {
  const paymentStatus = {
    isPaid: false, // CAMBIAR A TRUE CUANDO PAGUEN
    amount: 25000,
    dueDate: '2024-01-31',
    projectName: 'Love on the Brain',
    developer: 'José Juan Pérez González',
    email: 'joseperezglz01@gmail.com',
    linkedin: 'https://www.linkedin.com/in/jose-juan-perez-gonzalez/',
    github: 'https://github.com/josewalke'
  };
  
  res.json(paymentStatus);
});

module.exports = { app, startServer, gracefulShutdown };
