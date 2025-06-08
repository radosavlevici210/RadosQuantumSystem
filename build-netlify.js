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

  // Create netlify.toml for production settings
  const netlifyConfig = `[build]
  publish = "dist"
  command = "npm run build:netlify"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_ENV = "production"
  VITE_APP_ENV = "production"
`;

  writeFileSync('netlify.toml', netlifyConfig);
  console.log('✅ Created Netlify configuration');

  console.log('🎉 Build completed successfully!');
  console.log('📁 Files ready in dist/ directory');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}