# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript/Node.js investment platform API (XP Technical Challenge) that simulates stock trading functionality with digital account features. The application uses **Fastify** with a MySQL database and JWT authentication.

## Architecture

The codebase follows the MSC (Model-Service-Controller) layered architecture with Fastify plugin-based organization and TypeORM for data persistence:

- **Entities** (`src/entities/`): TypeORM entity definitions with decorators
- **Repositories** (`src/repositories/`): Data access layer using TypeORM Repository pattern
- **Services** (`src/services/`): Business logic and validation rules  
- **Routes** (`src/routes/`): Fastify plugin-based API endpoints organized by domain
- **Plugins** (`src/plugins/`): Fastify plugins for authentication, error handling, and database connection
- **Migrations** (`src/migrations/`): Database schema version control with TypeORM migrations
- **Schemas** (`src/schemas/`): TypeScript interfaces and JSON schema definitions
- **Interfaces** (`src/interfaces/`): TypeScript type definitions (legacy)
- **Utils** (`src/utils/`): Utilities like JWT handling

## Database Schema

The MySQL database (`desafio_xp`) contains 7 tables:
- `pessoa_cliente`: Client accounts with username, password, balance
- `ativos_corretora`: Available assets (stocks) with ticker, quantity, price
- `ativos_cliente`: Client-owned assets with quantities and values
- `ordens_de_compra`: Buy orders
- `ordens_de_venda`: Sell orders  
- `depositos`: Deposits
- `saques`: Withdrawals

Database setup is in `desafio_xp.sql`.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## Docker Setup

The project includes Docker Compose configuration:
- Node.js app container on port 8000
- MySQL 8.0 database container on port 3306
- Environment variables for database connection are configured

## Fastify Architecture

### Server Setup
- Main server instance: `src/server.ts`
- Plugin registration and startup: `src/index.ts`
- App plugin composition: `src/app.ts`

### Plugin System
- **TypeORM Plugin** (`src/plugins/typeorm.plugin.ts`): Database connection and ORM initialization
- **JWT Plugin** (`src/plugins/jwt.plugin.ts`): Authentication middleware
- **Error Handler** (`src/plugins/error-handler.plugin.ts`): Centralized error handling
- Routes are organized as plugins in `src/routes/`:
  - `account.routes.ts` - Account operations (/conta)
  - `asset.routes.ts` - Asset information (/ativos)  
  - `investments.routes.ts` - Investment operations (/investimentos)
  - `login.routes.ts` - Authentication (/login)

### API Endpoints

Routes are automatically prefixed when registered:
- `/conta/*` - Account operations (deposit/withdraw/balance)
- `/ativos/*` - Asset information (by client or asset code)
- `/investimentos/*` - Buy/sell investments
- `/login` - JWT authentication
- `/` - Health check endpoint

## Authentication

JWT authentication is implemented as a Fastify plugin:
- Login endpoint generates tokens
- JWT plugin (`src/plugins/jwt.plugin.ts`) protects routes
- Routes are automatically protected based on URL patterns
- JWT utilities in `src/utils/jwt.ts`

## Configuration

- TypeScript config: `tsconfig.json` (ES2020 target, transpileOnly mode for development)
- Environment variables loaded via dotenv
- Default port: 8000
- Database connection configured in `src/models/connection.ts`
- Fastify logging configured in server setup

## Key Differences from Express

1. **Plugin Architecture**: Routes and middleware are registered as plugins
2. **Async/Await Native**: No need for express-async-errors
3. **Built-in Validation**: Schema-based request/response validation (partially implemented)
4. **Better Performance**: Significantly faster than Express
5. **TypeScript Integration**: Better type inference with proper setup