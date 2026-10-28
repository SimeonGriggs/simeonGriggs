# Cloudflare Workers Builds

Production deployments and remote preview uploads run only through Cloudflare Workers Builds, using the connected Git repository. There is no local deployment script and no GitHub Actions deployment workflow. Do not deploy, upload, promote, or roll back this Worker directly from a local shell.

## Local development and verification

1. Install dependencies with `pnpm install`.
2. Start the app with `pnpm --filter simeongriggs-blog dev`.
3. Generate Cloudflare and route types with `pnpm --filter simeongriggs-blog cf-typegen`.
4. Run `pnpm --filter simeongriggs-blog test`, `pnpm --filter simeongriggs-blog typecheck`, and `pnpm --filter simeongriggs-blog build` before pushing.

`pnpm --filter simeongriggs-blog preview` builds and serves the app locally with Vite. It does not publish a Cloudflare preview.

## Cloudflare Builds settings

In Workers & Pages > simeongriggs > Settings > Build, use:

| Setting                                                   | Value                                                     |
| --------------------------------------------------------- | --------------------------------------------------------- |
| Connected repository                                      | `SimeonGriggs/simeonGriggs`                               |
| Root directory                                            | `apps/simeongriggs.dev`                                   |
| Production branch                                         | `main`                                                    |
| Build command                                             | `NODE_OPTIONS="--max-old-space-size=8192" pnpm run build` |
| Production deploy command                                 | `npx wrangler deploy --keep-vars`                         |
| Enable Preview Builds                                     | Enabled for non-production branches                       |
| Non-production deploy command (existing version previews) | `npx wrangler versions upload`                            |

These publish commands belong in CF Builds settings only. A feature-branch push creates a version preview and branch alias without changing production traffic. A merge to `main` triggers the production build and deployment. Check the Workers Builds GitHub check and preview URL before merging; do not manually promote the version.

## Runtime configuration

Public Sanity variables are declared in `wrangler.jsonc` for reproducible builds and deployments. Override them in `.dev.vars` locally. Configure secrets on the Worker:

- `SANITY_READ_TOKEN`
- `SANITY_WRITE_TOKEN`
- `SANITY_SESSION_SECRET`

Sanity clients initialize inside request handlers from Worker bindings. The root loader passes only public configuration to React for server rendering and hydration. Builds do not require Sanity environment variables. Runtime bindings take precedence over legacy Vite build-time values.

## New Worker Previews migration

This existing integration uses version previews. Cloudflare's newer Worker Previews mode is a separate, one-way migration; changing only the preview command is insufficient.

Before selecting Set up Worker Previews > Switch to Worker Previews:

1. Upgrade the project's Wrangler dependency to at least `4.135.0`, as required by the current documentation, and verify the Vite integration.
2. Add a `previews` configuration block with the public Sanity variables; the new mode does not inherit production variables or bindings.
3. Configure the required secrets in Previews Base. Production secrets are not inherited automatically.
4. Switch the integration in the dashboard and use `npx wrangler preview` as the Preview command inside CF Builds.
5. Push a branch and verify the resulting CF Builds preview before merging.

Do not run the remote preview command locally during migration.

[Cloudflare build branches and preview builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#configure-preview-builds)

[Worker Previews requirements](https://developers.cloudflare.com/workers/previews/get-started/)
