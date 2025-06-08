
/**
 * RADOS Quantum System - Performance Monitor
 * © 2025 Ervin Remus Radosavlevici
 * All Rights Reserved
 */

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(label: string): void {
    this.metrics.set(`${label}_start`, performance.now());
  }

  endTiming(label: string): number {
    const start = this.metrics.get(`${label}_start`);
    if (!start) return 0;
    
    const duration = performance.now() - start;
    this.metrics.set(label, duration);
    
    // Log for quantum system monitoring
    console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  getMetric(label: string): number {
    return this.metrics.get(label) || 0;
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  reportVitals(): void {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      console.log('📊 Performance Vitals:', {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      });
    }
  }
}

// Auto-report vitals when page loads
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      PerformanceMonitor.getInstance().reportVitals();
    }, 1000);
  });
}
