# GoldRisk — Frontend

Risk and position-size calculator for XAUUSD traders.

**Phase 4.1 scope:** this is the frontend foundation only — routing, design
system, and reusable layout/UI components. There is no calculator logic,
authentication, backend, or database in this codebase yet. See "What's not
built yet" below.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router v7
- ESLint (flat config) + typescript-eslint

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Project structure

```
src/
├── components/
│   ├── common/       # Button, Input, Select, Card, Loading, ErrorMessage, Logo
│   ├── layout/        # Navbar, Footer, PageContainer, Section
│   └── calculator/     # CalculatorPlaceholder (layout only, no logic)
├── layouts/            # MainLayout (Navbar + Outlet + Footer)
├── pages/              # One component per route
├── routes/             # paths.ts — single source of truth for route paths + nav links
├── services/           # api.ts — fetch wrapper, not connected to a real backend
├── types/              # Shared TypeScript types (api, calculator input/result shapes)
├── utils/              # cn.ts — small classnames helper
├── calculator/         # Reserved for the future calculation engine (see its README)
├── styles/             # tokens.css (design tokens) + index.css (Tailwind + base styles)
├── App.tsx             # Route definitions
└── main.tsx            # App entry point
```

## Design system

Colors, typography, and spacing are driven by CSS custom properties in
`src/styles/tokens.css`, mapped into Tailwind's theme in
`src/styles/index.css`. No component should use a raw hex value — use the
Tailwind utilities (`bg-surface`, `text-muted`, `border-border`, `text-gold`,
etc.) instead.

- **Palette:** near-black surfaces (`--color-bg`, `--color-surface`), a
  muted brass gold accent (`--color-gold`) used sparingly for emphasis and
  calls to action, plus semantic error/success/warning colors.
- **Type:** Inter for UI and body text; IBM Plex Mono for numeric/financial
  figures (account balance, prices, lot size) so they align predictably.

## Logo

No brand logo asset exists in this repo yet. `src/components/common/Logo.tsx`
tries to load `/assets/logo.svg` from `public/assets/` and falls back to a
text wordmark if that file is missing. Once the real GoldRisk logo is added
at `public/assets/logo.svg`, it will be picked up automatically — no code
changes required.

## API layer

`src/services/api.ts` provides a typed `apiRequest` wrapper that reads its
base URL from `VITE_API_BASE_URL` (see `.env.example`). No backend exists
yet, so calling it today will fail with a network error unless that
environment variable is set to a real server. Future service modules
(auth, accounts, calculation history, etc.) should be built on top of this
wrapper rather than calling `fetch` directly from components.

## What's not built yet

By design, this phase does not include:

- Calculator logic (position sizing, lot size, risk math)
- Authentication (login/register are static, disabled form previews)
- A backend, database, or real API calls
- Account management, calculation history, or a dashboard with real data
- Broker or live market data integrations

These are reserved for later phases.
