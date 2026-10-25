# Deploy RoastMyX to Vercel

## What's ready

| Item | Value |
|------|--------|
| Local app | `C:\Users\USER\roastmyx` |
| GitHub (full source) | https://github.com/Taminatorxxx/roastmyx |
| Vercel project | `roastmyx` |
| Live URL | https://roastmyx-taminators-projects.vercel.app |

## Ship the full app (2 minutes)

The Vercel project currently has a placeholder page. Full source is on GitHub.

### Option A — Import GitHub repo (recommended)

1. Open **https://vercel.com/new**
2. Import **Taminatorxxx/roastmyx**
3. Framework preset: **Next.js**
4. Add env vars (Production + Preview):

| Name | Notes |
|------|--------|
| `X_BEARER_TOKEN` | Your X bearer token (raw, with `+` and `=`, not URL-encoded) |
| `XAI_API_KEY` | From https://console.x.ai for AI roasts |
| `NEXT_PUBLIC_SITE_URL` | `https://roastmyx-taminators-projects.vercel.app` |
| `ALLOW_DEMO_FALLBACK` | `true` |

5. Click **Deploy**

### Option B — Connect Git to existing project

1. https://vercel.com/taminators-projects/roastmyx/settings/git  
2. Connect **Taminatorxxx/roastmyx**  
3. Redeploy from `main`

## Local

```bash
cd C:\Users\USER\roastmyx
npm install
npm run dev
```

`.env.local` already has `X_BEARER_TOKEN` (never commit this file).

## X API note

If live profile fetch returns 401/402, your X developer app may need a paid tier. The app automatically falls back to demo profiles so the product still works.

## Security

If the bearer token was pasted in chat, **regenerate it** in the X developer portal after deploy.
