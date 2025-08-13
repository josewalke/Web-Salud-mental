# 🎨 Sistema de Estilos CSS

Este directorio contiene todos los archivos CSS organizados para trabajar mejor con los estilos de la aplicación.

## 📁 Estructura de Archivos

```
src/styles/
├── variables.css          # Variables CSS globales y temas
├── main.css              # Estilos principales e imports
└── README.md             # Este archivo

src/components/
├── Header.css            # Estilos específicos del Header
├── Navigation.css        # Estilos específicos del Navigation
└── ...                   # Otros componentes
```

## 🚀 Cómo Usar

### 1. Importar en el componente principal

En tu `index.tsx` o `App.tsx`, importa el archivo principal:

```typescript
import './styles/main.css';
```

### 2. Usar variables CSS en componentes

```css
/* En cualquier archivo CSS */
.my-component {
  background-color: var(--primary);
  color: var(--text-primary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-4);
}
```

### 3. Usar clases utilitarias

```html
<div class="btn btn-primary animate-fade-in">
  Botón con estilos predefinidos
</div>
```

## 🎯 Archivos Principales

### `variables.css`
- **Variables CSS globales** para colores, espaciado, tipografía
- **Sistema de temas** (light/dark/high contrast)
- **Breakpoints responsive** predefinidos
- **Paleta de colores** completa

### `main.css`
- **Estilos globales** y reset básico
- **Clases utilitarias** comunes
- **Imports** de todos los componentes
- **Sistema de botones** y formularios

### `Header.css`
- **Estilos específicos** del componente Header
- **Responsive design** para logo y navegación
- **Animaciones** y transiciones

### `Navigation.css`
- **Estilos del menú móvil** y desktop
- **Animaciones** del dropdown
- **Estados hover** y focus

## 🎨 Sistema de Colores

### Colores Principales
```css
--primary: #2563eb;        /* Azul principal */
--primary-light: #3b82f6;  /* Azul claro */
--primary-dark: #1d4ed8;   /* Azul oscuro */
```

### Colores Semánticos
```css
--success: #16a34a;        /* Verde éxito */
--error: #dc2626;          /* Rojo error */
--warning: #d97706;        /* Amarillo advertencia */
--info: #3b82f6;          /* Azul información */
```

## 📱 Breakpoints Responsive

```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

## 🔧 Clases Utilitarias

### Espaciado
```css
.space-1 { padding: var(--space-1); }    /* 4px */
.space-2 { padding: var(--space-2); }    /* 8px */
.space-4 { padding: var(--space-4); }    /* 16px */
.space-8 { padding: var(--space-8); }    /* 32px */
```

### Sombras
```css
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }
```

### Bordes
```css
.rounded { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
```

## 🌙 Temas

### Tema Claro (Default)
- Colores claros y legibles
- Sombras sutiles
- Alto contraste

### Tema Oscuro
```css
@media (prefers-color-scheme: dark) {
  /* Se aplica automáticamente */
}
```

### Alto Contraste
```css
@media (prefers-contrast: high) {
  /* Para accesibilidad */
}
```

## ♿ Accesibilidad

### Reducción de Movimiento
```css
@media (prefers-reduced-motion: reduce) {
  /* Desactiva animaciones */
}
```

### Colores de Alto Contraste
- Cumple con estándares WCAG
- Soporte para modo oscuro del sistema
- Variables CSS para fácil personalización

## 🛠️ Personalización

### 1. Cambiar Colores Principales
Edita `variables.css`:
```css
:root {
  --primary: #your-color;
  --primary-light: #your-light-color;
  --primary-dark: #your-dark-color;
}
```

### 2. Agregar Nuevos Componentes
Crea `ComponentName.css` y agrégalo a `main.css`:
```css
@import url('../components/ComponentName.css');
```

### 3. Extender Variables
```css
:root {
  --custom-spacing: 2.5rem;
  --custom-radius: 1.25rem;
}
```

## 📚 Recursos Adicionales

- **CSS Variables**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- **CSS Grid**: [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- **Flexbox**: [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- **CSS Custom Properties**: [CSS Custom Properties](https://css-tricks.com/guides/css-custom-properties/)

## 🤝 Contribuir

1. Mantén la consistencia con las variables existentes
2. Usa las clases utilitarias cuando sea posible
3. Documenta nuevos estilos
4. Prueba en diferentes temas y dispositivos
5. Sigue las convenciones de nomenclatura

---

**Nota**: Este sistema está diseñado para ser escalable y mantenible. Usa las variables CSS y clases utilitarias para mantener la consistencia en toda la aplicación.
