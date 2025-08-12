// Advanced code splitting utilities
import React from 'react';

export interface ChunkConfig {
  name: string;
  test: RegExp;
  priority?: number;
  minSize?: number;
  maxSize?: number;
}

export interface RouteConfig {
  path: string;
  component: () => Promise<any>;
  preload?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * Dynamic import with error handling and retry logic
 */
export async function dynamicImport<T>(
  importFn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await importFn();
    } catch (error) {
      console.warn(`Dynamic import failed (attempt ${i + 1}/${retries}):`, error);
      
      if (i === retries - 1) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  
  throw new Error('Dynamic import failed after all retries');
}

/**
 * Preload component for better performance
 */
export function preloadComponent<T>(
  importFn: () => Promise<T>,
  priority: 'high' | 'medium' | 'low' = 'medium'
): void {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'script';
  
  // Set priority based on importance
  if (priority === 'high') {
    link.rel = 'preload';
  }
  
  // Extract the chunk name from the import function
  // This is a simplified approach - in production you'd want more sophisticated chunk detection
  const chunkName = importFn.toString().match(/['"`]([^'"`]+)['"`]/)?.[1] || '';
  
  if (chunkName) {
    link.href = chunkName;
    document.head.appendChild(link);
  }
}

/**
 * Route-based code splitting
 */
export class RouteBasedSplitting {
  private routes: Map<string, RouteConfig> = new Map();
  private loadedChunks: Set<string> = new Set();

  constructor(routes: RouteConfig[] = []) {
    routes.forEach(route => this.addRoute(route));
  }

  addRoute(route: RouteConfig): void {
    this.routes.set(route.path, route);
    
    // Preload high priority routes
    if (route.preload && route.priority === 'high') {
      this.preloadRoute(route.path);
    }
  }

  async loadRoute(path: string): Promise<any> {
    const route = this.routes.get(path);
    
    if (!route) {
      throw new Error(`Route not found: ${path}`);
    }

    // Check if already loaded
    if (this.loadedChunks.has(path)) {
      return route.component;
    }

    try {
      const component = await dynamicImport(route.component);
      this.loadedChunks.add(path);
      return component;
    } catch (error) {
      console.error(`Failed to load route: ${path}`, error);
      throw error;
    }
  }

  preloadRoute(path: string): void {
    const route = this.routes.get(path);
    
    if (route && !this.loadedChunks.has(path)) {
      preloadComponent(route.component, route.priority);
    }
  }

  preloadAllRoutes(): void {
    this.routes.forEach((route, path) => {
      if (route.preload) {
        this.preloadRoute(path);
      }
    });
  }
}

/**
 * Vendor chunk optimization
 */
export class VendorOptimization {
  private vendorChunks: Map<string, ChunkConfig> = new Map();

  constructor() {
    this.initializeDefaultChunks();
  }

  private initializeDefaultChunks(): void {
    // React and React DOM
    this.addVendorChunk({
      name: 'react-vendor',
      test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
      priority: 1,
      minSize: 0,
      maxSize: 500000
    });

    // Spline and 3D libraries
    this.addVendorChunk({
      name: 'spline-vendor',
      test: /[\\/]node_modules[\\/](@splinetool|three|webgl)[\\/]/,
      priority: 2,
      minSize: 0,
      maxSize: 1000000
    });

    // UI libraries
    this.addVendorChunk({
      name: 'ui-vendor',
      test: /[\\/]node_modules[\\/](@radix-ui|lucide|clsx|tailwind)[\\/]/,
      priority: 3,
      minSize: 0,
      maxSize: 300000
    });

    // Other dependencies
    this.addVendorChunk({
      name: 'other-vendor',
      test: /[\\/]node_modules[\\/]/,
      priority: 4,
      minSize: 30000,
      maxSize: 500000
    });
  }

  addVendorChunk(config: ChunkConfig): void {
    this.vendorChunks.set(config.name, config);
  }

  getChunkConfigs(): ChunkConfig[] {
    return Array.from(this.vendorChunks.values())
      .sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  /**
   * Generate webpack splitChunks configuration
   */
  generateWebpackConfig(): any {
    const cacheGroups: any = {};
    
    this.vendorChunks.forEach((config, name) => {
      cacheGroups[name] = {
        test: config.test,
        name: name,
        chunks: 'all',
        priority: config.priority || 0,
        minSize: config.minSize || 0,
        maxSize: config.maxSize || 0,
        reuseExistingChunk: true
      };
    });

    return {
      splitChunks: {
        chunks: 'all',
        cacheGroups
      }
    };
  }
}

/**
 * Component lazy loading with error boundary
 */
export function createLazyComponent(
  importFn: () => Promise<any>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<any> {
  return React.lazy(() => 
    dynamicImport(importFn)
      .then(module => ({ default: module.default || module }))
      .catch(error => {
        console.error('Lazy component failed to load:', error);
        if (fallback) {
          return { default: fallback };
        }
        throw error;
      })
  );
}

/**
 * Initialize advanced code splitting
 */
export function initializeAdvancedCodeSplitting(): void {
  // Initialize route-based splitting
  const routeSplitting = new RouteBasedSplitting([
    {
      path: '/services',
      component: () => import('../components/ServicesSection'),
      preload: true,
      priority: 'high'
    },
    {
      path: '/problem',
      component: () => import('../components/ProblemSection'),
      preload: true,
      priority: 'medium'
    },
    {
      path: '/footer',
      component: () => import('../components/Footer'),
      preload: false,
      priority: 'low'
    }
  ]);

  // Preload critical routes
  routeSplitting.preloadRoute('/services');

  // Initialize vendor optimization
  const vendorOptimization = new VendorOptimization();
  
  // Store instances globally for access
  (window as any).__routeSplitting = routeSplitting;
  (window as any).__vendorOptimization = vendorOptimization;
}

/**
 * Get chunk loading status
 */
export function getChunkLoadingStatus(): {
  loaded: string[];
  pending: string[];
  failed: string[];
} {
  const routeSplitting = (window as any).__routeSplitting as RouteBasedSplitting;
  
  if (!routeSplitting) {
    return { loaded: [], pending: [], failed: [] };
  }

  const loaded = Array.from(routeSplitting['loadedChunks']);
  const pending = Array.from(routeSplitting['routes'].keys())
    .filter(path => !loaded.includes(path));

  return {
    loaded,
    pending,
    failed: [] // Would need to track failed chunks separately
  };
} 