# Inventory Sales Management Monorepo

This repo is a Turbo + pnpm monorepo with two apps:

- `apps/web`: React + Vite frontend
- `apps/api`: Node + Express + MongoDB backend

## Prerequisites

- Node.js 18+
- pnpm
- MongoDB running locally or a remote URI

## Setup

```bash
pnpm install
```

Create a root `.env` from `.env.example` and update values.

## Development

```bash
pnpm dev
```

Or run a single app:

```bash
pnpm --filter web dev
pnpm --filter api dev
```

## Build

```bash
pnpm build
```

## Lint

```bash
pnpm lint
```
