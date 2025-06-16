# RADOS Quantum System - Replit.md

## Overview

RADOS Quantum System is an advanced quantum computing interface application that provides unlimited enterprise capabilities for designing and simulating quantum algorithms. The system is built as a full-stack TypeScript application with a React frontend and Express backend, designed for production deployment on Netlify and other cloud platforms.

The application offers a comprehensive quantum computing simulation environment with up to 100,000 qubit capacity, featuring real-time monitoring, network management, analytics, and security controls. All development restrictions have been removed for unlimited production use.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Radix UI components with Tailwind CSS for styling
- **State Management**: React hooks with custom quantum system hooks
- **Routing**: Wouter for client-side routing
- **Data Fetching**: TanStack React Query for server state management

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (schema defined, ready for connection)
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Development**: Hot reload with Vite middleware integration

### Build System
- **Development**: Unified development server running both client and server
- **Production**: Separate build processes for client-side static deployment
- **Netlify Deployment**: Custom build script for static site generation
- **TypeScript**: Shared types between client and server

## Key Components

### Quantum Engine (`client/src/lib/quantum/QuantumEngine.ts`)
- Core quantum computing simulation engine
- Supports up to 100,000 qubits (unlimited production mode)
- Circuit depth up to 1,000,000 operations
- Real-time state management and operation tracking
- Quantum metrics and health monitoring

### Network Manager (`client/src/lib/quantum/NetworkManager.ts`)
- Quantum network connection management
- Multi-datacenter connectivity simulation
- Network health monitoring and metrics
- Security protocol management
- Latency and bandwidth optimization

### Timestamp Manager (`client/src/lib/quantum/TimestampManager.ts`)
- High-precision quantum timestamp generation
- NTP synchronization for accurate timing
- Event logging with quantum signatures
- Timezone management and format conversion

### User Interface Components
- **Quantum System**: Main interface for quantum circuit design
- **Analytics Page**: Performance monitoring and data visualization
- **Network Page**: Network status and node management
- **Security Page**: Quantum encryption and security monitoring
- **Settings Page**: System configuration and preferences

## Data Flow

1. **User Interaction**: Users interact with React components that trigger quantum operations
2. **State Management**: Custom hooks manage quantum system state and sync with engines
3. **Quantum Processing**: Operations are processed by the QuantumEngine with real-time updates
4. **Network Simulation**: NetworkManager handles distributed quantum computing scenarios
5. **Data Persistence**: User settings and session data stored via backend API
6. **Real-time Updates**: Performance metrics and system health updated continuously

## External Dependencies

### Frontend Dependencies
- **UI Components**: Comprehensive Radix UI component library
- **Styling**: Tailwind CSS with custom quantum-themed design system
- **Charts**: Recharts for analytics and data visualization
- **Animations**: Framer Motion for smooth UI transitions
- **Forms**: React Hook Form with Zod validation

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL support (@neondatabase/serverless)
- **Session Management**: Connect-pg-simple for session persistence
- **Validation**: Zod schemas for data validation
- **Development**: tsx for TypeScript execution

### Build Dependencies
- **Bundling**: Vite with React plugin and TypeScript support
- **Development Tools**: Replit integration plugins for enhanced development experience
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Server**: Combined frontend/backend development server on port 5000
- **Hot Reload**: Vite middleware for instant code updates
- **Database**: PostgreSQL connection ready (DATABASE_URL environment variable)

### Production Deployment (Netlify)
- **Build Process**: Custom build script (`build-netlify.js`) for static site generation
- **Client Build**: Vite production build with optimizations
- **Hosting**: Static files served via Netlify CDN
- **Routing**: SPA routing with `_redirects` file for client-side routes
- **Environment**: Production environment variables and unlimited feature flags

### Database Setup
- **ORM**: Drizzle configured for PostgreSQL with migration support
- **Schema**: User management schema defined in `shared/schema.ts`
- **Connection**: Ready for PostgreSQL database connection via environment variable
- **Migrations**: Migration files generated in `./migrations` directory

### Security Considerations
- **CORS**: Configured for cross-origin requests
- **Headers**: Security headers configured in Netlify deployment
- **Authentication**: User schema prepared for authentication implementation
- **Environment**: Sensitive data managed through environment variables

## Changelog

- June 16, 2025: Initial setup
- June 16, 2025: Migration to Replit completed with business documentation (README.md, LICENSE, BUSINESS.md)

## User Preferences

Preferred communication style: Simple, everyday language.