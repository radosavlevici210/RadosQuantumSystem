
#!/usr/bin/env node

/**
 * RADOS Quantum System - Netlify Build Script
 * © 2025 Ervin Remus Radosavlevici
 * All Rights Reserved
 */

import { execSync } from 'child_process';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting RADOS Quantum System build for Netlify...');

try {
  // Clean and create dist directory
  console.log('🧹 Cleaning build directory...');
  if (existsSync('dist')) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }
  mkdirSync('dist', { recursive: true });

  // Build the client application
  console.log('📦 Building static application...');
  execSync('cd client && npm run build', { stdio: 'inherit' });

  // Copy redirect rules for SPA routing
  const redirectsContent = `/*    /index.html   200`;
  writeFileSync(join('dist', '_redirects'), redirectsContent);
  console.log('✅ Created redirect rules for SPA routing');

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
  writeFileSync(join('dist', 'build-info.json'), JSON.stringify(netlifyConfig, null, 2));
  console.log('✅ Created build configuration');

  console.log('✅ RADOS Quantum System build completed successfully!');
  console.log('🌐 Ready for deployment to https://radosquantum.netlify.app');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
