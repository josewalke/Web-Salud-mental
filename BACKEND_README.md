# 🚀 BACKEND - Nueva Web Salud Mental

## 📋 **Descripción**
Configuración y documentación para el backend de la aplicación de salud mental.

## 🏗️ **Arquitectura Recomendada**

### **Stack Tecnológico:**
- **Runtime**: Node.js + Express
- **Base de datos**: PostgreSQL (principal) / MongoDB (alternativa)
- **Autenticación**: JWT + bcrypt
- **Validación**: Joi o Zod
- **ORM**: Prisma o Sequelize
- **Testing**: Jest + Supertest

### **Estructura de Carpetas:**
```
backend/
├── src/
│   ├── controllers/     # Lógica de negocio
│   ├── models/         # Modelos de datos
│   ├── routes/         # Definición de rutas
│   ├── middleware/     # Middlewares personalizados
│   ├── utils/          # Utilidades y helpers
│   └── config/         # Configuración
├── tests/              # Tests unitarios e integración
├── docs/               # Documentación de API
└── package.json
```

## ⚙️ **Configuración**

### **1. Instalación:**
```bash
# Crear carpeta del backend
mkdir backend
cd backend

# Inicializar proyecto
npm init -y

# Instalar dependencias básicas
npm install express cors helmet morgan dotenv
npm install pg prisma @prisma/client
npm install jsonwebtoken bcryptjs
npm install joi express-rate-limit

# Dependencias de desarrollo
npm install -D nodemon jest supertest
```

### **2. Variables de Entorno:**
```bash
# Copiar archivo de ejemplo
cp ../.env.example .env

# Configurar variables reales
DB_HOST=localhost
DB_PASSWORD=tu_password_real
JWT_SECRET=secret_super_seguro
```

### **3. Base de Datos:**
```sql
-- Crear base de datos
CREATE DATABASE salud_mental_db;

-- Tabla de usuarios (profesionales)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'professional',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de cuestionarios
CREATE TABLE questionnaires (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type VARCHAR(50) NOT NULL, -- 'pareja', 'personalidad'
  personal_info JSONB,
  answers JSONB,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔐 **Endpoints de la API**

### **Autenticación:**
```
POST /api/auth/login          # Login de profesional
POST /api/auth/register       # Registro de profesional
POST /api/auth/refresh        # Renovar token
```

### **Cuestionarios:**
```
GET    /api/questionnaires    # Listar cuestionarios del usuario
GET    /api/questionnaires/:id # Obtener cuestionario específico
POST   /api/questionnaires    # Crear nuevo cuestionario
PUT    /api/questionnaires/:id # Actualizar cuestionario
DELETE /api/questionnaires/:id # Eliminar cuestionario
```

### **Análisis:**
```
GET /api/analytics/summary    # Resumen estadístico
GET /api/analytics/export     # Exportar datos
GET /api/analytics/filter     # Filtrar por criterios
```

## 🚀 **Despliegue**

### **Local:**
```bash
npm run dev
# Servidor en http://localhost:3001
```

### **Producción:**
```bash
npm run build
npm start
# Servidor en puerto configurado por variable PORT
```

## 🔒 **Seguridad**

### **Implementado:**
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ Helmet para headers de seguridad
- ✅ Validación de entrada
- ✅ Encriptación de contraseñas
- ✅ JWT para autenticación

### **Recomendado:**
- 🔒 HTTPS en producción
- 🔒 Logs de auditoría
- 🔒 Backup automático de base de datos
- 🔒 Monitoreo de performance

## 📊 **Monitoreo**

### **Métricas a seguir:**
- Tiempo de respuesta de API
- Uso de memoria y CPU
- Errores y excepciones
- Uso de base de datos
- Usuarios activos

## 🧪 **Testing**

```bash
# Tests unitarios
npm run test

# Tests de integración
npm run test:integration

# Cobertura de código
npm run test:coverage
```

## 📚 **Recursos Adicionales**

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/)
- [JWT.io](https://jwt.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 🆘 **Soporte**

Para dudas sobre el backend, revisar:
1. Este README
2. Documentación de la API
3. Logs del servidor
4. Tests de integración

---

**⚠️ IMPORTANTE:** Nunca subir archivos `.env` o `backend-config.js` a Git. Solo usar los archivos `.example` como plantillas.
