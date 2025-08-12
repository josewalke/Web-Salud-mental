# 🚀 Guía de Despliegue en Netlify

## 📋 **Configuración Completa para Producción**

### **🎯 Objetivo:**
- **Frontend**: Desplegado en Netlify (accesible desde cualquier dispositivo)
- **Backend**: Ejecutándose en tu ordenador local
- **Comunicación**: Netlify → Tu ordenador (port forwarding)

---

## 🔧 **PASO 1: Configurar Port Forwarding en tu Router**

### **1.1 Acceder a tu Router:**
- Abre tu navegador
- Ve a: `192.168.1.1` o `192.168.0.1` (o la IP de tu router)
- Usuario/Contraseña: Los que vienen con tu router

### **1.2 Configurar Port Forwarding:**
- Busca: **"Port Forwarding"** o **"Virtual Server"**
- Agrega nueva regla:
  ```
  Protocolo: TCP
  Puerto externo: 5001
  Puerto interno: 5001
  IP interna: [IP de tu ordenador]
  Descripción: Web-Salud-Mental Backend
  ```

### **1.3 Verificar tu IP interna:**
```bash
# En macOS/Linux:
ifconfig | grep "inet " | grep -v 127.0.0.1

# En Windows:
ipconfig | findstr "IPv4"
```

---

## 🌐 **PASO 2: Configurar Variables de Entorno en Netlify**

### **2.1 En tu dashboard de Netlify:**
- Ve a tu proyecto
- **Site settings** → **Environment variables**
- Agrega:
  ```
  Key: REACT_APP_BACKEND_URL
  Value: http://92.186.17.227:5001
  ```

### **2.2 Verificar configuración:**
- **Build settings** → **Environment variables**
- Debe aparecer la variable configurada

---

## 🚀 **PASO 3: Desplegar en Netlify**

### **3.1 Opción A: Desde GitHub (Recomendado):**
```bash
# 1. Subir cambios a GitHub
git add .
git commit -m "Configuración para Netlify"
git push origin main

# 2. Conectar Netlify a tu repo
# 3. Configurar build settings:
#    - Build command: npm run build
#    - Publish directory: build
```

### **3.2 Opción B: Drag & Drop:**
```bash
# 1. Construir la aplicación
npm run build

# 2. Arrastrar la carpeta 'build' a Netlify
```

---

## ✅ **PASO 4: Verificar Funcionamiento**

### **4.1 Verificar Backend:**
```bash
# En tu ordenador:
cd backend
npm run dev

# Verificar que esté funcionando:
curl http://localhost:5001/api/health
```

### **4.2 Verificar Port Forwarding:**
```bash
# Desde otro dispositivo o internet:
curl http://92.186.17.227:5001/api/health
```

### **4.3 Verificar Netlify:**
- Tu app debe estar disponible en: `https://tu-app.netlify.app`
- Debe poder comunicarse con tu backend

---

## 📱 **PASO 5: Probar en Móvil**

### **5.1 Acceder desde móvil:**
- Abre tu navegador móvil
- Ve a: `https://tu-app.netlify.app`
- Usa la aplicación normalmente

### **5.2 Verificar tracking:**
- Todas las acciones se enviarán a tu backend
- Los datos aparecerán en tu dashboard local

---

## 🔍 **PASO 6: Monitorear y Analizar**

### **6.1 Dashboard local:**
```bash
# En tu ordenador:
http://localhost:3000/user-tracking
```

### **6.2 Datos en tiempo real:**
- Todas las acciones de usuarios reales
- Métricas de rendimiento
- Patrones de comportamiento

### **6.3 Exportar datos:**
```bash
# Desde tu backend:
curl http://localhost:5001/api/analytics/export-json > analytics-production.json
```

---

## 🚨 **SOLUCIÓN DE PROBLEMAS**

### **Problema: Netlify no puede conectar con tu backend**
```bash
# 1. Verificar que el backend esté ejecutándose
cd backend && npm run dev

# 2. Verificar port forwarding
# 3. Verificar firewall
# 4. Probar conexión externa
```

### **Problema: CORS errors**
```bash
# 1. Verificar configuración CORS en backend
# 2. Reiniciar backend después de cambios
# 3. Verificar que la URL esté en allowedOrigins
```

### **Problema: Variables de entorno no funcionan**
```bash
# 1. Verificar en Netlify dashboard
# 2. Hacer nuevo deploy
# 3. Verificar que NODE_ENV=production
```

---

## 📊 **ESTRUCTURA FINAL:**

```
🌐 Internet
    ↓
📱 Usuarios (móvil, tablet, PC)
    ↓
🚀 Netlify (Frontend)
    ↓
🔌 Port Forwarding (Puerto 5001)
    ↓
💻 Tu Ordenador (Backend + Dashboard)
    ↓
📊 Datos de Usuarios Reales
```

---

## 🎉 **¡LISTO!**

**Tu aplicación ahora:**
- ✅ **Funciona en cualquier dispositivo** (móvil, tablet, PC)
- ✅ **Recopila datos reales** de usuarios
- ✅ **Mantiene el backend** en tu ordenador
- ✅ **Permite análisis completo** de comportamiento
- ✅ **Escalable** para producción

**¡Disfruta analizando el comportamiento real de tus usuarios!** 🚀✨
