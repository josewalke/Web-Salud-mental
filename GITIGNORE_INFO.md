# 📋 **Información sobre los archivos .gitignore**

## 🎯 **Estructura de .gitignore**

El proyecto ahora tiene **dos archivos .gitignore separados** para mantener una mejor organización:

### 📁 **Frontend (.gitignore en la raíz)**
**Ubicación:** `/.gitignore`
**Tecnologías:** React + Vite + TypeScript

#### **Incluye:**
- ✅ **Dependencias:** `node_modules/`, `.pnp`
- ✅ **Build:** `dist/`, `build/`, `dist-ssr/`
- ✅ **Desarrollo:** `.vite/`, `.cache/`, `.parcel-cache/`
- ✅ **Variables de entorno:** `.env*`
- ✅ **Logs:** `*.log`, `logs/`
- ✅ **Editores:** `.vscode/*`, `.idea/`, etc.
- ✅ **Sistema operativo:** `.DS_Store`, `Thumbs.db`
- ✅ **Cache:** `.eslintcache`, `.prettiercache`, `*.tsbuildinfo`
- ✅ **Testing:** `coverage/`, `.nyc_output/`
- ✅ **Deployment:** `.netlify/`, `.vercel/`
- ✅ **Específico del proyecto:** uploads, backups, etc.

### 🖥️ **Backend (.gitignore específico)**
**Ubicación:** `/backend/.gitignore`
**Tecnologías:** Node.js + Express + SQLite

#### **Incluye:**
- ✅ **Dependencias:** `node_modules/`
- ✅ **Base de datos:** `*.sqlite*`, `*.db*`, archivos SQLite
- ✅ **Configuración sensible:** `.env*`, `*-config.js`
- ✅ **Logs:** `*.log`, `logs/`, `server.log`
- ✅ **Uploads:** `uploads/`, `media/`, `files/`
- ✅ **Cache:** `.cache/`, `sessions/`
- ✅ **Seguridad:** `*.key`, `*.pem`, `secrets/`
- ✅ **Testing:** `coverage/`, `test.db`
- ✅ **Deployment:** build artifacts, docker files
- ✅ **Monitoreo:** `*.prof`, `*.heapdump`

## 🔧 **Comandos útiles**

### **Ver archivos ignorados:**
```bash
git status --ignored
```

### **Forzar añadir un archivo ignorado:**
```bash
git add -f archivo-ignorado.txt
```

### **Verificar si un archivo está siendo ignorado:**
```bash
git check-ignore archivo.txt
```

### **Ver qué regla está ignorando un archivo:**
```bash
git check-ignore -v archivo.txt
```

## 📂 **Estructura recomendada para desarrollo**

```
NuevaWebSaludMental/
├── .gitignore                 # Frontend (React/Vite)
├── package.json               # Frontend dependencies
├── src/                       # Frontend source code
├── public/                    # Frontend assets
├── dist/                      # Frontend build (ignored)
├── node_modules/              # Frontend deps (ignored)
│
└── backend/
    ├── .gitignore            # Backend específico (Node.js)
    ├── package.json          # Backend dependencies
    ├── src/                  # Backend source code
    ├── database.sqlite       # Database (ignored)
    ├── .env                  # Environment vars (ignored)
    ├── logs/                 # Logs (ignored)
    └── node_modules/         # Backend deps (ignored)
```

## 🚨 **Archivos importantes a NUNCA ignorar**

### **Frontend:**
- ✅ `package.json` y `package-lock.json`
- ✅ `vite.config.ts`, `tsconfig.json`
- ✅ `index.html`
- ✅ Todo el código fuente en `src/`
- ✅ Assets en `public/` (excepto uploads dinámicos)

### **Backend:**
- ✅ `package.json` y `package-lock.json`
- ✅ Todo el código fuente en `src/`
- ✅ Migraciones de base de datos
- ✅ Configuraciones públicas
- ✅ Documentación

## 🔐 **Archivos sensibles SIEMPRE ignorados**

### **Frontend:**
- ❌ `.env*` (variables de entorno)
- ❌ `dist/` (builds de producción)
- ❌ `node_modules/` (dependencias)

### **Backend:**
- ❌ `.env*` (variables de entorno)
- ❌ `database.sqlite*` (archivos de base de datos)
- ❌ `logs/` (archivos de logs)
- ❌ `uploads/` (archivos subidos por usuarios)
- ❌ `*.key`, `*.pem` (certificados y claves)
- ❌ `node_modules/` (dependencias)

## 📝 **Notas importantes**

1. **Separación clara:** Frontend y Backend tienen sus propios `.gitignore`
2. **No se mezclan:** Las reglas están separadas por contexto
3. **Seguridad:** Archivos sensibles están protegidos
4. **Rendimiento:** Se ignoran archivos grandes y temporales
5. **Colaboración:** Facilita el trabajo en equipo

## 🛠️ **Personalización**

Si necesitas modificar las reglas:

1. **Para frontend:** Edita `/.gitignore`
2. **Para backend:** Edita `/backend/.gitignore`
3. **Siempre comenta** el propósito de nuevas reglas
4. **Prueba** con `git status --ignored` después de cambios

## 🎯 **Beneficios de esta estructura**

- ✅ **Organización clara** entre frontend y backend
- ✅ **Seguridad mejorada** con archivos sensibles protegidos
- ✅ **Rendimiento** al evitar archivos innecesarios
- ✅ **Colaboración** más fácil en equipo
- ✅ **Deployment** más limpio y rápido
- ✅ **Mantenimiento** simplificado
