# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `pnpm dev`: Start development server with turbopack
- `pnpm build`: Build production application
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint on codebase

## Code Style
- **Imports**: Use absolute imports with `@/*` alias for src directory
- **Types**: Use explicit TypeScript types, prefer interfaces for objects
- **State Management**: Use Zustand for global state (`src/store/gameStore.ts`)
- **Styling**: Use Tailwind CSS with `cn()` utility for class merging
- **Components**: Organize UI components in `src/components/ui` and feature components in respective folders
- **React**: Use function components with hooks, prefer client components when needed
- **Error Handling**: Use try/catch for async operations and log errors to console
- **File Naming**: Use PascalCase for React components, camelCase for utilities
- **Code Organization**: Group related functionality in folders by feature
- **API Routes**: Use Next.js App Router conventions for API endpoints