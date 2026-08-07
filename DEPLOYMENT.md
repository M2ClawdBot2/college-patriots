# Production deployment recommendation

## Recommendation

Deploy the application directly from GitHub to Vercel and use Supabase for Postgres, Auth, and Storage. Do not place GitHub Pages between GitHub and Vercel.

```text
GitHub repository
  └─ push / pull request
      └─ Vercel deployment
          ├─ public Next.js newsroom
          ├─ protected editorial studio
          └─ server routes
               └─ Supabase
                   ├─ Postgres: articles, events, analytics
                   ├─ Auth: approved editors
                   └─ Storage: images and video assets
```

## Why

- Vercel natively hosts full-stack Next.js, including server rendering and route handlers.
- Supabase provides portable Postgres data, row-level access rules, authentication, and media storage.
- Every GitHub push can produce a Vercel deployment; pull requests can receive isolated preview URLs.
- GitHub Pages only hosts static files, so it cannot safely run publishing, authentication, analytics ingestion, or database operations.

## Migration sequence

1. Create the Supabase project and production/staging environments.
2. Port the D1 schema and seed data to Postgres migrations.
3. Replace the D1 helper with a server-side Supabase client.
4. Replace ChatGPT-header editor access with Supabase Auth and an editor role.
5. Add Storage buckets for article images and video metadata.
6. Convert the Vinext-specific build back to standard Next.js.
7. Import the GitHub repository into Vercel and set environment variables.
8. Verify drafts, publishing, analytics events, uploads, and access controls.
9. Connect the custom domain and redirect the temporary URLs.

The existing public deployment should remain online until step 8 is complete.
