# AGENTS.md - AI Assistant Guide

This document provides guidelines for AI assistants working on this project.
Follow these instructions carefully to ensure consistency, quality, and security.

## Project Overview

### Modern Stack

- React 19 + TypeScript + Vite
- Zustand + Immer for state management
- React Router v7 for routing
- Alova v3 (Fetch-based) for API requests
- Tailwind CSS v4 for styling
- Vitest + Testing Library for testing
- OxLint + OxFmt for code quality
- pnpm package manager

### File Structure

```
src/
├── apis/           # API interface definitions
├── components/     # Reusable components
├── hooks/          # Custom hooks
├── icons/          # Icon components
├── layouts/        # Page layouts
├── pages/          # Page components
├── routes/         # Route configuration
├── stores/         # Zustand state management
├── styles/         # Global styles
└── utils/          # Utility functions
```

### Naming Conventions

- **Files**: `kebab-case` (use-mobile.ts)
- **Components**: `PascalCase` (TodoList.tsx)
- **Hooks**: `usecamelCase` (useTodoStore)
- **Constants**: `UPPER_SNAKE_CASE`
- **Interfaces**: `PascalCase` (TodoItem, TodoResponse)

## Git Commit Conventions

### Format

<type>(<scope>): <subject>

<body>

<footer>

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Formatting only
- **refactor**: Code refactoring
- **perf**: Performance
- **test**: Test changes
- **chore**: Build/config updates
- **revert**: Revert commit

### Rules

- Subject: Max 50 chars, imperative mood, no period, first letter uppercase
- Body: Optional, wrap 72 chars, explain why
- Footer: Fixes #123, BREAKING CHANGE: ...

### Examples

feat(api): add user authentication

Implement JWT with Alova.

Fixes #45

fix(modal): resolve backdrop issue

BREAKING CHANGE: onClose now receives event

## Commands

pnpm dev, pnpm build, pnpm test, pnpm lint, pnpm lint:fix, pnpm format

## Core Modules

- **use-fetch.ts**: Alova wrapper, useGet/usePost/etc
- **use-todo-store.ts**: Zustand pattern, Immer updates

## Security & Performance

- NO hardcoded credentials
- NO sensitive client data
- Use useCallback/useMemo
- Components pure, side effects in hooks

## AI Guidelines

1. find_path before reading
2. edit_file over rewrite
3. Plan first, define types first
4. Ask when uncertain
5. Show plans for big changes
6. Step-by-step for complex tasks

## Scenarios

**Add Page**: create src/pages → routes → store (if needed) → API → types → lint → tests
**Update Store**: open file → use Immer → strict types → update tests
**API Change**: update apis → types → store → components → tests

**Last Updated**: 2024-12-19
**Version**: 1.0.0
