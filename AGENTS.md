# AGENTS.md

## Build, Lint, and Test Commands

### Development Commands

- `npm run dev` - Start Vite development server and Express server
- `npm run dev:server` - Start Express server only (with tsx)
- `npm run dev:frontend` - Start Vite frontend only
- `npm run build` - Build production assets
- `npm run start` or `npm run preview` - Start the production server

### Code Quality Commands

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run prettier` - Check code formatting
- `npm run prettier:fix` - Fix code formatting
- `npm test` - Run tests (currently no tests configured)

### Build Process

1. Build process uses Docker multi-stage build:
   - First stage: build assets with Vite
   - Second stage: production runtime with Express server using tsx

## Code Style Guidelines

### TypeScript-Only Policy

- **All source code must be written in TypeScript**
- JavaScript files (.js, .mjs, .cjs) are NOT allowed except for configuration files
- Configuration files (eslint.config.js, tailwind.config.cjs, etc.) may use JavaScript
- Use .ts extension for all TypeScript source files
- Use .tsx extension for React components

### TypeScript Style

- Use single quotes for strings
- Semicolons required
- No trailing commas
- Line width: 80 characters
- Strict TypeScript mode enabled
- `allowJs` is set to false to enforce TypeScript-only policy

### Import Conventions

- Use ES modules (import/export)
- Group imports: node built-ins, external packages, internal modules
- Use type-only imports when importing types: `import type { Type } from 'module'`

### React Patterns

- Use functional components with React hooks
- Use TypeScript types for props and state
- Use error boundaries for error handling
- Follow React best practices for useEffect, useState, etc.

### Error Handling

- Use try/catch blocks for async operations
- Handle API errors gracefully
- Display user-friendly error messages

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for components and types
- Use UPPER_CASE for constants
- Use descriptive names that explain purpose

### Formatting

- Prettier handles formatting automatically
- Configured with 80 print width, single quotes, semicolons
- No trailing commas
- Code is automatically formatted on commit via husky

### Type Safety

- Strict TypeScript mode enabled
- All props should be typed
- Use union types and discriminated unions where appropriate
- Prefer explicit typing over inference for public APIs

### Testing

- Currently no tests configured
- When adding tests, they should be colocated with components
- Use descriptive test names that explain the behavior
- Mock external dependencies in tests

### Git Hooks

- Pre-commit hooks run linting and formatting
- Pre-commit hooks run type checking
- Commits should pass all checks

### Additional Notes

- This project uses Node.js 22+ with ES modules
- React 18+ with functional components
- Tailwind CSS for styling
- Express for backend API
