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

## Bulk Product Import (CSV Format)

To import multiple products at once via the "Import CSV" feature, your CSV file must strictly follow this format with these exact headers:

```csv
name,productId,category,price,quantity,unit,expiryDate,threshold,imageUrl
Maggi,MAG001,Food,430,43,Packets,11/12/25,12,https://example.com/maggi.png
Bru,BRU002,Drink,257,100,kg,21/12/25,5,
Harpic,HAR003,Cleaning,605,10,L,9/1/25,5,
```

- **`name`**: String, Required
- **`productId`**: String, Required, Unique
- **`category`**: String, Required (e.g., Food, Drink, Cleaning)
- **`price`**: Number, Required
- **`quantity`**: Number, Required
- **`unit`**: String, Required
- **`expiryDate`**: Date, Optional (can be blank)
- **`threshold`**: Number, Required
- **`imageUrl`**: String, Optional (can be blank)
