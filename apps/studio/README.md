# Sanity Studio

The Studio uses Sanity hosting at https://simeongriggs.sanity.studio. The `.github/workflows/sanity-studio.yml` workflow builds pull requests and deploys changes from `main`. A manual workflow run on `main` can deploy without a new commit. Runs on other branches only build.

Set the GitHub repository secret `SANITY_STUDIO_DEPLOY` to a Sanity project deploy token. The workflow exposes it as `SANITY_AUTH_TOKEN` only to the deployment step. This repository already has a secret with that name; replace it if Sanity reports an authentication or permission failure. Do not use a public `SANITY_STUDIO_*` variable for the token.

The workflow installs the locked dependencies, builds once, then runs `sanity deploy --no-build --yes --schema-required --url simeongriggs`. Schema upload failures fail the deployment. The project and dataset live in `sanity.cli.ts`; the hostname is fixed so CI cannot select a different Studio interactively.

`vercel.json` disables automatic Vercel Git deployments for this Studio. Existing Vercel deployments remain available during the cutover. The website Worker continues to publish exclusively through Cloudflare Builds.

For development, run `pnpm --filter simeongriggs-studio dev`. To verify without publishing, run `pnpm --filter simeongriggs-studio build`.

[Sanity hosting and CI deployment](https://www.sanity.io/docs/studio/deployment)

[Sanity deploy command](https://www.sanity.io/docs/cli-reference/deploy)
