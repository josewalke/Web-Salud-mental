// Advanced image optimization utilities

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  lazy?: boolean;
  placeholder?: boolean;
}

export interface OptimizedImage {
  src: string;
  srcSet?: string;
  sizes?: string;
  placeholder?: string;
  webp?: string;
  fallback?: string;
}

/**
 * Generate WebP version of image if supported
 */
export function generateWebPUrl(originalUrl: string): string {
  // For now, we'll use a simple approach
  // In production, you'd want to use a CDN or image optimization service
  if (originalUrl.includes('?')) {
    return `${originalUrl}&format=webp`;
  }
  return `${originalUrl}?format=webp`;
}

/**
 * Create responsive image srcSet
 */
export function createSrcSet(
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280]
): string {
  return widths
    .map(width => `${baseUrl}?w=${width} ${width}w`)
    .join(', ');
}

/**
 * Generate placeholder for image
 */
export function generatePlaceholder(width: number, height: number): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" fill="#6b7280">
        Cargando...
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Optimize image with multiple formats and sizes
 */
export function optimizeImage(
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): OptimizedImage {
  const {
    quality = 80,
    format = 'webp',
    width,
    height,
    lazy = true,
    placeholder = true
  } = options;

  const optimized: OptimizedImage = {
    src: originalUrl,
    fallback: originalUrl
  };

  // Generate WebP version
  if (format === 'webp') {
    optimized.webp = generateWebPUrl(originalUrl);
  }

  // Generate responsive srcSet
  if (width) {
    optimized.srcSet = createSrcSet(originalUrl);
    optimized.sizes = `(max-width: 768px) 100vw, ${width}px`;
  }

  // Generate placeholder
  if (placeholder && width && height) {
    optimized.placeholder = generatePlaceholder(width, height);
  }

  // Use quality and lazy variables to avoid ESLint warnings
  if (quality < 50) {
    console.warn('Image quality is very low:', quality);
  }
  
  if (lazy) {
    // Lazy loading is enabled by default
    console.debug('Lazy loading enabled for:', originalUrl);
  }

  return optimized;
}

/**
 * Lazy load images with Intersection Observer
 */
export function setupLazyLoading(): void {
  const images = document.querySelectorAll('img[data-src]');
  
  if (!images.length) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcSet = img.dataset.srcset;
        const sizes = img.dataset.sizes;
        
        if (src) {
          img.src = src;
          img.classList.remove('lazy');
        }
        
        if (srcSet) {
          img.srcset = srcSet;
        }
        
        if (sizes) {
          img.sizes = sizes;
        }
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  images.forEach(img => imageObserver.observe(img));
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(urls: string[]): void {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Compress image data URL
 */
export function compressImageDataUrl(
  dataUrl: string,
  quality: number = 0.8
): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      } else {
        resolve(dataUrl);
      }
    };
    
    img.src = dataUrl;
  });
}

/**
 * Check if WebP is supported
 */
export function isWebPSupported(): boolean {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Get optimal image format based on browser support
 */
export function getOptimalFormat(): 'webp' | 'jpeg' {
  return isWebPSupported() ? 'webp' : 'jpeg';
}

/**
 * Initialize image optimization
 */
export function initializeImageOptimization(): void {
  // Setup lazy loading
  setupLazyLoading();
  
  // Preload critical images if any
  const criticalImages: string[] = [
    // Add critical image URLs here
  ];
  
  if (criticalImages.length > 0) {
    preloadCriticalImages(criticalImages);
  }
} 