# The University Patriot

An America First student news publication founded at the University of Florida. The product includes a public newsroom, video dispatches, mini-games, a protected editorial studio, article analytics, and persistent publishing data.

## Run locally

```bash
npm install
npm run dev
```

Use `npm test` to build the full application and run the product checks.

## Current architecture

- Next.js App Router UI running through Vinext on Cloudflare Workers
- Cloudflare D1 for durable article and analytics data
- Protected server-side editorial routes
- GitHub as the canonical source repository

## Recommended independent production stack

For a long-term custom-domain deployment, use GitHub → Vercel for the Next.js application and Supabase for Postgres, editor authentication, and image/video storage. GitHub Pages should remain a static redirect or project page; it cannot run the newsroom backend.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the migration plan.
