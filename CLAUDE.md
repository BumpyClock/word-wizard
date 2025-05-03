# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- `pnpm dev`: Start development server with turbopack
- `pnpm build`: Build production application
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint on codebase

## Testing
- No specific testing framework is set up yet
- Run `pnpm lint` before committing changes to ensure code quality

## Code Style
- **Imports**: Use absolute imports with `@/*` alias for src directory
- **Types**: Use explicit TypeScript types; type all props, state, and return values
- **State Management**: Use Zustand for global state (`src/store/gameStore.ts`)
- **Styling**: Use Tailwind CSS with `cn()` utility from `src/lib/utils.ts` for class merging
- **Components**: 
  - Use PascalCase for React components, camelCase for utilities
  - Client components must include "use client" directive at the top
- **React**: Use function components with hooks, prefer client components when needed
- **Error Handling**: Use try/catch for async operations with appropriate error logging
- **API Routes**: Use Next.js App Router conventions with proper error responses
- **TTS Functionality**: Cache audio files in `public/cache/tts/` to avoid regeneration
- **Naming Conventions**: Follow component/folder structure in `src/components/*`