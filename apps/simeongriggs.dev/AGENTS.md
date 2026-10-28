# Deployment policy

Production deployments and remote preview uploads for this app must run only in Cloudflare Workers Builds, triggered by the connected Git repository.

- Push a feature branch to obtain a CF Builds preview; merge to `main` for production.
- Do not run Wrangler deploy, versions upload, versions deploy, triggers deploy, rollback, or remote preview creation from a local shell or GitHub Actions.
- Do not add GitHub Actions workflows or package scripts that publish this Worker from outside CF Builds.
- Local builds, tests, type generation, Vite preview, and read-only Cloudflare diagnostics are allowed.
- Manage production and preview build commands in the Cloudflare Builds dashboard. See `CLOUDFLARE.md` for settings.
