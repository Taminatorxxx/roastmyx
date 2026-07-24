# RoastMyX 🔥

**Your X account. Roasted by AI.**

Spotify Wrapped × Duolingo roast × GitHub profile cards — a viral, no-login X profile roasting experience.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-white)

## Features

- **One input** — enter `@username`, no OAuth, no signup
- **AI roast** via xAI (Grok) — funny + constructive growth advice
- **Score suite** — overall, profile, content, hook, consistency, originality, virality, authority, personal brand
- **Creator archetypes** — Reply Goblin, Founder Mode, Algorithm Victim, and more
- **Share card** — download PNG, share to X, copy roast, challenge a friend
- **OG images** — dynamic `next/og` social cards
- **Funny loading states** — not a boring spinner
- **Rate limiting**, SEO, accessibility, demo fallback without API keys

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + Framer Motion
- xAI API (`XAI_API_KEY`) for roasts
- X API v2 (`X_BEARER_TOKEN`) for live public profiles
- `next/og` for share images
- Ready for Vercel

## Quick start

```bash
# Install
npm install

# Configure (optional for demo mode)
cp .env.example .env.local

# Dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Without keys, the app uses **demo profiles** + a high-quality **heuristic roast** so you can ship UI immediately.

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `XAI_API_KEY` | For AI roasts | [console.x.ai](https://console.x.ai) |
| `X_BEARER_TOKEN` | For live X data | [developer.x.com](https://developer.x.com) |
| `NEXT_PUBLIC_SITE_URL` | Prod | e.g. `https://roastmyx.ai` |
| `XAI_MODEL` | Optional | Default model for roasts |
| `ALLOW_DEMO_FALLBACK` | Optional | Default `true` |

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # start production server
npm run lint     # eslint
```

## Project structure

```
src/
  app/
    api/roast/     # POST roast pipeline
    api/og/        # Dynamic OG / share images
    api/health/    # Health + config flags
    roast/[username]/
    page.tsx       # Landing
  components/      # UI + viral features
  lib/             # X API, AI, rate limit, utils
  types/           # Shared TypeScript types
```

## Deploy on Vercel

1. Push this repo to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Add env vars (`XAI_API_KEY`, `X_BEARER_TOKEN`, `NEXT_PUBLIC_SITE_URL`)
4. Deploy

## Product principles

- Roast **content**, never protected characteristics
- 80% funny / 20% educational
- Every screen should make users want to screenshot and share

## License

MIT
