
#!/usr/bin/env node

/**
 * RADOS Quantum System - Netlify Build Script
 * © 2025 Ervin Remus Radosavlevici
 * All Rights Reserved
 */

const { execSync } = require('child_process');
const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { join } = require('path');

console.log('🚀 Starting RADOS Quantum System build for Netlify...');

try {
  // Clean and create dist directory first
  console.log('🧹 Cleaning build directory...');
  if (existsSync('dist')) {
    execSync('rm -rf dist', { stdio: 'inherit' });
  }
  mkdirSync('dist', { recursive: true });

  // Build the client application
  console.log('📦 Building static application...');
  process.chdir('client');
  execSync('npm run build', { stdio: 'inherit' });
  process.chdir('..');

  // Ensure client dist exists and copy it
  const clientDist = join('client', 'dist');
  if (existsSync(clientDist)) {
    execSync(`cp -r ${clientDist}/* dist/`, { stdio: 'inherit' });
  } else {
    throw new Error('Client build failed - dist directory not found');
  }

  // Copy redirect rules for SPA routing
  const redirectsContent = `/*    /index.html   200`;
  writeFileSync(join('dist', '_redirects'), redirectsContent);
  console.log('✅ Created redirect rules for SPA routing');

  // Get git information for deployment tracking
  let gitInfo = {};
  try {
    const gitCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    const gitMessage = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim();
    gitInfo = { commit: gitCommit, branch: gitBranch, message: gitMessage };
    console.log('📊 Git info captured for deployment tracking');
  } catch (error) {
    console.log('⚠️ Git info not available, initializing repository...');
    try {
      execSync('git init', { stdio: 'inherit' });
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "Initial RADOS Quantum System deployment"', { stdio: 'inherit' });
      console.log('✅ Git repository initialized');
    } catch (gitError) {
      console.log('ℹ️ Git initialization skipped');
    }
  }

  // Create environment-specific configuration
  const netlifyConfig = {
    timestamp: new Date().toISOString(),
    version: '3.0.0-ENTERPRISE',
    build: 'PRODUCTION-8M-FEATURES',
    deployment: 'NETLIFY',
    author: 'Ervin Remus Radosavlevici',
    emails: ['ervin210@sky.com', 'radosavlevici.ervin@gmail.com', 'ervin210@icloud.com'],
    git: gitInfo,
    url: 'https://radosquantum.netlify.app'
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
