# ShopAI - AI-Powered Shopping Assistant

## Overview

ShopAI is an AI-powered shopping assistant that helps users find the best products at the best prices across multiple retailers. The application combines natural language search with OpenAI's GPT models to understand user intent and provide intelligent product recommendations. It features a modern e-commerce interface with AI-generated insights, product comparisons, and a room visualization tool for furniture shopping.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management, caching, and data fetching

**UI Component Strategy**
- **shadcn/ui** component library built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for type-safe component variant management
- Custom theme system supporting light/dark modes with CSS variables

**Design System**
- Typography: Inter (primary) and Sora (accent) fonts from Google Fonts
- Reference-based approach drawing from Airbnb, Amazon, Perplexity AI, and Linear
- Responsive grid layouts: mobile-first with breakpoints at md, lg, and xl
- Consistent spacing using Tailwind's spacing scale (2, 4, 6, 8, 12, 16, 20, 24)

**State Management**
- React Context for theme and global UI state
- TanStack Query for server state with automatic caching and refetching
- Local component state with React hooks

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- Separate entry points for development (`index-dev.ts`) and production (`index-prod.ts`)
- Custom middleware for request logging and JSON body parsing with raw body preservation

**Development vs Production**
- Development: Vite middleware integration for HMR and on-demand compilation
- Production: Static file serving from pre-built `dist/public` directory
- Development includes Replit-specific plugins (cartographer, dev banner, runtime error overlay)

**API Design**
- RESTful endpoints under `/api` prefix
- POST `/api/search` - AI-powered product search endpoint
- Request validation using Zod schemas with friendly error messages via zod-validation-error
- Response format: JSON with structured SearchResponse type

**Storage Strategy**
- **In-memory storage** (MemStorage class) for development and testing
- Interface-based design (IStorage) allows easy swapping to database implementations
- Database schema defined using Drizzle ORM with PostgreSQL dialect
- Prepared for Neon Database serverless PostgreSQL integration

**Data Models**
- Users: id, username, password (hashed)
- Products: id, name, description, price, originalPrice, rating, reviewCount, store, category, imageUrl
- Schema validation with Drizzle-Zod for runtime type safety

### AI Integration

**OpenAI GPT Integration**
- Uses `gpt-4o-mini` model for cost-effective intelligent search
- System prompt instructs model to act as shopping assistant
- Generates structured JSON responses with:
  - Product category summaries
  - Key shopping insights (3 points)
  - Product recommendations (6 items with full details)
- Handles natural language queries and interprets user intent

**Image Processing (Room Visualizer)**
- Multer middleware for multipart/form-data file uploads
- In-memory buffer storage for uploaded room images
- OpenAI Vision API integration for furniture visualization
- Generates AI-edited images showing furniture placed in user's room

### Form Handling & Validation

**Client-Side**
- React Hook Form for performant form state management
- Hookform Resolvers for Zod schema integration
- Real-time validation with user-friendly error messages

**Server-Side**
- Zod schemas shared between client and server (`@shared/schema`)
- Runtime validation of all API inputs
- Type-safe request/response contracts

### Asset Management

**Images**
- Static assets stored in `attached_assets/generated_images/` directory
- Vite alias `@assets` for clean import paths
- Hero images, product photos, and furniture visualization assets

### Build & Deployment

**Development Workflow**
- `npm run dev` - Runs development server with Vite middleware
- `npm run check` - TypeScript type checking without compilation
- `npm run db:push` - Push Drizzle schema changes to database

**Production Build**
- `npm run build` - Builds both client (Vite) and server (esbuild)
- Client: Optimized SPA bundle in `dist/public`
- Server: Single bundled ESM file `dist/index.js` with external packages
- `npm start` - Runs production server

**Path Aliases**
- `@/*` → `client/src/*` for client code
- `@shared/*` → `shared/*` for shared types/schemas
- `@assets/*` → `attached_assets/*` for static assets

## External Dependencies

### Third-Party APIs

**OpenAI**
- API Key required via `OPENAI_API_KEY` environment variable
- Used for: AI-powered search, natural language understanding, image generation
- Models: gpt-4o-mini (chat completions), dall-e or vision API (room visualization)

### Database

**Neon Database** (PostgreSQL)
- Serverless PostgreSQL via `@neondatabase/serverless`
- Connection string via `DATABASE_URL` environment variable
- Drizzle ORM for schema management and queries
- Migration files in `/migrations` directory

### UI Component Libraries

**Radix UI**
- Comprehensive suite of unstyled, accessible component primitives
- Components used: Dialog, Dropdown Menu, Popover, Toast, Tooltip, Avatar, Checkbox, Slider, Select, Tabs, Navigation Menu, and more
- Provides keyboard navigation, focus management, and ARIA attributes

**Additional UI Dependencies**
- `cmdk` - Command menu component
- `react-day-picker` - Date picker calendar
- `embla-carousel-react` - Carousel/slider functionality
- `recharts` - Chart visualization library
- `vaul` - Drawer component
- `lucide-react` - Icon library

### Styling & Utilities

**Core**
- `tailwindcss` - Utility-first CSS framework
- `autoprefixer` - PostCSS plugin for vendor prefixes
- `tailwind-merge` & `clsx` - Conditional className utilities

**Animation & Interaction**
- CSS variables for theme customization
- Hover and active state elevation effects
- Smooth transitions and animations

### Development Tools

**Replit Integration**
- `@replit/vite-plugin-cartographer` - Development tooling
- `@replit/vite-plugin-dev-banner` - Development banner
- `@replit/vite-plugin-runtime-error-modal` - Error overlay

### Session Management

**Connect-pg-simple**
- PostgreSQL session store for Express sessions
- Persists user sessions to database
- Configured for production use with database connection pooling