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

| Setting                   | Value                                                     |
| ------------------------- | --------------------------------------------------------- |
| Connected repository      | `SimeonGriggs/simeonGriggs`                               |
| Root directory            | `apps/simeongriggs.dev`                                   |
| Production branch         | `main`                                                    |
| Build command             | `NODE_OPTIONS="--max-old-space-size=8192" pnpm run build` |
| Production deploy command | `npx wrangler deploy --keep-vars`                         |
| Enable Preview Builds     | Enabled for non-production branches                       |
| Preview command           | `npx wrangler preview`                                    |

These publish commands belong in CF Builds settings only. A feature-branch push creates a Worker Preview and branch URL without changing production traffic. A merge to `main` triggers the production build and deployment. Check the Workers Builds GitHub check and preview URL before merging; do not manually promote the version.

## Runtime configuration

Cloudflare's Runtime variables and secrets is the source of truth for remote configuration. Do not add values to Wrangler `vars`, `previews.vars`, or CF Builds build-time variables. The app reads only request-time Worker bindings; the browser receives the public configuration from the root loader.

Configure these public variables in Production and Previews Base:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_SANITY_API_VERSION` (optional; defaults to `2024-02-13`)

Configure these secrets in Production and Previews Base:

- `SANITY_READ_TOKEN`
- `SANITY_WRITE_TOKEN`
- `SANITY_SESSION_SECRET`

The empty `previews` block lets Worker Previews use the runtime settings stored in Previews Base. Do not pass `--ignore-base-config`. The `keep_vars` setting preserves Production variables when CF Builds deploys. Production and Worker Previews use separate runtime settings.

Previews Base contains a verified copy of the three Production public variables. Cloudflare cannot export secret values; copy secrets from their original secure source using `wrangler preview base-config secret bulk` (or `secret put`). These settings commands do not publish Worker code. Never print or commit secret values. Base secret changes apply to newly created Previews; existing Previews need their secrets updated separately.

For local development, put values in the gitignored `.dev.vars` file. This local file is not the source of truth for remote runtime settings.

## Worker Previews

CF Builds uses `npx wrangler preview` for non-production branches. Project Wrangler must remain at `4.135.0` or later. Keep the empty `previews` block and configure values in Previews Base so each new Preview receives its runtime settings without checked-in duplicates.

Previews Base has the three public variables copied from Production and all three secrets loaded from the supplied local source. Secret names were verified without displaying values. New Previews inherit these settings; existing Previews need their secrets updated separately. Cloudflare cannot export Production secret values for comparison.

Do not run the remote preview command locally. Push a branch, wait for CF Builds, and verify the Preview URL before merging.

[Cloudflare build branches and preview builds](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#configure-preview-builds)

[Worker Previews configuration and secret inheritance](https://developers.cloudflare.com/workers/previews/configuration/)
