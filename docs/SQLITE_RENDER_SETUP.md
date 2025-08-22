# 🗃️ **Configuración SQLite para Render**

## ⚠️ **IMPORTANTE: Limitaciones de SQLite en Render**

SQLite en Render tiene limitaciones importantes:
- 📁 **Sistema de archivos efímero** - Se borra con cada deploy
- 🔄 **No persistencia** - Datos se pierden al reiniciar
- 📊 **No backups automáticos**

## 🛠️ **Configuraciones necesarias:**

### **1. Crear directorio de datos persistente:**
```javascript
// En src/database/connection.js
const path = require('path');
const fs = require('fs');

// Crear directorio si no existe
const dbDir = process.env.DATABASE_PATH || './data';
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'database.sqlite');
```

### **2. Variables de entorno para Render:**
```
DATABASE_PATH=/opt/render/project/data
NODE_ENV=production
PORT=10000
```

### **3. Script de inicialización:**
```javascript
// En package.json
{
  "scripts": {
    "start": "node scripts/init-db.js && node src/server.js",
    "build": "npm install && node scripts/setup-db.js"
  }
}
```

### **4. Script de setup de DB:**
```javascript
// scripts/setup-db.js
const database = require('../src/database/connection');

async function setupDatabase() {
  try {
    await database.connect();
    console.log('✅ Database initialized for Render');
    await database.close();
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupDatabase();
```

## 🚨 **Problemas que seguirán existiendo:**

1. **Datos se pierden** con cada deploy
2. **No backups** automáticos
3. **Performance** limitado para múltiples usuarios
4. **No escalable** horizontalmente

## ✅ **Migración recomendada a PostgreSQL:**

### **Ventajas de PostgreSQL en Render:**
- ✅ **Persistencia garantizada**
- ✅ **Backups automáticos**
- ✅ **Escalabilidad**
- ✅ **Plan gratuito** (1GB)
- ✅ **SQL compatible** (migración fácil)

### **Configuración PostgreSQL:**
```javascript
// En src/database/connection.js
const DATABASE_URL = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'production' && DATABASE_URL) {
  // Usar PostgreSQL en producción
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
} else {
  // Usar SQLite en desarrollo
  const sqlite3 = require('sqlite3');
  // ... configuración SQLite
}
```

## 🎯 **Recomendación final:**

Para **producción en Render**, es altamente recomendable usar **PostgreSQL** en lugar de SQLite para garantizar la persistencia y escalabilidad de los datos.
