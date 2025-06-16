
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

  // Create production build info - FULL PRODUCTION MODE
  const buildInfo = {
    timestamp: new Date().toISOString(),
    version: '4.0.0-UNLIMITED',
    build: 'NETLIFY-PRODUCTION-UNLIMITED',
    deployment: 'NETLIFY',
    mode: 'PRODUCTION',
    environment: 'PRODUCTION',
    author: 'Ervin Remus Radosavlevici',
    emails: [
      'ervin210@sky.com',
      'radosavlevici.ervin@gmail.com',
      'ervin210@icloud.com'
    ],
    url: 'https://radosquantum.netlify.app',
    features: 'UNLIMITED_ENABLED',
    restrictions: 'COMPLETELY_REMOVED',
    development_mode: false,
    production_mode: true,
    all_features_enabled: true,
    quantum_limits_removed: true,
    enterprise_features: true
  };

  writeFileSync(join('dist', 'build-info.json'), JSON.stringify(buildInfo, null, 2));
  console.log('✅ Created production build configuration');

  // Create manifest.json for PWA
  const manifest = {
    name: "RADOS Quantum System",
    short_name: "RADOS Quantum",
    description: "Enterprise Quantum Computing Platform - Unlimited Production Edition",
    start_url: "/",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#06b6d4",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  
  writeFileSync(join('dist', 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('✅ Created PWA manifest');

  // Create robots.txt
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://radosquantum.netlify.app/sitemap.xml
`;
  writeFileSync(join('dist', 'robots.txt'), robotsTxt);
  console.log('✅ Created robots.txt');

  console.log('🎉 Build completed successfully!');
  console.log('📁 Files ready in dist/ directory');
  console.log('🌐 Ready for deployment to https://radosquantum.netlify.app');
  console.log('✅ All features enabled for production');
  console.log('⚡ UNLIMITED mode activated');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
