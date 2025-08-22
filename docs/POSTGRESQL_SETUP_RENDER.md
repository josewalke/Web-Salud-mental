# 🐘 **Configuración PostgreSQL en Render**

## 📋 **Paso a paso:**

### **1. Crear base de datos en Render:**
1. Ve a [render.com](https://render.com)
2. Click en **"New +"**
3. Selecciona **"PostgreSQL"**
4. Configura:
   ```
   Name: webSaludMental-db
   Region: Oregon (US West)
   PostgreSQL Version: 15
   Plan Type: Free
   ```
5. Click **"Create Database"**

### **2. Obtener credenciales:**
Una vez creada, copia:
```bash
Database URL: postgresql://user:pass@host:port/db
Host: xxx-xxx.render.com
Port: 5432
Database: xxx
Username: xxx
Password: xxx
```

### **3. Instalar dependencias:**
```bash
npm install pg
npm install --save-dev @types/pg  # Si usas TypeScript
```

### **4. Configurar conexión en tu proyecto:**
```javascript
// src/config/database.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;
```

### **5. Variables de entorno:**
En Render Web Service, agrega:
```
DATABASE_URL=postgresql://user:pass@host:port/db
NODE_ENV=production
```

### **6. Crear tablas (migración):**
```javascript
// scripts/migrate.js
const pool = require('../src/config/database');

const createTables = async () => {
  const client = await pool.connect();
  
  try {
    // Tabla de usuarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabla de cuestionarios
    await client.query(`
      CREATE TABLE IF NOT EXISTS questionnaires (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        type VARCHAR(100) NOT NULL,
        answers JSONB NOT NULL,
        personal_info JSONB,
        compatibility_results JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Índices para mejor performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_questionnaires_user_id ON questionnaires(user_id);
      CREATE INDEX IF NOT EXISTS idx_questionnaires_type ON questionnaires(type);
      CREATE INDEX IF NOT EXISTS idx_questionnaires_created_at ON questionnaires(created_at);
    `);

    console.log('✅ Tablas creadas exitosamente');
  } catch (error) {
    console.error('❌ Error creando tablas:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Ejecutar migración
createTables()
  .then(() => {
    console.log('🎉 Migración completada');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error en migración:', error);
    process.exit(1);
  });
```

### **7. Actualizar package.json:**
```json
{
  "scripts": {
    "migrate": "node scripts/migrate.js",
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### **8. Ejecutar migración:**
```bash
# Local (para probar)
DATABASE_URL="tu_database_url_local" npm run migrate

# En Render se ejecutará automáticamente
```

## 🔗 **URLs útiles:**
- 📊 **Dashboard:** render.com/dashboard
- 📝 **Docs:** render.com/docs/databases
- 🛠️ **Connection:** render.com/docs/connect-to-postgresql

## ✅ **Ventajas de esta configuración:**
1. **Datos persistentes** ✅
2. **Backups automáticos** ✅
3. **SSL incluido** ✅
4. **Escalable** ✅
5. **Plan gratuito** ✅
