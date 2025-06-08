import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

// Display system info
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)