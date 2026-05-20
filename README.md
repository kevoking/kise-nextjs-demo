# kise-nextjs-demo

Next.js App Router demo with Firebase email/password auth and a protected
dashboard.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Firebase Authentication (email/password)

## Features

- Home page (`/`)
- Login and signup page (`/auth`) using Firebase Authentication
- Protected dashboard page (`/dashboard`) that redirects unauthenticated users
  to `/auth`
- Shared UI primitives from shadcn/ui (`Button`, `Card`, `Input`, `Label`)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Add your Firebase Web App config values to `.env.local`.
4. Enable **Email/Password** in Firebase Authentication.

## Run

```bash
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```
