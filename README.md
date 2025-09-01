# Love on the Brain - Página Web de Salud Mental 🧠💙

## 📋 Descripción del Proyecto

**Love on the Brain** es una página web moderna y completamente responsive para una empresa psico-social española especializada en servicios de salud mental y crecimiento personal con presupuestos amigables. El proyecto está construido con React, TypeScript y Tailwind CSS v4, optimizado para máximo rendimiento y SEO.

### 🎯 Mensaje Principal
**"El cerebro también se puede acariciar"** - Servicios de salud mental sin juicios, inclusivos y accesibles.

## ✨ Características Principales

### 🚀 Rendimiento Ultra-Optimizado
- **Lazy Loading**: Componentes no críticos cargados bajo demanda
- **Code Splitting**: Chunks optimizados para first paint
- **Mobile Performance**: Cero lag en dispositivos móviles y tablets
- **Desktop Enhancement**: Fondo animado CSS puro solo en desktop
- **SEO Avanzado**: Meta tags, structured data y optimización para IA

### 📱 Experiencia Responsive
- **Mobile First**: Diseño optimizado para móviles
- **Tablet Friendly**: Experiencia perfecta en tablets
- **Desktop Enhanced**: Animaciones y efectos visuales avanzados
- **Touch Optimized**: Interacciones táctiles optimizadas

