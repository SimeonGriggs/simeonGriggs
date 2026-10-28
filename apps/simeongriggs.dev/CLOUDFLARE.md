# Cloudflare Workers deployment

This app now targets Cloudflare Workers for SSR.

## Local development

1. Install dependencies with `pnpm install`.
2. Start the app with `pnpm --filter simeongriggs-blog dev`.
3. Generate Cloudflare and route types with `pnpm --filter simeongriggs-blog cf-typegen`.

## Required bindings

Public Sanity variables are declared in `wrangler.jsonc` so CI preview uploads and production deployments receive the same configuration. Override them in `.dev.vars` locally. Configure the secrets on the Worker:

- `SANITY_READ_TOKEN` as a secret
- `SANITY_WRITE_TOKEN` as a secret
- `SANITY_SESSION_SECRET` as a secret
- `VITE_SANITY_PROJECT_ID` as a plain text variable
- `VITE_SANITY_DATASET` as a plain text variable
- `VITE_SANITY_API_VERSION` as an optional plain text variable (defaults to `2024-02-13`)

Sanity clients are created inside request handlers from Worker bindings. The root loader passes only the public Sanity configuration to React for consistent server rendering and hydration. Builds do not require Sanity environment variables. Runtime bindings take precedence over any legacy Vite build-time values.

Run `pnpm --filter simeongriggs-blog test` for the runtime configuration regression tests.

When deploying with Wrangler, use `pnpm --filter simeongriggs-blog deploy` to preserve additional variables configured in the Cloudflare dashboard.

## Git-based preview deploys

To keep preview environments available before production cutover:

1. Connect the repository to the Cloudflare Worker in the dashboard.
2. Set the production branch to `main`.
3. Enable non-production branch builds in `Settings -> Build -> Branch control`.
4. Keep `preview_urls` enabled so each branch gets a stable `workers.dev` preview alias.

Once enabled, pushes to this migration branch will build a preview deployment without affecting production traffic or the custom domain.
