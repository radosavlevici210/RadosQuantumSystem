import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PerformanceMonitor } from "./lib/performance";

// RADOS Quantum System Boot Sequence
console.log(`
╔══════════════════════════════════════════════════════════════╗
║                  RADOS QUANTUM SYSTEM                       ║
║              Enterprise Production Edition                   ║
║                                                              ║
║  © 2025 Ervin Remus Radosavlevici                           ║
║  Emails: ervin210@sky.com, radosavlevici.ervin@gmail.com,   ║
║          ervin210@icloud.com                                 ║
║  All Rights Reserved - Unauthorized Use Prohibited          ║
║                                                              ║
║  Version: 3.0.0-ENTERPRISE                                  ║
║  Build: PRODUCTION-8M-FEATURES                              ║
╚══════════════════════════════════════════════════════════════╝
`);

// Initialize performance monitoring
const perfMonitor = PerformanceMonitor.getInstance();
perfMonitor.startTiming('app_initialization');

// Register service worker for production
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('🔧 Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

// Production mode - all features enabled
console.log('🌐 Production deployment ready for https://radosquantum.netlify.app');
console.log('✅ All development restrictions removed');

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");

const root = createRoot(container);
root.render(<App />);

// End timing after render
perfMonitor.endTiming('app_initialization');

// Ensure base URL is set correctly for production
if (import.meta.env.PROD) {
  const base = document.querySelector('base');
  if (!base) {
    const baseTag = document.createElement('base');
    baseTag.href = '/';
    document.head.appendChild(baseTag);
  }
}