### 🎨 Interfaz y Diseño
- **Paleta de Colores**: Blanco y azules (#2563eb, #3b82f6, etc.)
- **Tipografía Optimizada**: Sistema tipográfico coherente
- **Animaciones Inteligentes**: Deshabilitadas en móvil, elegantes en desktop
- **Glassmorphism**: Efectos de vidrio y transparencias sutiles

### 🧠 Funcionalidades Específicas
- **Cuestionarios Psicológicos**: 
  - Cuestionario de Pareja (17 preguntas)
  - Cuestionario de Personalidad Carl Jung (64 preguntas)
- **Navegación Suave**: Scroll entre secciones optimizado
- **Formularios Validados**: Información personal completa
- **Auto-avance Inteligente**: En preguntas de radio button (500ms delay)

## 🛠️ Stack Tecnológico

### Frontend
- **React 18+** con TypeScript
- **Tailwind CSS v4** con diseño custom
- **Shadcn/ui** para componentes base
- **Lucide React** para iconografía
- **Vite** como bundler (inferido del lazy loading)

### Optimizaciones
- **Custom Hooks**: `useDeviceDetection` para responsive behavior
- **Memoización**: useMemo y useCallback para evitar re-renders
- **Suspense Boundaries**: Manejo elegante de estados de carga
- **CSS Containment**: Optimización de layout y paint

### SEO y Analytics
- **Meta Tags Avanzados**: Descripción, keywords, geo-targeting
- **Open Graph**: Optimizado para redes sociales
- **Structured Data**: JSON-LD para buscadores y IA
- **Canonical URLs**: URLs canónicas dinámicas
- **Hreflang**: Configuración para España (es-ES)

## 📂 Estructura del Proyecto

```
├── App.tsx                 # Componente principal con routing
├── components/             # Componentes React
│   ├── Header.tsx         # Header responsive con navegación
│   ├── HeroSection.tsx    # Sección hero principal
│   ├── ServicesSection.tsx # Servicios de salud mental
│   ├── PacksSection.tsx   # Packs de crecimiento personal
│   ├── QuestionnaireSection.tsx # Sección de cuestionarios
│   ├── QuestionairePage.tsx # Páginas de cuestionarios completos
│   ├── FAQSection.tsx     # Preguntas frecuentes
│   ├── ContactSection.tsx # Información de contacto
│   ├── Footer.tsx         # Footer con enlaces
│   ├── SplineBackground.tsx # Fondo animado CSS (desktop only)
│   ├── figma/             # Componentes específicos de Figma
│   └── ui/                # Componentes UI de Shadcn
│       ├── use-device-detection.ts # Hook para detección de dispositivo
│       └── [otros componentes UI]
├── styles/
│   └── globals.css        # Estilos globales Tailwind v4 optimizados
└── guidelines/
    └── Guidelines.md      # Guías de desarrollo del proyecto
```

## 🚦 Primeros Pasos

### Prerrequisitos
- **Node.js** 18+ 
- **npm** o **yarn** o **pnpm**
- **Git**

### 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone [URL_DEL_REPOSITORIO]
cd love-on-the-brain
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Variables de entorno** (si aplica)
```bash
cp .env.example .env.local
# Editar .env.local con las configuraciones necesarias
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Abrir en navegador**
```
http://localhost:3000
```

## 🎮 Comandos Disponibles

### Desarrollo
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting del código
npm run type-check   # Verificación de tipos TypeScript
```

### Testing (si configurado)
```bash
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:coverage # Coverage de tests
```

## 📱 Optimizaciones de Rendimiento

### Mobile Performance
- **Fondo 3D deshabilitado**: SplineBackground no se carga en móviles
- **Animaciones reducidas**: Solo animaciones esenciales en dispositivos móviles
- **Will-change optimizado**: Solo en elementos que realmente animan
- **Touch-action**: Optimizado para interacciones táctiles
- **Text-shadows eliminados**: Mejor performance en móvil

### Desktop Enhancement
- **Fondo CSS animado**: Círculos flotantes y partículas sutiles
- **Glassmorphism effects**: Backdrop-filter y transparencias
- **Hardware acceleration**: Transform3d para GPU acceleration
- **Smooth animations**: 60fps consistente en desktop

### Loading Strategy
- **Critical Path**: Header y HeroSection cargan inmediatamente
- **Lazy Sections**: Resto de secciones con Suspense
- **Progressive Enhancement**: Funcionalidad base + mejoras progresivas
- **Code Splitting**: Chunks optimizados por ruta

## 🔍 SEO y Accesibilidad

### SEO Técnico
- **Meta description**: Optimizada para salud mental España
- **Keywords strategy**: "salud mental España", "crecimiento personal", etc.
- **Structured data**: Organization, LocalBusiness, FAQPage
- **Canonical URLs**: URLs canónicas automáticas
- **Sitemap ready**: Estructura preparada para sitemap.xml

### Accesibilidad
- **ARIA labels**: En botones y navegación
- **Semantic HTML**: Estructura semántica correcta
- **Focus management**: Navegación por teclado
- **Color contrast**: Cumple WCAG 2.1 AA
- **Reduced motion**: Respeta prefers-reduced-motion

## 🎨 Sistema de Diseño

### Colores Principales
```css
--primary: #2563eb      /* Azul principal */
--secondary: #f1f5f9    /* Gris claro */
--accent: #dbeafe       /* Azul claro */
--background: #ffffff   /* Blanco */
--foreground: #1e293b   /* Gris oscuro */
```

### Tipografía
- **Base font-size**: 14px
- **Font weights**: 400 (normal), 500 (medium)
- **Line height**: 1.5 consistente
- **Responsive scaling**: Automático por dispositivo

### Componentes Clave
- **Cards enhanced**: Con glassmorphism effect
- **Buttons enhanced**: Con hover animations
- **Inputs enhanced**: Con focus states optimizados
- **Features enhanced**: Cards de características con hover

## 📊 Cuestionarios

### Cuestionario de Pareja
- **17 preguntas** validadas por psicólogos
- **Campos personales**: Nombre, apellidos, edad, género, email, orientación sexual
- **Tipos de respuesta**: Radio buttons, checkboxes, textarea
- **Auto-avance**: 500ms en preguntas de opción múltiple

### Cuestionario de Personalidad (Carl Jung)
- **64 preguntas** del test Carl Jung
- **Respuestas**: Sí/No/A veces
- **Auto-avance inteligente**: Solo en radio buttons
- **Navegación manual**: Botón "Siguiente" en preguntas complejas

## 🚀 Deployment

### Build de Producción
```bash
npm run build
```

### Optimizaciones de Build
- **Tree shaking**: Código no utilizado eliminado
- **Asset optimization**: Imágenes y assets optimizados
- **Gzip compression**: Compresión automática
- **Cache headers**: Headers de cache optimizados

### Hosting Recomendado
- **Vercel**: Configuración automática con React
- **Netlify**: Deploy automático desde Git
- **Cloudflare Pages**: CDN global integrado
- **Traditional hosting**: Cualquier servidor que sirva archivos estáticos

## 🔧 Configuración de Desarrollo

### VSCode Extensions Recomendadas
- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Prettier**
- **ESLint**

### Configuración de Cursor
1. **Instalar extensiones** recomendadas
2. **Configurar Prettier** para formateo automático
3. **Habilitar TypeScript** strict mode
4. **Configurar Auto Save** en modificación de archivos

## 🐛 Troubleshooting

### Problemas Comunes

#### 1. Build Errors
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

#### 2. Tailwind no funciona
- Verificar que `globals.css` esté importado en el archivo principal
- Comprobar configuración de Tailwind v4 en `globals.css`

#### 3. Lazy Loading Issues
- Verificar que los componentes estén exportados como default
- Comprobar que Suspense boundaries estén configurados

#### 4. Performance Issues
- Usar React DevTools Profiler
- Verificar que `useDeviceDetection` esté funcionando
- Comprobar que animaciones estén deshabilitadas en móvil

## 🤝 Contribución

### Estilo de Código
- **Prettier** para formateo automático
- **ESLint** para linting
- **TypeScript strict** mode habilitado
- **Naming convention**: camelCase para variables, PascalCase para componentes

### Pull Request Process
1. **Fork** del repositorio
2. **Crear branch** desde `main`
3. **Commit changes** con mensajes descriptivos
4. **Test** localmente antes de PR
5. **Submit PR** con descripción detallada

## 📞 Contacto y Soporte

### Información del Proyecto
- **Empresa**: Love on the Brain
- **Email**: elcerebrotambienseacaricia@gmail.com
- **Enfoque**: Salud mental y crecimiento personal sin juicios
- **Ubicación**: España

### Soporte Técnico
Para issues técnicos, crear un ticket en el sistema de issues del repositorio con:
- **Descripción del problema**
- **Pasos para reproducir**
- **Screenshots** si aplica
- **Información del entorno** (browser, OS, device)

---

## 🎯 Notas Importantes para Cursor

### Desarrollo Local
1. **Siempre usar TypeScript** - El proyecto está completamente tipado
2. **Seguir las Guidelines** - Consultar `/guidelines/Guidelines.md`
3. **Performance First** - Priorizar rendimiento en móviles
4. **Responsive Design** - Siempre probar en diferentes dispositivos
5. **SEO Awareness** - Mantener optimizaciones SEO existentes

### Modificaciones Seguras
- ✅ **Componentes individuales** - Modificar componentes específicos
- ✅ **Estilos CSS** - Agregar/modificar clases en `globals.css`
- ✅ **Nuevas secciones** - Agregar secciones siguiendo el patrón lazy loading
- ❌ **SEO meta tags** - No modificar sin consultar
- ❌ **Performance optimizations** - No eliminar optimizaciones existentes

**¡Listo para desarrollar! 🚀**

Esta web está diseñada para ofrecer la mejor experiencia posible tanto en móviles como en desktop, manteniendo siempre el mensaje de inclusión y cuidado emocional de Love on the Brain.# Render Deployment Fix
