# 📁 Carpeta de Imágenes

Esta carpeta contiene todas las imágenes utilizadas en la aplicación web "Love on the Brain".

## 🗂️ Estructura de Carpetas

```
src/assets/images/
├── logos/          # Logos de la empresa y elementos de marca
├── backgrounds/    # Imágenes de fondo y texturas
├── services/       # Imágenes relacionadas con los servicios/packs
├── ui/            # Iconos, botones y elementos de interfaz
└── README.md      # Este archivo
```

## 📋 Tipos de Imágenes

### 🏷️ **logos/**
- Logo principal de "Love on the Brain"
- Variantes del logo (horizontal, vertical, icono)
- Elementos de marca y branding

### 🎨 **backgrounds/**
- Imágenes de fondo para secciones
- Texturas y patrones
- Gradientes y overlays

### 🎁 **services/**
- Imágenes representativas de cada pack:
  - Crecimiento Personal
  - Parejas
  - Amistades
  - Parejas ya Formadas
- Imágenes de actividades y dinámicas

### 🖥️ **ui/**
- Iconos personalizados
- Botones y elementos interactivos
- Placeholders y fallbacks

## 🚀 Cómo Usar

### **Importar una imagen:**
```typescript
import logoImage from '../assets/images/logos/logo-main.png';
import serviceImage from '../assets/images/services/crecimiento-personal.jpg';
```

### **Usar en componentes:**
```tsx
<img src={logoImage} alt="Love on the Brain Logo" />
<ImageWithFallback src={serviceImage} alt="Crecimiento Personal" />
```

## 📏 Especificaciones Recomendadas

### **Logos:**
- **Formato**: SVG (preferido) o PNG con transparencia
- **Resolución**: Mínimo 2x para pantallas de alta densidad
- **Tamaño**: Optimizado para web (máximo 500KB)

### **Imágenes de Servicios:**
- **Formato**: WebP o JPEG optimizado
- **Resolución**: 1080x720px (16:9) o 1200x800px
- **Tamaño**: Máximo 300KB por imagen

### **Imágenes de Fondo:**
- **Formato**: JPEG optimizado
- **Resolución**: 1920x1080px mínimo
- **Tamaño**: Máximo 500KB

## 🎯 Optimización

- **WebP**: Usar cuando sea posible para mejor compresión
- **Lazy Loading**: Implementar para imágenes grandes
- **Responsive**: Proporcionar múltiples tamaños cuando sea necesario
- **Alt Text**: Siempre incluir texto alternativo descriptivo

## 📝 Notas

- Mantener nombres de archivo descriptivos y en minúsculas
- Usar guiones medios (-) en lugar de espacios
- Organizar las imágenes por categoría para fácil mantenimiento
- Verificar que las imágenes tengan licencias apropiadas para uso comercial
