# El Anillo del Ciclope - Restaurant Website

## Overview

A modern restaurant website for "El Anillo del Ciclope" featuring a full-stack architecture with React frontend and Express backend. The application showcases the restaurant's menu, gallery, and provides a contact system for order management. Built with TypeScript, shadcn/ui components, and PostgreSQL integration via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**: React 18 with TypeScript, built using Vite for optimal development and build performance.

**UI Framework**: Implements shadcn/ui component library with Radix UI primitives, providing accessible and customizable components. Uses Tailwind CSS for styling with a custom dark theme configuration featuring purple primary colors and yellow accents.

**State Management**: Uses TanStack Query (React Query) for server state management, providing caching, synchronization, and background updates. No global client state management needed due to the simple nature of the application.

**Routing**: Implements wouter for lightweight client-side routing, currently supporting home page and 404 error handling.

**Component Architecture**: Organized into reusable UI components following atomic design principles:
- Layout components (Navigation, Footer)
- Section components (Hero, Menu, Gallery, Contact)
- UI primitives from shadcn/ui
- Page-level components

### Backend Architecture

**Server Framework**: Express.js with TypeScript, configured for both development and production environments.

**Development Setup**: Vite integration for hot module replacement and development middleware, with custom logging and error handling.

**API Structure**: RESTful API design with `/api` prefix for all endpoints. Currently provides foundational structure with placeholder routes.

**Storage Layer**: Implements a storage interface pattern with both in-memory (development) and database (production) implementations. Currently includes user management functionality as a foundation.

### Database & ORM

**Database**: PostgreSQL configured via environment variables, with Neon Database as the serverless database provider.

**ORM**: Drizzle ORM for type-safe database operations with automatic migration support. Provides strong TypeScript integration and SQL-like query building.

**Schema Design**: 
- Users table with username/password authentication
- Menu items table with categories, pricing, and availability
- Orders table for customer order management
- Uses UUID primary keys and timestamp tracking

**Validation**: Zod schemas integrated with Drizzle for runtime validation and type inference, ensuring data integrity at both API and database levels.

### Styling & Design System

**CSS Framework**: Tailwind CSS with custom configuration supporting dark theme as primary design.

**Design Tokens**: CSS custom properties for consistent theming including primary (purple), secondary (yellow), and semantic color scales.

**Typography**: Custom font stack with Inter for UI text and Google Fonts integration for brand typography.

**Responsive Design**: Mobile-first approach with breakpoint-based responsive layouts throughout all components.

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend library with modern hooks and concurrent features
- **Express.js**: Backend web framework for Node.js
- **TypeScript**: Type safety across full stack
- **Vite**: Build tool and development server

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **@neondatabase/serverless**: Serverless PostgreSQL client optimized for edge environments
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality React component library
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Icon library with consistent design

### State Management & HTTP
- **TanStack Query**: Server state management and data fetching
- **wouter**: Lightweight routing library for React

### Development & Build Tools
- **tsx**: TypeScript execution for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with autoprefixer
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Validation & Utilities
- **Zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **class-variance-authority**: Component variant management