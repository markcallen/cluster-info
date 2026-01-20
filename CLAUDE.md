# CLAUDE.md

## Project Overview

Kubernetes cluster info display application built with React 18 + TypeScript frontend and Express backend.

## Commands

- `npm run dev` - Start development servers (frontend + backend)
- `npm run build` - Build production assets
- `npm test` - Run Jest tests
- `npm run lint` - Run ESLint
- `npm run prettier` - Check formatting

## Testing

### Setup

Tests use Jest with React Testing Library. Configuration:

- `jest.config.js` - Jest configuration (ESM, TypeScript, jsdom environment)
- `src/setupTests.ts` - Test setup with @testing-library/jest-dom matchers

### Running Tests

```bash
npm test
```

### Writing Tests

- Test files go alongside source files with `.test.tsx` extension
- Example: `src/App.tsx` -> `src/App.test.tsx`
- Import jest globals for ESM compatibility:

```typescript
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
```

- Mock fetch API for component tests that make API calls
- Use `waitFor` for async state updates

### Test Dependencies

- jest, @types/jest, ts-jest
- jest-environment-jsdom
- @testing-library/react, @testing-library/jest-dom
- identity-obj-proxy (CSS mocking)

## Project Structure

```
src/
  App.tsx          # Main application component
  App.test.tsx     # Tests for App component
  main.tsx         # React entry point
  setupTests.ts    # Jest setup
  index.css        # Tailwind styles
server/
  index.ts         # Express backend
```

## Code Style

- TypeScript required for all source files
- Single quotes, semicolons, no trailing commas
- Prettier + ESLint enforced via pre-commit hooks
