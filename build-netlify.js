#!/usr/bin/env node

/**
 * RADOS Quantum System - Netlify Build Script
 * © 2025 Ervin Remus Radosavlevici
 * All Rights Reserved
 */

import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting RADOS Quantum System build for Netlify...');

try {
  // Build the application as static client-only
  console.log('📦 Building static application...');
  execSync('cd client && vite build --outDir ../dist', { stdio: 'inherit' });

  // Ensure dist directory exists
  if (!existsSync('dist')) {
    mkdirSync('dist', { recursive: true });
  }

  // Copy redirect rules for SPA routing
  if (existsSync('client/public/_redirects')) {
    copyFileSync('client/public/_redirects', join('dist', '_redirects'));
    console.log('✅ Copied redirect rules');
  } else if (existsSync('_redirects')) {
    copyFileSync('_redirects', join('dist', '_redirects'));
    console.log('✅ Copied redirect rules');
  }

  // Create environment-specific configuration
  const netlifyConfig = {
    timestamp: new Date().toISOString(),
    version: '3.0.0-ENTERPRISE',
    build: 'PRODUCTION-8M-FEATURES',
    deployment: 'NETLIFY',
    author: 'Ervin Remus Radosavlevici',
    emails: ['ervin210@sky.com', 'radosavlevici.ervin@gmail.com', 'ervin210@icloud.com']
  };

  // Write build info
  execSync(`echo '${JSON.stringify(netlifyConfig, null, 2)}' > dist/build-info.json`, { stdio: 'inherit' });

  console.log('✅ RADOS Quantum System build completed successfully!');
  console.log('🌐 Ready for deployment to https://radosquantum.netlify.app');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}