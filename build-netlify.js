
import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

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

  // Create production build info
  const buildInfo = {
    timestamp: new Date().toISOString(),
    version: '3.0.0-ENTERPRISE',
    build: 'PRODUCTION-8M-FEATURES',
    deployment: 'NETLIFY',
    author: 'Ervin Remus Radosavlevici',
    emails: [
      'ervin210@sky.com',
      'radosavlevici.ervin@gmail.com',
      'ervin210@icloud.com'
    ],
    url: 'https://radosquantum.netlify.app',
    features: 'ALL_ENABLED',
    restrictions: 'REMOVED'
  };

  writeFileSync(join('dist', 'build-info.json'), JSON.stringify(buildInfo, null, 2));
  console.log('✅ Created production build configuration');

  console.log('🎉 Build completed successfully!');
  console.log('📁 Files ready in dist/ directory');
  console.log('🌐 Ready for deployment to https://radosquantum.netlify.app');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
