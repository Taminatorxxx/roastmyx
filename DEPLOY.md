# Deploy RoastMyX to Vercel

## Status

| Item | Value |
|------|--------|
| GitHub | https://github.com/Taminatorxxx/roastmyx |
| Vercel project | `roastmyx` |
| Production URL | https://roastmyx-taminators-projects.vercel.app |

## Import from GitHub (full app)

1. Open: https://vercel.com/new
2. Import **Taminatorxxx/roastmyx**
3. Framework: **Next.js** (auto)
4. Add environment variables:

| Name | Value |
|------|--------|
| `X_BEARER_TOKEN` | Your X API bearer token |
| `XAI_API_KEY` | From https://console.x.ai |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel URL |
| `ALLOW_DEMO_FALLBACK` | `true` |

5. Deploy

## Notes

- Never commit `.env.local`
- X API free tier may return 401/402 — demo fallback still works
- Rotate tokens if shared in chat
